import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { useContext, useMemo } from 'react';
import { TableCell, TableColumn } from '../../../../../../components/modules/table/root-component/Table.types';
import { ButtonIcon, ControlledTable, Section, Switch } from '../../../../../../components';
import { motivationsQueries } from '../../../../../../../apis/queries';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';
import { Alert, DateTimeHelper } from '../../../../../../../utils/helpers';

const { useListMotivationSourcesQuery, useToggleMotivationSourceStatusMutation } = motivationsQueries;

export default function MotivationSources() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Motivations.MotivationSources');
  const { motivationSources, motivationSourcesIsLoading } = useListMotivationSourcesQuery({ showDisabled: true });
  const { openDialog } = useContext(DialogsContext);
  const { mutate: toggleStatus } = useToggleMotivationSourceStatusMutation();

  const columns = useMemo(
    (): TableColumn<(typeof motivationSources)[number]>[] => [
      {
        Header: t(path('Table.Name')),
        accessor: 'name',
        width: 80,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.DisplayName')),
        accessor: 'displayName',
        width: 80,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.Description')),
        accessor: 'description',
        width: 100,
        disableSortBy: true,
      },
      {
        Header: t(path('Table.Status')),
        accessor: 'disabledDate',
        width: 50,
        Cell: ({ value, row }: TableCell<(typeof motivationSources)[number], 'disabledDate'>) => (
          <Switch
            onChange={() =>
              toggleStatus({
                motivationSourceId: row.original.id,
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
        width: 80,
        disableSortBy: true,
        Cell: ({ row }: TableCell<(typeof motivationSources)[number]>) =>
          DateTimeHelper.formatDate(row.original.disabledDate, { format: 'dateAndHourDisplay' }),
      },
      {
        Header: t('Common.Actions'),
        width: 60,
        Cell: ({ row }: TableCell<(typeof motivationSources)[number]>) => (
          <ButtonIcon
            icon="edit"
            onClick={() => openDialog({ id: 'UpdateMotivationSourceDialog', props: { motivationSource: row.original } })}
          />
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  return (
    <div className="im-motivations-sources">
      <Section maxWidth="1000px">
        <ControlledTable
          className="im-motivations-sources-table"
          data={motivationSources}
          columns={columns}
          loading={motivationSourcesIsLoading}
        />
      </Section>
    </div>
  );
}
