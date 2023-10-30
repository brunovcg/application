import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';
import { Button, UserFeedback, Section } from '../../../components';
import './Partners.scss';
import { squidexQueries } from '../../../../apis/queries';

const { useListVendorsQuery } = squidexQueries;

export default function Partners() {
  const { t } = useTranslation();

  const path = useTranslationPath('Pages.Content.Partners');

  const { vendors, vendorsIsLoading } = useListVendorsQuery();

  if (vendorsIsLoading) {
    return <UserFeedback variant="loading" />;
  }

  return (
    <Section className="im-partners-container" sectionTitle={t(path('Recommend'))} icon="reviews">
      <div className="im-partners-content">
        {vendors.map((vendor) => (
          <div key={vendor.name} className="im-partners-card">
            <figure className="im-partners-figure">
              <img src={vendor.logo} alt={vendor.name} className="im-partners-image" />
            </figure>

            <p className="im-partners-text">{vendor.description}</p>
            <Button
              icon="info"
              dataTestId={`im-partners-button-${vendor.name}`}
              styling="outlined"
              variant="error"
              className="im-partners-redirect"
              href={vendor.url}
              text={t(path('LearnMore'))}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
