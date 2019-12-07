/**
 * Date : 08/12/2019
 * Time : 03:38
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Unauthorized extends Component {
  render () {
    return (
      <div className='content mb-150'>
        <div className='block block-rounded'>
          <div className="block-content block-content-full bg-danger">
            <div className="py-20 text-center">
              <h2 className="font-w700 mb-10 text-white">
                <i className='fa fa-exclamation-triangle'/> 401 | Unauthorized
              </h2>
              <h3 className="h5 mb-0 text-white">
                <i className='si si-info'/> {this.props.message} <Link to={this.props.link} >{this.props.linkText}</Link>.
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Unauthorized