import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import { JsonViewerProps } from './JsonViewer.types';
import StyledJsonViewer from './JsonViewer.styled';
import { ClassNameHelper } from '../../../../utils/helpers';
import { useEffect, useRef, useState } from 'react';
import { Switch } from '../..';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../utils/hooks';

export default function JsonViewer({ json, initStyle, allowThemeSwitch = true }: JsonViewerProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Components.JsonViewer');
  const darkOption = t(path('Dark'));
  const lightOption = t(path('Light'));
  const [themeOption, setThemeOption] = useState(initStyle === 'light' ? lightOption : darkOption);

  const classes = ClassNameHelper.conditional({
    ['im-json-viewer']: true,
    ['im-light']: themeOption === lightOption,
    ['im-dark']: themeOption === darkOption,
  });

  const handleExpand = () => {
    const stringified = JSON.stringify(json);

    if (stringified === '[]' || stringified === '{}') {
      return () => false;
    }

    return allExpanded;
  };

  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const jonViewDev = viewerRef.current?.children[0];

    jonViewDev?.classList.add('im-json-viewer-added');
  }, [themeOption]);

  return (
    <StyledJsonViewer className={classes} ref={viewerRef}>
      <JsonView data={json} shouldInitiallyExpand={handleExpand()} style={themeOption === lightOption ? defaultStyles : darkStyles} />
      {allowThemeSwitch && (
        <div className="im-json-viewer-switch">
          <Switch onChange={(value) => setThemeOption(value)} leftOption={darkOption} rightOption={lightOption} />
        </div>
      )}
    </StyledJsonViewer>
  );
}
