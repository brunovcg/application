import { useTranslation } from 'react-i18next';
import { Slider } from '../../../../../../../../components';
import CustomerPreferencesContainer from '../../components/customer-preferences-container/CustomerPreferencesContainer';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { ForwardedRef, forwardRef, memo, useContext, useEffect, useState, useImperativeHandle } from 'react';
import { YearsOldPrioritiesTypes } from '../../../../../../../../../apis/queries/user/types';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import { PropertyAgeProps, PropertyAgeRef } from './PropertyAge.types';

function PropertyAge({ data }: PropertyAgeProps, ref: ForwardedRef<PropertyAgeRef>) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.PropertyAge');
  const [propertyAge, setPropertyAge] = useState(data);
  const { setValue } = useContext(FormContext);

  const commonRangeProps = {
    max: 5,
    min: 0,
    step: 1,
    width: '235px',
    maxWidth: '100%',
  };

  const changeYearsOld = (yearsOld: YearsOldPrioritiesTypes, priority: number) => {
    setPropertyAge((state) => {
      if (state) {
        const newState = { ...state };
        newState[yearsOld as keyof typeof newState] = {
          yearsOld: Number(yearsOld),
          priority: Number(priority),
          initialPriority: newState[yearsOld as keyof typeof newState].initialPriority,
        };

        setValue('yearsOldPriorities', newState);
        return newState;
      }
      return state;
    });
  };

  useImperativeHandle(ref, () => ({ changeYearsOld }), []);

  useEffect(() => {
    setValue('yearsOldPriorities', data);
  }, [data]);

  return (
    <CustomerPreferencesContainer label={t(path('Title'))} className="im-preferences-property-age">
      <Slider
        initialValue={data?.['-1'].priority}
        valid={(inputValue) => inputValue != data?.['-1']?.priority}
        value={propertyAge?.['-1'].priority}
        label={t(path('Unknown'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('-1', value)}
        onReset={(value) => changeYearsOld('-1', value)}
      />
      <Slider
        initialValue={data?.['0'].priority}
        valid={(inputValue) => inputValue != data?.['0']?.priority}
        value={propertyAge?.['0'].priority}
        label={t(path('0-2years'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('0', value)}
        onReset={(value) => changeYearsOld('0', value)}
      />
      <Slider
        initialValue={data?.['3'].priority}
        valid={(inputValue) => inputValue != data?.['3']?.priority}
        value={propertyAge?.['3'].priority}
        label={t(path('3-5years'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('3', value)}
        onReset={(value) => changeYearsOld('3', value)}
      />
      <Slider
        initialValue={data?.['6'].priority}
        valid={(inputValue) => inputValue != data?.['6']?.priority}
        value={propertyAge?.['6'].priority}
        label={t(path('6-9years'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('6', value)}
        onReset={(value) => changeYearsOld('6', value)}
      />
      <Slider
        initialValue={data?.['10'].priority}
        valid={(inputValue) => inputValue != data?.['10']?.priority}
        value={propertyAge?.['10'].priority}
        label={t(path('10-19years'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('10', value)}
        onReset={(value) => changeYearsOld('10', value)}
      />
      <Slider
        initialValue={data?.['20'].priority}
        valid={(inputValue) => inputValue != data?.['20']?.priority}
        value={propertyAge?.['20'].priority}
        label={t(path('20-39years'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('20', value)}
        onReset={(value) => changeYearsOld('20', value)}
      />
      <Slider
        initialValue={data?.['40'].priority}
        valid={(inputValue) => inputValue != data?.['40']?.priority}
        value={propertyAge?.['40'].priority}
        label={t(path('40-59years'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('40', value)}
        onReset={(value) => changeYearsOld('40', value)}
      />
      <Slider
        initialValue={data?.['60'].priority}
        valid={(inputValue) => inputValue != data?.['60']?.priority}
        value={propertyAge?.['60'].priority}
        label={t(path('60-99years'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('60', value)}
        onReset={(value) => changeYearsOld('60', value)}
      />
      <Slider
        initialValue={data?.['100'].priority}
        valid={(inputValue) => inputValue != data?.['100']?.priority}
        value={propertyAge?.['100'].priority}
        label={t(path('100+years'))}
        {...commonRangeProps}
        onChange={(value) => changeYearsOld('100', value)}
        onReset={(value) => changeYearsOld('100', value)}
      />
    </CustomerPreferencesContainer>
  );
}

export default memo(forwardRef(PropertyAge));
