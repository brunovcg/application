import { UseListProcessStatusParams } from '../../../../../../../../../apis/queries/process-status/types';
import { initialState } from './useProcessStatusFilters';

export type UseListProcessStatusAction<Payload> = {
  type: keyof typeof initialState;
  payload: Payload;
};

export type UseListProcessStatusFilters = Omit<UseListProcessStatusParams, 'sort' | 'page' | 'size'>;
