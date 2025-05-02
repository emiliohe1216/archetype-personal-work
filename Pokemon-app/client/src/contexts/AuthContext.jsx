import { createContext, useReducer, useEffect, useCallback } from 'react';
import { authReducer, initialState } from '../reducers/authReducer';
import * as authActions from '../actions/authActions';
import api from '../utils/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await api.get('/auth/status');
      
      if (response.logged_in) {
        dispatch(authActions.loginSuccess({ id: response.user_id }));
      } else {
        dispatch(authActions.checkAuth());
      }
    } catch (error) {
      dispatch(authActions.checkAuth());
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(async (email, password) => {
    dispatch(authActions.loginRequest());
    
    try {
      const response = await api.post('/auth/login', { email, password });
      dispatch(authActions.loginSuccess(response.user));
      return true;
    } catch (error) {
      dispatch(authActions.loginFailure(error.message || 'Login failed'));
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
      dispatch(authActions.logout());
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(authActions.logout());
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch(authActions.clearError());
  }, []);

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}