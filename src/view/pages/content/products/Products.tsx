import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';
import DashboardLayout from '../../../layouts/modules/dashboard-layout/DashboardLayout';
import HotSheets from './modules/hot-sheets/HotSheets';
import SkipTracing from './modules/skip-tracing/SkipTracing';
import DirectMail from './modules/direct-mail/DirectMail';

export default function Products() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Content.Products');

  const modules = [
    { name: t(path('DirectMail')), component: <DirectMail /> },
    { name: t(path('SkipTracing')), component: <SkipTracing /> },
    { name: t(path('HotSheets')), component: <HotSheets /> },
  ];

  return (
    <div className="im-products">
      <DashboardLayout modules={modules} />
    </div>
  );
}
