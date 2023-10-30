import { useTranslation } from 'react-i18next';
import { Button, ButtonImage, Title } from '../../../../../../../../components';
import { SelectedTrainingSessionProps } from './SelectedTrainingSession.types';
import './SelectedTrainingSession.scss';
import { useState } from 'react';
import Training from '../../../training/Training';

import { squidexQueries } from '../../../../../../../../../apis/queries';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { MappedTrainingVideoWithIndex, TrainingWithThumbnail } from '../../../../../../../../../apis/queries/squidex/types';

const { useTrainingSessionsStages } = squidexQueries;

export default function SelectedTrainingSession({ session, setSelectedSession }: SelectedTrainingSessionProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.ScalingSystem.AdditionalTraining');
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  const selectedStage = session?.stages?.[Number(selectedStageIndex)] ?? {};

  const mappedTraining = session.stages.reduce((acc, current) => {
    const videosWithIndex = current.videos.map((video) => ({ ...video, stageIndex: current.index }));

    acc.push(...videosWithIndex);

    return acc;
  }, [] as MappedTrainingVideoWithIndex[]);

  const { trainings, trainingsIsLoading } = useTrainingSessionsStages(mappedTraining, session.name);

  const renderDates = (dateFrom: string, dateTo: string) => [dateFrom, dateTo].filter(Boolean).join(` ${t(path('To'))} `);

  const selectedTrainings = trainings?.filter((item) => item.stageIndex === selectedStage.index);

  return (
    <div className="im-selected-training-session">
      <div className="im-selected-session-header">
        <div className="im-selected-session-title-date">
          <div className="im-selected-session-title">
            <Title text={session.name} size="large" marginBottom="0" />
            <Button icon="undo" text={t('Common.Back')} onClick={() => setSelectedSession({})} styling="outlined" variant="error" />
          </div>
          <div className="im-selected-session-date">({renderDates(session.formattedDateFrom, session.formattedDateTo)})</div>
        </div>
      </div>
      <section>
        <div className="im-selected-session-select-day-buttons">
          {session.stages.map((stage) => (
            <ButtonImage
              key={stage.name}
              backgroundImage={stage.image}
              height="45px"
              width="210px"
              onClick={() => setSelectedStageIndex(stage.index)}
              selected={selectedStage.name === stage.name}
            />
          ))}
        </div>
        <Training trainings={selectedTrainings as TrainingWithThumbnail[]} trainingsIsLoading={trainingsIsLoading} />
      </section>
    </div>
  );
}
