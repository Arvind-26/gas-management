'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserEdit, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';

const profile = () => {
    let cok = Cookies.get('token')
    const [isProcessingUpdate, setIsProcessingUpdate] = useState(false)
    const [isProcessingLogout, setIsProcessingLogout] = useState(false)
    const router = useRouter()
    if (cok) {
        router.push('/profile')
    }
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditMode, setIsEditMode] = useState(false);

    const { setIsLoggedIn } = useAuth()

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

    const data = async () => {
        const response = await axios.post(`/api/users/profile`);
        setUserData(response.data);
    };

    const history = async () => {
        const hist = await axios.post(`/api/history`);
        const formatDate = (isoDate) => {
            const dateObj = new Date(isoDate);
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
            const day = dateObj.getDate().toString().padStart(2, '0');
            const hours = dateObj.getHours().toString().padStart(2, '0');
            const minutes = dateObj.getMinutes().toString().padStart(2, '0');
            const seconds = dateObj.getSeconds().toString().padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };
        hist.data.forEach(item => {
            item.date = formatDate(item.date);
        });
        setHistoryData(hist.data);
    };

    useEffect(() => {
        data();
        history();
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleUpdateProfile = () => {
        if (isEditMode) {
            setIsProcessingUpdate(true)
            axios.put('/api/users/profile', userData)
                .then(() => {
                    toast.success('Profile updated successfully');
                    setIsEditMode(false);
                    setIsProcessingUpdate(false)
                })
                .catch((err) => {
                    toast.error('Error updating profile')
                    setIsProcessingUpdate(false)
                });
        } else {
            setIsEditMode(true);
        }
    };

    const handleLogout = async () => {
        setIsProcessingLogout(true)
        try {
            await axios.get('/api/users/logout');
            toast.success("Logged out");
            setIsLoggedIn(false)
            router.push('/');
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setIsProcessingLogout(false)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center py-10">
            <ToastContainer />
            <div className="w-full max-w-2xl mt-16 bg-gray-900 rounded-lg shadow-lg p-8 space-y-8 transition-all duration-500 ease-in-out transform md:hover:scale-105">

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
                        <FaHistory className="mr-2" /> Orders
                    </button>
                </div>

                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400">Name:</label>
                                <input
                                    name="firstname"
                                    className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                    value={userData.firstname}
                                    onChange={handleInputChange}
                                    readOnly={!isEditMode}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400"> &nbsp;</label>
                                <input
                                    name="lastname"
                                    className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                    value={userData.lastname}
                                    onChange={handleInputChange}
                                    readOnly={!isEditMode}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400">Age:</label>
                                <input
                                    name="age"
                                    className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                    value={userData.age}
                                    onChange={handleInputChange}
                                    readOnly={!isEditMode}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400">Gender:</label>
                                <input
                                    name="gender"
                                    className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                    value={userData.gender}
                                    onChange={handleInputChange}
                                    readOnly={!isEditMode}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400">Phone:</label>
                            <input
                                name="phn_no"
                                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                value={userData.phn_no}
                                onChange={handleInputChange}
                                readOnly={!isEditMode}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400">Email:</label>
                            <input
                                name="email"
                                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                value={userData.email}
                                onChange={handleInputChange}
                                readOnly={!isEditMode}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400">Address:</label>
                            <input
                                name="address"
                                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-[#c9371a] transition-all duration-300"
                                value={userData.address}
                                onChange={handleInputChange}
                                readOnly={!isEditMode}
                            />
                        </div>

                        <div className="flex space-x-4 mt-6 justify-center">
                            {isProcessingUpdate ? <div role="status">
                                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div> :
                                <button
                                    onClick={handleUpdateProfile}
                                    className={`flex items-center justify-center ${isEditMode ? 'bg-green-600' : 'bg-[#c9371a]'} py-2 px-4 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300`}
                                >
                                    <FaUserEdit className="mr-2" /> {isEditMode ? "Save Changes" : "Update Profile"}
                                </button>}
                            {isProcessingLogout ? <div role="status">
                                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div> :
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center bg-gray-700 py-2 px-4 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>}
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
                                        <td className="px-6 py-4">{item.checked ? "Yes" : "No"}</td>
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
