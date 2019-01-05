import { connect } from 'react-redux';
import { createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';

import LoginScreen from './views/LoginScreen';
import MainScreen from './views/MainScreen';
import ProfileScreen from './views/ProfileScreen';

import Home from './views/Home';
import DoRecord from './views/DoRecord';
import ErrorBook from './views/ErrorBook';
import My from './views/My';

// 首页底部 tabs 路由
const navTabs = {
  Home: {
    screen: Home,
    path: '',
  },
  DoRecord: {
    screen: DoRecord,
    path: '',
  },
  ErrorBook: {
    screen: ErrorBook,
    path: '',
  },
  My: {
    screen: My,
    path: '',
  },
};
const navTabOptions = {
  initialRouteName: 'Home',
};
const NavTabsRouter = createBottomTabNavigator(navTabs, navTabOptions);


const RootNavigator = createDrawerNavigator(
  {
    Login: { screen: LoginScreen },
    Tab: { screen: NavTabsRouter },
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    initialRouteName: 'Login',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  },
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator };
