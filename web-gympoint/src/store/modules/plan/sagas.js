import { all, call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import { newPlanSuccess, newPlanFailure, getPlanSuccess } from './actions';

export function* newPlan({ payload }) {
  try {
    const { price, duration, title } = payload.plan;

    const plan = {
      duration,
      title,
      price: Number(price.replace(',', '.')),
    };

    const response = yield call(api.post, 'plans', plan);

    toast.success('Plano criado com sucesso!!!');

    yield put(newPlanSuccess(response.data));
    history.push('/plans');
  } catch (err) {
    toast.error('Falha ao criar o plano!!!');
    yield put(newPlanFailure());
  }
}

export function* getPlan({ payload }) {
  try {
    const { id } = payload.plan;

    const response = yield call(api.get, `/plan/${Number(id)}`);

    yield put(getPlanSuccess(response.data));
    history.push(`/plan/${id}/edit`);
  } catch (err) {
    toast.error('Falha ao localizar o plano!!!');
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, price, duration, title } = payload.plan;

    const plan = {
      duration,
      title,
      price: Number(price.replace(',', '.')),
    };

    const response = yield call(api.put, `/plan/${id}`, plan);

    toast.success('Plano atualizado com sucesso!!!');

    yield put(newPlanSuccess(response.data));
    history.push('/plans');
  } catch (err) {
    toast.error('Falha ao atualizar o plano!!!');
    yield put(newPlanFailure());
  }
}

export default all([
  takeLatest('@plan/NEW_PLAN_REQUEST', newPlan),
  takeLatest('@plan/GET_PLAN_REQUEST', getPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
]);
