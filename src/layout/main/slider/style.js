import styled from 'styled-components';

export default styled.div`
  @media(max-width: 764px) {
    .slider .slider-content {
      left: -208px;
      width: 208px;
    }

    .foundation {
      width: 0;
    }
  }

  @media(max-width: 788px) {
    .toggle {
      display: none !important;
    }
  }

  @media(min-width: 764px) {
    .slider .slider-content {
      width: 48px;
    }

    .foundation {
      width: 48px;
    }
  }

  @media(min-width: 788px) {
    .slider .slider-content {
      width: 208px;
    }

    .foundation {
      width: 208px;
    }
  }

  .slider-mini {
    .slider-content {
      width: 48px;
    }
  }

  .slider-mini ~ .foundation {
    width: 48px;
  }

  .slider-active {
    .slider-content {
      left: 0;
    }

    .slider-curtain {
      display: block;
    }
  }

 .slider-content {
    height: 100%;
    position: absolute;
    z-index: 999;
    transition: all .5s;
    background-color: #001529;

    .logo {
      color: #fff;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
  }

  .slider-curtain {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    display: none;
    z-index: 998;
  }

  .toggle {
    color: #7C8791;
    font-size: 18px;
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 10px 0 10px 10px;
    border-top: 1px solid #00101F;
    display: block;
    background-color: #001529;
    z-index: 10;

    span:hover {
      color: #fff;
      cursor: pointer;
    }
  }

  .foundation {
    transition: width .5s;
  }
`;
