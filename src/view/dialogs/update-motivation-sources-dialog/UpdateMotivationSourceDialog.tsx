import { useTranslation } from 'react-i18next';
import { Dialog, Form, InputText, Readonly, Row, Section, TextArea } from '../../components';
import motivationSourceSchema from './UpdateMotivationSourceDialog.schema';
import StyledUpdateMotivationSourcesDialog from './UpdateMotivationSourceDialog.styled';
import { UpdateMotivationSourceFormData, UpdateMotivationSourcesDialogProps } from './UpdateMotivationSourceDialog.types';
import { useTranslationPath } from '../../../utils/hooks';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { useContext, useRef } from 'react';
import { FormRef } from '../../components/modules/form-group/form/Form.types';
import { motivationsQueries } from '../../../apis/queries';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';
import { Alert } from '../../../utils/helpers';

const { useUpdateMotivationSourcesMutation } = motivationsQueries;

export default function UpdateMotivationSourceDialog({ motivationSource }: UpdateMotivationSourcesDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.UpdateMotivationSourceDialog');
  const { mutate: mutateMotivationSource, isLoading } = useUpdateMotivationSourcesMutation();
  const { closeDialog } = useContext(DialogsContext);
  const formRef = useRef<FormRef>(null);

  const handleSubmit = (formData: UpdateMotivationSourceFormData) => {
    mutateMotivationSource({
      payload: {
        id: motivationSource.id,
        name: motivationSource.name,
        displayName: formData.displayName,
        description: formData.description,
        disabledDate: motivationSource.disabledDate,
        createdDate: motivationSource.disabledDate,
        modifiedDate: new Date().toISOString(),
      },
      params: {
        sourceId: motivationSource.id,
      },
      onSuccess: () => {
        closeDialog('UpdateMotivationSourceDialog');
        Alert.info(t(path('Success')));
      },
    });
  };

  const content = (
    <StyledUpdateMotivationSourcesDialog>
      <Form
        ref={formRef}
        schema={motivationSourceSchema}
        onSubmit={handleSubmit}
        formName="UpdateMotivationSource"
        defaultSubmit={false}
        width="100%"
      >
        <Section width="100%" contentClassName="im-update-motivation-source-content">
          <Row>
            <Readonly text={motivationSource.name} width="250px" label={t(path('MotivationSource'))} enabledTooltip={false} />
          </Row>

          <InputText name="displayName" label={t(path('DisplayName'))} initialValue={motivationSource.displayName} disabled={isLoading} />
          <TextArea
            width="100%"
            name="description"
            label={t(path('Description'))}
            initialValue={motivationSource.description}
            disabled={isLoading}
          />
        </Section>
      </Form>
    </StyledUpdateMotivationSourcesDialog>
  );

  const buttons: DialogButtons = [
    {
      text: t('Common.Submit'),
      icon: 'done',
      loading: isLoading,
      onClick: () => formRef.current?.submitForm(),
    },
  ];

  return <Dialog content={content} dialogId="UpdateMotivationSourceDialog" title={t(path('Title'))} width="600px" buttons={buttons} />;
}
