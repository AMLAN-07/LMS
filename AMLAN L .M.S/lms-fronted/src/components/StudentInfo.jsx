import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminControlButton from './AdminControlButton'
import DashboardButton from './DashboardButton'
import ListStudent from './Navigation/ListStudent'

const StudentInfo = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [popupMessage, setPopupMessage] = useState(location.state?.popupMessage || '')

  useEffect(() => {
    if (!popupMessage) {
      return
    }

    const timer = setTimeout(() => {
      setPopupMessage('')
      window.history.replaceState({}, document.title)
    }, 2500)

    return () => clearTimeout(timer)
  }, [popupMessage])

  const showDeleteStudents = () => {
    setTimeout(() => {
      document.getElementById('delete-students')?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  return (
    <>
    {popupMessage && (
      <div className="fixed right-6 top-6 z-50 rounded-xl border border-green-500 bg-zinc-900 px-6 py-4 text-green-400 shadow-2xl">
        {popupMessage}
      </div>
    )}
    <div className="flex flex-wrap gap-3 bg-[#1c1c1c] px-8 pt-8 text-white">
      <DashboardButton />
      <AdminControlButton />
    </div>
    <div className="bg-[#1c1c1c] px-8 py-6 text-white">
      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => navigate('/add-student')}
          className="flex min-h-28 cursor-pointer items-center justify-between rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-left transition hover:border-green-500 hover:bg-zinc-800"
        >
          <span>
            <span className="block text-xl font-semibold">Add Students</span>
            <span className="mt-2 block text-sm text-zinc-400">Create a new student record.</span>
          </span>
          <svg className="h-7 w-7 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={showDeleteStudents}
          className="flex min-h-28 cursor-pointer items-center justify-between rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-left transition hover:border-red-500 hover:bg-zinc-800"
        >
          <span>
            <span className="block text-xl font-semibold">Delete Students</span>
            <span className="mt-2 block text-sm text-zinc-400">Review the list and remove student records.</span>
          </span>
          <svg className="h-7 w-7 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7Z" />
          </svg>
        </button>
      </div>
    </div>
    <ListStudent/>
    </>
  )
}

export default StudentInfo
