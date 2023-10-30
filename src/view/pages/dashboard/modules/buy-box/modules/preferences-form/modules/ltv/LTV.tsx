import { useTranslation } from 'react-i18next';
import { Slider } from '../../../../../../../../components';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { memo, useContext, useEffect, useState, useImperativeHandle, ForwardedRef, forwardRef } from 'react';
import CustomerPreferencesContainer from '../../components/customer-preferences-container/CustomerPreferencesContainer';
import { LtvPrioritiesTypes } from '../../../../../../../../../apis/queries/user/types';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import { LTVProps, LTVRef } from './LTV.types';

function LTV({ data }: LTVProps, ref: ForwardedRef<LTVRef>) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.LTV');
  const [ltvList, setLtvList] = useState(data);
  const { setValue } = useContext(FormContext);

  const commonRangeProps = {
    max: 5,
    min: 0,
    step: 1,
    width: '235px',
    maxWidth: '100%',
  };

  const changeLTV = (ltv: LtvPrioritiesTypes, priority: number) => {
    setLtvList((state) => {
      if (state) {
        const newState = { ...state };
        newState[ltv as keyof typeof newState] = {
          ltv: Number(ltv),
          priority: Number(priority),
          initialPriority: newState[ltv as keyof typeof newState].initialPriority,
        };

        setValue('ltvPriorities', newState);
        return newState;
      }
      return state;
    });
  };

  useImperativeHandle(ref, () => ({ changeLTV }), []);

  useEffect(() => {
    setValue('ltvPriorities', data);
  }, [data]);

  return (
    <CustomerPreferencesContainer label={t(path('Title'))} className="im-preferences-ltv">
      <Slider
        valid={(inputValue) => inputValue != data?.['-1']?.priority}
        initialValue={data?.['-1']?.priority}
        value={ltvList?.['-1'].priority}
        label={t(path('Unknown'))}
        {...commonRangeProps}
        onReset={(value) => changeLTV('-1', value)}
        onChange={(value) => changeLTV('-1', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['0']?.priority}
        initialValue={data?.['0']?.priority}
        value={ltvList?.['0'].priority}
        label={t(path('0-49'))}
        {...commonRangeProps}
        onReset={(value) => changeLTV('0', value)}
        onChange={(value) => changeLTV('0', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['50']?.priority}
        initialValue={data?.['50']?.priority}
        value={ltvList?.['50'].priority}
        label={t(path('50-49'))}
        {...commonRangeProps}
        onReset={(value) => changeLTV('50', value)}
        onChange={(value) => changeLTV('50', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['70']?.priority}
        initialValue={data?.['70']?.priority}
        value={ltvList?.['70'].priority}
        label={t(path('70-84'))}
        {...commonRangeProps}
        onReset={(value) => changeLTV('70', value)}
        onChange={(value) => changeLTV('70', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['85']?.priority}
        initialValue={data?.['85']?.priority}
        value={ltvList?.['85'].priority}
        label={t(path('85-49'))}
        {...commonRangeProps}
        onReset={(value) => changeLTV('85', value)}
        onChange={(value) => changeLTV('85', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.['100']?.priority}
        initialValue={data?.['100']?.priority}
        value={ltvList?.['100'].priority}
        label={t(path('100'))}
        {...commonRangeProps}
        onReset={(value) => changeLTV('100', value)}
        onChange={(value) => changeLTV('100', value)}
      />
    </CustomerPreferencesContainer>
  );
}

export default memo(forwardRef(LTV));
