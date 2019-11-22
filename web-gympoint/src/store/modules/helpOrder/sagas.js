import { all, call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import { updateHelpOrderFailure, updateHelpOrderSuccess } from './actions';

export function* updateOrder({ payload }) {
  try {
    const { id, answer } = payload.order;

    const response = yield call(api.put, `/help-orders/${id}/answer`, {
      answer,
    });

    toast.success('Pedido de ajuda respondido com sucesso!!!');

    yield put(updateHelpOrderSuccess(response.data));
    history.push('/help-orders');
  } catch (err) {
    console.tron.log(err.message);
    toast.error('Falha ao responder o pedido de ajuda!');
    yield put(updateHelpOrderFailure());
  }
}

export default all([
  // takeLatest('@helpOrder/GET_HELP_ORDER_REQUEST', updateOrder),
  takeLatest('@helpOrder/UPDATE_HELP_ORDER_REQUEST', updateOrder),
]);
