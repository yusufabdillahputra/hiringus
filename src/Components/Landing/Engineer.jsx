/**
 * Date : 26/11/2019
 * Time : 22:01
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react'



import UserOne from '../../Assets/Image/Users/1.png'
import UserTwo from '../../Assets/Image/Users/2.png'
import UserThree from '../../Assets/Image/Users/3.png'
import UserFour from '../../Assets/Image/Users/4.png'
import UserFive from '../../Assets/Image/Users/5.png'
import UserSix from '../../Assets/Image/Users/6.png'

import EngineerCard from './EngineerCard'


const Contents = [
  {
    id: 1,
    name: 'Yusuf Abdillah Putra',
    image: UserOne,
    position: 'Fullstack JS Developer',
    project: 10,
    successRate: 99,
    skills: [
      'PHP',
      'Javascript',
      'Laravel',
      'Lumen'
    ]
  },
  {
    id: 2,
    name: 'Yusuf Abdillah Putra',
    image: UserTwo,
    position: 'Fullstack JS Developer',
    project: 10,
    successRate: 99,
    skills: [
      'PHP',
      'Javascript',
      'Laravel',
      'Lumen'
    ]
  },
  {
    id: 1,
    name: 'Yusuf Abdillah Putra',
    image: UserThree,
    position: 'Fullstack JS Developer',
    project: 10,
    successRate: 99,
    skills: [
      'PHP',
      'Javascript',
      'Laravel',
      'Lumen'
    ]
  },
  {
    id: 1,
    name: 'Yusuf Abdillah Putra',
    image: UserFour,
    position: 'Fullstack JS Developer',
    project: 10,
    successRate: 99,
    skills: [
      'PHP',
      'Javascript',
      'Laravel',
      'Lumen'
    ]
  },
  {
    id: 1,
    name: 'Yusuf Abdillah Putra',
    image: UserFive,
    position: 'Fullstack JS Developer',
    project: 10,
    successRate: 99,
    skills: [
      'PHP',
      'Javascript',
      'Laravel',
      'Lumen'
    ]
  },
  {
    id: 1,
    name: 'Yusuf Abdillah Putra',
    image: UserSix,
    position: 'Fullstack JS Developer',
    project: 10,
    successRate: 99,
    skills: [
      'PHP',
      'Javascript',
      'Laravel',
      'Lumen'
    ]
  },
]

class Engineer extends Component {

  render () {
    return (
      <div className='bg-white'>
        <div className='container'>
          <div className='block-content block-content-full'>
            <div className='row'>
              {Contents.map((content, index) => {
                return <EngineerCard
                  id={content.id}
                  name={content.name}
                  image={content.image}
                  position={content.position}
                  project={content.project}
                  successRate={content.successRate}
                  skills={content.skills}
                  key={index}
                />
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Engineer