import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import CreateTask from './pages/CreateTask.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import EditTask from './pages/EditTask.jsx';
import DeleteTask from './pages/DeleteTask.jsx';


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

export default App;
