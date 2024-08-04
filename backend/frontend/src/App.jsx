import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import UserContextProvider from './context/UserContext'
import {DragDropContext} from 'react-beautiful-dnd'

const App = () => {
  return (
    <div>
    <DragDropContext>
    <UserContextProvider>
    <Toaster/>
    <Outlet/>
    </UserContextProvider>
    </DragDropContext>
    </div>
  )
}

export default App
