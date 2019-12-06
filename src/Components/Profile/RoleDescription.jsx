/**
 * Date : 06/12/2019
 * Time : 23:42
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import RootDescription from './RootDescription'

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
        <div>

        </div>
      )
    }
    if (this.props.role === 3) {
      return (
        <div>

        </div>
      )
    }
    else {
      return null
    }
  }
}

export default RoleDescription