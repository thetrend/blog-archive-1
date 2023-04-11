import { Handler } from '@netlify/functions';
import { url } from '../../helpers';
import { AuthApiResponse } from '../../types';
import signup from './signup';
import signupFlag from './signupFlag';

const handler: Handler = async (event) => {
  /**
   * Create some variables
   */
  const errorCode = 500;
  const endpoint = url(event);
  try {
    let action: AuthApiResponse;
    switch (endpoint) {
      case 'signup':
        action = await signup(event);
        break;
      case 'signup_check':
        action = await signupFlag(event);
        break;
      default:
        action = new Error('Missing resource.');
        break;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(action)
    };
  } catch (error) {
    return {
      statusCode: errorCode,
      body: JSON.stringify(error)
    };
  }
};

export { handler };