import StyledScalingSystemCard from './ScalingSystemGroupCard.styled';
import { ScalingSystemGroupCardProps } from './ScalingSystemGroupCard.types';
import { ServicesEndpointsConfigs } from '../../../../../configs';
import { ClassNameHelper } from '../../../../../utils/helpers';

const { squidex } = ServicesEndpointsConfigs;

export default function ScalingSystemGroupCard({ item, onClick, isAdditionalTraining }: ScalingSystemGroupCardProps) {
  const handleClick = () => onClick?.(item);

  const classes = ClassNameHelper.conditional({ ['im-scaling-system-group-card']: true, ['im-full-width']: item.fullWidth });

  return (
    <StyledScalingSystemCard className={classes} isClickable={!!onClick}>
      {!isAdditionalTraining && (
        <div className="im-scaling-system-group-card-content" onClick={handleClick}>
          <figure>
            <img className="im-scaling-system-icon" src={`${squidex.baseURL}/${squidex.assets}/${item.icon}`} alt="im-signature-icon" />
          </figure>
          <div className="im-scaling-system-group-card-info">
            <div className="im-scaling-system-group-card-description">{item.description}</div>
            <div className="im-scaling-system-group-card-title">{item.title}</div>
          </div>
        </div>
      )}
      {isAdditionalTraining && (
        <div className="im-scaling-system-group-card-content" onClick={handleClick}>
          <p className="im-scaling-system-group-card-additional-training">Additional Training</p>
        </div>
      )}
    </StyledScalingSystemCard>
  );
}
