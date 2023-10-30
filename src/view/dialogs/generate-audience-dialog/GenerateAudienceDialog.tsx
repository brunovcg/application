import { useTranslation } from 'react-i18next';
import { Dialog, Form, InputFile, InputText, Section, Selector } from '../../components';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { useTranslationPath } from '../../../utils/hooks';
import audienceSchema from './GenerateAudienceDialog.schema';
import StyledGenerateAudienceDialog from './GenerateAudienceDialog.styled';
import { useContext, useRef } from 'react';
import { FormRef } from '../../components/modules/form-group/form/Form.types';
import { GenerateAudienceDialogProps, GenerateAudienceFormData } from './GenerateAudienceDialog.types';
import { adSenseQueries } from '../../../apis/queries';
import { Alert, DataHelper } from '../../../utils/helpers';
import Constants from '../../../utils/constants/Constants';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useGenerateAudienceMutation, useListCustomerAdSenseConfigurationsQuery } = adSenseQueries;
const { AD_SENSE_TYPE, HTTP_STATUS } = Constants;
const { BAD_REQUEST, CONFLICT } = HTTP_STATUS;

export default function GenerateAudienceDialog({ customerId }: GenerateAudienceDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.GenerateAudienceDialog');
  const formRef = useRef<FormRef>(null);
  const { mutate, isLoading } = useGenerateAudienceMutation();
  const { closeDialog } = useContext(DialogsContext);
  const { audienceConfigurations, audienceConfigurationsLoading } = useListCustomerAdSenseConfigurationsQuery({
    customerId: customerId,
  });

  const mappedAdSenseTypes = DataHelper.invertObjectKeysValues(AD_SENSE_TYPE);

  const platformOptions =
    audienceConfigurations?.reduce((acc, current) => {
      const type = mappedAdSenseTypes[current.type];

      if (!acc.includes(type)) {
        acc.push(type);
      }

      return acc;
    }, [] as (keyof typeof AD_SENSE_TYPE)[]) ?? [];

  const handleSubmit = async (formData: GenerateAudienceFormData) => {
    const payload = new FormData();
    const file = formData.attachment[0];

    payload.append('mailingListFile', file);

    mutate({
      params: {
        customerId,
        adSenseTypes: formData.adSenseTypes?.map((item) => AD_SENSE_TYPE[`${item}`]),
        audienceName: formData.audienceName,
      },
      payload,
      onSuccess: () => {
        closeDialog('GenerateAudienceDialog');
        Alert.info(t(path('Success')));
      },
      errorHandling: [
        { code: CONFLICT, handler: () => Alert.error(t(path('ErrorAccountId'))) },
        {
          code: BAD_REQUEST,
          handler: () => Alert.error(t(path('ErrorFile'))),
        },
      ],
    });
  };

  const content = (
    <StyledGenerateAudienceDialog>
      <Section width="100%">
        <Form
          schema={audienceSchema}
          onSubmit={handleSubmit}
          formName="generate-audience"
          ref={formRef}
          className="im-generate-audience-form"
          defaultSubmit={false}
        >
          <InputText name="audienceName" label={t(path('AudienceName'))} />
          <Selector
            allowSearch={false}
            width="100%"
            options={platformOptions}
            name="adSenseTypes"
            loading={audienceConfigurationsLoading}
            multiple
            label={t(path('Platforms'))}
          />
          <InputFile name="attachment" label={t(path('MailingList'))} />
        </Form>
      </Section>
    </StyledGenerateAudienceDialog>
  );

  const buttons: DialogButtons = [
    {
      text: t('Common.Submit'),
      icon: 'done',
      onClick: () => formRef.current?.submitForm(),
      loading: isLoading,
    },
  ];

  return <Dialog dialogId="GenerateAudienceDialog" content={content} buttons={buttons} title={t(path('Title'))} width="450px" />;
}
