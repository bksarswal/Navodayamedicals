import React from 'react'


import { BrowserRouter } from 'react-router-dom'
import Combinerouter from './Routing/combinerouter'

const App = () => {
  return (
    <div>
  
  <BrowserRouter>
  <Combinerouter/>
  </BrowserRouter>
  


    </div>
  )
}

export default App