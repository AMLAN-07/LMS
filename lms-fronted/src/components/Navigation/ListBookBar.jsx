import React from 'react'
import { useEffect,useState } from 'react';
import { listBook } from '../../services/StudentService';
import { useNavigate } from 'react-router-dom';
const ListBookBar = () => {
const [book, setBook]=useState([])

    const navigator=useNavigate();

    useEffect(()=>{
        listBook().then((response)=>{
            setBook(response.data);
        }).catch(error=>{
            console.error(error);
        })
    },[]);

    function addNewBook(){
        navigator('/add-book')
    }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 px-8">

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Library</h1>

            <span className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
              {book.length} Book
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            {/* Search */}
            <div className="relative">
                <svg className="w-4.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 1.99964C11.2639 1.99964 11.525 2.01348 11.7832 2.03578C11.4424 2.63427 11.202 3.29716 11.084 4.0016C11.056 4.00127 11.028 3.99965 11 3.99965C7.13263 3.99965 4.00021 7.13233 4 10.9997C4 14.8672 7.1325 17.9997 11 17.9997C12.8956 17.9997 14.6148 17.2468 15.875 16.0241L16.0244 15.8747C17.247 14.6145 18 12.8951 18 10.9997C18 10.9714 17.9974 10.9429 17.9971 10.9147C18.7018 10.7968 19.3642 10.5563 19.9629 10.2155C19.9852 10.4739 20 10.7355 20 10.9997C20 13.1235 19.2632 15.077 18.0312 16.6169L22.3135 20.8991L20.8994 22.3132L16.6172 18.0309C15.0773 19.263 13.124 19.9997 11 19.9997C6.032 19.9997 2 15.9677 2 10.9997C2.00021 6.03182 6.03213 1.99964 11 1.99964ZM16.5293 1.31898C16.7059 0.893192 17.2942 0.89318 17.4707 1.31898L17.7236 1.93031C18.1556 2.9731 18.9616 3.80582 19.9746 4.25648L20.6924 4.57582C21.1026 4.75864 21.1026 5.35584 20.6924 5.53871L19.9326 5.8766C18.9449 6.31588 18.1534 7.11911 17.7139 8.12758L17.4668 8.69302C17.2864 9.10715 16.7137 9.10715 16.5332 8.69302L16.2871 8.12758C15.8476 7.11895 15.0552 6.31593 14.0674 5.8766L13.3076 5.53871C12.8974 5.35585 12.8974 4.75863 13.3076 4.57582L14.0254 4.25648C15.0385 3.80582 15.8445 2.97312 16.2764 1.93031L16.5293 1.31898Z"></path></svg>


              <input
                type="text"
                placeholder="Search users..."
                className="w-full sm:w-96 rounded-xl border border-zinc-700 bg-green-300 py-3 pl-10 pr-4 outline-none focus:border-zinc-500"
              />
            </div>

            {/* Add User */}
            <button className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 hover:bg-zinc-800 transition"
                 onClick={addNewBook}   >
              <svg className='w-4.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path></svg>
              Add Book
            </button>
          </div>
        </div>
  )
}

export default ListBookBar