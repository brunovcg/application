import { useRef, useState } from 'react';
import { Button, RadioGroup, Section, Selector, SelectorUSStates } from '../../../../../../../../components';
import { UserObjectWithMappedSubs } from '../../../../../../../../../apis/queries/user/types';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import Constants from '../../../../../../../../../utils/constants/Constants';
import { countiesQueries } from '../../../../../../../../../apis/queries';
import StyledAddMarkets from './AddMarkets.styled';
import { AddMarketProps } from './AddMarkets.types';
import { USState } from '../../../../../../../../../apis/services/states-services/States.services.types';
import { SelectorRef } from '../../../../../../../../components/modules/form-group/selector/Selector.types';
import { IMMarketHelper } from '../../../../../../../../../utils/helpers';

const { useListCountiesByStatesQuery } = countiesQueries;
const { getCountyName, getStateName } = IMMarketHelper;
const { GOLD_TIER, PLATINUM_TIER } = Constants.TIERS;

const tiersOptions = [
  { label: GOLD_TIER.display, id: 1, checked: true, name: GOLD_TIER.name },
  { label: PLATINUM_TIER.display, id: 2, checked: false, name: PLATINUM_TIER.name },
];

export default function AddMarkets({ subscriptions, setCustomerCurrentState, customerId }: AddMarketProps) {
  const [selectedTier, setSelectedTier] = useState<(typeof tiersOptions)[number]>(tiersOptions[0]);
  const [selectedStates, setSelectedStates] = useState<USState[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.MarketSubscriptions');
  const { statesCountiesIsLoading, statesCountiesNames } = useListCountiesByStatesQuery(selectedStates);
  const marketRef = useRef<SelectorRef>(null);

  const marketsAvailable = statesCountiesNames.filter((county) => !subscriptions?.countiesNames?.includes(county));

  const handleStateChange = (statesValues: USState[]) => {
    const updatedMarkets = selectedMarkets.filter((county) => statesValues.includes(getStateName(county)));

    marketRef.current?.updateValue(updatedMarkets);

    if (!statesValues.length) {
      setSelectedStates(statesValues);
    }
  };
  const statesRef = useRef<SelectorRef>(null);

  const handleAdd = () => {
    const newMarkets = selectedMarkets.map((county) => ({
      id: county,
      state: getStateName(county),
      subscribe: true,
      unsubscribe: false,
      customerId,
      county: getCountyName(county),
      subscriptionTypeName: selectedTier.name,
      subscriptionTypeDisplayName: selectedTier.label,
      initialSubscriptionTypeName: selectedTier.name,
      initialSubscriptionTypeDisplayName: selectedTier.label,
      active: true,
      rankingInProgress: null,
    }));
    statesRef.current?.clearSelector();
    setSelectedMarkets([]);

    setCustomerCurrentState((state) => ({ ...state, subscriptions: [...state.subscriptions, ...newMarkets] } as UserObjectWithMappedSubs));
  };

  return (
    <StyledAddMarkets>
      <Section contentClassName="im-customer-subscriptions-add-market" sectionTitle={t(path('SubscribeMarkets'))} icon="location">
        <SelectorUSStates
          width="250px"
          showError={false}
          multiple
          onSelect={(value) => {
            setSelectedStates(value);
            handleStateChange(value);
          }}
          ref={statesRef}
        />
        <Selector
          options={marketsAvailable ?? []}
          width="250px"
          label={t(path('Markets'))}
          multiple
          loading={statesCountiesIsLoading}
          disabled={!selectedStates.length}
          onSelect={(value) => setSelectedMarkets(value as string[])}
          placeholder={!selectedStates.length ? t(path('SelectAState')) : ''}
          ref={marketRef}
        />
        <RadioGroup
          label={t(path('AddAllAs'))}
          width="fit-content"
          row
          onChange={(value) => setSelectedTier(value as (typeof tiersOptions)[number])}
          options={tiersOptions}
        />

        <Button text={t('Common.Add')} icon="add" onClick={handleAdd} stopPropagation disabled={!selectedMarkets.length} />
      </Section>
    </StyledAddMarkets>
  );
}
