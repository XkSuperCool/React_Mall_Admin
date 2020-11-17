import React, { memo, Fragment } from 'react';
import { Modal, Input, Form, Radio, Select } from 'antd';

const { Option } = Select;

function AccessModal({ visible, handleOk, handleCancel, data }) {
  const [form] = Form.useForm();
  return (
    <Modal
      title={ data ? '编辑权限' : '添加权限' }
      okText={ data ? '确定' : '创建' }
      cancelText='取消'
      visible={ visible }
      onOk={ handleOk }
      onCancel={ handleCancel }
      mask={ false }
    >
       <Form
        form={form}
        name='access-form'
        layout='vertical'
        initialValues={{
          type: 0,
        }}
       >
        <Form.Item
          label='模块名称'
          name='module_name'
          rules={[{ required: true, message: '请输入模块名称!' }]}
        >
          <Input placeholder='请输入模块名称' />
        </Form.Item>
        <Form.Item
          label='动作名称'
          name='action_name'
          rules={[{ required: true, message: '请输入动作名称!' }]}
        >
          <Input placeholder='请输入动作名称' />
        </Form.Item>
        <Form.Item
          label='权限类别'
          name='type'
          rules={[{ required: true, message: '请选择权限类别!' }]}
        >
          <Radio.Group>
            <Radio value={ 0 }>模块</Radio>
            <Radio value={ 1 }>菜单</Radio>
            <Radio value={ 2 }>操作</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label='权限地址'
          name='url'
          rules={[{ required: true, message: '请输入权限地址!' }]}
        >
          <Input placeholder='请输入权限地址' />
        </Form.Item>
        <Form.Item
          label='父级权限'
          name='module_id'
          shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
        >
          <Select placeholder='选择父级权限'>
            {({ getFieldValue }) => {
              return getFieldValue('type') === 0 ? (
                <Option value={ 0 }>顶级模块（没有父级）</Option>
              ) : (
                <Fragment>
                  <Option value='lucy'>Lucy</Option>
                  <Option value='Yiminghe'>yiminghe</Option>
                </Fragment>
              )
            }}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default memo(AccessModal);
