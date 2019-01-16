export { NavigationActions, StackActions } from 'react-navigation';

export { default as Storage } from './storage';

export { default as deviceInfo } from './deviceInfo';

export { default as zoomScreen } from './zoomScreen';

export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export const createAction = type => payload => ({ type, payload });
