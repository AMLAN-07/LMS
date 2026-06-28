import React, { useEffect, useState } from 'react'
import { listStudentBooks, returnBook } from '../../services/StudentService'

const ReturnBook = () => {

    const [activeLoans, setActiveLoans] = useState([])
    const [loading, setLoading] = useState(true)
    const [returningId, setReturningId] = useState(null)
    const [result, setResult] = useState(null) // { type: 'success' | 'error', message }

    function loadActiveLoans() {
        setLoading(true)
        listStudentBooks()
            .then((response) => {
                setActiveLoans(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadActiveLoans()
    }, [])

    function handleReturn(issueId) {
        setReturningId(issueId)
        setResult(null)

        returnBook(issueId)
            .then((response) => {
                const data = response.data
                const fine = data.fineAmount || 0
                if (fine > 0) {
                    setResult({
                        type: 'warning',
                        message: `Book returned. Fine of ₹${fine.toFixed(2)} applies for late return.`
                    })
                } else {
                    setResult({ type: 'success', message: 'Book returned on time. No fine.' })
                }
                loadActiveLoans()
            })
            .catch((error) => {
                const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    'Could not return this book.'
                setResult({ type: 'error', message })
            })
            .finally(() => setReturningId(null))
    }

    function daysOverdue(dueDate) {
        const due = new Date(dueDate)
        const today = new Date()
        due.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)
        return Math.round((today - due) / (1000 * 60 * 60 * 24))
    }

    function formatDate(dateStr) {
        if (!dateStr) return '—'
        return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    }

    return (
        <div className="bg-[#1c1c1c] min-h-screen p-8 text-white">
            <h2 className='text-center'>Return a book</h2>

            {result && (
                <div className={`max-w-2xl mx-auto mt-4 rounded-xl border px-4 py-3 text-sm ${
                    result.type === 'success' ? 'border-green-500/40 bg-green-500/10 text-green-400' :
                    result.type === 'warning' ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' :
                    'border-red-500/40 bg-red-500/10 text-red-400'
                }`}>
                    {result.message}
                </div>
            )}

            {loading && <p className="text-center text-zinc-400 mt-6">Loading active loans...</p>}

            {!loading && activeLoans.length === 0 && (
                <p className="text-center text-zinc-400 mt-6">No books are currently issued.</p>
            )}

            {!loading && activeLoans.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-zinc-700 mt-6">
                    <table className='w-full'>
                        <thead className="bg-[#232323] text-zinc-400 uppercase text-sm">
                            <tr>
                                <th className="px-6 py-5 text-left">Student</th>
                                <th className="px-6 py-5 text-left">Book</th>
                                <th className="px-6 py-5 text-left">Issued</th>
                                <th className="px-6 py-5 text-left">Due</th>
                                <th className="px-6 py-5 text-left">Status</th>
                                <th className="px-6 py-5 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeLoans.map((loan, idx) => {
                                const overdueBy = daysOverdue(loan.dueDate)
                                const isOverdue = overdueBy > 0
                                return (
                                    <tr key={idx} className={`border-t border-zinc-700 hover:bg-zinc-800/40 transition ${isOverdue ? 'bg-red-500/5' : ''}`}>
                                        <td className='px-6 py-6 text-lg font-semibold'>{loan.studentName}</td>
                                        <td className='px-6 py-6 text-zinc-300'>{loan.bookTitle}</td>
                                        <td className='px-6 py-6 text-zinc-400 text-sm'>{formatDate(loan.issueDate)}</td>
                                        <td className='px-6 py-6 text-zinc-400 text-sm'>{formatDate(loan.dueDate)}</td>
                                        <td className='px-6 py-6'>
                                            {isOverdue ? (
                                                <span className="rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 px-3 py-1 text-xs font-medium">
                                                    {overdueBy} day{overdueBy === 1 ? '' : 's'} overdue
                                                </span>
                                            ) : (
                                                <span className="rounded-lg border border-green-500/40 bg-green-500/10 text-green-400 px-3 py-1 text-xs font-medium">
                                                    Issued
                                                </span>
                                            )}
                                        </td>
                                        <td className='px-6 py-6'>
                                            <button
                                                className="rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-green-500/20 hover:border-green-500 transition disabled:opacity-50"
                                                disabled={returningId === loan.issueId}
                                                onClick={() => handleReturn(loan.issueId)}
                                            >
                                                {returningId === loan.issueId ? 'Returning...' : 'Return'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ReturnBook