/**
 * Date : 08/12/2019
 * Time : 01:21
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { post } from '../../Utils/axios'
import { Redirect } from 'react-router-dom'
import LoadingPage from '../../Global/Template/LoadingPage'

class ModalCreate extends Component {

  constructor (props) {
    super(props);

    this.state = {
      createdBy : null
    }
  }

  async componentDidMount () {
    await this.setState({
      createdBy: this.props.createdBy
    })
  }

  initialValues = {
    name_company: '',
    created_by: this.props.createdBy || ''
  }

  validateHandler = values => {
    const errors = {};
    if (!values.name_company) {
      errors.name_company = 'Name cannot be empty'
    }
    return errors;
  }

  onSubmitHandler = async (values, {setSubmitting}) => {
    const responseApi = await post('/company', values)
    if (responseApi.data.status === 200) {
      window.location.reload()
    }
    await console.log(responseApi)
    await setSubmitting(false)
  }

  render () {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="modal-fadein" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <Formik
            initialValues={this.initialValues}
            validate={this.validateHandler}
            onSubmit={this.onSubmitHandler}
          >
            {
              ({isSubmitting}) => (
                <Form>
                  <div className="modal-content">
                    <div className="block block-themed block-transparent mb-0">
                      <div className={`block-header bg-${this.props.color}`}>
                        <h3 className="block-title">{this.props.title}</h3>
                        <div className="block-options">
                          <button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
                            <i className="si si-close"/>
                          </button>
                        </div>
                      </div>
                      <div className="block-content">
                        <div className="form-group row">
                          <div className="col-12">
                            <label>Company Name</label>
                            <Field
                              className='form-control'
                              type='text'
                              name='name_company'
                              placeholder='Enter name...'
                            />
                            <ErrorMessage name="name_company" className='animated fadeInDown text-danger mt-1' component="div"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-alt-secondary" data-dismiss="modal">{this.props.btnDismissText}</button>
                      <button type='submit' disabled={isSubmitting} className={`btn btn-alt-${this.props.color}`}>
                        {this.props.btnAgreeText} <i className="fa fa-check" />
                      </button>
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

export default ModalCreate