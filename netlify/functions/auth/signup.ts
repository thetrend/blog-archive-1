import validator from 'validator';
import { HandlerEvent } from '@netlify/functions';
import { AuthApiError, RegistrantUser } from '../../types';
import { signupsAllowed } from './signupFlag';
import AuthAPI from '../../helpers/axios/auth';
import { findOrCountUsers } from '../../helpers';

/**
 * signup
 * @param event HandlerEvent
 * @description Validates user input prior to user creation
 * @returns string | { errors: AuthError[]; } | boolean
 */
const signup = async (event: HandlerEvent) => {
  /**
   * Destructure Netlify environment variables
   * and define some variables
   */
  const { ALLOWED_EMAILS } = process.env;
  const allowedEmails = ALLOWED_EMAILS?.split(',');
  const okToSignup = await AuthAPI.signupCheck({ flag: 'signup' });
  /**
   * Create an empty array to contain error messages
   */
  let errorsArray: AuthApiError[] = [];  /**
   * 1. Deny access if not accessing endpoint by POST
   * 2. Check the boolean value of okToSignup
   * 3. Check if an event body is present (necessary to avoid errors on #4)
   * 4. Check if an email key is present in event body
   */
  if ((event.httpMethod !== 'POST') ||
    (!okToSignup) ||
    !event.body ||
    !Object.keys(JSON.parse(event.body)).includes('email')
  ) {
    errorsArray.push({
      name: 'signup',
      message: 'Signup is disabled.'
    });
  }
  /**
   * Destructure variables for later use from event body now that we
   * know it has at least one key (email)
   */
  const { email, displayName, password, verifiedPassword }: RegistrantUser = JSON.parse(event.body);
  /**
   * If signups of more than 1 account are disabled AND a user exists
   * then present error
   */
  if (signupsAllowed === false && 
    (Number(await findOrCountUsers()) > 0) ||
    signupsAllowed === false && 
    !allowedEmails?.includes(email)) {
    errorsArray.push({
      name: 'signup',
      message: 'Signup is disabled.'
    });
    /**
     * ELSE signups are enabled; check for email input
    */
  } else if (!email) {
    errorsArray.push({
      name: 'email',
      message: 'Email address is required.'
    });
  }
  /**
   * Check for display name input
   */
  if (!displayName) {
    errorsArray.push({
      name: 'displayName',
      message: 'Display name is required.'
    });
  /**
   * ELSE check for display name input length / validation match
   */
  } else if (displayName.length < 2 || !validator.matches(displayName, /^[0-9a-zA-Z_-\s.]+$/)) {
    errorsArray.push({
      name: 'displayName',
      message: '2 characters minimum. Allowed: A-Z, a-z, -, _, ., and spaces.'
    });
  }
  /**
   * Check for password input
   */
  if (!password) {
    errorsArray.push({
      name: 'password',
      message: 'Password is required.'
    });
  /**
   * ELSE Check for password input validation match
   * TODO: Docs on what makes a strong password - make visible on FE
   */
  } else if (!validator.isStrongPassword(password)) {
    errorsArray.push({
      name: 'password',
      message: 'Password is too weak. See minimum requirements.'
    });
  }
  /**
   * Check for verifiedPassword and password identical match
   */
  if (verifiedPassword !== password) {
    errorsArray.push({
      name: 'verifiedPassword',
      message: 'Passwords do not match.'
    });
  }
  /**
   * Check for existing user
   */
  const userExists = await findOrCountUsers(email);
  if (userExists) {
    errorsArray.push({
      name: 'login',
      message: 'You already have an account.'
    });
  }
  /**
   * If any errors return "Signup is disabled",
   * remove any other errors as this is priority.
   */
  /**
   * If any errors are present, return the errors object
   */
  if (errorsArray.length > 0) {
    /**
     * Filter for priority errors ("signup") then display
     * the first result if both entries are identical
     */
    // https://plainenglish.io/blog/how-to-remove-duplicates-from-an-array-of-objects-in-javascript-71ce1bc96265
    const priorityErrors = errorsArray.filter(error => error.name === 'signup').filter((error, index, arr) => 
      index === arr.findIndex((item) => item.name === error.name && item.message === error.message));
    return {
      errors: priorityErrors ?? errorsArray
    };
  }
  /**
   * If all else succeeds, return true
   * Note: we are not inserting into the DB at this time
   * The next function ("proceed") will insert users
   */
  return { success: true };
};

export default signup;