import React, { memo, Fragment, useCallback, useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getAccessListAction } from '../../store/actioncreators';
import { Modal, Input, Form, Radio, Select, InputNumber, Row, Col, Switch, message } from 'antd';
import { addAccess } from '@/api/access';

const { Option } = Select;

const AccessModal = forwardRef(({ data, onOk }, ref) => {
  const isData = data !== null && Object.keys(data).length > 0;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formRef = useRef();
  const { access_list } = useSelector(store => ({
    access_list: store.getIn(['accessListInfo', 'list'])
  }), shallowEqual);

  useImperativeHandle(ref, () => ({
    showModal: () => setVisible(true)
  }), []);

  useEffect(() => {
    if (isData) {
      form.setFieldsValue(data);
      if (data.type !== 0) {
        dispatch(getAccessListAction(data.type - 1));
      }
    } else {
      form.resetFields();
    }
  }, [data, isData, form, dispatch]);

  const handleTypeChange = useCallback((e) => {
    const type = e.target.value;
    if (type !== 0) {
      dispatch(getAccessListAction(type - 1));
    }
    // 重置 module_id
    form.setFieldsValue({ module_id: null })
  }, [dispatch, form]);

  const onCancel = useCallback(() => {
    formRef.current.resetFields(); // 取消 modal 时重置表单
    setVisible(false); // 隐藏弹出框
  }, [formRef]);

  const handleFinish = useCallback(async (value) => {
    let success = false;
    if (isData) {
      // 修改
    } else {
      // 添加
      success = await addAccess(value);
    }
    if (success) {
      message.success('添加成功');
      onCancel();
      onOk();
    }
  }, [isData, onCancel, onOk]);

  return (
    <Modal
      title={ isData ? '编辑权限' : '添加权限' }
      okText={ isData ? '确定' : '创建' }
      cancelText='取消'
      visible={ visible }
      onOk={ () => formRef.current.submit() }
      onCancel={ onCancel }
      mask={ false }
      forceRender={true}
    >
      <Form
        form={ form }
        name='access-form'
        layout='vertical'
        initialValues={{
          type: '0',
          sort: 0,
          status: true
        }}
        ref={ formRef }
        onFinish={ handleFinish }
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
        >
          <Input placeholder='请输入动作名称' />
        </Form.Item>
        <Form.Item
          label='权限类别'
          name='type'
          rules={[{ required: true, message: '请选择权限类别!' }]}
        >
          <Radio.Group onChange={ handleTypeChange }>
            <Radio value={ '0' }>模块</Radio>
            <Radio value={ '1' }>菜单</Radio>
            <Radio value={ '2' }>操作</Radio>
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
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
        >
           {({ getFieldValue }) => {
              return (
                <Form.Item
                  label='父级权限'
                  name='module_id'
                  rules={[{ required: true, message: '请选择父级模块!' }]}
                >
                  <Select placeholder='请选择父级模块'>
                    {
                      getFieldValue('type') === "0" ?
                      <Option value={ "0" }>顶级模块（没有父级）</Option> :
                      (
                        <Fragment>
                          {
                            access_list.map(item => {
                              return (
                                <Option value={ item._id } key={ item._id }>
                                  { item.module_name }
                                </Option>
                              );
                            })
                          }
                        </Fragment>
                      )
                    }
                  </Select>
                </Form.Item>
              )
            }}
        </Form.Item>
        <Form.Item noStyle>
          <Row>
            <Col span={ 12 }>
              <Form.Item label='排序' name='sort'>
                <InputNumber />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label='状态' name='status' valuePropName='checked'>
                <Switch checkedChildren='开启' unCheckedChildren='关闭' />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name='description' label='描述信息'>
          <Input.TextArea placeholder='输入权限描述...' />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default memo(AccessModal);
