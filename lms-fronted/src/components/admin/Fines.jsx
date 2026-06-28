import { ORGANIZATION_NAME } from '../../constants/library'
import DataTable from '../common/DataTable'

function Fines({ fines, students, onPaid }) {
  const studentById = new Map(students.map((student) => [student.id, student]))

  return (
    <DataTable
      title="Fine Details"
      headers={['Student', 'Organization', 'Issue Id', 'Amount', 'Status', 'Action']}
      rows={fines.map((fine) => [
        fine.studentName,
        studentById.get(fine.studentId)?.organizationName || ORGANIZATION_NAME,
        fine.issueId,
        `Rs. ${fine.amount}`,
        fine.status,
        fine.status === 'PAID' ? 'Done' : <button key={fine.fineId} className="secondary-btn small" onClick={() => onPaid(fine.fineId)}>Mark Paid</button>,
      ])}
    />
  )
}

export default Fines
