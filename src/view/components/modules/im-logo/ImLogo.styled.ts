import styled, { css } from 'styled-components';
import { ImLogoProps, ImLogoTypes } from './ImLogo.types';

const getWidth = (props: ImLogoProps) => {
  const sizes = {
    tiny: { ['only-gears']: { width: '30px', height: '30px' }, logo: { width: '130px', height: '25px' } },
    small: { ['only-gears']: { width: '35px', height: '35px' }, logo: { width: '150px', height: '34px' } },
    medium: { ['only-gears']: { width: '40px', height: '40px' }, logo: { width: '300px', height: '65px' } },
    large: { ['only-gears']: { width: '50px', height: '50px' }, logo: { width: '320px', height: '69px' } },
    huge: { ['only-gears']: { width: '60px', height: '60px' }, logo: { width: '350px', height: '75px' } },
  } as const;

  return sizes[props.size][props?.type as ImLogoTypes];
};

const StyledImLogo = styled.figure<ImLogoProps>`
  width: ${(props) => getWidth(props).width};
  height: ${(props) => getWidth(props).height};
  ${(props) =>
    props.backgroundWhite &&
    css`
      background: var(--container-white-color);
      border-radius: 50%;
    `}

  img {
    width: ${(props) => getWidth(props).width};
    height: ${(props) => getWidth(props).height};
    max-width: 100%;
  }
`;

export default StyledImLogo;
