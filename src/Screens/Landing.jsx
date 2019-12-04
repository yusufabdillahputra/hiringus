/**
 * Date : 04/12/2019
 * Time : 09:14
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'

/**
 * Image
 */
import ImageBG from '../Assets/Image/Background/bg_hero.jpg'
import ImageCategory from '../Assets/Image/Landing/category/category.svg'

/**
 * Components
 */
import Hero from '../Components/Landing/Hero'
import Category from '../Components/Landing/Category'
import Engineer from '../Components/Landing/Engineer'

/**
 * Redux Actions
 */
import { connect } from 'react-redux'
import AppWrapper from '../Global/App/AppWrapper'
import { readAllEngineer } from '../Utils/redux/actions/users/readAllEngineer'
import { readAllProjectEngineer } from '../Utils/redux/actions/project/readAllProjectEngineer'
import { readAllSkillEngineer } from '../Utils/redux/actions/skill/readAllSkillEngineer'

const catchStateActionRedux = stateAction => {
  return {
    data: stateAction
  }
}

const styleCss = {
  backgroundImage: `url(${ImageBG})`
}

class Landing extends Component {
  constructor (props) {
    super(props);

    this.state = {
      propsEngineer: [],
      propsProject: [],
      propsSkill: []
    }
  }

  componentDidMount () {
    this.setContentEngineer()
    this.setContentProject()
    this.setContentSkill()
  }

  async setContentEngineer () {
    const engineer = await this.props.dispatch(readAllEngineer())
    const rowsEngineer = engineer.value.data.payload.rows
    this.setState({
      propsEngineer: rowsEngineer
    })
  }

  async setContentProject () {
    const projects = await this.props.dispatch(readAllProjectEngineer())
    const rowsProjects = projects.value.data.payload.rows
    this.setState({
      propsProject: rowsProjects
    })
  }

  async setContentSkill () {
    const skills = await this.props.dispatch(readAllSkillEngineer())
    const rowsSkills = skills.value.data.payload.rows
    this.setState({
      propsSkill: rowsSkills
    })
  }

  render () {
    if (this.state.propsEngineer.length > 0) {
      return (
        <AppWrapper>
          <Hero
            styleCss={styleCss}
            icon='fa-smile-o'
            title='Come On'
            subTitle='Join and hire highly capable engineer for your project'
          />
          <Category
            image={ImageCategory}
          />
          <Engineer
            engineer={this.state.propsEngineer}
            project={this.state.propsProject}
            skill={this.state.propsSkill}
          />
        </AppWrapper>
      )
    }
    else {
      return 'Loading...'
    }
  }
}

export default connect(catchStateActionRedux)(Landing)