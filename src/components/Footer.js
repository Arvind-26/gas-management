import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';


const Footer = () => {
    return (
        <div>
            <footer class=" text-white py-8">
                <div class="container mx-auto flex flex-col md:flex-row text-center justify-center md:justify-between items-center">
                    
                    <div class="mb-4 md:mb-0">
                        <h2 class="text-xl font-bold mb-2">E Gas</h2>
                        <p class="text-sm">Book top-class regular size cylinders with accurate weight & superior quality for your household needs.</p>
                    </div>

                    
                    <div class="mb-4 md:mb-0">
                        <ul class="flex flex-col md:flex-row gap-4 text-sm">
                            <li><Link href="#Top" class="hover:text-[#c9371a]">Home</Link></li>
                            <li><Link href="#Blog" class="hover:text-[#c9371a]">About</Link></li>
                            <li><Link href="#Package" class="hover:text-[#c9371a]">LPG Booking</Link></li>
                            <li><Link href="#Service" class="hover:text-[#c9371a]">Service</Link></li>
                        </ul>
                    </div>

                    
                    <div class="mb-4 md:mb-0">
                        <p class="text-sm"><strong>Address:</strong> 123 Street, City, Country</p>
                        <p class="text-sm"><strong>Phone:</strong> (123) 456-7890</p>
                        <p class="text-sm"><strong>Email:</strong> info@Egas.com</p>
                    </div>

                    
                    <div class="flex gap-4">
                        <a href="#" aria-label="Facebook" class="hover:text-[#c9371a] text-3xl"><i class="fa-brands fa-square-github"></i></a>
                        <a href="#" aria-label="Instagram" class="hover:text-[#c9371a] text-3xl"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="#" aria-label="Twitter" class="hover:text-[#c9371a] text-3xl"><i class="fa-solid fa-envelope"></i></a>
                    </div>
                </div>

                <div class="mt-8 text-center border-t border-gray-700 pt-4 text-xs">
                    <p>&copy; 2024 E Gas. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    )
}

export default Footer