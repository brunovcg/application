import { memo } from 'react';
import { Button, Icon } from '../../../components';
import { YearsOldPrioritiesTypes } from '../../../../apis/queries/user/types';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';
import { PropertyAgeChangesProps } from '../CustomerPreferencesSubmissionDialog.types';

function PropertyAgeChanges({ propertyAgeChanges, setPropertyAgeChanges, propertyAgeRef }: PropertyAgeChangesProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');

  const yearsOldLabelTypes = {
    '-1': t('Common.Unknown'),
    '0': '0-2 years',
    '3': ' 3-5 years',
    '6': '6-9 years',
    '10': '10-19 years',
    '20': '20-39 years',
    '40': '40-59 years',
    '60': '60-99 years',
    '100': '100+ years',
  };

  const onRevert = (yearsOld: YearsOldPrioritiesTypes, priority: number) => {
    propertyAgeRef.current?.changeYearsOld(yearsOld, priority);
    setPropertyAgeChanges((state) => state.filter((item) => item.yearsOld !== yearsOld));
  };

  if (!propertyAgeChanges.length) {
    return null;
  }

  return (
    <div className="im-change-section">
      <div className="im-change-title">{t(path('PropertyAge'))}</div>
      <div className="im-change-content">
        {propertyAgeChanges?.map((change) => (
          <div className="im-change-group" key={change.yearsOld}>
            <div>
              <span className="im-label">{yearsOldLabelTypes[change.yearsOld]}</span>
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
              onClick={() => onRevert(change.yearsOld, change.initialPriority)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default memo(PropertyAgeChanges);
