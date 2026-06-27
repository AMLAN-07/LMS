import React, { useEffect, useState } from 'react'
import { createStudent, getStudent, updateStudent } from '../../services/StudentService'
import { useNavigate, useParams } from 'react-router-dom'

const AddStudent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const {id}= useParams();

  const [errors,setErrors]= useState({
    firstName:'',
    lastName:'',
    email:''
  })


  const navigator= useNavigate();

useEffect(()=>{
  if(id){
    getStudent(id).then((response)=>{
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

      const student ={firstName,lastName,email}
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
          navigator('/students')
        }).catch(error=>{
    console.error(error);})
      }

    }

  }

  const validForm=()=>{
    let valid=true;
    const errorsCopy={...errors}

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
      if(id){return <h2 className='text-center text-white'>Update Studdent</h2>}
      else{return <h2 className='text-center text-white'>Add Studdent</h2>}
  }
  const buttomName=()=>{
      if(id){return 'Update'}
      else{return 'Add'}
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 rounded-2xl bg-zinc-900 p-8 shadow-lg">
        {pageTitle()}
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
               { errors.firstName && <div className='invalid-feedback text-red-600' >{errors.lastName} </div>}
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
                  className={` w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500
                             ${errors.email?'is-invalid':''}`}
                onChange={(e) =>  setEmail(e.target.value)}
              />
               { errors.firstName && <div className='invalid-feedback text-red-600' >{errors.email} </div>}
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