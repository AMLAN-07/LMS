import { ORGANIZATION_NAME } from '../../constants/library'
import DataTable from '../common/DataTable'

function IssueTable({ issues, title = 'Issue History', students, onReturn }) {
  const studentById = new Map((students || []).map((student) => [student.id, student]))
  const showOrganization = Boolean(students)
  const showReturnAction = Boolean(onReturn)
  const headers = showOrganization ? ['Book', 'Student', 'Organization', 'Issue Date', 'Due Date', 'Status'] : ['Book', 'Student', 'Issue Date', 'Due Date', 'Status']

  return (
    <DataTable
      title={title}
      headers={showReturnAction ? [...headers, 'Action'] : headers}
      rows={issues.map((issue) => {
        const cells = [issue.bookTitle, issue.studentName]
        if (showOrganization) {
          cells.push(studentById.get(issue.studentId)?.organizationName || ORGANIZATION_NAME)
        }
        const row = [...cells, issue.issueDate, issue.dueDate, issue.status]
        if (showReturnAction) {
          row.push(
            issue.status === 'ISSUED'
              ? <button key={issue.issueId} className="primary-btn small" onClick={() => onReturn(issue.issueId)}>Return</button>
              : 'Done'
          )
        }
        return row
      })}
    />
  )
}

export default IssueTable
