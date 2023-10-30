import { useContext, useMemo, useState } from 'react';
import { StyledDevToolsButton } from './DebugDevTools.styled';

import { ButtonIcon, Portal } from '../../view/components';
import { DebugConsole } from './components/debug-console/DebugConsole';
import { DOMHelper } from '../helpers';
import { Environment } from '../../configs';
import { DialogsContext } from '../../contexts/modules/dialogs/DialogsContext';

export default function DebugDevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const { dialogSubscriptions } = useContext(DialogsContext);

  const zIndex = useMemo(() => {
    const nextIndex = DOMHelper.windowNextZIndex();
    const dialogZIndex = Math.max(...Object.values(dialogSubscriptions).map((item) => item.zIndex));

    return nextIndex > dialogZIndex ? nextIndex : dialogZIndex + 1;
  }, [dialogSubscriptions]);

  if (Environment.mode !== 'development') {
    return null;
  }

  return (
    <Portal
      element={
        <div className="im-debug-dev-tools">
          <StyledDevToolsButton zIndex={zIndex}>
            {!isOpen && (
              <ButtonIcon inverted icon="bug" size="large" onClick={() => setIsOpen(true)} variant="error" stopPropagation preventDefault />
            )}
          </StyledDevToolsButton>
          <DebugConsole setIsOpen={setIsOpen} isOpen={isOpen} zIndex={zIndex} />
        </div>
      }
      targetId="im-app-debug-root"
    />
  );
}
