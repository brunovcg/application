import { MutableRefObject, useLayoutEffect, useState } from 'react';

export default function useElementTreeNextZIndex(ref: MutableRefObject<HTMLElement>, active: boolean | undefined = true) {
  const [nextZIndex, setNextZIndex] = useState(0);

  useLayoutEffect(() => {
    if (nextZIndex === 0 && active) {
      const calculateNextZIndex =
        Math.max(
          ...Array.from(ref?.current?.querySelectorAll('*') ?? [], (el) => {
            const current = parseFloat(window.getComputedStyle(el)?.zIndex);
            return Number.isNaN(current) ? 0 : current;
          }),
          0
        ) + 1;

      setNextZIndex(calculateNextZIndex);
    }
  }, [ref.current]);

  return nextZIndex;
}
