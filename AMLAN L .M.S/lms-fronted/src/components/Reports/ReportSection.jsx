import React, { useState } from 'react'
import AdminControlButton from '../AdminControlButton'
import DashboardButton from '../DashboardButton'

const issueRecords = [
  {
    id: 'ISS-1001',
    studentId: 'STU-001',
    studentName: 'Amit Sharma',
    department: 'Computer Science',
    semester: '5th',
    email: 'amit.sharma@example.com',
    bookId: 'BK-101',
    bookTitle: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Programming',
    issueDate: '2026-06-18',
    dueDate: '2026-07-02',
    returnDate: '',
    librarian: 'Admin',
    finePerDay: 5,
  },
  {
    id: 'ISS-1002',
    studentId: 'STU-002',
    studentName: 'Priya Das',
    department: 'English',
    semester: '3rd',
    email: 'priya.das@example.com',
    bookId: 'BK-204',
    bookTitle: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    issueDate: '2026-06-10',
    dueDate: '2026-06-24',
    returnDate: '',
    librarian: 'Admin',
    finePerDay: 5,
  },
  {
    id: 'ISS-1003',
    studentId: 'STU-003',
    studentName: 'Rahul Roy',
    department: 'Business',
    semester: '2nd',
    email: 'rahul.roy@example.com',
    bookId: 'BK-309',
    bookTitle: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self Help',
    issueDate: '2026-06-20',
    dueDate: '2026-07-04',
    returnDate: '',
    librarian: 'Admin',
    finePerDay: 5,
  },
  {
    id: 'ISS-1004',
    studentId: 'STU-004',
    studentName: 'Sneha Gupta',
    department: 'Mathematics',
    semester: '6th',
    email: 'sneha.gupta@example.com',
    bookId: 'BK-412',
    bookTitle: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    category: 'Computer Science',
    issueDate: '2026-06-12',
    dueDate: '2026-06-26',
    returnDate: '2026-06-25',
    librarian: 'Admin',
    finePerDay: 5,
  },
]

const formatDate = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))

const getIssueStatus = (record) => {
  if (record.returnDate) {
    return {
      label: 'Returned',
      daysText: 'Returned',
      fine: 0,
      badgeClass: 'border-green-500/40 bg-green-500/10 text-green-300',
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dueDate = new Date(`${record.dueDate}T00:00:00`)
  const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))

  if (daysRemaining < 0) {
    return {
      label: 'Overdue',
      daysText: `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) === 1 ? '' : 's'} overdue`,
      fine: Math.abs(daysRemaining) * record.finePerDay,
      badgeClass: 'border-red-500/40 bg-red-500/10 text-red-300',
    }
  }

  if (daysRemaining === 0) {
    return {
      label: 'Due today',
      daysText: 'Due today',
      fine: 0,
      badgeClass: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
    }
  }

  return {
    label: 'Issued',
    daysText: `${daysRemaining} day${daysRemaining === 1 ? '' : 's'} remaining`,
    fine: 0,
    badgeClass: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  }
}

const ReportSection = ({ embedded = false }) => {
  const [finedRecords, setFinedRecords] = useState({})
  const [fineAmounts, setFineAmounts] = useState({})
  const [popupMessage, setPopupMessage] = useState('')

  const recordsWithStatus = issueRecords.map((record) => ({
    ...record,
    issueStatus: getIssueStatus(record),
  }))

  const activeIssues = recordsWithStatus.filter((record) => !record.returnDate).length
  const overdueIssues = recordsWithStatus.filter((record) => record.issueStatus.label === 'Overdue').length
  const totalFine = recordsWithStatus.reduce((total, record) => total + record.issueStatus.fine, 0)
  const finedStudents = recordsWithStatus.filter((record) => finedRecords[record.id])
  const collectedFine = finedStudents.reduce((total, record) => total + finedRecords[record.id].amount, 0)

  const fineStudent = (record) => {
    const customFine = Number(fineAmounts[record.id])

    if (!Number.isInteger(customFine) || customFine <= 0) {
      setPopupMessage('Please type a valid fine amount in digits')
      return
    }

    setFinedRecords((currentRecords) => ({
      ...currentRecords,
      [record.id]: {
        amount: customFine,
      },
    }))
    setPopupMessage(`${record.studentName} fined Rs ${customFine} for overdue book`)

    setTimeout(() => {
      setPopupMessage('')
    }, 2500)
  }

  return (
    <div className={`${embedded ? '' : 'min-h-[calc(100vh-136px)] overflow-y-auto bg-[#1a1a1a] p-6'} text-white`}>
      {popupMessage && (
        <div className="fixed right-6 top-6 z-50 rounded-xl border border-yellow-500 bg-zinc-900 px-6 py-4 text-yellow-300 shadow-2xl">
          {popupMessage}
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-6">
        {!embedded && (
          <div className="flex flex-wrap gap-3">
            <DashboardButton />
            <AdminControlButton />
          </div>
        )}

        <div className="rounded-2xl border border-zinc-700 bg-[#252525] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-green-400">Reports</p>
              <h2 className="mt-2 text-3xl font-semibold">Book Issue Details</h2>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-zinc-800 px-4 py-3">
                <p className="text-sm text-zinc-400">Issued</p>
                <p className="text-2xl font-bold text-white">{activeIssues}</p>
              </div>
              <div className="rounded-xl bg-zinc-800 px-4 py-3">
                <p className="text-sm text-zinc-400">Overdue</p>
                <p className="text-2xl font-bold text-red-300">{overdueIssues}</p>
              </div>
              <div className="rounded-xl bg-zinc-800 px-4 py-3">
                <p className="text-sm text-zinc-400">Fine</p>
                <p className="text-2xl font-bold text-yellow-300">Rs {totalFine}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-[#252525]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-700 px-6 py-5">
            <h3 className="text-2xl font-semibold">Fined Students</h3>
            <div className="rounded-xl bg-zinc-800 px-5 py-3 text-center">
              <p className="text-sm text-zinc-400">Collected Fine</p>
              <p className="text-2xl font-bold text-yellow-300">Rs {collectedFine}</p>
            </div>
          </div>

          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead className="bg-zinc-900 text-sm uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Book</th>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Overdue</th>
                <th className="px-5 py-4">Fine Amount</th>
              </tr>
            </thead>
            <tbody>
              {finedStudents.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-zinc-500" colSpan="5">
                    No students fined yet
                  </td>
                </tr>
              ) : (
                finedStudents.map((record) => (
                  <tr key={record.id} className="border-t border-zinc-700">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{record.studentName}</p>
                      <p className="text-sm text-zinc-500">{record.studentId}</p>
                    </td>
                    <td className="px-5 py-4 text-zinc-300">{record.bookTitle}</td>
                    <td className="px-5 py-4 text-zinc-300">{formatDate(record.dueDate)}</td>
                    <td className="px-5 py-4 font-semibold text-red-300">{record.issueStatus.daysText}</td>
                    <td className="px-5 py-4 font-semibold text-yellow-300">Rs {finedRecords[record.id].amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-[#252525]">
          <table className="w-full min-w-[1450px] border-collapse text-left">
            <thead className="bg-zinc-900 text-sm uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-5 py-4">Issue ID</th>
                <th className="px-5 py-4">Student Details</th>
                <th className="px-5 py-4">Book Details</th>
                <th className="px-5 py-4">Issue Date</th>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Return Date</th>
                <th className="px-5 py-4">Days Remaining / Fine</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Fine</th>
                <th className="px-5 py-4">Issued By</th>
              </tr>
            </thead>
            <tbody>
              {recordsWithStatus.map((record) => (
                <tr key={record.id} className="border-t border-zinc-700 align-top">
                  <td className="px-5 py-4 font-semibold text-zinc-100">{record.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{record.studentName}</p>
                    <p className="text-sm text-zinc-400">{record.studentId}</p>
                    <p className="text-sm text-zinc-400">{record.department}, Semester {record.semester}</p>
                    <p className="text-sm text-zinc-500">{record.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{record.bookTitle}</p>
                    <p className="text-sm text-zinc-400">{record.bookId}</p>
                    <p className="text-sm text-zinc-400">{record.author}</p>
                    <p className="text-sm text-zinc-500">{record.category}</p>
                  </td>
                  <td className="px-5 py-4 text-zinc-300">{formatDate(record.issueDate)}</td>
                  <td className="px-5 py-4 text-zinc-300">{formatDate(record.dueDate)}</td>
                  <td className="px-5 py-4 text-zinc-300">
                    {record.returnDate ? formatDate(record.returnDate) : 'Not returned'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-semibold text-zinc-100">{record.issueStatus.daysText}</span>
                      {record.issueStatus.label === 'Overdue' ? (
                        finedRecords[record.id] ? (
                          <span className="inline-flex rounded-lg border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm font-semibold text-green-300">
                            Fined
                          </span>
                        ) : (
                          <>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              placeholder="Fine"
                              value={fineAmounts[record.id] || ''}
                              onChange={(event) =>
                                setFineAmounts((currentAmounts) => ({
                                  ...currentAmounts,
                                  [record.id]: event.target.value.replace(/\D/g, ''),
                                }))
                              }
                              className="w-24 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-white outline-none focus:border-yellow-400"
                            />
                            <button
                              type="button"
                              onClick={() => fineStudent(record)}
                              className="cursor-pointer rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-zinc-950 transition hover:bg-yellow-400"
                            >
                              Fine Student
                            </button>
                          </>
                        )
                      ) : (
                        <span className="text-sm text-zinc-500">No fine</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${record.issueStatus.badgeClass}`}>
                      {record.issueStatus.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-zinc-100">Rs {record.issueStatus.fine}</td>
                  <td className="px-5 py-4 text-zinc-300">{record.librarian}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReportSection
