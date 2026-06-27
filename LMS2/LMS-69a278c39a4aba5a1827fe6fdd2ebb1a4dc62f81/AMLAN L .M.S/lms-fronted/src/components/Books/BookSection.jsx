import React, { useState } from 'react'

const starterBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction' },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', category: 'Self Help' },
]

const BookSection = () => {
  const [books, setBooks] = useState(starterBooks)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [popupMessage, setPopupMessage] = useState('')

  const addBook = (event) => {
    event.preventDefault()

    if (!title.trim() || !author.trim() || !category.trim()) {
      setError('Please enter title, author, and category')
      setSuccessMessage('')
      return
    }

    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
    }

    setBooks((currentBooks) => [newBook, ...currentBooks])
    setTitle('')
    setAuthor('')
    setCategory('')
    setError('')
    setSuccessMessage('Book added successfully')
  }

  const deleteBook = (bookId) => {
    setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookId))
    setPopupMessage('Book deleted successfully')

    setTimeout(() => {
      setPopupMessage('')
    }, 2500)
  }

  return (
    <div className="min-h-[calc(100vh-136px)] bg-[#1a1a1a] p-6 text-white">
      {popupMessage && (
        <div className="fixed right-6 top-6 z-50 rounded-xl border border-green-500 bg-zinc-900 px-6 py-4 text-green-400 shadow-2xl">
          {popupMessage}
        </div>
      )}

      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-zinc-700 bg-[#252525] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-green-400">Book Section</p>
            </div>

            <div className="rounded-2xl bg-zinc-800 px-5 py-3 text-right">
              <p className="text-sm text-zinc-400">Total Books</p>
              <p className="text-3xl font-bold text-green-400">{books.length}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-3xl border border-zinc-700 bg-[#252525] p-6">
            <h3 className="mb-5 text-2xl font-semibold">Add Book</h3>

            <form className="space-y-4" onSubmit={addBook}>
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Book Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter book title"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  placeholder="Enter author name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Enter category"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-green-500"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {successMessage && <p className="text-sm text-green-400">{successMessage}</p>}

              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Add Book
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-[#252525] p-6">
            <h3 className="mb-5 text-2xl font-semibold">Delete Books</h3>

            <div className="space-y-3">
              {books.length === 0 ? (
                <div className="rounded-xl bg-zinc-800 px-5 py-8 text-center text-zinc-400">
                  No books available
                </div>
              ) : (
                books.map((book) => (
                  <div
                    key={book.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-zinc-800 px-5 py-4"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-white">{book.title}</h4>
                      <p className="text-sm text-zinc-400">
                        {book.author} | {book.category}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteBook(book.id)}
                      className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookSection
