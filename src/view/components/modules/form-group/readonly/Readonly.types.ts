import { ReactNode } from 'react';

export type StyledReadonlyProps = {
  flexGrow?: boolean;
  width?: string;
};

export type ReadonlyProps = StyledReadonlyProps & {
  text: string | ReactNode | number;
  label?: string;
  className?: string;
  width?: string;
  dataTestId?: string;
  loading?: boolean;
  enabledTooltip?: boolean;
};
