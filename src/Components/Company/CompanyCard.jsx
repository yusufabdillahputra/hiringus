/**
 * Date : 07/12/2019
 * Time : 23:32
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CompanyCard extends Component {

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

  render () {
    return (
      <div className='col-md-4 animated fadeIn' data-toggle='appear'>
        <div className='block block-rounded'>
          <div className={`block-content p-0 overflow-hidden ribbon ribbon-bookmark ribbon-${this.state.ribbonColor}`}>
            <div className="ribbon-box">
              <i className={`si si-${this.state.ribbonIcon}`} /> {this.state.ribbonText}
            </div>
            <Link className='img-link' to={`/company/${this.props.id}`}>
              <img
                className='img-fluid rounded-top'
                width='512px'
                height='512px'
                src={`http://54.144.101.230:3000/company/${this.props.photo}`}
                alt={`Company ${this.props.name}`}
              />
            </Link>
          </div>
          <div className='block-content bg-primary'>
            <h4 className='font-size-h5 mb-10 text-white'>{this.props.name}</h4>
          </div>
          <div className="block-content bg-primary-darker">
            <div className='row'>
              <div className='col-12'>
                <p className='text-white'>
                  <i className='fa fa-building-o mr-5' /> City <b>{this.props.city}</b>
                </p>
              </div>
              <div className='col-12'>
                <p className='text-white'>
                  <i className='fa fa-fw fa-map-o mr-5' /> Province <b>{this.props.province}</b>
                </p>
              </div>
              <div className='col-12'>
                <p className='text-white'>
                  <i className='si si-flag mr-5' /> Country <b>{this.props.nation}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompanyCard