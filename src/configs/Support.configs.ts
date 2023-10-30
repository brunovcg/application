abstract class SupportConfigs {
  static supportedBrowsers = {
    'chrome': 'chrome',
    'firefox': 'firefox',
    'edge-chromium': 'edge',
    'ios': 'ios_saf',
    'opera': 'opera',
    'safari': 'safari',
  };

  static resolutions = {
    mobileBreakpoint: '420px', // must be set as a string using pixels e.g. '400px'
    maxResolution: '2500px',
    desktopMinBreakpoint: '800px', // must be set as a string using pixels e.g. '400px'
  };
}

export default SupportConfigs;
