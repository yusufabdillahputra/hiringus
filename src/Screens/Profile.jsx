/**
 * Date : 06/12/2019
 * Time : 07:11
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import { get } from '../Utils/axios'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import { readById } from '../Utils/redux/actions/users/readById'
import { readById as companyReadById } from '../Utils/redux/actions/company/readById'

/**
 * Globals
 */
import AppWrapper from '../Global/App/AppWrapper'

/**
 * Components
 */
import PhotoCard from '../Components/Profile/PhotoCard'
import LoadingPage from '../Global/Template/LoadingPage'
import PhotoModal from '../Components/Profile/PhotoModal'
import UsersDescription from '../Components/Profile/UsersDescription'
import RoleDescription from '../Components/Profile/RoleDescription'
import CompanyCard from '../Components/Profile/CompanyCard'
import FormCompanyCard from '../Components/FormCompany/FormCompanyCard'

const mapStateToProps = state => {
  return {
    data: state
  }
}

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      jwtStatus: true,
      jwtExpired: false,
      propsProfile: [],
      propsCompany: [],
      propsModalPhoto: [],
      isAuth: null
    }

    const jwt = localStorage.getItem('jwt')
    if (jwt !== null) {
      const decode = JWT.decode(jwt, {complete: true})
      this.checkLogin(jwt, decode)
    }
    if (jwt === null) {
      this.setState({
        isLogin: false
      })
    }
  }

  async componentDidMount () {
    const propsProfile = await this.setPropsProfile()
    if (propsProfile[0].role_users === 3 && propsProfile[0].id_company !== 0) {
      const propsCompany = await this.setPropsCompany(propsProfile[0].id_company)
      await this.setState({
        propsProfile: propsProfile,
        propsCompany: propsCompany
      })
    } else {
      await this.setState({
        propsProfile: propsProfile
      })
    }
  }

  /**
   * Get props from redux
   *
   * @param prevProps
   * @param prevState
   * @returns {Promise<void>}
   */
  async componentDidUpdate (prevProps, prevState) {
    if (prevProps.data.Profile_postPhotoModal.isFulfilled !== this.props.data.Profile_postPhotoModal.isFulfilled) {
      await this.setState({
        propsModalPhoto: this.props.data.Profile_postPhotoModal.stateArray
      })
    }
  }

  async checkLogin (jwt, decode) {
    const idUsers = decode.payload.id_users
    const apiUsersToken = await get(`/users/id/${idUsers}`)
    const apiStatus = apiUsersToken.data.status
    if (apiStatus === 401 || apiStatus === 500) {
      await this.setState({
        jwtExpired: true
      })
    } else {
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
    if (this.state.isAuth === false) {
      return (
        <Redirect push to='/'/>
      )
    }
    if (this.state.jwtExpired === true || this.state.jwtStatus === false) {
      return (
        <Redirect push to='/login'/>
      )
    }
    if (this.state.propsProfile.length > 0) {
      const profile = this.state.propsProfile[0]
      const photoCardData = this.state.propsModalPhoto || null
      return (
        <AppWrapper>
          <div className='content content-full'>
            <div className='row'>
              <div className='col-md-4 animated fadeIn'>
                <PhotoCard
                  id={profile.id_users}
                  name={profile.name_users}
                  role={profile.role_name}
                  image={profile.photo_users}
                  position={profile.position_users}
                  key={profile.id_users}
                />
                {
                  (profile.id_company !== 0 && profile.role_users === 3)
                    ? <CompanyCard
                      id={this.state.propsCompany.id_company}
                      name={this.state.propsCompany.name_company}
                      photo={this.state.propsCompany.photo_company}
                      verify={this.state.propsCompany.verify_company}
                    />
                    : null
                }
              </div>
              <div className='col-md-8 animated fadeIn'>
                <div className='row'>
                  <div className='col-12'>
                    <UsersDescription
                      dataProfile={profile}
                    />
                  </div>
                  <div className='col-12'>
                    <RoleDescription
                      role={profile.role_users}
                      data={profile}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PhotoModal
            id='modalProfilePhoto'
            color='primary'
            title='Change Profile Picture'
            btnDismissText='Cancel'
            btnAgreeText='Submit'
            photoCardData={photoCardData}
          />
        </AppWrapper>
      )
    } else {
      return (
        <LoadingPage
          icon='fa-spinner'
          message='Please wait.....'
        />
      )
    }
  }
}

export default connect(mapStateToProps)(Profile)
