import { useTranslation } from 'react-i18next';
import { Button, Container, Video, Dialog } from '../../components';
import { SquidexServices } from '../../../apis/services';
import { useTranslationPath } from '../../../utils/hooks';
import './TrainingVideoDialog.scss';
import { TrainingWithThumbnail } from '../../../apis/queries/squidex/types';

export default function TrainingVideoDialog({ training }: { training: TrainingWithThumbnail }) {
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.TrainingVideoDialog');

  const renderResources = !!training?.resources?.length;

  const content = (
    <div className="im-training-video-dialog">
      <Video allowFullScreen title={training.name} src={training.video} width="100%" />
      {renderResources && (
        <Container className="im-training-video-resources" label={t(path('Resources'))}>
          <div className="im-resources-content">
            {training.links?.map((item) => (
              <div key={item.schemaId + item.text} className="im-details-dialog-item">
                <Button icon="link" text={item.text} styling="outlined" href={item.url} textNoWrap small className="im-resource-button" />
              </div>
            ))}
            {training.files?.map((item) => (
              <div key={item.schemaId + item.displayname} className="im-details-dialog-item">
                <Button
                  icon="fileDownload"
                  text={item.displayname}
                  styling="outlined"
                  onClick={() => SquidexServices.downloadAsset(item.file[0])}
                  textNoWrap
                  small
                  className="im-resource-button"
                />
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );

  return (
    <Dialog
      dialogId="TrainingVideoDialog"
      content={content}
      title={training.name}
      width="900px"
      maxHeight="800px"
      closeOnOutsideClick={false}
    />
  );
}
