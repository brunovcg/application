import { Controller } from '../ServerControlledTable.types';

export type UseServerTableControllerProps<Content> = {
  count: string;
  size: string;
  result?: Array<Content>;
  loading: boolean;
  totalPages?: number;
  initialParamsRegister: {
    [key: string]: string;
  };
  customParams: Record<string, string | number | null | undefined>;
};

export type ServerTableController = Controller & {
  hasFilteredValues: boolean;
  clearAllFilters: (callback?: () => void) => void;
  loading: boolean;
};
