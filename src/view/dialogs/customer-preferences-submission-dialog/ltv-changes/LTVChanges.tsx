import { memo } from 'react';
import { LTVChangesProps } from '../CustomerPreferencesSubmissionDialog.types';
import { LtvPrioritiesTypes } from '../../../../apis/queries/user/types';
import { Button, Icon } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';

function LTVChanges({ ltvChanges, setLtvChanges, ltvRef }: LTVChangesProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');

  const onRevert = (ltv: LtvPrioritiesTypes, priority: number) => {
    ltvRef.current?.changeLTV(ltv, priority);
    setLtvChanges((state) => state.filter((item) => item.ltv !== ltv));
  };

  const ltvLabelTypes = {
    '-1': t('Common.Unknown'),
    '0': '0-49%',
    '50': '50-69%',
    '70': '70-84%',
    '85': '85-99%',
    '100': '100%',
  };

  if (!ltvChanges.length) {
    return null;
  }

  return (
    <div className="im-change-section">
      <div className="im-change-title">{t(path('LTVChanges'))}</div>
      <div className="im-change-content">
        {ltvChanges?.map((change) => (
          <div className="im-change-group" key={change.ltv}>
            <div>
              <span className="im-label">{ltvLabelTypes[change.ltv]}</span>
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
              onClick={() => onRevert(change.ltv, change.initialPriority)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default memo(LTVChanges);
