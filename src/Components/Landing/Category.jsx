/**
 * Date : 26/11/2019
 * Time : 21:04
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'

/**
* Redux Actions
*/
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postCategory } from '../../Utils/redux/actions/components/landing/postCategory'
import LoadingComponent from '../../Global/Template/LoadingComponent'

const mapStateToProps = dispatch => {
  return bindActionCreators({ postCategory }, dispatch)
}

class Category extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isSearch: false,
      fieldValue: null,
      fieldName: null
    }

  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSearch !== this.state.isSearch) {
      await this.props.postCategory(this.state)
      await this.setState({
        isLoading: true
      })
    }
    if (prevState.isLoading !== this.state.isLoading) {
      await this.props.postCategory(this.state)
      await this.setState({
        isSearch: false,
        isLoading: false
      })
    }
  }

  onSubmitHandler = async (event) => {
    event.preventDefault()
    await this.setState({
      isSearch: true,
      fieldName: 'name_users'
    })
  }

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
                    Feel's lost ? you can set filter by this category <i className='fa fa-smile-o' />
                  </h1>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                  <div className='block-content'>
                    <div className='form-group row'>
                      <div className='col-md-12'>
                        <select className='form-control form-control-lg' name='filterBy'>
                          <option value='name_users'>By Name</option>
                          <option value='skill_users'>By Skill</option>
                        </select>
                      </div>
                    </div>
                    <div className='form-group row'>
                      <div className='col-12'>
                        <div className='input-group'>
                          <input
                            type='text'
                            className='form-control form-control-lg'
                            name='fv'
                            placeholder='Search...'
                            onChange={
                              (e) => {
                                this.setState({
                                  fieldValue: e.target.value
                                })
                              }
                            }
                          />
                          <div className='input-group-append'>
                            <button type='submit' className='btn btn-lg btn-alt-primary'>
                              <i className='fa fa-search' />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, mapStateToProps)(Category)
