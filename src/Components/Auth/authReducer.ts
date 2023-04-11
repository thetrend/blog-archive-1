import { AuthState } from './types';

export default (state: AuthState, action: any): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case 'SIGNUP_ERROR':
    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        loading: false,
        errors: undefined,
        message: payload,
      };
    default:
      return state;
  }
}