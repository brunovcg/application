export type IMParameters = {
  id: number;
  postCardCount: number;
  skipTraceCount: number;
  skipTraceExpiryDays: number;
  postCardAvatar: number;
  postCardMotivationPoint: number;
  postCardNumberMonths: number;
  skipTraceNotFound: number;
  skipTraceAvatar: number;
  skipTraceMotivationPoint: number;
  createdDate: null | string;
  modifiedDate: null | string;
};

export type IMParametersWithID = IMParameters & { id: number };

export type OptionalIMParameters = Partial<IMParameters>;

export type UpdateParametersArgs = { params: { id: number }; payload: OptionalIMParameters; onSuccess: () => void; onError: () => void };
