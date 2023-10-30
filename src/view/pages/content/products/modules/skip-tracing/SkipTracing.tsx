import { useTranslation } from 'react-i18next';
import { Grid, List, MessageContainer, Section, UserFeedback } from '../../../../../components';
import { useTranslationPath } from '../../../../../../utils/hooks';
import './SkipTracing.scss';
import { squidexQueries } from '../../../../../../apis/queries';

const { useListServicesQuery } = squidexQueries;

export default function SkipTracing() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Content.Products.SkipTracingComponent');
  const { services, servicesIsLoading } = useListServicesQuery();

  const { description, details, products } = services.skipTracing;

  const gridHeader = [
    { id: 1, component: t(path('Service')), accessor: 'name' },
    { id: 2, component: t(path('Column1')), accessor: 'withoutEmailAddresses' },
    { id: 3, component: t(path('Column2')), accessor: 'withEmailAddresses' },
    { id: 4, component: t(path('Column3')), accessor: 'corporateOwned' },
    { id: 5, component: t(path('Column4')), accessor: 'premiumSkipTracing' },
    { id: 6, component: t(path('Note')), template: () => t(path('PricePerRecord')) },
  ];

  const gridRows = products.map((item) => ({ name: t(path('Row1')), ...item }));

  const messages = [
    { id: 1, text: details[0] },
    { id: 2, text: details[1] },
  ];

  if (servicesIsLoading) {
    return <UserFeedback variant="loading" maxWidth="850px" />;
  }

  return (
    <Section className="im-skip-tracing">
      <MessageContainer text={description} fontSize="medium" variant="info" />
      <Grid columns={gridHeader} rows={gridRows} className="im-skip-tracing-grid" rowPK="name" />
      <div className="im-skip-tracing-messages">
        <MessageContainer
          text={<List lines={messages} />}
          fontSize="medium"
          className="im-skip-tracing-message"
          variant="info"
          bold={false}
        />
      </div>
    </Section>
  );
}
