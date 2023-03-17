import React from 'react';
import tw from 'twin.macro';
import { RegistrantUser } from 'NETLIFY/types';

/**
 * TODO: 
 * 1. Make form input fields into reusable components
 */

const Signup: React.FC = () => {
  return (
    <>
      <h3>Signup</h3>
      <form tw="w-8/12 m-auto flex flex-col">
        <><label htmlFor="email">Email:</label><input type="email" name="email" /></>
        <><label htmlFor="displayName">Display Name:</label><input type="text" name="displayName" /></>
        <><label htmlFor="password">Password:</label><input type="password" name="password" /></>
        <><label htmlFor="verifiedPassword">Verify Password:</label><input type="password" name="verifiedPassword" /></>
      </form>
    </>
  );
};

export default Signup;