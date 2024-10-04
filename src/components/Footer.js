import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';


const Footer = () => {
    return (
        <div>
            <footer className=" text-white py-8">
                <div className="container mx-auto flex flex-col md:flex-row text-center justify-center md:justify-between items-center">
                    
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold mb-2">E Gas</h2>
                        <p className="text-sm">Book top-class regular size cylinders with accurate weight & superior quality for your household needs.</p>
                    </div>

                    
                    <div className="mb-4 md:mb-0">
                        <ul className="flex flex-col md:flex-row gap-4 text-sm">
                            <li><Link href="/" className="hover:text-[#c9371a]">Home</Link></li>
                            <li><Link href="#Blog" className="hover:text-[#c9371a]">About</Link></li>
                            <li><Link href="#Package" className="hover:text-[#c9371a]">LPG Booking</Link></li>
                            <li><Link href="#Service" className="hover:text-[#c9371a]">Service</Link></li>
                        </ul>
                    </div>

                    
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm"><strong>Address:</strong> 123 Street, Pune, Maharashtra</p>
                        <p className="text-sm"><strong>Phone:</strong> (123) 456-7890</p>
                        <p className="text-sm"><strong>Email:</strong> info@Egas.com</p>
                    </div>

                    
                    <div className="flex gap-4">
                        <a href="#" aria-label="Facebook" className="hover:text-[#c9371a] text-3xl"><i className="fa-brands fa-square-github"></i></a>
                        <a href="#" aria-label="Instagram" className="hover:text-[#c9371a] text-3xl"><i className="fa-brands fa-linkedin"></i></a>
                        <a href="#" aria-label="Twitter" className="hover:text-[#c9371a] text-3xl"><i className="fa-solid fa-envelope"></i></a>
                    </div>
                </div>

                <div className="mt-8 text-center border-t border-gray-700 pt-4 text-xs">
                    <p>&copy; 2024 E Gas. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    )
}

export default Footer