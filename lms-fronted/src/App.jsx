import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentInfo from './components/StudentInfo'
import AddStudent from './components/Navigation/AddStudent'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {

  return (
  <>
    <BrowserRouter>
     <Header/>
      <Routes>
        {/* //http://localhost:3000 */}
        <Route path='/' element={<Dashboard/>}></Route>
        {/* //http://localhost:3000/students */}
        <Route path='/students' element={<StudentInfo/>}></Route>
        {/* //http://localhost:3000/add-student */}
        <Route path='/add-student' element={<AddStudent/>}></Route>
        {/* //http://localhost:3000/edit-student/#id */}
        <Route path='/edit-student/:id' element={<AddStudent/>}></Route>
      </Routes>

    </BrowserRouter>
  </>
  )
}

export default App