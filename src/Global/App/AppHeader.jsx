/**
 * Date : 25/11/2019
 * Time : 19:45
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import JWT from 'jsonwebtoken'
import { Link } from 'react-router-dom'

import ImageLogo from '../../../assets/image/app/logo.png'

import { axiosGet } from '../../../helper/axios'
import ButtonIsAuth from '../header/ButtonIsAuth'
import ButtonLogin from '../header/ButtonLogin'

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
    const getUsers = await axiosGet(`/auth/token/${decode.payload.id_users}`)
    if (this.state.jwt === getUsers.data.result.remember_token) {
      this.setState({
        name_users: decode.payload.name_users,
        auth: true
      })
    }
    if (this.state.jwt !== getUsers.data.result.remember_token) {
      this.setState({
        auth: false
      })
    }
  }

  render () {
    return (
      <header id='page-header' className='bg-gd-lake'>
        <div className='content-header'>
          <div className='content-header-section'>
            <div className='content-header-item'>
              <Link className='link-effect font-w700' to='/'>
                <img className='mr-4' alt='Logo' width={51} src={ImageLogo}/>
                <span className='font-size-xl text-dual-primary-dark'>Hiring</span>
                <span className='font-size-xl text-dual-primary-dark'>Us</span>
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
