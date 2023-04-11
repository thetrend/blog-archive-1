import React, { Dispatch, createContext, useReducer } from 'react';
import authReducer from './authReducer';
import { AuthState } from './types';

export const initialAuthState: AuthState = {
  loading: true,
  errors: undefined,
  message: undefined,
};

export const AuthProvider = ({ children }: any) =>  {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext<{ state: AuthState, dispatch: Dispatch<any>}>
  ({ state: initialAuthState, dispatch: () => null });
export default AuthContext;