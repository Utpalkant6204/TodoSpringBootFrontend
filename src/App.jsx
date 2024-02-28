import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import './App.css'


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      {/* <Route path='/edit/:id' element={<Edit />} /> */}
    </Routes>
  )
}

export default App