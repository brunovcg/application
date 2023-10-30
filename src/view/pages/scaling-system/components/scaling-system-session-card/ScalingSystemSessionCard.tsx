import { ServicesEndpointsConfigs } from '../../../../../configs';
import StyledScalingSystemSessionCard from './ScalingSystemSessionCard.styled';
import { ScalingSystemSessionCardProps } from './ScalingSystemSessionCard.types';
import { Text } from '../../../../components';
import { ClassNameHelper } from '../../../../../utils/helpers';
import { SignatureSolutionTrainingSession } from '../../../../../apis/services/squidex-services/Squidex.services.types';
import useNavigation from '../../../../../utils/hooks/modules/use-navigation/useNavigation';

const { squidex } = ServicesEndpointsConfigs;

export default function ScalingSystemSessionCard({ trainingSession, group, category }: ScalingSystemSessionCardProps) {
  const cardClasses = (item: SignatureSolutionTrainingSession) =>
    ClassNameHelper.conditional({ ['im-signature-solution-training-session-card']: true, ['im-full-width']: item.fullWidth });

  const { navigate } = useNavigation();

  return (
    <StyledScalingSystemSessionCard className="im-signature-solution-training-type">
      {trainingSession.map((item) => (
        <div
          key={item.title}
          className={cardClasses(item)}
          onClick={() => navigate({ routeName: 'scalingSystemSession', params: { group, session: item.title, category } })}
        >
          <figure>
            <img
              className="im-signature-solution-training-session-thumbnail"
              src={`${squidex.baseURL}/${squidex.assets}/${item.thumbnail}`}
              alt="im-signature"
            />
          </figure>
          <Text
            className="im-signature-solution-training-session-title"
            text={item.title}
            maxLines={2}
            size="small"
            width="100%"
            height="40px"
            align="center"
            bold
          />
        </div>
      ))}
    </StyledScalingSystemSessionCard>
  );
}
