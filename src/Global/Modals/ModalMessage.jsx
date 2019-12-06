/**
 * Date : 28/11/2019
 * Time : 18:41
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ModalMessage extends Component {
  render () {
    return (
      <div className='modal fade' id={this.props.id} tabIndex='-1' role='dialog' aria-labelledby='modal-fadein' aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='block block-themed block-transparent mb-0'>
              <div className={`block-header bg-${this.props.color}`}>
                <h3 className='block-title'>{this.props.title}</h3>
                <div className='block-options'>
                  <button type='button' className='btn-block-option' data-dismiss='modal' aria-label='Close'>
                    <i className='si si-close' />
                  </button>
                </div>
              </div>
              <div className='block-content'>
                <h4>
                  {this.props.message}
                </h4>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-alt-secondary' data-dismiss='modal'>{this.props.btnDismissText}</button>
              <Link to={this.props.linkTo} className={`btn btn-alt-${this.props.color}`}>
                {this.props.btnAgreeText} <i className='fa fa-check' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalMessage
