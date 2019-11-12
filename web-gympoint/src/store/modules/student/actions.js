export function newStudentRequest(data) {
  return {
    type: '@student/NEW_STUDENT_REQUEST',
    payload: { data },
  };
}

export function newStudentSuccess(student) {
  return {
    type: '@student/NEW_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function newStudentFailure() {
  return {
    type: '@student/NEW_STUDENT_FAILURE',
  };
}

export function updateStudentRequest(student) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { student },
  };
}

export function updateStudentSuccess(student) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_STUDENT_FAILURE',
  };
}
