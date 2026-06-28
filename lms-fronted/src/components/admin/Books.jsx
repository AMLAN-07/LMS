import ActionButtons from '../common/ActionButtons'
import DataTable from '../common/DataTable'

export function BookCatalog({ books, onEdit, onDelete }) {
  return (
    <DataTable
      title="Book Inventory"
      headers={onEdit ? ['Title', 'Author', 'Category', 'Copies', 'Actions'] : ['Title', 'Author', 'Category', 'Copies']}
      rows={books.map((book) => {
        const cells = [book.title, book.author, book.categoryName || 'General', book.bookcopy]
        return onEdit ? [...cells, <ActionButtons key={book.bookId} onEdit={() => onEdit(book)} onDelete={() => onDelete(book.bookId)} />] : cells
      })}
    />
  )
}

function Books({ form, setForm, onSubmit, books, categories, editingId, onEdit, onDelete }) {
  return (
    <div className="page-grid">
      <form className="panel form-grid" onSubmit={onSubmit}>
        <h3>{editingId ? 'Update Book' : 'Add Book'}</h3>
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input required placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <input placeholder="ISBN" value={form.isbn || ''} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
        <input placeholder="Publisher" value={form.publisher || ''} onChange={(e) => setForm({ ...form, publisher: e.target.value })} />
        <input required type="number" min="0" placeholder="Copies" value={form.bookcopy} onChange={(e) => setForm({ ...form, bookcopy: e.target.value })} />
        <select value={form.categoryId || ''} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
          <option value="">Select category</option>
          {categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.name}</option>)}
        </select>
        <button className="primary-btn">{editingId ? 'Update' : 'Save'}</button>
      </form>
      <BookCatalog books={books} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}

export default Books
