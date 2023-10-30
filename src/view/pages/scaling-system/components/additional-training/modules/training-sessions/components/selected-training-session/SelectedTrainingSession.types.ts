import { Dispatch, SetStateAction } from 'react';
import { MappedSession } from '../../../../../../../../../apis/queries/squidex/types';

export type SelectedTrainingSessionProps = {
  session: MappedSession;
  setSelectedSession: Dispatch<SetStateAction<MappedSession | Record<string, never>>>;
};
