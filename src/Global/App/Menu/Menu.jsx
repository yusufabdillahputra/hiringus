/**
 * Date : 07/12/2019
 * Time : 21:12
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import Root from './Root'

class Menu extends Component {
  render () {
    if (this.props.roleUsers === 1) {
      return (
        <Root/>
      )
    }
    if (this.props.roleUsers === 2) {
      return (
        <div>

        </div>
      )
    }
    if (this.props.roleUsers === 3) {
      return (
        <div>

        </div>
      )
    }
  }
}

export default Menu