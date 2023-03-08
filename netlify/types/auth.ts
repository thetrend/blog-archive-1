export interface User {
  email: string;
  password: string;
}

export interface RegistrantUser extends User {
  displayName: string;
  verifiedPassword: string;
}

export type AuthError = {
  name: 'email' | 'displayName' | 'password' | 'verifiedPassword' | 'login';
  message: string;
}