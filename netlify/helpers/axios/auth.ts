// https://javascript.plainenglish.io/frontend-api-calls-with-typescript-and-axios-68792d1e63c2

import axios, { AxiosResponse } from 'axios';
import { AuthApiResponse, RegistrantUser } from 'NETLIFY/types';


const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL || 'http://localhost:8888/'
    : 'http://localhost:8888/',
  headers: {
    'Content-Type': 'application/json',
  }
});

const API_URL = '/api/auth';
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(`${API_URL}/${url}`).then(responseBody).catch(error => console.log('AuthAPI get error', error)),
  post: (url: string, body: {}) => instance.post(`${API_URL}/${url}`, JSON.stringify(body)).then(responseBody).catch(error => console.log('AuthAPI post error', error)),
  put: (url: string, body: {}) => instance.put(`${API_URL}/${url}`, JSON.stringify(body)).then(responseBody).catch(error => console.log('AuthAPI put error', error)),
  delete: (url: string) => instance.delete(`${API_URL}/${url}`).then(responseBody).catch(error => console.log('AuthAPI delete error', error))
};

const AuthAPI = {
  signupCheck: (formData: { flag: string }): Promise<AuthApiResponse> => requests.post('signup_check', formData),
  signup: (formData: RegistrantUser): Promise<AuthApiResponse> => requests.post('signup', formData),
};

export default AuthAPI;