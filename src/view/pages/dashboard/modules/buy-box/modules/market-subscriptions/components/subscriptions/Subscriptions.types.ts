import { Dispatch, SetStateAction } from 'react';
import { SubscriptionsData, UserObjectWithMappedSubs } from '../../../../../../../../../apis/queries/user/types';

export type SubscriptionsProps = {
  subscriptions: SubscriptionsData;
  setCustomerCurrentState: Dispatch<SetStateAction<UserObjectWithMappedSubs>>;
};
