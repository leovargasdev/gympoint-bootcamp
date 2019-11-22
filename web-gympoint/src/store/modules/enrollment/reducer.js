import produce from 'immer';

const INITIAL_STATE = {
  enrollment: null,
};

export default function enrollment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollment/GET_ENROLLMENT_SUCCESS': {
        draft.enrollment = action.payload.enrollment;
        break;
      }
      // case '@user/UPDATE_PROFILE_SUCCESS': {
      //   draft.profile = action.payload.profile;
      //   break;
      // }
      // case '@user/SIGN_OUT': {
      //   draft.profile = null;
      //   break;
      // }
      default:
    }
  });
}
