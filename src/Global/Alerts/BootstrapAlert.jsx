/**
 * Date : 27/11/2019
 * Time : 20:10
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

class BootstrapAlert extends Component {
  render () {
    if (this.props.statusAlert === true) {
      return (
        <div className={`alert alert-${this.props.color} alert-dismissable animated ${this.props.animated}`} role='alert'>
          <h3 className='alert-heading font-size-h4 font-w400'>{this.props.title}</h3>
          <p className='mb-0'>{this.props.message}</p>
        </div>
      )
    } if (this.props.statusAlert === false) {
      return null
    }
  }
}

export default BootstrapAlert
