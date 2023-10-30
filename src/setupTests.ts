import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// this mock makes sure that all components using the translate hook can use it without a warning being shown
// jest.mock('react-i18next', () => ({
//   useTranslation: () => ({
//     t: (str: string) => str,
//     i18n: {
//       changeLanguage: () => new Promise(() => {}),
//     },
//   }),
//   initReactI18next: {
//     type: '3rdParty',
//     init: () => {},
//   },
// }));

// Mocking Resize Observer
class ResizeObserver {
  observe() {}

  unobserve() {}

  connect() {}

  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

afterEach(() => {
  cleanup();
});
