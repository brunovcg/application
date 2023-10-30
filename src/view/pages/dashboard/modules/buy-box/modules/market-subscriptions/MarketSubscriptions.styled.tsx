import styled from 'styled-components';

export const StyledMarketSubscriptions = styled.div`
  max-width: 950px;
  display: flex;
  flex-direction: column;
  flex: 1;

  .im-customer-subscriptions-header {
    margin-bottom: 20px;
    .im-customer-subscriptions-header-content {
      display: flex;
      width: 100%;
      gap: 20px;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  .im-customer-subscriptions-loading,
  .im-customer-subscriptions-select-message {
    margin-top: 30px;
    padding: 40px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .im-customer-subscriptions-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;

    .im-customer-subscriptions {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }
  }
`;

export const StyledSubmitCountiesSubscriptions = styled.div`
  width: 100%;
  max-width: 950px;
  display: flex;
  justify-content: center;
  margin-bottom: -25px;
  .im-section {
    padding: 10px;
    .im-section-content {
      display: flex;
      justify-content: center;
    }
  }
`;
