import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../utils/hooks';
import PurchasedTrackingForm from './components/purchased-tracking-form/PurchasedTrackingForm';
import DashboardLayout from '../../../../layouts/modules/dashboard-layout/DashboardLayout';
import PurchasedPropertiesList from './components/purchased-properties-list/PurchasedPropertiesList';
import usePurchasedPropertiesPermissions from './InputResults.permissions';

export default function InputResults() {
  const { t } = useTranslation();
  const permissions = usePurchasedPropertiesPermissions();
  const path = useTranslationPath('Pages.Dashboard.InputResults');
  const modules = [
    { name: t(path('AddPurchase')), component: <PurchasedTrackingForm />, hide: !permissions.displayTrackingForm },
    { name: t(path('PurchasedPropertiesList')), component: <PurchasedPropertiesList />, hide: !permissions.displayListProperties },
  ];

  return (
    <div className="im-input-results">
      <DashboardLayout modules={modules} />
    </div>
  );
}
