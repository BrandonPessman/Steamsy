import React from 'react'
import './Landing.css'

import Background from '../../../images/bg3.jpg'

function Landing () {
  return (
    <div className='Landing'>
      <img
        className='Background'
        src={Background}
        alt='steam logo with games'
      />
    </div>
  )
}

export default Landing
