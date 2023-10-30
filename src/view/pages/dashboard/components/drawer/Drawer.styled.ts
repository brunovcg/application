import styled from 'styled-components';
import { ZIndexesConfigs } from '../../../../../configs';

const transitionTime = '1s';

const StyledDrawer = styled.div`
  border-right: 1px solid var(--border-medium-color);
  width: 215px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ${transitionTime} width;
  position: relative;
  background-color: var(--container-white-color);

  .im-drawer-title {
    margin-top: 40px;
    color: var(--primary-dark-color);
    font-size: 13px;
    padding-bottom: 5px;
    margin-bottom: 20px;
    margin-left: 40px;
    width: 100%;
  }

  .im-drawer-button-icon {
    border: 1px solid var(--border-medium-color);
    background-color: var(--container-light-color);
    position: absolute;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    right: 0;
    margin-top: 90px;
    margin-right: -13px;
    opacity: 0;
    z-index: ${ZIndexesConfigs.dashboard.drawerCollapse};
    &:hover {
      background-color: var(--primary-color);
      .im-icon {
        path {
          color: var(--typeface-white-color);
        }
      }
    }
  }

  .im-drawer-menu {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 0 16px;
    flex: 1;
    overflow-y: auto;

    .im-tooltip {
      min-height: 40px;
    }

    .im-drawer-menu-option {
      border: none;
      background-color: var(--transparent);
      width: 175px;
      display: flex;
      height: 40px;
      color: var(--typeface-medium-color);
      align-items: center;
      padding: 0 8px;
      justify-content: flex-start;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      transition: width ${transitionTime}, padding ${transitionTime};
      border-radius: var(--container-border-radius);

      .im-drawer-menu-option-text {
        width: 100%;
        overflow: hidden;
        font-size: 12px;
        font-weight: bold;
        white-space: nowrap;
        margin-left: 10px;
        height: 100%;
        display: flex;
        align-items: center;
        user-select: none;
      }

      &:hover:not(.im-selected) {
        background-color: var(--container-hover-color);
      }

      &.im-selected {
        background-color: var(--primary-color);
        color: var(--typeface-white-color);
        transition: padding ${transitionTime}, width ${transitionTime};
      }
    }
  }

  &:hover {
    .im-drawer-button-icon {
      opacity: 100%;
      transition: opacity 0.3s;
    }
  }

  &.im-collapsed {
    width: 80px;
    transition: width ${transitionTime};

    .im-drawer-menu-option {
      width: 40px;
    }
  }

  &.im-drawer-mobile {
    position: absolute;
    z-index: ${ZIndexesConfigs.dashboard.mobileDrawer};

    .im-drawer-title {
      margin-left: 50px;
      font-size: 11px;
    }

    .im-drawer-menu {
      .im-drawer-menu-option {
        height: 35px;
      }
    }
  }
`;

export default StyledDrawer;
