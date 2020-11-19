import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Breadcrumb, Table, Switch, Button } from 'antd';
import AccessListWrapper from './style';
import { AccessModal } from './components';
import { getAccessListAction } from './store/actioncreators';

const typeMap = {
  0: '模块',
  1: '菜单',
  2: '操作'
};

function AccessList() {
  const [access, setAccess] = useState(null);
  const accessModelRef = useRef();
  const dispatch = useDispatch();

  const { accessTreeList } = useSelector(store => ({
    accessTreeList: store.getIn(['accessListInfo', 'treeList'])
  }), shallowEqual);

  const handleOk = useCallback(() => {
    dispatch(getAccessListAction());
  }, [dispatch]);

  const handleDelete = useCallback(() => {
    console.log('delete');
  }, []);

  const handleEdit = useCallback(() => {
    setAccess({ module_name: 1, })
    accessModelRef.current.showModal();
  }, []);

  useEffect(() => {
    handleOk();
  }, [handleOk]);


  const columns = [
    {
      title: '模块名称',
      dataIndex: 'module_name',
      key: 'module_name',
    },
    {
      title: '动作名称',
      dataIndex: 'action_name',
      key: 'action_name',
    },
    {
      title: '权限描述',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => desc !== '' ? desc : '暂无描述'
    },
    {
      title: '权限类别',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <span className={ `type-` + type }>{ typeMap[type] }</span>
      )
    },
    {
      title: '权限地址',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '权限状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Switch defaultChecked={ status }/>
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: () => {
        return (
          <>
            <Button type='link' size='small' onClick={ handleEdit }>编辑</Button>
            <Button type='link' size='small' danger onClick={ handleDelete }>
              删除
            </Button>
          </>
        );
      }
    }
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>权限管理</Breadcrumb.Item>
        <Breadcrumb.Item>权限列表</Breadcrumb.Item>
      </Breadcrumb>
      <AccessListWrapper>
        <div className='operation'>
          <Button type='primary' onClick={ () => accessModelRef.current.showModal() }>添加权限</Button>
          <Button type='ghost'>导出表格</Button>
        </div>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={accessTreeList}
        />
      </AccessListWrapper>
      <AccessModal
        data={ access }
        onOk={ handleOk }
        ref={ accessModelRef }
      />
    </>
  )
}

export default memo(AccessList);
