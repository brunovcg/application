import styled from 'styled-components';

const StyledCustomerPreferencesForm = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 1173px;

  .im-customer-preferences-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    .im-form-fields {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      max-width: 1300px;
    }

    .im-preferences-type-of-property {
      gap: 20px;
      display: flex;
      flex-wrap: wrap;
    }

    .im-column-group {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .im-row-group {
      flex: 1 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
    }

    .im-preferences-form-submit-wrapper {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default StyledCustomerPreferencesForm;
