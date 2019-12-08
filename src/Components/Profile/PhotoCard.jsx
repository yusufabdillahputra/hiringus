/**
 * Date : 06/12/2019
 * Time : 07:25
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postPhotoModal } from '../../Utils/redux/actions/components/profile/postPhotoModal'

const mapStateToProps = dispatch => {
  return bindActionCreators({ postPhotoModal }, dispatch)
}

class PhotoCard extends Component {

  constructor (props) {
    super(props);

    this.state = {
      profileModal: false,
      roleUsers: null,
      idUsers: null
    }
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.profileModal !== this.state.profileModal) {
      await this.props.postPhotoModal(this.state)
    }
  }

  modalHandler = async event => {
    event.preventDefault()
    await this.setState({
      profileModal: true,
      roleUsers: this.props.role,
      idUsers: this.props.id
    })
  }

  render () {
    return (
      <div className="block block-rounded">
        <div className="block-content p-0 overflow-hidden ribbon ribbon-bookmark ribbon-warning">
          <div className="ribbon-box">
            <i className="si si-badge" /> {this.props.role}
          </div>
          <a href="#modalProfilePhoto" data-toggle="modal" onClick={this.modalHandler} className="img-link img-fluid">
            <img
              className="img-fluid rounded-top"
              width="512px"
              height="512px"
              src={`http://54.144.101.230:3000/${this.props.role}/${this.props.image}`}
              alt={`${this.props.name}`}
            />
          </a>
        </div>
        <div className="block-content block-content-full bg-primary-light text-center">
          <button data-toggle="modal" data-target='#modalProfilePhoto' onClick={this.modalHandler} className='btn btn-md btn-rounded btn-primary'>
            Change profile picture
          </button>
        </div>
        <div className="block-content bg-primary">
          <h4 className="font-size-h5 mb-10 text-white text-center">{this.props.name}</h4>
          <p className="text-white text-center">
            {this.props.position}
          </p>
        </div>
      </div>
    )
  }
}

export default connect(null, mapStateToProps)(PhotoCard)