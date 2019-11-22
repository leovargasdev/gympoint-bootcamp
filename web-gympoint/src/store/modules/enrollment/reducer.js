import produce from 'immer';

const INITIAL_STATE = {
  enrollment: {
    id: null,
    price: 0,
    plan_id: null,
    student_id: null,
    start_date: new Date(),
    end_date: new Date(),
  },
};

export default function enrollment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollment/GET_ENROLLMENT_SUCCESS': {
        draft.enrollment = action.payload.enrollment;
        break;
      }
      default:
    }
  });
}
