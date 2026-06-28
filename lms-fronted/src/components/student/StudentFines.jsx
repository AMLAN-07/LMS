import DataTable from '../common/DataTable'

function StudentFines({ fines }) {
  return (
    <DataTable
      title="My Fine Details"
      headers={['Issue Id', 'Amount', 'Status']}
      rows={fines.map((fine) => [fine.issueId, `Rs. ${fine.amount}`, fine.status])}
    />
  )
}

export default StudentFines
