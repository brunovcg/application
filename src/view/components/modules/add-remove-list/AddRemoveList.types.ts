export type StyledAddRemoveListProps = {
  width?: string;
};

export type AddRemoveListPayload<ListType> = { updatedAvailableList: ListType[]; submitList: ListType[] };

export type AddRemoveListProps<ListType> = StyledAddRemoveListProps & {
  currentList: ListType[];
  availableList: ListType[];
  onChange?: (args: AddRemoveListPayload<ListType>) => void;
  name?: string;
  accessor: keyof ListType;
  listTitle: string;
  enabled?: boolean;
  allowAddAll?: boolean;
  allowRemoveAll?: boolean;
  instance?: string;
  disabled?: boolean;
  onModification?: (hasModification: boolean) => void;
};

export type ExtendedListType<ListType> = ListType & { initSubmit: boolean };
