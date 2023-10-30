import { useTranslation } from 'react-i18next';
import './LinkInboundPhoneCallDialog.scss';
import { useTranslationPath } from '../../../utils/hooks';
import { Container, Readonly, Slider, Dialog, SelectorCustomer } from '../../components';
import { useContext, useState } from 'react';
import { InboundCallScoreServices } from '../../../apis/services';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { Alert } from '../../../utils/helpers';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

export default function LinkInboundPhoneCallDialog({ id }: { id: number }) {
  const { t } = useTranslation();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedScore, setSelectedScore] = useState(0);
  const { closeDialog } = useContext(DialogsContext);

  const path = useTranslationPath('Dialogs.LinkInboundPhoneCallDialog');

  const isFormValid = !!selectedCustomer;

  const buttons: DialogButtons = [
    {
      icon: 'done',
      text: t('Common.Submit'),
      dataTestId: 'im-linkInbound-submit',
      disabled: !isFormValid,
      onClick: () => {
        InboundCallScoreServices.saveInboundCallScore({ addressId: id, customer: selectedCustomer, score: selectedScore }).then(() => {
          closeDialog('LinkInboundPhoneCallDialog');
          Alert.info(t(path('InboundCallScoreSubmitted')));
        });
      },
    },
  ];

  const content = (
    <Container className="im-link-inbound-phone-call-dialog" width="100%">
      <Readonly className="im-address-id" label={t(path('AddressId'))} text={id} />
      <SelectorCustomer width="100%" outputFormat="username" onSelect={(value) => setSelectedCustomer(value[0])} />
      <Slider label={t(path('Score'))} step={1} max={5} min={0} onChange={(value) => setSelectedScore(value)} testInstance="linkInbound" />
    </Container>
  );

  return <Dialog dialogId="LinkInboundPhoneCallDialog" content={content} title={t(path('Title'))} width="400px" buttons={buttons} />;
}
