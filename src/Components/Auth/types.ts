import {
  User,
  RegistrantUser,
  AuthApiError,
  AuthApiAction,
} from 'NETLIFY/types';

export type AuthState = {
  errors?: AuthApiError[];
  loading?: boolean;
  message?: string;
};

export type AuthAction = | {
  type: 'SIGNUP_SUCCESS',
  payload: {
    message: boolean
  }
} | {
  type: 'SIGNUP_ERROR' | 'LOGIN_ERROR',
  payload: {
    message: {
      errors: AuthApiError[]
    }
  }
};

export type {
  User,
  RegistrantUser,
  AuthApiError,
  AuthApiAction,
};