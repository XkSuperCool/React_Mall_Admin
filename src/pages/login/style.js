import styled from 'styled-components';

export default styled.div`
  height: 100vh;
  background: url(${ props => props.url }) no-repeat;
  background-size: 100% 100%;

  .form {
    padding: 30px 20px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, .7);
    position: absolute;
    right: 10%;
    top: 25%;
  }

  .ant-form-item-label {
    padding-bottom: 0px;
  }

  .captcha {
    cursor: pointer;
  }
`;
