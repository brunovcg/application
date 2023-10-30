export type StyledProgressBarProps = {
  width: string;
  value: number;
};

export type ProgressBarProps = {
  min: number;
  max: number;
  width?: string;
  value: number;
  unit?: string;
  decimal?: number;
  showLabel?: boolean;
};
