import { Dispatch, SetStateAction } from 'react';
import { SubscriptionsData, UserObjectWithMappedSubs } from '../../../../../../../../../apis/queries/user/types';

export type AddMarketProps = {
  customerId: number;
  subscriptions: SubscriptionsData;
  setCustomerCurrentState: Dispatch<SetStateAction<UserObjectWithMappedSubs>>;
};
