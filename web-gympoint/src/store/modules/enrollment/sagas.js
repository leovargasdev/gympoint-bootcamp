import { all, call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import {
  newEnrollmentSuccess,
  newEnrollmentFailure,
  getEnrollmentSuccess,
  updateEnrollmentFailure,
  updateEnrollmentSuccess,
} from './actions';

export function* newEnrollment({ payload }) {
  try {
    const { student_id, plan_id, start_date } = payload.data;

    const response = yield call(api.post, 'enrollments', {
      student_id,
      plan_id,
      start_date,
    });

    toast.success('Matrícula criada com sucesso!!!');

    yield put(newEnrollmentSuccess(response.data));
    history.push('/enrollments');
  } catch (err) {
    toast.error('Falha ao criar essa matrícula!!!');
    yield put(newEnrollmentFailure());
  }
}

export function* getEnrollment({ payload }) {
  try {
    const { id } = payload.enrollment;

    const response = yield call(api.get, `/enrollment/${id}`);
    yield put(getEnrollmentSuccess(response.data));
    history.push(`/enrollment/${id}/edit`);
  } catch (err) {
    toast.error('Falha ao localizar a matrícula!!!');
  }
}

export function* updateEnrollment({ payload }) {
  try {
    const { student_id, plan_id, start_date, id } = payload.enrollment;

    const response = yield call(api.put, `/enrollments/${id}`, {
      student_id,
      plan_id,
      start_date,
    });

    toast.success('Matrícula atualizada com sucesso!!!');

    yield put(updateEnrollmentSuccess(response.data));
    history.push('/enrollments');
  } catch (err) {
    toast.error('Falha ao editar a matrícula!!!');
    yield put(updateEnrollmentFailure());
  }
}

export default all([
  takeLatest('@enrollment/NEW_ENROLLMENT_REQUEST', newEnrollment),
  takeLatest('@enrollment/GET_ENROLLMENT_REQUEST', getEnrollment),
  takeLatest('@enrollment/UPDATE_ENROLLMENT_REQUEST', updateEnrollment),
]);
