/**
 * Date : 08/12/2019
 * Time : 02:18
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import AppWrapper from '../Global/App/AppWrapper'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import { readById } from '../Utils/redux/actions/company/readById'
import JWT from 'jsonwebtoken'
import Unauthorized from '../Global/Error/Unauthorized'
import FormCompanyCard from '../Components/FormCompany/FormCompanyCard'
import PhotoModal from '../Components/FormCompany/PhotoModal'
import LoadingComponent from '../Global/Template/LoadingComponent'
import Description from '../Components/FormCompany/Description'

const mapStateToProps = stateAction => {
  return {
    data: stateAction
  }
}

class FormCompany extends Component {
  constructor (props) {
    super(props);

    this.state = {
      updatedBy: null,
      propsCompany: []
    }
  }

  async componentDidMount () {
    const jwt = await localStorage.getItem('jwt')
    if (jwt === null) {
      await this.setState({
        updatedBy: null
      })
    } else {
      const idCompanyParams = await this.props.match.params.id_company
      const propsCompany = await this.setPropsCompany(idCompanyParams)
      const decode = await JWT.decode(jwt, {complete: true})
      const idUsers = await decode.payload.id_users
      await this.setState({
        updatedBy: idUsers,
        propsCompany: propsCompany.rows[0]
      })
    }
  }

  async setPropsCompany (idCompany) {
    const company = await this.props.dispatch(readById(idCompany))
    return company.value.data.payload
  }

  render () {
    if (this.state.propsCompany.id_company > 0) {
      return (
        <AppWrapper>
          <div className='content content-full'>
            <div className='row'>
              <div className='col-md-4 animated fadeIn'>
                <FormCompanyCard
                  id={this.state.propsCompany.id_company}
                  name={this.state.propsCompany.name_company}
                  photo={this.state.propsCompany.photo_company}
                  verify={this.state.propsCompany.verify_company}
                />
              </div>
              <div className='col-md-8 animated fadeIn'>
                <Description
                  dataCompany={this.state.propsCompany}
                  updatedBy={this.state.updatedBy}
                />
              </div>
            </div>
          </div>
          <PhotoModal
            id='modalCompanyPhoto'
            color='primary'
            title='Change Company Picture'
            btnDismissText='Cancel'
            btnAgreeText='Submit'
            idCompany={this.state.propsCompany.id_company}
            updatedBy={this.state.updatedBy}
          />
        </AppWrapper>
      )
    } else {
      return (
        <AppWrapper>
          <LoadingComponent
            icon='fa-spinner'
            message='Please wait.....'
            sizeIcon={4}
          />
          />
        </AppWrapper>
      )
    }
  }
}

export default connect(mapStateToProps)(FormCompany)