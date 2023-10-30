import styled from 'styled-components';

const StyledScaleSystem = styled.div`
  max-width: 1340px;
  flex: 1;
  display: flex;
  justify-content: space-between;

  .im-scaling-system-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 60px;
    padding: 10px;

    .im-scaling-system-additional-training-button {
      border: 1px solid var(--border-color);
      border-radius: var(--container-border-radius);
      padding: 10px;
      cursor: pointer;
      box-shadow: var(--container-box-shadow);
      &:hover {
        border-color: var(--error-color);
      }
    }

    .im-scaling-system-logo {
      max-width: 100%;
      border-radius: 4px;
    }

    .im-scaling-system-list {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }
  }
`;

export default StyledScaleSystem;
