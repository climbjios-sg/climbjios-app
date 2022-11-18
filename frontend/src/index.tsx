import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { authProviderFactory } from './authProviders';
import { DEFAULT_AUTH_PROVIDER, isDebug } from './config';

// ----------------------------------------------------------------------

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const DebugRouter = ({ children }: React.PropsWithChildren<unknown>) => {
  const location = useLocation();
  if (isDebug) {
    console.log(
      `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(location.state)}`
    );
  }

  return <>{children}</>;
};

const renderRoot = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  const authProvider = await authProviderFactory(DEFAULT_AUTH_PROVIDER);

  root.render(
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <DebugRouter>
            <App authProvider={authProvider} />
          </DebugRouter>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
};

renderRoot();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
