import React, { useState } from 'react'
import TopBar from './TopBar';
import { redirect, useNavigate } from 'react-router-dom';

const Login = () => {
  const[email,SetEmail]=useState('');
  const [password, SetPassword] = useState('');
  // const navigator=useNavigate();

  const handleLogin =(e)=>{
    e.preventDefault();
    //api Call
    console.log("data"+email+" " + password)

  }
  const redirectToRegister =()=>{
    // navigator('/register')

  }



  return (
    <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-zinc-700 bg-[#2a2a2a] shadow-2xl overflow-hidden">
      <TopBar/>

        {/* Form */}
        <div className="px-8 py-8">

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email address
              </label>

              <div className="relative">
                <svg
                  className="w-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM2 4C2 3.44772 2.44772 3 3 3H14V5H4.5052L12 11.662L16.3981 7.75259L17.7269 9.24741L12 14.338L4 7.22684V19H20V11H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4Z"></path></svg>
                <input
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => SetEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-transparent py-4 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 focus:border-[#0f8f72]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="relative">
                <svg
                  className="w-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>


                <input
                  type={password ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-transparent py-4 pl-12 pr-16 text-white outline-none placeholder:text-zinc-500 focus:border-[#0f8f72]"
                />

                <button
                  type="button"
                  onClick={() =>
                    SetPassword(!password)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl  px-4 py-2 hover:bg-zinc-800"
                >
                  {password ? (
                    <svg className='w-4.5'
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>

                  ) : (
                    <svg className='w-4.5'
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.1305 15.8421L9.34268 18.7821L7.41083 18.2645L8.1983 15.3256C7.00919 14.8876 5.91661 14.2501 4.96116 13.4536L2.80783 15.6069L1.39362 14.1927L3.54695 12.0394C2.35581 10.6105 1.52014 8.8749 1.17578 6.96843L2.07634 6.80469C4.86882 8.81573 8.29618 10.0003 12.0002 10.0003C15.7043 10.0003 19.1316 8.81573 21.9241 6.80469L22.8247 6.96843C22.4803 8.8749 21.6446 10.6105 20.4535 12.0394L22.6068 14.1927L21.1926 15.6069L19.0393 13.4536C18.0838 14.2501 16.9912 14.8876 15.8021 15.3256L16.5896 18.2645L14.6578 18.7821L13.87 15.8421C13.2623 15.9461 12.6376 16.0003 12.0002 16.0003C11.3629 16.0003 10.7381 15.9461 10.1305 15.8421Z"></path></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-600 bg-transparent"
                />
                Remember me
              </label>

              <a
                href="#"
                className="text-[#0f8f72] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In */}
            <button
              className="w-full gap-3 flex justify-center rounded-xl border border-zinc-700 py-4 text-xl font-semibold text-white transition hover:bg-zinc-800"
              type='submit'
            >
              <svg className='w-4.5 '
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"></path></svg>
              Sign in
            </button>

          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-700" />

            <span className="text-zinc-400 text-sm">
              or continue with
            </span>

            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">

            <button className="flex items-center justify-center gap-3 rounded-xl border border-zinc-700 py-4 font-medium text-white hover:bg-zinc-800 transition">
            <svg className='w-4.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path></svg>
              Google
            </button>

            <button className="flex items-center justify-center gap-3 rounded-xl border border-zinc-700 py-4 font-medium text-white hover:bg-zinc-800 transition">
              <svg className='w-4.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg>
              GitHub
            </button>

          </div>

          {/* Register */}
          <p className="mt-8 text-center text-zinc-400">
            Don’t have an account?{" "}
            <a
              onClick={redirectToRegister}
              className="text-[#0f8f72] font-medium hover:underline"
            >
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Login