import { Handler, HandlerEvent } from '@netlify/functions';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { DB, createClient, url } from '../helpers';
import { AuthError, RegistrantUser } from '../types';

const handler: Handler = async (event) => {
  const db = createClient();
  const errorCode = 500;
  const endpoint = url(event);
  const { ALLOW_SIGNUPS, ALLOWED_EMAILS } = process.env;

  try {
    const connection = db.connect();
    const database = (await connection).db(DB);
    const collection = database.collection('users');
    const result = await collection.countDocuments();

    const signup = async (event: HandlerEvent) => {
      const signupsAllowed = (ALLOW_SIGNUPS === 'true');
      const allowedEmails = ALLOWED_EMAILS?.split(',');
      console.log('Signups allowed? ', signupsAllowed);
      if ((!signupsAllowed // Boolean to check if signups are disabled
        && result > 0) // If signups are disabled then check if a user exists
        || event.httpMethod !== 'POST' // Ensure this endpoint is only being accessed via POST
        || !event.body // Ensure there is a form field email attached
      ) {
        return 'Signup is disabled.';
      }

      const { email, displayName, password, verifiedPassword }: RegistrantUser = JSON.parse(event.body!);

      let errorsArray: AuthError[] = [];

      // If signups are disabled, only allow whitelisted emails to sign up
      if (!signupsAllowed && !allowedEmails?.includes(email)) {
        errorsArray.push({
          name: 'email',
          message: 'Registration is restricted.'
        });
      // Otherwise signups are enabled; check for email input
      } else if (!email) {
        errorsArray.push({
          name: 'email',
          message: 'Email address is required.'
        });
      }

      // Check for display name input
      if (!displayName) {
        errorsArray.push({
          name: 'displayName',
          message: 'Display name is required.'
        });
      // Check for display name input length / validation match
      } else if (displayName.length < 2 || !validator.matches(displayName, /^[0-9a-zA-Z_-\s]+$/)) {
        errorsArray.push({
          name: 'displayName',
          message: 'Min 2 characters required. Allowed characters: A-Z, a-z, _, -, and spaces.'
        });
      }

      // Check for password input
      if (!password) {
        errorsArray.push({
          name: 'password',
          message: 'Password is required.'
        });
      // Check for password input validation match
      } else if (!validator.isStrongPassword(password)) {
        errorsArray.push({
          name: 'password',
          message: 'Password is too weak. See minimum requirements.'
          // TODO: Docs on what makes a strong password - make them visible on FE
        });
      }

      // Check for verifiedPassword / password identical match
      if (verifiedPassword !== password) {
        errorsArray.push({
          name: 'verifiedPassword',
          message: 'Passwords do not match.'
        });
      }

      // Check for existing user
      const userExists = await collection.findOne({ email });
      if (userExists) {
        errorsArray.push({
          name: 'login',
          message: 'You already have an account.'
        })
      }

      // If any errors are present, return errors object
      if (errorsArray.length > 0) {
        return { errors: errorsArray };
      }

      // All else has passed, create a new user
      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);
      // const { id } = await collection.insertOne({
      //   email,
      //   displayName,
      //   password: passwordHash,
      // });

      return 'signup success state';
    };

    const login = async (event: HandlerEvent) => {
      return 'this is the login';
    };

    let action: Promise<string | { errors: AuthError[]; }>;
    switch (endpoint) {
      case 'login':
        action = login(event);
      case 'signup':
      default:
        action = signup(event);
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
  } finally {
    db.close();
  }
};

export { handler };