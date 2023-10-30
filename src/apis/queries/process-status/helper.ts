import { Ascending, Descending } from '../../../types';
import { UseListProcessStatusParams } from './types';
import DataHelper from '../../../utils/helpers/modules/Data.helper';
import { ProcessStatusSortableProperty, TaskProcess } from '../../services/process-status-services/ProcessStatus.services.types';

abstract class ProcessStatusQueriesHelper {
  static initialParams = {
    page: '0',
    size: '10',
    sort: '',
    taskStatus: '',
    taskName: '',
    queue: '',
    userId: '',
    processId: '',
    createDateEnd: '',
    createDateStart: '',
    finishedDateEnd: '',
    finishedDateStart: '',
    customerName: '',
  };

  static mappedSortingProperties: Partial<Record<keyof TaskProcess, ProcessStatusSortableProperty>> = {
    queueOrdinal: 'queue_ordinal',
    createDate: 'created_date',
    modifiedDate: 'modified_date',
    finishedDate: 'task_finish_date',
    queue: 'queue',
    customerName: 'customer_name',
  };

  static mapPayload = (params: UseListProcessStatusParams) => {
    const { page, size, sort, processId, ...filterArgs } = params;

    const sortList = sort ? sort.split(',') : undefined;

    const mappedSortList =
      sortList?.map((item) => {
        const [property, direction] = item.split(':');

        return {
          property: ProcessStatusQueriesHelper.mappedSortingProperties[property as keyof TaskProcess] as ProcessStatusSortableProperty,
          direction: direction.toUpperCase() as Ascending | Descending,
        };
      }) ?? [];

    const processIdConverted = Number(processId) ? { processId: Number(processId) } : {};

    return {
      filter: {
        ...processIdConverted,
        ...DataHelper.removeObjectFalsies(filterArgs),
      },
      pageRequest: {
        page: Number(page || ProcessStatusQueriesHelper.initialParams.page),
        size: Number(size || ProcessStatusQueriesHelper.initialParams.size),
        sorts: mappedSortList,
      },
    };
  };

  static isEmptyFilters(paramsFilter: UseListProcessStatusParams) {
    const paramsFilters = { ...paramsFilter };

    Reflect.deleteProperty(paramsFilters, 'page');
    Reflect.deleteProperty(paramsFilters, 'size');
    Reflect.deleteProperty(paramsFilters, 'sort');

    return Object.values(paramsFilters).filter(Boolean).length === 0;
  }
}

export default ProcessStatusQueriesHelper;
