import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BackHandler, Text } from 'react-native';
import {
  createDrawerNavigator, createBottomTabNavigator, createStackNavigator,
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { NavigationActions } from './utils';

import Login from './views/Account/Login';
import Logout from './views/Account/Logout';
import PasswordReset from './views/Account/PasswordReset';
import Home from './views/Home';
import DoRecord from './views/DoRecord';
import ErrorBook from './views/ErrorBook';
import My from './views/My';
import DoRecordFilter from './views/DoRecordFilter';
import Test from './views/Test';

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
  defaultNavigationOptions: {
    header: null,
  },
};
const NavTabs = createBottomTabNavigator(navTabs, navTabOptions);

// 没有 header 的路由集合
const noHeader = {
  Logout: { screen: Logout },
  PasswordReset: { screen: PasswordReset },
};
const noHeaderOptions = {
  defaultNavigationOptions: {
    header: null,
  },
};
const NoHeader = createStackNavigator(noHeader, noHeaderOptions);

// 含有 header 的路由集合
const hasHeader = {
  Test: { screen: Test },
};
const HasHeader = createStackNavigator(hasHeader);

// 主体路由
const main = {
  Tab: { screen: NavTabs },
  NoHeader: { screen: NoHeader },
  HasHeader: { screen: HasHeader },
};
const mainOptions = {
  defaultNavigationOptions: {
    header: null,
  },
};
const Main = createStackNavigator(main, mainOptions);

// 根路由
const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Main },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

export const routerReducer = createNavigationReducer(AppNavigator);

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router,
);

const App = reduxifyNavigator(AppNavigator, 'root')

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    console.log('装载没有')
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    console.log('卸载没有')
  }
  
  getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return this.getActiveRouteName(route)
  }
  return route.routeName
}

  backHandle = () => {
    const currentScreen = this.getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { app, dispatch, router } = this.props

    if (app.loading) return <Text>正在加载。。。</Text>

    return <App dispatch={dispatch} state={router} />
  }

}

export default Router
