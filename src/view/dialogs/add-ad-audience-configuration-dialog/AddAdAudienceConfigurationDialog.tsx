import { useContext, useRef } from 'react';
import { adSenseQueries } from '../../../apis/queries';
import Constants from '../../../utils/constants/Constants';
import { Dialog, Form, InputPassword, MessageContainer, Row, Section, Selector, Switch } from '../../components';
import { adSenseConfigurationSchema } from './AddAdAudienceConfigurationDialog.schema';
import StyledAddAdAudienceConfigurationDialog from './AddAdAudienceConfigurationDialog.styled';
import { AddAdAudienceConfigurationDialogProps, AddAdAudienceFormData } from './AddAdAudienceConfigurationDialog.types';
import { FormRef } from '../../components/modules/form-group/form/Form.types';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { useTranslation } from 'react-i18next';
import { Alert, DataHelper } from '../../../utils/helpers';
import { useTranslationPath } from '../../../utils/hooks';
import ADAudienceConfigs from '../../../configs/AdAudience.configs';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useListCustomerAdSenseConfigurationsQuery, useAddConfigurationMutation } = adSenseQueries;
const { disabledPlatforms } = ADAudienceConfigs;

export default function AddAdAudienceConfigurationDialog({ customerId }: AddAdAudienceConfigurationDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.AddAdAudienceConfigurationDialog');
  const { closeDialog } = useContext(DialogsContext);
  const { audienceConfigurations, audienceConfigurationsLoading } = useListCustomerAdSenseConfigurationsQuery({
    customerId,
  });

  const { mutate } = useAddConfigurationMutation();

  const { ACTIVE, INACTIVE } = Constants.STATUS;
  const { AD_SENSE_TYPE } = Constants;
  const existingTypes = audienceConfigurations?.map((item) => DataHelper.invertObjectKeysValues(AD_SENSE_TYPE)[item.type]) ?? [];

  const selectorOptions = Object.keys(AD_SENSE_TYPE) as (keyof typeof AD_SENSE_TYPE)[];
  const FACEBOOK = 'Facebook';

  const disabledOptions = Array.from(new Set([...existingTypes, ...disabledPlatforms]));
  const formRef = useRef<FormRef>(null);

  const isAllPlatformSettled = selectorOptions.every((item) => [...disabledPlatforms, ...existingTypes].includes(item));

  const handleSubmit = (formData: AddAdAudienceFormData) => {
    mutate({
      payload: {
        type: Constants.AD_SENSE_TYPE[formData.type[0]],
        status: formData.status,
        customerId,
        accountId: formData.accountId,
      },
      onSuccess: () => {
        Alert.info(t(path('Success')));
        closeDialog('AddAdAudienceConfigurationDialog');
      },
    });
  };

  const content = (
    <StyledAddAdAudienceConfigurationDialog>
      <Section width="100%">
        <Form
          schema={adSenseConfigurationSchema}
          onSubmit={handleSubmit}
          formName="add-ad-sense-configuration"
          defaultSubmit={false}
          ref={formRef}
          className="im-add-ad-sense-configuration-form"
        >
          {isAllPlatformSettled && <MessageContainer text={t(path('NoOptions'))} variant="warning" fontSize="medium" />}
          {!isAllPlatformSettled && (
            <>
              <Row gap={[20]} align="flex-start" wrap>
                <Selector
                  options={selectorOptions}
                  disabledOptions={disabledOptions as string[]}
                  initValue={[FACEBOOK]}
                  name="type"
                  label={t(path('Platform'))}
                  allowClear={false}
                  allowReset={false}
                  allowSearch={false}
                  disabled={audienceConfigurationsLoading}
                />
                <Switch
                  modeOnOff
                  leftOption={INACTIVE}
                  rightOption={ACTIVE}
                  label={t('Common.Status')}
                  hideLabel
                  name="status"
                  starts={ACTIVE}
                  disabled={audienceConfigurationsLoading}
                />
              </Row>
              <InputPassword name="accountId" label={t(path('AccountId'))} disabled={audienceConfigurationsLoading} />
            </>
          )}
        </Form>
      </Section>
    </StyledAddAdAudienceConfigurationDialog>
  );

  const buttons: DialogButtons = [
    {
      text: t('Common.Submit'),
      icon: 'done',
      hide: isAllPlatformSettled,
      onClick: () => formRef.current?.submitForm(),
      loading: audienceConfigurationsLoading,
    },
  ];

  return <Dialog content={content} dialogId="AddAdAudienceConfigurationDialog" width="400px" buttons={buttons} title={t(path('Title'))} />;
}
