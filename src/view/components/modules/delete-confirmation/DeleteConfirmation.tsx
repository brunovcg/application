import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonIcon, LoadingSpinner } from '../..';
import { useOnClickOutside } from '../../../../utils/hooks';
import { DeleteConfirmationProps } from './DeleteConfirmationTypes';
import StyledDeleteConfirmation from './DeleteConfirmation.styled';

export default function DeleteConfirmation({ onDelete, loading }: DeleteConfirmationProps) {
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(!!loading);
  const { t } = useTranslation();
  const DeleteConfirmationRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(DeleteConfirmationRef, () => setSelected(false));

  useEffect(() => {
    if (loading !== undefined) {
      setIsLoading(loading);
    }
  }, [loading]);

  const renderer = () => {
    if (isLoading) {
      return (
        <div data-testid="im-confirmation-component" className="im-confirmation-state">
          <LoadingSpinner size="tiny" message />
        </div>
      );
    }

    if (selected) {
      return (
        <div data-testid="im-confirmation-component" className="im-confirmation-state">
          <ButtonIcon
            icon="done"
            label={t('Common.Confirm')}
            variant="valid"
            onClick={() => {
              onDelete();
              setIsLoading(true);
            }}
            dataTestId="im-confirm-button"
          />
          <ButtonIcon
            icon="close"
            label={t('Common.Cancel')}
            variant="error"
            onClick={() => setSelected(false)}
            dataTestId="im-close-button"
          />
        </div>
      );
    }
    return <ButtonIcon icon="delete" onClick={() => setSelected(true)} variant="error" dataTestId="im-delete-button" />;
  };

  return (
    <StyledDeleteConfirmation className="im-delete-confirmation" ref={DeleteConfirmationRef} data-testid="im-delete-confirmation">
      {renderer()}
    </StyledDeleteConfirmation>
  );
}
