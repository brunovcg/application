import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { squidexQueries } from '../../../../../apis/queries';
import { ServicesEndpointsConfigs } from '../../../../../configs';
import { LetterCaseHelper } from '../../../../../utils/helpers';
import { TrainingWithThumbnail } from '../../../../../apis/queries/squidex/types';
import Constants from '../../../../../utils/constants/Constants';
import { BreadCrumbs, Chip, Section, Text, Title, UserFeedback } from '../../../../components';
import { SquidexServices } from '../../../../../apis/services';
import StyledScalingSystemSession from './ScalingSystemSession.styled';
import { DialogsContext } from '../../../../../contexts/modules/dialogs/DialogsContext';

const { useSignatureSolutionSessionQuery, useSignatureSolutionQuery } = squidexQueries;
const { squidex } = ServicesEndpointsConfigs;
const { capitalize } = LetterCaseHelper;
const { PRIMARY, ADDITIONAL } = Constants.SCALING_SYSTEM_CATEGORIES;

export default function ScalingSystemSession() {
  const { group, session, category } = useParams();
  const { signatureSolution, signatureSolutionLoading } = useSignatureSolutionQuery();

  const selectedTrainingSession = useMemo(() => {
    const scalingSystemGroup = signatureSolution?.find((item) => item.title === group);

    if (category === PRIMARY) {
      return scalingSystemGroup?.primaryTraining.find((item) => item.title === session);
    }

    if (category === ADDITIONAL) {
      return scalingSystemGroup?.additionalTraining.find((item) => item.title === session);
    }

    return undefined;
  }, [signatureSolution]);

  const { mappedSession, sessionIsLoading } = useSignatureSolutionSessionQuery(selectedTrainingSession);
  const { openDialog } = useContext(DialogsContext);
  const { t } = useTranslation();

  const openVideoDialog = (training: TrainingWithThumbnail) => openDialog({ id: 'TrainingVideoDialog', props: { training } });

  const renderer = mappedSession?.map((item) => {
    if (item.schemaName === 'training') {
      return (
        <div className="im-scaling-system-session-item" key={item.name} onClick={() => openVideoDialog(item as TrainingWithThumbnail)}>
          <figure className="im-scaling-system-session-item-thumbnail">
            <img className="im-image-thumbnail" src={item.thumbnail} alt="video_thumb" />
          </figure>
          <div className="im-scaling-system-session-item-title">
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
        <div className="im-scaling-system-session-item" key={item.title} onClick={() => SquidexServices.downloadAsset(item.book.file[0])}>
          <figure className="im-scaling-system-session-item-thumbnail">
            <img className="im-image-thumbnail" src={`${squidex.baseURL}/${squidex.assets}/${item.thumbnail[0]}`} alt="video_thumb" />
          </figure>
          <div className="im-scaling-system-session-item-title">
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
    <StyledScalingSystemSession>
      <Section contentClassName="im-scaling-system-session-wrapper" height="100%" width="100%">
        <div className="im-scaling-system-session-header">
          <BreadCrumbs
            modules={[
              { text: t('Common.Home'), navigateArgs: { routeName: 'home' } },
              { text: group as string, navigateArgs: { routeName: 'scalingSystemGroup', params: { group: group as string } } },
            ]}
          />
          <Title text={session as string} variant="error" size="large" />
        </div>
        {(sessionIsLoading || signatureSolutionLoading) && <UserFeedback variant="loading" />}
        {!sessionIsLoading && <div className="im-scaling-system-session-content">{renderer}</div>}
      </Section>
    </StyledScalingSystemSession>
  );
}
