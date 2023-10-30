export const avatarSizes = ['small', 'medium', 'large'] as const;

export type AvatarSize = (typeof avatarSizes)[number];

export type StyledAvatarProps = {
  size?: AvatarSize;
};

export type AvatarProps = StyledAvatarProps & {
  username: string;
  name?: string;
  active?: boolean;
};
