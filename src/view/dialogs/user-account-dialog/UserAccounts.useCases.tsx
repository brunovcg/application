import { UserServices } from '../../../apis/services';
import { useTranslationPath } from '../../../utils/hooks';
import { useTranslation } from 'react-i18next';
import Constants from '../../../utils/constants/Constants';
import { userQueries } from '../../../apis/queries';
import { UserAccountFormData, UserAccountUseCases } from './UserAccountDialog.types';
import { useContext } from 'react';
import { Alert, DataHelper } from '../../../utils/helpers';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';

const { useUserRegisterMutation, useUpdateUserInfoMutation } = userQueries;
const { CUSTOMER, INTERNAL_USER } = Constants.USER.TYPES;
const { removeObjectFalsies } = DataHelper;

const useCasesUserAccount = ({ setNotLoading, instance, userToUpdate }: UserAccountUseCases) => {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.UserAccountDialog');
  const { mutate: registerUserMutation } = useUserRegisterMutation();
  const { mutate: updateUserMutation } = useUpdateUserInfoMutation();
  const { openDialog, closeDialog } = useContext(DialogsContext);

  const { sessionUser, updateSessionUserMyAccount } = useContext(UserSessionContext);

  return (formData: UserAccountFormData) => {
    const { userType, state, ...rest } = formData;

    const payload = { state: state?.[0], ...rest };
    removeObjectFalsies(payload);

    if (instance === 'myAccount') {
      const payloadWithId = { ...payload, id: sessionUser?.id };
      if (userType?.id === CUSTOMER) {
        UserServices.updateMyAccount({
          payload: payloadWithId,
          onSuccess: () => {
            Alert.info(t(path('MyAccountUpdateSuccess')));
            closeDialog('UserAccountDialog');
            updateSessionUserMyAccount(payload);
          },
          onComplete: () => {
            setNotLoading();
          },
        });
      } else {
        UserServices.updateInternalMyAccount({
          payload: payloadWithId,
          onSuccess: () => {
            Alert.info(t(path('MyAccountUpdateSuccess')));
            closeDialog('UserAccountDialog');
            updateSessionUserMyAccount(payload);
          },
          onComplete: () => setNotLoading(),
        });
      }
    } else if (instance === 'register') {
      const payloadWithType = { ...payload, type: userType?.id };

      registerUserMutation({
        payload: payloadWithType,
        onSuccess: ({ id }) => {
          if (userType?.id === CUSTOMER) {
            openDialog({ id: 'SubscribeRedirectMarketDialog', props: { username: payload.username, userId: id } });
            closeDialog('UserAccountDialog');
          } else {
            openDialog({
              id: 'UpdateUserGroupsDialog',
              props: { username: payload.username, userId: id, userType: INTERNAL_USER },
            });
            closeDialog('UserAccountDialog');
          }
          Alert.info(t(path('UserRegistered')));
        },
        onComplete: () => setNotLoading(),
      });
    } else if (instance === 'userAccount') {
      const payloadWithId = { ...payload, id: userToUpdate?.id as number };

      updateUserMutation({
        payload: payloadWithId,
        onSuccess: () => {
          closeDialog('UserAccountDialog');
          Alert.info(t(path('UserAccountUpdateSuccess')));
        },
      });
    }
  };
};

export default useCasesUserAccount;
