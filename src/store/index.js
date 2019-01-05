import { createStore, applyMiddleware, compose } from 'redux';
import middleware from '../middlewares';
import rootReducer from '../reducers';


const configureStore = (preloadedState = {}) => {
  const store = process.env.NODE_ENV === 'development' && global.__REDUX_DEVTOOLS_EXTENSION__  // eslint-disable-line
    ? createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(...middleware),
        global.__REDUX_DEVTOOLS_EXTENSION__(),  // eslint-disable-line
      ),
    )
    : createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(...middleware),
    );

  return store;
};

export default configureStore();
