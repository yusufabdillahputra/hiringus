/**
 * Date : 26/11/2019
 * Time : 22:01
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

import EngineerCard from './EngineerCard'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'

const catchStateActionRedux = stateAction => {
  return {
    data: stateAction
  }
}

class Engineer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      engineer: [],
      project: [],
      skill: []
    }
  }

  componentDidMount () {
    this.setState({
      engineer: this.props.engineer,
      project: this.props.project,
      skill: this.props.skill
    })
  }

  render () {
    const contents = this.state.engineer
    if (contents.length > 0) {
      console.log(this.state)
      return (
        <div className='bg-white'>
          <div className='container'>
            <div className='block-content block-content-full'>
              <div className='row'>
                {this.state.engineer.map((content, index) => {
                  console.log(content)
                  return <EngineerCard
                    id={content.id_engineer}
                    name={content.name_users}
                    image={`http://localhost:3000/engineer/`+content.photo_engineer}
                    position={content.focus_engineer}
                    key={index}
                  />
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return 'Loading...'
    }
  }
}

export default connect(catchStateActionRedux)(Engineer)