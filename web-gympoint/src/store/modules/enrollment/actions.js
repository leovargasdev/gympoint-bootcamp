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

export function getEnrollmentRequest(enrollment) {
  return {
    type: '@enrollment/GET_ENROLLMENT_REQUEST',
    payload: { enrollment },
  };
}

export function getEnrollmentSuccess(enrollment) {
  return {
    type: '@enrollment/GET_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function updateEnrollmentRequest(enrollment) {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_REQUEST',
    payload: { enrollment },
  };
}

export function updateEnrollmentSuccess(enrollment) {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function updateEnrollmentFailure() {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_FAILURE',
  };
}
