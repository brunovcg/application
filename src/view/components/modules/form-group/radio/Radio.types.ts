import { ChangeEvent } from 'react';

export type StyledRadioProps = {
  selected: boolean;
};

export type RadioProps = {
  label: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
};
