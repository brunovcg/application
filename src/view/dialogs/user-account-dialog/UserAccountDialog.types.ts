import { USState } from '../../../apis/services/states-services/States.services.types';
import { UserType } from '../../../apis/services/user-services/User.services.types';
import Constants from '../../../utils/constants/Constants';

const { TYPES } = Constants.USER;

export type UserAccountFormData = {
  username: string;
  name: string;
  phone: string;
  userType: { id: UserType; label: keyof typeof TYPES };
  streetName: string;
  zipCode: string;
  city: string;
  state: USState[];
};

export type UserAccountPayload = Omit<UserAccountFormData, 'userType' | 'state'> & { type: UserType; state: USState };

export type UserToUpdate = { id: number; email: string; name: string; userType: UserType };

export type UserAccountInstance = 'myAccount' | 'userAccount' | 'register';

export type UserAccountDialogProps = {
  instance: UserAccountInstance;
  userToUpdate?: UserToUpdate;
};

export type UserAccountUseCases = {
  setNotLoading: () => void;
  instance: UserAccountInstance;
  userToUpdate?: UserToUpdate;
};
