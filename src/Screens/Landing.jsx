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
import { readAllProjectSkillEngineer } from '../Utils/redux/actions/users/readAllProjectSkillEngineer'

/**
 * Globals
 */
import AppWrapper from '../Global/App/AppWrapper'
import LoadingPage from '../Global/Template/LoadingPage'
import LoadingComponent from '../Global/Template/LoadingComponent'

const mapStateToProps = stateAction => {
  return {
    data: stateAction
  }
}

const styleCss = {
  hero: {
    backgroundImage: `url(${ImageBG})`
  }
}

class Landing extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      propsEngineer: []
    }
  }

  async componentDidMount () {
    const propsEngineer = await this.setPropsEngineer()
    await this.setState({
      propsEngineer: propsEngineer
    })
  }


  /**
   * Get props from redux
   *
   * @param prevProps
   * @param prevState
   * @returns {Promise<void>}
   */
  async componentDidUpdate (prevProps, prevState) {
    if (prevProps.data.Landing_postCategory.stateArray.fieldValue !== this.props.data.Landing_postCategory.stateArray.fieldValue) {
      const fieldName = this.props.data.Landing_postCategory.stateArray.fieldName
      const fieldValue = this.props.data.Landing_postCategory.stateArray.fieldValue
      const propsEngineer = await this.setPropsEngineer(fieldName, fieldValue)
      await this.setState({
        isLoading: true,
        propsEngineer: propsEngineer
      })
    }
    if (prevState.isLoading !== this.state.isLoading) {
      await this.setState({
        isLoading: false,
      })
    }
  }

  async setPropsEngineer (fieldName = null, fieldValue = null) {
    const engineer = await this.props.dispatch(readAllProjectSkillEngineer(fieldName, fieldValue))
    return engineer.value.data.payload
  }

  render () {
    if (this.state.isLoading) {
      return (
        <LoadingComponent
          icon='fa-spinner'
          message='Please wait.....'
          sizeIcon={4}
        />
      )
    }
    if (this.state.propsEngineer.length > 0 && this.state.isLoading === false) {
      return (
        <AppWrapper>
          <Hero
            styleCss={styleCss.hero}
            icon='fa-smile-o'
            title='Come On'
            subTitle='Join and hire highly capable engineer for your project'
          />
          <Category
            image={ImageCategory}
          />
          <Engineer
            engineer={this.state.propsEngineer}
          />
        </AppWrapper>
      )
    } else {
      return (
        <LoadingPage
          icon='fa-spinner'
          message='Please wait.....'
        />
      )
    }
  }
}

export default connect(mapStateToProps)(Landing)
