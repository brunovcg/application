import { useTranslation } from 'react-i18next';
import { ServerControlledTable, UserFeedback } from '../../../../../../../components';
import useDataMinerQAColumns from '../hooks/data-miner-qa-columns/useDataMinerQAColumns';
import { useTranslationPath } from '../../../../../../../../utils/hooks';
import { useContext, useMemo } from 'react';
import { addressQueries } from '../../../../../../../../apis/queries';
import { DateTimeHelper } from '../../../../../../../../utils/helpers';
import { USState } from '../../../../../../../../apis/services/states-services/States.services.types';
import { DataMinerQAContext } from '../DataMinerQA';
import { AddressMotivationSubmission } from '../../../../../../../../apis/services/address-services/Address.services.types';

const { useListAddressMinerSubmissionsQuery } = addressQueries;
const { toStartOfDay, toEndOfTheDay } = DateTimeHelper;

export default function DataMinerQAQueryMiner() {
  const { dates, selectedDataMiner, selectedCounty, selectedUSState, addAssessed, hideAssessed, assessed } = useContext(DataMinerQAContext);
  const { controller, minerSubmissions } = useListAddressMinerSubmissionsQuery({
    userId: selectedDataMiner,
    fromDate: toStartOfDay(dates[0]).toISOString(),
    toDate: toEndOfTheDay(dates[1]).toISOString(),
    county: selectedCounty,
    state: selectedUSState as USState,
  });

  const assessedIds = assessed.ids;

  const columns = useDataMinerQAColumns({ addAssessed, instance: 'query' });

  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.QualityAssurance.DataMinerQA.DataMinerQAQueryMiner');
  const filteredSubmissions = useMemo(() => {
    if (!selectedDataMiner) {
      return [];
    }
    return hideAssessed ? minerSubmissions?.filter((item) => !assessedIds.includes(item.id)) : minerSubmissions;
  }, [hideAssessed, minerSubmissions, assessedIds, selectedDataMiner]);

  if (!selectedDataMiner) {
    return <UserFeedback message={t(path('SelectDataMiner'))} variant="warning" />;
  }

  return (
    <ServerControlledTable
      tableWidth="100%"
      columns={columns}
      data={filteredSubmissions as AddressMotivationSubmission[]}
      controller={controller}
      paginate={[10, 20, 50, 100, 200]}
      noData={t(path('NoData'))}
      showCleanFilters={false}
    />
  );
}
