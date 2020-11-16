import request from '../utils/request';

/**
 * 管理员登录
 * @param {object} data username, password
 */
export const loginAdmin = (data) => {
  return request({
    data,
    url: '/admin/login',
    method:'post',
  })
}