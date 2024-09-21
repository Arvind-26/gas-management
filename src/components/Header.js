import React from 'react'
import Image from 'next/image'

const Header = () => {
    return (
        <>
            <nav className=' flex justify-between w-full px-32 py-4 absolute z-10 text-white'>
                <div className=' flex justify-center items-center gap-4'>
                    <Image src={"/logo.png"} width={100} height={100} className=' h-15 w-20' />
                    <span className=' font-bold text-xl cursor-default'>E GAS</span>
                </div>
                <div className=' flex items-center gap-10 font-semibold'>
                    <span className=' hover:text-[#c9371a] duration-[0.5s] cursor-pointer'>Home</span>
                    <span className=' hover:text-[#c9371a] duration-[0.5s] cursor-pointer'>About</span>
                    <span className=' hover:text-[#c9371a] duration-[0.5s] cursor-pointer'>Services</span>
                    <span className=' hover:text-[#c9371a] duration-[0.5s] cursor-pointer'>Contact</span>
                </div>
            </nav>
        </>
    )
}

export default Header

