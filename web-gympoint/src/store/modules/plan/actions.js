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

export function updatePlanRequest(plan) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { plan },
  };
}

export function updatePlanSuccess(plan) {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
    payload: { plan },
  };
}

export function updatePlanFailure() {
  return {
    type: '@plan/UPDATE_PLAN_FAILURE',
  };
}
