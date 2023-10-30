import { useEffect, useRef, useState } from 'react';
import { PortalProps } from './Portal.types';
import { createPortal } from 'react-dom';

export default function Portal({ element, className, targetId }: PortalProps) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById(targetId);
    setMounted(true);
  }, []);

  if (className) {
    return mounted && ref.current ? createPortal(<div className={className}>{element}</div>, ref.current) : null;
  }

  return mounted && ref.current ? createPortal(element, ref.current) : null;
}
