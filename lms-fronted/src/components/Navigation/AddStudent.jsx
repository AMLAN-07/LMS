import React, { useState } from 'react'
import { createStudent } from '../../services/StudentService'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const navigator= useNavigate();

const saveStudent=(e)=>{
    e.preventDefault();
    const student ={firstName,lastName,email}
    console.log(student)

    createStudent(student).then((response)=>{
      console.log(response.data);
      navigator('/students')
    })
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 rounded-2xl bg-zinc-900 p-8 shadow-lg">
        <h2 className='text-center text-white'>Add Studdent</h2>
        <div className='card-body'>
          <form>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                First Name
              </label>

              <input
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                onChange={(e) =>  setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Email Name
              </label>

              <input
                type="text"
                placeholder="Enter email"
                name="lastName"
                value={email}
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                onChange={(e) =>  setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer w-1/4 rounded-lg bg-green-600 my-3.5 py-3 font-semibold text-white transition hover:bg-green-700"
              onClick={saveStudent}
            >
              Add Student
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default AddStudent