/**
 * Date : 25/11/2019
 * Time : 19:45
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import IMGReact from '../../Assets/Image/Footer/react.png'
import IMGRedux from '../../Assets/Image/Footer/redux.png'
import IMGBootstrap from '../../Assets/Image/Footer/bootstrap.png'

class AppFooter extends Component {
  render () {
    return (
      <footer id='page-footer'>
        <div className='block bg-primary-dark text-white' style={{ marginBottom: 0 }}>
          <div className='block-content'>
            <div className='content py-20'>
              <div className='row'>
                <div className='col-md-9'>
                  <div className='row'>
                    <div className='col-12'>
                      <h5 className='text-white'>
                        Powered By
                      </h5>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-2'>
                      <a
                        target='_blank'
                        href='https://reactjs.org/'
                        rel="noopener noreferrer"
                      >
                        <img className='img-fluid' alt='React' width={100} src={IMGReact} />
                      </a>
                    </div>
                    <div className='col-2'>
                      <a
                        target='_blank'
                        href='https://redux.js.org/'
                        rel="noopener noreferrer"
                      >
                        <img className='img-fluid' alt='Redux' width={100} src={IMGRedux} />
                      </a>
                    </div>
                    <div className='col-2'>
                      <a
                        target='_blank'
                        href='https://getbootstrap.com/'
                        rel="noopener noreferrer"
                      >
                        <img className='img-fluid' alt='Bootstrap' width={100} src={IMGBootstrap} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='row mt-3'>
                    <div className='col-12'>
                      <p>
                        Hiring Us is a engineer search website which focuses on finding talented talents,
                        to support the development progress of a hiring partner project
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      <p>
                        <i className='si si-envelope mr-5' /> yusufabdillahputra@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='row'>
                        <div className='col-6'>
                          <a
                            className='btn btn-lg btn-circle bg-white'
                            target='_blank'
                            href='https://github.com/yusufabdillahputra/hiringus'
                            rel="noopener noreferrer"
                          >
                            <i className='fa fa-github' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default AppFooter
