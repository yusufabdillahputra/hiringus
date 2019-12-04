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
import ImageCategory from '../Assets/Image/Landing/category/category.png'

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
//import { getUsers } from '../Utils/redux/actions/users'
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
      data: []
    }
  }

  componentDidMount () {

  }

  render () {
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
        <Engineer />
      </AppWrapper>
    )
  }
}

export default connect(catchStateActionRedux)(Landing)