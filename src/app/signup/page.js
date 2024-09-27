'use client'
import React, { useState } from 'react'
import Link from "next/link"

const signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full md:mt-32 m-3 max-w-lg p-8 space-y-8 bg-gray-900 shadow-lg rounded-lg">
                <div>
                    <h2 className="text-3xl font-bold text-center text-white">Create an Account</h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="sr-only">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="sr-only">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                                placeholder="Last Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="age" className="sr-only">Age</label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                required
                                value={formData.age}
                                onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                                placeholder="Age"
                            />
                        </div>

                        <div>
                            <label htmlFor="gender" className="sr-only">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                required
                                value={formData.gender}
                                onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
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
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                            placeholder="Password"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="sr-only">Phone Number</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                            placeholder="Phone Number"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="sr-only">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                            placeholder="Address"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c9371a] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9371a]"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account?
                        <Link href="/login" className="font-medium text-[#c9371a] hover:text-red-500 ml-1">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default signup