import { useTranslationPath } from '../../../../utils/hooks';
import { useTranslation } from 'react-i18next';
import Password from '../Password';

export default function CreatePassword() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Password.CreatePassword');

  return <Password title={t(path('Title'))} invalidLinkButtonText={t(path('SendLinkAgain'))} successText={t(path('PasswordChanged'))} />;
}
