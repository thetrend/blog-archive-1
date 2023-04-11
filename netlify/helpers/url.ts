import { HandlerEvent } from '@netlify/functions';

const domain = (event: HandlerEvent): string => {
  return event.rawUrl.replace(event.path, '');
}

const url = (event: HandlerEvent): string => {
  const path = event.path.replace(/\/api\/+/, '');
  const segments = path.split('/');
  const endpoint = segments[segments.length - 1];
  return endpoint;
};

export { domain, url };