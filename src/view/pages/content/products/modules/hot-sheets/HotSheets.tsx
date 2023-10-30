import { useTranslation } from 'react-i18next';
import { Grid, InjectedHTML, List, MessageContainer, Section, UserFeedback } from '../../../../../components';
import { useTranslationPath } from '../../../../../../utils/hooks';
import './HotSheets.scss';
import { squidexQueries } from '../../../../../../apis/queries';
import useNavigation from '../../../../../../utils/hooks/modules/use-navigation/useNavigation';

const { useListServicesQuery } = squidexQueries;

export default function HotSheets() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Content.Products.HotSheetsComponent');
  const { navigate } = useNavigation();
  const { services, servicesIsLoading } = useListServicesQuery();

  const { description, details, products } = services.hotSheets ?? {};

  const gridHeader = [
    { id: 1, component: t(path('Service')), accessor: 'column1' },
    { id: 2, component: t(path('Price')), accessor: 'column2' },
  ];

  const messages = [
    { id: 1, text: details[0] },
    { id: 2, text: details[1] },
    {
      id: 3,
      text: (
        <span>
          {details[2]}
          <span className="im-member-support-ticket" onClick={() => navigate({ routeName: 'support' })}>
            {t(path('BudgetChangeForm'))}
          </span>
        </span>
      ),
    },
    { id: 4, text: <InjectedHTML html={details[3]} className="im-detail-email" /> },
  ];

  if (servicesIsLoading) {
    return <UserFeedback variant="loading" maxWidth="850px" />;
  }

  return (
    <Section className="im-hot-sheets">
      <MessageContainer text={description} fontSize="medium" variant="info" />
      <Grid columns={gridHeader} rows={products} className="im-hot-sheets-grid" rowPK="column1" />
      <div className="im-hot-sheets-messages">
        <MessageContainer
          variant="info"
          text={<List lines={messages} />}
          fontSize="medium"
          className="im-hot-sheets-message"
          bold={false}
        />
      </div>
    </Section>
  );
}
