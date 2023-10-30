import { ExtendedListType } from '../AddRemoveList.types';

export type AddRemoveListContainerProps<ListType> = {
  accessor: keyof ListType;
  list: ExtendedListType<ListType>[];
  title: string;
  onOptionClick: (option: ExtendedListType<ListType>) => void;
  variant: 'submit' | 'available';
  allClick?: () => void;
  disabled?: boolean;
};
