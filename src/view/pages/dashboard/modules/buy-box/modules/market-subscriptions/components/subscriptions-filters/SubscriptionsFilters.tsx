import { useTranslation } from 'react-i18next';
import { CheckboxGroup, Section, InputText } from '../../../../../../../../components';
import StyledFilterSubscriptions from './SubscriptionsFilters.styled';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { SubscriptionsFiltersProps, SubscriptionsFiltersRef } from './SubscriptionsFilter.types';
import { InputTextRef } from '../../../../../../../../components/modules/form-group/input-text/InputText.types';
import { CheckboxGroupRef } from '../../../../../../../../components/modules/form-group/checkbox-group/CheckboxGroup.types';
import { ForwardedRef, forwardRef, useRef, useImperativeHandle } from 'react';
import Constants from '../../../../../../../../../utils/constants/Constants';

const { GOLD_TIER, PLATINUM_TIER } = Constants.TIERS;

function SubscriptionsFilters(
  { setFilteredCounty, setMarkedTiersFilter, markedTiersFilter, setMarkedActiveFilter }: SubscriptionsFiltersProps,
  ref: ForwardedRef<SubscriptionsFiltersRef>
) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.MarketSubscriptions');

  const countyFilterRef = useRef<InputTextRef>(null);
  const tierFilterRef = useRef<CheckboxGroupRef>(null);
  const activeFilterRef = useRef<CheckboxGroupRef>(null);

  const resetFilters = () => {
    countyFilterRef.current?.clearInputValue();
    tierFilterRef.current?.resetCheckboxes();
    activeFilterRef.current?.resetCheckboxes();
  };

  useImperativeHandle(ref, () => ({ resetFilters }));

  return (
    <StyledFilterSubscriptions className="im-subscriptions-filters">
      <Section contentClassName="im-subscriptions-filters-content" sectionTitle={t('Common.Filters')} icon="filter">
        <InputText
          onChange={(value) => setFilteredCounty(value.toLowerCase())}
          debounce={300}
          width="250px"
          label={t(path('Market'))}
          ref={countyFilterRef}
        />
        <CheckboxGroup
          ref={tierFilterRef}
          label={t(path('Tiers'))}
          onChange={(options) => {
            setMarkedTiersFilter(options.map((opt) => opt.id) as typeof markedTiersFilter);
          }}
          options={[
            {
              id: GOLD_TIER.name,
              label: GOLD_TIER.display,
              checked: true,
            },
            {
              id: PLATINUM_TIER.name,
              label: PLATINUM_TIER.display,
              checked: true,
            },
          ]}
          row
        />
        <CheckboxGroup
          ref={activeFilterRef}
          label={t(path('ActiveStatus'))}
          onChange={(options) => {
            setMarkedActiveFilter(options.map((opt) => opt.id as boolean));
          }}
          options={[
            { id: true, label: t('Common.Active'), checked: true },
            { id: false, label: t('Common.Inactive'), checked: true },
          ]}
          row
        />
      </Section>
    </StyledFilterSubscriptions>
  );
}

export default forwardRef(SubscriptionsFilters);
