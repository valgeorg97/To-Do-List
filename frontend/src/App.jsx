import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import EditTask from "./pages/EditTask.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks/create" element={<CreateTask />} />
      <Route path="/tasks/edit/:id" element={<EditTask />} />
    </Routes>
  );
};

export default App;
