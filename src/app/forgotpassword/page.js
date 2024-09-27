import React from 'react'

const forgotpassword = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 m-3 space-y-8 bg-gray-900 shadow-lg rounded-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Forgot Your Password?</h2>
                    <p className="mt-2 text-gray-400">
                        Enter your registerd email address to get a link to reset your password.
                    </p>
                </div>

                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 focus:outline-none focus:ring-[#c9371a] focus:border-[#c9371a] focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c9371a] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9371a] transition-colors duration-300"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default forgotpassword
