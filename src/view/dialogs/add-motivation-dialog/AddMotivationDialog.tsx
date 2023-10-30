import { Container, Readonly, Selector, TextArea, Dialog } from '../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../utils/hooks';
import { motivationsQueries } from '../../../apis/queries';
import './AddMotivationDialog.scss';
import { useContext, useState } from 'react';
import Constants from '../../../utils/constants/Constants';
import { AddressServices } from '../../../apis/services';
import { Motivation, MotivationSource } from '../../../apis/services/motivation-services/Motivation.services.types';
import { useQueryClient } from 'react-query';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { Alert } from '../../../utils/helpers';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { LIST_ADDRESS_MOTIVATIONS } = Constants.QUERIES;

const { useListMotivationSourcesQuery, useListMotivationsQuery } = motivationsQueries;

export default function AddMotivationDialog({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const { sessionUser } = useContext(UserSessionContext);
  const { t } = useTranslation();
  const { motivations, motivationsIsLoading } = useListMotivationsQuery();
  const { motivationSources, motivationSourcesIsLoading } = useListMotivationSourcesQuery({ showDisabled: false });
  const [selectedMotivation, setSelectedMotivation] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [notes, setNotes] = useState('');
  const { closeDialog } = useContext(DialogsContext);

  const path = useTranslationPath('Dialogs.AddMotivationDialog');

  const isFormValid = !!selectedMotivation && !!selectedSource;

  const content = (
    <Container className="im-add-motivation-dialog" width="100%">
      <Readonly label={t(path('AddressId'))} text={id} dataTestId="im-add-motivation-addressId" />
      <Selector
        label={t(path('Motivation'))}
        options={motivations.map((item) => item.mappedName as string)}
        loading={motivationsIsLoading}
        onSelect={(value) => setSelectedMotivation(value[0] as string)}
        width="100%"
        testInstance="add-motivation"
      />
      <Selector
        label={t(path('Source'))}
        options={motivationSources.map((item) => item.mappedName as string)}
        loading={motivationSourcesIsLoading}
        onSelect={(value) => setSelectedSource(value[0] as string)}
        width="100%"
        testInstance="motivation-source"
      />
      <TextArea label={t(path('Notes'))} optionalLabel onChange={(value) => setNotes(value)} />
    </Container>
  );

  const buttons: DialogButtons = [
    {
      hide: !isFormValid,
      icon: 'done',
      text: t('Common.Submit'),
      disabled: !isFormValid,
      dataTestId: 'im-add-motivation-submit',
      onClick: () =>
        AddressServices.saveMotivation(id, {
          userId: sessionUser.id,
          customerId: sessionUser.isCustomer ? sessionUser.id : null,
          motivationSource: motivationSources.find((mot) => mot.mappedName === selectedSource) as unknown as MotivationSource,
          motivation: motivations.find((mot) => mot.mappedName === selectedMotivation) as unknown as Motivation,
          notes,
        }).then(() => {
          closeDialog('AddMotivationDialog');
          Alert.info(t(path('MotivationSubmitted')));
          queryClient.invalidateQueries(`${LIST_ADDRESS_MOTIVATIONS}-${id}`);
        }),
    },
  ];

  return (
    <Dialog
      dialogId="AddMotivationDialog"
      content={content}
      title={t(path('Title'))}
      closeOnOutsideClick={false}
      width="400px"
      buttons={buttons}
    />
  );
}
