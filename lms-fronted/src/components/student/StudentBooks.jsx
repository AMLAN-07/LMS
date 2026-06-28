import DataTable from '../common/DataTable'
import StatusBadge from '../common/StatusBadge'
import IssueTable from './IssueTable'

function StudentBooks({ issues, returns }) {
  const issueById = new Map(issues.map((issue) => [issue.issueId, issue]))

  return (
    <div className="two-column">
      <IssueTable issues={issues} title="My Issue History" />
      <DataTable
        title="My Returned Books"
        headers={['Book', 'Return Date', 'Late Days', 'Fine', 'Status']}
        rows={returns.map((item) => [
          issueById.get(item.issueId)?.bookTitle || `Issue #${item.issueId}`,
          item.returnDate,
          item.lateDays,
          `Rs. ${item.fineAmount}`,
          <StatusBadge key={item.returnId || item.issueId} tone="success">Returned successfully</StatusBadge>,
        ])}
      />
    </div>
  )
}

export default StudentBooks
