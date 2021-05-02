import React from 'react'
// import { createBrowserHistory } from 'history'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Welcome from './welcome'
import Picks from './picks'
import Thanks from './thanks'
import 'antd/dist/antd.css'
import './index.css'

// const history = createBrowserHistory()

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route path="/picks" component={Picks} />
        <Route path="/thanks" component={Thanks} />
        <Route path="/" component={Welcome} />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
)
