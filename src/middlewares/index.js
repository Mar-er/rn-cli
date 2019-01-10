import nav from './nav';
import logger from './logger';

const middlewares = [nav];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default middlewares;
