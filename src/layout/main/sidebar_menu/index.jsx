import React, { memo } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function SidebarMenu(props) {
  return (
    <Menu
      defaultSelectedKeys={['goods']}
      defaultOpenKeys={['goods']}
      mode='inline'
      theme='dark'
      inlineIndent={ 10 }
      inlineCollapsed={ props.inlineCollapsed }
      style={{ width: '100%' }}
    >
      <SubMenu key='goods' icon={<MailOutlined />} title='商品管理'>
        <Menu.Item key='goods-1'>商品管理</Menu.Item>
        <Menu.Item key='goods-2'>添加商品</Menu.Item>
      </SubMenu>
      <SubMenu key='role' icon={<PieChartOutlined />} title='角色管理'>
        <Menu.Item key='role-1'>角色列表</Menu.Item>
      </SubMenu>
      <SubMenu key='access' icon={<DesktopOutlined />} title='权限管理'>
        <Menu.Item key='access-1'>权限列表</Menu.Item>
      </SubMenu>
      <SubMenu key='admin' icon={<AppstoreOutlined />} title='管理员管理'>
        <Menu.Item key='admin-1'>管理员列表</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default memo(SidebarMenu);
