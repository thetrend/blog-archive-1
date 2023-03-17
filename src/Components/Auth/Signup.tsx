import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { RegistrantUser } from 'NETLIFY/types';
import axios from 'axios';

/**
 * TODO: 
 * 1. Make form input fields into reusable components
 */

const Signup: React.FC = () => {
  const [signupFlag, setSignupFlag] = useState<{ message: string }>();
  const getFlag = async () => {
    const { data } = await axios.post(`/api/auth/flag`, { checkFlag: 'signup' });
    setSignupFlag(data);
  };
  useEffect(() => {
    getFlag();
  }, []);
  console.log(signupFlag);
  return (
    <>
      <h3>Signup</h3>
      {signupFlag && signupFlag.message ? 'Signup is disabled.' : (<form tw="w-8/12 m-auto flex flex-col">
        <><label htmlFor="email">Email:</label><input type="email" name="email" /></>
        <><label htmlFor="displayName">Display Name:</label><input type="text" name="displayName" /></>
        <><label htmlFor="password">Password:</label><input type="password" name="password" /></>
        <><label htmlFor="verifiedPassword">Verify Password:</label><input type="password" name="verifiedPassword" /></>
      </form>)}
    </>
  );
};

export default Signup;