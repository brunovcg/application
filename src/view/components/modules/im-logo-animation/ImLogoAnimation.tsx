import { StyledDoubleLogoAnimation, StyledSingleLogoAnimation } from './ImLogoAnimation.styled';
import BLUE_GEAR from '../../../../assets/images/small_gear.png';
import RED_GEAR from '../../../../assets/images/big_gear.png';
import { ImLogoAnimationProps } from './ImLogoAnimationProps.types';
import { ClassNameHelper } from '../../../../utils/helpers';

const { conditional } = ClassNameHelper;

export default function ImLogoAnimation({ size = 'medium' }: ImLogoAnimationProps) {
  const doubleGearClasses = conditional({
    ['im-logo-animation']: true,
    ['im-double-gear-animation']: true,
    ['im-double-gear-large']: size === 'large',
    ['im-double-gear-medium']: size === 'medium',
  });

  const singleGearClasses = conditional({
    ['im-logo-animation']: true,
    ['im-single-gear-animation']: true,
    ['im-single-gear-tiny']: size === 'tiny',
    ['im-single-gear-small']: size === 'small',
  });

  const doubleGearAnimation = (
    <StyledDoubleLogoAnimation className={doubleGearClasses}>
      <img className=" im-small-gear" src={BLUE_GEAR} alt="gear" />
      <img className=" im-large-gear" src={RED_GEAR} alt="gear" />
    </StyledDoubleLogoAnimation>
  );

  const singleGearAnimation = (
    <StyledSingleLogoAnimation className={singleGearClasses}>
      <img className="im-single-gear" src={RED_GEAR} alt="gear" />
    </StyledSingleLogoAnimation>
  );

  return size === 'small' || size === 'tiny' ? singleGearAnimation : doubleGearAnimation;
}
