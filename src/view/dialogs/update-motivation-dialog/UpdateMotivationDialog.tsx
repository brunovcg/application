import { useTranslation } from 'react-i18next';
import { Dialog, Form, InputNumber, Readonly, Section, Selector, TextArea, AddOptions, Row } from '../../components';
import motivationSchema from './UpdateMotivationDialog.schema';
import StyledUpdateMotivationDialog from './UpdateMotivationDialog.styled';
import { UpdateMotivationDialogProps, UpdateMotivationSourceFormData } from './UpdateMotivationDialog.types';
import { useTranslationPath } from '../../../utils/hooks';
import { useContext, useRef } from 'react';
import { FormRef } from '../../components/modules/form-group/form/Form.types';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { motivationsQueries } from '../../../apis/queries';
import { Alert } from '../../../utils/helpers';
import { MotivationGroup } from '../../../apis/services/motivation-services/Motivation.services.types';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useMotivationGroupsQuery, useUpdateMotivationsMutation } = motivationsQueries;

export default function UpdateMotivationDialog({ motivation }: UpdateMotivationDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.UpdateMotivationDialog');
  const { groupList, motivationGroups } = useMotivationGroupsQuery();
  const { mutate, isLoading } = useUpdateMotivationsMutation();
  const { closeDialog } = useContext(DialogsContext);

  const formRef = useRef<FormRef>(null);

  const handleSubmit = (formData: UpdateMotivationSourceFormData) => {
    const now = new Date().toISOString();

    const handleMotivationId = (name: string) => motivation.motivationAliasList.find((item) => item.alias == name)?.id ?? null;
    const handleMotivationCreated = (name: string) => motivation.motivationAliasList.find((item) => item.alias == name)?.createdDate ?? now;

    mutate({
      motivationId: motivation.id,
      payload: {
        createdDate: motivation.createdDate,
        definition: formData.definition,
        expirationMonths: formData.expirationMonths,
        id: motivation.id,
        mailingStatement: motivation.mailingStatement,
        modifiedDate: now,
        motivationAliasList: formData.motivationAliasList.map((item) => ({
          alias: item,
          createdDate: handleMotivationCreated(item),
          id: handleMotivationId(item),
          modifiedDate: now,
        })),
        motivationGroup: motivationGroups?.[formData.motivationGroup[0] as keyof typeof motivationGroups] as MotivationGroup,
        name: motivation.name,
        value: formData.value,
      },
      onSuccess: () => {
        Alert.info(t(path('Success')));
        closeDialog('UpdateMotivationDialog');
      },
    });
  };

  const aliasesList = motivation.motivationAliasList.map((item) => item.alias);

  const content = (
    <StyledUpdateMotivationDialog>
      <Section className="im-update-motivation-dialog">
        <Form
          ref={formRef}
          schema={motivationSchema}
          onSubmit={handleSubmit}
          formName="update-motivation"
          defaultSubmit={false}
          className="im-update-motivation-dialog-form"
        >
          <Row>
            <Readonly text={motivation.name} width="250px" label={t(path('Motivation'))} enabledTooltip={false} />
          </Row>
          <TextArea
            disabled={isLoading}
            name="definition"
            width="100%"
            label={t(path('Definition'))}
            initialValue={motivation.definition}
          />

          <InputNumber
            disabled={isLoading}
            name="value"
            width="170px"
            allowClear={false}
            initialValue={String(motivation.value)}
            label={t(path('Value'))}
          />
          <InputNumber
            disabled={isLoading}
            name="expirationMonths"
            width="170px"
            allowClear={false}
            initialValue={String(motivation.expirationMonths)}
            label={t(path('Expiration'))}
          />
          <Selector
            disabled={isLoading}
            options={groupList}
            name="motivationGroup"
            label={t(path('Group'))}
            initValue={[motivation.motivationGroup?.name]}
          />
          <AddOptions
            disabled={isLoading}
            label={t(path('Aliases'))}
            name="motivationAliasList"
            maxHeight="120px"
            initialState={aliasesList}
          />
        </Form>
      </Section>
    </StyledUpdateMotivationDialog>
  );

  const buttons: DialogButtons = [
    {
      text: t('Common.Submit'),
      icon: 'done',
      loading: isLoading,
      onClick: () => formRef.current?.submitForm(),
    },
  ];

  return <Dialog content={content} dialogId="UpdateMotivationDialog" width="720px" title={t(path('Title'))} buttons={buttons} />;
}
