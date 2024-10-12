'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { toast } from 'react-toastify';
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
                            JSON.stringify({ type: type, orderId: response.razorpay_payment_id})
                        );
                        toast.success('Booked Sucessfully')
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
            else {
                toast.success('Booked Sucessfully')
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
                        {isProcessing ? <div role="status">
                            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div> :
                            <button className="bg-gradient-to-r from-[#353535] to-[#000000] text-white px-10 py-2 rounded-2xl font-semibold hover:from-[#a4161a] hover:to-[#e63946] transition-colors duration-300 mb-5" onClick={handlePayment}>
                                Book Now
                            </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card