import { useTranslation } from 'react-i18next';

export default function useInputMaxCharacters(isMaxLengthSet: boolean, isDisabled: boolean, remainingCharacters = 0) {
  const { t } = useTranslation();

  const renderRemainingCharacters = () => {
    if (!isMaxLengthSet) {
      return null;
    }

    const formatQuantity = (quantity: number) => (
      <p>
        <span>{t('Components.RemainingCharacters.Characters')}</span>
        <span className={quantity === 0 ? 'im-zero' : ''}>{quantity}</span>
      </p>
    );

    if (isDisabled) {
      return formatQuantity(0);
    }

    return formatQuantity(remainingCharacters ?? 0);
  };

  const getRemainingAmount = () => {
    if (!isMaxLengthSet) {
      return true;
    }
    return (remainingCharacters ?? 0) > 0;
  };

  return { getRemainingAmount, renderRemainingCharacters };
}
