import { all, call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import { newPlanSuccess, newPlanFailure } from './actions';

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

export default all([takeLatest('@plan/NEW_PLAN_REQUEST', newPlan)]);
