/**
 * Date : 04/12/2019
 * Time : 09:14
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

/**
 * Image
 */
import bgLoginInverse from '../Assets/Image/Background/bg_login_inverse.png'
import logoTransaprant from '../Assets/Image/Logo/logo_transparant.png'

/**
 * Global
 */
import LoginWrapper from '../Global/Login/LoginWrapper'

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

    this.state = {
      alert : false
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

  onSubmitHandler = (values, { setSubmitting  }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false)
    }, 400)
  }

  render () {
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
                </div>
              </div>
            </div>
          </div>
        </main>
      </LoginWrapper>
    )
  }
}

export default Login