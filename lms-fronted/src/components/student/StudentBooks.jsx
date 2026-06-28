import DataTable from '../common/DataTable'
import IssueTable from './IssueTable'

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

export default StudentBooks
