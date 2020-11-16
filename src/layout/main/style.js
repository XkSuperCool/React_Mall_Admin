import styled from 'styled-components';

export default styled.div`
  display: flex;
  
 .slider {
    width: 150px;
    height: 100vh;
    background-color: red;
  }


  .content {
    width: 0;
    display: flex;
    flex: auto;
    flex-direction: column;
    height: calc(100vh - 50px);
  }

  header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .5);

    .logo {
      width: 150px;
    }
  }

  .main {
    height: 0;
    flex: auto;
    background-color: #F0F2F5;
    padding: 10px 10px 0 10px;
  }
`;
