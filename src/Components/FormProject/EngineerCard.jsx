/**
 * Date : 26/11/2019
 * Time : 22:07
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoadingComponent from '../../Global/Template/LoadingComponent'

class EngineerCard extends Component {

  constructor (props) {
    super(props);

    this.state = {
      ribbonColor : null,
      ribbonIcon : null,
      ribbonText : null
    }
  }

  async componentDidMount () {
    const status = await this.props.statusProject
    if (status === 0) {
      await this.setState({
        ribbonColor : 'warning',
        ribbonIcon : 'question-circle-o',
        ribbonText : 'Process'
      })
    } else if (status === 1) {
      await this.setState({
        ribbonColor : 'info',
        ribbonIcon : 'check',
        ribbonText : 'Accepted'
      })
    } else if (status === 2) {
      await this.setState({
        ribbonColor : 'success',
        ribbonIcon : 'flag-checkered',
        ribbonText : 'Done'
      })
    } else if (status === 3) {
      await this.setState({
        ribbonColor : 'danger',
        ribbonIcon : 'close',
        ribbonText : 'Not Interested'
      })
    }
  }

  render () {
    if (this.state.ribbonColor !== null) {
      return (
        <div className='col-md-4 animated fadeIn' data-toggle='appear'>
          <div className='block block-rounded'>
            <div className={`block-content p-0 overflow-hidden ribbon ribbon-bookmark ribbon-${this.state.ribbonColor}`}>
              <div className="ribbon-box">
                <i className={`si si-${this.state.ribbonIcon}`} /> {this.state.ribbonText}
              </div>
              <Link to={`/engineer/${this.props.id}`} className='img-link' >
                <img
                  className='img-fluid rounded-top'
                  width='512px'
                  height='512px'
                  src={`http://localhost:3000/engineer/${this.props.image}`}
                  alt={`Engineer ${this.props.name}`}
                />
              </Link>
            </div>
            <div className='block-content bg-primary'>
              <h4 className='font-size-h5 mb-10 text-white'>{this.props.name}</h4>
              <p className='text-white'>
                {this.props.position}
              </p>
            </div>
          </div>
        </div>
      )
    } else {
      return <LoadingComponent
        icon='fa-spinner'
        message='Please wait.....'
        sizeIcon={4}
      />
    }
  }
}

export default EngineerCard
