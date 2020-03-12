import React from 'react'
import Navigation from './components/navigation/Navigation'
import Landing from './components/pages/Landing/Landing'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <Router>
        <Navigation />
        <Switch>
          <Route path='/'>
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
