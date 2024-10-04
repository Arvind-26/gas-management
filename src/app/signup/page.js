'use client'
import React, { useRef, useState } from 'react'
import Link from "next/link"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Script from 'next/script';

const signup = () => {
    let cok = Cookies.get('token')
    const router = useRouter()
    if (cok) {
        router.push('/profile')
    }
    
    const [isProcessing, setIsProcessing] = useState(false)
    const [Amount, setAmount] = useState(9000)

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const data = await axios.post(`/api/payment`,
                JSON.stringify({ amount: Amount * 100 })
            );

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: Amount * 100,
                currency: "INR",
                name: "E Gas",
                description: "LPG Purchase",
                order_id: data.orderId,
                handler: async function (response) {
                    await axios.post(`/api/users/signup`, JSON.stringify(formData))
                    toast.success("verification email sent sucessfully");
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error in Payment:", error);
        } finally {
            setIsProcessing(false);
        }
    };


    const instruction = useRef();
    const createaccount = useRef();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        age: undefined,
        gender: "",
        email: "",
        password: "",
        phn_no: undefined,
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "age" || name === "phn_no" ? Number(value) : value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/users/signup`, JSON.stringify(formData))
            await handlePayment()
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const sign = () => {
        instruction.current.classList.toggle('hidden')
        createaccount.current.classList.toggle('hidden')
    }

    return (
        <>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div ref={instruction} className="flex items-center justify-center min-h-screen bg-black">
                <div className="w-full max-w-3xl p-8 bg-gray-900 shadow-lg rounded-lg">
                    <h1 className="text-4xl font-bold text-center text-white mb-8">
                        Join Our Gas Agency as a Customer
                    </h1>

                    <div className="space-y-6 text-gray-300">
                        <p className="text-lg">
                            You can join our gas agency as a customer by following these steps:
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <span className="mr-4 text-[#c9371a] font-bold text-lg">1.</span>
                                <p>
                                    <strong>Create Your Account:</strong> Click the "Sign Up" button below and fill in your details to create a new account.
                                </p>
                            </div>

                            <div className="flex items-start">
                                <span className="mr-4 text-[#c9371a] font-bold text-lg">2.</span>
                                <p>
                                    Upon signing up, you will be provided with <strong>12 regular-size gas cylinders</strong> worth <strong>₹9600</strong> for a discounted price of <strong>₹9000</strong>.
                                </p>
                            </div>

                            <div className="flex items-start">
                                <span className="mr-4 text-[#c9371a] font-bold text-lg">3.</span>
                                <p>
                                    <strong>2 LPG cylinders</strong> will be delivered immediately to the corresponding address provided during signup.
                                </p>
                            </div>

                            <div className="flex items-start">
                                <span className="mr-4 text-[#c9371a] font-bold text-lg">4.</span>
                                <p>
                                    The remaining <strong>10 regular-size cylinders</strong> can be booked anytime as needed, free of cost.
                                </p>
                            </div>

                            <div className="flex items-start">
                                <span className="mr-4 text-[#c9371a] font-bold text-lg">5.</span>
                                <p>
                                    After your initial 12 cylinders, charges will be applied for any additional bookings.
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <button className="bg-[#c9371a] hover:bg-red-600 text-white font-bold py-2 px-6 rounded" onClick={sign}>
                                Sign Up Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={createaccount} className="hidden flex items-center justify-center min-h-screen bg-black">
                <ToastContainer />
                <div className="w-full md:mt-32 m-3 max-w-lg p-8 space-y-8 bg-gray-900 shadow-lg rounded-lg">
                    <div>
                        <h2 className="text-3xl font-bold text-center text-white">Create an Account</h2>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstname" className="sr-only">First Name</label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="sr-only">Last Name</label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    required
                                    value={formData.lastname}
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
                            <label htmlFor="phn_no" className="sr-only">phone Number</label>
                            <input
                                id="phn_no"
                                name="phn_no"
                                type="tel"
                                required
                                value={formData.phn_no}
                                onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] sm:text-sm"
                                placeholder="phone Number"
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
                                Proceed to Payment
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
        </>
    );
}


export default signup