import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardButton = ({ className = '' }) => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-semibold text-white transition hover:border-green-500 hover:bg-zinc-800 ${className}`}
    >
      <svg className="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L2 12H5V21H11V15H13V21H19V12H22L12 3ZM12 5.69L17 10.19V19H15V13H9V19H7V10.19L12 5.69Z" />
      </svg>
      Dashboard
    </button>
  )
}

export default DashboardButton
