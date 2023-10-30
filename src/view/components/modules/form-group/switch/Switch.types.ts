type CustomProps<LeftOption, RightOption> =
  | {
      name?: never;
      onChange: (option: LeftOption | RightOption) => void;
    }
  | { name: string; onChange?: (option: LeftOption | RightOption) => void };

export type SwitchProps<LeftOption, RightOption> = CustomProps<LeftOption, RightOption> & {
  leftOption: LeftOption;
  rightOption: RightOption;
  starts?: LeftOption | RightOption;
  className?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  modeOnOff?: boolean;
  loading?: boolean;
  label?: string;
  centered?: boolean;
};

export type StyledSwitchProps = {
  hasLabel: boolean;
  centered?: boolean;
};
