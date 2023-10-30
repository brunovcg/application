import { useTranslation } from 'react-i18next';
import { ButtonIcon, Grid, MessageContainer, Title, List, Section, UserFeedback } from '../../../../../components';
import { useTranslationPath } from '../../../../../../utils/hooks';
import './DirectMail.scss';
import { GridTemplateArgs } from '../../../../../components/modules/grid/Grid.types';
import { squidexQueries } from '../../../../../../apis/queries';
import { ServicesEndpointsConfigs } from '../../../../../../configs';
import { useContext } from 'react';
import { DialogsContext } from '../../../../../../contexts/modules/dialogs/DialogsContext';

const { useListServicesQuery } = squidexQueries;
const { squidex } = ServicesEndpointsConfigs;

export default function DirectMail() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Content.Products.DirectMailComponent');
  const { services, servicesIsLoading } = useListServicesQuery();
  const { openDialog } = useContext(DialogsContext);

  const { description, details, products, addons } = services.directMail;

  const openImageDialog = (image: string) =>
    openDialog({ id: 'ImageDialog', props: { src: `${squidex.baseURL}/${squidex.assets}/${image}`, alt: image, width: '70vw' } });

  const gridHeader = [
    {
      id: 1,
      component: t(path('GridHeader')),
      accessor: 'name',
    },
    {
      id: 2,
      component: t(path('Sample')),
      accessor: 'image',
      template: ({ value }: GridTemplateArgs) => {
        if (value) {
          return <ButtonIcon size="large" icon="info" onClick={() => openImageDialog(value as string)} variant="primary" />;
        }
        return null;
      },
    },
    {
      id: 3,
      component: '$0.00 – $3,000.00',
      accessor: 'priceRange1',
    },
    {
      id: 4,
      component: '$3,000.01 – $5,000.00',
      accessor: 'priceRange2',
    },
    {
      id: 5,
      component: '$5,000.01 – $20,000.00',
      accessor: 'priceRange3',
    },
    {
      id: 6,
      component: ' $20,000.00	$20,000.01 +',
      accessor: 'priceRange4',
    },
  ];

  if (servicesIsLoading) {
    return <UserFeedback variant="loading" maxWidth="900px" />;
  }

  const detailsList = [
    { id: 1, text: details[0] },
    { id: 2, text: details[1] },
  ];

  const productsGridHeader = [...gridHeader, { id: 7, component: t(path('Note')), template: () => t(path('PricingPerPiece')) }];
  const addonsGridHeader = [...gridHeader, { id: 7, component: t(path('Note')), template: () => t(path('AdditionalPrice')) }];

  return (
    <Section className="im-direct-mail">
      <MessageContainer text={description} fontSize="medium" variant="info" />
      <Grid columns={productsGridHeader} rows={products} className="im-direct-mail-grid" rowPK="name" />

      <div className="im-direct-mail-add-on">
        <Title text={t(path('AddOns'))} icon="add" />
        <Grid columns={addonsGridHeader} rows={addons} className="im-direct-mail-grid" rowPK="name" />
        <MessageContainer
          text={<List lines={detailsList} />}
          fontSize="medium"
          className="im-direct-mail-messages"
          bold={false}
          variant="warning"
        />
      </div>
    </Section>
  );
}
