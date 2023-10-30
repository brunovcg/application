import type { Preview } from '@storybook/react';
import React, { Suspense, useEffect } from 'react';
import GlobalStyles from '../src/styles/GlobalStyles';
import i18n from '../src/locales/i18n';
import { I18nextProvider } from 'react-i18next';
import { withConsole } from '@storybook/addon-console';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort(a, b) {
        return a.title === b.title ? 0 : a.title.localeCompare(b.title, undefined, { numeric: true });
      },
    },
  },
};

export default preview;

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [{ value: 'en', title: 'English' }],
      showName: true,
    },
  },
};

const withGlobalStyle = (Story) => (
  <>
    <GlobalStyles />
    <Story />
  </>
);

const withI18next = (Story, context) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

export const decorators = [withI18next, withGlobalStyle];
