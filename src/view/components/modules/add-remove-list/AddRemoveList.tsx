import { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { AddRemoveListProps, ExtendedListType } from './AddRemoveList.types';
import { FormContext } from '../form-group/form/Form';
import { useTranslation } from 'react-i18next';
import StyledAddRemoveList from './AddRemoveList.styled';
import { useTranslationPath } from '../../../../utils/hooks';
import AddRemoveListContainer from './components/AddRemoveListContainer';

export default function AddRemoveList<ListType>({
  currentList,
  availableList,
  onChange,
  name,
  accessor,
  listTitle = '',
  width,
  enabled,
  allowAddAll,
  allowRemoveAll,
  instance = '',
  disabled,
  onModification,
}: AddRemoveListProps<ListType>) {
  const { setValue } = useContext(FormContext);
  const { t } = useTranslation();
  const path = useTranslationPath('Components.AddRemoveList');

  const isReady = enabled || enabled === undefined;

  const initialLists = {
    submitList: [] as ExtendedListType<ListType>[],
    updatedAvailableList: [] as ExtendedListType<ListType>[],
    submitListAccessor: [] as (number | string)[],
    updatedAvailableListAccessor: [] as (number | string)[],
  };

  const handleLists = useMemo(() => {
    if (!isReady) {
      return initialLists;
    }

    const lists = { ...initialLists };

    currentList.forEach((item) => {
      lists.submitList.push({ ...item, initSubmit: true });
      lists.submitListAccessor.push(item[accessor as keyof typeof item] as string);
    });

    availableList
      .filter((item) => !lists.submitListAccessor.includes(item[accessor as keyof typeof item] as string))
      .forEach((item) => {
        lists.updatedAvailableList.push({ ...item, initSubmit: false });
        lists.updatedAvailableListAccessor.push(item[accessor as keyof typeof item] as string);
      });

    return lists;
  }, [availableList, currentList]);

  const [submitList, setSubmitList] = useState<ExtendedListType<ListType>[]>([]);
  const [updatedAvailableList, setUpdatedAvailableList] = useState<ExtendedListType<ListType>[]>([]);

  const hasChanges = useMemo(() => {
    const submitListLength = submitList.length;
    const availableListLength = updatedAvailableList.length;

    if (availableListLength < submitListLength) {
      return !(
        availableListLength === handleLists.updatedAvailableListAccessor.length &&
        updatedAvailableList.every((item) =>
          handleLists.updatedAvailableListAccessor.includes(item[accessor as keyof typeof item] as string)
        )
      );
    }
    return !(
      submitListLength === handleLists.submitListAccessor.length &&
      submitList.every((item) => handleLists.submitListAccessor.includes(item[accessor as keyof typeof item] as string))
    );
  }, [submitList.length, updatedAvailableList.length, handleLists.updatedAvailableList, handleLists.submitListAccessor]);

  const handleAddClick = (item: ExtendedListType<ListType>) => {
    const newSubmit = [item, ...submitList];
    const newAvailable = updatedAvailableList.filter(
      (availableItem) => availableItem[String(accessor) as keyof typeof availableItem] !== item[String(accessor) as keyof typeof item]
    );

    setSubmitList(newSubmit);
    setUpdatedAvailableList(newAvailable);
    const change = { submitList: newSubmit, updatedAvailableList: newAvailable };
    onChange?.(change);
    if (name) {
      setValue(name, change);
    }
  };

  const handleRemoveAll = () => {
    const all = [...handleLists.submitList, ...handleLists.updatedAvailableList];
    setSubmitList([]);
    setUpdatedAvailableList(all);
    const change = { submitList: [], updatedAvailableList: all };
    onChange?.(change);
    if (name) {
      setValue(name, change);
    }
  };

  const handleAddAll = () => {
    setUpdatedAvailableList([]);
    const all = [...handleLists.updatedAvailableList, ...handleLists.submitList];
    setSubmitList(all);
    const change = { submitList: all, updatedAvailableList: [] };
    onChange?.(change);
    if (name) {
      setValue(name, change);
    }
  };

  const handleRemoveClick = (item: ExtendedListType<ListType>) => {
    const newSubmit = submitList.filter(
      (submitItem) => submitItem[String(accessor) as keyof typeof submitItem] !== item[String(accessor) as keyof typeof item]
    );
    const newAvailable = [item, ...updatedAvailableList];

    setSubmitList(newSubmit);
    setUpdatedAvailableList(newAvailable);
    const change = { submitList: newSubmit, updatedAvailableList: newAvailable };
    onChange?.(change);
    if (name) {
      setValue(name, change);
    }
  };

  useLayoutEffect(() => {
    if (isReady) {
      setSubmitList(handleLists.submitList);
      setUpdatedAvailableList(handleLists.updatedAvailableList);

      if (name) {
        setValue(name, handleLists.submitList);
      }
      onChange?.({ submitList: handleLists.submitList, updatedAvailableList: handleLists.updatedAvailableList });
    }
  }, [handleLists]);

  const submissionTitle = instance ? t(path('InstanceList'), { listTitle, instance }) : t(path('SubmissionList'), { listTitle });

  useEffect(() => {
    onModification?.(hasChanges);
  }, [hasChanges]);

  return (
    <StyledAddRemoveList className="im-add-remove-list" width={width}>
      <AddRemoveListContainer
        accessor={accessor}
        list={submitList}
        title={submissionTitle}
        variant="submit"
        onOptionClick={handleRemoveClick}
        allClick={allowRemoveAll ? handleRemoveAll : undefined}
        disabled={disabled}
      />
      <AddRemoveListContainer
        accessor={accessor}
        list={updatedAvailableList}
        title={t(path('AvailableList'), { listTitle })}
        variant="available"
        onOptionClick={handleAddClick}
        allClick={allowAddAll ? handleAddAll : undefined}
        disabled={disabled}
      />
    </StyledAddRemoveList>
  );
}
