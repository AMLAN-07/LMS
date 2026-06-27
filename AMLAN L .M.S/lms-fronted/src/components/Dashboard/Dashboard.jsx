import React from 'react'
import { useNavigate } from 'react-router-dom'

const dashboardActions = [
  {
    label: 'Admin Control',
    path: '/admin-control',
    icon: (
      <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1ZM12 3.19L5 6.3V11C5 15.47 7.94 19.61 12 20.93C16.06 19.61 19 15.47 19 11V6.3L12 3.19ZM11 7H13V12H11V7ZM11 14H13V16H11V14Z" />
    ),
  },
  {
    label: 'User Control',
    path: '/students',
    icon: (
      <path d="M12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12ZM12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10ZM4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4Z" />
    ),
  },
]

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-136px)] overflow-y-auto bg-[#1a1a1a] p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl border border-zinc-700 bg-[#252525] p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => navigate(action.path)}
                className="flex min-h-28 cursor-pointer items-center justify-between gap-4 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-left transition hover:border-green-500 hover:bg-zinc-800"
              >
                <span>
                  <span className="block text-lg font-semibold text-white">{action.label}</span>
                  {action.badge && (
                    <span className="mt-2 inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                      {action.badge}
                    </span>
                  )}
                </span>
                <svg className="h-7 w-7 shrink-0 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  {action.icon}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
