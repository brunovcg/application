import { useMemo, useReducer } from 'react';
import { UseListProcessStatusAction, UseListProcessStatusFilters } from './useProcessStatusFilters.types';

export const initialState = {
  taskStatus: '',
  taskName: '',
  queue: '',
  userId: '',
  processId: '',
  createDateEnd: '',
  createDateStart: '',
  finishedDateEnd: '',
  finishedDateStart: '',
  customerName: '',
} as const;

const reducer =
  (callback: () => void) =>
  <Payload,>(state: UseListProcessStatusFilters, action: UseListProcessStatusAction<Payload>) => {
    const { type, payload } = action;
    callback();
    return { ...state, [type]: payload };
  };

export default function useProcessStatusFilters() {
  const [filters, updateFilter] = useReducer(
    reducer(() => {}),
    initialState
  );

  const isEmptyFilter = useMemo(() => Object.values(filters).filter(Boolean).length === 0, [filters]);

  return { filters, updateFilter, isEmptyFilter };
}
