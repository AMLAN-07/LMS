import axios from "axios";
import { data } from "react-router-dom";

const LogRegd_API_BASE_URL="http://localhost:8080/api"

export const loginUser=(data)=>axios.post(LogRegd_API_BASE_URL+"/loginUser",data)
export const createUser=(UserData)=>axios.post(LogRegd_API_BASE_URL+"/createUser",UserData)


// =================================================
const REST_API_BASE_URL="http://localhost:8080/api/students";

export const listStudent =()=>axios.get(REST_API_BASE_URL);

export const createStudent =(student) => axios.post(REST_API_BASE_URL,student);

export const getStudent = (studentId) => axios.get(REST_API_BASE_URL+'/'+studentId);

export const updateStudent = (studentId,student) => axios.put(REST_API_BASE_URL+'/'+studentId,student);

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