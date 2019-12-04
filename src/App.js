/**
 * Date : 25/11/2019
 * Time : 19:16
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */


import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

/**
 * Redux utility
 */
import { Provider } from 'react-redux'
import store from './Utils/Redux/store'

/**
 * Screens
 */
import Landing from './Screens/Landing'
import Login from './Screens/Login'
import Register from './Screens/Register'


class App extends Component {

  render () {
    return (
      <Router>
        <Switch>
          <Route
            path='/login'
            component={Login}
          />
          <Route
            path='/signup'
            component={Register}
          />
          <Route
            exact
            path='/'
            component={Landing}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
