/**
 * Date : 08/12/2019
 * Time : 03:55
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { put } from '../../Utils/axios'

class PhotoModal extends Component {
  constructor (props) {
    super(props);

    this.state = {
      companyPicture : null
    }
  }

  submitHandler = async (event) => {
    event.preventDefault()
    const bodyFormData = await new FormData()
    const updatedBy = this.props.updatedBy
    const idCompany = this.props.idCompany
    await bodyFormData.set('updated_by', updatedBy)
    await bodyFormData.append('photo_company', this.state.companyPicture)
    await this.putRequest(bodyFormData, idCompany)
  }

  async putRequest(bodyFormData, idCompany) {
    const putData = await put(`/company/photo/`+idCompany, bodyFormData, 'multipart/form-data')
    if (putData.data.status === 200) {
      await window.location.reload()
    }
  }

  onChange = async event => {
    await this.setState({
      companyPicture: event.target.files[0]
    })
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
                  <div className="form-group row">
                    <div className="col-12">
                      <label>Company Picture</label>
                      <input
                        autoFocus
                        className='form-control'
                        type='file'
                        placeholder='Browse...'
                        onChange={this.onChange}
                      />
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

export default PhotoModal