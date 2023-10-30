import styled from 'styled-components';

const StyledOrders = styled.div`
  max-width: 1000px;
  .im-orders-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 30px 20px 20px;

    .im-orders-message {
      font-size: 20px;
      color: var(--typeface-medium-color);
      font-weight: bold;
      text-align: center;
    }
  }
`;

export default StyledOrders;
