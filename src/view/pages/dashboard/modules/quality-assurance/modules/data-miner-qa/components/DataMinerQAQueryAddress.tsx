import { useContext, useEffect, useLayoutEffect, useMemo } from 'react';
import { DateTimeHelper } from '../../../../../../../../utils/helpers';
import { addressQueries } from '../../../../../../../../apis/queries';
import { DataMinerQAContext } from '../DataMinerQA';
import { ServerControlledTable, UserFeedback } from '../../../../../../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../utils/hooks';
import useDataMinerQAColumns from '../hooks/data-miner-qa-columns/useDataMinerQAColumns';
import { mapAddressSubmissions } from '../../../../../../../../apis/queries/address/functions';

const { useListMinerSubmissionsByAddressQuery } = addressQueries;
const { toStartOfDay, toEndOfTheDay } = DateTimeHelper;

export default function DataMinerQAQueryAddress() {
  const {
    typedSearch,
    dates,
    selectedCounty,
    selectedUSState,
    filterCriteria,
    setAddressAutoCompleteIsLoading,
    addAssessed,
    setAddressAutocompleteOptions,
    selectedAutocompleteAddress,
  } = useContext(DataMinerQAContext);

  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.QualityAssurance.DataMinerQA.DataMinerQAQueryAddress');

  const { mappedMinerSubmissionAddresses, addressesSubmissionsLoading, controller } = useListMinerSubmissionsByAddressQuery({
    search: typedSearch,
    fromDate: toStartOfDay(dates[0]).toISOString(),
    toDate: toEndOfTheDay(dates[1]).toISOString(),
    county: selectedCounty,
    state: selectedUSState,
    criteria: filterCriteria as Exclude<typeof filterCriteria, 'data-miner'>,
  });

  const columns = useDataMinerQAColumns({ addAssessed, instance: 'query' });

  useLayoutEffect(() => {
    setAddressAutoCompleteIsLoading(addressesSubmissionsLoading);
  }, [addressesSubmissionsLoading]);

  const autocompleteOption = mappedMinerSubmissionAddresses?.addressesDisplay;

  const data = useMemo(
    () => mapAddressSubmissions(mappedMinerSubmissionAddresses?.addressesList[`${selectedAutocompleteAddress}`]),
    [mappedMinerSubmissionAddresses, selectedAutocompleteAddress]
  );

  useEffect(() => {
    if (autocompleteOption?.length) {
      setAddressAutocompleteOptions(autocompleteOption);
    }
  }, [autocompleteOption?.length]);

  if (!selectedUSState) {
    return <UserFeedback message={t(path('SelectState'))} variant="warning" />;
  }

  if (!selectedCounty) {
    return <UserFeedback message={t(path('SelectMarket'))} variant="warning" />;
  }

  if (!selectedAutocompleteAddress) {
    const types = {
      ['tax-id']: t(path('Search.TaxId')),
      ['address-id']: t(path('Search.PropertyId')),
      ['property-address']: t(path('Search.PropertyAddress')),
    };

    return <UserFeedback message={types[filterCriteria as Exclude<typeof filterCriteria, 'data-miner'>]} variant="warning" />;
  }

  return (
    <ServerControlledTable
      tableWidth="100%"
      columns={columns}
      data={data}
      controller={controller}
      paginate={[10, 25, 50, 100]}
      noData={t(path('NoData'))}
      showCleanFilters={false}
    />
  );
}
