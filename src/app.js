import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/main/Main'

export default function App() {
    return (
        <HashRouter>
            <Switch>
                {/* <Route path='/login' component={Login}></Route> */}
                {/* <Route path='/admin' component={Admin}></Route> */}
                <Route path="/" component={Main}></Route>
            </Switch>
        </HashRouter>
    )
}