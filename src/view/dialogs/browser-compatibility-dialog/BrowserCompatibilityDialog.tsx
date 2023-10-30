import { useTranslation } from 'react-i18next';
import { Dialog, Section } from '../../components';
import { BrowserCompatibilityDialogProps } from './BrowserCompatibilityDialog.types';
import { useTranslationPath } from '../../../utils/hooks';
import MessageContainer from '../../components/modules/message-container/MessageContainer';
import { ServicesEndpointsConfigs } from '../../../configs';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';

const { browserHappy } = ServicesEndpointsConfigs;

export default function BrowserCompatibilityDialog({ instance }: BrowserCompatibilityDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.BrowserCompatibilityDialog');

  const text = instance === 'outdated' ? t(path('Outdated')) : t(path('Unsupported'));

  const content = (
    <Section className="im-browser-compatibility-dialog">
      <MessageContainer text={text} variant="warning" fontSize="medium" />
    </Section>
  );

  const buttons = [
    {
      href: browserHappy,
      text: t(path('DownloadBrowser')),
      icon: 'download',
    },
  ] as DialogButtons;

  return (
    <Dialog dialogId="BrowserCompatibilityDialog" content={content} width="500px" title={t(path('BrowserSupport'))} buttons={buttons} />
  );
}
