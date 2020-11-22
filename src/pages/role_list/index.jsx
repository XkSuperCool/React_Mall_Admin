import React, { Fragment, memo, useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { PageHeader, Table, Switch, Tag } from 'antd';
import RoleListWrapper from './style';
import { getRoleListAction } from './store/actioncreators';
import { AccessModal } from './components';

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
  const dispatch = useDispatch();
  const accessModalRef = useRef();
  const { list } = useSelector(state => ({
    list: state.getIn(['roleListInfo', 'roleList'])
  }), shallowEqual);

  const handle = useCallback(({ _id }) => {
    // 保存角色 id
    setCurrentRoleId(_id);
    accessModalRef.current.showAccessModal();
  }, []);

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
      title: '状态',
      dataIndex: 'status',
      render: (status) => (
        <Switch checked={status} size='small' />
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 230,
      render: (value) => (
        <Fragment>
          <Tag color='success'>编辑</Tag>
          <Tag color='processing' onClick={ () => handle(value) }>
            权限关联
          </Tag>
          <Tag color='error'>删除</Tag>
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
      <Table columns={columns} dataSource={list} rowKey='_id' />
      {/* Modal */}
      <AccessModal ref={accessModalRef} roleId={ currentRoleId } />
    </RoleListWrapper>
  );
}

export default memo(RoleList);
