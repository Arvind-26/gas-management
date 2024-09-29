'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserEdit, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const profile = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('profile');

    const data = async () => {
        const response = await axios.post(`/api/users/profile`)
        setUserData(response.data)
    }

    const history = async () => {
        const hist = await axios.post(`/api/history`)
        console.log(hist.data);
        setHistoryData(hist.data)
    }

    useEffect(() => {
        data()
        history()
    },[])

    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        age: null,
        gender: '',
        email: '',
        address: '',
        phn_no: null,
    });

    const [historyData, setHistoryData] = useState([]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleUpdateProfile = () => {
        alert('Profile Updated');
    };

    const handleLogout = async() => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logged out")
            router.push('/')
        } catch (error) {
            toast.error(error.response.data.error)   
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center py-10">
            <ToastContainer />
            <div className="w-full max-w-2xl md:mt-16 bg-gray-900 rounded-lg shadow-lg p-8 space-y-8 transition-all duration-500 ease-in-out transform hover:scale-105">

                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-2">User Profile</h2>
                    <p className="text-gray-400">Manage your account information</p>
                </div>

                <div className="flex justify-center space-x-10 mb-8">
                    <button
                        className={`flex items-center px-6 py-2 text-lg ${activeTab === 'profile' ? 'bg-[#c9371a]' : 'bg-gray-800'} hover:bg-[#e15534] text-white font-medium rounded-full shadow-lg transition-all duration-300`}
                        onClick={() => handleTabChange('profile')}
                    >
                        <FaUserEdit className="mr-2" /> Profile
                    </button>
                    <button
                        className={`flex items-center px-6 py-2 text-lg ${activeTab === 'history' ? 'bg-[#c9371a]' : 'bg-gray-800'} hover:bg-[#e15534] text-white font-medium rounded-full shadow-lg transition-all duration-300`}
                        onClick={() => handleTabChange('history')}
                    >
                        <FaHistory className="mr-2" /> History
                    </button>
                </div>

                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400">Name:</label>
                                <input
                                    className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                    value={userData.firstname + ' ' + userData.lastname}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400">Age:</label>
                                <input
                                    className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                    value={userData.age}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400">Gender:</label>
                                <input
                                    className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                    value={userData.gender}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400">Phone:</label>
                                <input
                                    className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                    value={userData.phn_no}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400">Email:</label>
                            <input
                                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                value={userData.email}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400">Address:</label>
                            <input
                                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                value={userData.address}
                                readOnly
                            />
                        </div>

                        <div className="flex space-x-4 mt-6 justify-center">
                            <button
                                onClick={handleUpdateProfile}
                                className="flex items-center justify-center bg-[#c9371a] py-2 px-4 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                            >
                                <FaUserEdit className="mr-2" /> Update Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center bg-gray-700 py-2 px-4 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="overflow-y-auto max-h-60">
                        <table className="table-auto w-full text-left text-gray-300">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-white">Date</th>
                                    <th className="px-6 py-3 text-white">Size</th>
                                    <th className="px-6 py-3 text-white">Approved</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData.toReversed().map((item, index) => (
                                    <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                                        <td className="px-6 py-4">{item.date}</td>
                                        <td className="px-6 py-4">{item.type}</td>
                                        <td className="px-6 py-4">{item.checked + ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default profile;
