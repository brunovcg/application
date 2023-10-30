import { useEffect, useMemo, useState } from 'react';
import { ClassNameHelper } from '../../../helpers';
import { StyledTabContainerRenderer, StyledTabsRenderer } from './useTabs.styled';
import { UseTabsModules, UseTabsProps } from './useTabs.types';
import { useCurrentRoute } from '../../../../router/useCurrentRoute';
import useFirstRender from '../useFirstRender';

const formatTabId = (tabName: string) => encodeURIComponent(tabName);

const handleModuleSelection = ({
  activeModules,
  initialSelection,
  urlSearch,
}: {
  activeModules: UseTabsModules;
  initialSelection?: string;
  urlSearch?: string;
}) => {
  if (urlSearch) {
    return urlSearch;
  }

  if (initialSelection) {
    return activeModules.find((module) => module?.name === initialSelection)?.name;
  }

  return formatTabId(activeModules[0]?.name);
};

export default function useTabs({ modules, initialSelection, tabContainerSize, tabsClassName, tabsContainerClassName }: UseTabsProps) {
  const activeModules = modules.filter((module) => !module.hide);

  const { isFirstRender } = useFirstRender();

  const { handleRouteSearch, getRouteSearch } = useCurrentRoute();

  const urlSearch = getRouteSearch().tab;

  const initialSelectedModule = handleModuleSelection({ activeModules, initialSelection, urlSearch });

  const [selectedModule, setSelectedModule] = useState<(typeof modules)[number]['name']>(initialSelectedModule as string);

  const selectTab = (tabName: (typeof modules)[number]['name']) => setSelectedModule(formatTabId(tabName));

  const selectedModuleContainer = modules.find((module) => formatTabId(module?.name) === selectedModule)?.component;

  const tabsClasses = ClassNameHelper.conditional({
    ['im-tabs']: true,
    [tabsClassName as string]: !!tabsClassName,
  });

  const tabsOptionClasses = (name: string) =>
    ClassNameHelper.conditional({
      ['im-tabs-module-option']: true,
      ['im-selected']: formatTabId(name) === selectedModule,
    });

  const tabsRendererContainerClasses = ClassNameHelper.conditional({
    ['im-tabs-renderer-container']: true,
    [tabsContainerClassName as string]: !!tabsContainerClassName,
  });

  const tabsRenderer = (
    <StyledTabsRenderer className={tabsClasses}>
      {activeModules.map((module) => (
        <div
          className={tabsOptionClasses(module.name)}
          key={module.name}
          onClick={() => {
            const tabId = formatTabId(module.name);
            setSelectedModule(tabId);
            handleRouteSearch({ remove: ['tab'], add: { tab: tabId } });
          }}
        >
          {module.name}
        </div>
      ))}
    </StyledTabsRenderer>
  );

  const tabContainerRenderer = (
    <StyledTabContainerRenderer width={tabContainerSize?.width} height={tabContainerSize?.height} className={tabsRendererContainerClasses}>
      {selectedModuleContainer}
    </StyledTabContainerRenderer>
  );

  useEffect(() => {
    if (activeModules.length) {
      handleRouteSearch({ remove: ['tab'], add: { tab: initialSelectedModule as string } });
    }
  }, []);

  useEffect(() => {
    if (activeModules.length && !isFirstRender) {
      setSelectedModule(handleModuleSelection({ activeModules, urlSearch }) as string);
    }
  }, [urlSearch]);

  return useMemo(() => ({ tabsRenderer, tabContainerRenderer, selectTab }), [{ tabsRenderer, tabContainerRenderer, selectTab }]);
}
