import styled from 'styled-components';

const StyledPurchasedPropertiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  .im-deal-sources {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  .im-purchased-properties-no-motivations {
    color: var(--error-color);
  }
`;

export default StyledPurchasedPropertiesList;
