import { Dispatch } from 'react';
import axios from 'axios';
import { AuthAction, RegistrantUser } from './types';
import AuthAPI from '~/../netlify/helpers/axios/auth';

/**
 * signup
 * Note: doesn't actually signup user
 * Just validates the data for the next function
 */
export const signup = async (dispatch: Dispatch<AuthAction>, formData: RegistrantUser) => {
  try {
    const response = await AuthAPI.signup(formData);
    console.log(response)
    if (Object.hasOwn(response, 'errors')) {
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: response as any
      });
    } else {
      dispatch({
        type: 'SIGNUP_SUCCESS',
        payload: response as any
      });  
    }
  } catch (error) {
    console.log(error);
  }
};