'use client'
import React, { useState } from 'react'
import Link from "next/link"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/users/login`, JSON.stringify(formData))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <ToastContainer />
            <div className="w-full max-w-md m-3 p-8 space-y-8 bg-gray-900 shadow-lg rounded-lg">
                <div>
                    <h2 className="text-3xl font-bold text-center text-white">Login to Your Account</h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] focus:z-10 sm:text-sm rounded-t-md"
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] focus:z-10 sm:text-sm rounded-b-md"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/forgotpassword" className="font-medium text-[#c9371a] hover:text-[#a83721]">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c9371a] hover:bg-[#a52910] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9371a]"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account?
                        <Link href="/signup" className="font-medium text-[#c9371a] hover:text-[#9e2107] ml-1">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    );
}


export default login