import { useState, useEffect } from "react";
import { listStudent, listBook, issueBook } from "../../services/StudentService";


const BorrowBook = () => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [loanDays, setLoanDays] = useState(14);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadStudents();
    loadBooks();
  }, []);

  function loadStudents() {
    listStudent()
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Failed to load students", err));
  }

  function loadBooks() {
    listBook()
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to load books", err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!studentId || !bookId) {
      setResult({
        type: "error",
        message: "Select a student and a book to continue.",
      });
      return;
    }

    setSubmitting(true);
    setResult(null);

    issueBook(studentId, bookId, loanDays || 14)
      .then((res) => {
        const data = res.data;
        const studentName = data.student
          ? `${data.student.firstName} ${data.student.lastName}`
          : "";
        const bookTitle = data.book ? data.book.title : "";

        setResult({
          type: "success",
          message: `${bookTitle} issued to ${studentName}. Due ${data.dueDate}.`,
        });

        setStudentId("");
        setBookId("");
        setLoanDays(14);
        loadBooks();
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Could not issue this book.";

        setResult({ type: "error", message });
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <div className="bg-white border mx-auto border-green-100 rounded-xl p-6 max-w-lg shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-green-900">
          Borrow a Book
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Issue a book to a student and set the due date
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Student Select */}
        <div className="flex flex-col gap-2">
          <label htmlFor="student-select" className="text-sm font-medium text-gray-700">
            Student
          </label>
          <select
            id="student-select"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName} — {s.email}
              </option>
            ))}
          </select>
        </div>

        {/* Book Select */}
        <div className="flex flex-col gap-2">
          <label htmlFor="book-select" className="text-sm font-medium text-gray-700">
            Book
          </label>
          <select
            id="book-select"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a book</option>
            {books.map((b) => (
              <option key={b.bookId} value={b.bookId}>
                {b.title} — {b.author} ({b.bookcopy} copies)
              </option>
            ))}
          </select>
        </div>

        {/* Loan Days */}
        <div className="flex flex-col gap-2">
          <label htmlFor="loan-days" className="text-sm font-medium text-gray-700">
            Loan Period (days)
          </label>
          <input
            id="loan-days"
            type="number"
            min={1}
            max={90}
            value={loanDays}
            onChange={(e) => setLoanDays(e.target.value)}
            className="w-32 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`mt-2 py-3 px-4 rounded-lg font-semibold text-white transition ${
            submitting
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {submitting ? "Issuing..." : "Issue Book"}
        </button>
      </form>

      {/* Result Message */}
      {result && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            result.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
};

export default BorrowBook;