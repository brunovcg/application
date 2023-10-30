import { useEffect } from 'react';
import { UseOnKeyPressProps } from './useOnKeyPress.types';
import { useIsKeyHold } from '../..';
import { EventKey } from '../../../../types';

export default function useOnKeyPress({ keys, callback, hold, ignoreHold, enabled = true }: UseOnKeyPressProps) {
  const { isHolding } = useIsKeyHold(hold ?? ignoreHold);

  useEffect(() => {
    const keydownEvent = (event: KeyboardEvent) => {
      if (keys.includes(event.key as EventKey) && enabled) {
        if (hold && isHolding) {
          callback?.(event);
        }
        if (!hold && !isHolding) {
          callback?.(event);
        }
      }
    };

    document.addEventListener('keydown', keydownEvent);

    return () => document.removeEventListener('keydown', keydownEvent);
  }, [callback, enabled]);
}
