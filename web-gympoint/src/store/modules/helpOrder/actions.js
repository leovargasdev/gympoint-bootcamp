// export function getHelpOrderRequest(order) {
//   return {
//     type: '@helpOrder/GET_HELP_ORDER_REQUEST',
//     payload: { order },
//   };
// }

// export function getHelpOrderSuccess(order) {
//   return {
//     type: '@helpOrder/GET_HELP_ORDER_SUCCESS',
//     payload: { order },
//   };
// }

export function updateHelpOrderRequest(order) {
  return {
    type: '@helpOrder/UPDATE_HELP_ORDER_REQUEST',
    payload: { order },
  };
}

export function updateHelpOrderSuccess(order) {
  return {
    type: '@helpOrder/UPDATE_HELP_ORDER_SUCCESS',
    payload: { order },
  };
}

export function updateHelpOrderFailure() {
  return {
    type: '@helpOrder/UPDATE_HELP_ORDER_FAILURE',
  };
}
