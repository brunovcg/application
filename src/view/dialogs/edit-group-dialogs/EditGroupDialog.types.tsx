import { AddRemoveListPayload } from '../../components/modules/add-remove-list/AddRemoveList.types';
import { UserType } from '../../../apis/services/user-services/User.services.types';

export type EditGroupDialogProps = {
  groupId: number;
  groupName: string;
  userType: UserType;
};

export type GroupPayload<ListType> = AddRemoveListPayload<
  ListType & {
    initSubmit?: boolean;
  }
>;
