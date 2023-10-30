import styled from 'styled-components';

const StyledTermsAndConditionsDialog = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--container-border-radius);
  overflow-y: auto;
  padding: 20px;
  background-color: var(--container-white-color);
  width: 100%;

  .im-terms-loading {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .im-clause-title {
    font-weight: bold;
    margin: 30px 0 10px 0;
  }
`;

export default StyledTermsAndConditionsDialog;
