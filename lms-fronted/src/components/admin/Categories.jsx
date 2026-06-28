import ActionButtons from '../common/ActionButtons'
import DataTable from '../common/DataTable'

function Categories({ form, setForm, onSubmit, categories, editingId, onEdit, onDelete }) {
  return (
    <div className="page-grid">
      <form className="panel form-grid" onSubmit={onSubmit}>
        <h3>{editingId ? 'Update Category' : 'Add Category'}</h3>
        <input required placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="primary-btn">{editingId ? 'Update' : 'Save'}</button>
      </form>
      <DataTable
        title="Categories"
        headers={['Name', 'Description', 'Actions']}
        rows={categories.map((category) => [
          category.name,
          category.description || '-',
          <ActionButtons key={category.categoryId} onEdit={() => onEdit(category)} onDelete={() => onDelete(category.categoryId)} />,
        ])}
      />
    </div>
  )
}

export default Categories
