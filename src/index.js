import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { AppNavigator } from './nav';
import Initial from './Initial';

const app = () => (
  <Provider store={store}>
    <Initial>
      <AppNavigator />
    </Initial>
  </Provider>
);

export default app;
