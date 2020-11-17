import React, { memo, useState, useCallback } from 'react';
import { Breadcrumb, Table, Switch, Button } from 'antd';
import AccessListWrapper from './style';
import AccessModal from './modal';

const columns = [
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
  },
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
  },
  {
    title: '权限类别',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '权限地址',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: '权限状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <Switch defaultChecked={ status }/>
  },
  {
    title: '父级模块',
    dataIndex: 'module_id',
    key: 'module_id',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: () => {
      return (
        <>
          <Button type='link' size='small'>编辑</Button>
          <Button type='link' size='small' danger>删除</Button>
        </>
      );
    }
  }
];

const data = [
  {
    sort: 1,
    module_name: '管理员管理',
    action_name: 'John Brown sr.',
    description: '管理员管理',
    type: 0,
    url: '/api/admin',
    status: true,
    module_id: '123231',
    _id: 1,
    children: [
      {
        sort: 1,
        module_name: '管理员管理',
        action_name: 'John Brown sr.',
        description: '管理员管理',
        type: 0,
        url: '/api/admin',
        status: true,
        module_id: '123231',
        _id: 11,
      },
      {
        sort: 1,
        module_name: '管理员管理',
        action_name: 'John Brown sr.',
        description: '管理员管理',
        type: 0,
        url: '/api/admin',
        status: true,
        module_id: '123231',
        _id: 122,
        children: [
          {
            sort: 1,
            module_name: '管理员管理',
            action_name: 'John Brown sr.',
            description: '管理员管理',
            type: 0,
            url: '/api/admin',
            status: true,
            module_id: '123231',
            _id: 44,
          },
        ],
      },
      {
        sort: 1,
        module_name: '管理员管理',
        action_name: 'John Brown sr.',
        description: '管理员管理',
        type: 0,
        url: '/api/admin',
        status: true,
        module_id: '123231',
        _id: 12312,
        children: [
          {
            sort: 1,
            module_name: '管理员管理',
            action_name: 'John Brown sr.',
            description: '管理员管理',
            type: 0,
            url: '/api/admin',
            status: true,
            module_id: '123231',
            _id: 1321,
          },
        ],
      },
    ],
  },
];

function AccessList() {
  const [access, setAccess] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleOk = useCallback(() => {
    console.log('ok');
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>权限管理</Breadcrumb.Item>
        <Breadcrumb.Item>权限列表</Breadcrumb.Item>
      </Breadcrumb>
      <AccessListWrapper>
        <div className='operation'>
          <Button type='primary' onClick={ () => setVisible(true) }>添加权限</Button>
          <Button type='ghost'>导出表格</Button>
        </div>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={data}
        />
      </AccessListWrapper>
      <AccessModal
        data={ access }
        visible={ visible }
        handleOk={ handleOk }
        handleCancel={ handleCancel }
      />
    </>
  )
}

export default memo(AccessList);
