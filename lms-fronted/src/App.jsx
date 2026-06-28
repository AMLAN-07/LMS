import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import StudentInfo from './components/StudentInfo'
import AddStudent from './components/Navigation/AddStudent'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/LogRegd/Login'
import Register from './components/LogRegd/Register'
import ListBook from './components/Navigation/ListBook'
import BookInfo from './components/BookInfo'
import ListBookBar from './components/Navigation/ListBookBar'
import AddBook from './components/Navigation/AddBook'
import BorrowBook from './components/Navigation/BorrowBook'
import StudentBookReport from './components/Navigation/StudentBookReport'
import ReturnBook from './components/Navigation/ReturnBook'

// Routes where the Header should be hidden (auth pages)
const HIDE_HEADER_ROUTES = ['/', '/login', '/register']

const AppLayout = () => {
  const location = useLocation()
  const hideHeader = HIDE_HEADER_ROUTES.includes(location.pathname)

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* //http://localhost:3000 */}
        <Route path='/Dashboard' element={<Dashboard />}></Route>
        <Route path='/Book' element={<BookInfo/>}></Route>
        {/* //http://localhost:3000/students */}
        <Route path='/students' element={<StudentInfo />}></Route>
        <Route path='/borrow' element={<BorrowBook />}></Route>
        <Route path='/report' element={<StudentBookReport/>}></Route>
        <Route path='/return' element={<ReturnBook/>}></Route>
        {/* //http://localhost:3000/add-student */}
        <Route path='/add-student' element={<AddStudent />}></Route>
        <Route path='/add-book' element={<AddBook />}></Route>
        <Route path='/edit-book/:bookId' element={<AddBook />}></Route>
        {/* //http://localhost:3000/edit-student/#id */}
        <Route path='/edit-student/:id' element={<AddStudent />}></Route>
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App