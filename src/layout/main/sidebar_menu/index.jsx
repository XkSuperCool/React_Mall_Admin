import React, { memo, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

const { SubMenu } = Menu;
const Icon = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_2209450_nu60vxh6r8l.js' });

function SidebarMenu(props) {
  const handleClickMenu = useCallback(({ key }) => {
    props.history.push(key);
  }, [props.history]);

  const path = props.location.pathname;
  const openKey = path.match(/\/m\/([a-z]+)\/[a-z]+/);

  return (
    <Menu
      selectedKeys={[path]}
      defaultOpenKeys={[
        openKey ? openKey[1] : ''
      ]}
      mode='inline'
      theme='dark'
      inlineIndent={ 10 }
      inlineCollapsed={ props.inlineCollapsed }
      style={{ width: '100%' }}
      onClick={ handleClickMenu }
    >
      <SubMenu key='goods' icon={ <Icon type='icon-shangpin' /> } title='商品管理'>
        <Menu.Item key='/m/goods/admin'>商品管理</Menu.Item>
        <Menu.Item key='/m/goods/add'>添加商品</Menu.Item>
      </SubMenu>
      <SubMenu key='role' icon={ <Icon type='icon-jiaoseguanli' /> } title='角色管理'>
        <Menu.Item key='/m/role/list'>角色列表</Menu.Item>
      </SubMenu>
      <SubMenu key='access' icon={ <Icon type='icon-quanxianshezhi' /> } title='权限管理'>
        <Menu.Item key='/m/access/list'>权限列表</Menu.Item>
      </SubMenu>
      <SubMenu key='admin' icon={ <Icon type='icon-guanliyuan' /> } title='管理员管理'>
        <Menu.Item key='/m/admin/list'>管理员列表</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default memo(withRouter(SidebarMenu));
