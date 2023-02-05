import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss'
import App from './container/App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n';
//import AuthenticationContext from './shared/AuthenticationContext';
import {Provider} from 'react-redux';
import configStore from './redux/configStore.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configStore();

root.render(
  <Provider store={store}>
  <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
