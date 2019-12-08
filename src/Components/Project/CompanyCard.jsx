/**
 * Date : 08/12/2019
 * Time : 06:02
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
      <div className='block block-rounded'>
        <div className='block-header bg-primary'>
          <h1 className='block-title text-white'>
            <i className='fa fa-building-o' /> Your Company
          </h1>
        </div>
        <div className={`block-content p-0 overflow-hidden ribbon ribbon-bookmark ribbon-${this.state.ribbonColor}`}>
          <div className="ribbon-box">
            <i className={`si si-${this.state.ribbonIcon}`} /> {this.state.ribbonText}
          </div>
          <Link to={`/company/${this.props.id}`} className="img-link img-fluid" >
            <img
              className='img-fluid rounded-top'
              width='512px'
              height='512px'
              src={`http://54.144.101.230:3000/company/${this.props.photo}`}
              alt={`Company ${this.props.name}`}
            />
          </Link>
        </div>
        <div className='block-content block-content-full bg-primary-light text-center'>
          <Link to={`/company/${this.props.id}`} className='btn btn-md btn-rounded btn-primary'>
            Change company description
          </Link>
        </div>
        <div className='block-content bg-primary-darker text-center'>
          <h4 className='font-size-h5 mb-10 text-white'>{this.props.name}</h4>
        </div>
      </div>
    )
  }
}

export default CompanyCard