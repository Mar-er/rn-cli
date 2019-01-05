import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { AppNavigator } from './nav';


const app = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default app;
