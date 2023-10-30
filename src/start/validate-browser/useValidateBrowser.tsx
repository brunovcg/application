import { useContext, useEffect } from 'react';

import { checkBrowserCompatibility } from './function';
import { DialogsContext } from '../../contexts/modules/dialogs/DialogsContext';

export default function useValidateBrowser() {
  const { openDialog } = useContext(DialogsContext);
  const browserSupport = checkBrowserCompatibility();

  useEffect(() => {
    if (browserSupport === 'outdated') {
      openDialog({ id: 'BrowserCompatibilityDialog', props: { instance: 'outdated' } });
    }
    if (browserSupport === 'unsupported') {
      openDialog({ id: 'BrowserCompatibilityDialog', props: { instance: 'unsupported' } });
    }
  }, []);
}
