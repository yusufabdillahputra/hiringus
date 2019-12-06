/**
 * Date : 05/12/2019
 * Time : 22:11
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

class LoadingComponent extends Component {
  render () {
    return (
      <div className='content content-full overflow-hidden'>
        <h1 className='text-center text-primary'>
          <i className={`fa fa-${this.props.sizeIcon}x fa-spin ${this.props.icon}`} />
        </h1>
        <h2 className='text-center text-primary-dark'>
          {this.props.message}
        </h2>
      </div>
    )
  }
}

export default LoadingComponent