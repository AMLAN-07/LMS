import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const dashboardActions = [
  {
    label: 'Books',
    path: '/books',
    section: 'admin',
    color: 'text-green-400',
    icon: <path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H14C14.5523 21 15 20.5523 15 20V15.2973L15.9995 19.9996C16.1143 20.5398 16.6454 20.8847 17.1856 20.7699L21.0982 19.9382C21.6384 19.8234 21.9832 19.2924 21.8684 18.7522L18.9576 5.0581C18.8428 4.51788 18.3118 4.17304 17.7716 4.28786L14.9927 4.87853C14.9328 4.38353 14.5112 4 14 4H10C10 3.44772 9.55228 3 9 3H4ZM10 6H13V14H10V6ZM10 19V16H13V19H10ZM8 5V15H5V5H8ZM8 17V19H5V17H8ZM17.3321 16.6496L19.2884 16.2338L19.7042 18.1898L17.7479 18.6057L17.3321 16.6496ZM16.9163 14.6933L15.253 6.86789L17.2092 6.45207L18.8726 14.2775L16.9163 14.6933Z"></path>,
  },
  {
    label: 'Students',
    section: 'admin',
    color: 'text-blue-400',
    icon: <path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879L5 4.60434ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z"></path>,
    options: [
      {
        label: 'Add Students',
        path: '/add-student',
      },
      {
        label: 'Delete Students',
        path: '/students',
      },
    ],
  },
  {
    label: 'Borrow records',
    section: 'user',
    color: 'text-yellow-400',
    badge: '6 overdue',
    icon: <path d="M18 16V14H19V4H6V14.0354C6.1633 14.0121 6.33024 14 6.5 14H8V16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19H10V21H6.5C4.567 21 3 19.433 3 17.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V20C21 20.5523 20.5523 21 20 21H16V19H19V16H18ZM7 5H9V7H7V5ZM7 8H9V10H7V8ZM14 17V23H12V17H9L13 12L17 17H14Z"></path>,
  },
  {
    label: 'Returns',
    section: 'user',
    color: 'text-teal-400',
    icon: <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>,
  },
  {
    label: 'Reports',
    section: 'admin',
    color: 'text-purple-400',
    icon: <path d="M2 13H8V21H2V13ZM16 8H22V21H16V8ZM9 3H15V21H9V3ZM4 15V19H6V15H4ZM11 5V19H13V5H11ZM18 10V19H20V10H18Z"></path>,
  },
]

const dashboardSections = [
  {
    title: 'Admin Section',
    subtitle: 'Manage library records and reports',
    key: 'admin',
  },
  {
    title: 'User Section',
    subtitle: 'View borrowing activity and returns',
    key: 'user',
  },
]

const Dashboard = () => {
  const navigate = useNavigate()
  const [openAction, setOpenAction] = useState(null)

  const handleAction = (action) => {
    if (action.options) {
      setOpenAction((currentAction) => (
        currentAction === action.label ? null : action.label
      ))
      return
    }

    if (action.path) {
      navigate(action.path)
      return
    }

    if (!action.targetId) {
      return
    }

    document.getElementById(action.targetId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (

    <div className="h-[calc(100vh-136px)] overflow-y-auto bg-[#1a1a1a] p-6">
      <div className="space-y-6 min-w-[1200px]">

        <div className="grid grid-cols-2 gap-6">
          {dashboardSections.map((section) => (
            <section
              key={section.key}
              className="rounded-3xl border border-zinc-700 bg-[#252525] p-6"
            >
              <div className="mb-5">
                <h2 className="text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                <p className="mt-1 text-zinc-400">
                  {section.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {dashboardActions
                  .filter((action) => action.section === section.key)
                  .map((action) => (
                    <div
                      key={action.label}
                      className={`rounded-2xl border border-zinc-700 bg-[#1f1f1f] transition ${
                        openAction === action.label ? 'border-[#0f8f72]' : ''
                      }`}
                    >
                      <button
                        type="button"
                        className="flex min-h-20 w-full items-center justify-between rounded-2xl px-5 text-left text-zinc-100 transition hover:bg-[#2d2d2d]"
                        onClick={() => handleAction(action)}
                      >
                        <span className="flex items-center gap-3 text-lg font-medium">
                          <svg className={`h-6 w-6 ${action.color}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            {action.icon}
                          </svg>
                          {action.label}
                        </span>

                        {action.options && (
                          <span className="text-2xl leading-none text-zinc-400">
                            {openAction === action.label ? '-' : '+'}
                          </span>
                        )}

                        {action.badge && (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-600">
                            {action.badge}
                          </span>
                        )}
                      </button>

                      {action.options && openAction === action.label && (
                        <div className="grid grid-cols-2 gap-3 border-t border-zinc-700 p-4">
                          {action.options.map((option) => (
                            <button
                              key={option.label}
                              type="button"
                              className="min-h-14 rounded-xl border border-zinc-700 bg-[#181818] px-4 text-left font-medium text-zinc-100 transition hover:border-[#0f8f72] hover:bg-[#2a2a2a]"
                              onClick={() => navigate(option.path)}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
