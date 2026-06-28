import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export const loginUser = (data) => api.post('/auth/login', data)
export const registerUser = (data) => api.post('/auth/register', data)

export const getDashboard = () => api.get('/dashboard')

export const getStudents = () => api.get('/students')
export const createStudent = (data) => api.post('/students', data)
export const updateStudent = (id, data) => api.put(`/students/${id}`, data)
export const deleteStudent = (id) => api.delete(`/students/${id}`)

export const getBooks = () => api.get('/books')
export const createBook = (data) => api.post('/books', data)
export const updateBook = (id, data) => api.put(`/books/${id}`, data)
export const deleteBook = (id) => api.delete(`/books/${id}`)

export const getCategories = () => api.get('/categories')
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

export const getIssues = () => api.get('/issues')
export const createIssue = (data) => api.post('/issues', data)

export const getReturns = () => api.get('/returns')
export const returnBook = (issueId) => api.post(`/returns/${issueId}`)

<<<<<<< HEAD
export const deleteStudent = (studentId) => axios.delete(REST_API_BASE_URL+'/'+studentId);

//==========================================================

const REST_API_BOOK_URL="http://localhost:8080/api/books";

export const listBook =()=>axios.get(REST_API_BOOK_URL);

export const createBook =(book) => axios.post(REST_API_BOOK_URL,book);

export const getBook = (bookId) => axios.get(REST_API_BOOK_URL+'/'+bookId);

export const updateBook = (bookId,book) => axios.put(REST_API_BOOK_URL+'/'+bookId,book);

export const deleteBook = (bookId) => axios.delete(REST_API_BOOK_URL+'/'+bookId);
// ==========================================

const REST_API_ISSUE_URL = "http://localhost:8080/api/issues";

export const issueBook = (studentId, bookId, loanDays) =>
  axios.post(
    REST_API_ISSUE_URL +
      "/issue?studentId=" +
      studentId +
      "&bookId=" +
      bookId +
      "&loanDays=" +
      loanDays
  );

export const returnBook = (issueId) =>
  axios.put(REST_API_ISSUE_URL + "/" + issueId + "/return");

//======================================================

const REPORTS_API_BASE_URL = "http://localhost:8080/api/reports";

export const listOverdueBooks = () =>
  axios.get(REPORTS_API_BASE_URL + "/overdue-books");

export const listStudentBooks = () =>
  axios.get(REPORTS_API_BASE_URL + "/student-books");

export const listReturnedBooks = () =>
  axios.get(REPORTS_API_BASE_URL + "/returned-books");

// =====================================================
=======
export const getFines = () => api.get('/fines')
export const markFinePaid = (fineId) => api.put(`/fines/${fineId}/paid`)

export const listStudent = getStudents
export const createUser = registerUser
>>>>>>> a5db1ff (update both frontned and backend)
