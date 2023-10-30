// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { ChangeEvent, useEffect, useState } from 'react';
import { SortBy } from '../ServerControlledTable.types';
import Constants from '../../../../../../../utils/constants/Constants';
import HttpHelper from '../../../../../../../utils/http/Http.helper';
import { ServerTableController, UseServerTableControllerProps } from './useServerTableController.types';
import { DataHelper } from '../../../../../../../utils/helpers';

const { stringifyObjectValues } = DataHelper;

const calculatePageCount = <Content,>({ size, count, result }: { size: string; count: string; result?: Content[] }) =>
  !result?.length || Number(size) === 0 ? 1 : Math.ceil(Number(count) / Number(size));

const { ALL_TABLE_SIZE } = Constants.COMPONENTS.table;

const decodeSortBy = (value: string) => {
  if (!value) {
    return [];
  }

  const formattedValue = value?.split(':');
  const isDesc = formattedValue[1] !== 'asc';
  return [{ id: formattedValue[0], desc: isDesc }];
};

const setSortByString = (values: { id: string | number; desc: boolean }[]) =>
  values?.map((value) => `${value.id}:${value.desc ? 'desc' : 'asc'}`) ?? [];

export default function useServerTableController<Content>({
  result,
  size,
  count,
  loading,
  initialParamsRegister,
  customParams,
  totalPages,
}: UseServerTableControllerProps<Content>) {
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState<SortBy>(decodeSortBy(initialParamsRegister.sort) as SortBy);
  const [params, setParams] = useState(initialParamsRegister);

  const stringifiedParams = HttpHelper.setParamsString(params);

  const handleParams = (parameters: Record<string, string | (number | string)[]>) => {
    const entries = Object.entries(parameters);

    const updatedParams = {} as Record<string, string>;

    const formatValue = (value: number | string | (string | number)[]) => {
      if (Array.isArray(value)) {
        return value.join(',');
      }
      if (typeof value === 'number') {
        return String(value);
      }
      return value;
    };

    entries.forEach(([key, value]) => {
      updatedParams[key as keyof typeof updatedParams] = formatValue(value);
    });

    return setParams((state) => ({ ...state, ...updatedParams }));
  };

  const clearAllFilters = (callback?: () => void) => {
    setParams(initialParamsRegister);
    setCurrentPage(1);
    callback?.();
  };

  const hasFilteredValues = !loading && stringifiedParams !== HttpHelper.setParamsString(initialParamsRegister);

  const pageCount = calculatePageCount({ result, size, count });

  const canNextPage = currentPage < pageCount;
  const canPreviousPage = currentPage > 1;

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleParams({ size: e.target.value });
    setCurrentPage(1);
  };

  const handleSorting = (value: SortBy) => {
    setSortBy(value);
    handleParams({ sort: setSortByString(value) });
  };

  const nextPage = () => {
    setCurrentPage((state) => state + 1);
    handleParams({
      page: String(Number(params.page) + 1),
    });
  };
  const previousPage = () => {
    setCurrentPage((state) => state - 1);
    handleParams({ page: String(Number(params.page) - 1) });
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
    handleParams({ page: '0' });
  };
  const goToLastPage = () => {
    setCurrentPage(pageCount);
    handleParams({ page: String(totalPages ? totalPages - 1 : 0) });
  };

  useEffect(() => {
    const formattedParamRegister = { ...params };

    if (params.size === ALL_TABLE_SIZE) {
      formattedParamRegister.size = '0';
    }

    setParams((state) => ({ ...state, ...formattedParamRegister }));
  }, [params.size]);

  useEffect(() => {
    setCurrentPage(1);
    setParams((state) => ({ ...state, ...stringifyObjectValues(customParams), page: '0' }));
  }, [HttpHelper.setParamsString(customParams)]);

  useEffect(() => {
    const updates = {} as Record<string, string>;
    const keys = Object.keys(customParams);

    keys.forEach((key) => {
      if (customParams[`${key}`] !== params[`${key}`]) {
        const value = customParams[`${key}`];
        updates[`${key}`] = value ? String(value) : '';
      }
    });

    setParams((state) => ({ ...state, ...updates }));
  }, [HttpHelper.setParamsString(customParams)]);

  const controller: ServerTableController = {
    hasFilteredValues,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    handleLimitChange,
    clearAllFilters,
    currentPage,
    goToFirstPage,
    goToLastPage,
    limit: params.size,
    handleParams,
    manualSortBy: sortBy,
    handleSorting,
    initialSorting: decodeSortBy(initialParamsRegister.sort),
    loading,
  };

  return { controller, params };
}
