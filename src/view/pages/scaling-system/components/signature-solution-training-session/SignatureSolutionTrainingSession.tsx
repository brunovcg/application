import { useContext } from 'react';
import { Chip, Text, UserFeedback } from '../../../../components';
import { ServicesEndpointsConfigs } from '../../../../../configs';
import { LetterCaseHelper } from '../../../../../utils/helpers';
import { squidexQueries } from '../../../../../apis/queries';
import { TrainingWithThumbnail } from '../../../../../apis/queries/squidex/types';
import StyledSignatureSolutionTrainingSession from './SignatureSolutionTrainingSession.styled';
import { SignatureSolutionTrainingSessionProps } from './SignatureSolutionTrainingSession.types';
import { SquidexServices } from '../../../../../apis/services';
import { useTranslation } from 'react-i18next';
import { DialogsContext } from '../../../../../contexts/modules/dialogs/DialogsContext';

const { useSignatureSolutionSessionQuery } = squidexQueries;
const { squidex } = ServicesEndpointsConfigs;
const { capitalize } = LetterCaseHelper;

export default function SignatureSolutionTrainingSession({ selectedTrainingSession }: SignatureSolutionTrainingSessionProps) {
  const { mappedSession, sessionIsLoading } = useSignatureSolutionSessionQuery(selectedTrainingSession);
  const { openDialog } = useContext(DialogsContext);
  const { t } = useTranslation();

  const openVideoDialog = (training: TrainingWithThumbnail) => openDialog({ id: 'TrainingVideoDialog', props: { training } });

  const renderer = mappedSession?.map((item) => {
    if (item.schemaName === 'training') {
      return (
        <div className="im-signature-solution-session-item" key={item.name} onClick={() => openVideoDialog(item as TrainingWithThumbnail)}>
          <figure className="im-signature-solution-session-item-thumbnail">
            <img className="im-image-thumbnail" src={item.thumbnail} alt="video_thumb" />
          </figure>
          <div className="im-signature-solution-session-item-title">
            <Text text={item.name} size="small" align="center" bold />
          </div>
          <div className="im-global-centered">
            <Chip text={capitalize(item.schemaName)} size="small" />
          </div>
        </div>
      );
    }

    if (item.schemaName === 'playbook') {
      return (
        <div
          className="im-signature-solution-session-item"
          key={item.title}
          onClick={() => SquidexServices.downloadAsset(item.book.file[0])}
        >
          <figure className="im-signature-solution-session-item-thumbnail">
            <img className="im-image-thumbnail" src={`${squidex.baseURL}/${squidex.assets}/${item.thumbnail[0]}`} alt="video_thumb" />
          </figure>
          <div className="im-signature-solution-session-item-title">
            <Text text={item.title} size="small" align="center" bold />
          </div>
          <div className="im-global-centered">
            <Chip text={t('Common.Download')} size="small" />
          </div>
        </div>
      );
    }

    return null;
  });

  return (
    <StyledSignatureSolutionTrainingSession>
      {sessionIsLoading && <UserFeedback variant="loading" />}
      {!sessionIsLoading && renderer}
    </StyledSignatureSolutionTrainingSession>
  );
}
