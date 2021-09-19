import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import reducers from './reducers';
import middleware from './middleware';

import App from './App';
import "./index.css"

const myStore = createStore(reducers, compose(middleware));

ReactDOM.render(
    <Provider store={myStore}>
        <App /> 
    </Provider>,
    document.getElementById('root')
);