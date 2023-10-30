import { useTranslationPath } from '../../../../../utils/hooks';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../../../layouts/modules/dashboard-layout/DashboardLayout';
import useAdAudiencePermissions from './AdAudience.permissions';
import CustomerAudienceConfiguration from './modules/customer-audience-configuration/CustomerAudienceConfiguration';
import Audience from './modules/audience/Audience';

export default function AdAudience() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.AdAudience');
  const permit = useAdAudiencePermissions();

  const modules = [
    { name: t(path('CustomerConfiguration')), component: <CustomerAudienceConfiguration />, hide: !permit.customerAudienceConfiguration },
    { name: t(path('AudienceTitle')), component: <Audience />, hide: !permit.audience },
  ];

  return <DashboardLayout modules={modules} />;
}
