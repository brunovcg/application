import { useEffect, useState } from 'react';
import { UseDebounceProps } from './useDebounce.types';
/**
 * Provides a value that only changes when the parameter didn't
 * change after the specified delay. Useful to avoid useEffects
 * to run too much when the dependencies are bound to the user
 * input.
 *
 * @param {unknown} value state that changes should be debounced.
 * @param {number} delay delay to update the debounced value.
 * @returns a value that only changes after waiting the delayed
 * time and no new change on the value was made.
 */
function useDebounce<Value>({ value, delay, active = true }: UseDebounceProps<Value>) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    if (active) {
      setIsDebouncing(true);
      const handle = setTimeout(() => {
        setDebouncedValue(value);
        setIsDebouncing(false);
      }, delay);
      return () => clearTimeout(handle);
    }
  }, [active, value]);

  return { isDebouncing, debouncedValue };
}

export default useDebounce;
