import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentInfo from './components/StudentInfo'
import AddStudent from './components/Navigation/AddStudent'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/LogRegd/Login'

const App = () => {

  return (
    <>
  <Login/>
    </>
  )
}

export default App