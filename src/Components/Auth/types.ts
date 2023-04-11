import {
  User,
  RegistrantUser,
  AuthApiError,
  AuthApiAction,
} from 'NETLIFY/types';

export type AuthState = {
  errors?: AuthApiError[];
  loading?: boolean;
  success?: boolean;
};

export type AuthAction = | {
  type: 'SIGNUP_SUCCESS',
  payload: {
    success: boolean
  }
} | {
  type: 'SIGNUP_ERROR' | 'LOGIN_ERROR',
  payload: {
    errors: AuthApiError[]
  }
};

export type {
  User,
  RegistrantUser,
  AuthApiError,
  AuthApiAction,
};