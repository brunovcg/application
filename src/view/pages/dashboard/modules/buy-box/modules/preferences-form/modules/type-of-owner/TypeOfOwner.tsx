import { useTranslation } from 'react-i18next';
import { Slider } from '../../../../../../../../components';
import CustomerPreferencesContainer from '../../components/customer-preferences-container/CustomerPreferencesContainer';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { ForwardedRef, forwardRef, memo, useContext, useEffect, useState, useImperativeHandle } from 'react';
import { OwnerTypes } from '../../../../../../../../../apis/queries/user/types';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import { TypeOfOwnerProps, TypeOfOwnerRef } from './TypeOfOwner.types';

function TypeOfOwner({ data }: TypeOfOwnerProps, ref: ForwardedRef<TypeOfOwnerRef>) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.TypeOfOwner');
  const [typeOfOwnerList, setTypeOfOwnerList] = useState(data);
  const { setValue } = useContext(FormContext);

  const commonRangeProps = {
    max: 5,
    min: 0,
    step: 1,
    width: '235px',
    maxWidth: '100%',
  };

  const changeTypeOfOwner = (ownerType: OwnerTypes, priority: number) => {
    setTypeOfOwnerList((state) => {
      if (state) {
        const newState = { ...state };
        newState[ownerType as keyof typeof newState] = {
          ownerType,
          priority: Number(priority),
          initialPriority: newState[ownerType as keyof typeof newState].initialPriority,
        };

        setValue('ownerTypePriorities', newState);
        return newState;
      }
      return state;
    });
  };

  useImperativeHandle(ref, () => ({ changeTypeOfOwner }), []);

  useEffect(() => {
    setValue('ownerTypePriorities', data);
  }, [data]);

  return (
    <CustomerPreferencesContainer label={t(path('Title'))} className="im-preferences-type-of-owner">
      <Slider
        valid={(inputValue) => inputValue != data?.individual.priority}
        value={typeOfOwnerList?.individual.priority}
        initialValue={data?.individual.priority}
        label={t(path('Individual'))}
        {...commonRangeProps}
        onReset={(value) => changeTypeOfOwner('individual', value)}
        onChange={(value) => changeTypeOfOwner('individual', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.estate.priority}
        value={typeOfOwnerList?.estate.priority}
        initialValue={data?.estate.priority}
        label={t(path('Estate'))}
        {...commonRangeProps}
        onChange={(value) => changeTypeOfOwner('estate', value)}
        onReset={(value) => changeTypeOfOwner('estate', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.company.priority}
        value={typeOfOwnerList?.company.priority}
        initialValue={data?.company.priority}
        label={t(path('Company'))}
        {...commonRangeProps}
        onChange={(value) => changeTypeOfOwner('company', value)}
        onReset={(value) => changeTypeOfOwner('company', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.trust.priority}
        value={typeOfOwnerList?.trust.priority}
        initialValue={data?.trust.priority}
        label={t(path('Trust'))}
        {...commonRangeProps}
        onChange={(value) => changeTypeOfOwner('trust', value)}
        onReset={(value) => changeTypeOfOwner('trust', value)}
      />
      <Slider
        valid={(inputValue) => inputValue != data?.noClassification.priority}
        value={typeOfOwnerList?.noClassification.priority}
        initialValue={data?.noClassification.priority}
        label={t(path('NotClassified'))}
        {...commonRangeProps}
        onChange={(value) => changeTypeOfOwner('noClassification', value)}
        onReset={(value) => changeTypeOfOwner('noClassification', value)}
      />
    </CustomerPreferencesContainer>
  );
}

export default memo(forwardRef(TypeOfOwner));
