import styled from 'styled-components';

const StyledDefaultParameters = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .im-form {
    width: 100%;
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .im-default-parameters-section-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .im-default-parameters-section {
      flex: 1;
      min-width: 300px;

      .im-default-parameters-section-content {
        display: flex;
        flex-wrap: wrap;
        flex: initial;
        gap: 20px;
      }
    }
  }

  .im-default-preferences-submit {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default StyledDefaultParameters;
