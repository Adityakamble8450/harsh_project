import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Auth/Register.jsx'
import Login from './Auth/Login.jsx'
import Home from './components/Home.jsx'
import DashBoard from './components/DashBoard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path:'/login',
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path:'/dashboard',
        element: <DashBoard/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
       <App />
    </RouterProvider>
  </React.StrictMode>,
)
