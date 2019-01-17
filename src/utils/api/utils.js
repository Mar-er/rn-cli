
export const errCode = (json) => {
  switch (json.code) {
    case 703:
      /**
       * 登陆过期
       * 1. 跳转至登陆页面
       * 2. 清除store
       * 3. 清除storage缓存
       * 4. 提示登陆超时
       */
      console.log(json.message);
      throw new Error(json.message);
    case -1:
      console.log(json.message);
      throw new Error(`${json.code} ${json.message || json.data}`);
    case 0:
      return json;
    default:
      console.error(json.message);
      return json;
  }
};

export const findString = (data, mes) => data.indexOf(mes) !== -1;
