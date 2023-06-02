import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import App from './App.jsx';

import "./style.css";
import "primereact/resources/primereact.min.css";                
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
)
