import { ReactNode } from 'react';
import { IconName } from '../icon/Icon.types';
import { BackgroundVariant, ColorsVariant } from '../../../../types';

export type StyledDropdownMenuProps = {
  width?: string;
};

export type StyledDropdownMenuItemProps = {
  hoverVariant?: BackgroundVariant;
  textVariant?: ColorsVariant;
  selectedBackground?: BackgroundVariant;
  selected?: boolean;
};

export type DropdownOptions = {
  text: string;
  icon?: IconName;
  onClick?: () => void;
  disabled?: boolean;
  hide?: boolean;
  hoverVariant?: BackgroundVariant;
  textVariant?: ColorsVariant;
  selected?: boolean;
  selectedBackground?: BackgroundVariant;
}[];

export type DropdownMenuProps = StyledDropdownMenuProps & {
  options: DropdownOptions;
  closeOnClickOutside?: boolean;
  closeOnSelect?: boolean;
  skidding?: number;
  trigger?: ReactNode;
  title?: string;
  disabled?: boolean;
};
