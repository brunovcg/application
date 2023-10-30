import styled from 'styled-components';

const StyledPassword = styled.div`
  background: var(--container-im-gradient-color);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .im-password-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-bottom: 30px;
  }

  .im-password-container {
    padding: 30px;
    display: flex;
    flex-direction: column;

    .im-password-invalid-link {
      display: flex;
      flex-direction: column;
      gap: 60px;
      align-items: center;
    }

    .im-password-success {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      gap: 60px;
      align-items: center;
      flex: 1;
    }

    .im-password-form-loading {
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default StyledPassword;
