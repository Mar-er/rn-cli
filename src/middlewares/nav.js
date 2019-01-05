import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const navigatorMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

export default navigatorMiddleware;
