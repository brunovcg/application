import { useContext, useRef } from 'react';
import { Selector, Text } from '../../../../../../../../components';
import { SelectorRef } from '../../../../../../../../components/modules/form-group/selector/Selector.types';
import { TableCell } from '../../../../../../../../components/modules/table/root-component/Table.types';
import { AddressMotivationSubmission } from '../../../../../../../../../apis/services/address-services/Address.services.types';
import Constants from '../../../../../../../../../utils/constants/Constants';
import { DataHelper } from '../../../../../../../../../utils/helpers';
import useDataMinerQAPermissions from '../../DataMinerQA.permissions';
import { useTranslation } from 'react-i18next';
import { DialogsContext } from '../../../../../../../../../contexts/modules/dialogs/DialogsContext';

const statusColors = {
  'Disqualified': 'warning',
  'Pending': 'error',
  'Not Verified': 'primary',
  'Qualified': 'valid',
  'Wrong Motivation': 'medium',
} as const;

export default function MinerQASelectStatus({
  value,
  row,
  addAssessed,
}: TableCell<AddressMotivationSubmission> & { addAssessed: (newAssessed: AddressMotivationSubmission) => void }) {
  const { t } = useTranslation();
  const status = Constants.DATA_MINER_QA_STATUS;
  const options = Object.values(status);
  const mappedValue = !value ? 'null' : value;
  const mappedOptions = DataHelper.invertObjectKeysValues(status);
  const { permitUpdateVerificationStatus } = useDataMinerQAPermissions();
  const { openDialog } = useContext(DialogsContext);
  const pending = t('Common.Pending');

  const ref = useRef<SelectorRef>(null);

  if (!permitUpdateVerificationStatus) {
    return <Text text={value ?? pending} variant={statusColors[(value as keyof typeof statusColors) ?? pending]} />;
  }

  return (
    <Selector
      displayColor={statusColors}
      height="30px"
      ref={ref}
      options={[...options, pending]}
      initValue={[status[`${mappedValue}` as keyof typeof status] ?? pending]}
      onSelect={(selectorValue) => {
        if (selectorValue[0] === row.original.verificationStatus) {
          return;
        }
        const handleCancel = () => ref.current?.resetSelector();
        openDialog({
          id: 'UpdateVerificationStatusMinerSubmissionDialog',
          props: {
            addressData: row.original as unknown as AddressMotivationSubmission,
            newStatus: mappedOptions[selectorValue[0] as keyof typeof mappedOptions],
            addAssessed,
            handleCancel: handleCancel,
          },
        });
      }}
      showError={false}
      allowClear={false}
      allowReset={false}
      allowSearch={false}
    />
  );
}
