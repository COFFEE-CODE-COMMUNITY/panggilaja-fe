import React from 'react'
import Button from './components/common/Button'
import Input from './components/common/Input'
import { RouterProvider } from 'react-router-dom'
import Router from './Router'

const App = () => {
  return (
    <RouterProvider router={Router}/>
  )
}

export default App