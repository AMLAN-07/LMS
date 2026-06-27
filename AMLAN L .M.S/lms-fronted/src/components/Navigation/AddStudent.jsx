import React, { useEffect, useState } from 'react'
import { createStudent, getStudent, updateStudent } from '../../services/StudentService'
import { useNavigate, useParams } from 'react-router-dom'
import AdminControlButton from '../AdminControlButton'
import DashboardButton from '../DashboardButton'

const AddStudent = () => {
  const [regdNo, setRegdNo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const {id}= useParams();

  const [errors,setErrors]= useState({
    regdNo:'',
    firstName:'',
    lastName:'',
    email:''
  })


  const navigator= useNavigate();

useEffect(()=>{
  if(id){
    getStudent(id).then((response)=>{
        setRegdNo(response.data.regdNo || '');
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
  }).catch(error=>{
    console.error(error);
  })

  }
},[id])

  const saveOrUpdateStudent=(e)=>{
    e.preventDefault();

    if(validForm()){

      const student ={regdNo,firstName,lastName,email}
      console.log(student)

      if(id){
        updateStudent(id,student).then((response)=>{
          console.log(response.data);
          navigator('/students')
        }).catch(error=>{
    console.error(error);})

      }else{

        createStudent(student).then((response)=>{
          console.log(response.data);
          navigator('/students', { state: { popupMessage: 'Student added successfully' } })
        }).catch(error=>{
    console.error(error);})
      }

    }

  }

  const validForm=()=>{
    let valid=true;
    const errorsCopy={...errors}

    if(/^\d{11}$/.test(regdNo.trim())){
      errorsCopy.regdNo='';
    }else{errorsCopy.regdNo='Registration number must be 11 digits';
          valid=false;
    }
    if(firstName.trim()){
      errorsCopy.firstName='';
    }else{errorsCopy.firstName='First name is required';
          valid=false;
    }
    if(lastName.trim()){
      errorsCopy.lastName='';
    }else{errorsCopy.lastName='last name is required';
          valid=false;
    }
    if(email.trim()){
      errorsCopy.email='';
    }else{errorsCopy.email='email is required';
          valid=false;
    }
    setErrors(errorsCopy);
    return valid;
  }
  const pageTitle=()=>{
      if(id){return <h2 className='text-center text-white'>Update Student</h2>}
      else{return <h2 className='text-center text-white'>Add Student</h2>}
  }
  const buttomName=()=>{
      if(id){return 'Update'}
      else{return 'Add'}
  }

  return (
    <>
      <div className="mx-auto mt-10 max-w-md">
        <div className="mb-5 flex flex-wrap gap-3">
          <DashboardButton />
          <AdminControlButton />
        </div>
      </div>
      <div className="max-w-md mx-auto rounded-2xl bg-zinc-900 p-8 shadow-lg">
        {pageTitle()}
        <div className='card-body'>
          <form>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Regd. No
              </label>

              <input
                type="text"
                placeholder="Enter registration number"
                name="regdNo"
                value={regdNo}
                required
                maxLength={11}
                inputMode="numeric"
                className={` w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500
                             ${errors.regdNo?'is-invalid':''}`}
                onChange={(e) => setRegdNo(e.target.value.replace(/\D/g, '').slice(0, 11))}
              />
              { errors.regdNo && <div className='invalid-feedback text-red-600' >{errors.regdNo} </div>}
            </div>
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
                className={` w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500
                             ${errors.firstName?'is-invalid':''}`}
                onChange={(e) => setFirstName(e.target.value)}
              />
              { errors.firstName && <div className='invalid-feedback text-red-600' >{errors.firstName} </div>}
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
                className={` w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500
                             ${errors.lastName?'is-invalid':''}`}
                onChange={(e) =>  setLastName(e.target.value)}
              />
               { errors.lastName && <div className='invalid-feedback text-red-600' >{errors.lastName} </div>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Email
              </label>

              <input
                type="text"
                placeholder="Enter email"
                name="lastName"
                value={email}
                required
                  className={` w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500
                             ${errors.email?'is-invalid':''}`}
                onChange={(e) =>  setEmail(e.target.value)}
              />
               { errors.email && <div className='invalid-feedback text-red-600' >{errors.email} </div>}
            </div>
            <button
              type="submit"
              className="cursor-pointer w-1/4 rounded-lg bg-green-600 my-3.5 py-3 font-semibold text-white transition hover:bg-green-700"
              onClick={saveOrUpdateStudent}
            >
              {buttomName()} Student
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default AddStudent
