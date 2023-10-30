import { memo } from 'react';
import { Button, Icon } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';
import { MotivationsChangesProps } from '../CustomerPreferencesSubmissionDialog.types';
import { LetterCaseHelper } from '../../../../utils/helpers';

const { snakeToCapitalize } = LetterCaseHelper;

function MotivationsChanges({ motivationsChanges, setMotivationsChanges, motivationsRef }: MotivationsChangesProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');

  const onRevert = (motivationName: string, priority: number, rowValue: number) => {
    motivationsRef.current?.changeMotivations(motivationName, priority, rowValue);
    setMotivationsChanges((state) => state.filter((item) => item.name !== motivationName));
  };

  if (!motivationsChanges.length) {
    return null;
  }

  return (
    <div className="im-change-section">
      <div className="im-change-title">{t(path('Motivations'))}</div>
      <div className="im-change-content">
        {motivationsChanges?.map((change) => (
          <div className="im-change-group" key={change.id}>
            <div>
              <span className="im-label">{snakeToCapitalize(change.name)}</span>
            </div>
            <div className="im-change-comparison">
              <div className="im-initial-value">{change.initialPriority}</div>
              <Icon icon="arrowForward" />
              <div className="im-updated-value">{change.priority}</div>
            </div>
            <Button
              icon="undo"
              styling="text"
              text={t(path('Revert'))}
              small
              onClick={() => onRevert(change.name, change.initialPriority, change.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default memo(MotivationsChanges);
