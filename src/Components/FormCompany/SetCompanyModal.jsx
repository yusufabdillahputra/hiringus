/**
 * Date : 08/12/2019
 * Time : 07:01
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { put } from '../../Utils/axios'

class SetCompanyModal extends Component {
  constructor (props) {
    super(props);

    this.state = {
      ribbonColor : null,
      ribbonIcon : null,
      ribbonText : null
    }
  }

  async componentDidMount () {
    const verified = await this.props.verify
    if (verified === true) {
      await this.setState({
        ribbonColor : 'success',
        ribbonIcon : 'check',
        ribbonText : 'Verified'
      })
    } else if (verified === false) {
      await this.setState({
        ribbonColor : 'danger',
        ribbonIcon : 'close',
        ribbonText : 'Not Verified'
      })
    }
  }

  submitHandler = async (event) => {
    await event.preventDefault()
    const putData = await put(`users/partner/company/${this.props.idUsers}`, {
      id_company: this.props.idCompany,
      updatedBy: this.props.updatedBy
    })
    if (putData.data.status === 200) {
      await window.location.reload()
    }
  }

  render () {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="modal-fadein" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <form onSubmit={this.submitHandler}>
            <div className="modal-content">
              <div className="block block-themed block-transparent mb-0">
                <div className={`block-header bg-${this.props.color}`}>
                  <h3 className="block-title">{this.props.title}</h3>
                  <div className="block-options">
                    <button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
                      <i className="si si-close"/>
                    </button>
                  </div>
                </div>
                <div className="block-content">

                  <div className='block block-rounded'>
                    <div className={`block-content p-0 overflow-hidden ribbon ribbon-bookmark ribbon-${this.state.ribbonColor}`}>
                      <div className="ribbon-box">
                        <i className={`si si-${this.state.ribbonIcon}`} /> {this.state.ribbonText}
                      </div>
                      <img
                        className='img-fluid rounded-top'
                        width='512px'
                        height='512px'
                        src={`http://54.144.101.230:3000/company/${this.props.photo}`}
                        alt={`Company ${this.props.name}`}
                      />
                    </div>
                    <div className='block-content bg-primary text-center'>
                      <h4 className='font-size-h5 mb-10 text-white'>{this.props.name}</h4>
                    </div>
                  </div>


                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-alt-secondary" data-dismiss="modal">{this.props.btnDismissText}</button>
                <button type='submit' className={`btn btn-alt-${this.props.color}`}>
                  {this.props.btnAgreeText} <i className="fa fa-check"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SetCompanyModal