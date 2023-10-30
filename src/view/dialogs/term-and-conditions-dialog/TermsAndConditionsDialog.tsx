import { Dialog, LoadingSpinner, SquidexFieldRenderer } from '../../components';
import { squidexQueries } from '../../../apis/queries';
import StyledTermsAndConditionsDialog from './TermsAndConditionsDialog.styled';
import { useTranslationPath } from '../../../utils/hooks';
import { useTranslation } from 'react-i18next';

const { useTermsAndConditionsQuery } = squidexQueries;
export default function TermsAndConditionsDialog() {
  const { terms, termsIsLoading } = useTermsAndConditionsQuery();
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.TermsAndConditionsDialog');

  const content = (
    <StyledTermsAndConditionsDialog className="im-terms-and-conditions-dialog">
      {termsIsLoading && (
        <div className="im-terms-loading">
          <LoadingSpinner />
        </div>
      )}
      {terms?.map((clause) => (
        <div key={clause.id}>
          <div className="im-clause-title">{clause.clause.title}</div>
          <div className="im-clause-sections">
            {clause.clause.sections.map((field) => (
              <SquidexFieldRenderer key={field.id} field={field} />
            ))}
          </div>
        </div>
      ))}
    </StyledTermsAndConditionsDialog>
  );

  return <Dialog dialogId="TermsAndConditionsDialog" title={t(path('Title'))} content={content} maxWidth="1200px" />;
}
