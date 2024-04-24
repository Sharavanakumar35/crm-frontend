import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import { ContextProvider } from './contextAPI/context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <ContextProvider>
        <App />
      </ContextProvider>

  </React.StrictMode>
);
