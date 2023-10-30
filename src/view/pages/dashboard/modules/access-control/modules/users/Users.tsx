import { useTranslation } from 'react-i18next';
import { Button, ControlledTable, DropdownMenu, Section, Selector, UserTypeChip } from '../../../../../../components';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import Constants from '../../../../../../../utils/constants/Constants';
import { userQueries } from '../../../../../../../apis/queries';
import { useContext } from 'react';
import { TableCell, TableColumn } from '../../../../../../components/modules/table/root-component/Table.types';
import { Alert, DataHelper } from '../../../../../../../utils/helpers';
import { PasswordServices } from '../../../../../../../apis/services';
import StyledUsers from './Users.styled';
import { UserType } from '../../../../../../../apis/services/user-services/User.services.types';
import useNavigation from '../../../../../../../utils/hooks/modules/use-navigation/useNavigation';
import useUsersPermissions from './Users.permissions';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';

const { INACTIVE, ACTIVE } = Constants.USER.STATUS;
const { CUSTOMER } = Constants.USER.TYPES;
const { invertObjectKeysValues } = DataHelper;
const { useListAllUsersQuery, useUpdateUserStatusMutation } = userQueries;

export default function Users() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.AccessControl.Users');
  const { sessionUser } = useContext(UserSessionContext);
  const { openDialog } = useContext(DialogsContext);
  const { mutate: updateStatus } = useUpdateUserStatusMutation();
  const permit = useUsersPermissions();

  const { usersList, usersListLoading, userListIsSuccess } = useListAllUsersQuery();

  const { navigate } = useNavigation();

  const openRegisterUserDialog = () => openDialog({ id: 'UserAccountDialog', props: { instance: 'register' } });

  const openUpdateUserDataDialog = (userRow: { id: number; name: string; username: string; userType: UserType }) => {
    const { id, name, username, userType } = userRow;
    openDialog({
      id: 'UserAccountDialog',
      props: { instance: 'userAccount', userToUpdate: { id, name, email: username, userType } },
    });
  };

  const openUpdateUserGroups = (userId: number, username: string, userType: UserType) => {
    openDialog({
      id: 'UpdateUserGroupsDialog',
      props: { userId, username, userType },
    });
  };

  const inactiveDisplay = t('Common.Inactive');
  const activeDisplay = t('Common.Active');

  const userStatus = {
    [INACTIVE]: inactiveDisplay,
    [ACTIVE]: activeDisplay,
  };

  const userStatusValues = invertObjectKeysValues(userStatus);

  const selectOptions = [inactiveDisplay, activeDisplay];

  const columns: TableColumn<(typeof usersList)[number]>[] = [
    { Header: t(path('Id')), accessor: 'id', width: 30, Filter: true },
    { Header: t(path('Username')), accessor: 'username', alignment: 'left' as const, width: 90, Filter: true },
    {
      Header: t(path('UserType')),
      accessor: 'userTypeDisplay',
      width: 45,
      Filter: true,
      Cell: ({ row }: TableCell<(typeof usersList)[number]>) => <UserTypeChip userType={row.original.userType} />,
    },
    { Header: t(path('Name')), accessor: 'name', width: 90, Filter: true },
    { Header: t(path('Groups')), accessor: 'groupsCount', width: 50, Filter: true },
    {
      Header: t(path('Status')),
      accessor: 'status',
      Cell: ({ row }: TableCell<(typeof usersList)[number]>) => (
        <div className="im-global-centered">
          <Selector
            allowSearch={false}
            width="115px"
            displayColor={{ [inactiveDisplay]: 'error', [activeDisplay]: 'valid' }}
            options={selectOptions}
            initValue={[userStatus[row.original.status as keyof typeof userStatus]]}
            allowClear={false}
            disabled={sessionUser.id === Number(row.original.id) || !permit.updateStatus}
            onSelect={([value]) => {
              updateStatus({
                onSuccess: () => Alert.info(t(path('StatusUpdated'), { name: row.original.username })),
                payload: { id: Number(row.original.id), status: userStatusValues[value as keyof typeof userStatusValues] },
              });
            }}
          />
        </div>
      ),
      width: 50,
      selectorFilter: {
        options: ['Inactive', 'Active'],
        width: '150px',
        mappedValues: {
          Inactive: INACTIVE,
          Active: ACTIVE,
        },
        valuesVariant: {
          Inactive: 'error',
          Active: 'valid',
        },
      },
    },
    {
      Header: t('Common.Actions'),
      Cell: ({ row }: TableCell<(typeof usersList)[number]>) => (
        <DropdownMenu
          disabled={!permit.updateUserGroups && !permit.assignToMarkets && !permit.updateUserData && !permit.sendPasswordRecovery}
          options={[
            {
              icon: 'edit',
              text: t(path('UpdateUserGroups')),
              onClick: () => openUpdateUserGroups(Number(row.original.id), row.original.name, row.original.userType),
              hide: !permit.updateUserGroups,
            },
            {
              icon: 'sign',
              hide: row.original.userType !== CUSTOMER || !permit.assignToMarkets,
              text: t(path('AssignUserToMarkets')),
              onClick: () => navigate({ routeName: 'buyBox', search: `?userId=${row.original.id}` }),
            },
            {
              icon: 'user',
              hide: !permit.updateUserData,
              text: t(path('UpdateUserData')),
              disabled: row.original.username === sessionUser.username,
              onClick: () =>
                openUpdateUserDataDialog(row.original as unknown as { id: number; name: string; username: string; userType: UserType }),
            },
            {
              icon: 'mail',
              hide: !permit.sendPasswordRecovery,
              text: t(path('SendPasswordLink')),
              onClick: () =>
                PasswordServices.sendForgotPasswordEmail({
                  username: row.original.username,
                  onSuccess: () => Alert.info(t(path('SendRegisterPasswordSuccess'), { username: row.original.username })),
                }),
            },
          ]}
        />
      ),
      width: 40,
      disableSortBy: true,
    },
  ];

  return (
    <StyledUsers className="im-access-control-users">
      <Section className="im-user-list" sectionTitle={t(path('UsersList'))} maxWidth="1200px" icon="users">
        {permit.registerUser && <Button icon="add" text={t(path('RegisterUser'))} onClick={openRegisterUserDialog} />}
        <ControlledTable
          showGlobalFilter={true}
          tableWidth="1150px"
          columns={columns}
          data={usersList}
          paginate={[10, 50, 'All']}
          loading={usersListLoading}
          noData={userListIsSuccess && !usersList.length ? t(path('NoData')) : t('Common.NoMatches')}
        />
      </Section>
    </StyledUsers>
  );
}
