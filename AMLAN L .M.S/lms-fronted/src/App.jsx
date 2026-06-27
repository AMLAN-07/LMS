import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentInfo from './components/StudentInfo'
import AddStudent from './components/Navigation/AddStudent'
import Dashboard from './components/Dashboard/Dashboard'
import BookSection from './components/Books/BookSection'
import ReportSection from './components/Reports/ReportSection'
import AdminControlSection from './components/Admin/AdminControlSection'

const App = () => {

  return (
  <>
    <BrowserRouter>
     <Header/>
      <Routes>
        {/* //http://localhost:3000 */}
        <Route path='/' element={<Dashboard/>


      }></Route>
        {/* //http://localhost:3000/students */}
        <Route path='/students' element={<StudentInfo/>}></Route>
        {/* //http://localhost:3000/books */}
        <Route path='/books' element={<BookSection/>}></Route>
        {/* //http://localhost:3000/reports */}
        <Route path='/reports' element={<ReportSection/>}></Route>
        {/* //http://localhost:3000/admin-control */}
        <Route path='/admin-control' element={<AdminControlSection/>}></Route>
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
