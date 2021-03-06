import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BackHandler, Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  createDrawerNavigator, createBottomTabNavigator, createStackNavigator,
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { NavigationActions, routeUtil } from './utils';
import Icon from './components/Icon';

import Login from './views/Account/Login';
import Logout from './views/Account/Logout';
import PasswordReset from './views/Account/PasswordReset';
import Home from './views/Home';
import DoRecord from './views/DoRecord';
import ErrorBook from './views/ErrorBook';
import My from './views/My';
import DoRecordFilter from './views/DoRecordFilter';
import Header from './components/Header';
import Test from './views/Test';
import Test1 from './views/Test1';

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
    path: 'home',
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
    path: 'my',
  },
};
const navTabOptions = {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => (
    (() => {
      const { routeName } = navigation.state;
      const route = routeUtil.routeMapIconAndName[routeName];
      const { icon, name } = route;
      return {
        tabBarIcon: ({ tintColor }) => <Icon name={icon} size={22} color={tintColor} />,
        tabBarLabel: ({ focused }) => <Text style={{ textAlign: 'center', fontSize: 10, color: focused ? '#08C299' : '#999999' }}>{name}</Text>,
      };
    })()),
  tabBarOptions: {
    activeTintColor: '#08C299',
    inactiveTintColor: '#BFBFBF',
    tabStyle: {
      justifyContent: 'space-between',
      paddingTop: 5,
      paddingBottom: 5,
    },
    style: {
      height: 52,
      borderTopColor: '#efefef',
      // 阴影
      shadowOffset: { width: 5, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      shadowColor: 'rgba(0,0,0,1)',
      elevation: 6,
    },
  },
};
const NavTabs = createBottomTabNavigator(navTabs, navTabOptions);

// 没有 header 的路由集合
const noOrCustomHeader = {
  Logout: { screen: Logout },
  PasswordReset: { screen: PasswordReset },
};
const noOrCustomHeaderOptions = {
  defaultNavigationOptions: {
    header: null,
  },
};
const NoHeader = createStackNavigator(noOrCustomHeader, noOrCustomHeaderOptions);

// 含有 header 的路由集合
const hasHeader = {
  Test: { screen: Test },
  Test1: { screen: Test1 },
};
const hasHeaderOptions = {
  defaultNavigationOptions: {
    header: ({ scene }) => {
      const { route: { routeName } } = scene;
      return <Header title={routeUtil.routeMapTitle[routeName]} />;
    },
  },
};
const HasHeader = createStackNavigator(hasHeader, hasHeaderOptions);

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
  },
);

export const routerReducer = createNavigationReducer(AppNavigator);

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router,
);

const App = reduxifyNavigator(AppNavigator, 'root');

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentDidMount() {
    // 每次从后台切换至前台时都需要根据当前路由重置statusBar状态
    const { router } = this.props;
    const currentRouter = routeUtil.getActiveRouteName(router);
    routeUtil.statusBarImmersiveRouter.forEach((v) => {
      routeUtil.setStatusBar(v === currentRouter);
    });

    // 监听返回按键
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
  }

  backHandle = () => {
    const { router, dispatch } = this.props;
    const currentRouter = routeUtil.getActiveRouteName(router);
    global.ROUTERS.pop();
    console.log(187, global.ROUTERS);
    console.log(186, currentRouter);
    if (currentRouter === 'Login') {
      console.log('在按一次退出');
      return true;
    }

    if (currentRouter !== 'Home') {
      dispatch(NavigationActions.back());
      return true;
    }
    return false;
  }

  render() {
    const { app, dispatch, router } = this.props;
    if (app.loading) return <Text>正在加载。。。</Text>;

    return <App dispatch={dispatch} state={router} />;
  }
}

Router.defaultProps = {
  router: {},
  dispatch: () => {},
  app: {},
};

Router.propTypes = {
  router: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
};

export default Router;
