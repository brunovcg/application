import { memo, useContext, useEffect, useState, useImperativeHandle, ForwardedRef, forwardRef } from 'react';
import CustomerPreferencesContainer from '../../components/customer-preferences-container/CustomerPreferencesContainer';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { Slider } from '../../../../../../../../components';
import './YearsOfOwnership.scss';
import { YrsOwnedTypes } from '../../../../../../../../../apis/queries/user/types';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import { TypeOfOwnerProps, YrsOwnedRef } from './YearsOfOwnership.types';

function YearsOfOwnerShip({ data }: TypeOfOwnerProps, ref: ForwardedRef<YrsOwnedRef>) {
  const { t } = useTranslation();
  const [yearsOwned, setYearsOwnedList] = useState(data);
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.YearsOfOwnership');
  const { setValue } = useContext(FormContext);

  const commonRangeProps = {
    max: 5,
    min: 0,
    step: 1,
    width: '235px',
    maxWidth: '100%',
  };

  const changeYrsOwned = (yrsOwned: YrsOwnedTypes, priority: number) => {
    setYearsOwnedList((state) => {
      if (state) {
        const newState = { ...state };
        newState[yrsOwned as keyof typeof newState] = {
          yrsOwned: Number(yrsOwned),
          priority: Number(priority),
          initialPriority: newState[yrsOwned as keyof typeof newState].initialPriority,
        };

        setValue('yrsOwnedPriorities', newState);
        return newState;
      }
      return state;
    });
  };

  useImperativeHandle(ref, () => ({ changeYrsOwned }), []);

  useEffect(() => {
    setValue('yrsOwnedPriorities', data);
  }, [data]);

  return (
    <CustomerPreferencesContainer label={t(path('Title'))} className="im-preferences-years-of-ownership">
      <Slider
        valid={(inputValue) => inputValue != data?.['-1']?.priority}
        value={yearsOwned?.['-1']?.priority}
        initialValue={data?.['-1']?.priority}
        label={t(path('Unknown'))}
        {...commonRangeProps}
        onChange={(value) => changeYrsOwned('-1', value)}
        onReset={(value) => changeYrsOwned('-1', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['0']?.priority}
        value={yearsOwned?.['0']?.priority}
        initialValue={data?.['0']?.priority}
        label={t(path('0-1year'))}
        {...commonRangeProps}
        onChange={(value) => changeYrsOwned('0', value)}
        onReset={(value) => changeYrsOwned('0', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['2']?.priority}
        value={yearsOwned?.['2']?.priority}
        initialValue={data?.['2']?.priority}
        label={t(path('2-4years'))}
        {...commonRangeProps}
        onChange={(value) => changeYrsOwned('2', value)}
        onReset={(value) => changeYrsOwned('2', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['5']?.priority}
        value={yearsOwned?.['5']?.priority}
        initialValue={data?.['5']?.priority}
        label={t(path('5-7years'))}
        {...commonRangeProps}
        onChange={(value) => changeYrsOwned('5', value)}
        onReset={(value) => changeYrsOwned('5', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['8']?.priority}
        value={yearsOwned?.['8']?.priority}
        initialValue={data?.['8']?.priority}
        label={t(path('8-14years'))}
        {...commonRangeProps}
        onChange={(value) => changeYrsOwned('8', value)}
        onReset={(value) => changeYrsOwned('8', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['15']?.priority}
        value={yearsOwned?.['15']?.priority}
        initialValue={data?.['15']?.priority}
        label={t(path('15-24years'))}
        {...commonRangeProps}
        onChange={(value) => changeYrsOwned('15', value)}
        onReset={(value) => changeYrsOwned('15', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['25']?.priority}
        value={yearsOwned?.['25']?.priority}
        initialValue={data?.['25']?.priority}
        label={t(path('25+years'))}
        {...commonRangeProps}
        onChange={(value) => changeYrsOwned('25', value)}
        onReset={(value) => changeYrsOwned('25', value)}
      />
    </CustomerPreferencesContainer>
  );
}

export default memo(forwardRef(YearsOfOwnerShip));
