export const actionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
  };

  
  export function login() {
    return {
      type: actionTypes.LOGIN,
    };
  }
  
  export function logout() {
    return {
      type: actionTypes.LOGOUT,
    };
  }
  
  export function loginFailure(error) {
    return {
      type: actionTypes.LOGIN_FAILURE,
      error,
    };
  }
  
  export function loginSuccess() {
    return {
      type: actionTypes.LOGIN_SUCCESS,
    };
  }
