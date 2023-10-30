import { memo } from 'react';
import { Button, Icon } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';
import { ZipCodeChangesProps } from '../CustomerPreferencesSubmissionDialog.types';

function ZipCodeChanges({ zipCodeChanges, setZipCodeChanges, zipCodeRef }: ZipCodeChangesProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');

  const onRevert = (initialPriority: number, id: number) => {
    zipCodeRef.current?.changeZipCode(String(initialPriority), id);
    setZipCodeChanges((state) => state.filter((item) => item.id !== id));
  };

  if (!zipCodeChanges.length) {
    return null;
  }

  return (
    <div className="im-change-section">
      <div className="im-change-title">{t(path('ZipCodeChanges'))}</div>
      <div className="im-change-content">
        {zipCodeChanges?.map((change) => (
          <div className="im-change-group" key={change.id}>
            <div>
              <span className="im-label">{t(path('ZipCode'))}</span> {change.zipCode}
            </div>
            <div>
              <span className="im-label">{t(path('City'))}</span> {change.city}
            </div>
            <div className="im-change-comparison">
              <div className="im-initial-value">{change.initialPriority}</div>
              <Icon icon="arrowForward" />
              <div className="im-updated-value">{change.priority}</div>
            </div>
            <Button icon="undo" styling="text" text={t(path('Revert'))} small onClick={() => onRevert(change.initialPriority, change.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default memo(ZipCodeChanges);
