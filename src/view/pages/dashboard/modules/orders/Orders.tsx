import { useTranslation } from 'react-i18next';
import { ServicesEndpointsConfigs } from '../../../../../configs';
import StyledOrders from './Orders.styled';
import { useTranslationPath } from '../../../../../utils/hooks';
import { Button, Section } from '../../../../components';

const { shopify } = ServicesEndpointsConfigs;

export default function Orders() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Orders');

  return (
    <StyledOrders className="im-orders">
      <Section contentClassName="im-orders-content">
        <div className="im-orders-message">{t([path('Message')])}</div>
        <Button href={shopify} text={t([path('Shopify')])} variant="valid" icon="order" />
      </Section>
    </StyledOrders>
  );
}
