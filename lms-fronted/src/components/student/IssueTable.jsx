import { ORGANIZATION_NAME } from '../../constants/library'
import DataTable from '../common/DataTable'
import StatusBadge from '../common/StatusBadge'

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
        const statusTone = issue.status === 'RETURNED' ? 'success' : 'warning'
        const statusText = issue.status === 'RETURNED' ? 'Returned successfully' : issue.status
        const row = [...cells, issue.issueDate, issue.dueDate, <StatusBadge key={`${issue.issueId}-status`} tone={statusTone}>{statusText}</StatusBadge>]
        if (showReturnAction) {
          row.push(
            issue.status === 'ISSUED'
              ? <button key={issue.issueId} className="primary-btn small" onClick={() => onReturn(issue.issueId)}>Return</button>
              : <StatusBadge key={`${issue.issueId}-action`} tone="success">Returned successfully</StatusBadge>
          )
        }
        return row
      })}
    />
  )
}

export default IssueTable
