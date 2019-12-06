/**
 * Date : 26/11/2019
 * Time : 22:07
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EngineerCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      successRate: 0
    }
  }

  async componentDidMount () {
    const formula = await this.formulaSuccessRate(this.props.projects)
    await this.setState({
      successRate: formula.result
    })
  }

  formulaSuccessRate (projects) {
    const projectOffer = []
    const projectDone = []
    const projectAccept = []
    // eslint-disable-next-line array-callback-return
    projects.map(project => {
      if (project.status_project_engineer === 0) {
        projectOffer.push(project.id_project_engineer)
      }
      if (project.status_project_engineer === 1) {
        projectAccept.push(project.id_project_engineer)
      }
      if (project.status_project_engineer === 2) {
        projectDone.push(project.id_project_engineer)
      }
    })
    return {
      result: ((projectDone.length) / projectAccept.length) * 100 || 0,
      projectAll: projects.length,
      projectOffer: projectOffer.length,
      projectAccept: projectAccept.length,
      projectDone: projectDone.length
    }
  }

  render () {
    return (
      <div className='col-md-4 animated fadeIn' data-toggle='appear'>
        <div className='block block-rounded'>
          <div className='block-content p-0 overflow-hidden'>
            <Link className='img-link' to={`/engineer/${this.props.id}`}>
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
          <div className='block-content bg-primary-dark'>
            <div className='row'>
              <div className='col-12'>
                <p className='text-white'>
                  <i className='fa fa-fw fa-product-hunt mr-5' /> Project <b>{this.props.projects.length}</b>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <p className='text-white'>
                  <i className='fa fa-star text-warning mr-5' /> Success Rate <b>{this.state.successRate}%</b>
                </p>
              </div>
            </div>
          </div>
          <div className='block-content bg-primary-darker'>
            <div className='row'>
              <div className='col-12'>
                <p className='text-white'>
                  <i className='fa fa-fw fa-area-chart mr-5' /> Skills
                </p>
                {
                  (this.props.skills.length > 0)
                    ? <ul>
                      {this.props.skills.map((skill, index) => {
                        return (
                          <li className='text-white' key={index}>{skill.name_skill}</li>
                        )
                      })}
                    </ul>
                    : <ul><li className='text-white'>Empty</li></ul>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EngineerCard
