/**
 * Date : 07/12/2019
 * Time : 21:12
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import Root from './Root'
import Partner from './Partner'
import Engineer from './Engineer'

class Menu extends Component {
  render () {
    if (this.props.roleUsers === 1) {
      return (
        <Root />
      )
    }
    if (this.props.roleUsers === 2) {
      return (
        <Engineer />
      )
    }
    if (this.props.roleUsers === 3) {
      return (
        <Partner />
      )
    }
  }
}

export default Menu