import { HandlerEvent } from '@netlify/functions';
import { findOrCountUsers } from '../../helpers';

const { ALLOW_SIGNUPS } = process.env;
export const signupsAllowed = ALLOW_SIGNUPS === 'true';

const signupFlag = async (event: HandlerEvent) => {
  /**
   * 1. Deny access if not accessing endpoint by POST
   * 2. Check if an event body is present
   */
  if (event.httpMethod !== 'POST' || !event.body) {
    return 'Access denied.';
  }
  const { flag } = JSON.parse(event.body);
  let message: boolean | string;
  /**
   * Connect to the DB and name a connection to the
   * users collection
   * Declare a userCount for future use
   */
  switch (flag) {
    case 'signup':
      /**
       * if signups are DISallowed and user count === 0, RETURN true
       * if signups are ALLOWED, return true
       * ELSE return false
       */
      message = ((signupsAllowed === false && Number(await findOrCountUsers()) < 1) || signupsAllowed === true) ? 
        true :
        false;
      break;
    default:
      message = 'Access denied.';
      break;
  }
  return message;
};

export default signupFlag;