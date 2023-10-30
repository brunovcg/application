import { useTranslation } from 'react-i18next';
import { Dialog, Section, LoadingSpinner } from '../../components';
import { useEffect } from 'react';
import { ServicesEndpointsConfigs } from '../../../configs';
import { DOMHelper } from '../../../utils/helpers';
import { LogoutDialogProps } from './LogoutDialog.types';
import StyledLogoutDialog from './LogoutDialog.styled';

const { companyLandingPage } = ServicesEndpointsConfigs;

export default function LogoutDialog({ handleLogout }: LogoutDialogProps) {
  const { t } = useTranslation();
  const content = (
    <StyledLogoutDialog>
      <Section width="100%" height="100%" contentClassName="im-logout-dialog-content">
        <LoadingSpinner message={t('Dialogs.LogoutDialog.Message')} />
      </Section>
    </StyledLogoutDialog>
  );

  useEffect(() => {
    const logout = setTimeout(() => {
      handleLogout();
      DOMHelper.openLink(companyLandingPage, 'redirect');
    }, 1000);

    return () => clearTimeout(logout);
  }, []);

  return (
    <Dialog dialogId="LogoutDialog" content={content} width="80vw" height="80vh" defaultCloseButton={false} defaultCloseIcon={false} />
  );
}
