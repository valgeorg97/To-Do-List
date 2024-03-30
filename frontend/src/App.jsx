import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CreateTask from './components/CreateTask';
import TaskDetails from './components/TaskDetail';
import EditTask from './components/EditTask';
import DeleteTask from './components/DeleteTask';


const App = () => {
  return (
    <Routes> 
      <Route path='/' element={ <Home />} />
      <Route path='/tasks/create' element={<CreateTask />} />
      <Route path='/tasks/details/:id' element={<TaskDetails />} />
      <Route path='/tasks/edit/:id' element={<EditTask />} />
      <Route path='/tasks/delete/:id' element={< DeleteTask />} />
    </Routes>
  )
}

export default App
