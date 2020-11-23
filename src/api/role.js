import request from '@/utils/request';

export const getRoleList = () => {
  return request({
    url: '/admin/role/all'
  });
}

export const getRoleAccess = (user_id) => {
  return request({
    url: `/admin/role/access`,
    params: {
      id: user_id
    }
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