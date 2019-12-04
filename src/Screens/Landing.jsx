/**
 * Date : 04/12/2019
 * Time : 09:14
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import AppWrapper from '../Global/App/AppWrapper'
//import { getUsers } from '../Utils/redux/actions/users'
const catchStateActionRedux = stateAction => {
  return {
    data: stateAction
  }
}

class Landing extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <AppWrapper>
        Landing
      </AppWrapper>
    )
  }
}

export default connect(catchStateActionRedux)(Landing)