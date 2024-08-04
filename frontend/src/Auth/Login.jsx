import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, setuser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/users/login', { email, password });
            console.log(data);
            if (data?.success === true) {
                setuser({
                    ...user,
                    user: data.user,
                    token: data.token,
                });
                localStorage.setItem("auth", JSON.stringify(data));
                navigate('/dashboard');
                toast.success("User Logged In Successfully")
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Email Or Password")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20220427/pngtree-project-management-banner-delivery-business-image_1091566.jpg')" }}>
            <div className="bg-white bg-opacity-80 p-6 rounded-lg font-customfont shadow-md max-w-md w-full">
                <h2 className="text-3xl text-center font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-md mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-md mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-xl hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-medium mb-2">
                        Login
                    </button>
                    <Link to={'/register'} className='flex justify-center items-center text-blue-500 hover:text-blue-700'>
                        Don't have an Account? Please Register
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
