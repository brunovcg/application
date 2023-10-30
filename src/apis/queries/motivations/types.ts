import { MotivationAlias, MotivationGroup, MotivationSource } from '../../services/motivation-services/Motivation.services.types';

export type MappedMotivation = {
  mappedName: string | number | undefined;
  id: number;
  name: string;
  expirationMonths: number;
  definition: string;
  value: number;
  motivationGroup: MotivationGroup;
  mailingStatement: string;
  createdDate: string;
  modifiedDate: string;
  motivationAliasList: MotivationAlias[];
};

export type MappedMotivationGroupData = {
  original: { [key: string]: MotivationGroup };
  list: string[];
};

export type MappedMotivationSource = MotivationSource & { mappedName: string | undefined | number };
