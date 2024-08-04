import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const DashBoard = () => {
    const { user, setuser } = useUser();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [isEditMode,setiseditmode] = useState(false)
    const[currentId,setcurrentId] = useState(null)
    const [task, setTask] = useState({
        title: '',
        status: '',
        priority: '',
        deadline: '',
        description: ''
    });
    const [tasks, settask] = useState([]);
    const [statusopt, setstatusopt] = useState([]);
    const [PriorityOpt, setPriorityOpt] = useState([]);

    useEffect(() =>  {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('/api/v1/users/get-task',{
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });

                console.log('Token', user?.token);
                
        
                if (res?.data?.success === true && Array.isArray(res?.data?.tasks)) {
                    settask(res.data.tasks);
                } else {
                    console.error("Failed to fetch tasks:", res.data?.message || "Unknown error");
                }
            } catch (error) {
                // Log the full error object for debugging
                console.error("Error fetching tasks:", error);
        
                // Check if error response exists
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Server responded with an error:", error.response.data);
                    console.log(error);
                    
        
                    // Display specific error message if available
                    toast.error(error.response.data?.message || "Unknown server error");
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received:", error.request);
                    toast.error("No response received from the server");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up the request:", error.message);
                    toast.error("Error setting up the request");
                }
            }
        };
        
        

        const fetchStatusOption = async () => {
            try {
                const { data } = await axios.get("/api/v1/users/status-options");
                if (data.success === true && Array.isArray(data.statusOption)) {
                    setstatusopt(data.statusOption);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchPriorityOptions = async () => {
            try {
                const { data } = await axios.get("/api/v1/users/priority-options");
                if (data?.success === true && Array.isArray(data.priorityoption)) {
                    setPriorityOpt(data.priorityoption);
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        if(user?.token) fetchTasks()
        fetchPriorityOptions();
        fetchStatusOption();
    }, [user?.token]);

    const handleLogout = () => {
        setuser({
            user: null,
            token: ""
        });
        localStorage.removeItem("auth");
        navigate('/login');
        toast.success(`${user?.user?.name} logout Successfully`);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/users/create-task', task,{
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            if (data?.success === true) {
                settask([...tasks, data.task]);
                toast.success("Task Created Successfully");
                handleClose();
            }
        } catch (error) {
            console.log(error);
            toast.error("Please Login To Continue || Unauthorized Access");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/v1/users/delete-task/${id}`,{
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            const { data } = response;
            if (data?.success === true) {
                settask(tasks.filter((t) => t._id !== id));
                toast.success("Task Deleted Successfully | Please Refresh The Page");
            } else {
                console.error("Error deleting task:", data.message);
                toast.error("Error deleting task");
            }
        } catch (error) {
            console.error("Error in handleDelete:", );
            toast.error("Error while deleteing");
        }
    };
    

    const handleUpdateClick =(task)=>{
        setTask(task)
        setcurrentId(task._id)
        setiseditmode(true)
        handleShow()
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/v1/users/update-task/${currentId}`, task);
            const { data } = response;
            if (data?.success === true) {
                settask(tasks.map((t) => t._id === currentId ? data.task : t));
                toast.success("Task updated Successfully || Refresh Refresh The Page");
                handleClose();
            } else {
                console.error("Error updating task:", data.message);
                toast.error("Error updating task");
            }
        } catch (error) {
            console.error("Error in handleUpdate:", error.response?.data || error.message || error);
            toast.error("Error updating task");
        }
    };
    

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('taskId', id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, newStatus) => {
        const id = e.dataTransfer.getData('taskId');
        const updatedTasks = tasks.map((task) => {
            if (task._id === id) {
                task.status = newStatus;
            }
            return task;
        });
        settask(updatedTasks);
    };
    
    const renderTaskCard = (task) => (
        <div
            key={task._id}
            draggable
            onDragStart={(e) => handleDragStart(e, task._id)}
            className="bg-zinc-100 p-3 mb-2 rounded-lg shadow-md"
        >
            <div className='flex items-center justify-between'>
                <button onClick={() => handleDelete(task._id)} className='text-red-500'><i className="fa-solid fa-trash"></i></button>
                <button onClick={()=> handleUpdateClick(task)} className='text-blue-500'><i className="fa-solid fa-plus"></i></button>
            </div>
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p className="text-gray-700 text-sm">{task.description}</p>
            <p className={`text-white px-2 mb-0 py-1 rounded-md ${task.priority === 'Urgent' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>{task.priority}</p>
            <p className="text-gray-500 font-bold">{task.deadline}</p>
            <button onClick={handleShow} className='bg-violet-800 text-white px-4 py-1 rounded-md mt-2'>Add Task</button>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center font-customfont" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/realistic-luxury-background_23-2149354608.jpg')" }}>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/6 bg-gray-800 text-white p-1 md:relative md:top-0">
                    <h4 className="text-2xl font-bold mb-4 px-10">Hi! {user?.user?.name}</h4>
                    <div className="my-4">
                        <i className="fa-solid fa-bell mx-2"></i>
                        <i className="fa-solid fa-sun mx-2"></i>
                        <i className="fa-solid fa-forward mx-2"></i>
                        {user?.token ?
                            <button type="button" onClick={handleLogout} className="mt-2 bg-violet-800 px-4 py-2 rounded-md">Logout</button> :
                            <button type="button" onClick={handleLogin} className="mt-2 bg-violet-800 px-4 py-2 rounded-md">Login</button>
                        }
                    </div>
                    <ul className="list-none mb-2">
                        <li className="mb-2"><i className="fa-solid fa-house mr-2"></i><a href="#" className="text-white no-underline">Home</a></li>
                        <li className="mb-2"><i className="fa-solid fa-clapperboard mr-2"></i><a href="#" className="text-white no-underline">Board</a></li>
                        <li className="mb-2"><i className="fa-solid fa-gear mr-2"></i><a href="#" className="text-white no-underline">Setting</a></li>
                        <li className="mb-2"><i className="fa-solid fa-user-plus mr-2"></i><a href="#" className="text-white no-underline">Team</a></li>
                        <li className="mb-2"><i className="fa-regular fa-chart-bar mr-2"></i><a href="#" className="text-white no-underline">Analytics</a></li>
                    </ul>
                    <button onClick={handleShow} className="bg-violet-800 px-4 py-2 rounded-md">Create New Task</button>
                </div>
                <div className="flex-1 p-3 overflow-y-auto">
                    <h1 className="text-4xl mb-2 text-white">Welcome, {user?.user?.name}! To Your Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <div className="bg-zinc-100 p-2 rounded-lg shadow-md flex items-center">
                            <img src="https://5.imimg.com/data5/RF/WB/MY-16453035/task-management-system-500x500.png" alt="Task Management" className="w-20 h-20 mr-4" />
                            <div>
                                <h3 className="text-lg font-bold">Introducing Tags</h3>
                                <p className="text-sm">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
                            </div>
                        </div>
                        <div className="bg-zinc-100 p-2 rounded-lg shadow-md flex items-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-WzyHJw7_wqg5kF7X1tWrQ48aoDyzi8eAg&s" alt="Task Management" className="w-20 h-20 mr-4" />
                            <div>
                                <h3 className="text-lg font-bold">Share Notes Instantly</h3>
                                <p className="text-sm">Effortlessly share your notes with others via link or email. Enhance collaboration with quick sharing options.</p>
                            </div>
                        </div>
                        <div className="bg-zinc-100 p-2 rounded-lg shadow-md flex items-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI7akiH05F9n7fvPgJwkwEa124DgsxMPQXzQ&s" alt="Task Management" className="w-20 h-20 mr-4" />
                            <div>
                                <h3 className="text-lg font-bold">Access Anywhere</h3>
                                <p className="text-sm">Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {['TO DO', 'In Progress', 'Under Review', 'Finished'].map((column,index) => (
                            <div
                                key={index}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, column)}
                                className="p-2 rounded-lg h-auto"
                            >
                                <h5 className="text-lg font-bold text-white mb-2">{column}</h5>
                                {tasks.filter(task => task?.status === column).map(renderTaskCard)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for creating a task */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${show ? 'block' : 'hidden'} bg-black bg-opacity-50`}>
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                    <div className="flex items-center justify-between border-b border-gray-200">
                        <h2 className="text-xl font-bold w-full text-center mt-2">{isEditMode ? "Update"  : "Create" } A TASK</h2>
                        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        <form onSubmit={isEditMode ? handleUpdate  : handleSubmit } className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-bold">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={task.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-bold">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={task.status}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Status</option>
                                    <option value={'TO DO'}>TO DO</option>
                                    <option value={'In Progress'}>In Progress</option>
                                    <option value={'Under Review'}>Under Review</option>
                                    <option value={'Finished'}>Finished</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="priority" className="block text-sm font-bold">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={task.priority}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Priority</option>
                                    <option value={'Urgent'}>Urgent</option>
                                    <option value={'Low'}>Low</option>
                                    <option value={'Medium'}>Medium</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="deadline" className="block text-sm font-bold">Deadline</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    value={task.deadline}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-bold">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={task.description}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <button type="submit" className="bg-violet-800 text-white px-3 py-1 rounded-md hover:bg-violet-700">
                                {isEditMode ? "Update"  : "Submit" }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default DashBoard;
