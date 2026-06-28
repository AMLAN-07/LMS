import React from 'react'

const Nav1 = () => {
  return (
    <nav className="flex items-center bg-[#232323] justify-between h-20">
                    {/* Left */}
                    <div className="flex items-center gap-4 px-8">
                        <div className="h-12 w-12 rounded-xl bg-[#dff0ea] flex items-center justify-center">
                            <svg className="text-[#0f6b5c]" size={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H14C14.5523 21 15 20.5523 15 20V10.6973L17.0215 20.2076C17.1363 20.7479 17.6673 21.0927 18.2075 20.9779L21.142 20.3541C21.6822 20.2393 22.027 19.7083 21.9122 19.1681L19.0015 5.47402C18.8866 4.9338 18.3556 4.58896 17.8154 4.70378L15 5.30221V5C15 4.44772 14.5523 4 14 4H9C9 3.44772 8.55228 3 8 3H4ZM9 6H13V14H9V6ZM13 16V19H9V16H13ZM7 17V19H5V17H7ZM18.7699 18.8137L18.3541 16.8577L19.3323 16.6498L19.748 18.6058L18.7699 18.8137Z"></path></svg>
                        </div>

                        <h1 className="text-3xl text-green-200 font-bold">
                            Amlan<span className="text-emerald-500">LMS</span>
                        </h1>
                    </div>
                    {/* middle */}
                    <div className="hidden md:block flex-1 max-w-xl mx-10">
                        <div className="relative">
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-green-200 w-4.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>

                            <input
                                type="text"
                                placeholder="Search books, members..."
                                className="w-full rounded-xl border border-[#4b453f] bg-emerald-500 py-3 pl-12 pr-4 text-lg placeholder:text-[#625f5d] focus:outline-none focus:border-[#0f8f72]"
                            />
                        </div>
                    </div>
                    {/* Right */}
                    <div className="flex items-center gap-3">

                        {/* Notification */}
                        <button className="relative bg-amber-50 p-3 rounded-xl border border-[#4b453f] hover:bg-[#1ec0a5] transition">
                            <svg className='w-4.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7C22.6569 7 24 5.65685 24 4C24 2.34315 22.6569 1 21 1C19.3431 1 18 2.34315 18 4C18 5.65685 19.3431 7 21 7ZM22 18V8.89998C21.6769 8.96557 21.3425 9 21 9C20.6575 9 20.3231 8.96557 20 8.89998V17H5.76282L4 18.3851V5H16.1C16.0344 4.67689 16 4.34247 16 4C16 3.65753 16.0344 3.32311 16.1 3H3C2.44772 3 2 3.44772 2 4V22.5L6.45455 19H21C21.5523 19 22 18.5523 22 18Z"></path></svg>
                        </button>

                        {/* Settings */}
                        <button className="p-3 bg-amber-50 rounded-xl border border-[#4b453f] hover:bg-[#1ec0a5] transition">
                             <svg className='w-4.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.13127 13.6308C1.9492 12.5349 1.95521 11.434 2.13216 10.3695C3.23337 10.3963 4.22374 9.86798 4.60865 8.93871C4.99357 8.00944 4.66685 6.93557 3.86926 6.17581C4.49685 5.29798 5.27105 4.51528 6.17471 3.86911C6.9345 4.66716 8.0087 4.99416 8.93822 4.60914C9.86774 4.22412 10.3961 3.23332 10.369 2.13176C11.4649 1.94969 12.5658 1.9557 13.6303 2.13265C13.6036 3.23385 14.1319 4.22422 15.0612 4.60914C15.9904 4.99406 17.0643 4.66733 17.8241 3.86975C18.7019 4.49734 19.4846 5.27153 20.1308 6.1752C19.3327 6.93499 19.0057 8.00919 19.3907 8.93871C19.7757 9.86823 20.7665 10.3966 21.8681 10.3695C22.0502 11.4654 22.0442 12.5663 21.8672 13.6308C20.766 13.6041 19.7756 14.1324 19.3907 15.0616C19.0058 15.9909 19.3325 17.0648 20.1301 17.8245C19.5025 18.7024 18.7283 19.4851 17.8247 20.1312C17.0649 19.3332 15.9907 19.0062 15.0612 19.3912C14.1316 19.7762 13.6033 20.767 13.6303 21.8686C12.5344 22.0507 11.4335 22.0447 10.3691 21.8677C10.3958 20.7665 9.86749 19.7761 8.93822 19.3912C8.00895 19.0063 6.93508 19.333 6.17532 20.1306C5.29749 19.503 4.51479 18.7288 3.86862 17.8252C4.66667 17.0654 4.99367 15.9912 4.60865 15.0616C4.22363 14.1321 3.23284 13.6038 2.13127 13.6308ZM11.9997 15.0002C13.6565 15.0002 14.9997 13.657 14.9997 12.0002C14.9997 10.3433 13.6565 9.00018 11.9997 9.00018C10.3428 9.00018 8.99969 10.3433 8.99969 12.0002C8.99969 13.657 10.3428 15.0002 11.9997 15.0002Z"></path></svg>
                        </button>

                        {/* User */}
                        <div className="h-12 w-12 rounded-full bg-[#dff0ea] text-emerald-500 font-bold flex items-center justify-center">
                            AB
                        </div>
                    </div>
                </nav>
  )
}

export default Nav1
