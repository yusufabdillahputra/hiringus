/**
 * Date : 29/11/2019
 * Time : 01:27
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ButtonLogin extends Component {
  render () {
    return (
      <div className="btn-group" role="group">
        <Link to={this.props.to} className="btn btn-rounded btn-dual-secondary" id="page-header-user-dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-sign-in"/>
        </Link>
      </div>
    )
  }
}

export default ButtonLogin