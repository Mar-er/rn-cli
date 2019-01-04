import {
  createBottomTabNavigator, createAppContainer,
  createStackNavigator, createDrawerNavigator,
} from 'react-navigation';
import Home from './views/Home';
import DoRecord from './views/DoRecord';
import ErrorBook from './views/ErrorBook';
import My from './views/My';
import DoRecordFilter from './views/DoRecordFilter';
import SignIn from './views/Account/SignIn';
import SignUp from './views/Account/SignUp';
import PasswordReset from './views/Account/PasswordReset';
import Test from './views/Test';

// 模态
// const modal = {
//     Modal: {
//         screen: Test,
//         path: ''
//     }
// }
// const modalOption = {
//     mode: 'modal'
// }
// const Modal = createDrawerNavigator(modal, modalOption)

// 做题记录 Drawer 路由
const doRecordDrawer = {
  DoRecord: {
    screen: DoRecord,
    path: '',
  },
};
const doRecordOption = {
  drawerPosition: 'right',
  contentComponent: DoRecordFilter,
  drawerWidth: 600,
};
const DoRecordDrawer = createDrawerNavigator(doRecordDrawer, doRecordOption);

// 账号 路由
const account = {
  SignIn: {
    screen: SignIn,
    path: '',
  },
  SignUp: {
    screen: SignUp,
    path: '',
  },
  PasswordReset: {
    screen: PasswordReset,
    path: '',
  },
};
const accountOption = {
  initialRouteName: 'SignIn',
  defaultNavigationOptions: {
    header: null,
  },
};
const AccountRouter = createStackNavigator(account, accountOption);

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
const NavTabsRouter = createBottomTabNavigator(navTabs, navTabOptions);

// app 根路由
const appRouter = {
  Account: {
    screen: AccountRouter,
  },
  Tab: {
    screen: NavTabsRouter,
  },
  // Modal: {
  //     screen: Modal
  // }
};
const appOption = {
  initialRouteName: 'Account',
  defaultNavigationOptions: {
    header: null,
  },
};
const AppRouter = createStackNavigator(appRouter, appOption);
const AppContainer = createAppContainer(AppRouter);

export default AppContainer;
