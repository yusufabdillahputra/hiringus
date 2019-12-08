/**
 * Date : 08/12/2019
 * Time : 13:01
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AppWrapper from '../Global/App/AppWrapper'
import LoadingPage from '../Global/Template/LoadingPage'
import JWT from 'jsonwebtoken'

class FormEngineer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      idUsers: null,
      roleUsers : null,
      idEngineer : null
    }
  }

  async componentDidMount () {
    const jwt = await localStorage.getItem('jwt')
    if (jwt !== null) {
      const decode = await JWT.decode(jwt, {complete: true})
      const idUsers = await decode.payload.id_users
      const roleUsers = await decode.payload.role_users
      await this.setState({
        idUsers: idUsers,
        roleUsers : roleUsers,
        idEngineer : this.props.match.params.id_engineer
      })
    } if (jwt === null) {
      await this.setState({
        idEngineer : this.props.match.params.id_engineer
      })
    }
  }

  render () {
    if (this.state.idEngineer !== null) {
      if (this.state.roleUsers === 3) {
        return (
          <AppWrapper>
            <div className='content'>
              <h1>
                Engineer Content {this.state.idEngineer}
              </h1>
            </div>
          </AppWrapper>
        )
      } else {
        return <Redirect push to={'/'} />
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

export default FormEngineer