/**
 * Date : 26/11/2019
 * Time : 21:04
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

class Category extends Component {
  render () {
    return (
      <div className='bg-primary-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='row'>
                <div className='col-12 text-center'>
                  <img className='img-fluid mt-4' width={350} src={this.props.image} alt='Category' />
                </div>
              </div>
            </div>
            <div className='col-md-6 mt-4'>
              <div className='block block-rounded'>
                <div className='block block-header border-bottom'>
                  <h1 className='block-title'>
                    Feel's lost ? you can set filter by this category <i className='fa fa-smile-o'></i>
                  </h1>
                </div>
                <div className='block-content'>
                  <div className='form-group row'>
                    <div className='col-12'>
                      <div className='input-group'>
                        <input
                          type='text'
                          className='form-control form-control-lg'
                          name='searchKeyword'
                          placeholder='Search...'
                        />
                        <div className='input-group-append'>
                          <button type='button' className='btn btn-lg btn-alt-primary'>
                            <i className='fa fa-search' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='form-group row'>
                    <div className='col-md-12'>
                      <select className='form-control form-control-lg' name='filterBy'>
                        <option value='0'>Filter by</option>
                        <option value='1'>Skill</option>
                        <option value='2'>Name</option>
                        <option value='3'>Level</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Category