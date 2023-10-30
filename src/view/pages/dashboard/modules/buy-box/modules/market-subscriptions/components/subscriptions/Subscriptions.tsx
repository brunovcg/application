import { useTranslation } from 'react-i18next';
import { MappedUserSubscription } from '../../../../../../../../../apis/queries/user/types';
import { SubscriptionsProps } from './Subscriptions.types';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { Button, Container, Section, Selector, Switch } from '../../../../../../../../components';
import Constants from '../../../../../../../../../utils/constants/Constants';
import StyledSubscriptions from './Subscriptions.styled';
import { countyLineClasses, isChangedActive, isChangedTier } from '../../functions';

const { GOLD_TIER, PLATINUM_TIER } = Constants.TIERS;

export default function Subscriptions({ subscriptions, setCustomerCurrentState }: SubscriptionsProps) {
  const subscriptionsByState = subscriptions?.byState ?? {};
  const states = Object.keys(subscriptionsByState ?? {}).sort();

  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.MarketSubscriptions');

  const MARKET = t(path('Market'));
  const ACTIONS = t(path('Actions'));
  const SUBSCRIPTION_TYPE = t(path('SubscriptionType'));
  const ACTIVE = t('Common.Active');

  const tierOptions = [GOLD_TIER.display, PLATINUM_TIER.display];

  const subscriptionsTypes = { [GOLD_TIER.display]: GOLD_TIER.name, [PLATINUM_TIER.display]: PLATINUM_TIER.name };

  const handleChangeTier = (value: (typeof tierOptions)[number], sub: MappedUserSubscription) => {
    setCustomerCurrentState((currentState) => {
      const countyIndex = currentState.subscriptions.findIndex((item) => item.id === sub.id);
      const newState = { ...currentState };
      newState.subscriptions[Number(countyIndex)] = {
        ...newState.subscriptions[Number(countyIndex)],
        subscriptionTypeDisplayName: value,
        subscriptionTypeName: subscriptionsTypes[value as keyof typeof subscriptionsTypes],
      };
      return newState;
    });
  };

  const handleChangeActive = (value: boolean, sub: MappedUserSubscription) => {
    setCustomerCurrentState((currentState) => {
      const countyIndex = currentState.subscriptions.findIndex((item) => item.id === sub.id);
      const newState = { ...currentState };
      newState.subscriptions[Number(countyIndex)] = {
        ...newState.subscriptions[Number(countyIndex)],
        active: value,
      };
      return newState;
    });
  };

  const handleDeleteSub = (subId: number, unsubscribe: boolean) => {
    setCustomerCurrentState((currentState) => {
      const countyIndex = currentState.subscriptions.findIndex((item) => item.id === subId);
      const newState = { ...currentState };
      newState.subscriptions[Number(countyIndex)] = {
        ...newState.subscriptions[Number(countyIndex)],
        unsubscribe,
      };
      return newState;
    });
  };

  const handleCancelSubscription = (sub: MappedUserSubscription) => {
    setCustomerCurrentState((currentState) => {
      const newState = { ...currentState };
      newState.subscriptions = newState.subscriptions.filter((item) => item.id !== sub.id);
      return newState;
    });
  };

  const countyNameRenderer = (sub: MappedUserSubscription) => {
    if (sub.unsubscribe) {
      return (
        <span>
          {sub.county} <span className="im-unsubscribe">{` (${t(path('Unsubscribe'))})`}</span>
        </span>
      );
    }

    if (sub.subscribe) {
      return (
        <span>
          {sub.county} <span className="im-subscribe">{t(path('Subscribe'))} </span>
        </span>
      );
    }

    return <span>{sub.county}</span>;
  };

  return (
    <StyledSubscriptions className="im-subscriptions">
      {states.map((state) => (
        <Section key={state} contentClassName="im-subscription-state">
          <p className="im-subscription-state-name">{state}</p>
          <div className="im-subscription-counties-list">
            <div className="im-subscription-titles">
              <div className="im-subscription-left-panel">
                <p className="im-subscription-title im-county-title">{MARKET}</p>
              </div>
              <div className="im-subscription-right-panel">
                <p className="im-subscription-title im-tier-title">{SUBSCRIPTION_TYPE}</p>
                <p className="im-subscription-title im-active-title">{ACTIVE}</p>
                <p className="im-subscription-title im-actions-title">{ACTIONS}</p>
              </div>
            </div>
            {subscriptionsByState?.[state as keyof typeof subscriptionsByState]?.map((sub) => (
              <div key={sub.id} className={countyLineClasses(sub)}>
                <div className="im-subscription-left-panel">
                  <p className="im-subscription-county-name">{countyNameRenderer(sub)}</p>
                </div>
                <div className="im-subscription-right-panel">
                  <div className="im-subscription-county-tier">
                    <Selector
                      onSelect={(value) => handleChangeTier(value[0] as (typeof tierOptions)[number], sub)}
                      width="150px"
                      disabled={sub.unsubscribe}
                      valid={isChangedTier(sub)}
                      allowSearch={false}
                      allowClear={false}
                      showError={false}
                      label={isChangedTier(sub) ? t(path('Modified')) : ''}
                      options={tierOptions}
                      initValue={[sub.subscriptionTypeDisplayName]}
                      displayColor={{
                        [GOLD_TIER.display]: 'warning',
                        [PLATINUM_TIER.display]: 'medium',
                      }}
                    />
                  </div>
                  <Container
                    className="im-subscription-county-active"
                    noBorder={!isChangedActive(sub)}
                    valid={isChangedActive(sub)}
                    label={isChangedActive(sub) ? t(path('Modified')) : ''}
                    variant="transparent"
                  >
                    <Switch
                      onChange={(value) => handleChangeActive(value === 'active', sub)}
                      disabled={sub.unsubscribe}
                      hideLabel
                      starts={sub.active ? 'active' : 'inactive'}
                      leftOption="inactive"
                      rightOption="active"
                      modeOnOff
                    />
                  </Container>
                  <div className="im-subscription-county-actions">
                    {sub.initialActive}
                    {sub.active}
                    {!sub.unsubscribe && !sub.subscribe && (
                      <Button
                        text={t(path('Unsubscribe'))}
                        icon="delete"
                        onClick={() => handleDeleteSub(sub.id, true)}
                        small
                        styling="outlined"
                        variant="error"
                      />
                    )}
                    {sub.unsubscribe && (
                      <Button
                        text={t(path('Revert'))}
                        icon="undo"
                        styling="outlined"
                        variant="valid"
                        onClick={() => handleDeleteSub(sub.id, false)}
                        small
                      />
                    )}
                    {sub.subscribe && (
                      <Button
                        text={t(path('CancelSubscription'))}
                        icon="undo"
                        styling="outlined"
                        variant="error"
                        onClick={() => handleCancelSubscription(sub)}
                        small
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </StyledSubscriptions>
  );
}
