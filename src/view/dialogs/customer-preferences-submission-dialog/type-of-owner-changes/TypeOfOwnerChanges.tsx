import { memo } from 'react';
import { Button, Icon } from '../../../components';
import { OwnerTypes } from '../../../../apis/queries/user/types';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';
import { TypeOfOwnerChangesProps } from '../CustomerPreferencesSubmissionDialog.types';

function TypeOfOwnerChanges({ typeOfOwnerChanges, setTypeOfOwnerChanges, typeOfOwnerRef }: TypeOfOwnerChangesProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');
  const ownerTypePath = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.TypeOfOwner');

  const ownerLabelTypes = {
    company: t(ownerTypePath('Company')),
    estate: t(ownerTypePath('Estate')),
    individual: t(ownerTypePath('Individual')),
    noClassification: t(ownerTypePath('NotClassified')),
    trust: t(ownerTypePath('Trust')),
  };

  const onRevert = (ownerType: OwnerTypes, priority: number) => {
    typeOfOwnerRef.current?.changeTypeOfOwner(ownerType, priority);
    setTypeOfOwnerChanges((state) => state.filter((item) => item.ownerType !== ownerType));
  };

  if (!typeOfOwnerChanges.length) {
    return null;
  }

  return (
    <div className="im-change-section">
      <div className="im-change-title">{t(path('TypeofOwnerChanges'))}</div>
      <div className="im-change-content">
        {typeOfOwnerChanges?.map((change) => (
          <div className="im-change-group" key={change.ownerType}>
            <div>
              <span className="im-label">{ownerLabelTypes[change.ownerType]}</span>
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
              onClick={() => onRevert(change.ownerType, change.initialPriority)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default memo(TypeOfOwnerChanges);
