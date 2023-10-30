import { useTranslation } from 'react-i18next';
import CustomerPreferencesContainer from '../../components/customer-preferences-container/CustomerPreferencesContainer';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { Alignment, GridTemplateArgs } from '../../../../../../../../components/modules/grid/Grid.types';
import { MessageContainer, Grid, InputNumber } from '../../../../../../../../components';
import './ZipCode.scss';
import { memo, useContext, useState, useImperativeHandle, forwardRef, ForwardedRef, useEffect } from 'react';
import { ZipCodePrioritiesMapped } from '../../../../../../../../../apis/queries/user/types';
import { FormContext } from '../../../../../../../../components/modules/form-group/form/Form';
import { ZipCodeProps, ZipCodeRef } from './ZipCode.types';
import { DataHelper } from '../../../../../../../../../utils/helpers';

const { updateArrayOfObject } = DataHelper;

function ZipCode({ data }: ZipCodeProps, ref: ForwardedRef<ZipCodeRef>) {
  const { setValue } = useContext(FormContext);
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.ZipCode');
  const [zipCodeData, setZipCodeData] = useState(data ?? []);

  const changeZipCode = (newValue: string, id: number) => {
    setZipCodeData((state: ZipCodePrioritiesMapped[]) =>
      updateArrayOfObject({
        state,
        objectKeyFilter: 'id',
        comparisonField: id,
        newValues: { priority: Number(newValue) },
        callback: (newState) => setValue('zipCodePriorities', newState),
      })
    );
  };

  useImperativeHandle(
    ref,
    () => ({
      changeZipCode,
    }),
    []
  );

  useEffect(() => {
    setZipCodeData(data ?? []);
    setValue('zipCodePriorities', data);
  }, [data]);

  const zipCodeColumns = [
    {
      id: 1,
      accessor: 'zipCode',
      component: t(path('ZipCode')),
    },
    {
      id: 2,
      accessor: 'city',
      cellAlignment: 'left' as Alignment,
      component: t(path('City')),
    },
    {
      id: 3,
      accessor: 'priority',
      component: t(path('Priority')),
      template: ({ row, value }: GridTemplateArgs) => (
        <InputNumber
          valid={(inputValue) => row.initialPriority !== inputValue}
          height="25px"
          width="90px"
          placeholder="0"
          max={5}
          min={0}
          value={value as string}
          allowClear={false}
          allowReset
          initialValue={row.initialPriority}
          onBlur={(newValue) => changeZipCode(String(newValue), row.id as number)}
          showError={false}
        />
      ),
    },
  ];

  return (
    <CustomerPreferencesContainer label={t(path('Title'))} className="im-preferences-zip-code">
      <Grid rows={zipCodeData} columns={zipCodeColumns} height="430px" rowPK="id" />
      <MessageContainer text={t(path('Message'))} variant="info" fontSize="medium" />
    </CustomerPreferencesContainer>
  );
}

export default memo(forwardRef(ZipCode));
