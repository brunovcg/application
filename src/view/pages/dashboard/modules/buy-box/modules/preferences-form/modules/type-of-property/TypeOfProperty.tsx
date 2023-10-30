/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { Container, Grid, Slider, Button, MessageContainer, InputNumber } from '../../../../../../../../components';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import {
  DefaultPriority,
  DefaultPriorityIndex,
  MappedInitialList,
  PropertyTypeRef,
  TypeOfPropertyGrids,
  TypeOfPropertyProps,
} from './TypeOfProperty.types';
import { ClassNameHelper } from '../../../../../../../../../utils/helpers';
import { GridTemplateArgs } from '../../../../../../../../components/modules/grid/Grid.types';
import { ForwardedRef, forwardRef, useMemo, useContext, useEffect, useState, useImperativeHandle, memo, useCallback } from 'react';
import { StyledTypeOfProperty } from './TypeOfProperty.styled';
import { propertiesQueries } from '../../../../../../../../../apis/queries';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import {
  LivingArea,
  LivingAreaPrioritiesMapped,
  LotSize,
  LotSizePrioritiesMapped,
  TotalValue,
  TotalValuePrioritiesMapped,
} from '../../../../../../../../../apis/queries/user/types';

const { useGetDefaultPrioritiesForPropertyQuery } = propertiesQueries;
function TypeOfProperty(
  {
    PropertyTypeLabel,
    className,
    priority,
    totalValueList,
    lotSizeList,
    customerUsername,
    countyId,
    propertyType,
    livingAreaList,
  }: TypeOfPropertyProps,
  ref: ForwardedRef<PropertyTypeRef>
) {
  const { setValue, getValues } = useContext(FormContext);
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.TypeOfProperty');
  const [showDetails, setShowDetails] = useState(true);
  const [totalValueData, setTotalValueData] = useState(totalValueList ?? []);
  const [lotSizeData, setLotSizeData] = useState(lotSizeList ?? []);
  const [livingAreaData, setLivingAreaData] = useState(livingAreaList ?? []);
  const [currentPriority, setCurrentPriority] = useState(priority);

  useEffect(() => {
    setTotalValueData(totalValueList ?? []);
  }, [totalValueList]);

  useEffect(() => {
    setLotSizeData(lotSizeList ?? []);
  }, [lotSizeList]);

  useEffect(() => {
    setLivingAreaData(livingAreaList ?? []);
  }, [livingAreaList]);

  const { defaultPriorities, defaultPrioritiesIsLoading } = useGetDefaultPrioritiesForPropertyQuery(
    countyId,
    customerUsername,
    propertyType,
    priority
  );

  function mapWithInitialValue(
    defaultPriorityList: LotSizePrioritiesMapped | LivingAreaPrioritiesMapped | TotalValuePrioritiesMapped,
    initialList: MappedInitialList
  ) {
    if (!defaultPriorityList) {
      return [];
    }

    return defaultPriorityList?.[String(propertyType) as keyof typeof defaultPriorityList]?.map((item: DefaultPriority, index: number) => {
      const currentItem = initialList?.find((initialItem) => initialItem.index === index);
      return {
        ...item,
        initialValue: currentItem?.initialValue,
        initialPriority: currentItem?.initialPriority,
      };
    });
  }

  const classes = ClassNameHelper.conditional({
    [className]: !!className,
    ['im-preferences-type-of-property']: true,
  });

  useEffect(() => {
    setValue('lotSizePriorities', { ...getValues().lotSizePriorities, [propertyType]: lotSizeData });
  }, [lotSizeData]);

  useEffect(() => {
    setValue('totalValuePriorities', { ...getValues().totalValuePriorities, [propertyType]: totalValueData });
  }, [totalValueData]);

  useEffect(() => {
    setValue('livingAreaPriorities', { ...getValues().livingAreaPriorities, [propertyType]: livingAreaData });
  }, [livingAreaData]);

  useEffect(() => {
    setValue('propertyTypePriorities', {
      ...getValues().propertyTypePriorities,
      [propertyType]: { propertyType, priority: currentPriority, initialPriority: priority },
    });
  }, [currentPriority]);

  useEffect(() => {
    setValue('propertyTypePriorities', {
      ...getValues().propertyTypePriorities,
      [propertyType]: { propertyType, priority, initialPriority: priority },
    });
  }, [priority, totalValueList, lotSizeList, livingAreaList]);

  const hasLotSizeDataChanges = lotSizeData?.some((item) => item.initialValue !== item.lotSize || item.priority !== item.initialPriority);

  const hasLivingAreaDataChanges = livingAreaData?.some(
    (item) => item.initialValue !== item.livingArea || item.priority !== item.initialPriority
  );

  const hasTotalValueDataChanges = totalValueData?.some(
    (item) => item.initialValue !== item.totalValue || item.priority !== item.initialPriority
  );

  const showResetAll = hasLotSizeDataChanges || hasLivingAreaDataChanges || hasTotalValueDataChanges;

  const states = {
    lotSize: { update: setLotSizeData, type: lotSizeData },
    livingArea: { update: setLivingAreaData, type: livingAreaData },
    totalValue: { update: setTotalValueData, type: totalValueData },
  };

  const commonInputProps = {
    height: '20px',
    allowReset: true,
    allowClear: false,
    showAddOns: false,
    canClear: false,
  };

  const changePropertyGridRow = useCallback(
    (newValue: string, row: DefaultPriorityIndex, type: TypeOfPropertyGrids, propertyToUpdate: string) => {
      const currentPropertyState = states[String(type) as TypeOfPropertyGrids];
      currentPropertyState.update((state: any[]) => {
        const newState = [...state];
        const updatedRowStateIndex = state?.findIndex((_item: unknown, rowIndex: number) => rowIndex === row.index);
        newState.splice(updatedRowStateIndex, 1, { ...row, [propertyToUpdate]: Number(newValue) });
        return newState;
      });
    },
    [states]
  );

  const handleValueInput = useCallback(({ value, rows, row, index }: GridTemplateArgs, type: TypeOfPropertyGrids) => {
    const handleInputUnknown = (inputValue: number) => (inputValue === -1 ? 'Unknown' : value);
    if (value === undefined) {
      return '';
    }
    if (Number(value) < 1) {
      return <p className="im-property-type-frozen-cell">{handleInputUnknown(Number(value))}</p>;
    } else {
      const previousIndex = index - 1;
      const nextIndex = index + 1;
      const previousRowValue = rows[Number(previousIndex)]?.[String(type) as TypeOfPropertyGrids];
      const nextRowValue = rows[Number(nextIndex)]?.[String(type) as TypeOfPropertyGrids];
      const min = previousRowValue ? previousRowValue + 1 : 1;
      const max = nextRowValue ? nextRowValue - 1 : undefined;

      return (
        <InputNumber
          {...commonInputProps}
          min={min}
          max={max}
          valid={(inputValue) => row.initialValue != inputValue}
          value={value as string}
          width="130px"
          initialValue={row.initialValue}
          onBlur={(newValue) => changePropertyGridRow(String(newValue), row as DefaultPriorityIndex, type, type)}
          showError={false}
        />
      );
    }
  }, []);

  const handlePriorityInput = useCallback(
    ({ value, row }: GridTemplateArgs, type: TypeOfPropertyGrids) => (
      <InputNumber
        {...commonInputProps}
        valid={(inputValue) => row.initialPriority != inputValue}
        width="90px"
        height="25px"
        max={5}
        min={0}
        initialValue={row.initialPriority}
        value={value as string}
        onBlur={(newValue) => changePropertyGridRow(String(newValue), row as DefaultPriorityIndex, type, 'priority')}
      />
    ),
    []
  );

  const TaxAssessedValueColumns = [
    {
      id: 1,
      accessor: 'totalValue',
      component: t(path('TaxAssessedValue')),
      template: (payload: GridTemplateArgs) => handleValueInput(payload, 'totalValue'),
    },
    {
      id: 2,
      accessor: 'priority',
      component: t(path('Priority')),
      template: (payload: GridTemplateArgs) => handlePriorityInput(payload, 'totalValue'),
    },
  ];

  const LivingAreaColumns = useMemo(
    () => [
      {
        id: 1,
        accessor: 'livingArea',
        component: t(path('LivingArea')),
        template: (payload: GridTemplateArgs) => handleValueInput(payload, 'livingArea'),
      },
      {
        id: 2,
        accessor: 'priority',
        component: t(path('Priority')),
        template: (payload: GridTemplateArgs) => handlePriorityInput(payload, 'livingArea'),
      },
    ],
    []
  );

  const LotSizeColumns = useMemo(
    () => [
      {
        id: 1,
        accessor: 'lotSize',
        component: t(path('LotSize')),
        template: (payload: GridTemplateArgs) => handleValueInput(payload, 'lotSize'),
      },
      {
        id: 2,
        accessor: 'priority',
        component: t(path('Priority')),
        template: (payload: GridTemplateArgs) => handlePriorityInput(payload, 'lotSize'),
      },
    ],
    []
  );

  const detailButtonIcon = showDetails ? 'expandLess' : 'expandMore';
  const detailButtonText = showDetails ? t(path('DetailsHide')) : t(path('DetailsShow'));

  const resetAll = () => {
    const resetTotalValueList = totalValueList ? [...totalValueList] : [];
    setTotalValueData(resetTotalValueList);

    const resetLivingAreaList = livingAreaList ? [...livingAreaList] : [];
    setLivingAreaData(resetLivingAreaList);

    const resetLotSizeList = lotSizeList ? [...lotSizeList] : [];
    setLotSizeData(resetLotSizeList);

    setCurrentPriority(priority);
  };

  const changePropertyTypePriority = (newPriority: number) => {
    if (newPriority === 0) {
      const allValues = getValues();
      const lotSizeValues = allValues.lotSizePriorities;
      const totalValuesValues = allValues.totalValuePriorities;
      const livingAreaValues = allValues.livingAreaPriorities;

      setLotSizeData(lotSizeValues?.[String(propertyType)]?.map((item: typeof lotSizeValues) => ({ ...item, priority: 0 })));
      setLivingAreaData(livingAreaValues?.[String(propertyType)]?.map((item: typeof livingAreaValues) => ({ ...item, priority: 0 })));
      setTotalValueData(totalValuesValues?.[String(propertyType)]?.map((item: typeof totalValuesValues) => ({ ...item, priority: 0 })));
    } else if (priority === 0 && newPriority > 0 && currentPriority === 0) {
      const lotSizeNewData = mapWithInitialValue(defaultPriorities.lotSizePriorities, lotSizeList as unknown as MappedInitialList);
      const livingAreaNewData = mapWithInitialValue(defaultPriorities.livingAreaPriorities, livingAreaList as unknown as MappedInitialList);
      const totalValueNewData = mapWithInitialValue(defaultPriorities.totalValuePriorities, totalValueList as unknown as MappedInitialList);

      setLotSizeData(lotSizeNewData as LotSize[]);
      setLivingAreaData(livingAreaNewData as LivingArea[]);
      setTotalValueData(totalValueNewData as TotalValue[]);
    } else if (priority !== 0 && newPriority > 0 && currentPriority === 0) {
      setLotSizeData(lotSizeList ?? []);
      setLivingAreaData(livingAreaList ?? []);
      setTotalValueData(totalValueList ?? []);
    }

    setCurrentPriority(newPriority);
  };

  const commonGridsProps = {
    loading: defaultPrioritiesIsLoading,
    className: 'im-preferences-grid',
    height: '335px',
  };

  useImperativeHandle(
    ref,
    () => ({
      resetAll,
    }),
    []
  );

  return (
    <StyledTypeOfProperty>
      <Container className={classes} label={t(path(PropertyTypeLabel))} variant="light" width="100%">
        <div className="im-preferences-type-of-property-commands">
          <Slider
            width="300px"
            label={t(path('Priority'))}
            max={5}
            min={0}
            step={1}
            value={currentPriority}
            initialValue={priority}
            valid={(inputValue) => inputValue !== priority}
            onChange={(inputValue) => changePropertyTypePriority(inputValue)}
            onReset={(inputValue) => changePropertyTypePriority(inputValue)}
          />
          <Button
            text={detailButtonText}
            onClick={() => setShowDetails((state) => !state)}
            icon={detailButtonIcon}
            styling="outlined"
            width="170px"
            preventDefault
            stopPropagation
          />
          <div className="im-preference-grid-container-button-wrapper">
            {showResetAll && <Button icon="undo" text={t(path('ResetAll'))} onClick={resetAll} styling="text" />}
          </div>
        </div>

        {showDetails && (
          <>
            <MessageContainer text={t(path('Message'))} variant="info" fontSize="medium" />
            {priority === 0 && <MessageContainer text={t(path('FromZero'))} variant="info" fontSize="medium" />}
            {currentPriority === 0 && <MessageContainer text={t(path('MessagePriorityZero'))} variant="info" fontSize="medium" />}
            {!!(currentPriority && currentPriority > 0) && (
              <div className="im-grids-wrapper">
                <div className="im-preference-grid-container">
                  <Grid columns={TaxAssessedValueColumns} rows={totalValueData} {...commonGridsProps} />
                </div>
                <div className="im-preference-grid-container">
                  <Grid columns={LivingAreaColumns} rows={livingAreaData} {...commonGridsProps} />
                </div>
                <div className="im-preference-grid-container">
                  <Grid columns={LotSizeColumns} rows={lotSizeData} {...commonGridsProps} />
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </StyledTypeOfProperty>
  );
}

export default memo(forwardRef(TypeOfProperty));
