/**
 * Date : 04/12/2019
 * Time : 09:14
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import JWT from 'jsonwebtoken'

/**
 * Image
 */
import bgLoginInverse from '../Assets/Image/Background/bg_login_inverse.png'
import logoTransaprant from '../Assets/Image/Logo/logo_transparant.png'

/**
 * Global
 */
import LoginWrapper from '../Global/Login/LoginWrapper'
import { post, get } from '../Utils/axios'
import BootstrapAlert from '../Global/Alerts/BootstrapAlert'

const styleCss = {
  background : {
    backgroundImage: `url(${bgLoginInverse})`
  },
  headerTitle : {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitle : {
    lineHeight: 1.5
  }
}

class Login extends Component {

  constructor(props) {
    super(props)

    const jwt = localStorage.getItem('jwt')
    if (jwt !== null) {
      const decode = JWT.decode(jwt, {complete: true})
      this.checkLogin(jwt, decode)
    }

    this.state = {
      isAuth : false,
      alert : false,
      alertTitle : null,
      alertColor : null,
      alertMessage : null,
    }

  }

  async checkLogin (jwt, decode) {
    const idUsers = decode.payload.id_users
    const apiUsersToken = await get(`/users/id/${idUsers}`)
    const apiToken = apiUsersToken.data.payload.rows[0].remember_token
    if (jwt === apiToken) {
      this.setState({
        isAuth: true
      })
    }
    if (jwt !== apiToken) {
      this.setState({
        isAuth: false
      })
    }
  }

  initialValues = {
    username_users: '',
    password_users: ''
  }

  validateHandler = values => {
    const errors = {};
    if (!values.username_users) {
      errors.username_users = 'Username cannot be empty'
    } if (!values.password_users) {
      errors.password_users = 'Password cannot be empty'
    }
    return errors;
  }

  onSubmitHandler = async (values, { setSubmitting  }) => {
    const responseApi = await post('/auth/login', values)
    this.isAuthentication(responseApi)
    setSubmitting(false)
  }

  isAuthentication (responseApi) {
    const status = responseApi.data.status
    if (status === 200) {
      const token = responseApi.data.payload.token
      localStorage.clear()
      localStorage.setItem('jwt', token)
      this.setState({
        isAuth : true
      })
    } if (status === 401) {
      this.setState({
        alert : true,
        alertTitle : 'Unauthorized',
        alertColor : 'danger',
        alertMessage : 'Username or password is wrong',
      })
      setTimeout(() => {
        this.setState({
          alert : false,
          alertTitle : null,
          alertColor : null,
          alertMessage : null,
        })
      }, 4000)
    }
  }

  render () {
    if (this.state.isAuth) {
      return (
        <Redirect push to={'/'} />
      )
    }
    else {
      return (
        <LoginWrapper>
          <main id='main-container'>
            <div className='bg-body-dark bg-pattern' style={styleCss.background}>
              <div className='row mx-0 justify-content-center'>
                <div className='hero-static col-lg-6 col-xl-4'>
                  <div className='content content-full overflow-hidden'>
                    <Formik
                      initialValues={this.initialValues}
                      validate={this.validateHandler}
                      onSubmit={this.onSubmitHandler}
                    >
                      {
                        ({isSubmitting}) => (
                          <Form>
                            <div className='block block-themed block-rounded block-shadow animated fadeIn'>
                              <div className='block-header-default border-bottom bg-primary text-center'>
                                <Link to='/'>
                                  <img className='img-fluid mt-3 mb-3' width={150} src={logoTransaprant} alt='Logo' />
                                </Link>
                              </div>
                              <div className='block-content border-bottom'>
                                <p className='block-title mb-1' style={styleCss.headerTitle}>
                                  Login
                                </p>
                                <p style={styleCss.subTitle}>
                                  Please login with your personal information by username and password <i className='si si-bell text-warning'></i>
                                </p>
                                <p style={styleCss.subTitle}>
                                  Dont't have an account ? <Link to='/signup'><u>Join Now</u></Link>
                                </p>

                              </div>
                              <div className='block-content'>
                                <div className="form-group row">
                                  <div className="col-12">
                                    <label>Username</label>
                                    <Field
                                      autoFocus
                                      className='form-control'
                                      type='text'
                                      name='username_users'
                                      placeholder='Enter username...'
                                    />
                                    <ErrorMessage name="username_users" className='animated fadeInDown text-danger mt-1' component="div" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12">
                                    <label>Password</label>
                                    <Field
                                      className='form-control'
                                      type='password'
                                      name='password_users'
                                      placeholder='Enter password...'
                                    />
                                    <ErrorMessage name="password_users" className='animated fadeInDown text-danger mt-1' component="div" />
                                  </div>
                                </div>
                              </div>
                              <div className='block-content block-content-full bg-body-light'>
                                <div className='row'>
                                  <div className='col-12'>
                                    <button type='submit' disabled={isSubmitting} className='btn btn-primary btn-block'>
                                      Login
                                    </button>
                                  </div>
                                  <div className='col-12 mt-3 text-center'>
                                    <Link className='link-effect text-muted d-inline-block' to='/forget'>
                                      <i className='si si-exclamation mr-5'/> Forgot Password ?
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form>
                        )
                      }
                    </Formik>

                    <BootstrapAlert
                      statusAlert={this.state.alert}
                      animated={'fadeIn'}
                      title={this.state.alertTitle}
                      message={this.state.alertMessage}
                      color={this.state.alertColor}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </LoginWrapper>
      )
    }
  }
}

export default Login