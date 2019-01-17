export { default as api } from './api/api';

export { NavigationActions, StackActions } from 'react-navigation';

export { default as Storage } from './storage';

export { default as deviceInfo } from './deviceInfo';

export { default as zoomScreen } from './zoomScreen';

export { default as dva } from './dva';

export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export const createAction = type => payload => ({ type, payload });
