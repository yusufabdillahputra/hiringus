/**
 * Date : 28/11/2019
 * Time : 18:41
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

class ModalLogout extends Component {

  constructor(props) {
    super(props)

    this.state = {
      logout : false
    }
  }

  setLocalStorage = (e) => {
    this.setState({
      logout: true
    })
    this.props.returnStateLogout(this.state.logout)
    localStorage.clear()
  }

  render () {
    return (
      <div className="modal fade" id={`modalLogout`} tabIndex="-1" role="dialog" aria-labelledby="modal-fadein" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="block block-themed block-transparent mb-0">
              <div className={`block-header bg-danger`} >
                <h3 className="block-title">Logout</h3>
                <div className="block-options">
                  <button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
                    <i className="si si-close"></i>
                  </button>
                </div>
              </div>
              <div className="block-content">
                <h4>
                  Are you sure to logout ?
                </h4>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-alt-secondary" data-dismiss="modal">No</button>
              <button type='button' className='btn btn-alt-danger' data-dismiss="modal" onClick={this.setLocalStorage}>
                Yes, i'am sure
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalLogout