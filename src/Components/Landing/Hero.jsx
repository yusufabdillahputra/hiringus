/**
 * Date : 26/11/2019
 * Time : 17:31
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

class HeroComponent extends Component {
  render () {
    return (
      <div className='bg-image bg-image-bottom' style={this.props.styleCss}>
        <div className='bg-primary-dark-op'>
          <div className='content content-top text-center overflow-hidden'>
            <div className='pt-50 pb-20'>
              <h1 className='font-w700 text-white mb-10 animated fadeInUp'>
                {this.props.title} <i className={`fa ${this.props.icon}`} />
              </h1>
              <h2 className='h4 font-w400 text-white-op animated fadeInUp'>
                {this.props.subTitle}
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeroComponent
