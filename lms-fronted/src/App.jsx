import { useEffect, useMemo, useState } from 'react'
import './App.css'
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
  getDashboard,
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

const emptyStudent = { firstName: '', lastName: '', email: '', course: 'BCA', rollNumber: '', active: true }
const emptyBook = { title: '', author: '', isbn: '', publisher: '', bookcopy: 1, categoryId: '' }
const emptyCategory = { name: '', description: '' }

const adminPages = ['Dashboard', 'Students', 'Books', 'Categories', 'Issue Book', 'Return Book', 'Fines', 'Reports', 'Profile']
const studentPages = ['My Dashboard', 'Books', 'My Books', 'Fines', 'Profile']

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('lmsUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const isAdmin = currentUser?.role === 'ADMIN'
  const pages = isAdmin ? adminPages : studentPages
  const [page, setPage] = useState(isAdmin ? 'Dashboard' : 'My Dashboard')
  const [message, setMessage] = useState('')
  const [dashboard, setDashboard] = useState(null)
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
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' })
  const [editingStudentId, setEditingStudentId] = useState(null)
  const [editingBookId, setEditingBookId] = useState(null)
  const [editingCategoryId, setEditingCategoryId] = useState(null)

  const loadData = async () => {
    try {
      const [dashboardRes, studentsRes, booksRes, categoriesRes, issuesRes, returnsRes, finesRes] = await Promise.all([
        getDashboard(),
        getStudents(),
        getBooks(),
        getCategories(),
        getIssues(),
        getReturns(),
        getFines(),
      ])
      setDashboard(dashboardRes.data)
      setStudents(studentsRes.data)
      setBooks(booksRes.data)
      setCategories(categoriesRes.data)
      setIssues(issuesRes.data)
      setReturns(returnsRes.data)
      setFines(finesRes.data)
    } catch {
      setMessage('Backend is not running. Start Spring Boot on http://localhost:8080 to load live data.')
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
    return students.find((student) => student.email?.toLowerCase() === currentUser.email?.toLowerCase()) || null
  }, [currentUser, students])

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
  const activeIssues = useMemo(() => issues.filter((issue) => issue.status === 'ISSUED'), [issues])

  const showMessage = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(''), 3000)
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
    setRegisterForm({ name: '', email: '', password: '', role: 'STUDENT' })
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
      await createStudent({ ...studentForm, active: true })
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

  const renderPage = () => {
    if (!isAdmin) {
      if (page === 'My Dashboard') {
        return <StudentDashboard user={currentUser} student={studentRecord} issues={studentIssues} returns={studentReturns} fines={studentFines} />
      }
      if (page === 'Books') {
        return <BookCatalog books={books} categories={categories} />
      }
      if (page === 'My Books') {
        return <StudentBooks issues={studentIssues} returns={studentReturns} />
      }
      if (page === 'Fines') {
        return <StudentFines fines={studentFines} />
      }
      return <StudentProfile user={currentUser} student={studentRecord} onLogout={handleLogout} />
    }

    if (page === 'Dashboard') return <Dashboard dashboard={dashboard} issues={issues} returns={returns} fines={fines} />
    if (page === 'Students') {
      return (
        <Students
          form={studentForm}
          setForm={setStudentForm}
          onSubmit={saveStudent}
          students={students}
          editingId={editingStudentId}
          onEdit={(student) => {
            setEditingStudentId(student.id)
            setStudentForm(student)
          }}
          onDelete={async (id) => {
            await deleteStudent(id)
            showMessage('Student deleted successfully')
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
      return <IssueBook form={issueForm} setForm={setIssueForm} onSubmit={saveIssue} students={students} books={books} issues={issues} />
    }
    if (page === 'Return Book') {
      return <ReturnBook issues={activeIssues} returns={returns} onReturn={handleReturn} />
    }
    if (page === 'Fines') {
      return <Fines fines={fines} onPaid={async (id) => { await markFinePaid(id); showMessage('Fine marked as paid'); loadData() }} />
    }
    if (page === 'Reports') {
      return <Reports students={students} books={books} issues={issues} returns={returns} fines={fines} />
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
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">{currentUser.role}</p>
          <h1>Online Library</h1>
        </div>
        <nav>
          {pages.map((item) => (
            <button key={item} className={page === item ? 'active' : ''} onClick={() => setPage(item)}>
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Welcome, {currentUser.name}</p>
            <h2>{page}</h2>
          </div>
          <div className="topbar-actions">
            <button className="secondary-btn" onClick={loadData}>Refresh</button>
            <button className="danger-btn" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        {message && <div className="alert">{message}</div>}
        {renderPage()}
      </section>
    </main>
  )
}

function AuthScreen({ loginForm, setLoginForm, onLogin, registerForm, setRegisterForm, onRegister, message }) {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div>
          <p className="eyebrow">Library Management System</p>
          <h1>Login</h1>
        </div>
        {message && <div className="alert">{message}</div>}
        <div className="two-column">
          <form className="panel form-grid" onSubmit={onLogin}>
            <h3>Sign in</h3>
            <input required type="email" placeholder="Email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
            <input required type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button className="primary-btn">Login</button>
          </form>
          <form className="panel form-grid" onSubmit={onRegister}>
            <h3>Register User</h3>
            <input required placeholder="Name" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} />
            <input required type="email" placeholder="Email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
            <input required type="password" placeholder="Password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
            <select value={registerForm.role} onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}>
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button className="primary-btn">Create Account</button>
          </form>
        </div>
      </section>
    </main>
  )
}

function Dashboard({ dashboard, issues, returns, fines }) {
  const cards = [
    ['Total Students', dashboard?.totalStudents || 0],
    ['Active Students', dashboard?.activeStudents || 0],
    ['Total Books', dashboard?.totalBooks || 0],
    ['Available Copies', dashboard?.availableBooks || 0],
    ['Issue Records', dashboard?.issuedBooks || 0],
    ['Returned Books', dashboard?.returnedBooks || 0],
    ['Pending Returns', dashboard?.pendingReturns || 0],
    ['Total Fines', `Rs. ${dashboard?.totalFines || 0}`],
  ]
  return (
    <>
      <div className="stats-grid">
        {cards.map(([label, value]) => <StatCard key={label} label={label} value={value} />)}
      </div>
      <div className="two-column">
        <div className="panel">
          <h3>Monthly Activity</h3>
          <div className="bar-chart">
            <span style={{ height: `${Math.max(10, issues.length * 18)}px` }}>Issues</span>
            <span style={{ height: `${Math.max(10, returns.length * 18)}px` }}>Returns</span>
            <span style={{ height: `${Math.max(10, fines.length * 18)}px` }}>Fines</span>
          </div>
        </div>
        <div className="panel">
          <h3>Recent Activities</h3>
          <ul className="activity-list">
            {issues.slice(-5).map((issue) => <li key={issue.issueId}>{issue.bookTitle} issued to {issue.studentName}</li>)}
            {issues.length === 0 && <li>No activity yet</li>}
          </ul>
        </div>
      </div>
    </>
  )
}

function StudentDashboard({ user, student, issues, returns, fines }) {
  const pendingBooks = issues.filter((issue) => issue.status === 'ISSUED')
  const unpaidFines = fines.filter((fine) => fine.status !== 'PAID')
  return (
    <>
      {!student && <div className="alert">No student profile is linked with {user.email}. Ask admin to add a student with the same email.</div>}
      <div className="stats-grid">
        <StatCard label="Issued Books" value={issues.length} />
        <StatCard label="Pending Returns" value={pendingBooks.length} />
        <StatCard label="Returned Books" value={returns.length} />
        <StatCard label="Unpaid Fines" value={`Rs. ${unpaidFines.reduce((total, fine) => total + Number(fine.amount || 0), 0)}`} />
      </div>
      <div className="two-column">
        <StudentProfile user={user} student={student} />
        <IssueTable issues={pendingBooks} title="Currently Issued Books" />
      </div>
    </>
  )
}

function StatCard({ label, value }) {
  return <div className="stat-card"><span>{label}</span><strong>{value}</strong></div>
}

function Students({ form, setForm, onSubmit, students, editingId, onEdit, onDelete }) {
  return (
    <div className="page-grid">
      <form className="panel form-grid" onSubmit={onSubmit}>
        <h3>{editingId ? 'Update Student' : 'Add Student'}</h3>
        <input required placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input required placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Course" value={form.course || ''} onChange={(e) => setForm({ ...form, course: e.target.value })} />
        <input placeholder="Roll number" value={form.rollNumber || ''} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} />
        <button className="primary-btn">{editingId ? 'Update' : 'Save'}</button>
      </form>
      <DataTable
        title="Student List"
        headers={['Name', 'Email', 'Course', 'Status', 'Actions']}
        rows={students.map((student) => [
          `${student.firstName} ${student.lastName}`,
          student.email,
          student.course,
          student.active ? 'Active' : 'Inactive',
          <ActionButtons key={student.id} onEdit={() => onEdit(student)} onDelete={() => onDelete(student.id)} />,
        ])}
      />
    </div>
  )
}

function Books({ form, setForm, onSubmit, books, categories, editingId, onEdit, onDelete }) {
  return (
    <div className="page-grid">
      <form className="panel form-grid" onSubmit={onSubmit}>
        <h3>{editingId ? 'Update Book' : 'Add Book'}</h3>
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input required placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <input placeholder="ISBN" value={form.isbn || ''} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
        <input placeholder="Publisher" value={form.publisher || ''} onChange={(e) => setForm({ ...form, publisher: e.target.value })} />
        <input required type="number" min="0" placeholder="Copies" value={form.bookcopy} onChange={(e) => setForm({ ...form, bookcopy: e.target.value })} />
        <select value={form.categoryId || ''} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
          <option value="">Select category</option>
          {categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.name}</option>)}
        </select>
        <button className="primary-btn">{editingId ? 'Update' : 'Save'}</button>
      </form>
      <BookCatalog books={books} categories={categories} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}

function BookCatalog({ books, onEdit, onDelete }) {
  return (
    <DataTable
      title="Book Inventory"
      headers={onEdit ? ['Title', 'Author', 'Category', 'Copies', 'Actions'] : ['Title', 'Author', 'Category', 'Copies']}
      rows={books.map((book) => {
        const cells = [book.title, book.author, book.categoryName || 'General', book.bookcopy]
        return onEdit ? [...cells, <ActionButtons key={book.bookId} onEdit={() => onEdit(book)} onDelete={() => onDelete(book.bookId)} />] : cells
      })}
    />
  )
}

function Categories({ form, setForm, onSubmit, categories, editingId, onEdit, onDelete }) {
  return (
    <div className="page-grid">
      <form className="panel form-grid" onSubmit={onSubmit}>
        <h3>{editingId ? 'Update Category' : 'Add Category'}</h3>
        <input required placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="primary-btn">{editingId ? 'Update' : 'Save'}</button>
      </form>
      <DataTable
        title="Categories"
        headers={['Name', 'Description', 'Actions']}
        rows={categories.map((category) => [
          category.name,
          category.description || '-',
          <ActionButtons key={category.categoryId} onEdit={() => onEdit(category)} onDelete={() => onDelete(category.categoryId)} />,
        ])}
      />
    </div>
  )
}

function IssueBook({ form, setForm, onSubmit, students, books, issues }) {
  return (
    <div className="page-grid">
      <form className="panel form-grid" onSubmit={onSubmit}>
        <h3>Issue Book</h3>
        <select required value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
          <option value="">Select student</option>
          {students.map((student) => <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>)}
        </select>
        <select required value={form.bookId} onChange={(e) => setForm({ ...form, bookId: e.target.value })}>
          <option value="">Select book</option>
          {books.map((book) => <option key={book.bookId} value={book.bookId}>{book.title} ({book.bookcopy} copies)</option>)}
        </select>
        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <button className="primary-btn">Issue Book</button>
      </form>
      <IssueTable issues={issues} />
    </div>
  )
}

function ReturnBook({ issues, returns, onReturn }) {
  return (
    <div className="two-column">
      <DataTable
        title="Pending Returns"
        headers={['Book', 'Student', 'Due Date', 'Action']}
        rows={issues.map((issue) => [
          issue.bookTitle,
          issue.studentName,
          issue.dueDate,
          <button key={issue.issueId} className="primary-btn small" onClick={() => onReturn(issue.issueId)}>Return</button>,
        ])}
      />
      <DataTable
        title="Returned Books"
        headers={['Issue Id', 'Return Date', 'Late Days', 'Fine']}
        rows={returns.map((item) => [item.issueId, item.returnDate, item.lateDays, `Rs. ${item.fineAmount}`])}
      />
    </div>
  )
}

function Fines({ fines, onPaid }) {
  return (
    <DataTable
      title="Fine Details"
      headers={['Student', 'Issue Id', 'Amount', 'Status', 'Action']}
      rows={fines.map((fine) => [
        fine.studentName,
        fine.issueId,
        `Rs. ${fine.amount}`,
        fine.status,
        fine.status === 'PAID' ? 'Done' : <button key={fine.fineId} className="secondary-btn small" onClick={() => onPaid(fine.fineId)}>Mark Paid</button>,
      ])}
    />
  )
}

function StudentFines({ fines }) {
  return (
    <DataTable
      title="My Fine Details"
      headers={['Issue Id', 'Amount', 'Status']}
      rows={fines.map((fine) => [fine.issueId, `Rs. ${fine.amount}`, fine.status])}
    />
  )
}

function Reports({ students, books, issues, returns, fines }) {
  const cards = [
    ['Student Report', students.length, 'Active and inactive student records'],
    ['Book Report', books.length, 'Inventory and category details'],
    ['Issue Report', issues.length, 'Book issue history'],
    ['Return Report', returns.length, 'Returned books and late days'],
    ['Fine Report', fines.length, 'Paid and unpaid fine details'],
  ]
  return (
    <div className="report-grid">
      {cards.map(([title, count, text]) => (
        <div className="panel" key={title}>
          <h3>{title}</h3>
          <strong className="report-count">{count}</strong>
          <p>{text}</p>
        </div>
      ))}
    </div>
  )
}

function AdminProfile({ user, onLogout }) {
  return (
    <div className="panel profile-panel">
      <h3>Admin Profile</h3>
      <ProfileLine label="Name" value={user.name} />
      <ProfileLine label="Email" value={user.email} />
      <ProfileLine label="Role" value={user.role} />
      <button className="danger-btn" onClick={onLogout}>Logout</button>
    </div>
  )
}

function StudentProfile({ user, student, onLogout }) {
  return (
    <div className="panel profile-panel">
      <h3>Student Profile</h3>
      <ProfileLine label="Name" value={student ? `${student.firstName} ${student.lastName}` : user.name} />
      <ProfileLine label="Email" value={student?.email || user.email} />
      <ProfileLine label="Course" value={student?.course || 'Not linked'} />
      <ProfileLine label="Roll Number" value={student?.rollNumber || 'Not linked'} />
      <ProfileLine label="Status" value={student ? (student.active ? 'Active' : 'Inactive') : 'No student record'} />
      {onLogout && <button className="danger-btn" onClick={onLogout}>Logout</button>}
    </div>
  )
}

function ProfileLine({ label, value }) {
  return <p className="profile-line"><span>{label}</span><strong>{value}</strong></p>
}

function StudentBooks({ issues, returns }) {
  return (
    <div className="two-column">
      <IssueTable issues={issues} title="My Issue History" />
      <DataTable
        title="My Returned Books"
        headers={['Issue Id', 'Return Date', 'Late Days', 'Fine']}
        rows={returns.map((item) => [item.issueId, item.returnDate, item.lateDays, `Rs. ${item.fineAmount}`])}
      />
    </div>
  )
}

function IssueTable({ issues, title = 'Issue History' }) {
  return (
    <DataTable
      title={title}
      headers={['Book', 'Student', 'Issue Date', 'Due Date', 'Status']}
      rows={issues.map((issue) => [issue.bookTitle, issue.studentName, issue.issueDate, issue.dueDate, issue.status])}
    />
  )
}

function DataTable({ title, headers, rows }) {
  return (
    <div className="panel table-panel">
      <h3>{title}</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={headers.length}>No records found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="actions">
      <button className="secondary-btn small" onClick={onEdit}>Edit</button>
      <button className="danger-btn small" onClick={onDelete}>Delete</button>
    </div>
  )
}

export default App
