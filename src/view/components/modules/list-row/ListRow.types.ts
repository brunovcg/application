import { ColorsVariant } from '../../../../types';

export type StyledListRowProps = {
  centered?: boolean;

  color?: ColorsVariant;
};

export type ListRowProps = StyledListRowProps & {
  list: { display: string; tooltip?: string }[];
  divisorColor?: ColorsVariant;
};
