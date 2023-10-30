import { MouseEvent, useRef, useState } from 'react';

export const useMouseDragMoveDelta = () => {
  const initialAxis = useRef({ x: 0, y: 0 });
  const [currentAxis, setCurrentAxis] = useState({ x: 0, y: 0 });

  const reset = () => {
    initialAxis.current = { x: 0, y: 0 };
    setCurrentAxis({ x: 0, y: 0 });
  };

  const handler = (mouseDownEvent: MouseEvent) => {
    const startAxis = currentAxis;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    initialAxis.current = startPosition;
    function onMouseMove(mouseMoveEvent: MouseEvent) {
      setCurrentAxis(() => ({
        x: startAxis.x - startPosition.x + mouseMoveEvent.pageX,
        y: startAxis.y - startPosition.y + mouseMoveEvent.pageY,
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener('mousemove', onMouseMove as unknown as EventListenerOrEventListenerObject);
      document.body.removeEventListener('mouseup', onMouseUp as unknown as EventListenerOrEventListenerObject);
    }

    initialAxis.current = currentAxis;

    document.body.addEventListener('mousemove', onMouseMove as unknown as EventListenerOrEventListenerObject);
    document.body.addEventListener('mouseup', onMouseUp as unknown as EventListenerOrEventListenerObject);
  };

  return { handler, reset, delta: { x: currentAxis.x - initialAxis.current.x, y: currentAxis.y - initialAxis.current.y } };
};
