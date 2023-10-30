import { useEffect, useState } from 'react';
import { useCurrentRoute } from '../../../router/useCurrentRoute';
import { PasswordServices } from '../../../apis/services';
import { Button, Container, ImLogo, LoadingSpinner, MessageContainer, Title, UpdatePassword } from '../../components';
import StyledPassword from './Password.styled';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../utils/hooks';
import { PasswordProps } from './Password.types';
import useNavigation from '../../../utils/hooks/modules/use-navigation/useNavigation';

export default function Password({ title, invalidLinkButtonText, successText, invalidLinkCallbackPath }: PasswordProps) {
  const { token } = useCurrentRoute().getRouteSearch();
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Password');

  const onSubmit = async (payload: { password: string }, forbiddenPasswordHandler: () => void) => {
    if (token) {
      setIsLoading(true);
      setIsValidToken(null);
      await PasswordServices.update({
        opaqueToken: token,
        password: payload.password,
        forbiddenPasswordHandler,
        onSuccess: () => {
          setRedirectToLogin(true);
        },
        onComplete: () => {
          setIsLoading(false);
        },
      });
    }
  };

  const gotToLogin = () => navigate({ routeName: 'login' });

  useEffect(() => {
    (async () => {
      if (token) {
        setIsLoading(true);
        await PasswordServices.validateOpaqueToken({
          token,
          onSuccess: () => {
            setIsValidToken(true);
          },
          onError: () => {
            setIsValidToken(true);
            setIsValidToken(false);
          },
          onComplete: () => {
            setIsLoading(false);
          },
        });
      }
    })();
  }, []);

  return (
    <StyledPassword className="im-password">
      <Container className="im-password-container" width="450px">
        <div className="im-password-header">
          <ImLogo size="medium" />
          <Title icon="password" text={title} variant="primary" size="large" align="center" />
        </div>

        {isValidToken && <UpdatePassword onSubmit={onSubmit} />}
        {isLoading && (
          <div className="im-password-form-loading">
            <LoadingSpinner message={t(path('ValidatingLink'))} />
          </div>
        )}
        {isValidToken === false && (
          <div className="im-password-invalid-link">
            <MessageContainer text={t(path('InvalidLink'))} fontSize="medium" variant="error" />
            {invalidLinkCallbackPath && (
              <Button
                text={invalidLinkButtonText}
                onClick={() => navigate({ routeName: invalidLinkCallbackPath.route, search: invalidLinkCallbackPath.param })}
              />
            )}
          </div>
        )}
        {redirectToLogin && (
          <div className="im-password-success">
            <MessageContainer text={successText} fontSize="medium" variant="valid" />
            <Button text={t(path('Login'))} onClick={gotToLogin} icon="login" />
          </div>
        )}
      </Container>
    </StyledPassword>
  );
}
