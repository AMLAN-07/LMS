import React, { useEffect, useState } from 'react'
import { createBook, getBook, updateBook } from '../../services/StudentService'
import { useNavigate, useParams } from 'react-router-dom'

const AddBook = () => {
const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [bookcopy, setBookCopy] = useState('')

  const {bookId}= useParams();

  const [errors,setErrors]= useState({
      author:'',
      bookcopy:'',
      title:''
  })


  const navigator= useNavigate();

useEffect(()=>{
  if(bookId){
    getBook(bookId).then((response)=>{
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setBookCopy(response.data.bookcopy);
  }).catch(error=>{
    console.error(error);
  })

  }
},[bookId])

  const saveOrUpdateBook=(e)=>{
    e.preventDefault();

    if(validForm()){

      const book ={author,bookcopy,title}
      console.log(book)

      if(bookId){
        updateBook(bookId,book).then((response)=>{
          console.log(response.data);
          navigator('/Book')
        }).catch(error=>{
    console.error(error);})

      }else{

        createBook(book).then((response)=>{
          console.log(response.data);
          navigator('/Book')
        }).catch(error=>{
    console.error(error);})
      }

    }

  }

  const validForm=()=>{
    let valid=true;
    const errorsCopy={...errors}

    if(title.trim()){
      errorsCopy.title='';
    }else{errorsCopy.title='Title is required';
          valid=false;
    }
    if(author.trim()){
      errorsCopy.author='';
    }else{errorsCopy.author='Author is required';
          valid=false;
    }
    if(bookcopy!=String){
      errorsCopy.bookcopy='';
    }else{errorsCopy.bookcopy='bookcopy is required';
          valid=false;
    }
    setErrors(errorsCopy);
    return valid;
  }
  const pageTitle=()=>{
      if(bookId){return <h2 className='text-center text-white'>Update Book</h2>}
      else{return <h2 className='text-center text-white'>Add Book</h2>}
  }
  const buttomName=()=>{
      if(bookId){return 'Update'}
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
                Title
              </label>

              <input
                type="text"
                placeholder="Enter Tittle"
                name="title"
                value={title}
                required
                className={` w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500
                             ${errors.title?'is-invalid':''}`}
                onChange={(e) => setTitle(e.target.value)}
              />
              { errors.title && <div className='invalid-feedback text-red-600' >{errors.title} </div>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Author
              </label>

              <input
                type="text"
                placeholder="Enter Author name "
                name="author"
                value={author}
                required
                className={` w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500
                             ${errors.author?'is-invalid':''}`}
                onChange={(e) =>  setAuthor(e.target.value)}
              />
               { errors.author && <div className='invalid-feedback text-red-600' >{errors.author} </div>}
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Book Copy
              </label>

              <input
                type="text"
                placeholder="Enter bookcopy"
                name="bookcopy"
                value={bookcopy}
                required
                  className={` w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500
                             ${errors.bookcopy?'is-invalid':''}`}
                onChange={(e) =>  setBookCopy(e.target.value)}
              />
               { errors.bookcopy && <div className='invalid-feedback text-red-600' >{errors.bookcopy} </div>}
            </div>
            <button
              type="submit"
              className="cursor-pointer w-1/4 rounded-lg bg-green-600 my-3.5 py-3 font-semibold text-white transition hover:bg-green-700"
              onClick={saveOrUpdateBook}
            >
              {buttomName()} Book
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default AddBook