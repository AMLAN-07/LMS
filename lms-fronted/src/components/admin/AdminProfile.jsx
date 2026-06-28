import { ORGANIZATION_NAME } from '../../constants/library'
import ProfileLine from '../common/ProfileLine'

function AdminProfile({ user, onLogout }) {
  return (
    <div className="panel profile-panel">
      <h3>Admin Profile</h3>
      <ProfileLine label="Name" value={user.name} />
      <ProfileLine label="Email" value={user.email} />
      <ProfileLine label="Role" value={user.role} />
      <ProfileLine label="Organization" value={user.organizationName || ORGANIZATION_NAME} />
      <button className="danger-btn" onClick={onLogout}>Logout</button>
    </div>
  )
}

export default AdminProfile
