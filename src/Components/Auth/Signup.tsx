import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import AuthAPI from '~/../netlify/helpers/axios/auth'; // Weird that the below import works and this one doesn't
import { AuthApiAction, RegistrantUser } from 'NETLIFY/types';
import { signup } from './authActions';
import AuthContext from './AuthContext';
/**
 * TODO: 
 * 1. Make form input fields into reusable components
 */
const Signup: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [signupFlag, setSignupFlag] = useState<AuthApiAction>();
  const getFlag = async () => {
    const data = await AuthAPI.signupCheck({ flag: 'signup' });
    setSignupFlag(data.signupsDisabled);
  };
  useEffect(() => {
    getFlag();
  }, []);
  const [formData, setFormData] = React.useState<RegistrantUser>({
    email: '',
    displayName: '',
    password: '',
    verifiedPassword: '',
  });
  const { email, displayName, password, verifiedPassword } = formData;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup(dispatch, formData);
  };
  return (
    <>
      <h3>Signup</h3>
      {!signupFlag ? 'Signup is disabled.' : 
      (<form tw="w-8/12 m-auto flex flex-col" onSubmit={handleSubmit}>
        <>
          <label htmlFor="email">Email:</label>
          <input value={email} type="email" name="email" onChange={handleChange} />
        </>
        <>
          <label htmlFor="displayName">Display Name:</label>
          <input value={displayName} type="text" name="displayName" onChange={handleChange} />
        </>
        <>
          <label htmlFor="password">Password:</label>
          <input value={password} type="password" name="password" onChange={handleChange} />
        </>
        <>
          <label htmlFor="verifiedPassword">Verify Password:</label>
          <input value={verifiedPassword} type="password" name="verifiedPassword" onChange={handleChange} />
        </>
        <>
          <button type="submit" tw="block mx-auto bg-indigo-800 text-white p-3 hover:bg-indigo-700">Sign Up</button>
        </>
      </form>)}
    </>
  );
};

export default Signup;