/**
 * Date : 08/12/2019
 * Time : 12:59
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import AppWrapper from '../Global/App/AppWrapper'
import LoadingComponent from '../Global/Template/LoadingComponent'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import { readByCreatedBy } from '../Utils/redux/actions/project/readByCreatedBy'
import { readById } from '../Utils/redux/actions/users/readById'
import { readById as companyReadById } from '../Utils/redux/actions/company/readById'

/**
 * Components
 */
import CompanyCard from '../Components/Project/CompanyCard'
import bgHeroCompany from '../Assets/Image/Background/bg_hero_company.jpg'
import ListProject from '../Components/Project/ListProject'
import ModalCreate from '../Components/Project/ModalCreate'

const styleCss = {
  backroundHero: {
    backgroundImage: `url(${bgHeroCompany})`
  }
}

const mapStateToProps = stateAction => {
  return {
    data: stateAction
  }
}

class Project extends Component {

  constructor (props) {
    super(props);

    this.state = {
      jwtStatus : false,
      idUsers : null,
      roleUsers : null,
      propsProject : null,
      propsProfile : null,
      propsCompany : null
    }
  }

  async componentDidMount () {
    const propsProject = await this.setPropsProject()
    const propsProfile = await this.setPropsProfile()
    if (propsProfile[0].role_users === 3) {
      if (propsProfile[0].id_company > 0) {
        const propsCompany = await this.setPropsCompany(propsProfile[0].id_company)
        await this.setState({
          propsProfile: propsProfile,
          propsCompany: propsCompany,
          propsProject: propsProject
        })
      } else {
        await this.setState({
          propsProfile: propsProfile,
          propsProject: propsProject
        })
      }
    } else {
      await this.setState({
        propsProfile: propsProfile,
        propsProject: propsProject
      })
    }
  }

  async setPropsProject () {
    const company = await this.props.dispatch(readByCreatedBy())
    return company.value.data.payload.rows
  }

  async setPropsProfile () {
    const jwt = localStorage.getItem('jwt')
    if (jwt !== null) {
      const profile = await this.props.dispatch(readById())
      return profile.value.data.payload.rows
    } else {
      this.setState({
        jwtStatus: false
      })
    }
  }

  async setPropsCompany (idCompany) {
    const company = await this.props.dispatch(companyReadById(idCompany))
    return company.value.data.payload.rows[0]
  }

  render () {
    if (this.state.propsProject !== null) {
      return (
        <AppWrapper>
          <div className='content'>
            <div className='row'>
              <div className='col-md-4'>
                {
                  (this.state.propsProfile[0].id_company > 0 && this.state.propsProfile[0].role_users === 3)
                    ? <CompanyCard
                      id={this.state.propsCompany.id_company}
                      name={this.state.propsCompany.name_company}
                      photo={this.state.propsCompany.photo_company}
                      verify={this.state.propsCompany.verify_company}
                    />
                    : null
                }
              </div>
              <div className='col-md-8'>
                <div className='block block-rounded'>
                  <div className="block-content block-content-full bg-pattern" style={styleCss.backroundHero}>
                    <div className="py-20 text-center">
                      <h2 className="font-w700 mb-10 text-white">
                        <i className='si si-briefcase'/> List Projects
                      </h2>
                    </div>
                  </div>
                </div>
                <button type='button' className='btn btn-primary btn-block btn-rounded mb-20' data-toggle='modal' data-target='#modalCreateProject'>
                  <i className='si si-plus' /> Create Project
                </button>
                {
                  this.state.propsProject.map((project, index) => {
                    return <ListProject
                      id={project.id_project}
                      name={project.name_project}
                      deadline={project.deadline_project}
                      fee={project.fee_project}
                      description={project.description_project}
                      key={index}
                    />
                  })
                }
              </div>

            </div>
          </div>
          <ModalCreate
            id='modalCreateProject'
            color='primary'
            title='Create Project'
            btnDismissText='Cancel'
            btnAgreeText='Submit'
            createdBy={this.state.propsProfile[0].id_users}
          />
        </AppWrapper>
      )
    }
    else {
      return  <LoadingComponent
        icon='fa-spinner'
        message='Please wait.....'
        sizeIcon={4}
      />
    }
  }
}

export default connect(mapStateToProps)(Project)