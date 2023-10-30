import styled, { css } from 'styled-components';
import { StyledMessageContainerProps } from './MessageContainer.types';

const StyledMessageContainer = styled.div<StyledMessageContainerProps>`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  .im-container.im-container-info {
    padding: ${(props) => (props.smallPadding ? '5px' : '10px')};
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.bold && 'bold'};
    line-height: 1.4;
    display: flex;
    gap: 10px;

    .im-container-info-icon {
      width: 35px;
      ${(props) =>
        props.isSmall &&
        css`
          width: 20px;
        `}
    }

    .im-container-info-text {
      display: flex;
      align-items: center;
      flex: 1;
      margin-top: 2px;
    }
  }

  .im-container.im-container-info.im-question {
    color: var(--primary-color);
    background-color: var(--primary-light-color);
  }

  .im-container.im-container-info.im-error {
    color: var(--error-color);
    background-color: var(--error-light-color);
  }

  .im-container.im-container-info.im-valid {
    color: var(--valid-color);
    background-color: var(--valid-light-color);
  }

  .im-container.im-container-info.im-warning {
    color: var(--warning-color);
    background-color: var(--warning-light-color);
  }

  .im-container.im-container-info.im-info {
    color: var(--typeface-medium-color);
    background-color: var(--container-medium-color);
  }
`;

export default StyledMessageContainer;
