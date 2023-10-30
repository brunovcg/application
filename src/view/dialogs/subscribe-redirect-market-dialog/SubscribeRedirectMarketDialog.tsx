import { useTranslation } from 'react-i18next';
import { Container, Dialog } from '../../components';
import { useTranslationPath } from '../../../utils/hooks';
import './SubscribeRedirectMarketDialog.scss';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { useContext } from 'react';
import useNavigation from '../../../utils/hooks/modules/use-navigation/useNavigation';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

export default function SubscribeRedirectMarketDialog({ username, userId }: { username: string; userId: number }) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.SubscribeRedirectMarketDialog');
  const { navigate } = useNavigation();
  const { closeDialog } = useContext(DialogsContext);

  const buttons: DialogButtons = [
    {
      icon: 'add',
      text: t('Common.Subscribe'),
      onClick: () => {
        closeDialog('SubscribeRedirectMarketDialog');
        navigate({ routeName: 'buyBox', search: `?userId=${userId}` });
      },
    },
  ];

  const content = (
    <Container width="100%" className="im-subscribe-redirect-market-dialog">
      {t(path('SubscribeToMarkets'), { username })}
    </Container>
  );

  return <Dialog dialogId="SubscribeRedirectMarketDialog" content={content} title={t(path('SubscribeToMarketsTitle'))} buttons={buttons} />;
}
