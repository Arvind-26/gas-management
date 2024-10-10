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
        try {
            await axios.put(`/api/userInfo`, { email, 'checked': true });
            toast.success("Request accepted!");
            setSelectedUser()
            fetchRequests();
        } catch (error) {
            console.error("Error accepting request", error);
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
                        <button
                            onClick={() => handleAccept(selectedUser.email)}
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                        >
                            <FaCheck className="mr-2" /> Accept
                        </button>
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
