import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './app'
import store from './redux/store'

import './css/normalize.css'
import './css/reset.css'
import './css/index.css'

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    , document.getElementById('app'))

// 1.切换tab,不需要retrieve data
// 2.scroll
// 3.loading 蒙版