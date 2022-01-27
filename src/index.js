import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AdminStore} from './stores/AdminStore.tsx';
import { Provider } from 'mobx-react'
import { UserStore } from './stores/UserStore';
// import { BrowserRouter } from 'react-router-dom';

const adminStore =  new AdminStore()
const userStore = new UserStore()
const store = {
  adminStore,
  userStore
}

ReactDOM.render(
  // <BrowserRouter>
    <Provider {...store}><App /></Provider>
  // </BrowserRouter>
  ,document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
