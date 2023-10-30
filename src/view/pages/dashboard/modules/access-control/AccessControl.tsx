import { useTranslationPath } from '../../../../../utils/hooks';
import Users from './modules/users/Users';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../../../layouts/modules/dashboard-layout/DashboardLayout';
import Groups from './modules/groups/Groups';
import useAccessControlPermissions from './AccessControl.permissions';

export default function AccessControl() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.AccessControl');
  const permit = useAccessControlPermissions();

  const modules = [
    { name: t(path('Users.Title')), component: <Users />, hide: !permit.displayUsersTab },
    { name: t(path('Groups.Title')), component: <Groups />, hide: !permit.displayGroupsTab },
  ];

  return <DashboardLayout modules={modules} />;
}
