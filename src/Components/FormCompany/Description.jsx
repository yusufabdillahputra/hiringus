/**
 * Date : 08/12/2019
 * Time : 04:22
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import BootstrapAlert from '../../Global/Alerts/BootstrapAlert'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { put } from '../../Utils/axios'
import { Link } from 'react-router-dom'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import { readById as Users_readById } from '../../Utils/redux/actions/users/readById'

const mapStateToProps = state => {
  return {
    data: state
  }
}

class Description extends Component {

  constructor (props) {
    super(props);

    this.state = {
      propsIdCompany: null,
      alert: false,
      alertTitle: null,
      alertColor: null,
      alertMessage: null,
    }
  }

  async componentDidMount () {
    const propsIdCompany = await this.setPropsIdCompany() || null
    this.setState({
      propsIdCompany: propsIdCompany[0].id_company || null
    })
  }

  async setPropsIdCompany () {
    const profile = await this.props.dispatch(Users_readById())
    return profile.value.data.payload.rows
  }

  initialValues = {
    name_company: this.props.dataCompany.name_company || '',
    address_company: this.props.dataCompany.address_company || '',
    city_company: this.props.dataCompany.city_company || '',
    province_company: this.props.dataCompany.province_company || '',
    nation_company: this.props.dataCompany.nation_company || '',
    updated_by: this.props.updatedBy
  }

  validateHandler = values => {
    const errors = {};
    if (!values.name_company) {
      errors.name_company = 'Name cannot be empty'
    }
    return errors;
  }

  onSubmitHandler = async (values, {setSubmitting}) => {
    const putData = await put(`/company/id/${this.props.dataCompany.id_company}`, values)
    if (putData.data.status === 200) {
      await this.setState({
        alert: true,
        alertTitle: 'Success',
        alertColor: 'info',
        alertMessage: 'Data company has been updated',
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
              <Link to={'/company'} className='btn btn-alt-primary btn-md btn-rounded mr-3'>
                <i className='fa fa-angle-left'/>
              </Link>
              <i className={'fa fa-building-o'}/> Company Information
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
                          name='name_company'
                          placeholder='Enter name...'
                        />
                        <ErrorMessage name="name_company" className='animated fadeInDown text-danger mt-1'
                                      component="div"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <label>Address</label>
                        <Field
                          className='form-control'
                          component='textarea'
                          name='address_company'
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
                          name='city_company'
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
                          name='province_company'
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
                          name='nation_company'
                          placeholder='Enter nation...'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='block-content block-content-full'>
                    <div className='row'>
                      <div className='offset-8 col-4 btn-group'>
                        {
                          this.props.roleUsers === 3 && this.props.dataCompany.id_company !== this.state.propsIdCompany
                            ? <button type='button' data-toggle='modal' data-target='#modalSetCompany' className='btn btn-success btn-block'>
                              <i className='fa fa-check'/> Set Company
                            </button>
                            : null
                        }
                        {
                          (this.props.roleUsers === 1 || this.props.dataCompany.id_company === this.state.propsIdCompany)
                            ? <button type='submit' disabled={isSubmitting} className='btn btn-primary btn-block'>
                              <i className='fa fa-pencil'/> Submit
                            </button>
                            : null
                        }
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

export default connect(mapStateToProps)(Description)