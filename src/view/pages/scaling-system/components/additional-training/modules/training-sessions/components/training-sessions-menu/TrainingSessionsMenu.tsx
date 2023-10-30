import { useTranslation } from 'react-i18next';
import { Chip, Title, Text } from '../../../../../../../../components';
import Constants from '../../../../../../../../../utils/constants/Constants';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import './TrainingSessionsMenu.scss';
import { TrainingSessionsMenuProps } from './TrainingSessionsMenu.types';
import { ColorsVariant } from '../../../../../../../../../types';

const { TRAINING_LEVELS } = Constants;

export default function TrainingSessionsMenu({ trainingSessions, setSelectedSession }: TrainingSessionsMenuProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.ScalingSystem.AdditionalTraining');

  const renderDates = (dateFrom: string, dateTo: string) => [dateFrom, dateTo].filter(Boolean).join(` ${t(path('To'))} `);

  return (
    <div className="im-training-sessions-menu">
      {trainingSessions.map((session) => {
        const { name, trainingLevel, description, image, id, formattedDateFrom, formattedDateTo, videosStats } = session;
        return (
          <div key={id} className="im-training-session-card" onClick={() => setSelectedSession(session)}>
            <div className="im-training-session-image">
              <img src={image} alt={name} />
            </div>
            <div className="im-training-session-card-right-panel">
              <div className="im-training-sessions-header">
                <Title text={name} maxCharacters={50} size="large" />
                <Text text={description} size="small" italic maxLines={5} />
              </div>
              <div className="im-training-sessions-details">
                <Chip
                  size="small"
                  text={trainingLevel}
                  variant={TRAINING_LEVELS.find((level) => level.name === trainingLevel)?.color as ColorsVariant}
                />
                <div>{renderDates(formattedDateFrom, formattedDateTo)}</div>
                <div>
                  {videosStats.videosCount} {t(path('Videos'))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
