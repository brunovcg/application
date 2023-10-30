import { useTranslationPath } from '../../../../utils/hooks';
import { useTranslation } from 'react-i18next';
import Password from '../Password';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Password.ForgotPassword');

  return (
    <Password
      title={t(path('Title'))}
      invalidLinkButtonText={t(path('ForgotPassword'))}
      successText={t(path('PasswordChanged'))}
      invalidLinkCallbackPath={{ route: 'login', param: '?tab=forgot-password' }}
    />
  );
}
