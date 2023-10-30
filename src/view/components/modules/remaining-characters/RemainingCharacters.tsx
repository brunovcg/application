import { RemainingCharactersProps, RemainingCharactersRef } from './RemainingCharacters.types';
import { useTranslation } from 'react-i18next';
import { useState, forwardRef, ForwardedRef, useImperativeHandle, SetStateAction } from 'react';
import StyledRemainingCharacters from './RemainingCharacters.styled';
import { ClassNameHelper } from '../../../../utils/helpers';

function RemainingCharacters({ remainingCharacters, disabled }: RemainingCharactersProps, ref: ForwardedRef<RemainingCharactersRef>) {
  const [remainingChars, setRemainingChars] = useState(remainingCharacters);

  const { t } = useTranslation();

  const formattedQuantity = disabled ? 0 : remainingChars ?? 0;

  useImperativeHandle(ref, () => ({
    setRemainingChars: (value: SetStateAction<number>) => {
      setRemainingChars(value);
    },
  }));

  const classes = ClassNameHelper.conditional({
    ['im-remaining-characters']: true,
    ['im-disabled']: disabled,
  });

  const valueClasses = ClassNameHelper.conditional({
    ['im-remaining-characters-value']: true,
    ['im-remaining-no-characters']: formattedQuantity === 0,
  });

  return (
    <StyledRemainingCharacters className={classes}>
      <span className="im-remaining-characters-title">{t('Components.RemainingCharacters.Characters')}</span>
      &nbsp;
      <span className={valueClasses}>{formattedQuantity}</span>
    </StyledRemainingCharacters>
  );
}

export default forwardRef(RemainingCharacters);
