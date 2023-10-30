import { Completed, Pending } from '../../../types';

export type GenerateMultiplePostCardsPayload = {
  county: string;
  countyId: number;
  postCardCount: string;
  rankingsInProgress: number;
  skipTrack: boolean;
  username: string;
}[];

export type GenerateMultiplePostCardsArgs = {
  payload: GenerateMultiplePostCardsPayload;
  onSuccess: () => void;
  onError: () => void;
};

export type PostCardsResponse = {
  createdDate: string;
  id: number;
  modifiedDate: string;
  parameter1: unknown;
  parameter2: unknown;
  parameter3: unknown;
  parameter4: unknown;
  parameter5: unknown;
  parameter6: unknown;
  processedRecords: number;
  statusMessage: unknown;
  taskFinishDate: unknown;
  taskName: string;
  taskStatus: Pending | Completed;
  totalRecords: number;
  userId: number;
};

export type GetPostCardsArgs = {
  params: { customerUsername: string; countiesIds: number[]; count: number; bypassABFilter: boolean };
  onSuccess: (res: PostCardsResponse) => void;
  onError: () => void;
};
