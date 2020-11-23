import request from '../utils/request';

/**
 * 获取指定 type 的权限
 * @param {*} type
 */
export const getAccess = (type) => {
  let url = `/admin/access`;
  url = type !== undefined ? `${url}?type=${type}` : url + '/all';
  return request({
    url: url,
    method: 'get',
  });
}

/**
 * 添加权限
 * @param {object} data 
 */
export const addAccess = (data) => {
  return request({
    url: '/admin/access/create',
    data: data,
    method: 'post'
  });
}
