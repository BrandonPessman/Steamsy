import React from 'react'
import './Navigation.css'

import { Link } from 'react-router-dom'

function Navigation () {
  return (
    <div className='Navigation'>
      <h1 className='Logo'>
        <Link to='/'>Steamsy</Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>Game Lookup</Link>
        </li>
        <li>
          <Link to='/'>Top Games</Link>
        </li>
        <li>
          <Link to='/'>About</Link>
        </li>
        <li>
          <Link to='/'>Contact</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
