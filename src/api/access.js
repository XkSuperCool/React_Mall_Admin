import request from '../utils/request';

/**
 * 获取指定 type 的权限
 * @param {*} type
 */
export const getAccessByType = (type) => {
  return request({
    url: `/admin/access/${ type }`,
    method: 'get',
  });
}
