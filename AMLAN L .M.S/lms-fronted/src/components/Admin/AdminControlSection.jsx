import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardButton from '../DashboardButton'

const adminCards = [
  {
    title: 'Books',
    path: '/books',
    text: 'Add, review, and remove library book records.',
    value: 'Library Data',
    icon: (
      <path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H14C14.5523 21 15 20.5523 15 20V15.2973L15.9995 19.9996C16.1143 20.5398 16.6454 20.8847 17.1856 20.7699L21.0982 19.9382C21.6384 19.8234 21.9832 19.2924 21.8684 18.7522L18.9576 5.0581C18.8428 4.51788 18.3118 4.17304 17.7716 4.28786L14.9927 4.87853C14.9328 4.38353 14.5112 4 14 4H10C10 3.44772 9.55228 3 9 3H4ZM10 6H13V14H10V6ZM10 19V16H13V19H10ZM8 5V15H5V5H8ZM8 17V19H5V17H8ZM17.3321 16.6496L19.2884 16.2338L19.7042 18.1898L17.7479 18.6057L17.3321 16.6496Z" />
    ),
  },
  {
    title: 'Students',
    path: '/students',
    text: 'Manage member profiles and student details.',
    value: 'User Access',
    icon: (
      <path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z" />
    ),
  },
  {
    title: 'Report',
    path: '/reports',
    text: 'Check issued books, return status, and pending fines.',
    value: 'Records',
    icon: (
      <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z" />
    ),
  },
]

const AdminControlSection = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-136px)] bg-[#1a1a1a] p-6 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <DashboardButton />

        <div className="rounded-2xl border border-zinc-700 bg-[#252525] p-6">
          <p className="text-sm font-medium uppercase tracking-wide text-green-400">Admin Control</p>
          <h2 className="mt-2 text-3xl font-semibold">Library Management Controls</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Use this section to monitor important LMS areas and keep the library system organized.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {adminCards.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => navigate(card.path)}
              className="cursor-pointer rounded-2xl border border-zinc-700 bg-[#252525] p-6 text-left transition hover:border-green-500 hover:bg-zinc-800"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  {card.icon}
                </svg>
              </div>
              <p className="text-sm uppercase tracking-wide text-zinc-500">{card.value}</p>
              <h3 className="mt-2 text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{card.text}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h3 className="text-xl font-semibold">Admin Notes</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-[#252525] px-5 py-4 text-zinc-300">Keep student records updated before issuing books.</div>
            <div className="rounded-xl bg-[#252525] px-5 py-4 text-zinc-300">Check overdue reports regularly to track pending returns.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminControlSection
