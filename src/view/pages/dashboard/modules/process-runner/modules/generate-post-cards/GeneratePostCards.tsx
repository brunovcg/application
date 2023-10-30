import { useTranslation } from 'react-i18next';
import { Section, Selector } from '../../../../../../components';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { useState } from 'react';
import MultiplePostCards from './components/multiple-post-cards/MultiplePostCards';
import SinglePostCardFilters from './components/single-post-card-filters/SinglePostCardFilters';
import StyledGeneratePostCards from './GeneratePostCards.styled';
import { GeneratePostCardsProps } from './GeneratePostCards.types';

export default function GeneratePostCards({ redirectProcessRunner }: GeneratePostCardsProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.GeneratePostCards');
  const single = t(path('Single'));
  const multiple = t(path('Multiple'));
  const [selectedAmount, setSelectedAmount] = useState<typeof single | typeof multiple>(single);
  return (
    <StyledGeneratePostCards className="im-generate-postcards">
      <Section maxWidth="1010px" contentClassName="im-generate-postcards-section">
        <div className="im-generate-postcards-filters">
          <Selector
            onSelect={([value]) => setSelectedAmount(value as typeof single | typeof multiple)}
            label={t(path('Amount'))}
            options={[single, multiple]}
            showError={false}
            allowSearch={false}
            allowClear={false}
            initValue={[single]}
            allowReset={false}
          />
          {selectedAmount === single && <SinglePostCardFilters />}
        </div>
        <div className="im-multiple-post-cards-wrapper">
          {selectedAmount === multiple && <MultiplePostCards redirectProcessRunner={redirectProcessRunner} />}
        </div>
      </Section>
    </StyledGeneratePostCards>
  );
}
