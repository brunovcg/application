import LOGO from '../../../../assets/images/logo.png';
import GEAR from '../../../../assets/images/logo_white.png';
import StyledImLogo from './ImLogo.styled';
import { ImLogoProps } from './ImLogo.types';

export default function ImLogo({ size, type = 'logo', backgroundWhite }: ImLogoProps) {
  return (
    <StyledImLogo className="im-logo" size={size} type={type} backgroundWhite={backgroundWhite}>
      <img src={type === 'logo' ? LOGO : GEAR} alt="IM - Logo" />
    </StyledImLogo>
  );
}
