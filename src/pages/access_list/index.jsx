import React, { memo, useState, useRef, useEffect, useCallback, Fragment } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Table, Button, Tag, PageHeader, message } from 'antd';
import AccessListWrapper from './style';
import { AccessModal } from './components';
import { getAccessListAction } from './store/actioncreators';
import { deleteAccess } from '../../api/access';

const typeMap = {
  0: '模块',
  1: '菜单',
  2: '操作'
};

const breadcrumb = [
  {
    breadcrumbName: '权限管理',
  },
  {
    breadcrumbName: '权限列表',
  },
];

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

  const handleDelete = useCallback(async (value) => {
    const res = await deleteAccess(value);
    if (res) {
      message.success('删除成功');
      dispatch(getAccessListAction());
    }
  }, [dispatch]);

  const handleShowModal = useCallback((value) => {
    if (typeof value === 'undefined') {
      setAccess(null);
    } else if (typeof value === 'object') {
      const data = {};
      for (let key of Object.keys(value)) {
        if (key !== 'children') {
          data[key] = value[key];
        }
      }
      data.type = data.type.toString();
      setAccess(data);
    }
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
      title: '操作',
      key: 'action',
      width: 100,
      render: (value) => {
        return (
          <Fragment>
            {/* <Tag color='processing' onClick={() => handleShowModal(value)}>
              编辑
            </Tag> */}
            <Tag color='error' onClick={() => handleDelete(value)}>
              删除
            </Tag>
          </Fragment>
        );
      }
    }
  ];

  return (
    <>
      <PageHeader className='page-header' title='权限列表' breadcrumb={{ routes: breadcrumb }} />
      <AccessListWrapper>
        <div className='operation'>
          <Button type='primary' onClick={ () => handleShowModal() }>添加权限</Button>
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
