import { Title, SquidexFieldRenderer, Divider, Dialog } from '../../components';
import { MappedSquidexField } from '../../../apis/queries/squidex/types';
import './FAQAnswerDialog.scss';
import { useTranslationPath } from '../../../utils/hooks';
import { useTranslation } from 'react-i18next';

export default function FAQAnswerDialog({ answer, title }: { answer: MappedSquidexField[]; title: string }) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.FAQAnswerDialog');

  const content = (
    <div className="im-faqs-dialog">
      <Title text={title} size="large" marginBottom="4px" />
      <Divider margin="10px 0 20px 0" />
      <div className="im-faqs-dialog-answer">
        {answer.map((field) => (
          <SquidexFieldRenderer key={field.id} field={field} />
        ))}
      </div>
    </div>
  );

  return <Dialog dialogId="FAQAnswerDialog" content={content} title={t(path('FAQDialogTitle'))} maxHeight="85vh" maxWidth="1300px" />;
}
