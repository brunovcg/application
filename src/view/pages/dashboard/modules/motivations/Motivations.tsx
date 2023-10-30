import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../utils/hooks';
import DashboardLayout from '../../../../layouts/modules/dashboard-layout/DashboardLayout';
import MotivationsList from './modules/motivations-list/MotivationsList';
import MotivationSources from './modules/motivation-sources/MotivationSources';
import MotivationSourceGroups from './modules/motivations-source-groups/MotivationSourceGroups';
import useMotivationsPermissions from './Motivations.permissions';

export default function Motivations() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Motivations');

  const permit = useMotivationsPermissions();

  const modules = [
    { name: t(path('MotivationsList.Title')), component: <MotivationsList />, hide: !permit.motivationList },
    { name: t(path('MotivationSources.Title')), component: <MotivationSources />, hide: !permit.motivationSources },
    { name: t(path('MotivationsSourceGroups.Title')), component: <MotivationSourceGroups />, hide: !permit.motivationsSourceGroups },
  ];

  return (
    <div className="im-motivations">
      <DashboardLayout modules={modules} />
    </div>
  );
}
