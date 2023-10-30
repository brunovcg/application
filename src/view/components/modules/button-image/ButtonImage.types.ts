import { MouseEvent } from 'react';

export type StyledButtonImageProps = {
  backgroundImage: string;
  height: string;
  width: string;
  selected?: boolean;
};

export type ButtonImageProps = StyledButtonImageProps & {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  stopPropagation?: boolean;
  preventDefault?: boolean;
};
