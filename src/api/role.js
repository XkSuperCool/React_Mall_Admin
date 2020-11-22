import request from '@/utils/request';

export const getRoleList = () => {
  return request({
    url: '/admin/role'
  });
}

export const getRoleAccess = (user_id) => {
  return request({
    url: `/admin/role/access/${user_id}`
  });
}

export const setToleAccess = (role_id, ids) => {
  return request({
    url: '/admin/role/access/update',
    method: 'put',
    data: {
      role_id,
      accessIds: ids
    }
  });
}