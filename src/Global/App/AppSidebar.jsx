/**
 * Date : 26/11/2019
 * Time : 15:02
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImageLogo from '../../../assets/image/app/logo.png'

class AppSidebar extends Component {
  render () {
    return (
      <nav id='sidebar'>
        <div className='sidebar-content'>
          <div className='content-header content-header-fullrow bg-black-op-10'>
            <div className='content-header-section text-center align-parent'>
              <button type='button' className='btn btn-circle btn-dual-secondary d-lg-none align-v-r' data-toggle='layout' data-action='sidebar_close'>
                <i className='fa fa-times text-danger' />
              </button>
              <div className='content-header-item'>
                <Link to='/'>
                  <img alt='Logo' width='85px' src={ImageLogo} />
                </Link>
              </div>
            </div>
          </div>
          <div className='content-side content-side-full' />
        </div>
      </nav>
    )
  }
}

export default AppSidebar
