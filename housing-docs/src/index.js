import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import {BrowserRouter as Router} from 'react-router-dom';

import ClassGen from './ClassGen';
const prefix = ClassGen();

const generateClassName = createGenerateClassName({
  productionPrefix: prefix,
});

ReactDOM.render(
  // <React.StrictMode>
    <StylesProvider generateClassName={generateClassName}>
      <Router>
        <App />
      </Router>
    </StylesProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
