import StatCard from '../common/StatCard'

function AdminDashboard({ dashboard, issues, returns, fines }) {
  const cards = [
    ['Total Students', dashboard?.totalStudents || 0],
    ['Active Students', dashboard?.activeStudents || 0],
    ['Total Books', dashboard?.totalBooks || 0],
    ['Available Copies', dashboard?.availableBooks || 0],
    ['Issue Records', dashboard?.issuedBooks || 0],
    ['Returned Books', dashboard?.returnedBooks || 0],
    ['Pending Returns', dashboard?.pendingReturns || 0],
    ['Total Fines', `Rs. ${dashboard?.totalFines || 0}`],
  ]

  return (
    <>
      <div className="stats-grid">
        {cards.map(([label, value]) => <StatCard key={label} label={label} value={value} />)}
      </div>
      <div className="two-column">
        <div className="panel">
          <h3>Monthly Activity</h3>
          <div className="bar-chart">
            <span style={{ height: `${Math.max(10, issues.length * 18)}px` }}>Issues</span>
            <span style={{ height: `${Math.max(10, returns.length * 18)}px` }}>Returns</span>
            <span style={{ height: `${Math.max(10, fines.length * 18)}px` }}>Fines</span>
          </div>
        </div>
        <div className="panel">
          <h3>Recent Activities</h3>
          <ul className="activity-list">
            {issues.slice(-5).map((issue) => <li key={issue.issueId}>{issue.bookTitle} issued to {issue.studentName}</li>)}
            {issues.length === 0 && <li>No activity yet</li>}
          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
