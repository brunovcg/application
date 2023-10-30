import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './locales/i18n';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Environment, ReactQueryConfigs } from './configs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/primereact.min.css';
import 'react-json-view-lite/dist/index.css';
import DebugDevTools from './utils/debug/DebugDevTools';
import { GlobalProvider } from './contexts/Global.context';

const queryClient = new QueryClient();

const { initialIsOpen, position } = ReactQueryConfigs.devTools;

const root = ReactDOM.createRoot(document.getElementById('im-app-root') as HTMLElement);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GlobalProvider>
            <DebugDevTools />
            <App />
            <GlobalStyles />
            <ToastContainer />
            {Environment.mode === 'development' && <ReactQueryDevtools initialIsOpen={initialIsOpen} position={position} />}
          </GlobalProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
