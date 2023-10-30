import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const rotateReverse = keyframes`
from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
`;

export const StyledDoubleLogoAnimation = styled.figure`
  .im-small-gear {
    animation: ${rotateReverse} infinite 4s linear;
  }

  .im-large-gear {
    animation: ${rotate} infinite 5s linear;
  }

  .im-small-gear,
  .im-large-gear {
    position: absolute;
  }

  &.im-double-gear-large {
    width: 250px;
    height: 250px;
    position: relative;
    .im-small-gear {
      width: 120px;
      margin-top: 8px;
      margin-left: 13px;
    }

    .im-large-gear {
      width: 150px;
      right: 0;
      margin-top: 90px;
      margin-right: 10px;
    }
  }

  &.im-double-gear-medium {
    width: 130px;
    height: 130px;
    position: relative;
    .im-small-gear {
      width: 60px;
      margin-top: 0px;
      margin-left: 0px;
    }

    .im-large-gear {
      width: 90px;
      right: 0px;
      margin-top: 40px;
      margin-right: 1px;
    }
  }
`;

export const StyledSingleLogoAnimation = styled.figure`
  &.im-single-gear-tiny {
    .im-single-gear {
      width: 25px;
      height: 25px;
      animation: ${rotate} infinite 5s linear;
    }
  }

  &.im-single-gear-small {
    .im-single-gear {
      width: 40px;
      height: 40px;
      animation: ${rotate} infinite 5s linear;
    }
  }
`;
