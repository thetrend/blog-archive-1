import { HandlerEvent } from '@netlify/functions';

const proceed = async (event: HandlerEvent) => {
  return 'This is the second part of signup';
};

export default proceed;