import styled from 'styled-components';

export default styled.div`
  display: flex;
  height: 100vh;

  .content {
    width: 0;
    display: flex;
    flex: auto;
    flex-direction: column;
    transition: padding .5s;
    position: relative;
  }

  .main {
    height: 0;
    flex: auto;
    background-color: #F0F2F5;
    padding: 50px 10px 0 10px;
  }
`;
