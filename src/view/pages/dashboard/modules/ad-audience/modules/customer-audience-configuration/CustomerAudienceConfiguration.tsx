import { useContext, useState } from 'react';
import { Button, Grid, Section, SelectorCustomer, UserFeedback } from '../../../../../../components';
import StyledCustomerAudienceConfiguration from './CustomerAudienceConfiguration.styled';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { adSenseQueries } from '../../../../../../../apis/queries';
import useCustomerAudienceConfigurationColumns from './hooks/useCustomerAudienceConfigurationColumns';
import useAudienceConfigurationPermissions from './CustomerAudienceConfiguration.permissions';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';

const { useListCustomerAdSenseConfigurationsQuery } = adSenseQueries;

export default function CustomerAudienceConfiguration() {
  const [selectedCustomer, setSelectedCustomer] = useState<null | number>(null);
  const { t } = useTranslation();
  const { openDialog } = useContext(DialogsContext);
  const path = useTranslationPath('Pages.Dashboard.AdAudience.CustomerAudienceConfiguration');
  const permit = useAudienceConfigurationPermissions();
  const { audienceConfigurations, audienceConfigurationsLoading } = useListCustomerAdSenseConfigurationsQuery({
    customerId: selectedCustomer,
  });

  const columns = useCustomerAudienceConfigurationColumns();

  const feedback = () => {
    if (!selectedCustomer && !audienceConfigurations) {
      return { variant: 'warning', message: t(path('NoCustomerSelected')) } as const;
    }

    if (audienceConfigurations?.length === 0) {
      return { variant: 'warning', message: t(path('NoData')) } as const;
    }

    if (audienceConfigurationsLoading) {
      return { variant: 'loading' } as const;
    }

    return null;
  };

  const hasData = audienceConfigurations && !!audienceConfigurations.length;

  return (
    <StyledCustomerAudienceConfiguration className="im-customer-audience-configuration">
      <Section maxWidth="550px" contentClassName="im-customer-audience-configuration-header">
        <SelectorCustomer outputFormat="id" onSelect={(value) => setSelectedCustomer(value[0])} showError={false} />
        {selectedCustomer && permit.add && (
          <Button
            text={t(path('AddConfig'))}
            icon="add"
            onClick={() => openDialog({ id: 'AddAdAudienceConfigurationDialog', props: { customerId: selectedCustomer } })}
          />
        )}
      </Section>
      <Section maxWidth="550px" contentClassName="im-customer-audience-configuration-content">
        {!hasData && <UserFeedback variant={feedback()?.variant} message={feedback()?.message} />}
        {hasData && <Grid rows={audienceConfigurations} columns={columns} rowPK="id" maxWidth="500px" />}
      </Section>
    </StyledCustomerAudienceConfiguration>
  );
}
