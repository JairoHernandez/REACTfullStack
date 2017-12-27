import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers'; // Remebers inde.js is imported by default.
const store = createStore(reducers, {}, applyMiddleware());

// Remember <App /> is a component instance.
ReactDOM.render(
    <Provider store={store}><App/></Provider>, 
    document.querySelector('#root')
);