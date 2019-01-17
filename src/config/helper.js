import { site } from './site.config';

console.log(2, site);
/**
 * api链接处理
 * @param {string} siteName
 * @param {string} pathname - 路径，必输
 * @example
 * Helper.apiResolve('current', 'aaa') // => 'http://xxx-api.ecaicn.com/aaa'
 * Helper.apiResolve('cjhms', 'aaa') // => 'http://cjhms-api.ecaicn.com/aaa'
 */
const apiResolve = (siteName, pathname) => {
  let url = `${site[siteName].protocol}://${site[siteName].api}${pathname}`;

  if (pathname.charAt(0) !== '/') {
    // 如果url是以http开头说明是个完整的地址不需要拼接，直接返回
    url = `${site[siteName].protocol}://${site[siteName].api}/${pathname}`;
  }

  return url;
};

export default { apiResolve };
