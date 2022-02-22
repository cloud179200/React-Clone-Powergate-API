import { LocalizationProvider } from '@mui/lab';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import smoothscroll from 'smoothscroll-polyfill';
import App from './App';
import './index.css';
import ConnectedIntlProvider from './modules/intl/component/ConnectedIntlProvider';
import { setLocale } from './modules/intl/redux/intlReducer';
import configureStore, { history } from './redux/configureStore';
import reportWebVitals from './reportWebVitals';
import AdapterDateFns from "@mui/lab/AdapterDateFns"

smoothscroll.polyfill();

const { store, persistor } = configureStore({});

store.dispatch(setLocale('vi'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ConnectedIntlProvider defaultLocale='vi'>
              <App />
            </ConnectedIntlProvider>
          </LocalizationProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
