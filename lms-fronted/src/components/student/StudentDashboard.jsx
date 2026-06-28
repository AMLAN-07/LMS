import StatCard from '../common/StatCard'
import IssueTable from './IssueTable'
import StudentProfile from './StudentProfile'

function StudentDashboard({ user, student, issues, returns, fines }) {
  const pendingBooks = issues.filter((issue) => issue.status === 'ISSUED')
  const unpaidFines = fines.filter((fine) => fine.status !== 'PAID')

  return (
    <>
      {!student && <div className="alert">No student profile is linked with {user.email}. Ask admin to add a student with the same email.</div>}
      <div className="stats-grid">
        <StatCard label="Issued Books" value={issues.length} />
        <StatCard label="Pending Returns" value={pendingBooks.length} />
        <StatCard label="Returned Books" value={returns.length} />
        <StatCard label="Unpaid Fines" value={`Rs. ${unpaidFines.reduce((total, fine) => total + Number(fine.amount || 0), 0)}`} />
      </div>
      <div className="two-column">
        <StudentProfile user={user} student={student} />
        <IssueTable issues={pendingBooks} title="Currently Issued Books" />
      </div>
    </>
  )
}

export default StudentDashboard
