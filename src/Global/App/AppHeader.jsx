/**
 * Date : 25/11/2019
 * Time : 19:45
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import JWT from 'jsonwebtoken'
import { Link } from 'react-router-dom'

import ImageLogo from '../../Assets/Image/Logo/logo_transparant.png'

import { get } from '../../Utils/axios'
import ButtonIsAuth from './Header/ButtonIsAuth'
import ButtonLogin from './Header/ButtonLogin'

class AppHeader extends Component {
  constructor (props) {
    super(props)

    const jwt = localStorage.getItem('jwt')

    this.state = {
      name_users: null,
      auth: null,
      jwt: jwt
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.statusLogout !== prevProps.statusLogout) {
      this.setState({
        auth: false
      })
    }
  }

  async componentDidMount () {
    if (this.state.jwt !== null) {
      const decode = JWT.decode(this.state.jwt, {complete: true})
      await this.getUsers(decode)
    } else {
      this.setState({
        auth: false,
        jwt: null
      })
    }
  }

  async getUsers (decode) {
    const idUsers = decode.payload.id_users
    const apiUsersToken = await get(`/users/id/${idUsers}`)
    const apiToken = apiUsersToken.data.payload.rows[0].remember_token
    if (this.state.jwt === apiToken) {
      this.setState({
        name_users: decode.payload.name_users,
        auth: true
      })
    }
    if (this.state.jwt !== apiToken) {
      this.setState({
        auth: false
      })
    }
  }

  render () {
    return (
      <header id='page-header' className='bg-primary'>
        <div className='content-header'>
          <div className='content-header-section'>
            <div className='content-header-item'>
              <Link to='/'>
                <img alt='Logo' width={150} src={ImageLogo} />
              </Link>
            </div>
          </div>
          <div className="content-header-section">
            {
              (this.state.auth === true)
                ? <ButtonIsAuth
                  name_users={this.state.name_users}
                />
                : null
            }
            {
              (this.props.statusLogout === false || this.state.jwt === null)
                ? <ButtonLogin
                  to={'/login'}
                />
                : null
            }
          </div>
        </div>
      </header>
    )
  }
}

export default AppHeader
