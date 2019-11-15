export function newEnrollmentRequest(data) {
  return {
    type: '@enrollment/NEW_ENROLLMENT_REQUEST',
    payload: { data },
  };
}

export function newEnrollmentSuccess(enrollment) {
  return {
    type: '@enrollment/NEW_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function newEnrollmentFailure() {
  return {
    type: '@enrollment/NEW_ENROLLMENT_FAILURE',
  };
}

// export function updateStudentRequest(student) {
//   return {
//     type: '@student/UPDATE_ENROLLMENT_REQUEST',
//     payload: { student },
//   };
// }

// export function updateStudentSuccess(student) {
//   return {
//     type: '@student/UPDATE_ENROLLMENT_SUCCESS',
//     payload: { student },
//   };
// }

// export function updateStudentFailure() {
//   return {
//     type: '@student/UPDATE_ENROLLMENT_FAILURE',
//   };
// }
