/**
 * Date : 04/12/2019
 * Time : 16:09
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { get, post } from '../Utils/axios'

/**
 * Image
 */
import bgLoginInverse from '../Assets/Image/Background/bg_login_inverse.png'
import logoTransaprant from '../Assets/Image/Logo/logo_transparant.png'

/**
 * Global
 */
import LoginWrapper from '../Global/Login/LoginWrapper'
import BootstrapAlert from '../Global/Alerts/BootstrapAlert'
import JWT from 'jsonwebtoken'

const styleCss = {
  background: {
    backgroundImage: `url(${bgLoginInverse})`
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitle: {
    lineHeight: 1.5
  }
}

class Register extends Component {

  constructor (props) {
    super(props)

    const jwt = localStorage.getItem('jwt')
    if (jwt !== null) {
      const decode = JWT.decode(jwt, {complete: true})
      this.checkLogin(jwt, decode)
    }

    this.state = {
      isAuth: false,
      isRegister: false,
      alert: false,
      alertTitle: null,
      alertColor: null,
      alertMessage: null,
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
    name_users: '',
    username_users: '',
    password_users: '',
    email_users: '',
    role_users: ''
  }

  validateHandler = values => {
    const errors = {};
    if (!values.name_users) {
      errors.name_users = 'Name cannot be empty'
    }
    if (!values.username_users) {
      errors.username_users = 'Username cannot be empty'
    }
    if (!values.password_users) {
      errors.password_users = 'Password cannot be empty'
    }
    if (!values.email_users) {
      errors.email_users = 'Email cannot be empty'
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_users)) {
      errors.email_users = 'Invalid format email'
    }
    if (!values.role_users) {
      errors.role_users = 'Role cannot be empty'
    }
    return errors;
  }

  onSubmitHandler = async (values, {setSubmitting}) => {
    const responseApi = await post('/auth/register', values)
    this.isNotUnique(responseApi)
    setSubmitting(false)
  }

  /**
   * Check is not unique, using error code 23505 postgresql
   * DOC : https://www.postgresql.org/docs/9.2/errcodes-appendix.html
   *
   * @param responseApi
   */
  isNotUnique (responseApi) {
    const serverUniqueCode = "23505"
    if (responseApi.data.payload.code === serverUniqueCode) {
      this.setState({
        alert: true,
        alertTitle: 'Unique !',
        alertColor: 'danger',
        alertMessage: 'Username or email already taken',
      })
      setTimeout(() => {
        this.setState({
          alert: false,
          alertTitle: null,
          alertColor: null,
          alertMessage: null,
        })
      }, 4000)
    }
    if (responseApi.data.payload.code !== serverUniqueCode) {
      this.setState({
        alert: true,
        alertTitle: 'Success',
        alertColor: 'success',
        alertMessage: 'Your account has been created, please wait for auto redirect in 4 seconds, if not redirect feel free to click "Back to login"',
      })
      setTimeout(() => {
        this.setState({
          isSuccess: true,
          alert: false,
          alertTitle: null,
          alertColor: null,
          alertMessage: null,
        })
      }, 4000)
    }
  }

  render () {
    if (this.state.isSuccess) {
      return (
        <Redirect push to={'/login'}/>
      )
    } if (this.state.isAuth) {
      return (
        <Redirect push to={'/'}/>
      )
    } else {
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
                                  <img className='img-fluid mt-3 mb-3' width={150} src={logoTransaprant} alt='Logo'/>
                                </Link>
                              </div>
                              <div className='block-content border-bottom'>
                                <p className='block-title mb-1' style={styleCss.headerTitle}>
                                  Register
                                </p>
                                <p style={styleCss.subTitle}>
                                  Please add your details account <i className='si si-bell text-warning'></i>
                                </p>
                                <p style={styleCss.subTitle}>
                                  Already have an account ? <Link to='/login'><u>Back to login</u></Link>
                                </p>

                              </div>
                              <div className='block-content'>
                                <div className="form-group row">
                                  <label className="col-12">Role</label>
                                  <div className="col-12">
                                    <div className="custom-control custom-radio custom-control-inline mb-5">
                                      <Field
                                        autoFocus
                                        className="custom-control-input"
                                        value='2'
                                        type="radio"
                                        name="role_users"
                                        id="role_engineer"
                                      />
                                      <label className="custom-control-label" htmlFor="role_engineer">Engineer</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline mb-5">
                                      <Field
                                        className="custom-control-input"
                                        value='3'
                                        type="radio"
                                        name="role_users"
                                        id="role_partner"
                                      />
                                      <label className="custom-control-label" htmlFor="role_partner">Partner</label>
                                    </div>
                                    <ErrorMessage name="role_users" className='animated fadeInDown text-danger mt-1'
                                                  component="div"/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12">
                                    <label>Name</label>
                                    <Field
                                      className='form-control'
                                      type='text'
                                      name='name_users'
                                      placeholder='Enter name...'
                                    />
                                    <ErrorMessage name="name_users" className='animated fadeInDown text-danger mt-1' component="div"/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12">
                                    <label>Username</label>
                                    <Field
                                      className='form-control'
                                      type='text'
                                      name='username_users'
                                      placeholder='Enter username...'
                                    />
                                    <ErrorMessage name="username_users" className='animated fadeInDown text-danger mt-1'
                                                  component="div"/>
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
                                    <ErrorMessage name="password_users" className='animated fadeInDown text-danger mt-1'
                                                  component="div"/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12">
                                    <label>Email</label>
                                    <Field
                                      className='form-control'
                                      type='text'
                                      name='email_users'
                                      placeholder='Enter email...'
                                    />
                                    <ErrorMessage name="email_users" className='animated fadeInDown text-danger mt-1'
                                                  component="div"/>
                                  </div>
                                </div>
                              </div>
                              <div className='block-content block-content-full bg-body-light'>
                                <div className='row'>
                                  <div className='col-12'>
                                    <button type='submit' disabled={isSubmitting} className='btn btn-primary btn-block'>
                                      Submit
                                    </button>
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

export default Register