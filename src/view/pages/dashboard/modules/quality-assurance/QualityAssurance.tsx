import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../../../layouts/modules/dashboard-layout/DashboardLayout';
import { useTranslationPath } from '../../../../../utils/hooks';
import DataMinerQA from './modules/data-miner-qa/DataMinerQA';

export default function QualityAssurance() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.QualityAssurance');

  const modules = [{ name: t(path('DataMinerQA.Title')), component: <DataMinerQA /> }];

  return (
    <div className="im-quality-assurance">
      <DashboardLayout modules={modules} />
    </div>
  );
}
