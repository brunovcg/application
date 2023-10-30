import { MouseEvent } from 'react';
import StyledButtonImage from './ButtonImage.styled';
import { ButtonImageProps } from './ButtonImage.types';

export default function ButtonImage({
  backgroundImage,
  width,
  height,
  onClick,
  stopPropagation,
  preventDefault,
  selected,
}: ButtonImageProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      e?.stopPropagation();
    }

    if (preventDefault) {
      e?.preventDefault();
    }

    onClick(e);
  };

  return (
    <StyledButtonImage className="im-button-image" backgroundImage={backgroundImage} width={width} height={height} selected={selected}>
      <button onClick={handleClick} />
    </StyledButtonImage>
  );
}
