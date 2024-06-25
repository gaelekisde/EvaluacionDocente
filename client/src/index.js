import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Register} from './pages/register/register';
import { Login } from './pages/login/login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
<Register  />
  </>
);
//<React.StrictMode>
    
//</React.StrictMode>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
