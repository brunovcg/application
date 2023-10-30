import { Button, LoadingSpinner } from '../../components';
import StyledNotFound from './NotFound.styled';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { useTranslationPath } from '../../../utils/hooks';
import useNavigation from '../../../utils/hooks/modules/use-navigation/useNavigation';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';

export default function NotFound() {
  const { t } = useTranslation();
  const notFoundPath = useTranslationPath('Pages.NotFound');
  const { sessionUser } = useContext(UserSessionContext);
  const { navigate } = useNavigation();
  const buttonMessage = sessionUser.isLogged ? t(notFoundPath('ReturnToDashboard')) : t(notFoundPath('ReturnToLogin'));

  const navigateRoute = sessionUser.isLogged ? 'dashboard' : 'login';

  return (
    <StyledNotFound>
      <LoadingSpinner size="large" />
      <p>{t(notFoundPath('Message'))}</p>
      <Button text={buttonMessage} icon="undo" onClick={() => navigate({ routeName: navigateRoute })} />
    </StyledNotFound>
  );
}
