export type BrowserSupport = null | 'unsupported' | 'outdated';

export type IsBrowserUpToDateArgs = {
  installedVersion: number | string | null | undefined;
  lastReleasedVersion: number | string | null | undefined;
};
