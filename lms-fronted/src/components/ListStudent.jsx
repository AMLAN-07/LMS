import React, { useEffect, useState } from 'react'
import { listStudent } from '../services/StudentService'

const ListStudent = () => {

const [student, setStudent]=useState([])

useEffect(()=>{
    listStudent().then((response)=>{
        setStudent(response.data);
    }).catch(error=>{
        console.error(error);
    })
},[]);

    return (

        <div className="bg-[#1c1c1c] min-h-screen p-8 text-white">
            <h2 className='text-center'>List of Student</h2>
            <div className="overflow-hidden rounded-2xl border border-zinc-700">
                <table className='w-full'>

                    <thead className="bg-[#232323] text-zinc-400 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-5 text-left">ID</th>
                            <th className="px-6 py-5 text-left">Name</th>
                            <th className="px-6 py-5 text-left">Email id</th>
                            {/* <th>Status</th>
                    <th>Action</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            student.map((student) =>{
                                const initials =
                student.firstName[0] + student.lastName[0];
                                return (
                                <tr key={student.id}
                                    className='border-t border-zinc-700 hover:bg-zinc-800/40 transition'>
                                    <td className='px-6 py-6'>
                                        <span className="rounded-lg border border-zinc-700 bg-[#232323] px-4 py-2 text-sm">
                                            #{String(student.id).padStart(3, "0")}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-sky-700">
                                                {initials}
                                            </div>

                                            <span className="font-semibold text-2xl">
                                                {student.firstName} {student.lastName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-6 text-zinc-300 text-lg'>{student.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>

    )
}

export default ListStudent