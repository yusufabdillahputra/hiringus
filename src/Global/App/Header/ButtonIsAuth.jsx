/**
 * Date : 29/11/2019
 * Time : 01:24
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../Menu/Menu'
import JWT from 'jsonwebtoken'

class ButtonIsAuth extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isAuth: false,
      roleUsers: null
    }
  }

  async componentDidMount () {
    const jwt = localStorage.getItem('jwt')
    if (jwt !== null) {
      const decode = JWT.decode(jwt, {complete: true})
      const roleUsers = decode.payload.role_users
      await this.setState({
        isAuth: true,
        roleUsers: roleUsers
      })
    }
  }

  render () {
    return (
      <div className='btn-group' role='group'>
        <button
          type='button' className='btn btn-rounded btn-dual-secondary' id='page-header-user-dropdown'
          data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'
        >
          <i className='fa fa-user d-sm-none'/>
          <span className='d-none d-sm-inline-block'>{this.props.name_users}</span>
          <i className='fa fa-angle-down ml-5'/>
        </button>
        <div
          className='dropdown-menu dropdown-menu-right min-width-200'
          aria-labelledby='page-header-user-dropdown'
        >
          <Link className='dropdown-item' to='/profile'>
            <i className='si si-user mr-5'/> Profile
          </Link>
          <div className='dropdown-divider'/>
          {
            this.state.isAuth
              ? <Menu
                roleUsers={this.state.roleUsers}
              />
              : null
          }
          <button data-target='#modalLogout' data-toggle='modal' className='dropdown-item'>
            <i className='si si-logout mr-5'/> Logout
          </button>
        </div>
      </div>
    )
  }
}

export default ButtonIsAuth
