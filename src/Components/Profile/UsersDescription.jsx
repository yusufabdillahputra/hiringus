/**
 * Date : 06/12/2019
 * Time : 18:43
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import LoadingComponent from '../../Global/Template/LoadingComponent'
import { put } from '../../Utils/axios'
import BootstrapAlert from '../../Global/Alerts/BootstrapAlert'

class UsersDescription extends Component {

  constructor (props) {
    super(props);

    this.state = {
      alert : false,
      alertTitle : null,
      alertColor : null,
      alertMessage : null,
    }
  }

  async componentDidMount () {
    console.log(this.props.dataProfile)
  }

  initialValues = {
    name_users: this.props.dataProfile.name_users,
    username_users: this.props.dataProfile.username_users,
    telp_users : this.props.dataProfile.telp_users,
    email_users : this.props.dataProfile.email_users,
    updated_by : this.props.dataProfile.id_users
  }

  validateHandler = values => {
    const errors = {};
    if (!values.name_users) {
      errors.name_users = 'Name cannot be empty'
    }
    if (!values.username_users) {
      errors.username_users = 'Username cannot be empty'
    }
    if (!values.email_users) {
      errors.email_users = 'Email cannot be empty'
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_users)) {
      errors.email = 'Invalid email address'
    }
    return errors;
  }

  onSubmitHandler = async (values, {setSubmitting}) => {
    const putData = await put(`/users/id/${values.updated_by}`, values)
    await console.log(putData)
    if (putData.data.payload.code === "23505") {
      await this.setState({
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
    if (putData.data.status === 200) {
      await this.setState({
        alert: true,
        alertTitle: 'Success',
        alertColor: 'success',
        alertMessage: 'Your account has been updated',
      })
      setTimeout(() => {
        this.setState({
          alert: false,
          alertTitle: null,
          alertColor: null,
          alertMessage: null,
        })
      }, 3000)
    }
    setSubmitting(false)
  }

  render () {
    if (this.state.isLoading) {
      return (
        <LoadingComponent
          icon={'fa-spinner'}
          message={'Please wait.....'}
          sizeIcon={4}
        />
      )
    } else {
      return (
        <div>
          <BootstrapAlert
            statusAlert={this.state.alert}
            animated={'fadeIn'}
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            color={this.state.alertColor}
          />
          <div className='block block-rounded'>
            <div className='block-header border-bottom bg-primary'>
              <h1 className='block-title text-white'>
                <i className={'si si-user'}/> Users Information
              </h1>
            </div>
            <Formik
              initialValues={this.initialValues}
              validate={this.validateHandler}
              onSubmit={this.onSubmitHandler}
            >
              {
                ({isSubmitting}) => (
                  <Form>
                    <div className='block-content block-content-full border-bottom'>

                      <div className="form-group row">
                        <div className="col-12">
                          <label>Name</label>
                          <Field
                            className='form-control'
                            type='text'
                            name='name_users'
                            placeholder='Enter name...'
                          />
                          <ErrorMessage name="name_users" className='animated fadeInDown text-danger mt-1' component="div" />
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
                          <ErrorMessage name="username_users" className='animated fadeInDown text-danger mt-1' component="div" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-12">
                          <label>Telphone</label>
                          <Field
                            className='form-control'
                            type='number'
                            name='telp_users'
                            placeholder='Enter telphone number...'
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-12">
                          <label>Email</label>
                          <Field
                            className='form-control'
                            type='email'
                            name='email_users'
                            placeholder='Enter email...'
                          />
                          <ErrorMessage name="email_users" className='animated fadeInDown text-danger mt-1' component="div" />
                        </div>
                      </div>
                    </div>
                    <div className='block-content block-content-full'>
                      <div className='row'>
                        <div className='offset-8 col-4'>
                          <button type='submit' disabled={isSubmitting} className='btn btn-primary btn-block'>
                            <i className='fa fa-pencil' /> Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )
              }
            </Formik>
          </div>
        </div>
      )
    }
  }
}

export default UsersDescription