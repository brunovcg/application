import styled from 'styled-components';
import { AvatarSize, StyledAvatarProps } from './Avatar.types';

const getSize = (size: AvatarSize = 'small') => {
  const dimensions = {
    small: '25px',
    medium: '40px',
    large: '40px',
  };

  const fontSizes = {
    small: '13px',
    medium: '18px',
    large: '20px',
  };

  return { dimension: dimensions[String(size) as AvatarSize], fontSize: fontSizes[String(size) as AvatarSize] };
};

const StyledAvatar = styled.div<StyledAvatarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--container-im-gradient-color);
  border-radius: 50%;
  width: ${(props) => getSize(props.size).dimension};
  height: ${(props) => getSize(props.size).dimension};
  font-weight: bold;
  font-size: ${(props) => getSize(props.size).fontSize};
  color: var(--typeface-white-color);

  &.im-active {
    :hover {
      box-shadow: var(--circle-box--shadow);
    }
  }
`;

export default StyledAvatar;
