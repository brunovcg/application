import { LoginForm, Title, Button, ImLogo } from '../../components';
import StyledLogin from './Login.styled';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../utils/hooks';
import { useState } from 'react';
import ForgotPasswordForm from './components/forgot-password/ForgotPasswordForm';
import { useCurrentRoute } from '../../../router/useCurrentRoute';

export default function Login() {
  const { getRouteSearch } = useCurrentRoute();
  const isForgotPassword = getRouteSearch()?.tab === 'forgot-password';
  const [forgottenPassword, setForgottenPassword] = useState(isForgotPassword);
  const { t } = useTranslation();
  const loginPath = useTranslationPath('Pages.Login');

  const title = forgottenPassword ? t(loginPath('ForgotPassword')) : t(loginPath('Login'));
  const switchFormButtonText = forgottenPassword ? t(loginPath('LoginButtonBack')) : t(loginPath('ForgotPasswordButton'));
  const switchFormButtonIcon = forgottenPassword ? 'undo' : undefined;
  const titleIcon = forgottenPassword ? 'password' : 'login';

  return (
    <StyledLogin className="im-login">
      <div className="im-login-title">
        <p>{t('Common.InvestorMachine')}</p>
        <h2>{t(loginPath('Title'))}</h2>
      </div>
      <div className="im-login-form-wrapper">
        <div className="im-login-form-header">
          <ImLogo size="medium" />
          <Title text={title} icon={titleIcon} size="large" marginBottom="0" />
        </div>

        {!forgottenPassword && <LoginForm />}
        {forgottenPassword && <ForgotPasswordForm />}

        <Button
          styling="text"
          onClick={() => setForgottenPassword((state) => !state)}
          className="im-login-forgot-password"
          text={switchFormButtonText}
          icon={switchFormButtonIcon}
        />
      </div>
    </StyledLogin>
  );
}
