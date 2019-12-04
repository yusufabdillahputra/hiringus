/**
 * Date : 26/11/2019
 * Time : 22:07
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EngineerCard extends Component {
  render () {
    return (
      <div className="col-md-4 animated fadeIn" data-toggle="appear">
        <div className="block block-rounded">
          <div className="block-content p-0 overflow-hidden">
            <Link className="img-link" to={`/engineer/${this.props.id}`}>
              <img
                className="img-fluid rounded-top"
                width="512px"
                height="512px"
                src={this.props.image}
                alt={`Engineer ${this.props.name}`}
              />
            </Link>
          </div>
          <div className="block-content bg-gd-sea">
            <h4 className="font-size-h5 mb-10 text-white">{this.props.name}</h4>
            <p className="text-white">
              {this.props.position}
            </p>
          </div>
          <div className="block-content bg-primary">
            <div className='row'>
              <div className='col-12'>
                <p className='text-white'>
                  <i className="fa fa-fw fa-product-hunt mr-5"></i> Project <b>{this.props.project}</b>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <p className='text-white'>
                  <i className="fa fa-star text-warning mr-5"></i> Success Rate <b>{this.props.successRate}%</b>
                </p>
              </div>
            </div>
          </div>
          <div className="block-content bg-primary-dark">
            <div className="row">
              <div className="col-12">
                <p className='text-white'>
                  <i className="fa fa-fw fa-area-chart mr-5"></i> Skill
                </p>
                <ul>
                  {this.props.skills.map((skill, index) => {
                    return (
                      <li className='text-white' key={index}>{skill}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EngineerCard