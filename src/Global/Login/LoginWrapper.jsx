/**
 * Date : 04/12/2019
 * Time : 09:23
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

class LoginWrapper extends Component {
  render () {
    return (
      <div id='page-container' className='main-content-boxed'>
        {this.props.children}
      </div>
    )
  }
}

export default LoginWrapper
