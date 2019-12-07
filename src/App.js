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
import store from './Utils/redux/store'

/**
 * Screens
 */
import Landing from './Screens/Landing'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Profile from './Screens/Profile'
import Company from './Screens/Company'
import FormCompany from './Screens/FormCompany'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              exact
              path='/login'
              component={Login}
            />
            <Route
              exact
              path='/signup'
              component={Register}
            />
            <Route
              exact
              path='/'
              component={Landing}
            />
            <Route
              exact
              path='/profile'
              component={Profile}
            />
            <Route
              exact
              path='/company'
              component={Company}
            />
            <Route
              exact
              path='/company/:id_company'
              component={FormCompany}
            />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
