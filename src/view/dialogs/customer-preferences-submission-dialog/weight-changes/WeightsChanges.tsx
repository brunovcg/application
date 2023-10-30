import { Button, Icon, MessageContainer } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';
import { WeightsChangesProps } from '../CustomerPreferencesSubmissionDialog.types';

export default function WeightsChanges({ weightChanges, setWeightChanges, weightsRef }: WeightsChangesProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');

  const weightsLabelTypes = {
    livingArea: t(path('LivingArea')),
    lotSize: t(path('LotSize')),
    ltv: t(path('LTV')),
    ownerType: t(path('TypeOfOwner')),
    propertyType: t(path('PropertyType')),
    totalValue: t(path('TotalValue')),
    yearsOld: t(path('PropertyAge')),
    yrsOwned: t(path('PropertyAge')),
    zipCode: t(path('ZipCode')),
  };

  const onRevert = () => {
    weightsRef.current?.resetWeights();
    setWeightChanges([]);
  };

  if (!weightChanges.length) {
    return null;
  }

  return (
    <div className="im-change-section">
      <div className="im-change-title">{t(path('CategoriesWeights'))}</div>
      <div className="im-change-content">
        <MessageContainer text={t(path('CategoriesWeightsMessage'))} variant="info" />
        <Button icon="undo" styling="text" text={t(path('RevertAll'))} small onClick={() => onRevert()} />
        {weightChanges?.map((change) => (
          <div className="im-change-group" key={change.category}>
            <div>
              <span className="im-label">{weightsLabelTypes[change.category]}</span>
            </div>
            <div className="im-change-comparison">
              <div className="im-initial-value">{change.initialPriority}%</div>
              <Icon icon="arrowForward" />
              <div className="im-updated-value">{change.priority}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
