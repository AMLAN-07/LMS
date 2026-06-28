import { ORGANIZATION_NAME } from '../../constants/library'
import ProfileLine from '../common/ProfileLine'

function StudentProfile({ user, student, onLogout }) {
  return (
    <div className="panel profile-panel">
      <h3>Student Profile</h3>
      <ProfileLine label="Name" value={student ? `${student.firstName} ${student.lastName}` : user.name} />
      <ProfileLine label="Email" value={student?.email || user.email} />
      <ProfileLine label="Organization" value={student?.organizationName || user.organizationName || ORGANIZATION_NAME} />
      <ProfileLine label="Course" value={student?.course || 'Not linked'} />
      <ProfileLine label="Roll Number" value={student?.rollNumber || 'Not linked'} />
      <ProfileLine label="Status" value={student ? (student.active ? 'Active' : 'Inactive') : 'No student record'} />
      {onLogout && <button className="danger-btn" onClick={onLogout}>Logout</button>}
    </div>
  )
}

export default StudentProfile
