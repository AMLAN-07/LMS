import { ORGANIZATION_NAME } from '../../constants/library'
import DataTable from '../common/DataTable'

function IssueTable({ issues, title = 'Issue History', students }) {
  const studentById = new Map((students || []).map((student) => [student.id, student]))
  const showOrganization = Boolean(students)

  return (
    <DataTable
      title={title}
      headers={showOrganization ? ['Book', 'Student', 'Organization', 'Issue Date', 'Due Date', 'Status'] : ['Book', 'Student', 'Issue Date', 'Due Date', 'Status']}
      rows={issues.map((issue) => {
        const cells = [issue.bookTitle, issue.studentName]
        if (showOrganization) {
          cells.push(studentById.get(issue.studentId)?.organizationName || ORGANIZATION_NAME)
        }
        return [...cells, issue.issueDate, issue.dueDate, issue.status]
      })}
    />
  )
}

export default IssueTable
