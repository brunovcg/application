import { squidexQueries } from '../../../apis/queries';
import { Section, UserFeedback } from '../../components';
import StyledScaleSystem from './ScalingSystem.styled';
import ScalingSystemGroupCard from './components/scaling-system-group-card/ScalingSystemGroupCard';
import scalingSystemLogo from '../../../assets/images/scaling_system.jpeg';
import additionalTrainingLogo from '../../../assets/images/additional_training.png';
import useNavigation from '../../../utils/hooks/modules/use-navigation/useNavigation';
import Constants from '../../../utils/constants/Constants';

const { useSignatureSolutionQuery } = squidexQueries;

const { ADDITIONAL_TRAINING } = Constants;

export default function ScalingSystem() {
  const { signatureSolution, signatureSolutionLoading } = useSignatureSolutionQuery();
  const { navigate } = useNavigation();

  return (
    <StyledScaleSystem className="im-scaling-system">
      {signatureSolutionLoading && <UserFeedback variant="loading" height="100%" />}
      {!signatureSolutionLoading && (
        <Section contentClassName="im-scaling-system-container" width="100%">
          <img src={scalingSystemLogo} alt="scaling-system" className="im-scaling-system-logo" />
          <div className="im-scaling-system-list">
            {signatureSolution?.map((item) => (
              <ScalingSystemGroupCard
                isAdditionalTraining={false}
                onClick={() => navigate({ routeName: 'scalingSystemGroup', params: { group: item.title } })}
                item={item}
                key={item.title}
              />
            ))}
          </div>
          <div
            className="im-scaling-system-additional-training-button"
            onClick={() => navigate({ routeName: 'scalingSystemGroup', params: { group: ADDITIONAL_TRAINING } })}
          >
            <img src={additionalTrainingLogo} alt="scaling-system" className="im-scaling-system-logo" />
          </div>
        </Section>
      )}
    </StyledScaleSystem>
  );
}
