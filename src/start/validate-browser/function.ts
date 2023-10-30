import semver from 'semver';
import { IsBrowserUpToDateArgs } from './types';
import { detect } from 'detect-browser';
import lite from 'caniuse-lite';
import { SupportConfigs } from '../../configs';

const { supportedBrowsers } = SupportConfigs;

const convertVersionFormat = (raw: number | string | null | undefined) => semver.coerce(raw)?.version ?? '';
export const getLastVersion = (versionObject?: { [key: string | number]: number | null | undefined }) => {
  if (!versionObject) {
    return null;
  }
  const entries = Object.entries(versionObject);

  for (let i = entries.length - 1; i >= 0; i--) {
    const [key, value] = entries[Number(i)];

    if (value) {
      return { lastReleasedVersion: key, release: value };
    }
  }

  return null;
};

const IsBrowserUpToDate = (args: IsBrowserUpToDateArgs) =>
  semver.gte(convertVersionFormat(args.installedVersion), convertVersionFormat(args.lastReleasedVersion));

export const checkBrowserCompatibility = () => {
  const { name, version: installedVersion } = detect() ?? { name: '', version: '' };
  const { agents } = lite;
  const userBrowser = supportedBrowsers[name as keyof typeof supportedBrowsers];

  if (!userBrowser) {
    return 'unsupported';
  } else {
    const userBrowserDetails = agents[userBrowser as keyof typeof agents];

    const { lastReleasedVersion } = getLastVersion(userBrowserDetails?.release_date) ?? {};

    const isUpToDate = IsBrowserUpToDate({ installedVersion, lastReleasedVersion });

    if (!isUpToDate) {
      return 'outdated';
    }
  }
  return null;
};
