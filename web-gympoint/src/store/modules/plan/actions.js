export function newPlanRequest(plan) {
  return {
    type: '@plan/NEW_PLAN_REQUEST',
    payload: { plan },
  };
}

export function newPlanSuccess(plan) {
  return {
    type: '@plan/NEW_PLAN_SUCCESS',
    payload: { plan },
  };
}

export function newPlanFailure() {
  return {
    type: '@plan/NEW_PLAN_FAILURE',
  };
}
