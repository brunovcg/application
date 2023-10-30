import { AddRemoveListPayload } from '../../components/modules/add-remove-list/AddRemoveList.types';
import { UserType } from '../../../apis/services/user-services/User.services.types';

export type UpdateUsersDialogProps = {
  userId: number;
  username: string;
  userType: UserType;
};

export type UserPayload<ListType> = AddRemoveListPayload<
  ListType & {
    initSubmit?: boolean;
  }
>;
