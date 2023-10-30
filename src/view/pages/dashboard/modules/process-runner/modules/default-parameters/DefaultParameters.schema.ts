import { object, number } from 'yup';

export const defaultParametersSchema = object().shape({
  postCardAvatar: number(),
  postCardCount: number(),
  postCardMotivationPoint: number(),
  postCardNumberMonths: number(),
  skipTraceAvatar: number(),
  skipTraceCount: number(),
  skipTraceExpiryDays: number(),
  skipTraceMotivationPoint: number(),
  skipTraceNotFound: number(),
});
