import { memo } from 'react';
import { YearsOfOwnershipChangesProps } from '../CustomerPreferencesSubmissionDialog.types';
import { YrsOwnedTypes } from '../../../../apis/queries/user/types';
import { Button, Icon } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';

function YearsOfOwnershipChanges({ yearsOwnedChanges, setYearsOwnedChangesChanges, yrsOwnedRef }: YearsOfOwnershipChangesProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');

  const onRevert = (yrsOwned: YrsOwnedTypes, priority: number) => {
    yrsOwnedRef.current?.changeYrsOwned(yrsOwned, priority);
    setYearsOwnedChangesChanges((state) => state.filter((item) => item.yrsOwned !== yrsOwned));
  };

  const yearsOwnedTypes = {
    '-1': t('Common.Unknown'),
    '0': '0-1 year',
    '2': ' 2-4 years',
    '5': '5-7 years',
    '8': '8-14 years',
    '15': '15-24 years',
    '25': '25+ years',
  };

  if (!yearsOwnedChanges.length) {
    return null;
  }

  return (
    <div className="im-change-section">
      <div className="im-change-title">{t(path('YearsOfOwnership'))}</div>
      <div className="im-change-content">
        {yearsOwnedChanges?.map((change) => (
          <div className="im-change-group" key={change.yrsOwned}>
            <div>
              <span className="im-label">{yearsOwnedTypes[change.yrsOwned]}</span>
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
              onClick={() => onRevert(change.yrsOwned, change.initialPriority)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default memo(YearsOfOwnershipChanges);
