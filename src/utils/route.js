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

const routeMapTitle = {
  Test: '测试',
  PersonalInformation: '个人信息',
  SubjectSetting: '作业PK科目设置',
  RankBoard: '排行榜',
  PlanDetail: '计划/执行任务统计',
};

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
};
