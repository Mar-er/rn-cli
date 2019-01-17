import axios from './base';

export default {
  /**
 * param {Number} url 地址
 * param {Object} parmas 数据
 * param {String} method 请求类型
 */
  get(url, params, config) { return axios('get', url, params, config); },
  post(url, params, config) { return axios('post', url, params, config); },
  put(url, params, config) { return axios('put', url, params, config); },
  delete(url, params, config) { return axios('delete', url, params, config); },
  axios,
};
