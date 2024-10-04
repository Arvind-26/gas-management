'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Card = ({ type, img, price }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [Amount, setAmount] = useState(price)
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    const handlePayment = async () => {
        if (!isLoggedIn) {
            router.push("/login")
        }
        setIsProcessing(true);
        try {

            const data1 = await axios.post(`/api/booking`,
                JSON.stringify({ type: type })
            );

            if (data1.data.message === "Pay") {
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
                        await axios.put(`/api/booking`,
                            JSON.stringify({ type: type })
                        );
                        toast.success("Booked Sucessfully")
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
            else {
                toast.success("Booked Sucessfully")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="flex justify-center mt-10">
                <ToastContainer />
                <div className="h-auto w-72 bg-gradient-to-r from-[#111] to-[#333] relative rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">

                    <div className="h-1/4 font-bold text-4xl w-full flex justify-center items-center bg-gradient-to-tr from-[#111] to-[#333] text-white absolute rounded-t-lg">
                        {type}
                    </div>

                    <div className="bg-[#0000009d] font-bold text-[#e63946] rounded-lg text-3xl flex justify-center items-center py-2 w-32 absolute top-20 left-1/2 transform -translate-x-1/2 shadow-xl">
                        ₹{price}
                    </div>

                    <Image
                        src={img}
                        width={1000}
                        alt="Quick Gas Connection"
                        height={1000}
                        className="w-52 mx-auto mt-36 rounded-xl hover:scale-105 transition-transform duration-300"
                    />

                    <div className="flex justify-center mt-4">
                        <button className="bg-gradient-to-r from-[#353535] to-[#000000] text-white px-10 py-2 rounded-2xl font-semibold hover:from-[#a4161a] hover:to-[#e63946] transition-colors duration-300 mb-5" onClick={handlePayment}>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card