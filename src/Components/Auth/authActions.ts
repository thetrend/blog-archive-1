import { Dispatch } from 'react';
import axios from 'axios';
import { AuthAction, RegistrantUser } from './types';

/**
 * signup
 * Note: doesn't actually signup user
 * Just validates the data for the next function
 */
export const signup = async (dispatch: Dispatch<AuthAction>, formData: RegistrantUser) => {
  try {
    const response = await axios.post(`/auth/api/signup`, formData);
    if (Array.isArray(response.data)) {
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: response.data
      });
    }
    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};