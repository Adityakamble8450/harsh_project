import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/users/register', {
                name,
                email,
                password,
            });
            console.log(data);
            if (data?.success === true) {
                navigate('/login');
                toast.success("User Registered Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20220427/pngtree-project-management-banner-delivery-business-image_1091566.jpg')" }}>
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-center text-3xl font-customfont text-dark mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 font-customfont focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 font-customfont focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 font-customfont focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 text-xl font-medium rounded-md font-customfont text-white bg-green-600 hover:bg-green-700"
                        >
                            Register
                        </button>
                        <Link to={'/login'} className='text-center mt-4 items-center flex justify-center w-full text-green-600 hover:text-green-800'>
                            Already Registered? Please Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
