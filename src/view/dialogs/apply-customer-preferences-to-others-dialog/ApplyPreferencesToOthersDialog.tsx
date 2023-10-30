import { useContext, useMemo, useState } from 'react';
import { ApplyPreferencesToOthersDialogProps } from './ApplyPreferencesToOthersDialog.types';
import { Container, Selector, Dialog } from '../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../utils/hooks';
import { countiesQueries } from '../../../apis/queries';
import StyledApplyPreferencesToOthersDialog from './ApplyPreferencesToOthersDialog.styled';
import { CustomerPreferencesFormData } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/CustomerPreferencesForm.types';
import CountyToUpdate from './components/county-to-update/CountyToUpdate';
import MessageContainer from '../../components/modules/message-container/MessageContainer';
import { UserServices } from '../../../apis/services';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useListCountiesByCustomerQuery } = countiesQueries;

export default function ApplyPreferencesToOthersDialog({
  county,
  customerUsername,
  formatFormData,
  formRef,
  customerRef,
}: ApplyPreferencesToOthersDialogProps) {
  const { getValues } = formRef.current ?? {};
  const { t } = useTranslation();
  const { customerStateCountyNames, customerCountiesIsLoading } = useListCountiesByCustomerQuery(customerUsername);
  const path = useTranslationPath('Dialogs.ApplyPreferencesToOthersDialog');
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [applyToAll, setApplyToAll] = useState(false);
  const { sessionUser } = useContext(UserSessionContext);
  const { closeDialog } = useContext(DialogsContext);

  const countiesOptions = useMemo(
    () => customerStateCountyNames.filter((item) => item !== county.stateCounty),
    [customerStateCountyNames, county]
  );

  const handleChange = (value: unknown[]) => {
    setSelectedCounties(value as string[]);
  };

  const handleApply = (countyId: number) => {
    const payload = formatFormData(getValues?.() as CustomerPreferencesFormData, String(countyId));

    payload.motivationPriorities = payload.motivationPriorities.map((item) => ({ ...item, priority: item.priority / 100 }));

    if (sessionUser.isCustomer) {
      return UserServices.updateCustomerOwnPreferences(payload, () => customerRef.current?.clearSelector());
    }
    return UserServices.submitCustomerPreferences(payload, () => customerRef.current?.clearSelector());
  };

  const textError = sessionUser.isCustomer ? 'ErrorCustomer' : 'ErrorAdmin';

  const message = {
    variant: !countiesOptions.length ? 'error' : 'info',
    text: !countiesOptions.length ? textError : 'CopyPreferences',
  } as const;

  const content = (
    <StyledApplyPreferencesToOthersDialog className="im-apply-county-preferences-to-others">
      <Container className="im-apply-county-preferences-to-others-content" width="100%">
        <MessageContainer variant={message.variant} text={t(path(message.text), { countyName: county.stateCounty })} fontSize="medium" />
        <Selector
          disabled={applyToAll}
          loading={customerCountiesIsLoading}
          width="240px"
          options={countiesOptions}
          name="county"
          label={t(path('Counties'))}
          onSelect={handleChange}
          showError={false}
          multiple
        />
        <Container label={t(path('CountiesToUpdate'))} className="im-counties-to-update-wrapper">
          <div className="im-counties-to-update">
            {selectedCounties.map((stateCounty) => (
              <CountyToUpdate
                key={stateCounty}
                stateCounty={stateCounty}
                apply={applyToAll}
                onApply={handleApply}
                customerUsername={customerUsername}
              />
            ))}
            {!selectedCounties.length && <span className="im-none-to-update">{t('Common.None')}</span>}
          </div>
        </Container>
      </Container>
    </StyledApplyPreferencesToOthersDialog>
  );

  const buttons: DialogButtons = [
    {
      hide: !selectedCounties.length || applyToAll,
      icon: 'done',
      text: t(path('ApplyAll')),
      onClick: () => setApplyToAll(true),
    },
    {
      text: t('Common.Close'),
      icon: 'cancel',
      onClick: () => {
        closeDialog('ApplyPreferencesToOthersDialog');
        customerRef.current?.clearSelector();
      },
      variant: 'error',
      show: true,
    },
  ];

  return (
    <Dialog
      dialogId="ApplyPreferencesToOthersDialog"
      content={content}
      title={t([path('Title')])}
      buttons={buttons}
      width="550px"
      minHeight="432px"
      defaultCloseButton={false}
      closeOnOutsideClick={false}
      useButtonsPortal
    />
  );
}
