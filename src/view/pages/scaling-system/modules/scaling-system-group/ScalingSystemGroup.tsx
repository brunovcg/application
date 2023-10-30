import { useParams } from 'react-router-dom';
import { squidexQueries } from '../../../../../apis/queries';
import StyledScalingSystemGroup from './ScalingSystemGroup.styled';
import Constants from '../../../../../utils/constants/Constants';
import AdditionalTraining from '../../components/additional-training/AdditionalTraining';
import ScalingSystemTraining from '../../components/scaling-system-training/ScalingSystemTraining';
import { BreadCrumbs, Section, Title, UserFeedback } from '../../../../components';
import { MappedSignatureSolutionData } from '../../../../../apis/services/squidex-services/Squidex.services.types';
import { useTranslation } from 'react-i18next';

const { useSignatureSolutionQuery } = squidexQueries;

export default function ScalingSystemGroup() {
  const { group } = useParams();

  const isAdditionalTraining = group === Constants.ADDITIONAL_TRAINING;
  const { t } = useTranslation();

  const { signatureSolution } = useSignatureSolutionQuery();

  const selectedGroup = signatureSolution?.find((item) => item?.title === group) as MappedSignatureSolutionData;

  if (!selectedGroup && !isAdditionalTraining) {
    return <UserFeedback variant="loading" height="100%" />;
  }

  return (
    <StyledScalingSystemGroup className="im-scaling-system-group">
      <Section contentClassName="im-scaling-system-group-content" height="100%">
        <div className="im-scaling-system-group-header">
          <BreadCrumbs modules={[{ text: t('Common.Home'), navigateArgs: { routeName: 'home' } }]} />
          <Title text={group as string} variant="error" size="large" />
        </div>
        {!isAdditionalTraining && <ScalingSystemTraining selectedGroup={selectedGroup} />}
        {isAdditionalTraining && <AdditionalTraining />}
      </Section>
    </StyledScalingSystemGroup>
  );
}
