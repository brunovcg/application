import styled from 'styled-components';

const StyledWeight = styled.div`
  width: 100%;

  .im-preferences-weights-right-panel {
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    height: 200px;
    max-width: 100%;

    .im-weights-sum-wrapper {
      border-width: 1px;
      border-style: solid;
      border-radius: var(--container-border-radius);
      flex: 1;
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      height: 80px;

      .im-sum {
        font-size: 30px;
        font-weight: bold;
      }

      .im-sum-message {
        font-size: 12px;
      }
    }
  }
  .im-preferences-weights {
    display: flex;
    gap: 30px 43px;
    align-items: center;
    flex-wrap: wrap;

    .im-preferences-weights-info {
      max-width: 100%;
    }

    .im-weights-sum-wrapper.im-primary {
      .im-sum,
      .im-sum-message {
        color: var(--primary-color);
      }
    }

    .im-weights-sum-wrapper.im-errored {
      .im-sum,
      .im-sum-message {
        color: var(--error-color);
      }
    }

    .im-weights-sliders {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      gap: 25px 20px;
      width: 100%;
    }
  }
`;

export default StyledWeight;
