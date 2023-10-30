import styled, { css } from 'styled-components';
import { StyledButtonImageProps } from './ButtonImage.types';

const StyledButtonImage = styled.div<StyledButtonImageProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: 2px solid transparent;
  border-radius: var(--container-border-radius);
  box-sizing: content-box;
  cursor: pointer;

  button {
    background-image: url(${(props) => props.backgroundImage});
    border: 3px solid var(--container-white-color);
    border-radius: var(--container-border-radius);
    background-size: cover;
    width: 100%;
    height: 100%;
    cursor: pointer;
    box-shadow: var(--container-box-shadow);
  }

  ${(props) =>
    props.selected &&
    css`
      border: 3px solid var(--primary-color);
    `}

  &:hover {
    opacity: 80%;
  }
`;

export default StyledButtonImage;
