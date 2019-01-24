import { StatusBar } from 'react-native';

// 获取当前路由
const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

// 定义那些路由需要设置沉浸式样式(与背景色一致的样式)
const statusBarImmersiveRouter = ['Login'];

// 给指定路由设置状态栏样式
const setStatusBar = (param) => {
  if (param) {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('#08C299', true);
  } else {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor('#ffffff', true);
  }
};

// 映射路由title
const routeMapTitle = {
  Test: '我就是个bug快来解决我吧',
  PersonalInformation: '个人信息',
  SubjectSetting: '作业PK科目设置',
  RankBoard: '排行榜',
  PlanDetail: '计划/执行任务统计',
};

// 映射tabs路由名字与icon
const routeMapIconAndName = {
  Home: {
    icon: 'zuoyerenwu',
    name: '作业任务',
  },
  DoRecord: {
    icon: 'zuotijilu',
    name: '做题记录',
  },
  ErrorBook: {
    icon: 'cuotiben',
    name: '错题本',
  },
  My: {
    icon: 'wode',
    name: '我的',
  },
};


export default {
  routeMapTitle,
  getActiveRouteName,
  routeMapIconAndName,
  setStatusBar,
  statusBarImmersiveRouter,
};
