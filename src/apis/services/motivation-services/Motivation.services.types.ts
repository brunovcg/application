export type MotivationAlias = {
  alias: string;
  createdDate: string;
  id: number | null;
  modifiedDate: string;
};

export type MotivationGroup = { createdDate: string; id: 1; modifiedDate: string; name: string };

export type Motivation = {
  createdDate: string;
  definition: string;
  expirationMonths: number;
  id: number;
  mailingStatement: string | null;
  modifiedDate: string;
  motivationAliasList: MotivationAlias[];
  motivationGroup: MotivationGroup;
  name: string;
  value: number;
};

export type MotivationSource = {
  id: number;
  name: string;
  displayName: string;
  description: string;
  disabledDate: string;
  createdDate: string;
  modifiedDate: string;
};

export type MotivationSourcesResponse = MotivationSource[];

export type MappedMotivationSources = (MotivationSourcesResponse & { mappedName: string })[];

export type MotivationListResponse = {
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
}[];

export type DrivingForDollarsResponse = {
  createdDate: string;
  definition: string;
  expirationMonths: number;
  id: number;
  mailingStatement: string;
  modifiedDate: string;
  motivationAliasList: MotivationAlias[];
  motivationGroup: MotivationGroup;
  name: string;
  value: number;
};

export type ListMotivationSourcesArgs = {
  showDisabled: boolean;
};

export type MotivationSourceGroup = {
  createdDate: string;
  description: string | null;
  disabledDate: string | null;
  displayName: string;
  id: number;
  modifiedDate: string | null;
  motivationSources: MotivationSource[];
  name: string;
};

export type MotivationSourceGroupsResponse = MotivationSourceGroup[];

export type MotivationGroups = {
  createdDate: string;
  id: number;
  modifiedDate: string;
  motivationList: {
    createdDate: string;
    definition: string;
    expirationMonths: number;
    id: number;
    mailingStatement: string;
    modifiedDate: string;
    motivationAliasList: MotivationAlias[];
  }[];
  name: string;
};

export type UpdateMotivationArgs = {
  motivationId: number;
  payload: Motivation;
  onSuccess: () => void;
};

export type AddMotivationArgs = {
  payload: Motivation;
};

export type ToggleMotivationSourceStatusArgs = { motivationSourceId: number; currentEnabled: boolean; onSuccess: () => void };

export type ToggleMotivationSourceGroupStatusArgs = { motivationSourceGroupId: number; currentEnabled: boolean; onSuccess: () => void };

export type UpdateSourceArgs = {
  payload: MotivationSource;
  params: {
    sourceId: number;
  };

  onSuccess: () => void;
};

export type UpdateSourceGroupPayload = Partial<Omit<MotivationSourceGroup, 'motivationSources'>>;

export type UpdateSourceGroupArgs = {
  payload: Partial<UpdateSourceGroupPayload>;
  params: {
    sourceGroupId: number;
  };

  onSuccess: () => void;
};

export type UpdateSourceGroupSourcesArgs = {
  payload: MotivationSource[];
  params: {
    sourceGroupId: number;
  };

  onSuccess: () => void;
};
