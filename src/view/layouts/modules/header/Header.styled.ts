import styled from 'styled-components';
import { ZIndexesConfigs, SupportConfigs } from '../../../../configs';

export const StyledHeader = styled.header`
  height: 40px;
  width: 100%;
  background-color: var(--container-white-color);
  display: flex;
  align-items: center;
  padding: 0 40px 0 20px;
  justify-content: space-between;
  box-shadow: var(--container-box-shadow);
  border-bottom: 1px solid var(--border-medium-color);
  z-index: ${ZIndexesConfigs.header};

  .im-header-right-panel {
    display: flex;
    gap: 5px;
    flex-grow: 1;
  }

  .im-header-left-panel {
    display: flex;
    gap: 30px;

    .im-header-mobile-content {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .im-header-nav {
      display: flex;
      gap: 20px;
      align-items: center;
      margin: 0 auto;
    }
  }

  @media (max-width: ${SupportConfigs.resolutions.mobileBreakpoint}) {
    padding: 15px;
  }
`;

export const StyledContentMenuItem = styled.div`
  .im-content-option {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 5px;
    padding: 2px 5px;
    cursor: pointer;
    border-radius: var(--container-border-radius);
    color: var(--typeface-medium-color);
    user-select: none;
    :hover:not(.im-selected) {
      background-color: var(--container-hover-color);
    }

    &.im-selected {
      color: var(--typeface-white-color);
      background-color: var(--primary-color);
      text-shadow: var(--white-text-shadow);
    }
  }
`;
