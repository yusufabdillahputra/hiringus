/**
 * Date : 05/12/2019
 * Time : 22:06
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import LoginWrapper from '../Login/LoginWrapper'
import bgLoginInverse from '../../Assets/Image/Background/bg_login_inverse.png'

const styleCss = {
  backgroundImage: `url(${bgLoginInverse})`
}

class LoadingPage extends Component {
  render () {
    return (
      <LoginWrapper>
        <main id='main-container'>
          <div className='bg-body-dark bg-pattern' style={styleCss}>
            <div className='row mx-0 justify-content-center'>
              <div className='hero-static col-lg-6 col-xl-4'>
                <div className='content content-full overflow-hidden'>
                  <h1 className='text-center text-primary'>
                    <i className={`fa fa-5x fa-spin ${this.props.icon} mt-150`} />
                  </h1>
                  <h2 className='text-center text-primary-dark'>
                    {this.props.message}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </main>
      </LoginWrapper>
    )
  }
}

export default LoadingPage