import { useTranslationPath } from '../../../../../utils/hooks';
import DashboardLayout from '../../../../layouts/modules/dashboard-layout/DashboardLayout';
import { useTranslation } from 'react-i18next';
import PreferencesForm from './modules/preferences-form/CustomerPreferencesForm';
import './BuyBox.scss';
import MarketSubscriptions from './modules/market-subscriptions/MarketSubscriptions';
import useBuyBoxPermissions from './BuyBox.permissions';

export default function BuyBox() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox');

  const permit = useBuyBoxPermissions();

  const modules = [
    { name: t(path('MarketSubscriptions.Title')), component: <MarketSubscriptions />, hide: !permit.listMarketSubscriptions },
    { name: t(path('PreferencesForm.Title')), component: <PreferencesForm />, hide: !permit.listCustomerPreferences },
  ];

  return (
    <div className="im-buy-box-wrapper">
      <DashboardLayout modules={modules} />
    </div>
  );
}
