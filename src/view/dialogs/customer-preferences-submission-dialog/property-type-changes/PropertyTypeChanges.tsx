import { Button, Icon } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';
import { PropertyTypeChangesProps } from '../CustomerPreferencesSubmissionDialog.types';
import { TypeOfPropertyGrids } from '../../../pages/dashboard/modules/buy-box/modules/preferences-form/modules/type-of-property/TypeOfProperty.types';
import { memo } from 'react';

function PropertyTypeChanges({
  propertyTypeChanges,
  type,
  typeRef,
  lotSizeChanges,
  livingAreaChanges,
  totalValueChanges,
  setPropertyTypeChanges,
  setLotSizeChanges,
  setLivingAreaChanges,
  setTotalValueChanges,
}: PropertyTypeChangesProps) {
  const propertyTypeChange = propertyTypeChanges?.find((item) => item.propertyType === type);
  const lotSizeChangesList = lotSizeChanges.filter((item) => item.propertyType === type);
  const livingAreaChangesList = livingAreaChanges.filter((item) => item.propertyType === type);
  const totalValueChangesList = totalValueChanges.filter((item) => item.propertyType === type);

  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');
  const propertyPath = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.TypeOfProperty');

  const hasData =
    !!propertyTypeChange || lotSizeChangesList.length > 0 || livingAreaChangesList.length > 0 || totalValueChangesList.length > 0;

  if (!hasData) {
    return null;
  }

  const handleReset = () => {
    setPropertyTypeChanges((state) => state.filter((item) => item.propertyType !== type));
    setLotSizeChanges((state) => state.filter((item) => item.propertyType !== type));
    setLivingAreaChanges((state) => state.filter((item) => item.propertyType !== type));
    setTotalValueChanges((state) => state.filter((item) => item.propertyType !== type));
    typeRef?.current?.resetAll();
  };

  const handleUnknown = (value: number | string) => (value == -1 ? t('Common.Unknown') : value);

  const changesRenderer = (
    typeOfPropertyList: typeof lotSizeChangesList | typeof livingAreaChangesList | typeof totalValueChangesList,
    valueName: TypeOfPropertyGrids,
    gridName: string
  ) =>
    !!typeOfPropertyList.length && (
      <>
        <div className="im-grid-name">{gridName}</div>
        {typeOfPropertyList.map((item) => {
          const changedValue = item?.initialValue !== item?.[String(valueName) as keyof typeof item];
          const changedPriority = item?.initialPriority !== item.priority;
          return (
            <div key={item.id} className="im-change-group">
              <div className="im-change-comparison">
                <div>
                  <span className="im-label">{t(path('Value'))} </span>
                </div>
                {changedValue && (
                  <>
                    <div className="im-initial-value">{item?.initialValue}</div>
                    <Icon icon="arrowForward" />
                  </>
                )}
                <div className={changedValue ? 'im-updated-value' : 'im-unchanged-value'}>
                  {handleUnknown(item?.[String(valueName) as keyof typeof item])}
                </div>
                |
              </div>
              <div className="im-change-comparison">
                <div>
                  <span className="im-label">{t(path('Priority'))} </span>
                </div>

                {changedPriority && (
                  <>
                    <div className="im-initial-value">{item?.initialPriority}</div>
                    <Icon icon="arrowForward" />
                  </>
                )}
                <div className={changedPriority ? 'im-updated-value' : 'im-unchanged-value'}>{item?.priority}</div>
              </div>
            </div>
          );
        })}
      </>
    );

  const propertyTypesLabels = {
    sfh: t(propertyPath('SingleFamily')),
    units: t(propertyPath('MultiFamily')),
    condo: t(propertyPath('Condo')),
    land: t(propertyPath('Land')),
    commercial: t(propertyPath('Commercial')),
    others: t(propertyPath('Others')),
  };

  return (
    <div className="im-change-section">
      <div className="im-change-title">
        {t(path('PropertyType'))} - {propertyTypesLabels[String(type) as keyof typeof propertyTypesLabels]}
        <Button icon="undo" styling="text" text={t(path('RevertAll'))} small onClick={handleReset} />
      </div>
      <div className="im-change-content">
        {propertyTypeChange && (
          <div className="im-change-group">
            <div>
              <span className="im-label">{t(path('Priority'))} </span>
            </div>
            <div className="im-change-comparison">
              <div className="im-initial-value">{propertyTypeChange?.initialPriority}</div>
              <Icon icon="arrowForward" />
              <div className="im-updated-value">{propertyTypeChange?.priority}</div>
            </div>
          </div>
        )}
        {changesRenderer(totalValueChangesList, 'totalValue', t(path('TaxAssessedValue')))}
        {changesRenderer(livingAreaChangesList, 'livingArea', t(path('LivingArea')))}
        {changesRenderer(lotSizeChangesList, 'lotSize', t(path('LotSize')))}
      </div>
    </div>
  );
}
export default memo(PropertyTypeChanges);
