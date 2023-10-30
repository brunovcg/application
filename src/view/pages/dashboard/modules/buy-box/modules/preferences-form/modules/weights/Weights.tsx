import { ForwardedRef, forwardRef, memo, useContext, useEffect, useState, useImperativeHandle } from 'react';
import { Container, Section, Slider } from '../../../../../../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import StyledWeight from './Weights.styled';
import { CategoriesWeightTypes } from '../../../../../../../../../apis/queries/user/types';
import MessageContainer from '../../../../../../../../components/modules/message-container/MessageContainer';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import { WeightsProps, WeightsRef } from './Weights.types';

const calculateAvailability = (array: number[]) => {
  const sumArray = array.reduce((acc: number, currentValue) => {
    if (currentValue) {
      return (acc = acc + currentValue);
    }
    return acc;
  }, 0);

  return 100 - sumArray;
};

function Weights({ data, setValidWeightSum }: WeightsProps, ref: ForwardedRef<WeightsRef>) {
  const [availableSum, setAvailableSum] = useState(0);
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm');
  const { setValue, getValues } = useContext(FormContext);
  const [weights, setWeights] = useState(data) ?? {};

  const maxSum = 100;

  const commonRangeProps = {
    max: 100,
    min: 0,
    step: 1,
    availableSum: availableSum,
    setAvailableSum: setAvailableSum,
    width: '325px',
  };

  const isValidSum = availableSum === 0;
  const sum = maxSum - availableSum;

  const changeWeights = (categoryWeight: CategoriesWeightTypes, priority: number) => {
    const newState = { ...weights };
    newState[categoryWeight as unknown as keyof typeof newState] = Number(priority);
    const availability = calculateAvailability(Object.values(newState));
    setAvailableSum(availability);
    setValidWeightSum(availability === 0);
    setValue('categoriesWeight', { ...getValues().categoriesWeight, [categoryWeight]: priority });
    setWeights(newState as typeof weights);
  };

  const resetWeights = () => {
    setWeights(data);
    setValue('categoriesWeight', data);
  };

  useImperativeHandle(ref, () => ({ resetWeights }), []);

  useEffect(() => {
    if (data) {
      const availability = calculateAvailability(Object.values(data));
      setValidWeightSum(availability === 0);
      setValue('categoriesWeight', data);
    }
  }, [data]);

  return (
    <StyledWeight>
      <Section sectionTitle={t(path('Weights.Title'))} contentClassName="im-preferences-weights">
        <div className="im-preferences-weights-right-panel">
          <Container
            label={t(path('Weights.TotalSum'))}
            className="im-weights-sum-wrapper"
            error={!isValidSum}
            primary={isValidSum}
            variant="light"
          >
            <div className="im-sum">{sum}%</div>
            <div className="im-sum-message">{isValidSum ? t(path('Weights.ValidMessage')) : t(path('Weights.InvalidMessage'))}</div>
          </Container>
          <MessageContainer
            text={t(path('Weights.BlockMessage'))}
            className="im-preferences-weights-info"
            variant="info"
            fontSize="medium"
          />
        </div>
        <div className="im-weights-sliders">
          <Slider
            initialValue={data?.propertyType}
            valid={(inputValue) => inputValue != data?.propertyType}
            value={weights?.propertyType}
            label={t(path('TypeOfProperty.Title'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('propertyType', value)}
            onReset={(value) => changeWeights('propertyType', value)}
            maxSum={maxSum}
          />
          <Slider
            initialValue={data?.ownerType}
            valid={(inputValue) => inputValue != data?.ownerType}
            value={weights?.ownerType}
            label={t(path('TypeOfOwner.Title'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('ownerType', value)}
            onReset={(value) => changeWeights('ownerType', value)}
            maxSum={maxSum}
          />
          <Slider
            initialValue={data?.lotSize}
            valid={(inputValue) => inputValue != data?.lotSize}
            value={weights?.lotSize}
            label={t(path('Weights.LotSize'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('lotSize', value)}
            onReset={(value) => changeWeights('lotSize', value)}
            maxSum={maxSum}
          />
          <Slider
            initialValue={data?.zipCode}
            valid={(inputValue) => inputValue != data?.zipCode}
            value={weights?.zipCode}
            label={t(path('ZipCode.Title'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('zipCode', value)}
            onReset={(value) => changeWeights('zipCode', value)}
            maxSum={maxSum}
          />
          <Slider
            initialValue={data?.yearsOld}
            valid={(inputValue) => inputValue != data?.yearsOld}
            value={weights?.yearsOld}
            label={t(path('PropertyAge.Title'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('yearsOld', value)}
            onReset={(value) => changeWeights('yearsOld', value)}
            maxSum={maxSum}
          />
          <Slider
            initialValue={data?.ltv}
            valid={(inputValue) => inputValue != data?.ltv}
            value={weights?.ltv}
            label={t(path('LTV.Title'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('ltv', value)}
            onReset={(value) => changeWeights('ltv', value)}
            maxSum={maxSum}
          />
          <Slider
            initialValue={data?.livingArea}
            valid={(inputValue) => inputValue != data?.livingArea}
            value={weights?.livingArea}
            label={t(path('Weights.LivingArea'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('livingArea', value)}
            onReset={(value) => changeWeights('livingArea', value)}
            maxSum={maxSum}
          />
          <Slider
            initialValue={data?.yrsOwned}
            valid={(inputValue) => inputValue != data?.yrsOwned}
            value={weights?.yrsOwned}
            label={t(path('YearsOfOwnership.Title'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('yrsOwned', value)}
            onReset={(value) => changeWeights('yrsOwned', value)}
            maxSum={maxSum}
          />
          <Slider
            initialValue={data?.totalValue}
            valid={(inputValue) => inputValue != data?.totalValue}
            value={weights?.totalValue}
            label={t(path('Weights.TotalValue'))}
            {...commonRangeProps}
            onChange={(value) => changeWeights('totalValue', value)}
            onReset={(value) => changeWeights('totalValue', value)}
            maxSum={maxSum}
          />
        </div>
      </Section>
    </StyledWeight>
  );
}

export default memo(forwardRef(Weights));
