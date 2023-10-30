import styled, { css } from 'styled-components';
import { StyledScalingSystemGroupCardProps } from './ScalingSystemGroupCard.types';

const StyledScalingSystemCard = styled.div<StyledScalingSystemGroupCardProps>`
  height: 140px;
  flex: 1 0 32%;
  min-width: 290px;
  max-width: 32.5%;

  &.im-full-width {
    min-width: 100%;
    max-width: none;
    .im-scaling-system-group-card-content {
      flex-direction: column;
      width: 100%;

      figure {
        width: 100%;
      }

      .im-scaling-system-group-card-info {
        align-items: center;
      }
    }
  }

  .im-scaling-system-group-card-content {
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    width: 100%;
    display: flex;
    height: 100%;
    box-shadow: var(--container-box-shadow);

    .im-scaling-system-group-card-additional-training {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--error-color);
      font-weight: bold;
      font-size: 20px;
    }

    ${(props) =>
      props.isClickable &&
      css`
        cursor: pointer;
        &:hover {
          border-color: var(--error-color);
        }
      `}

    figure {
      width: 35%;
      padding: 10px;
      display: flex;
      align-items: center;
      .im-scaling-system-icon {
        max-width: 100%;
      }
    }

    .im-scaling-system-group-card-info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: 10px;
      gap: 5px;
      flex: 1;

      .im-scaling-system-group-card-title {
        font-size: 18px;
        font-weight: bold;
        color: var(--typeface-medium-color);
      }
      .im-scaling-system-group-card-description {
        font-size: 14px;
        color: var(--typeface-light-color);
        line-height: 1.2;
      }
    }
  }
`;

export default StyledScalingSystemCard;
