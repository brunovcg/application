import { useTranslation } from 'react-i18next';
import { Dialog, Form, InputText, Readonly, Section, Selector, TextArea } from '../../components';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import StyledUpdateMotivationSourceGroupDialog from './UpdateMotivationSourceGroupDialog.styled';
import { UpdateMotivationSourceGroupDialogProps, UpdateMotivationSourceGroupFormData } from './UpdateMotivationSourceGroupsDialog.types';
import { useTranslationPath } from '../../../utils/hooks';
import { motivationSourceGroupsInfoSchema, motivationSourceGroupsSourcesSchema } from './UpdateMotivationSourceGroupDialog.schema';
import { FormRef } from '../../components/modules/form-group/form/Form.types';
import { useContext, useMemo, useRef } from 'react';
import { motivationsQueries } from '../../../apis/queries';
import { Alert, DataHelper } from '../../../utils/helpers';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useListMotivationSourcesQuery, useUpdateSourceGroupMutation, useUpdateSourceGroupSourcesMutation } = motivationsQueries;

export default function UpdateMotivationSourceGroupDialog({ motivationSourceGroup, type }: UpdateMotivationSourceGroupDialogProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.UpdateMotivationSourceGroupDialog');
  const formRef = useRef<FormRef>(null);
  const { motivationSources, motivationSourcesIsLoading } = useListMotivationSourcesQuery({ showDisabled: false });
  const { mutate: mutateSourceGroup, isLoading: sourceGroupLoading } = useUpdateSourceGroupMutation();
  const { mutate: mutateSourceGroupSources, isLoading: sourceGroupSourcesLoading } = useUpdateSourceGroupSourcesMutation();
  const { closeDialog } = useContext(DialogsContext);

  const handleSubmit = (formData: UpdateMotivationSourceGroupFormData) => {
    if (type === 'info') {
      return mutateSourceGroup({
        payload: { description: formData.description ?? '', displayName: formData.displayName ?? '' },
        params: {
          sourceGroupId: motivationSourceGroup.id,
        },
        onSuccess: () => {
          closeDialog('UpdateMotivationSourceGroupDialog');
          Alert.info(t(path('Success')));
        },
      });
    }

    mutateSourceGroupSources({
      payload: motivationSources.filter((item) => formData.sources.includes(item.mappedName as string)),
      params: {
        sourceGroupId: motivationSourceGroup.id,
      },
      onSuccess: () => {
        closeDialog('UpdateMotivationSourceGroupDialog');
        Alert.info(t(path('Success')));
      },
    });
  };

  const initialSources = useMemo(() => {
    const mappedCurrentSourceGroups = motivationSourceGroup.motivationSources.map((item) => item.name);

    return DataHelper.filterMap(
      motivationSources,
      (item) => mappedCurrentSourceGroups.includes(item.name),
      (item) => item.mappedName as string
    );
  }, [motivationSourceGroup, motivationSources]);

  const schema = type === 'info' ? motivationSourceGroupsInfoSchema : motivationSourceGroupsSourcesSchema;

  const content = (
    <StyledUpdateMotivationSourceGroupDialog>
      <Section width="100%" minHeight="190px">
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          formName="UpdateMotivationSourceGroup"
          defaultSubmit={false}
          ref={formRef}
          width="100%"
          className="im-update-motivation-source-group-form"
        >
          <Readonly text={motivationSourceGroup.name} width="250px" label={t(path('MotivationSourceGroup'))} enabledTooltip={false} />
          {type === 'info' && (
            <>
              <InputText
                name="displayName"
                label={t(path('DisplayName'))}
                width="100%"
                initialValue={motivationSourceGroup.displayName}
                disabled={sourceGroupLoading}
              />
              <TextArea
                name="description"
                label={t(path('Description'))}
                initialValue={motivationSourceGroup.description as string}
                disabled={sourceGroupLoading}
              />
            </>
          )}
          {type === 'sources' && (
            <Selector
              options={motivationSources?.map((item) => item.mappedName as string)}
              label={t(path('Sources'))}
              width="100%"
              loading={motivationSourcesIsLoading}
              initValue={initialSources}
              multiple
              name="sources"
              disabled={sourceGroupSourcesLoading}
            />
          )}
        </Form>
      </Section>
    </StyledUpdateMotivationSourceGroupDialog>
  );

  const buttons: DialogButtons = [
    {
      text: t('Common.Submit'),
      icon: 'done',
      loading: sourceGroupLoading || sourceGroupSourcesLoading,
      onClick: () => formRef.current?.submitForm(),
    },
  ];

  return <Dialog content={content} dialogId="UpdateMotivationSourceGroupDialog" buttons={buttons} title={t(path('Title'))} width="450px" />;
}
