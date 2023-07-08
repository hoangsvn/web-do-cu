import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
 

// css
 
import './Css/index.css';
import './Css/App.css';
import './Css/Header.css'
import './Css/Footer.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

 
