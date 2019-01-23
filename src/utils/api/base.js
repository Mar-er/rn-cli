import qs from 'qs';
import R from 'ramda';
import axios, { CancelToken } from 'axios';
import { errCode, findString } from './utils';

export default (method = 'get', url, params = {}, config = {}) => {
  const headers = {};
  // if (token) headers.token = token;
  headers['Content-Type'] = 'application/json';
  const { getAbort } = config;

  let options = {
    method,
    headers,
    data: params,
    paramsSerializer: param => qs.stringify(param, { arrayFormat: 'repeat' }),
    withCredentials: true,
    timeout: 3000,
  };
  if (getAbort) {
    options.cancelToken = new CancelToken(getAbort);
  }

  options = R.merge(options, config);

  return axios(url, options)
    .then((response) => {
      const {
        data, status, statusText,
      } = response;

      if (status !== 200) {
        const errmes = `${status} ${statusText}`;
        console.error(errmes);
        return Promise.reject(new Error(errmes));
      }

      return errCode(data);
    })
    .catch((err) => {
      if (findString(err.message, 'Network request failed')) {
        console.error('当前设备网络异常，请检查网络');
      } else if (findString(err.message, 'timeout')) {
        console.log('请求超时');
      } else {
        console.error(err.message);
      }
      throw new Error(err);
    });
};
