import React, { Fragment, memo, useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { PageHeader, Table, Tag, Button, message, Popconfirm } from 'antd';
import RoleListWrapper from './style';
import { getRoleListAction } from './store/actioncreators';
import { AccessModal, RoleModal } from './components';

import { deleteRole } from '@/api/role';

const breadcrumb = [
  {
    breadcrumbName: '角色管理',
  },
  {
    breadcrumbName: '角色列表',
  },
]

function RoleList() {
  const [currentRoleId, setCurrentRoleId] = useState();
  const [roleData, setRoleData] = useState(null);
  const dispatch = useDispatch();
  const accessModalRef = useRef();
  const roleModalRef = useRef();
  const { list } = useSelector(state => ({
    list: state.getIn(['roleListInfo', 'roleList'])
  }), shallowEqual);

  const handle = useCallback(({ _id }) => {
    // 保存角色 id
    setCurrentRoleId(_id);
    accessModalRef.current.showAccessModal();
  }, []);

  const handleShowModal = useCallback((value) => {
    if (typeof value === 'undefined') {
      setRoleData(null);
    } else if (typeof value === 'object') {
      setRoleData(value);
    }
    roleModalRef.current.showModal();
  }, []);

  const handleDelete = useCallback(async (id) => {
    const bool = await deleteRole(id); 
    if (bool) {
      message.success('删除成功');
      dispatch(getRoleListAction());
    }
  }, [dispatch]);

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      render: (desc) => (
        <span>
          { desc ? desc : '暂无描述' }
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 230,
      render: (value) => (
        <Fragment>
          <Tag color='success' onClick={() => handleShowModal(value)}>编辑</Tag>
          <Tag color='processing' onClick={() => handle(value)}>
            权限关联
          </Tag>
          <Popconfirm
            title='确定要删除吗?'
            okText='删除'
            cancelText='取消'
            onConfirm={() => handleDelete(value._id)}
          >
            <Tag color='error'>删除</Tag>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getRoleListAction());
  }, [dispatch]);

  return (
    <RoleListWrapper>
      <PageHeader className='page-header' title='角色列表' breadcrumb={{ routes: breadcrumb }} />
      <div className='operation'>
        <Button type='primary' onClick={() => handleShowModal()}>添加角色</Button>
      </div>
      <Table columns={columns} dataSource={list} rowKey='_id' />
      {/* Modal */}
      <AccessModal ref={accessModalRef} roleId={currentRoleId} />
      <RoleModal ref={roleModalRef} data={roleData} />
    </RoleListWrapper>
  );
}

export default memo(RoleList);
