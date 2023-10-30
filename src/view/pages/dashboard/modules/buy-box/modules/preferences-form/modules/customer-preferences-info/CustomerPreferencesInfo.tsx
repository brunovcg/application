import { useTranslation } from 'react-i18next';
import { Section } from '../../../../../../../../components';
import './CustomerPreferencesInfo.scss';
import useTranslationPath from '../../../../../../../../../utils/hooks/modules/useTranslationPath';
import { DateTimeHelper } from '../../../../../../../../../utils/helpers';

const { formatDate } = DateTimeHelper;

export default function CustomerPreferencesInfo({ date }: { date?: Date }) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.CustomerPreferencesInfo');

  return (
    <Section contentClassName="im-preferences-info" sectionTitle={t(path('Info'))} width="100%">
      <div className="im-preferences-info-date">
        <span className="im-info-title"> {t(path('LastUpdated'))} </span>
        <span className="im-info-text">{formatDate(date)}</span>
      </div>
      <div className="im-preferences-info-caption">
        <div className="im-captions-wrapper">
          <div className="im-caption im-primary">
            <div className="im-caption-circle im-caption-default" /> <span className="im-info-text">{t(path('CaptionDefault'))}</span>
          </div>
          <div className="im-caption im-invalid">
            <div className="im-caption-circle im-caption im-caption-invalid" />
            <span className="im-info-text">{t(path('CaptionInvalid'))}</span>
          </div>
          <div className="im-caption im-valid">
            <div className="im-caption-circle im-caption im-caption-valid" />
            <span className="im-info-text">{t(path('CaptionValid'))}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
