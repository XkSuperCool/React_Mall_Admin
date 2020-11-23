import React, { memo, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Modal, Tree, Spin, message } from 'antd';
import { getRoleAccess, setToleAccess } from '@/api/role';

// 生成 antd 需要的树形结构
function generateTree(arr) {
  const tree = [];
  for (let item of arr) {
    tree.push({
      title: item.module_name,
      key: item._id.toString(),
      children: (item.children && item.children.length) ? generateTree(item.children) : []
    });
  }
  return tree;
}

const AccessModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [treeData, setTreeData] = useState({
    data: [],
    keys: []
  });

  useImperativeHandle(ref, () => ({
    showAccessModal: () => setVisible(true)
  }), []);

  useEffect(() => {
    if (props.roleId === undefined) return;
    getRoleAccess(props.roleId).then(res => {
      const tree = generateTree(res.tree);
      setTreeData({
        data: tree,
        keys: res.ids
      });
    });
  }, [props]);

  const handleCheck = useCallback((checkedKeys) => {
    setToleAccess(props.roleId, checkedKeys).then(res => {
      if (res) {
        setTreeData({
          data: treeData.data,
          keys: checkedKeys
        });
        message.success('权限修改成功');
      }
    });
  }, [props, treeData]);

  return (
    <>
     <Modal
      title='权限关联'
      mask={ false }
      visible={visible}
      cancelText='取消'
      okText='确定'
      onCancel={ () => setVisible(false) }
      footer={null}
      style={{ textAlign: 'center' }}
    >
      { 
        treeData.data.length ? <Tree
          treeData={treeData.data}
          checkable={true}
          showLine={{ showLeafIcon: false }}
          checkedKeys={treeData.keys}
          defaultExpandAll={true}
          selectable={false}
          onCheck={handleCheck}
        /> : <Spin />
      }
    </Modal>
    </>
  );
});

export default memo(AccessModal);
