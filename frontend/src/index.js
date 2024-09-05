import React , {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TestApp from './TestApp';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.css";
import "./css/normalize.css";
import "./css/styles.css";
// import "./css/react_table.css"
import {ToastContainer} from 'react-toastify'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Sentry.init({
//   dsn: "https://2cac09dfdbb94eaca3ba4153e393a0af@o4504869024759808.ingest.sentry.io/4504869027577856",
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 0.2,
// });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ToastContainer/>
      <BrowserRouter>
          {/* <TestApp /> */}
          <App />
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
