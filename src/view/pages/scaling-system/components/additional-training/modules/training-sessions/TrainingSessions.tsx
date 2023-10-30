import { UserFeedback } from '../../../../../../components';
import { squidexQueries } from '../../../../../../../apis/queries';
import './TrainingSessions.scss';
import { useState } from 'react';
import { MappedSession } from '../../../../../../../apis/queries/squidex/types';
import TrainingSessionsMenu from './components/training-sessions-menu/TrainingSessionsMenu';
import { DataHelper } from '../../../../../../../utils/helpers';
import SelectedTrainingSession from './components/selected-training-session/SelectedTrainingSession';

const { useListTrainingSessions } = squidexQueries;

export default function TrainingSessions() {
  const { trainingSessions, trainingSessionsIsLoading } = useListTrainingSessions();

  const [selectedSession, setSelectedSession] = useState<MappedSession | Record<string, never>>({});

  if (trainingSessionsIsLoading) {
    return <UserFeedback variant="loading" className="im-training-sessions-loading" maxWidth="100%" />;
  }

  const isSelectedSession = DataHelper.isEmptyObject(selectedSession);

  return (
    <div className="im-training-sessions">
      {!isSelectedSession && <SelectedTrainingSession session={selectedSession as MappedSession} setSelectedSession={setSelectedSession} />}
      {isSelectedSession && (
        <TrainingSessionsMenu setSelectedSession={setSelectedSession} trainingSessions={trainingSessions as unknown as MappedSession[]} />
      )}
    </div>
  );
}
