import { useMemo, useRef, useState } from 'react';
import { Button, ButtonIcon, ImLogo } from '../../../../view/components';
import { useMouseDragMoveDelta } from '../../../hooks';
import { StyledDevToolsLog } from '../../DebugDevTools.styled';
import { DebugHeaderButton, debugMenuButtons } from '../../DebugDevTools.types';
import DebugIcons from '../../modules/debug-icons/DebugIcons';
import DebugQueries from '../../modules/debug-queries/DebugQueries';
import DebugSession from '../../modules/debug-session/DebugSession';
import { DebugStorage } from '../../modules/debug-storage/DebugStorage';
import { DebugConsoleProps } from './DebugConsole.types';
import './DebugConsole.scss';

export function DebugConsole({ setIsOpen, isOpen, zIndex }: DebugConsoleProps) {
  const { handler, delta, reset } = useMouseDragMoveDelta();
  const [selected, setSelected] = useState<DebugHeaderButton>('Logs');
  const checkSelected = (module: DebugHeaderButton) => (selected === module ? 'warning' : 'primary');
  const [isExpanded, setIsExpanded] = useState(false);

  const menuHeight = useRef(300);

  const height = useMemo(() => {
    const variation = menuHeight.current - delta.y;

    if (delta.y !== 0) {
      setIsExpanded(true);
    }

    return variation;
  }, [delta.y, isExpanded]);

  return (
    <div className={`im-debug-dev-tools-container ${isOpen ? 'im-opened' : 'im-closed'}`} style={{ zIndex, height }}>
      <div className="im-debug-dev-tools-header">
        <div className="im-debug-dev-tools-header-left">
          <div className="im-debug-tools-logo">
            <ImLogo size="small" type="only-gears" backgroundWhite />
            <h4>IM Dev Tools Console</h4>
          </div>
          <div className="im-debug-dev-tools-header-buttons">
            {debugMenuButtons.map((bt) => (
              <Button key={bt} text={bt} onClick={() => setSelected(bt)} variant={checkSelected(bt)} styling="regular" />
            ))}
          </div>
        </div>
        <div className="im-debug-dev-tools-header-actions">
          {!isExpanded && <ButtonIcon icon="resize" onMouseDown={handler} className="im-debug-resize" />}
          {isExpanded && (
            <ButtonIcon
              icon="collapse"
              onClick={() => {
                reset();
                setIsExpanded(false);
              }}
              className="im-debug-resize"
            />
          )}
          <ButtonIcon icon="close" onClick={() => setIsOpen(false)} stopPropagation preventDefault className="im-debug-dev-tools-close" />
        </div>
      </div>
      <div className="im-debug-dev-tools-body">
        <StyledDevToolsLog
          id="im-debug-dev-tools-log"
          className={`im-debug-dev-tools-log ${selected !== 'Logs' ? 'im-not-selected' : ''}`}
        />
        {selected === 'Queries' && <DebugQueries />}
        {selected === 'Session' && <DebugSession />}
        {selected === 'Icons' && <DebugIcons />}
        {selected === 'Storage' && <DebugStorage />}
      </div>
    </div>
  );
}
