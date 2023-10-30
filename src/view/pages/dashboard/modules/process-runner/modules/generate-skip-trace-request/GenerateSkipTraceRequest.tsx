import { useTranslation } from 'react-i18next';
import StyledGenerateSkipTraceRequest from './GenerateSkipTraceRequest.styled';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import { useState } from 'react';
import { MessageContainer, Section, Selector } from '../../../../../../components';
import MultipleSkipTraceRequest from './components/multiple-skip-trace-request/MultipleSkipTraceRequest';
import SingleSkipTraceRequestFilters from './components/single-skip-trace-request-filters/SingleSkipTraceRequestFilters';
import { GenerateSkipTraceRequestProps } from './GenerateSkipTraceRequest.types';

export default function GenerateSkipTraceRequest({ redirectProcessRunner }: GenerateSkipTraceRequestProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.ProcessRunner.GenerateSkipTraceRequest');
  const single = t(path('Single'));
  const multiple = t(path('Multiple'));
  const [selectedAmount, setSelectedAmount] = useState<typeof single | typeof multiple>(single);

  return (
    <StyledGenerateSkipTraceRequest className="im-generate-skip-trace-request">
      <Section maxWidth="1010px" contentClassName="im-generate-skip-trace-request-section">
        <MessageContainer text={t(path('Message'))} fontSize="medium" />
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
          {selectedAmount === single && <SingleSkipTraceRequestFilters />}
        </div>
        <div className="im-multiple-skip-trace-request-wrapper">
          {selectedAmount === multiple && <MultipleSkipTraceRequest redirectProcessRunner={redirectProcessRunner} />}
        </div>
      </Section>
    </StyledGenerateSkipTraceRequest>
  );
}
