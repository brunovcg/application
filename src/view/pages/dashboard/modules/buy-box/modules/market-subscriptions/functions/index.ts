import { ClassNameHelper } from '../../../../../../../../utils/helpers';
import { MappedUserSubscription, SubscriptionsData, UserObjectWithMappedSubs } from '../../../../../../../../apis/queries/user/types';

export const formatCustomer = (customer: UserObjectWithMappedSubs) => ({
  ...customer,
  subscriptionsData: customer?.subscriptions?.reduce(
    (acc, current, index) => {
      const mappedCurrent = {
        ...current,
        subscribe: customer.subscriptions[Number(index)].subscribe ?? false,
        unsubscribe: customer.subscriptions[Number(index)].unsubscribe ?? false,
      };

      if (!acc.byState[current.state]) {
        acc.byState[current.state] = [mappedCurrent];
      } else {
        acc.byState[current.state].push(mappedCurrent);
      }

      acc.countiesNames.push(`${current.county} - ${current.state}`);

      return acc;
    },
    {
      byState: {},
      countiesNames: [],
    } as unknown as SubscriptionsData
  ),
});

export const isChangedTier = (sub: MappedUserSubscription) =>
  sub.initialSubscriptionTypeDisplayName !== sub.subscriptionTypeDisplayName && !sub.unsubscribe && !sub.subscribe;
export const isChangedActive = (sub: MappedUserSubscription) => sub.active !== sub.initialActive && !sub.unsubscribe && !sub.subscribe;

export const countyLineClasses = (sub: MappedUserSubscription) =>
  ClassNameHelper.conditional({
    ['im-subscription-county']: true,
    ['im-unsubscribe']: sub.unsubscribe,
    ['im-subscribe']: sub.subscribe,
  });
