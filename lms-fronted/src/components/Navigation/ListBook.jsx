import React, { useEffect, useState } from 'react'
import { deleteBook, listBook } from '../../services/StudentService'
import { useNavigate } from 'react-router-dom'

const ListBook = () => {
 const [book, setBook] = useState([])

    const navigator = useNavigate();

    function getAllBook(){
        listBook().then((response) => {
            setBook(response.data);
        }).catch(error => {
            console.error(error);
        })

    }
    useEffect(() => {
        getAllBook()
    }, []);

    const updateBook =(bookId)=>{
        navigator(`/edit-book/${bookId}`)
    }
    const removeBook =(bookId)=>{
        deleteBook(bookId).then((response)=>{
            getAllBook();
        }).catch(error => {
            console.error(error);
        })
    }

    return (

        <div className="bg-[#1c1c1c] min-h-screen p-8 text-white">
            <h2 className='text-center'>List of Book</h2>
            <div className="overflow-hidden rounded-2xl border border-zinc-700">
                <table className='w-full'>

                    <thead className="bg-[#232323] text-zinc-400 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-5 text-left">ID</th>
                            <th className="px-6 py-5 text-left">Title</th>
                            <th className="px-6 py-5 text-left">Auther</th>
                            <th className="px-6 py-5 text-left">Copy</th>
                            <th className="px-6 py-5 text-middle">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            book.map((book) => {
                                const initials =
                                    book.title[0];
                                return (
                                    <tr key={book.bookId}
                                        className='border-t border-zinc-700 hover:bg-zinc-800/40 transition'>
                                        <td className='px-6 py-6'>
                                            <span className="rounded-lg border border-zinc-700 bg-[#232323] px-4 py-2 text-sm">
                                                #{String(book.bookId).padStart(3, "0")}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-sky-700">
                                                    {initials}
                                                </div>

                                                <span className="font-semibold text-2xl">
                                                    {book.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='px-6 py-6 text-zinc-300 text-lg'>{book.author}</td>
                                        <td className='px-6 py-6 text-zinc-300 text-lg'>{book.bookcopy}</td>
                                        <td className="px-6 py-6">
                                            <div className="flex justify-center gap-3">

                                                <button className="rounded-xl border border-zinc-700 p-3 hover:bg-green-500/20 hover:border-green-500 transition"
                                                        onClick={() => updateBook(book.bookId)}>
                                                    <svg className='w-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4356 3.21188C16.8261 2.82185 17.4592 2.82157 17.8496 3.21188L20.6777 6.04099C21.0681 6.43152 21.0682 7.06457 20.6777 7.45505L7.2422 20.8896H3.00001V16.6475L16.4356 3.21188ZM5.00001 17.4756V18.8896H6.41407L15.7276 9.57615L14.3135 8.16208L5.00001 17.4756ZM4.5293 1.3193C4.70583 0.893505 5.29418 0.893508 5.47071 1.3193L5.72364 1.93063C6.15555 2.97342 6.96155 3.80613 7.97462 4.2568L8.69239 4.57614C9.10267 4.75896 9.10262 5.35616 8.69239 5.53903L7.93263 5.87692C6.94497 6.3162 6.15339 7.11943 5.71387 8.1279L5.4668 8.69334C5.28636 9.10747 4.71366 9.10747 4.53321 8.69334L4.28614 8.1279C3.84661 7.11943 3.05506 6.3162 2.06739 5.87692L1.30762 5.53903C0.897483 5.35617 0.897435 4.75896 1.30762 4.57614L2.0254 4.2568C3.03845 3.80614 3.84446 2.97344 4.27637 1.93063L4.5293 1.3193ZM15.7276 6.74802L17.1426 8.16208L18.5567 6.74802L17.1426 5.33395L15.7276 6.74802Z"></path></svg>
                                                </button>

                                                <button className="rounded-xl border border-zinc-700 p-3 hover:bg-zinc-800 transition">
                                                    <svg className='w-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.94607 9.31543C1.42353 9.14125 1.4194 8.86022 1.95682 8.68108L21.043 2.31901C21.5715 2.14285 21.8746 2.43866 21.7265 2.95694L16.2733 22.0432C16.1223 22.5716 15.8177 22.59 15.5944 22.0876L11.9999 14L17.9999 6.00005L9.99992 12L1.94607 9.31543Z"></path></svg>
                                                </button>

                                                <button className="rounded-xl border border-zinc-700 p-3 hover:bg-red-500/20 hover:border-red-500 transition"
                                                        onClick={()=>removeBook(book.bookId)}>
                                                <svg className='w-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>

                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>

                </table>
            </div>
        </div>

    )
}

export default ListBook