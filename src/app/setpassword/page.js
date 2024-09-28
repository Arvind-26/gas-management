'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const setpassword = () => {
    // const router = useRouter()

    const searchParams = useSearchParams();
    let token = searchParams.get("token");

    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "new-password") {
            setPassword(value);
        } else if (name === "confirm-password") {
            setCnfPassword(value);
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            if (password == cnfPassword) {
                await axios.post(`/api/users/passwordchange`, JSON.stringify({ 'password': password,'token': token }))
                toast.success("password changed sucessfully")
                router.push('/login')
            }
            else {
                toast.warn("passwords dont match")
            }
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <ToastContainer />
            <div className="w-full max-w-md p-8 m-3 space-y-8 bg-gray-900 shadow-lg rounded-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Set a New Password</h2>
                    <p className="mt-2 text-gray-400">
                        Enter your new password below to reset your account password.
                    </p>
                </div>

                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="new-password" className="sr-only">New Password</label>
                        <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            required
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] focus:z-10 sm:text-sm"
                            placeholder="New Password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] focus:z-10 sm:text-sm"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c9371a] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9371a] transition-colors duration-300"
                            onClick={resetPassword}
                        >
                            Set New Password
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default setpassword
