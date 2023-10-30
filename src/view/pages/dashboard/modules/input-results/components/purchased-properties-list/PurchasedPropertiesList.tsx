import { useContext, useMemo, useState } from 'react';
import { ControlledTable, Section, SelectorCustomer, UserFeedback, ListRow, Chip } from '../../../../../../components';
import { purchasedPropertiesQueries } from '../../../../../../../apis/queries';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { useTranslation } from 'react-i18next';
import { TableCell, TableColumn } from '../../../../../../components/modules/table/root-component/Table.types';
import Constants from '../../../../../../../utils/constants/Constants';
import StyledPurchasedPropertiesList from './PurchasedPropertiesList.styled';
import { CurrencyHelper, LetterCaseHelper } from '../../../../../../../utils/helpers';
import { PurchasedProperty } from '../../../../../../../apis/services/purchased-properties-services/PurchasedProperties.services.types';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

const { usePurchasedPropertiesQuery } = purchasedPropertiesQueries;
const { toUSD } = CurrencyHelper;
const { DEAL_SOURCES } = Constants;
const { capitalize } = LetterCaseHelper;

const colors = {
  PROCESSING: 'warning',
  FAILED: 'error',
  COMPLETED: 'valid',
} as const;

export default function PurchasedPropertiesList() {
  const [customerId, setCustomerId] = useState(0);
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.InputResults');
  const { sessionUser } = useContext(UserSessionContext);

  const { purchasedProperties, purchasedPropertiesIsLoading } = usePurchasedPropertiesQuery(customerId);

  const headers: TableColumn<PurchasedProperty>[] = [
    {
      Header: t(path('Address')),
      accessor: 'streetName',
    },
    {
      Header: t(path('City')),
      accessor: 'city',
    },
    {
      Header: t(path('Market')),
      accessor: 'market',
    },
    {
      Header: t(path('State')),
      accessor: 'state',
      width: 90,
    },
    {
      Header: t(path('Profit')),
      accessor: 'profit',
      Cell: ({ value }: { value: number }) => toUSD(value),
    },
    {
      Header: t(path('ZipCode')),
      accessor: 'zipCode',
      width: 100,
    },
    {
      Header: t(path('PurchasedDate')),
      accessor: 'purchaseDate',
    },
    {
      Header: t(path('Status')),
      accessor: 'status',
      width: 120,
      Cell: ({ value }: TableCell<PurchasedProperty, 'status'>) => (
        <Chip variant={colors[`${value}`]} text={capitalize(value)} size="small" centered />
      ),
    },
    {
      Header: t(path('DealSource')),
      accessor: 'dealSources',
      disableSortBy: true,
      width: 200,
      Cell: ({ value }: TableCell<PurchasedProperty, 'dealSources'>) => (
        <ListRow list={value.map((item) => ({ display: DEAL_SOURCES[`${item}`]?.name }))} centered />
      ),
    },
    {
      Header: t(path('Motivations')),
      accessor: 'motivations',
      width: 200,
      disableSortBy: true,
      Cell: ({ value }: TableCell<PurchasedProperty, 'motivations'>) => {
        if (!value?.length) {
          return <Chip text={t(path('NoMotivations'))} centered variant="error" size="small" />;
        }

        return <ListRow list={value.map((item) => ({ display: item }))} centered />;
      },
    },
  ];

  const hasData = Array.isArray(purchasedProperties) ? purchasedProperties?.length > 0 : false;

  const feedback = useMemo(() => {
    if (!customerId) {
      return {
        variant: 'warning' as const,
        message: t(path('SelectCustomer')),
      };
    }

    if (purchasedPropertiesIsLoading) {
      return {
        variant: 'loading' as const,
      };
    }

    if (!hasData && !!customerId) {
      return {
        variant: 'warning' as const,
        message: t(path('NoData')),
      };
    }

    return {
      variant: 'warning' as const,
      message: '',
    };
  }, [customerId, purchasedPropertiesIsLoading, hasData]);

  const handleChangeCustomer = (selectedUser: number[]) => {
    setCustomerId(selectedUser[0]);
  };

  return (
    <StyledPurchasedPropertiesList className="im-purchased-properties-list">
      {!sessionUser.isCustomer && (
        <Section maxWidth="1500px" sectionTitle={t(path('CustomerSelection'))} minHeight="160px" icon="user">
          <SelectorCustomer width="260px" onSelect={handleChangeCustomer} outputFormat="id" />
        </Section>
      )}
      {sessionUser.isCustomer && <SelectorCustomer width="260px" onSelect={handleChangeCustomer} outputFormat="id" />}
      {!hasData && <UserFeedback variant={feedback?.variant} message={feedback?.message} width="1500px" />}
      {hasData && (
        <Section className="im-purchased-property-table" maxWidth="1500px">
          <ControlledTable columns={headers} data={purchasedProperties} />
        </Section>
      )}
    </StyledPurchasedPropertiesList>
  );
}
