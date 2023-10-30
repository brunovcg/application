import { StyledPopoverContent, StyledPopoverTrigger } from './Popover.styled';
import { PopoverProps } from './Popover.types';
import { ClassNameHelper, DOMHelper } from '../../../../utils/helpers';
import { useState, MouseEvent, useRef, Ref, useMemo } from 'react';
import { useOnClickOutside, usePopper } from '../../../../utils/hooks';
import ButtonIcon from '../button-icon/ButtonIcon';
import { Portal } from '../..';

export default function Popover({ title, trigger, content, className, skidding, stopPropagation }: PopoverProps) {
  const classes = ClassNameHelper.conditional({
    ['im-popover']: true,
    [String(className)]: !!className,
  });

  const { styles, attributes, setReferenceElement, setPopperElement } = usePopper({
    distance: 5,
    position: 'absolute',
    skidding,
  });

  const [displayMenu, setDisplayMenu] = useState(false);

  const zIndex = useMemo(() => DOMHelper.windowNextZIndex(), [displayMenu]);

  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClickTrigger = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDisplayMenu((state) => !state);
  };

  useOnClickOutside([triggerRef, contentRef], () => setDisplayMenu(false));

  const contentRenderer = (
    <StyledPopoverContent
      className="im-popover-content"
      ref={setPopperElement as Ref<HTMLDivElement>}
      style={styles.popper}
      {...attributes.popper}
      zIndex={zIndex}
      onClick={(e) => {
        if (stopPropagation) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      {<ButtonIcon icon="cancel" size="tiny" className="im-popover-content-close" />}
      <div className="im-popover-content-data" ref={contentRef}>
        {title && <div className="im-popover-content-title">{title}</div>}
        {content}
      </div>
    </StyledPopoverContent>
  );

  return (
    <div className={classes} ref={triggerRef}>
      <StyledPopoverTrigger className="im-popover-trigger" onClick={handleClickTrigger} ref={setReferenceElement as Ref<HTMLDivElement>}>
        {trigger}
      </StyledPopoverTrigger>
      {displayMenu && <Portal element={contentRenderer} targetId="im-app-popover-root" />}
    </div>
  );
}
