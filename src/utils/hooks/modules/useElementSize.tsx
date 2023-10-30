import { MutableRefObject, useLayoutEffect, useState } from 'react';

type Size = {
  width: number;
  height: number;
};

export default function useElementSize(ref: MutableRefObject<HTMLElement>) {
  const [elementSize, setElementSize] = useState<Size>({ width: ref.current?.offsetWidth ?? 0, height: ref.current?.offsetHeight ?? 0 });

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      setElementSize({ width: ref.current?.offsetWidth, height: ref.current?.offsetHeight });
    });

    observer.observe(ref?.current);

    return () => observer.disconnect();
  }, [ref.current?.offsetWidth, ref.current?.offsetHeight]);

  return { elementSize };
}
