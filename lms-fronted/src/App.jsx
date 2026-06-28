import { useEffect, useMemo, useState } from 'react'
import './App.css'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminProfile from './components/admin/AdminProfile'
import Books, { BookCatalog } from './components/admin/Books'
import Categories from './components/admin/Categories'
import Fines from './components/admin/Fines'
import IssueBook from './components/admin/IssueBook'
import Reports from './components/admin/Reports'
import ReturnBook from './components/admin/ReturnBook'
import Students from './components/admin/Students'
import AuthScreen from './components/auth/AuthScreen'
import AppShell from './components/layout/AppShell'
import StudentBooks from './components/student/StudentBooks'
import StudentDashboard from './components/student/StudentDashboard'
import StudentFines from './components/student/StudentFines'
import StudentProfile from './components/student/StudentProfile'
import {
  adminPages,
  emptyBook,
  emptyCategory,
  emptyStudent,
  ORGANIZATION_NAME,
  sameOrganization,
  studentPages,
} from './constants/library'
import {
  createBook,
  createCategory,
  createIssue,
  createStudent,
  deleteBook,
  deleteCategory,
  deleteStudent,
  getBooks,
  getCategories,
  getFines,
  getIssues,
  getReturns,
  getStudents,
  loginUser,
  markFinePaid,
  registerUser,
  returnBook,
  updateBook,
  updateCategory,
  updateStudent,
} from './services/StudentService'

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('lmsUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const isAdmin = currentUser?.role === 'ADMIN'
  const pages = isAdmin ? adminPages : studentPages
  const [page, setPage] = useState(isAdmin ? 'Dashboard' : 'My Dashboard')
  const [message, setMessage] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [students, setStudents] = useState([])
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [issues, setIssues] = useState([])
  const [returns, setReturns] = useState([])
  const [fines, setFines] = useState([])
  const [studentForm, setStudentForm] = useState(emptyStudent)
  const [bookForm, setBookForm] = useState(emptyBook)
  const [categoryForm, setCategoryForm] = useState(emptyCategory)
  const [issueForm, setIssueForm] = useState({ studentId: '', bookId: '', dueDate: '' })
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', role: 'STUDENT', organizationName: ORGANIZATION_NAME })
  const [editingStudentId, setEditingStudentId] = useState(null)
  const [editingBookId, setEditingBookId] = useState(null)
  const [editingCategoryId, setEditingCategoryId] = useState(null)

  const loadData = async () => {
    try {
      const [studentsRes, booksRes, categoriesRes, issuesRes, returnsRes, finesRes] = await Promise.all([
        getStudents(),
        getBooks(),
        getCategories(),
        getIssues(),
        getReturns(),
        getFines(),
      ])
      setStudents(studentsRes.data)
      setBooks(booksRes.data)
      setCategories(categoriesRes.data)
      setIssues(issuesRes.data)
      setReturns(returnsRes.data)
      setFines(finesRes.data)
      setMessage('')
      return true
    } catch {
      setMessage('Backend is not running. Start Spring Boot on http://localhost:8080 to load live data.')
      return false
    }
  }

  useEffect(() => {
    if (currentUser) {
      loadData()
      setPage(currentUser.role === 'ADMIN' ? 'Dashboard' : 'My Dashboard')
    }
  }, [currentUser])

  const studentRecord = useMemo(() => {
    if (!currentUser) return null
    return students.find((student) => (
      student.email?.toLowerCase() === currentUser.email?.toLowerCase()
      && sameOrganization(student.organizationName, currentUser.organizationName)
    )) || null
  }, [currentUser, students])

  const visibleStudents = useMemo(() => {
    if (!currentUser) return []
    return students.filter((student) => sameOrganization(student.organizationName, currentUser.organizationName))
  }, [currentUser, students])

  const activeVisibleStudents = useMemo(() => visibleStudents.filter((student) => student.active), [visibleStudents])

  const visibleStudentIds = useMemo(() => new Set(visibleStudents.map((student) => student.id)), [visibleStudents])
  const visibleIssues = useMemo(() => issues.filter((issue) => visibleStudentIds.has(issue.studentId)), [issues, visibleStudentIds])
  const visibleIssueIds = useMemo(() => new Set(visibleIssues.map((issue) => issue.issueId)), [visibleIssues])
  const visibleReturns = useMemo(() => returns.filter((item) => visibleIssueIds.has(item.issueId)), [returns, visibleIssueIds])
  const visibleFines = useMemo(() => fines.filter((fine) => visibleStudentIds.has(fine.studentId)), [fines, visibleStudentIds])
  const visibleActiveIssues = useMemo(() => visibleIssues.filter((issue) => issue.status === 'ISSUED'), [visibleIssues])

  const orgDashboard = useMemo(() => ({
    totalStudents: visibleStudents.length,
    activeStudents: visibleStudents.filter((student) => student.active).length,
    totalBooks: books.length,
    availableBooks: books.reduce((total, book) => total + Number(book.bookcopy || 0), 0),
    issuedBooks: visibleIssues.length,
    returnedBooks: visibleReturns.length,
    pendingReturns: visibleActiveIssues.length,
    totalFines: visibleFines.reduce((total, fine) => total + Number(fine.amount || 0), 0),
  }), [books, visibleActiveIssues, visibleFines, visibleIssues, visibleReturns, visibleStudents])

  const studentIssueIds = useMemo(() => {
    if (!studentRecord) return new Set()
    return new Set(issues.filter((issue) => issue.studentId === studentRecord.id).map((issue) => issue.issueId))
  }, [issues, studentRecord])

  const studentIssues = useMemo(() => {
    if (!studentRecord) return []
    return issues.filter((issue) => issue.studentId === studentRecord.id)
  }, [issues, studentRecord])

  const studentReturns = useMemo(() => returns.filter((item) => studentIssueIds.has(item.issueId)), [returns, studentIssueIds])
  const studentFines = useMemo(() => {
    if (!studentRecord) return []
    return fines.filter((fine) => fine.studentId === studentRecord.id)
  }, [fines, studentRecord])

  const showMessage = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    const refreshed = await loadData()
    setRefreshing(false)
    if (refreshed) {
      showMessage('Data refreshed successfully')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginUser(loginForm)
      if (!response.data.success) {
        showMessage(response.data.message || 'Invalid email or password')
        return
      }
      const user = {
        email: response.data.email || loginForm.email,
        name: response.data.name || loginForm.email,
        role: (response.data.role || 'STUDENT').toUpperCase(),
        organizationName: response.data.organizationName || ORGANIZATION_NAME,
        token: response.data.token,
      }
      localStorage.setItem('lmsUser', JSON.stringify(user))
      setCurrentUser(user)
      showMessage(`${user.role === 'ADMIN' ? 'Admin' : 'Student'} login successful`)
    } catch {
      showMessage('Login failed. Please check backend connection.')
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    await registerUser(registerForm)
    setRegisterForm({ name: '', email: '', password: '', role: 'STUDENT', organizationName: ORGANIZATION_NAME })
    showMessage('User registered successfully. Please login now.')
  }

  const handleLogout = () => {
    localStorage.removeItem('lmsUser')
    setCurrentUser(null)
    setLoginForm({ email: '', password: '' })
  }

  const saveStudent = async (event) => {
    event.preventDefault()
    if (editingStudentId) {
      await updateStudent(editingStudentId, studentForm)
      showMessage('Student updated successfully')
    } else {
      await createStudent({ ...studentForm, organizationName: studentForm.organizationName || currentUser.organizationName, active: true })
      showMessage('Student added successfully')
    }
    setStudentForm(emptyStudent)
    setEditingStudentId(null)
    loadData()
  }

  const saveBook = async (event) => {
    event.preventDefault()
    const payload = { ...bookForm, bookcopy: Number(bookForm.bookcopy), categoryId: bookForm.categoryId || null }
    if (editingBookId) {
      await updateBook(editingBookId, payload)
      showMessage('Book updated successfully')
    } else {
      await createBook(payload)
      showMessage('Book added successfully')
    }
    setBookForm(emptyBook)
    setEditingBookId(null)
    loadData()
  }

  const saveCategory = async (event) => {
    event.preventDefault()
    if (editingCategoryId) {
      await updateCategory(editingCategoryId, categoryForm)
      showMessage('Category updated successfully')
    } else {
      await createCategory(categoryForm)
      showMessage('Category added successfully')
    }
    setCategoryForm(emptyCategory)
    setEditingCategoryId(null)
    loadData()
  }

  const saveIssue = async (event) => {
    event.preventDefault()
    await createIssue({
      studentId: Number(issueForm.studentId),
      bookId: Number(issueForm.bookId),
      dueDate: issueForm.dueDate || null,
    })
    setIssueForm({ studentId: '', bookId: '', dueDate: '' })
    showMessage('Book issued successfully')
    loadData()
  }

  const handleReturn = async (issueId) => {
    await returnBook(issueId)
    showMessage('Book returned and fine calculated')
    loadData()
  }

  const renderStudentPage = () => {
    if (page === 'My Dashboard') {
      return <StudentDashboard user={currentUser} student={studentRecord} issues={studentIssues} returns={studentReturns} fines={studentFines} />
    }
    if (page === 'Books') {
      return <BookCatalog books={books} />
    }
    if (page === 'My Books') {
      return <StudentBooks issues={studentIssues} returns={studentReturns} />
    }
    if (page === 'Fines') {
      return <StudentFines fines={studentFines} />
    }
    return <StudentProfile user={currentUser} student={studentRecord} onLogout={handleLogout} />
  }

  const renderAdminPage = () => {
    if (page === 'Dashboard') return <AdminDashboard dashboard={orgDashboard} issues={visibleIssues} returns={visibleReturns} fines={visibleFines} />
    if (page === 'Students') {
      return (
        <Students
          form={studentForm}
          setForm={setStudentForm}
          onSubmit={saveStudent}
          students={activeVisibleStudents}
          editingId={editingStudentId}
          onEdit={(student) => {
            setEditingStudentId(student.id)
            setStudentForm({ ...student, organizationName: student.organizationName || currentUser.organizationName })
          }}
          onDelete={async (id) => {
            await deleteStudent(id)
            showMessage('Student removed or marked inactive successfully')
            loadData()
          }}
        />
      )
    }
    if (page === 'Books') {
      return (
        <Books
          form={bookForm}
          setForm={setBookForm}
          onSubmit={saveBook}
          books={books}
          categories={categories}
          editingId={editingBookId}
          onEdit={(book) => {
            setEditingBookId(book.bookId)
            setBookForm({ ...book, categoryId: book.categoryId || '' })
          }}
          onDelete={async (id) => {
            await deleteBook(id)
            showMessage('Book deleted successfully')
            loadData()
          }}
        />
      )
    }
    if (page === 'Categories') {
      return (
        <Categories
          form={categoryForm}
          setForm={setCategoryForm}
          onSubmit={saveCategory}
          categories={categories}
          editingId={editingCategoryId}
          onEdit={(category) => {
            setEditingCategoryId(category.categoryId)
            setCategoryForm(category)
          }}
          onDelete={async (id) => {
            await deleteCategory(id)
            showMessage('Category deleted successfully')
            loadData()
          }}
        />
      )
    }
    if (page === 'Issue Book') {
      return <IssueBook form={issueForm} setForm={setIssueForm} onSubmit={saveIssue} students={visibleStudents} books={books} issues={visibleIssues} onReturn={handleReturn} />
    }
    if (page === 'Return Book') {
      return <ReturnBook issues={visibleActiveIssues} returns={visibleReturns} students={visibleStudents} onReturn={handleReturn} />
    }
    if (page === 'Fines') {
      return <Fines fines={visibleFines} students={visibleStudents} onPaid={async (id) => { await markFinePaid(id); showMessage('Fine marked as paid'); loadData() }} />
    }
    if (page === 'Reports') {
      return <Reports students={visibleStudents} books={books} issues={visibleIssues} returns={visibleReturns} fines={visibleFines} />
    }
    return <AdminProfile user={currentUser} onLogout={handleLogout} />
  }

  if (!currentUser) {
    return (
      <AuthScreen
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        onLogin={handleLogin}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        onRegister={handleRegister}
        message={message}
      />
    )
  }

  return (
    <AppShell
      currentUser={currentUser}
      pages={pages}
      page={page}
      setPage={setPage}
      message={message}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      onLogout={handleLogout}
    >
      {isAdmin ? renderAdminPage() : renderStudentPage()}
    </AppShell>
  )
}

export default App
