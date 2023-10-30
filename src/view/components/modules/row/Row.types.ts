import { ReactNode } from 'react';

export type StyledRowProps = {
  wrap: boolean;
  gap: [number, number] | [number];
  gapUnit: 'px' | 'em' | 'rem' | '%' | 'ch';
  align: 'center' | 'flex-start' | 'flex-end' | 'start' | 'end';
};

export type RowProps = Partial<StyledRowProps> & {
  children: ReactNode;
};
