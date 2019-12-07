/**
 * Date : 07/12/2019
 * Time : 21:20
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Partner extends Component {
  render () {
    return (
      <div>
        <Link className='dropdown-item' to='/company'>
          <i className='fa fa-building-o mr-5'/> Company
        </Link>
        <div className='dropdown-divider'/>
      </div>
    )
  }
}

export default Partner