import produce from 'immer';

const INITIAL_STATE = {
  plan: null,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/GET_PLAN_SUCCESS': {
        draft.plan = action.payload.plan;
        break;
      }
      default:
    }
  });
}
