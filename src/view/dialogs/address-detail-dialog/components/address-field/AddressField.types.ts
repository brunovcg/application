import { ReactNode } from 'react';

export type StyledAddressFieldProps = {
  width?: string;
  height?: string;
};

export type AddressFieldProps = StyledAddressFieldProps & {
  text: string | null | ReactNode;
  label?: string;
  enabledTooltip?: boolean;
  loading?: boolean;
};
