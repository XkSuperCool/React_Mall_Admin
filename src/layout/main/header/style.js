import styled from 'styled-components';

export default styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .5);

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
