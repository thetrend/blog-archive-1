import { Handler, HandlerEvent } from '@netlify/functions';
import { DB, createClient, url } from '../../helpers';
import { AuthApiAction } from '../../types';

import signup from './signup';
import proceed from './proceed';
import signupFlag from './signupFlag';

const handler: Handler = async (event) => {
  /**
   * Create some variables
   */
  const errorCode = 500;
  const endpoint = url(event);
  try {
    const login = async (event: HandlerEvent) => {
      return 'this is the login';
    };

    let action: AuthApiAction | Error;

    switch (endpoint) {
      case 'signup':
        action = await signup(event);
        break;
      case 'proceed':
        action = await proceed(event);
        break;
      case 'login':
        action = await login(event);
        break;
      case 'signup_check':
        action = await signupFlag(event);
        break;
      default:
        action = 'Missing resource.';
        break;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: action })
    };
  } catch (error) {
    return {
      statusCode: errorCode,
      body: JSON.stringify({ message: error.message })
    };
  }
};

export { handler };