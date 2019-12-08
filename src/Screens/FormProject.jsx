/**
 * Date : 08/12/2019
 * Time : 16:59
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { put } from '../Utils/axios'
import { Link, Redirect } from 'react-router-dom'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import JWT from 'jsonwebtoken'
import { formatDate } from '../Utils/date'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import { readById } from '../Utils/redux/actions/project/readById'
import { readByIdProjectEngineer } from '../Utils/redux/actions/project/readByIdProjectEngineer'

/**
 * Components
 */
import AppWrapper from '../Global/App/AppWrapper'
import LoadingPage from '../Global/Template/LoadingPage'
import BootstrapAlert from '../Global/Alerts/BootstrapAlert'
import bgHeroCompany from '../Assets/Image/Background/bg_hero_company.jpg'
import EngineerCard from '../Components/FormProject/EngineerCard'

const mapStateToProps = stateAction => {
  return {
    data: stateAction
  }
}

const styleCss = {
  backroundHero: {
    backgroundImage: `url(${bgHeroCompany})`
  }
}

class FormProject extends Component {

  constructor (props) {
    super(props);

    this.state = {
      toHome: false,
      deadlineProject: null,
      propsProject: [],
      propsEngineer: [],
      idProject: null,
      alert: false,
      alertTitle: null,
      alertColor: null,
      alertMessage: null,
    }
  }

  async componentDidMount () {
    const jwt = await localStorage.getItem('jwt')
    if (jwt !== null) {
      const decode = await JWT.decode(jwt, {complete: true})
      const idUsers = await decode.payload.id_users
      const idProjectParams = await this.props.match.params.id_project
      const propsProject = await this.setPropsProject(idProjectParams)
      const propsEngineer = await this.setPropsEngineer(idProjectParams)
      await this.setState({
        idUsers: idUsers,
        idProject: idProjectParams,
        propsProject: propsProject[0],
        propsEngineer: propsEngineer
      })
      const deadline = await this.state.propsProject.deadline_project || null
      await this.setState({
        deadlineProject: new Date(deadline)
      })
      await console.log(this.state.propsEngineer)
    }
    if (jwt === null) {
      await this.setState({
        toHome: true
      })
    }

  }

  async setPropsEngineer (idProject) {
    const engineer = await this.props.dispatch(readByIdProjectEngineer(idProject))
    return engineer.value.data.payload.rows
  }

  async setPropsProject (idProject) {
    const project = await this.props.dispatch(readById(idProject))
    return project.value.data.payload.rows
  }

  validateHandler = values => {
    const errors = {};
    if (!values.name_project) {
      errors.name_project = 'Name cannot be empty'
    }
    if (!values.fee_project) {
      errors.fee_project = 'Fee cannot be empty'
    }
    return errors;
  }

  onSubmitHandler = async (values, {setSubmitting}) => {
    values.deadline_project = await formatDate(this.state.deadlineProject)
    const putData = await put(`/project/id/${this.state.propsProject.id_project}`, values)
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
    await setSubmitting(false)
  }

  render () {
    if (this.state.propsProject.id_project === this.state.idProject) {
      return (
        <AppWrapper>
          <div className='content'>
            <BootstrapAlert
              statusAlert={this.state.alert}
              animated={'fadeIn'}
              title={this.state.alertTitle}
              message={this.state.alertMessage}
              color={this.state.alertColor}
            />
            <Formik
              initialValues={{
                name_project: this.state.propsProject.name_project || '',
                description_project: this.state.propsProject.description_project || '',
                fee_project: this.state.propsProject.fee_project || '',
                updated_by: this.state.idUsers
              }}
              onSubmit={this.onSubmitHandler}
            >
              {
                ({isSubmitting}) => (
                  <Form>
                    <div className='block block-rounded'>
                      <div className='block-header bg-primary'>
                        <h1 className='block-title text-white'>
                          <Link to={'/project'} className='btn btn-alt-primary btn-md btn-rounded mr-3'>
                            <i className='fa fa-angle-left'/>
                          </Link>
                          <i className='si si-briefcase '/> Project Description
                        </h1>
                      </div>
                      <div className='block-content block-content-full'>
                        <div className="form-group row">
                          <div className="col-12">
                            <label>Project Name</label>
                            <Field
                              className='form-control'
                              type='text'
                              name='name_project'
                              placeholder='Enter name...'
                            />
                            <ErrorMessage name="name_project" className='animated fadeInDown text-danger mt-1'
                                          component="div"/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-12">
                            <label>Deadline</label>
                            <Flatpickr
                              className='form-control'
                              value={this.state.deadlineProject}
                              onChange={async date => {
                                await this.setState({
                                  deadlineProject: date
                                })
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-12">
                            <label>Description</label>
                            <Field
                              className='form-control'
                              component='textarea'
                              name='description_project'
                              placeholder='Enter description...'
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-12">
                            <label>Fee</label>
                            <Field
                              className='feeProject form-control'
                              type='number'
                              name='fee_project'
                              placeholder='Enter fee...'
                            />
                            <ErrorMessage name="fee_project" className='animated fadeInDown text-danger mt-1'
                                          component="div"/>
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
                    </div>
                  </Form>
                )
              }
            </Formik>


            <div className='block block-rounded'>
              <div className="block-content block-content-full bg-pattern" style={styleCss.backroundHero}>
                <div className="py-20 text-center">
                  <h2 className="font-w700 mb-10 text-white">
                    <i className='si si-users'/> List Engineer
                  </h2>
                </div>
              </div>
            </div>
            {
              this.state.propsEngineer.length > 0
                ? this.state.propsEngineer.map((engineer, index) => {
                  return <EngineerCard
                    id={engineer.id_engineer}
                    name={engineer.name_users}
                    image={engineer.photo_users}
                    position={engineer.position_users}
                    statusProject={engineer.status_project_engineer}
                    key={index}
                  />
                })
                : null
            }

          </div>
        </AppWrapper>
      )
    }
    if (this.state.toHome) {
      return <Redirect push to={'/'}/>
    } else {
      return <LoadingPage
        icon='fa-spinner'
        message='Please wait.....'
      />
    }
  }
}

export default connect(mapStateToProps)(FormProject)