import styled from 'styled-components';

const countyMinWidth = '190px';
const tierWidth = '160px';
const activeWidth = '80px';
const actionsWidth = '180px';

const StyledSubscriptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .im-subscription-state {
    display: flex;
    flex-direction: column;
    width: 100%;

    .im-subscription-state-name {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: bold;
      color: var(--primary-color);
    }

    .im-subscription-counties-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      overflow-x: auto;

      .im-subscription-left-panel {
        flex: 1;
        min-width: ${countyMinWidth};
      }

      .im-subscription-right-panel {
        display: flex;
        gap: 30px;
      }

      .im-subscription-titles {
        display: flex;
        width: 100%;
        gap: 30px;
        margin-bottom: 10px;
        padding-left: 5px;

        .im-subscription-title {
          font-size: 12px;
          font-weight: bold;
          color: var(--typeface-light-color);
        }

        .im-tier-title {
          min-width: ${tierWidth};
          display: flex;
          justify-content: center;
        }

        .im-active-title {
          min-width: ${activeWidth};
          text-align: center;
        }

        .im-actions-title {
          min-width: ${actionsWidth};
          text-align: center;
        }
      }

      .im-subscription-county {
        display: flex;
        gap: 30px;
        align-items: center;
        border-radius: var(--container-border-radius);
        padding: 4px 0 4px 5px;
        border: 1px solid var(--transparent);

        &.im-unsubscribe {
          border-color: var(--error-color);
        }

        &.im-subscribe {
          border-color: var(--valid-color);
        }

        &:hover {
          background-color: var(--container-hover-color);
        }

        .im-subscription-county-name {
          font-size: 15px;
          color: var(--typeface-medium-color);
          font-weight: bold;

          .im-unsubscribe {
            color: var(--error-color);
            font-size: 12px;
          }

          .im-subscribe {
            color: var(--valid-color);
            font-size: 12px;
          }
        }

        .im-subscription-county-tier {
          display: flex;
          justify-content: center;
          min-width: ${tierWidth};
          font-size: 15px;
          color: var(--typeface-medium-color);
        }

        .im-subscription-county-active {
          min-width: ${activeWidth};
          display: flex;
          justify-content: center;
          padding: 4px;
          height: 35px;
        }

        .im-subscription-county-actions {
          min-width: ${actionsWidth};
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;

export default StyledSubscriptions;
