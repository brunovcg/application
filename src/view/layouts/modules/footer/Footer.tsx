import StyledFooter from './Footer.styled';
import { useTranslation } from 'react-i18next';
import { useDevice, useTranslationPath } from '../../../../utils/hooks';
import { Button, Icon } from '../../../components';
import useFooterPermissions from './Footer.permissions';
import { useContext } from 'react';
import { DialogsContext } from '../../../../contexts/modules/dialogs/DialogsContext';

export default function Footer() {
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const permissions = useFooterPermissions();
  const { openDialog } = useContext(DialogsContext);

  const path = useTranslationPath('Layout.Footer');

  const openTermsDialog = () => openDialog({ id: 'TermsAndConditionsDialog' });
  return (
    <StyledFooter className="im-footer">
      <div className="im-footer-section">
        {t(path('Copyright.AppName'))}
        {permissions.displayTermsAndCondition && (
          <>
            <Icon icon="separator" weight="fill" variant="light" />
            <Button text={t(path('TermsAndConditions'))} styling="text" small className="im-terms-button" onClick={openTermsDialog} />
          </>
        )}
      </div>
      {!isMobile && <Icon icon="separator" weight="fill" variant="light" />}
      <div className="im-footer-section">{t(path('Copyright.CompanyName'))}</div>
    </StyledFooter>
  );
}
