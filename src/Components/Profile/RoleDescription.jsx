/**
 * Date : 06/12/2019
 * Time : 23:42
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import RootDescription from './RootDescription'
import EngineerDescription from './EngineerDescription'
import PartnerDescription from './PartnerDescription'

class RoleDescription extends Component {
  render () {
    if (this.props.role === 1) {
      return (
        <RootDescription
          profile={this.props.data}
        />
      )
    }
    if (this.props.role === 2) {
      return (
        <EngineerDescription
          profile={this.props.data}
        />
      )
    }
    if (this.props.role === 3) {
      return (
        <PartnerDescription
          profile={this.props.data}
        />
      )
    }
    else {
      return null
    }
  }
}

export default RoleDescription