import { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { MessageContainer, Title, Divider, Button, Section, UserFeedback, SelectorCustomer, Portal } from '../../../../../../components';
import { StyledMarketSubscriptions, StyledSubmitCountiesSubscriptions } from './MarketSubscriptions.styled';
import { userQueries } from '../../../../../../../apis/queries';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import Constants from '../../../../../../../utils/constants/Constants';
import AddMarkets from './components/add-markets/AddMarkets';
import { formatCustomer } from './functions';
import { UserObjectWithMappedSubs } from '../../../../../../../apis/queries/user/types';
import Subscriptions from './components/subscriptions/Subscriptions';
import { useCurrentRoute } from '../../../../../../../router/useCurrentRoute';
import SubscriptionsFilters from './components/subscriptions-filters/SubscriptionsFilters';
import { SubscriptionsFiltersRef } from './components/subscriptions-filters/SubscriptionsFilter.types';
import { SubscriptionPayload } from '../../../../../../../apis/services/user-services/User.services.types';
import useMarketSubscriptionsPermissions from './MarketSubscriptions.permissions';
import { Alert } from '../../../../../../../utils/helpers';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';

const { GOLD_TIER, PLATINUM_TIER } = Constants.TIERS;

const { useCustomerProfileMutation, useListCustomersQuery, useGetCustomerQuery } = userQueries;

export default function MarketSubscriptions() {
  const [selectedCustomerUsername, setSelectedCustomerUsername] = useState('');
  const { customerListIsLoading } = useListCustomersQuery();
  const { customer, customerIsLoading } = useGetCustomerQuery(selectedCustomerUsername);
  const [customerCurrentState, setCustomerCurrentState] = useState(customer as UserObjectWithMappedSubs);
  const { mutate: updateCustomerSubscriptions } = useCustomerProfileMutation();
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.MarketSubscriptions');
  const { sessionUser } = useContext(UserSessionContext);
  const { getRouteSearch } = useCurrentRoute();
  const [filteredCounty, setFilteredCounty] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [markedActiveFilter, setMarkedActiveFilter] = useState([true, false]);
  const [markedTiersFilter, setMarkedTiersFilter] = useState([GOLD_TIER.name, PLATINUM_TIER.name]);
  const permit = useMarketSubscriptionsPermissions();

  const paramUser = getRouteSearch()?.userId;

  const filteredCustomer = {
    ...customerCurrentState,
    subscriptions: customerCurrentState?.subscriptions?.filter(
      (sub) =>
        sub.county.toLowerCase().includes(filteredCounty) &&
        markedTiersFilter.includes(sub.subscriptionTypeName) &&
        markedActiveFilter.includes(sub.active)
    ),
  };

  const isFiltered = !!filteredCounty || markedTiersFilter.length < 2 || markedActiveFilter.length < 2;

  const subscriptions = useMemo(() => formatCustomer(filteredCustomer as UserObjectWithMappedSubs).subscriptionsData, [filteredCustomer]);

  const hasChanges = useMemo(() => {
    const subs = Object.values(subscriptions?.byState ?? {}).flat();

    for (let i = 0; i < subs.length; i++) {
      const currentSub = subs[Number(i)];
      const changeActive = currentSub.initialActive !== currentSub.active;
      const changeTier = currentSub.initialSubscriptionTypeDisplayName !== currentSub.subscriptionTypeDisplayName;

      if (currentSub.subscribe || currentSub.unsubscribe || changeActive || changeTier) {
        return true;
      }
    }

    return false;
  }, [subscriptions]);

  const handleSubmit = async () => {
    const mappedSubscription = Object.values(subscriptions.byState ?? {})
      .flat()
      .reduce((acc, current) => {
        if (current.subscribe || !current.unsubscribe) {
          const subscriptionPayload = {
            active: current.active,
            county: current.county,
            state: current.state,
            subscriptionTypeName: current.subscriptionTypeName,
          };

          acc.push(subscriptionPayload);
        }

        return acc;
      }, [] as SubscriptionPayload[]);

    setIsSubmitting(true);
    const payload = {
      ...customerCurrentState,
      subscriptions: mappedSubscription,
    };

    updateCustomerSubscriptions({
      payload,
      onSuccess: () => Alert.info(t(path('SuccessfullyUpdate'))),
      onComplete: () => {
        setIsSubmitting(false);
      },
    });
  };

  const subscriptionsFiltersRef = useRef<SubscriptionsFiltersRef>(null);

  const resetFilters = () => {
    subscriptionsFiltersRef.current?.resetFilters();
  };

  useLayoutEffect(() => {
    setCustomerCurrentState(customer as UserObjectWithMappedSubs);
  }, [customer, customerIsLoading]);

  const feedback = useMemo(() => {
    if (customerIsLoading || customerListIsLoading) {
      return { variant: 'loading' as const };
    }
    if (!selectedCustomerUsername && !sessionUser.isCustomer) {
      return { variant: 'warning' as const, message: t(path('SelectMessage')) };
    }

    if (!customerCurrentState?.subscriptions?.length && selectedCustomerUsername) {
      return { variant: 'error' as const, message: t(path('NoData')) };
    }
    if (!subscriptions?.countiesNames?.length && selectedCustomerUsername) {
      return { variant: 'error' as const, message: t(path('NoFilterMatch')) };
    }
  }, [customerIsLoading, sessionUser, selectedCustomerUsername, subscriptions, customerListIsLoading]);

  const footerButtons = (
    <StyledSubmitCountiesSubscriptions className="im-customer-subscriptions-submit">
      <Section width="100%">
        {hasChanges && (
          <Button
            text={t('Common.Submit')}
            icon="checklist"
            onClick={() => handleSubmit()}
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        )}
        {isFiltered && <Button text={t(path('ResetFilter'))} styling="outlined" icon="retry" onClick={() => resetFilters()} />}
      </Section>
    </StyledSubmitCountiesSubscriptions>
  );

  const searchedAndHasData = !!subscriptions?.countiesNames?.length && !!selectedCustomerUsername;

  return (
    <StyledMarketSubscriptions className="im-counties-subscriptions">
      <Section
        icon="user"
        sectionTitle={t(path('CustomerSelection'))}
        contentClassName="im-customer-subscriptions-header-content"
        className="im-customer-subscriptions-header"
      >
        <SelectorCustomer
          showError={false}
          outputFormat="username"
          initCustomersIds={[Number(paramUser)]}
          onSelect={(value) => setSelectedCustomerUsername(value[0])}
        />

        {!!selectedCustomerUsername && <MessageContainer text={t(path('Info'))} fontSize="medium" width="fit-content" variant="info" />}
      </Section>
      <div className="im-customer-subscriptions-content">
        {!!selectedCustomerUsername && (
          <>
            <AddMarkets
              subscriptions={subscriptions}
              customerId={customerCurrentState.id}
              setCustomerCurrentState={setCustomerCurrentState}
            />
            <Divider margin="0" />
            <Title text={t(path('Subscriptions'))} icon="checklist" />
            <SubscriptionsFilters
              setFilteredCounty={setFilteredCounty}
              setMarkedTiersFilter={setMarkedTiersFilter}
              markedTiersFilter={markedTiersFilter}
              setMarkedActiveFilter={setMarkedActiveFilter}
              ref={subscriptionsFiltersRef}
            />
          </>
        )}
        {searchedAndHasData && (
          <div className="im-customer-subscriptions">
            <Subscriptions subscriptions={subscriptions} setCustomerCurrentState={setCustomerCurrentState} />
          </div>
        )}
        {!searchedAndHasData && <UserFeedback variant={feedback?.variant} message={feedback?.message} />}
        {(hasChanges || isFiltered) && permit.updateSubscriptions && (
          <Portal element={footerButtons} targetId="im-dashboard-content-buttons" />
        )}
      </div>
    </StyledMarketSubscriptions>
  );
}
