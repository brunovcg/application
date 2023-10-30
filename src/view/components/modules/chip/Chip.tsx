import StyledChip from './Chip.styled';
import { ChipProps } from './Chip.types';
import ButtonIcon from '../button-icon/ButtonIcon';
import { MouseEvent } from 'react';
import { ClassNameHelper } from '../../../../utils/helpers';

export default function Chip({
  text,
  onClick,
  dataTestId,
  onCloseButton,
  variant = 'primary',
  disabled,
  size = 'medium',
  width,
  maxWidth,
  centered,
}: ChipProps) {
  const handleCloseCLick = (e: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    onCloseButton?.();
  };

  const conditional = ClassNameHelper.conditional({
    ['im-chip']: true,
    ['im-chip-close-option']: !!onCloseButton,
  });

  const closeButtonSize = () => {
    if (size !== 'large') {
      return 'tiny';
    }
  };

  return (
    <StyledChip
      className={conditional}
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      width={width}
      maxWidth={maxWidth}
      data-testid={dataTestId}
      centered={centered}
    >
      <div className="im-chip-content">{text}</div>
      {!!onCloseButton && <ButtonIcon stopPropagation preventDefault icon="close" onClick={handleCloseCLick} size={closeButtonSize()} />}
    </StyledChip>
  );
}
