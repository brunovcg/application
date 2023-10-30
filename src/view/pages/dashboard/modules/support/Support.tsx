import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../utils/hooks';
import MemberSupportTicketForm from './modules/member-support-ticket-form/MemberSupportTicketForm';
import FAQs from './modules/faqs/FAQs';
import DashboardLayout from '../../../../layouts/modules/dashboard-layout/DashboardLayout';
import './Support.scss';
import useSupportPermissions from './Support.permissions';

export default function Support() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Support');

  const permit = useSupportPermissions();

  const modules = [
    { name: t(path('MemberSupportTicket')), component: <MemberSupportTicketForm />, hide: !permit.openTicket },
    { name: t(path('FAQ')), component: <FAQs /> },
  ];
  return (
    <div className="im-support">
      <DashboardLayout modules={modules} />
    </div>
  );
}
