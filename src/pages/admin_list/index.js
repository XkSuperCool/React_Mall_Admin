import React, { memo } from 'react';
import { PageHeader } from 'antd';

const breadcrumb = [
  {
    breadcrumbName: '管理员管理',
  },
  {
    breadcrumbName: '管理员列表',
  },
];

function AdminList() {
  return (
    <>
      <PageHeader
        className='page-header'
        breadcrumb={{ routes: breadcrumb }}
        title={breadcrumb[breadcrumb.length-1].breadcrumbName}
      />
    </>
  );
}

export default memo(AdminList);
