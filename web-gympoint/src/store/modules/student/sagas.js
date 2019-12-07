import { all, call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import {
  newStudentSuccess,
  newStudentFailure,
  updateStudentFailure,
  updateStudentSuccess,
  deleteStudentSuccess,
  deleteStudentFailure,
} from './actions';

export function* newStudent({ payload }) {
  try {
    const { name, email, age, height, weight } = payload.data;

    const student = {
      name,
      email,
      age,
      height: Number(height.replace(',', '.')),
      weight: Number(weight.replace(',', '.')),
    };

    const response = yield call(api.post, 'students', student);

    toast.success('Aluno criado com sucesso!!!');

    yield put(newStudentSuccess(response.data));
    history.push('/students');
  } catch (err) {
    toast.error('Falha ao criar um novo aluno!!!');
    yield put(newStudentFailure());
  }
}

export function* updateStudent({ payload }) {
  try {
    const { id, name, email, age, height, weight } = payload.student;

    const student = {
      name,
      email,
      age,
      height: Number(height.replace(',', '.')),
      weight: Number(weight.replace(',', '.')),
    };

    const response = yield call(api.put, `/student/${id}`, student);

    toast.success('Aluno atualizado com sucesso!!!');

    yield put(updateStudentSuccess(response.data));
    history.push('/students');
  } catch (err) {
    console.tron.log(err.message);
    toast.error('Falha ao atualizar aluno!!!');
    yield put(updateStudentFailure());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload.student;

    const response = yield call(api.delete, `/students/${id}`);

    toast.success('Aluno excluído com sucesso!!!');

    yield put(deleteStudentSuccess(response.data));
    history.push('/students');
  } catch (err) {
    console.tron.log(err.message);
    toast.error('Falha ao excluir aluno!!!');
    yield put(deleteStudentFailure());
  }
}

export default all([
  takeLatest('@student/NEW_STUDENT_REQUEST', newStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
  takeLatest('@student/DELETE_STUDENT_REQUEST', deleteStudent),
]);
