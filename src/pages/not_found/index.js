import React, { Fragment } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Fragment>
      404 未找到该页面，
      <Button>
        <Link to='/'>回到首页</Link>
      </Button>
    </Fragment>
  );
}