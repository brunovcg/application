export type ImLogoSizeTypes = 'tiny' | 'small' | 'medium' | 'large' | 'huge';

export type ImLogoTypes = 'logo' | 'only-gears';
export type ImLogoProps = {
  size: ImLogoSizeTypes;
  type?: ImLogoTypes;
  backgroundWhite?: boolean;
};
