import React from 'react'
import Image from 'next/image'

const Card = ({ type, img }) => {
    return (
        <div className="flex justify-center mt-10">
            <div className="h-auto w-72 bg-slate-100 relative rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="h-1/4 font-bold text-4xl w-full flex justify-center items-center bg-gradient-to-tr from-[#8b0000] to-[#932424] text-white absolute rounded-t-lg">
                    {type}
                </div>
                <div className="bg-white font-bold text-[#8b0000] rounded-lg text-3xl flex justify-center items-center py-2 w-32 absolute top-20 left-1/2 transform -translate-x-1/2 shadow-xl">
                    ₹800
                </div>
                <Image
                    src={img}
                    width={1000}
                    alt="Quick Gas Connection"
                    height={1000}
                    className="w-52 mx-auto mt-36 rounded-xl hover:scale-105 transition-transform duration-300"
                />
                <div className="flex justify-center mt-4">
                    <button className="bg-gradient-to-r from-[#8b0000] to-[#932424] text-white px-10 py-2 rounded-2xl font-semibold hover:from-[#a72d16] hover:to-[#8b0000] transition-colors duration-300 mb-5">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card