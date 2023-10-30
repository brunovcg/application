import { useTranslation } from 'react-i18next';
import { Container, ListRow, Section, Dialog } from '../../components';
import { useTranslationPath } from '../../../utils/hooks';
import { addressQueries } from '../../../apis/queries';
import { StyledAddressDetailDialog } from './AddressDetailDialog.styled';
import Constants from '../../../utils/constants/Constants';
import AddressField from './components/address-field/AddressField';
import useAddressDetailDialogPermissions from './AddressDetailDialog.permissions';
import { AddressDetailDialogTypes } from './AddressDetailDialog.types';

const { useListAddressMotivationsQuery } = addressQueries;

export default function AddressDetailDialog({ data, buttons }: AddressDetailDialogTypes) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.AddressDetailDialog');
  const permissions = useAddressDetailDialogPermissions();
  const { propertyMotivations, propertyMotivationsIsLoading } = useListAddressMotivationsQuery(data?.id) ?? {};
  const { AUDANTIC, NO_SUPPRESSION, RETURNED, MAIL_ONLY, STOP_MAILING } = Constants.STOP_MAILING_FLAGS;

  const hasMotivations = !!propertyMotivations?.length;

  const setStopMailingFlag = (flag: string | null) => {
    const nullResponse = t(path('NoSuppression'));

    const flags = {
      [AUDANTIC]: t(path('Audantic')),
      [RETURNED]: t(path('Returned')),
      [MAIL_ONLY]: t(path('MailOnly')),
      [STOP_MAILING]: t(path('StopMailing')),
      [NO_SUPPRESSION]: nullResponse,
    };

    return !flag ? nullResponse : flags[flag as keyof typeof flags];
  };

  const propertyMotivationsRenderer = (
    <ListRow list={propertyMotivations?.map((item) => ({ display: item.capitalized as string, tooltip: item.description }))} />
  );

  const unknownCheck = (value: string | number) => (Number(value) === -1 ? t('Common.Unknown') : value);

  const content = (
    <StyledAddressDetailDialog className="im-address-detail-dialog-content">
      <Container className="im-address-detail-dialog-container">
        <Section icon="checklist" contentClassName="im-fields-group" sectionTitle={t(path('Motivations'))}>
          <AddressField
            enabledTooltip={false}
            width="100%"
            loading={propertyMotivationsIsLoading}
            height="fit-content"
            text={
              <>
                {hasMotivations && !propertyMotivationsIsLoading && <span className="im-motivations">{propertyMotivationsRenderer}</span>}
                {!hasMotivations && !propertyMotivationsIsLoading && <span className="im-no-motivations">{t(path('NoMotivations'))}</span>}
              </>
            }
          />
        </Section>
        <Section icon="location" contentClassName="im-fields-group" sectionTitle={t(path('PropertyAddress'))}>
          <AddressField label={t(path('TaxId'))} text={data.taxId} width="165px" />
          <AddressField label={t(path('ZipCode'))} text={data.zipCode} width="80px" />
          <AddressField label={t(path('City'))} text={data.city} width="110px" />
          <AddressField label={t(path('County'))} text={data.county} width="110px" />
          <AddressField label={t(path('State'))} text={data.state} width="50px" />
          <AddressField label={t(path('Address'))} text={data.propertyAddress} width="190px" />
        </Section>
        {permissions.displayPropertyAttributes && (
          <Section icon="home" contentClassName="im-fields-group" sectionTitle={t(path('PropertyAttributes'))}>
            <div className="row">
              <AddressField label={t(path('LivingArea'))} text={unknownCheck(data.livingArea)} width="120px" />
              <AddressField label={t(path('LotSize'))} text={unknownCheck(data.lotSize)} width="120px" />
              <AddressField label={t(path('TotalValue'))} text={unknownCheck(data.totalValue)} width="120px" />
              <AddressField label={t(path('OwnerType'))} text={data.ownerType} width="120px" />
              <AddressField label={t(path('YearsOld'))} text={unknownCheck(data.yearsOld)} width="120px" />
            </div>
            <div className="row">
              <AddressField
                label={t(path('StopMailingFlag'))}
                text={unknownCheck(setStopMailingFlag(data.stopMailingFlag))}
                width="120px"
              />
              <AddressField label={t(path('YearsOwned'))} text={unknownCheck(data.yrsOwned)} width="120px" />
              <AddressField label={t(path('PropertyType'))} text={data.propertyType} width="120px" />
              <AddressField label={t(path('OwnerOccupied'))} text={data.ownerOccupied} width="120px" />
              <AddressField label={t(path('LTV'))} text={unknownCheck(data.ltv)} width="120px" />
            </div>
          </Section>
        )}
        <Section icon="user" contentClassName="im-fields-group" sectionTitle={t(path('Owner'))}>
          <AddressField label={t(path('FirstName'))} text={data.ownerFirstName} width="115px" />
          <AddressField label={t(path('MiddleName'))} text={data.ownerMiddleName} width="115px" />
          <AddressField label={t(path('LastName'))} text={data.ownerLastName} width="115px" />
          <AddressField label={t(path('SecondFirstName'))} text={data.owner2FirstName} width="115px" />
          <AddressField label={t(path('SecondMiddleName'))} text={data.owner2MiddleName} width="115px" />
          <AddressField label={t(path('SecondLastName'))} text={data.owner2LastName} width="115px" />
        </Section>
        <Section icon="mail" contentClassName="im-fields-group" sectionTitle={t(path('MailingAddress'))}>
          <AddressField label={t(path('City'))} text={data.mailingCity} width="110px" />
          <AddressField label={t(path('County'))} text={data.county} width="110px" />
          <AddressField label={t(path('State'))} text={data.mailingState} width="50px" />
          <AddressField label={t(path('ZipCode'))} text={data.mailingZip} width="100px" />
          <AddressField label={t(path('Address'))} text={data.mailingAddress} width="190px" />
        </Section>
      </Container>
    </StyledAddressDetailDialog>
  );

  return (
    <Dialog
      dialogId="AddressDetailDialog"
      content={content}
      title={t(path('Title'))}
      width="900px"
      maxHeight="1200px"
      closeOnOutsideClick={false}
      defaultCloseButton={false}
      buttons={buttons}
    />
  );
}
