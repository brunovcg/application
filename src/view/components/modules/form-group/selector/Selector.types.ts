import { MouseEvent } from 'react';
import { ColorsVariant } from '../../../../../types';

export type SelectorRef = {
  resetSelector: (e?: MouseEvent<HTMLButtonElement>) => void;
  clearSelector: () => void;
  updateValue: (value: unknown[]) => void;
};

export type StyledSelectorProps = {
  width?: string;
  maxWidth?: string;
  height?: string;
};

export type StyledListProps = {
  zIndex: number;
  listWidth?: number;
  listHeight?: number;
  listMaxHeight?: number;
  optionsInRow?: boolean;
  selectedBorder?: boolean;
};

export type StyledDisplayProps = {
  variant: ColorsVariant;
};

export type SelectorProps<Option> = StyledSelectorProps &
  Omit<StyledListProps, 'zIndex' | 'listWidth'> & {
    options: Option[];
    displayColor?: { [key in Option as string]: ColorsVariant };
    onSelect?: (output: Option[]) => void;
    onChange?: (output: Option[]) => void;
    disabled?: boolean;
    loading?: boolean;
    disabledOptions?: Option[];
    name?: string;
    label?: string;
    placeholder?: string;
    allowClear?: boolean;
    allowReset?: boolean;
    allowSearch?: boolean;
    showError?: boolean;
    initValue?: Option[];
    multiple?: boolean;
    requiredLabel?: boolean;
    className?: string;
    headerEqualizer?: boolean;
    valid?: boolean;
    testInstance?: string;
    allowSelectAll?: boolean;
  };
