import { ORGANIZATION_NAME } from '../../constants/library'
import DataTable from '../common/DataTable'

function ReturnBook({ issues, returns, students, onReturn }) {
  const studentById = new Map(students.map((student) => [student.id, student]))

  return (
    <div className="two-column">
      <DataTable
        title="Pending Returns"
        headers={['Book', 'Student', 'Organization', 'Due Date', 'Action']}
        rows={issues.map((issue) => [
          issue.bookTitle,
          issue.studentName,
          studentById.get(issue.studentId)?.organizationName || ORGANIZATION_NAME,
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

export default ReturnBook
