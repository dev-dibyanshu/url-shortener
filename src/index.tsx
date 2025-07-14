import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you wat to strt measuring perormance in your app, pass a functon
// to log eslts (for example: reportWbVitals(console.log))
// or send to an analytics endpoint.Lear more: https://bit.ly/CRA-vitals
reportWebVitals();
