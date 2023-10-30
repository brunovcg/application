import { useTranslation } from 'react-i18next';
import { Button, ControlledTable, DeleteConfirmation, Section, SelectorCustomer, UserFeedback } from '../../../../../../components';
import StyledAudience from './Audience.styled';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { useContext, useMemo, useState } from 'react';
import { TableCell, TableColumn } from '../../../../../../components/modules/table/root-component/Table.types';
import { adSenseQueries } from '../../../../../../../apis/queries';
import { Alert, DataHelper, DateTimeHelper } from '../../../../../../../utils/helpers';
import Constants from '../../../../../../../utils/constants/Constants';
import useAudiencePermissions from './Audience.permissions';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';
import { AdAudience } from '../../../../../../../apis/services/ad-sense-services/AdSense.services.types';

const { useListCustomerAudiencesQuery, useListConfiguredCustomersQuery, useDeleteAudienceMutation } = adSenseQueries;
const { AD_SENSE_TYPE } = Constants;

export default function Audience() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.AdAudience.Audience');
  const [selectedCustomer, setSelectedCustomer] = useState<null | number>(null);
  const { customerAudiences, customerAudiencesIsLoading } = useListCustomerAudiencesQuery({ customerId: selectedCustomer });
  const permit = useAudiencePermissions();
  const { openDialog } = useContext(DialogsContext);
  const { customersWithActiveConfigurations, customersWithActiveConfigurationsIsLoading } = useListConfiguredCustomersQuery();
  const { mutate: deleteAudienceMutation, isLoading: deleteAudienceMutationIsLoading } = useDeleteAudienceMutation();

  const columns: TableColumn<AdAudience>[] = useMemo(
    () => [
      { Header: t(path('Table.Id')), accessor: 'id', Filter: true },
      { Header: t(path('Table.Name')), accessor: 'name', Filter: true },
      {
        Header: t(path('Table.AdSenseType')),
        accessor: 'adSenseType',
        Filter: true,
        Cell: ({ value }: TableCell<AdAudience, 'adSenseType'>) => {
          const mappedAdSenses = DataHelper.invertObjectKeysValues(AD_SENSE_TYPE);
          return mappedAdSenses[value as keyof typeof mappedAdSenses];
        },
      },
      {
        Header: t(path('Table.CreationDate')),
        accessor: 'creationDate',
        Cell: ({ value }: TableCell<AdAudience, 'creationDate'>) => DateTimeHelper.formatDate(value, { format: 'dateAndHourDisplay' }),
      },
      {
        Header: t(path('Table.Actions')),
        disableSortBy: true,
        width: 160,
        Cell: ({ row }: TableCell<AdAudience>) => (
          <DeleteConfirmation
            loading={deleteAudienceMutationIsLoading}
            onDelete={() =>
              deleteAudienceMutation({
                params: {
                  audienceType: row.original.adSenseType,
                  audienceId: row.original.id,
                },
                onSuccess: () => Alert.info(t(path('Deleted'))),
                customerId: selectedCustomer as number,
              })
            }
          />
        ),
      },
    ],
    [selectedCustomer, customerAudiences]
  );

  const feedback = () => {
    if (!selectedCustomer && !customerAudiences) {
      return { variant: 'warning', message: t(path('NoCustomerSelected')) } as const;
    }

    if (customerAudiences?.length === 0) {
      return { variant: 'warning', message: t(path('NoData')) } as const;
    }

    if (customerAudiencesIsLoading) {
      return { variant: 'loading' } as const;
    }

    return null;
  };

  const hasData = customerAudiences && !!customerAudiences.length;

  return (
    <StyledAudience className="im-audience">
      <Section maxWidth="1000px" contentClassName="im-audience-header">
        <SelectorCustomer
          showError={false}
          outputFormat="id"
          onSelect={(value) => setSelectedCustomer(value[0])}
          filterOptionsByIds={customersWithActiveConfigurations?.ids}
          loading={customersWithActiveConfigurationsIsLoading}
        />
        {!!selectedCustomer && permit.generateAudience && (
          <Button
            text={t(path('GenerateAudience'))}
            icon="add"
            onClick={() => openDialog({ id: 'GenerateAudienceDialog', props: { customerId: selectedCustomer } })}
          />
        )}
      </Section>
      <Section maxWidth="1000px" className="im-audience-content">
        {!hasData && <UserFeedback variant={feedback()?.variant} message={feedback()?.message} />}
        {hasData && <ControlledTable columns={columns} data={customerAudiences} showColumnSelection={false} paginate={[20, 30, 50]} />}
      </Section>
    </StyledAudience>
  );
}
