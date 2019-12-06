/**
 * Date : 26/11/2019
 * Time : 22:01
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'
import LoadingComponent from '../../Global/Template/LoadingComponent'

import EngineerCard from './EngineerCard'

class Engineer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      engineer: []
    }
  }

  async componentDidMount () {
    this.setState({
      isLoading: false,
      engineer: this.props.engineer
    })
  }

  render () {
    return (
      <div className='bg-white'>
        <div className='container'>
          <div className='block-content block-content-full'>
            <div className='row'>
              {
                (this.state.isLoading === false)
                  ? this.state.engineer.map((content, index) => {
                    return <EngineerCard
                      id={content.engineer.id_engineer}
                      name={content.engineer.name_users}
                      image={content.engineer.photo_users}
                      position={content.engineer.position_users}
                      projects={content.projects}
                      skills={content.skills}
                      key={index}
                    />
                  })
                  : <LoadingComponent
                    icon={'fa-spinner'}
                    message={'Please wait.....'}
                    sizeIcon={4}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Engineer