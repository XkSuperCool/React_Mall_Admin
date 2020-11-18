import request from '../utils/request';

/**
 * 获取指定 type 的权限
 * @param {*} type
 */
export const getAccess = (type) => {
  let url = `/admin/access`;
  url = type !== undefined ? `${url}/${type}` : url;
  return request({
    url: url,
    method: 'get',
  });
}
