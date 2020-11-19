import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  position: absolute;
  z-index: 99;
  background-color: #fff;

  .toggle {
    font-size: 18px;
    visibility: hidden;
  }

  @media(max-width: 764px) {
    .toggle {
      visibility: visible !important;
    }
  }
`;
