import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // 'react-redux' bridges communication between the two.
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; // Remebers index.js is imported by default.
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Remember <App /> is a component instance.
ReactDOM.render(
    <Provider store={store}><App/></Provider>, 
    document.querySelector('#root')
);

console.log('STRIPE KEY IS:', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);