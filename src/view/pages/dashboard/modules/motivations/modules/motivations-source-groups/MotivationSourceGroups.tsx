import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { useContext, useMemo } from 'react';
import { ControlledTable, DropdownMenu, ListRow, Section, Switch } from '../../../../../../components';
import { TableCell, TableColumn } from '../../../../../../components/modules/table/root-component/Table.types';
import {
  MotivationSource,
  MotivationSourceGroupsResponse,
} from '../../../../../../../apis/services/motivation-services/Motivation.services.types';
import { motivationsQueries } from '../../../../../../../apis/queries';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';
import { Alert, DateTimeHelper } from '../../../../../../../utils/helpers';

const { useListMotivationSourceGroups, useToggleMotivationSourceGroupStatusMutation } = motivationsQueries;

export default function MotivationSourceGroups() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Motivations.MotivationsSourceGroups');
  const { motivationSourceGroups, motivationSourceGroupsLoading } = useListMotivationSourceGroups();
  const { mutate: toggleMotivationSourceGroupStatus } = useToggleMotivationSourceGroupStatusMutation();
  const { openDialog } = useContext(DialogsContext);

  const columns = useMemo(
    (): TableColumn<MotivationSourceGroupsResponse[number]>[] => [
      {
        Header: t(path('Table.Name')),
        accessor: 'name',
        width: 80,
        alignment: 'left' as const,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.DisplayName')),
        accessor: 'displayName',
        width: 80,
        alignment: 'left' as const,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.Description')),
        accessor: 'description',
        width: 150,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.Status')),
        accessor: 'disabledDate',
        width: 50,
        Cell: ({ value, row }: TableCell<MotivationSourceGroupsResponse[number], 'disabledDate'>) => (
          <Switch
            onChange={() =>
              toggleMotivationSourceGroupStatus({
                motivationSourceGroupId: row.original.id,
                currentEnabled: !value,
                onSuccess: () => Alert.info(t(path('StatusSuccess'))),
              })
            }
            hideLabel
            modeOnOff
            leftOption="inactive"
            rightOption="active"
            starts={value ? 'inactive' : 'active'}
            centered
          />
        ),
        disableSortBy: true,
      },
      {
        Header: t(path('Table.DisabledDate')),
        width: 90,
        disableSortBy: true,
        Cell: ({ row }: TableCell<MotivationSourceGroupsResponse[number]>) =>
          DateTimeHelper.formatDate(row.original.disabledDate, { format: 'dateAndHourDisplay' }),
      },
      {
        Header: t(path('Table.Sources')),
        accessor: 'motivationSources',
        disableSortBy: true,
        width: 200,
        Cell: ({ value }: TableCell<MotivationSourceGroupsResponse[number], 'motivationSources'>) => (
          <ListRow list={value?.map((item: MotivationSource) => ({ display: item.displayName }))} />
        ),
      },
      {
        Header: t('Common.Actions'),
        width: 60,
        Cell: ({ row }: TableCell<MotivationSourceGroupsResponse[number]>) => (
          <DropdownMenu
            options={[
              {
                icon: 'edit',
                text: t(path('ActionsMenu.EditInfo')),
                onClick: () =>
                  openDialog({ id: 'UpdateMotivationSourceGroupDialog', props: { motivationSourceGroup: row.original, type: 'info' } }),
              },
              {
                icon: 'edit',
                text: t(path('ActionsMenu.EditSources')),
                onClick: () =>
                  openDialog({ id: 'UpdateMotivationSourceGroupDialog', props: { motivationSourceGroup: row.original, type: 'sources' } }),
              },
            ]}
          />
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  return (
    <div className="im-motivations-source-groups">
      <Section maxWidth="1200px">
        <ControlledTable
          className="im-motivations-sources-table"
          data={motivationSourceGroups}
          columns={columns}
          loading={motivationSourceGroupsLoading}
        />
      </Section>
    </div>
  );
}
