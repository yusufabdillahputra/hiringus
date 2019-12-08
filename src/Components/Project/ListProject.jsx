/**
 * Date : 08/12/2019
 * Time : 15:12
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class ListProject extends Component {
  render () {
    return (
      <div className="block block-rounded">
        <div className='block-header bg-primary'>
          <h3 className="h5 font-w700 text-white">
            <i className="si si-briefcase mr-5" /> {this.props.name}
          </h3>
        </div>
        <div className="block-content block-content-full">
          <div className="row align-items-center">
            <div className="col-sm-6 py-10">
              <p className="font-size-sm mb-10">
                {this.props.description}
              </p>
              <p className="font-size-sm text-muted mb-10">
                Expires {moment(this.props.deadline, "YYYYMMDD").fromNow()}
              </p>
              <h5>
                Rp {this.props.fee === null ? 0 : this.props.fee}
              </h5>
            </div>
            <div className="col-sm-6 py-10 text-md-right">
              <Link className="btn btn-sm btn-outline-secondary btn-rounded mr-5 my-5" to={`/project/${this.props.id}`}>
                <i className="fa fa-wrench mr-1" /> Manage
              </Link>
              <button className="btn btn-sm btn-outline-danger btn-rounded mr-5 my-5" data-toggle='modal' data-target="#modalDeleteProject">
                <i className="fa fa-times mr-1" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListProject