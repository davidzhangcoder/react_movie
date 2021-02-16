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
// Done - 2.scroll
// 3. loading 蒙版
// Done - 4. optimize scroll to component
// 5. scroll 防抖
// 6. svg

//20210130 - 
// eslint, 
// babel, 
// Done - javascript, 
// Done - scroll, 
// search, 
// skeleton

// 20210201
// 在hot list tab, 点浏览器刷新button, 会加载recommand和hot, 但地址栏是recommand

//learned
// 1.上下布局
// 2.等分
// 3.better-scroll
// 4.input不能有伪元素
// 5.Search Box 要分为input和X (如需要X)