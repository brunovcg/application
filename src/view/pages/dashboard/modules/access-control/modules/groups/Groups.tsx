import { useContext } from 'react';
import { Section, ControlledTable, DropdownMenu, UserTypeChip } from '../../../../../../components';
import { groupsQueries } from '../../../../../../../apis/queries';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { TableCell, TableColumn } from '../../../../../../components/modules/table/root-component/Table.types';
import { UserType } from '../../../../../../../apis/services/user-services/User.services.types';
import useGroupsPermissions from './Groups.permissions';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';

const { useListGroupsQuery } = groupsQueries;

export default function Groups() {
  const { groupsList, groupsListLoading, groupsListSuccess } = useListGroupsQuery();
  const { openDialog } = useContext(DialogsContext);
  const permit = useGroupsPermissions();

  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.AccessControl.Groups');

  const openEditUsersDialog = (groupId: number, groupName: string, userType: UserType) =>
    openDialog({ id: 'EditGroupUsersDialog', props: { groupId, groupName, userType } });

  const openEditPermissionsDialog = (groupId: number, groupName: string, userType: UserType) =>
    openDialog({ id: 'EditGroupPermissionsDialog', props: { groupId, groupName, userType } });

  const columns: TableColumn<(typeof groupsList)[number]>[] = [
    {
      Header: t(path('Id')),
      accessor: 'id',
      width: 30,
      Filter: true,
    },
    {
      Header: t(path('Name')),
      accessor: 'name',
      alignment: 'left' as const,
      width: 90,
      Filter: true,
    },
    {
      Header: t(path('UserType')),
      accessor: 'userTypeDisplay',
      width: 45,
      Filter: true,
      Cell: ({ row }: TableCell<(typeof groupsList)[number]>) => <UserTypeChip userType={row.original.userType} />,
    },
    {
      Header: t(path('UsersCount')),
      accessor: 'usersCount',
      width: 50,
      Filter: true,
    },
    {
      Header: t(path('PermissionsCount')),
      accessor: 'permissionsCount',
      width: 50,
      Filter: true,
    },
    {
      Header: t('Common.Actions'),
      Cell: ({ row }: TableCell<(typeof groupsList)[number]>) => {
        const { id, name, userType } = row.original;
        return (
          <DropdownMenu
            disabled={!permit.updateUsersInGroup && !permit.updatePermissions}
            options={[
              {
                text: t(path('UpdateUsers')),
                onClick: () => openEditUsersDialog(id as unknown as number, name, userType),
                icon: 'group',
                hide: !permit.updateUsersInGroup,
              },
              {
                text: t(path('UpdatePermissions')),
                onClick: () => openEditPermissionsDialog(id as unknown as number, name, userType),
                icon: 'security',
                hide: !permit.updatePermissions,
              },
            ]}
          />
        );
      },
      width: 40,
      disableSortBy: true,
    },
  ];

  return (
    <div className="im-groups">
      <Section maxWidth="1000px" sectionTitle={t(path('GroupList'))} icon="group">
        <ControlledTable
          tableWidth="950px"
          columns={columns}
          data={groupsList}
          paginate={[20, 50, 'All']}
          showGlobalFilter={false}
          loading={groupsListLoading}
          noData={groupsListSuccess && !groupsList.length ? t(path('NoData')) : t('Common.NoMatches')}
        />
      </Section>
    </div>
  );
}
