import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes/route';
import { GlobalStyle } from './styles/style';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
    <GlobalStyle />
  </React.StrictMode>
);
