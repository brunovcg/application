import { ColorsVariant } from '../../../../../../../types';

export type SelectorFilter = {
  title?: string;
  options: string[];
  mappedValues: { [key: string]: string };
  valuesVariant: { [key: string]: ColorsVariant };
  width?: string;
};

export type SelectorFilterProps = SelectorFilter & {
  setFilter: (columnId: string, updater: string) => void;
  columnId: string;
  filters: { id: string; value: string }[];
};
