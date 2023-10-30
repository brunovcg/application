import StyledAvatar from './Avatar.styled';
import { AvatarProps } from './Avatar.types';
import { ClassNameHelper } from '../../../../utils/helpers';

export default function Avatar({ username, name, size = 'large', active }: AvatarProps) {
  const getNameInitials = () => {
    const fullName = name?.trim().split(' ');
    if (fullName) {
      const firstNameInitial = fullName[0][0];
      const lastNameInitial = fullName.length > 1 ? fullName.at(-1)?.[0] : null;
      return lastNameInitial ? firstNameInitial + lastNameInitial : firstNameInitial;
    }
    return '';
  };

  const avatarClasses = ClassNameHelper.conditional({
    ['im-avatar']: true,
    ['im-active']: active,
  });

  const initials = name ? getNameInitials() : username[0].toUpperCase();

  return (
    <StyledAvatar className={avatarClasses} size={size}>
      {initials}
    </StyledAvatar>
  );
}
