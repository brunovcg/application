import styled from 'styled-components';
import { StyledDropdownMenuItemProps, StyledDropdownMenuProps } from './DropdownMenu.types';
import Constants from '../../../../utils/constants/Constants';
import { BackgroundVariant, ColorsVariant } from '../../../../types';

export const StyledDropdownMenu = styled.div<StyledDropdownMenuProps>`
  .im-dropdown-menu-wrapper {
    .im-dropdown-menu-trigger-wrapper {
      cursor: pointer;
    }

    .im-dropdown-menu-content {
      width: ${(props) => props.width ?? 'max-content'};
      min-width: fit-content;
      padding: 8px;
      border: 1px solid var(--border-medium-color);
      border-radius: var(--container-border-radius);
      background-color: var(--container-medium-color);
      z-index: 200;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: var(--container-box-shadow);

      .im-dropdown-menu-title {
        padding-top: 10px;
        color: var(--primary-color);
        font-size: 13px;
        font-weight: bold;
        width: 100%;
        text-align: center;
      }

      &:hover {
        border-color: var(--primary-color);
      }
    }
  }
`;

export const StyledDropdownMenuItem = styled.div<StyledDropdownMenuItemProps>`
  display: flex;
  gap: 10px;
  height: 20px;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  border-radius: var(--container-border-radius);

  &.im-disabled {
    cursor: not-allowed;

    .im-dropdown-menu-text {
      color: var(--disabled-color);
    }
  }

  &.im-selected {
    background-color: ${(props) => Constants.BACKGROUND_COLORS[props.selectedBackground as BackgroundVariant]};
  }

  &:hover:not(.im-disabled) {
    background-color: ${(props) => Constants.BACKGROUND_COLORS[(props.hoverVariant as BackgroundVariant) ?? 'hoverDark']};
    .im-dropdown-menu-icon,
    .im-dropdown-menu-text {
      color: var(--typeface-white-color);
    }
    .im-dropdown-menu-text {
      text-shadow: var(--white-text-shadow);
    }
  }

  .im-dropdown-menu-icon {
    width: 20px;
  }

  .im-dropdown-menu-text {
    font-size: 13px;
    user-select: none;
  }

  .im-dropdown-menu-icon,
  .im-dropdown-menu-text {
    color: ${(props) => Constants.COLORS[(props.textVariant as ColorsVariant) ?? 'medium']};
  }
`;
