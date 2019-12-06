/**
 * Date : 06/12/2019
 * Time : 23:44
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { put } from '../../Utils/axios'
import BootstrapAlert from '../../Global/Alerts/BootstrapAlert'

class RootDescription extends Component {
  constructor (props) {
    super(props);

    this.state = {
      alert : false,
      alertTitle : null,
      alertColor : null,
      alertMessage : null,
    }
  }

  initialValues = {
    description_root: this.props.profile.description_root,
    position_users: this.props.profile.position_users,
    address_root : this.props.profile.address_root,
    city_root : this.props.profile.city_root,
    province_root : this.props.profile.province_root,
    nation_root : this.props.profile.nation_root,
    updated_by : this.props.profile.id_users
  }

  onSubmitHandler = async (values, {setSubmitting}) => {
    const putData = await put(`/users/root/id/${values.updated_by}`, values)
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
        alertColor: 'info',
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
              <i className={'si si-pin'}/> Role Information
            </h1>
          </div>
          <Formik
            initialValues={this.initialValues}
            onSubmit={this.onSubmitHandler}
          >
            {
              ({isSubmitting}) => (
                <Form>
                  <div className='block-content block-content-full border-bottom'>

                    <div className="form-group row">
                      <div className="col-12">
                        <label>Description</label>
                        <Field
                          className='form-control'
                          component='textarea'
                          name='description_root'
                          placeholder='Enter description...'
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>Headline</label>
                        <Field
                          className='form-control'
                          type='text'
                          name='position_users'
                          placeholder='Enter headline...'
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>Address</label>
                        <Field
                          className='form-control'
                          component='textarea'
                          name='address_root'
                          placeholder='Enter address...'
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>City</label>
                        <Field
                          className='form-control'
                          type='text'
                          name='city_root'
                          placeholder='Enter city...'
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>Province</label>
                        <Field
                          className='form-control'
                          type='text'
                          name='province_root'
                          placeholder='Enter province...'
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>Nation</label>
                        <Field
                          className='form-control'
                          type='text'
                          name='nation_root'
                          placeholder='Enter nation...'
                        />
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

export default RootDescription