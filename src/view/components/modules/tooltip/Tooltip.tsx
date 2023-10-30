import { StyledTooltip, StyledTooltipContent } from './Tooltip.styled';
import { TooltipProps } from './Tooltip.types';
import { Ref, useEffect, useState } from 'react';
import { SetTimeout } from '../../../../types';
import { usePopper, useDevice } from '../../../../utils/hooks';
import { Portal } from '../..';
import { DOMHelper } from '../../../../utils/helpers';

export default function Tooltip({ trigger, content, enabled = true, side, delay = 1000, autoEllipsis = true, help = true }: TooltipProps) {
  const { styles, attributes, setReferenceElement, setPopperElement } = usePopper({ side, distance: 5 });
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [delayHandler, setDelayHandler] = useState<SetTimeout>(null as unknown as SetTimeout);
  const [showTooltip, setShowTooltip] = useState(false);
  const { isTouchScreenDevice, isMobile } = useDevice();

  const handleOnMouseOver = () => setMouseIsOver(true);
  const handleOnMouseOut = () => setMouseIsOver(false);

  useEffect(() => {
    if (mouseIsOver) {
      setDelayHandler(
        setTimeout(() => {
          setShowTooltip(true);
        }, delay)
      );
    } else {
      clearTimeout(delayHandler);
      setShowTooltip(false);
    }

    return () => clearTimeout(delayHandler);
  }, [mouseIsOver]);

  if (!enabled) {
    return null;
  }

  //

  const contentWrapper = (
    <StyledTooltipContent
      zIndex={DOMHelper.windowNextZIndex()}
      className="im-tooltip-content"
      ref={setPopperElement as Ref<HTMLDivElement>}
      style={styles.popper}
      {...attributes.popper}
    >
      {content}
    </StyledTooltipContent>
  );

  return (
    <StyledTooltip
      ref={setReferenceElement as Ref<HTMLDivElement>}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseOut}
      onMouseOut={handleOnMouseOut}
      className="im-tooltip"
      autoEllipsis={autoEllipsis}
      help={help}
    >
      <div className="im-tooltip-trigger">{trigger}</div>
      {showTooltip && !isMobile && !isTouchScreenDevice && <Portal element={contentWrapper} targetId="im-app-tooltip-root" />}
    </StyledTooltip>
  );
}
