import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from '../../helpers';

export default function useAbortSignal() {
  const [requestController, setRequestController] = useState(new AbortController());

  const { t } = useTranslation();

  const abortSignal = (callback?: () => void) => {
    requestController.abort();
    Alert.info(t('Hooks.UseAbortSignal.Aborted'));
    callback?.();
    setRequestController(new AbortController());
  };

  const signal = requestController.signal;

  return { abortSignal, signal };
}
