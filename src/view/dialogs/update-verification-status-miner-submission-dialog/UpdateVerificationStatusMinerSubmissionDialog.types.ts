import {
  AddressMotivationSubmission,
  AddressMotivationVerificationStatus,
} from '../../../apis/services/address-services/Address.services.types';

export type UpdateVerificationStatusMinerSubmissionDialogProps = {
  newStatus: AddressMotivationVerificationStatus | null;
  addressData: AddressMotivationSubmission;
  addAssessed: (newAssessed: AddressMotivationSubmission) => void;
  handleCancel: () => void;
};
