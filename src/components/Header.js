'use client'
import React, { useEffect, useRef, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext';
import Cookies from 'js-cookie';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const { isLoggedIn } = useAuth()
    const sideBar = useRef(null);

    const toggleSideBar = () => {
        sideBar.current.classList.toggle('hidden')
    }

    useEffect(() => {
        const cok = Cookies.get('admin');
        setIsAdmin(!!cok);
    });

    return (
        <>
            <nav >
                <div className=' flex justify-between w-full md:px-32 px-5 py-4 absolute z-10 text-white'>
                    <div className=' flex justify-center items-center gap-4'>
                        <Image src={"/logo.png"} alt='logo' width={100} height={100} className=' md:h-16 md:w-20 h-10 w-12' />
                        <span className='font-bold md:text-xl text-lg cursor-default'>E GAS</span>
                    </div>
                    <div className='hidden md:flex items-center gap-10 font-semibold'>
                        <Link href="/"><span className=' hover:text-[#c9371a] duration-[0.5s] cursor-pointer'>Home</span></Link>
                        <span className=' hover:text-[#c9371a] duration-[0.5s] cursor-pointer'>About</span>
                        {isLoggedIn ? <Link href="/profile"><span className=' hover:text-[#c9371a] duration-[0.5s] cursor-pointer'>Profile</span></Link> :
                            <></>}
                        {isAdmin ?
                            <Link href="/dashboard"><span className=' hover:text-[#c9371a] duration-[0.5s] cursor-pointer'>Dashboard</span></Link> : <></>}
                    </div>
                    <div className='md:hidden flex items-center gap-10 font-semibold' onClick={toggleSideBar}><i className="fa-solid fa-bars"></i></div>
                </div>
                <div ref={sideBar} className="flex z-30 absolute right-0 hidden">
                    <div className="h-screen w-64 bg-gray-900 text-gray-200">
                        <div className="flex items-center justify-end h-16 bg-gray-800 text-xl font-bold">
                            <i className="fa-solid fa-x mr-3" onClick={toggleSideBar}></i>
                        </div>

                        <nav className="mt-10">
                            <Link href="/" onClick={toggleSideBar} className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
                                <i className="fas fa-home mr-3"></i>
                                Home
                            </Link>
                            {isLoggedIn ? <><Link href="/profile" onClick={toggleSideBar} className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
                                <i className="fas fa-user mr-3"></i>
                                Profile
                            </Link>
                                {isAdmin ? <Link href="/dashboard" onClick={toggleSideBar} className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
                                    <i className="fas fa-user mr-3"></i>
                                    Dashboard
                                </Link> : <></>}</> : <><Link href="/login" onClick={toggleSideBar} className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
                                    <i className="fas fa-user mr-3"></i>
                                    Login
                                </Link>
                                <Link href="/signup" onClick={toggleSideBar} className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
                                    <i className="fas fa-user mr-3"></i>
                                    Sign Up
                                </Link></>}
                            <Link href="#" onClick={toggleSideBar} className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
                                <i className="fas fa-cog mr-3"></i>
                                About
                            </Link>
                        </nav>

                        <hr className="my-4 border-gray-700" />
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Header

