import { connect } from 'react-redux';
import {
  createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator, createStackNavigator,
} from 'react-navigation';
import {
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';

import SignIn from './views/Account/SignIn';
import SignUp from './views/Account/SignUp';
import PasswordReset from './views/Account/PasswordReset';
import Initial from './views/Initial';
import Home from './views/Home';
import DoRecord from './views/DoRecord';
import ErrorBook from './views/ErrorBook';
import My from './views/My';
import DoRecordFilter from './views/DoRecordFilter';

// 做题记录筛选抽屉路由
const doRecordDrawer = {
  DoRecord: {
    screen: DoRecord,
    path: '',
  },
};
const doRecordDrawerOptions = {
  drawerWidth: 400,
  drawerPosition: 'right',
  contentComponent: DoRecordFilter,
};
const DoRecordDrawer = createDrawerNavigator(doRecordDrawer, doRecordDrawerOptions);

// 首页底部 tabs 路由
const navTabs = {
  Home: {
    screen: Home,
    path: '',
  },
  DoRecord: {
    screen: DoRecordDrawer,
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
const NavTabs = createBottomTabNavigator(navTabs, navTabOptions);

// 没有 header 的路由集合
const noHeader = {
  SignUp: { screen: SignUp },
  PasswordReset: { screen: PasswordReset },
};
const noHeaderOptions = {
  defaultNavigationOptions: {
    header: null,
  },
};
const NoHeader = createStackNavigator(noHeader, noHeaderOptions);

// 主体路由
const app = {
  Tab: { screen: NavTabs },
  NoHeader: { screen: NoHeader },
};
const appOptions = {
  defaultNavigationOptions: {
    header: null,
  },
};
const App = createStackNavigator(app, appOptions);

// 根路由
/**
 * Initial 路由包含 auth 鉴权
 * 广告、宣传轮播路由
 * 一些其它的初始化操作
 */
const RootNavigator = createSwitchNavigator(
  {
    Initial: { screen: Initial },
    Login: { screen: SignIn },
    App: { screen: App },
  },
  {
    initialRouteName: 'Initial',
  },
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator };
