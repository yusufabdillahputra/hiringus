/**
 * Date : 07/12/2019
 * Time : 20:25
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { put } from '../../Utils/axios'
import BootstrapAlert from '../../Global/Alerts/BootstrapAlert'

class PartnerDescription extends Component {
  constructor (props) {
    super(props);

    this.state = {
      alert: false,
      alertTitle: null,
      alertColor: null,
      alertMessage: null,
    }
  }

  initialValues = {
    description_partner: this.props.profile.description_partner  || '',
    position_users: this.props.profile.position_users  || '',
    address_partner : this.props.profile.address_partner  || '',
    city_partner : this.props.profile.city_partner  || '',
    province_partner : this.props.profile.province_partner  || '',
    nation_partner : this.props.profile.nation_partner  || '',
    updated_by : this.props.profile.id_users
  }

  onSubmitHandler = async (values, {setSubmitting}) => {
    const putData = await put(`/users/partner/id/${values.updated_by}`, values)
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
                          name='description_partner'
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
                          name='address_partner'
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
                          name='city_partner'
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
                          name='province_partner'
                          placeholder='Enter province...'
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>Country</label>
                        <Field
                          className='form-control'
                          type='text'
                          name='nation_partner'
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
        <BootstrapAlert
          statusAlert={this.state.alert}
          animated={'fadeIn'}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          color={this.state.alertColor}
        />
      </div>
    )
  }
}

export default PartnerDescription