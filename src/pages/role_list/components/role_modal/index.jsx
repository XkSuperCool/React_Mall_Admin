import React, { memo, useState, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Input, Switch, message } from 'antd';

import { addRole, updateRole } from '@/api/role';
import { pushRoleListAction, updateRoleListAction } from '../../store/actioncreators';

const RoleModal = forwardRef(({ data }, ref) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isAdd = data === null ? true : false;

  useImperativeHandle(ref, () => ({
    showModal: () => setVisible(true)
  }), []);

  useEffect(() => {
    if (isAdd) {
      form.resetFields();
    } else {
      form.setFieldsValue(data);
    }
  }, [form, data, isAdd]);

  const handleClickOk = useCallback(() => {
    form.submit();
  }, [form]);

  const handleFinish = useCallback(async (value) => {
    let res = null;
    if (isAdd) {
      res = await addRole(value);
      if (res) {
        dispatch(pushRoleListAction(res));
        message.success('添加角色成功！');
      };
    } else {
      res = await updateRole(data._id, value);
      if (res) {
        dispatch(updateRoleListAction(data._id, value));
        message.success('角色修改成功！');
      }
    }

    if (res) {
      form.resetFields();
      setVisible(false);
    }
  }, [isAdd, form, dispatch, data]);

  return (
    <>
      <Modal
        title={isAdd ? '添加角色' : '编辑角色'}
        visible={visible}
        mask={false}
        onCancel={() => setVisible(false)}
        onOk={handleClickOk}
        forceRender={true}
      >
        <Form
          name='roleFrom'
          form={form}
          requiredMark={false}
          onFinish={handleFinish}
          initialValues={{
            status: true
          }}
        >
          <Form.Item
            label='角色名称'
            name='roleName'
            rules={[{ min: 3, required: true, message: '请输入角色名称!' }]}
          >
            <Input placeholder='请输入角色名称' />
          </Form.Item>
          <Form.Item
            label='角色描述'
            name='description'
            rules={[{ max: 200, min: 5, message: 'max 200 & min 5' }]}
          >
            <Input.TextArea placeholder='输入角色描述' />
          </Form.Item>
          <Form.Item
            label='角色状态'
            name='status'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default memo(RoleModal);
