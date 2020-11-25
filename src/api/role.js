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

export const addRole = (data) => {
  return request({
    url: '/admin/role/create',
    method: 'post',
    data
  });
}

export const updateRole = (id, data) => {
  return request({
    url: '/admin/role/update',
    method: 'put',
    data: {
      id,
      data
    }
  });
}

export const deleteRole = (id) => {
  return request({
    url: '/admin/role/delete',
    method: 'delete',
    data: {
      id
    }
  });
}

// 设置用户对应的权限
export const setRoleAccess = (role_id, ids) => {
  return request({
    url: '/admin/role/access/update',
    method: 'put',
    data: {
      role_id,
      accessIds: ids
    }
  });
}