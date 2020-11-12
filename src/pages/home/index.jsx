import React, { memo } from 'react';

import { Button } from 'antd';

import StyledWrapper from './style';

function Home() {
  return (
    <StyledWrapper>
      <Button>Home</Button>
    </StyledWrapper>
  )
}

export default memo(Home);
