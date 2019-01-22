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

export default {
  routeMapTitle,
  getActiveRouteName,
};
