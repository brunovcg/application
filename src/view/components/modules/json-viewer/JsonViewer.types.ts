export type JsonViewerTheme = 'dark' | 'light';

export type JsonViewerProps = {
  json: Record<string, unknown> | unknown[];
  initStyle: 'dark' | 'light';
  allowThemeSwitch?: boolean;
};
