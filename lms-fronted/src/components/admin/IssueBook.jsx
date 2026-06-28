import { ORGANIZATION_NAME } from '../../constants/library'
import IssueTable from '../student/IssueTable'

function IssueBook({ form, setForm, onSubmit, students, books, issues }) {
  return (
    <div className="page-grid">
      <form className="panel form-grid" onSubmit={onSubmit}>
        <h3>Issue Book</h3>
        <select required value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
          <option value="">Select student</option>
          {students.map((student) => <option key={student.id} value={student.id}>{student.firstName} {student.lastName} - {student.organizationName || ORGANIZATION_NAME}</option>)}
        </select>
        <select required value={form.bookId} onChange={(e) => setForm({ ...form, bookId: e.target.value })}>
          <option value="">Select book</option>
          {books.map((book) => <option key={book.bookId} value={book.bookId}>{book.title} ({book.bookcopy} copies)</option>)}
        </select>
        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <button className="primary-btn">Issue Book</button>
      </form>
      <IssueTable issues={issues} students={students} />
    </div>
  )
}

export default IssueBook
