import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../utils/hooks';
import { GridColumn } from '../../../../../../../components/modules/grid/Grid.types';
import { Switch } from '../../../../../../../components';
import { Alert, DataHelper } from '../../../../../../../../utils/helpers';
import Constants from '../../../../../../../../utils/constants/Constants';
import { adSenseQueries } from '../../../../../../../../apis/queries';
import InputIdConfirm from '../account-id-input/InputIdConfirm';
import useAudienceConfigurationPermissions from '../CustomerAudienceConfiguration.permissions';

const { AD_SENSE_TYPE, STATUS } = Constants;

const { useUpdateConfigurationMutation } = adSenseQueries;

export default function useCustomerAudienceConfigurationColumns() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.AdAudience.CustomerAudienceConfiguration.Table');
  const { mutate } = useUpdateConfigurationMutation();
  const permit = useAudienceConfigurationPermissions();

  const updateConfiguration = (
    adSenseId: number,
    customerId: number,
    payload: {
      status: (typeof STATUS)[keyof typeof STATUS];
      accountId: string;
    }
  ) => {
    mutate({
      payload,
      params: {
        adSenseId,
      },
      onSuccess: () => Alert.info(t(path('Success'))),
      customerId,
    });
  };

  const columns: GridColumn[] = [
    {
      component: t(path('Type')),
      id: 'type',
      accessor: 'type',
      template: (rowData) => {
        const mappedAdSenses = DataHelper.invertObjectKeysValues(AD_SENSE_TYPE);
        return mappedAdSenses[rowData.value as keyof typeof mappedAdSenses];
      },
    },
    {
      component: t(path('AccountId')),
      id: 'accountId',
      accessor: 'accountId',
      template: (rowData) => <InputIdConfirm rowData={rowData} updateConfiguration={updateConfiguration} readOnly={!permit.update} />,
    },
    {
      component: t(path('Status')),
      accessor: 'status',
      id: 'status',
      template: (rowData) => (
        <Switch
          hideLabel
          modeOnOff
          disabled={!permit.update}
          leftOption="inactive"
          starts={rowData.value === 'I' ? 'inactive' : 'active'}
          rightOption="active"
          onChange={() => {
            const { id, customerId, status, accountId } = rowData.row;
            const toggledStatus = status === 'A' ? 'I' : 'A';
            return updateConfiguration(id as number, customerId, {
              status: toggledStatus,
              accountId,
            });
          }}
        />
      ),
    },
  ];

  return columns;
}
