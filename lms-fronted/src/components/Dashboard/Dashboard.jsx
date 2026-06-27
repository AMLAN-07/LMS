import React from 'react'
import { useEffect, useState } from 'react';
import { listStudent, listBook ,listStudentBooks} from '../../services/StudentService';
import { useNavigate } from 'react-router-dom';
import RecentReport from '../Navigation/RecentReport';

const Dashboard = () => {
  const [student, setStudent] = useState([])
  const [book, setBook]=useState([])
const [rows, setRows] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listStudent().then((response) => {
      setStudent(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  useEffect(() => {
    listBook().then((response) => {
      setBook(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  useEffect(() => {
     listStudentBooks()
      .then((res) => setRows(res.data)
    ).catch(error => {
      console.error(error);
    })
  }, []);

  function Book() {
    navigator('/Book')
  }

  function Member() {
    navigator('/students')
  }
  function Borrow() {
    navigator('/borrow')
  }
  return (

    <div className="h-[calc(100vh-136px)] overflow-y-auto bg-[#1a1a1a] p-6">
      <div className="space-y-6 min-w-[1200px]">

        {/* Hero Section */}
        <div className="flex items-center justify-center rounded-3xl border border-zinc-700 bg-[#252525] h-64">
          <div className="text-center">
            <svg className="mx-auto size-40 mb-4 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9.999V20C22 20.5523 21.5523 21 21 21H13V9.999H22ZM11 15.999V21H3C2.44772 21 2 20.5523 2 20V15.999H11ZM11 3V13.999H2V4C2 3.44772 2.44772 3 3 3H11ZM21 3C21.5523 3 22 3.44772 22 4V7.999H13V3H21Z"></path></svg>



            <h2 className="text-3xl font-semibold text-zinc-100">
              Dashboard
            </h2>

            <p className="mt-2 text-zinc-400 text-lg">
              Your dashboard content goes here
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="overflow-x-auto">
          <div className="grid min-w-[1000px] grid-cols-4 gap-6">

            <div
              onClick={Member}
              className="rounded-3xl border border-zinc-700 bg-[#252525] p-6">

              <svg className="mb-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879L5 4.60434ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z"></path></svg>
              <p className="text-zinc-400">Total Students</p>

              <h3 className="mt-2 text-4xl font-bold text-white">
                {student.length}
              </h3>
            </div>

            <div
            onClick={Book}
            className="rounded-3xl border border-zinc-700 bg-[#252525] p-6">
              <svg className="mb-4 size-70 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H14C14.5523 21 15 20.5523 15 20V15.2973L15.9995 19.9996C16.1143 20.5398 16.6454 20.8847 17.1856 20.7699L21.0982 19.9382C21.6384 19.8234 21.9832 19.2924 21.8684 18.7522L18.9576 5.0581C18.8428 4.51788 18.3118 4.17304 17.7716 4.28786L14.9927 4.87853C14.9328 4.38353 14.5112 4 14 4H10C10 3.44772 9.55228 3 9 3H4ZM10 6H13V14H10V6ZM10 19V16H13V19H10ZM8 5V15H5V5H8ZM8 17V19H5V17H8ZM17.3321 16.6496L19.2884 16.2338L19.7042 18.1898L17.7479 18.6057L17.3321 16.6496ZM16.9163 14.6933L15.253 6.86789L17.2092 6.45207L18.8726 14.2775L16.9163 14.6933Z"></path></svg>
              <p className="text-zinc-400">Books</p>

              <h3 className="mt-2 text-4xl font-bold text-white">
                {book.length}
              </h3>
            </div>

            <div
            onClick={Borrow}
            className="rounded-3xl border border-zinc-700 bg-[#252525] p-6">
              <svg className='mb-4 size-70 text-yellow-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16V14H19V4H6V14.0354C6.1633 14.0121 6.33024 14 6.5 14H8V16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19H10V21H6.5C4.567 21 3 19.433 3 17.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V20C21 20.5523 20.5523 21 20 21H16V19H19V16H18ZM7 5H9V7H7V5ZM7 8H9V10H7V8ZM14 17V23H12V17H9L13 12L17 17H14Z"></path></svg>

              <p className="text-zinc-400">
                Borrow Records
              </p>

              <h3 className="mt-2 text-4xl font-bold text-white">
                Click here
              </h3>
            </div>

            <div className="rounded-3xl border border-zinc-700 bg-[#252525] p-6">
              <svg className='mb-4 size-70 text-purple-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 13H8V21H2V13ZM16 8H22V21H16V8ZM9 3H15V21H9V3ZM4 15V19H6V15H4ZM11 5V19H13V5H11ZM18 10V19H20V10H18Z"></path></svg>

              <p className="text-zinc-400">Reports</p>

              <h3 className="mt-2 text-4xl font-bold text-white">
                {rows.length}
              </h3>
            </div>

          </div>
        </div>

        {/* Widgets */}
        <div className="flex items-center justify-center rounded-3xl border border-zinc-700 bg-[#252525] h-64">
          <div className="text-center">
            <svg className="mx-auto size-40 mb-4 text-zinc-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-properties-icon lucide-table-properties"><path d="M15 3v18" /><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M21 9H3" /><path d="M21 15H3" /></svg>

            <h2 className="text-3xl font-semibold text-zinc-100">
              Widgets
            </h2>

            <p className="mt-2 text-zinc-400 text-lg">
              Tables, stats, and widgets
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-3xl border border-zinc-700 bg-[#252525] p-6">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Recent Activity
          </h2>

          <RecentReport/>
        </div>

      </div>
    </div>
  )
}

export default Dashboard