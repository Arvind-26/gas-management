'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [pendingRequests, setPendingRequests] = useState([]);
    const [oldRequests, setOldRequests] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false)

    const fetchUser = async (email) => {
        try {
            const user = await axios.post(`/api/userInfo`, JSON.stringify({ email }));
            setSelectedUser(user.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        }
    }

    const fetchRequests = async () => {
        try {
            const pending = await axios.post(`/api/pending`);
            const old = await axios.put(`/api/pending`);
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
            pending.data.forEach(item => {
                item.date = formatDate(item.date);
            });
            setPendingRequests(pending.data);
            old.data.forEach(item => {
                item.date = formatDate(item.date);
            });
            setOldRequests(old.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        }
    };

    useEffect(() => {
        const cok = Cookies.get('admin');
        setIsAdmin(!!cok);
        fetchRequests();
    }, []);

    const handleAccept = async (email) => {
        setIsProcessing(true)
        try {
            await axios.put(`/api/userInfo`, { email, 'checked': true });
            toast.success("Request accepted!");
            setSelectedUser()
            fetchRequests();
        } catch (error) {
            console.error("Error accepting request", error);
        } finally {
            setIsProcessing(false)
        }
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
                <h1 className="text-4xl font-bold">Only Admins can access this page</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <ToastContainer />
            {selectedUser && (
                <div className="bg-gray-800 p-6 mt-16 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform">
                    <h2 className="text-2xl font-bold mb-4">User Details</h2>
                    <div className="space-y-4">
                        <div><strong>Email:</strong> {selectedUser.email}</div>
                        <div><strong>Phone:</strong> {selectedUser.phn_no}</div>
                        <div><strong>Address:</strong> {selectedUser.address}</div>
                    </div>

                    <div className="mt-6 flex space-x-4 justify-center">
                        {isProcessing ?
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div> :
                            <button
                                onClick={() => handleAccept(selectedUser.email)}
                                className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                            >
                                <FaCheck className="mr-2" /> Accept
                            </button>}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 mt-16 md:grid-cols-2 gap-8">

                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
                    <ul>
                        {pendingRequests.map((request, index) => (
                            <li
                                key={index}
                                className="bg-gray-700 p-4 mb-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                                onClick={() => fetchUser(request.email)}
                            >
                                {request.email} - {request.type} - {request.date}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Old Requests</h2>
                    <ul className="max-h-60 overflow-y-auto">
                        {oldRequests.map((request, index) => (
                            <li
                                key={index}
                                className="bg-gray-700 p-4 mb-2 rounded-lg"
                            >
                                {request.email} - {request.type} - {request.date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default dashboard;
