import { ListDataMinersResponse } from '../../services/roles-services/Roles.services.types';

export type MappedDataMiners = {
  dataMinersNames: string[];
  dataMinerList: {
    [key: string]: ListDataMinersResponse[number];
  };
};
