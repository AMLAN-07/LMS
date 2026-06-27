import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminControlButton = ({ className = '' }) => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/admin-control')}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-semibold text-white transition hover:border-green-500 hover:bg-zinc-800 ${className}`}
    >
      <svg className="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1ZM12 3.19L5 6.3V11C5 15.47 7.94 19.61 12 20.93C16.06 19.61 19 15.47 19 11V6.3L12 3.19ZM11 7H13V12H11V7ZM11 14H13V16H11V14Z" />
      </svg>
      Admin Control
    </button>
  )
}

export default AdminControlButton
