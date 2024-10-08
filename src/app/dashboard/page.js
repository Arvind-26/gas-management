'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dashboard = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [oldRequests, setOldRequests] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUser = async (email) => {
        try {
            const user = await axios.post(`/api/userInfo`, JSON.stringify({email}));
            setSelectedUser(user.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        }
    }

    const fetchRequests = async () => {
        try {
            const pending = await axios.post(`/api/pending`);
            const old = await axios.put(`/api/pending`);
            setPendingRequests(pending.data);
            setOldRequests(old.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        }
    };
    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAccept = async (email) => {
        try {
            await axios.put(`/api/userInfo`, { email, 'checked':true });
            toast.success("Request accepted!");
            setSelectedUser([])
            fetchRequests();
        } catch (error) {
            console.error("Error accepting request", error);
        }
    };

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
                                {request.email} - {request.type}
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
                                {request.email} - {request.type}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            
        </div>
    );
};

export default dashboard;
