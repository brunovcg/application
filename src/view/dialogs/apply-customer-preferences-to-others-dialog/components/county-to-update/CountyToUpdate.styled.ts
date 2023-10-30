import styled from 'styled-components';

const StyledCountyToUpdate = styled.div`
  width: 100%;
  background-color: var(--container-medium-color);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: var(--container-border-radius);
  color: var(--typeface-dark-color);

  .im-county-to-update-error {
    display: flex;
    gap: 10px;
  }

  .im-county-to-update-ready {
    display: flex;
    color: var(--warning-color);
    align-items: center;
    gap: 5px;
    font-size: 12px;
  }
`;

export default StyledCountyToUpdate;
