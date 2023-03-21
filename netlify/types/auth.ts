export interface User {
  email: string;
  password: string;
}

export interface RegistrantUser extends User {
  displayName: string;
  verifiedPassword: string;
}

export type AuthApiError = {
  name: 'email' | 'displayName' | 'password' | 'verifiedPassword' | 'login';
  message: string;
}

export type AuthApiActionErrors = {
  errors: AuthApiError[];
};

export type AuthApiAction = 
  | string
  | AuthApiActionErrors
  | boolean;

export interface AuthApiResponse {
  message: AuthApiAction
};