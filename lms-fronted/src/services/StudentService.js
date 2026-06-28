import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export const loginUser = (data) => api.post('/auth/login', data)
export const registerUser = (data) => api.post('/auth/register', data)
export const createUser = registerUser

export const getDashboard = () => api.get('/dashboard')

export const getStudents = () => api.get('/students')
export const createStudent = (data) => api.post('/students', data)
export const updateStudent = (id, data) => api.put(`/students/${id}`, data)
export const deleteStudent = (id) => api.delete(`/students/${id}`)
export const listStudent = getStudents

export const getBooks = () => api.get('/books')
export const createBook = (data) => api.post('/books', data)
export const updateBook = (id, data) => api.put(`/books/${id}`, data)
export const deleteBook = (id) => api.delete(`/books/${id}`)
export const listBook = getBooks

export const getCategories = () => api.get('/categories')
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

export const getIssues = () => api.get('/issues')
export const createIssue = (data) => api.post('/issues', data)

export const getReturns = () => api.get('/returns')
export const returnBook = (issueId) => api.post(`/returns/${issueId}`)

export const getFines = () => api.get('/fines')
export const markFinePaid = (fineId) => api.put(`/fines/${fineId}/paid`)

export const listOverdueBooks = () => api.get('/reports/overdue-books')
export const listStudentBooks = () => api.get('/reports/student-books')
export const listReturnedBooks = () => api.get('/reports/returned-books')
