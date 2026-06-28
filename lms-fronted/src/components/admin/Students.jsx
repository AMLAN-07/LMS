import { ORGANIZATION_NAME } from '../../constants/library'
import ActionButtons from '../common/ActionButtons'
import DataTable from '../common/DataTable'

function Students({ form, setForm, onSubmit, students, editingId, onEdit, onDelete }) {
  return (
    <div className="page-grid">
      <form className="panel form-grid" onSubmit={onSubmit}>
        <h3>{editingId ? 'Update Student' : 'Add Student'}</h3>
        <input required placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input required placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Course" value={form.course || ''} onChange={(e) => setForm({ ...form, course: e.target.value })} />
        <input placeholder="Roll number" value={form.rollNumber || ''} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} />
        <input required placeholder="Organization name" value={form.organizationName || ORGANIZATION_NAME} onChange={(e) => setForm({ ...form, organizationName: e.target.value })} />
        <button className="primary-btn">{editingId ? 'Update' : 'Save'}</button>
      </form>
      <DataTable
        title="Student List"
        headers={['Name', 'Email', 'Course', 'Organization', 'Status', 'Actions']}
        rows={students.map((student) => [
          `${student.firstName} ${student.lastName}`,
          student.email,
          student.course,
          student.organizationName || ORGANIZATION_NAME,
          student.active ? 'Active' : 'Inactive',
          <ActionButtons key={student.id} onEdit={() => onEdit(student)} onDelete={() => onDelete(student.id)} />,
        ])}
      />
    </div>
  )
}

export default Students
