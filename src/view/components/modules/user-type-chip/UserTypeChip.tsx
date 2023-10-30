import { useTranslation } from 'react-i18next';
import { UserType } from '../../../../apis/services/user-services/User.services.types';
import Chip from '../chip/Chip';
import Constants from '../../../../utils/constants/Constants';

const { CUSTOMER } = Constants.USER.TYPES;

export default function UserTypeChip({ userType }: { userType: UserType }) {
  const { t } = useTranslation();

  const text = userType === CUSTOMER ? t('Common.Customer') : t('Common.Internal');

  return (
    <div className="im-global-centered">
      <Chip variant={userType === CUSTOMER ? 'primary' : 'medium'} text={text} size="small" />
    </div>
  );
}
