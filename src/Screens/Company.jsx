/**
 * Date : 07/12/2019
 * Time : 21:30
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import AppWrapper from '../Global/App/AppWrapper'
import LoadingPage from '../Global/Template/LoadingPage'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import { readAll } from '../Utils/redux/actions/company/readAll'

/**
 * Image
 */
import bgHeroCompany from '../Assets/Image/Background/bg_hero_company.jpg'
import CompanyCard from '../Components/Company/CompanyCard'
import ModalCreate from '../Components/Company/ModalCreate'

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

class Company extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      isAuth: null,
      roleUsers: null,
      idUsers: null,
      propsCompany: []
    }
  }

  async componentDidMount () {
    const jwt = await localStorage.getItem('jwt')
    if (jwt === null) {
      await this.setState({
        isAuth: false
      })
    } else {
      const decode = await JWT.decode(jwt, {complete: true})
      const roleUsers = await decode.payload.role_users
      const idUsers = await decode.payload.id_users
      const propsCompany = await this.setPropsCompany()
      await this.setState({
        isLoading: false,
        isAuth: true,
        roleUsers: roleUsers,
        idUsers: idUsers,
        propsCompany: propsCompany.rows
      })
    }
  }

  async setPropsCompany (fieldName = null, fieldValue = null) {
    const company = await this.props.dispatch(readAll(fieldName, fieldValue))
    return company.value.data.payload
  }

  render () {
    if (this.state.isLoading === false) {
      if (this.state.isAuth !== false) {
        return (
          <AppWrapper>
            <div className='content'>
              <div className='block block-rounded'>
                <div className="block-content block-content-full bg-pattern" style={styleCss.backroundHero}>
                  <div className="py-20 text-center">
                    <h2 className="font-w700 mb-10 text-white">
                      <i className='fa fa-building-o'/> Company
                    </h2>
                    <h3 className="h5 mb-0 text-white">
                      <i className='si si-info'/> if your company not in the list, please contact administrator.
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block block-rounded">
                <div className='block-header border-bottom'>
                  <h4 className="block-title">List Company</h4>
                  <button className='btn btn-md btn-primary btn-rounded' type='button' data-target="#modalCreateCompany" data-toggle="modal" >
                    <i className='si si-plus' /> Create Company
                  </button>
                </div>
              </div>
              <div className='block block-transparent'>
                <div className='block-content block-content-full'>
                  <div className='row'>
                    {
                      this.state.propsCompany.length > 0
                        ? this.state.propsCompany.map((company, index) => {
                          return <CompanyCard
                            id={company.id_company}
                            name={company.name_company}
                            photo={company.photo_company}
                            verify={company.verify_company}
                            city={company.city_company}
                            province={company.province_company}
                            nation={company.nation_company}
                            key={index}
                          />
                        })
                        : <div className='col-12 text-center'>
                          <h5>
                            <i className='si si-info'/> Empty company...
                          </h5>
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <ModalCreate
              id='modalCreateCompany'
              color='primary'
              title='Create Company'
              btnDismissText='Cancel'
              btnAgreeText='Submit'
              createdBy={this.state.idUsers}
            />
          </AppWrapper>
        )
      } else {
        return <Redirect push to={'/'}/>
      }
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

export default connect(mapStateToProps)(Company)