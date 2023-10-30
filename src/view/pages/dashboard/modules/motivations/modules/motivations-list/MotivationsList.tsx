import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { TableCell, TableColumn } from '../../../../../../components/modules/table/root-component/Table.types';
import { ButtonIcon, ControlledTable, ListRow, Section } from '../../../../../../components';
import { MotivationAlias } from '../../../../../../../apis/services/motivation-services/Motivation.services.types';
import { motivationsQueries } from '../../../../../../../apis/queries';
import { useContext, useMemo } from 'react';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';

const { useListMotivationsQuery } = motivationsQueries;

export default function MotivationsList() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Motivations.MotivationsList');

  const { motivations, motivationsIsLoading } = useListMotivationsQuery();
  const { openDialog } = useContext(DialogsContext);

  const columns: TableColumn<(typeof motivations)[number]>[] = useMemo(
    () => [
      {
        Header: t(path('Table.Name')),
        accessor: 'name',
        alignment: 'left',
        width: 100,
        Filter: true,
      },
      {
        Header: t(path('Table.Value')),
        accessor: 'value',
        width: 50,
      },
      {
        Header: t(path('Table.Expires')),
        accessor: 'expirationMonths',
        width: 50,
      },
      {
        Header: t(path('Table.Aliases')),
        accessor: 'motivationAliasList',
        width: 70,
        Cell: ({ value }: TableCell<(typeof motivations)[number], 'motivationAliasList'>) => (
          <ListRow list={value?.map((item: MotivationAlias) => ({ display: item.alias }))} />
        ),
        disableSortBy: true,
      },
      {
        Header: t(path('Table.Definition')),
        accessor: 'definition',
        alignment: 'left',
        width: 200,
        Filter: true,
      },
      {
        Header: t(path('Table.Group')),
        accessor: 'motivationGroup',
        width: 80,
        Cell: ({ value }: TableCell<(typeof motivations)[number], 'motivationGroup'>) => value?.name,
        Filter: true,
      },
      {
        Header: t('Common.Actions'),
        width: 60,
        Cell: ({ row }: TableCell<(typeof motivations)[number]>) => (
          <ButtonIcon icon="edit" onClick={() => openDialog({ id: 'UpdateMotivationDialog', props: { motivation: row.original } })} />
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  return (
    <div className="im-motivations-list">
      <Section maxWidth="1400px">
        <ControlledTable className="im-motivations-list-table" data={motivations} columns={columns} loading={motivationsIsLoading} />
      </Section>
    </div>
  );
}
