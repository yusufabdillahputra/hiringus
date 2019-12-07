/**
 * Date : 07/12/2019
 * Time : 07:08
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import 'flatpickr/dist/themes/material_blue.css'

import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import { put } from '../../Utils/axios'
import { formatDate } from '../../Utils/date'
import BootstrapAlert from '../../Global/Alerts/BootstrapAlert'
import Flatpickr from 'react-flatpickr'

class EngineerDescription extends Component {

  constructor (props) {
    super(props);

    this.state = {
      dboEngineer: null,
      alert: false,
      alertTitle: null,
      alertColor: null,
      alertMessage: null,
      date: null
    }
  }

  async componentDidMount () {
    const dbo = this.props.profile.dbo_engineer || null
    if (dbo === null) {
      await this.setState({
        date: new Date()
      })
    }
    else {
      await this.setState({
        date: new Date(dbo)
      })
    }
  }

  initialValues = {
    description_engineer: this.props.profile.description_engineer || '',
    position_users: this.props.profile.position_users || '',
    github_engineer: this.props.profile.github_engineer || '',
    linkedin_engineer: this.props.profile.linkedin_engineer || '',
    portofolio_engineer: this.props.profile.portofolio_engineer || '',
    address_engineer: this.props.profile.address_engineer || '',
    city_engineer: this.props.profile.city_engineer || '',
    province_engineer: this.props.profile.province_engineer || '',
    nation_engineer: this.props.profile.nation_engineer || '',
    updated_by: this.props.profile.id_users
  }

  onSubmitHandler = async (values, {setSubmitting}) => {
    // todo : date belum masuk ke db
    values.dbo_engineer = await formatDate(this.state.date)
    const putData = await put(`/users/engineer/id/${values.updated_by}`, values)
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
                          name='description_engineer'
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
                        <label>Date of Birth</label>
                        <Flatpickr
                          className='form-control'
                          value={this.state.date}
                          onChange={date => {
                            this.setState({
                              dboEngineer: date
                            })
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>Github</label>
                        <Field
                          className='form-control'
                          type='text'
                          name='github_engineer'
                          placeholder='Enter link github...'
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>LinkedIn</label>
                        <Field
                          className='form-control'
                          type='text'
                          name='linkedin_engineer'
                          placeholder='Enter link linkedin...'
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>Portfolio</label>
                        <Field
                          className='form-control'
                          type='text'
                          name='portofolio_engineer'
                          placeholder='Enter link portfolio...'
                        />
                      </div>
                    </div>


                    <div className="form-group row">
                      <div className="col-12">
                        <label>Address</label>
                        <Field
                          className='form-control'
                          component='textarea'
                          name='address_engineer'
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
                          name='city_engineer'
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
                          name='province_engineer'
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
                          name='nation_engineer'
                          placeholder='Enter nation...'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='block-content block-content-full'>
                    <div className='row'>
                      <div className='offset-8 col-4'>
                        <button type='submit' disabled={isSubmitting} className='btn btn-primary btn-block'>
                          <i className='fa fa-pencil'/> Submit
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

export default EngineerDescription