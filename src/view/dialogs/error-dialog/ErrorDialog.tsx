import { useTranslation } from 'react-i18next';
import { MessageContainer, Dialog } from '../../components';
import { ErrorDialogProps } from './ErrorDialog.types';
import { useTranslationPath } from '../../../utils/hooks';

export default function ErrorDialog({ errorMessage }: ErrorDialogProps) {
  const { t } = useTranslation();

  const path = useTranslationPath('Dialogs.ErrorDialog');

  const content = <MessageContainer text={errorMessage} variant="error" fontSize="medium" width="fit-content" />;

  return <Dialog dialogId="ErrorDialog" content={content} width="350px" maxHeight="80vh" title={t(path('Title'))} />;
}
