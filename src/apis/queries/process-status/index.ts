import { useQuery } from 'react-query';
import ProcessStatusService from '../../services/process-status-services/ProcessStatus.services';
import useServerTableController from '../../../view/components/modules/table/high-order-components/server-controlled-table/server-table-controller/useServerTableController';
import Constants from '../../../utils/constants/Constants';
import { UseListProcessStatusArgs, UseListProcessStatusParams } from './types';
import ProcessStatusQueriesHelper from './helper';
import { useEffect, useMemo, useState } from 'react';
import { TaskProcess } from '../../services/process-status-services/ProcessStatus.services.types';
import { DataHelper } from '../../../utils/helpers';

const { LIST_PROCESS_STATUS } = Constants.QUERIES;
const { initialParams } = ProcessStatusQueriesHelper;

const useListProcessStatus = (args: UseListProcessStatusArgs) => {
  const [payload, setPayload] = useState(
    ProcessStatusQueriesHelper.mapPayload({
      ...args.filters,
      sort: initialParams.sort,
      page: Number(initialParams.page),
      size: Number(initialParams.size),
    })
  );
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const { data, isLoading, isRefetching, refetch } = useQuery(
    LIST_PROCESS_STATUS,
    () => ProcessStatusService.list({ payload, onError: () => {}, onComplete: () => setTriggerRefetch(false) }),
    {
      enabled: triggerRefetch,
      retry: false,
    }
  );

  const { totalPages, pageable, totalElements } = data ?? {};
  const { pageSize } = pageable ?? {};

  const { controller, params } = useServerTableController<TaskProcess>({
    result: data?.content,
    size: String(pageSize),
    count: String(totalElements),
    initialParamsRegister: ProcessStatusQueriesHelper.initialParams,
    loading: isLoading || isRefetching,
    customParams: args.filters,
    totalPages: totalPages,
  });

  const appliedFilters = useMemo(() => {
    const filters = { ...params };
    Reflect.deleteProperty(filters, 'sort');
    Reflect.deleteProperty(filters, 'page');
    Reflect.deleteProperty(filters, 'size');
    return filters;
  }, [data]);

  useEffect(() => {
    if (triggerRefetch) {
      refetch();
    }
  }, [triggerRefetch]);

  useEffect(() => {
    setPayload(ProcessStatusQueriesHelper.mapPayload(params as unknown as UseListProcessStatusParams));
    if (
      !ProcessStatusQueriesHelper.isEmptyFilters(params as unknown as UseListProcessStatusParams) &&
      DataHelper.areObjectsDeepEqual(appliedFilters, args.filters)
    ) {
      setTriggerRefetch(true);
    }
  }, [params]);

  const fetchProcessStatus = () => setTriggerRefetch(true);

  return { data: data?.content, controller, setTriggerRefetch, fetchProcessStatus, appliedFilters, loading: isLoading || isRefetching };
};

export default { useListProcessStatus };
