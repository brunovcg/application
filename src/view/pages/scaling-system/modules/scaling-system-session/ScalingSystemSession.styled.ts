import styled from 'styled-components';

const StyledScalingSystemSession = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  width: 100%;

  .im-scaling-system-session-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .im-scaling-system-session-header {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .im-scaling-system-session-content {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;

      .im-scaling-system-session-item {
        width: 300px;
        height: 300px;
        border: 1px solid var(--border-color);
        border-radius: var(--container-border-radius);
        box-shadow: var(--container-box-shadow);
        padding: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: column;

        .im-scaling-system-session-item-thumbnail {
          height: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid var(--border-light-color);
          border-radius: var(--container-border-radius);
        }

        .im-image-thumbnail {
          max-width: 100%;
          max-height: 100%;
        }

        .im-scaling-system-session-item-title {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;

export default StyledScalingSystemSession;
