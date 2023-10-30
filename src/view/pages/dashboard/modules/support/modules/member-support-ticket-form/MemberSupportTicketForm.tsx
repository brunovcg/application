import { useContext, useMemo, useRef, useState } from 'react';
import {
  Button,
  CheckboxGroup,
  Container,
  Form,
  InputFile,
  ListRow,
  RadioGroup,
  Section,
  Selector,
  TextArea,
} from '../../../../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { CheckboxGroupRef, CheckboxOption } from '../../../../../../components/modules/form-group/checkbox-group/CheckboxGroup.types';
import './MemberSupportTicketForm.scss';
import { countiesQueries, customerSupportQueries } from '../../../../../../../apis/queries';
import Constants from '../../../../../../../utils/constants/Constants';
import { supportTicketSchema } from './MemberSupportTicketForm.schema';
import { SupportTicketSubmitForm } from './MemberSupportTicketForm.types';
import { CustomerSupportServices } from '../../../../../../../apis/services';
import { TextAreaForwardRef } from '../../../../../../components/modules/form-group/text-area/TextArea.types';
import { InputFileRef } from '../../../../../../components/modules/form-group/input-file/InputFile.types';
import { RadioGroupRef } from '../../../../../../components/modules/form-group/radio-group/RadioGroup.types';
import { SelectorRef } from '../../../../../../components/modules/form-group/selector/Selector.types';
import { IMMarketHelper, Alert } from '../../../../../../../utils/helpers';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

const { useListCountiesByCustomerQuery } = countiesQueries;
const { useSupportEffectiveDates } = customerSupportQueries;
const { getCountyName, getStateName } = IMMarketHelper;
const { SUPPORT_TICKET_ERROR } = Constants.TOAST_IDS;

export default function MemberSupportTicketForm() {
  const { sessionUser } = useContext(UserSessionContext);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const { effectiveDates, effectiveDatesIsLoading } = useSupportEffectiveDates();
  const { customerStateCountyNames, customerCountiesIsLoading } = useListCountiesByCustomerQuery(sessionUser.username);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Support.MemberSupportTicketForm');
  const [requestTypeSelected, setRequestTypeSelected] = useState<CheckboxOption[]>([]);

  const displayHotSheetServices = requestTypeSelected.map((item) => item.id).includes('Add or Cancel Hot Sheets');

  const requestTypes = [
    {
      id: 'Change Budget or Product',
      label: t(path('RequestType.ChangeBudgetOrProduct')),
    },
    {
      id: 'Add or Cancel Hot Sheets',
      label: t(path('RequestType.AddOrCancelHotSheets')),
    },
    {
      id: 'Data or System Related Issue',
      label: t(path('RequestType.DataOrSystemRelatedIssue')),
    },
    {
      id: 'Billing Related Issue',
      label: t(path('RequestType.BillingRelatedIssue')),
    },
    {
      id: 'Other - Explain Below',
      label: t(path('RequestType.OtherExplainBelow')),
    },
  ];

  const hotSheetServices = [
    {
      id: 'Enroll' as const,
      label: t(path('Enroll')),
      checked: true,
    },
    {
      id: 'Cancel' as const,
      label: t('Common.Cancel'),
    },
  ];

  const mappedSelectedCounties = useMemo(() => {
    const mappedMarketsByState = selectedMarkets.reduce((acc, current) => {
      const state = getStateName(current);
      const county = getCountyName(current);

      if (!acc[`${state}`]) {
        acc[`${state}`] = [{ display: county }];
      } else {
        acc[`${state}`].push({ display: county });
      }

      return acc;
    }, {} as { [key: string]: { display: string }[] });

    return Object.keys(mappedMarketsByState ?? {}).map((state) => (
      <div className="im-support-ticket-state" key={state}>
        <strong className="im-current-state-selection">{state}: </strong>
        <div className="im-support-ticket-counties">
          <ListRow list={mappedMarketsByState[`${state}`]} />
        </div>
      </div>
    ));
  }, [selectedMarkets]);

  const requestTypeRef = useRef<CheckboxGroupRef>(null);
  const ticketNotesRef = useRef<TextAreaForwardRef>(null);
  const effectiveDatesRef = useRef<SelectorRef>(null);
  const marketRef = useRef<SelectorRef>(null);
  const hotSheetServiceRef = useRef<RadioGroupRef>(null);
  const attachmentsRef = useRef<InputFileRef>(null);

  const resetForm = () => {
    requestTypeRef.current?.clearCheckboxes();
    ticketNotesRef.current?.reset();
    effectiveDatesRef.current?.clearSelector();
    marketRef.current?.clearSelector();
    hotSheetServiceRef.current?.resetRadioGroup();
    attachmentsRef.current?.resetInputFile();
  };

  const onSubmit = async (
    payload: SupportTicketSubmitForm<
      typeof customerStateCountyNames,
      typeof effectiveDates,
      typeof requestTypes,
      (typeof hotSheetServices)[number]
    >
  ) => {
    setIsLoading(true);
    const { ticketNotes, hotSheetService, attachments, requestedEffectiveDate, markets, customerRequestType } = payload;

    const attachmentsWithLinks: { filename: string; url: string }[] = [];

    if (attachments?.length) {
      try {
        const allAttachmentsRes = await Promise.all(
          attachments?.map((file) => {
            const formData = new FormData();
            formData.append('file', file);

            return CustomerSupportServices.uploadAttachment({ payload: formData });
          })
        );
        attachments.forEach((file, index) =>
          attachmentsWithLinks.push({ filename: file.name, url: allAttachmentsRes[Number(index)].preSignedUrl })
        );
      } catch (e) {
        Alert.error(t(path('AttachmentsError')), { toastId: SUPPORT_TICKET_ERROR });
        return;
      }
    }

    const createTicketPayload = {
      ticketNotes,
      hotSheetService: hotSheetService?.id ?? null,
      requestedEffectiveDate: requestedEffectiveDate[0],
      markets: markets,
      customerRequestType: customerRequestType.map((item) => item.id),
      attachments: attachmentsWithLinks,
    };

    if (!displayHotSheetServices) {
      Reflect.deleteProperty(createTicketPayload, 'hotSheetService');
    }

    await CustomerSupportServices.createTicket({
      payload: createTicketPayload,
      onSuccess: () => {
        Alert.info(t(path('TicketCreated')));
        resetForm();
      },
      onError: () => {
        Alert.error(t(path('TicketCreationError')), { toastId: SUPPORT_TICKET_ERROR });
      },
      onComplete: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <Section sectionTitle={t(path('NewTicket'))} contentClassName="im-member-support-ticket-form-wrapper" maxWidth="880px">
      <Form
        formName="member-support-ticket"
        onSubmit={onSubmit}
        schema={supportTicketSchema}
        className="im-member-support-ticket-form"
        defaultSubmit={false}
      >
        <CheckboxGroup
          label={t(path('CustomerRequestType'))}
          options={requestTypes}
          name="customerRequestType"
          row
          onChange={setRequestTypeSelected}
          ref={requestTypeRef}
          disabled={isLoading}
        />
        <TextArea
          allowReset={false}
          name="ticketNotes"
          label={t(path('TicketNotes'))}
          placeholder={t(path('TicketNotesPlaceholder'))}
          height="150px"
          ref={ticketNotesRef}
          disabled={isLoading}
        />
        <Selector
          options={effectiveDates}
          label={t(path('EffectiveDateOfChange'))}
          allowSearch={false}
          width="250px"
          loading={effectiveDatesIsLoading}
          name="requestedEffectiveDate"
          ref={effectiveDatesRef}
          disabled={isLoading}
        />
        <Selector
          options={customerStateCountyNames}
          loading={customerCountiesIsLoading}
          disabled={!customerStateCountyNames.length || isLoading}
          label={t(path('Market'))}
          name="markets"
          multiple
          width="250px"
          onSelect={setSelectedMarkets as (value: unknown[]) => void}
          ref={marketRef}
        />
        {displayHotSheetServices && (
          <RadioGroup
            label={t(path('HotSheetService'))}
            options={hotSheetServices}
            name="hotSheetService"
            row
            radio
            width="250px"
            ref={hotSheetServiceRef}
            disabled={isLoading}
          />
        )}

        <Container className="im-member-support-ticket-market-selection" label={t(path('MarketsSelected'))} width="100%" variant="regular">
          {mappedSelectedCounties}
          {!selectedMarkets.length && <span className="im-support-ticket-no-markets">{t('Common.None')}</span>}
        </Container>

        <InputFile multiple name="attachments" width="100%" ref={attachmentsRef} disabled={isLoading} />

        <Button
          type="submit"
          text={t('Common.Submit')}
          className="im-support-ticket-submit"
          icon="done"
          disabled={isLoading}
          loading={isLoading}
        />
      </Form>
    </Section>
  );
}
