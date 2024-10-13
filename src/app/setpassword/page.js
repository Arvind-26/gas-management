'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const setpassword = () => {
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)

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
        setIsProcessing(true)
        e.preventDefault();
        try {
            if (password == cnfPassword) {
                await axios.post(`/api/users/passwordchange`, JSON.stringify({ 'password': password, 'token': token }))
                toast.success("password changed sucessfully")
                router.push('/login')
            }
            else {
                toast.warn("passwords dont match")
            }
        } catch (error) {
            toast.error(error.response.data.error)
        } finally {
            setIsProcessing(false)
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
                        {isProcessing ?
                            <div role="status">
                                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div> :
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c9371a] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9371a] transition-colors duration-300"
                                onClick={resetPassword}
                            >
                                Set New Password
                            </button>}
                    </div>
                </form>
            </div>
        </div>

    )
}

export default setpassword
