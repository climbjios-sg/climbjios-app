import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { authProviderFactory } from './authProviders';
import { DEFAULT_AUTH_PROVIDER } from './config';
import snackbarUtil from './utils/snackbarUtil';
import { Button } from '@mui/material';
// ----------------------------------------------------------------------

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const renderRoot = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  const authProvider = await authProviderFactory(DEFAULT_AUTH_PROVIDER);

  root.render(
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App authProvider={authProvider} />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
};

renderRoot();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register({
  onUpdate: registration => {
  setTimeout(() => snackbarUtil.warning(
    'A new version of ClimbJios is available! Reload the page to update now?',
    {
      persist: true,
      action: snackbarId => (
        <>
          <Button onClick={() => {
            if (registration && registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
            snackbarUtil.closeSnackbar(snackbarId)
            window.location.reload();
          }}>Yes</Button>
          <Button onClick={() => snackbarUtil.closeSnackbar(snackbarId)}>No</Button>
        </>
      )
    }), 1000);
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
