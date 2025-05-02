export const AUTH_ACTIONS = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CHECK_AUTH: 'CHECK_AUTH',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

export const loginRequest = () => ({
  type: AUTH_ACTIONS.LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: AUTH_ACTIONS.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: AUTH_ACTIONS.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT,
});

export const checkAuth = () => ({
  type: AUTH_ACTIONS.CHECK_AUTH,
});

export const setLoading = (loading) => ({
  type: AUTH_ACTIONS.SET_LOADING,
  payload: loading,
});

export const clearError = () => ({
  type: AUTH_ACTIONS.CLEAR_ERROR,
});