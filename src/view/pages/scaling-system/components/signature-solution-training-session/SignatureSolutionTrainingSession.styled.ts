import styled from 'styled-components';

const StyledSignatureSolutionTrainingSession = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;

  .im-signature-solution-session-item {
    width: 300px;
    height: 300px;
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    box-shadow: var(--container-box-shadow);
    padding: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    .im-signature-solution-session-item-thumbnail {
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

    .im-signature-solution-session-item-title {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default StyledSignatureSolutionTrainingSession;
