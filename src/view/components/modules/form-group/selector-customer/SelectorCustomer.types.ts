import { MouseEvent } from 'react';
import { ListUsersResponse } from '../../../../../apis/services/user-services/User.services.types';

type ConditionalFormats =
  | {
      outputFormat?: 'id';
      onSelect?: (output: number[]) => void;
    }
  | {
      outputFormat?: 'username';
      onSelect?: (output: string[]) => void;
    }
  | {
      outputFormat?: 'object';
      onSelect?: (output: ListUsersResponse) => void;
    };

type CommonProps = {
  placeholder?: string;
  multiple?: boolean;
  showError?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
  allowSearch?: boolean;
  width?: string;
  maxWidth?: string;
  headerEqualizer?: boolean;
  listHeight?: string;
  listMaxHeight?: string;
  requiredLabel?: boolean;
  allowClear?: boolean;
  allowReset?: boolean;
};

export type SelectorCustomerProps = ConditionalFormats &
  CommonProps & {
    initCustomersIds?: number[];
    filterOptionsByIds?: number[];
    loading?: boolean;
  };

export type StyledOptionRendererProps = {
  selected: boolean;
};

export type SelectorCustomerRef = {
  resetSelector: (e?: MouseEvent<HTMLButtonElement>) => void;
  clearSelector: () => void;
  updateValue: (value: ListUsersResponse) => void;
};

export type StyledSelectorCustomersProps = {
  width?: string;
  maxWidth?: string;
  show: boolean;
};

export type StyledCustomerListProps = {
  zIndex: number;
  listWidth?: number;
  listHeight?: string;
  listMaxHeight?: string;
};

export type SelectorCustomerViewProps = CommonProps & {
  options: ListUsersResponse;
  onViewSelect?: (output: ListUsersResponse) => void;
  show: boolean;
  loading?: boolean;
  name?: string;
  label?: string;
  initValue?: ListUsersResponse;
};
