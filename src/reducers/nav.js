
import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../nav';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootNavigator.router.getActionForPathAndParams('Login');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
const initialNavState = RootNavigator.router.getStateForAction(
  firstAction,
  tempNavState,
);

const nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      );
      break;
    case 'Logout':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default nav;
