import styled from 'styled-components';

const StyledScalingSystemSessionCard = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 0 15px;
  max-width: 100%;

  .im-signature-solution-training-session-card {
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    box-shadow: var(--container-box-shadow);
    width: 250px;
    padding: 5px;
    height: 210px;
    cursor: pointer;

    &.im-full-width {
      width: 100%;

      figure {
        display: flex;
        align-items: center;
        justify-content: center;

        .im-signature-solution-training-session-thumbnail {
          width: inherit;
          max-width: 100%;
          max-height: 100%;
        }
      }

      &:hover {
        scale: 1.01;
      }
    }

    &:hover {
      scale: 1.05;
    }

    figure {
      display: flex;
      align-items: center;
      height: 140px;

      .im-signature-solution-training-session-thumbnail {
        width: 100%;
      }
    }

    .im-signature-solution-training-session-title {
      margin-top: 20px;
    }
  }
`;

export default StyledScalingSystemSessionCard;
