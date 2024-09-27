import React from 'react'

const verifyemail = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 m-3 space-y-8 bg-gray-900 shadow-lg rounded-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Verify Your Email</h2>
                    <p className="mt-2 text-gray-400">
                        Please verify your email address by clicking the button below.
                    </p>
                </div>

                <div className="mt-8">
                    <button
                        type="button"
                        className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c9371a] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9371a] transition-colors duration-300"
                    >
                        Verify Email
                    </button>
                </div>
            </div>
        </div>

    )
}

export default verifyemail
