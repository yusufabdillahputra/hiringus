/**
 * Date : 25/11/2019
 * Time : 19:16
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import ModalLogout from '../Modals/ModalLogout'

class AppWrapper extends Component {

  constructor(props){
    super(props)

    this.state = {
      isLogout : null
    }

  }

  stateModalLogout = (state) => {
    this.setState({
      isLogout: state
    })
  }

  render () {
    return (
      <div id='page-container' className='sidebar-inverse side-scroll page-header-fixed page-header-inverse main-content-boxed'>
        <AppHeader
          statusLogout={this.state.isLogout}
        />
        <main id='main-container'>
          {this.props.children}
        </main>
        <AppFooter />
        <ModalLogout
          returnStateLogout={this.stateModalLogout}
        />
      </div>
    )
  }
}

export default AppWrapper
