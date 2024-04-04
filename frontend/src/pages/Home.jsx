import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { LuClipboardSignature } from "react-icons/lu";
import TaskDetailsModal from "../components/TaskDetailsModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { useSnackbar } from "notistack";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deletedTask, setDeletedTask] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => {
        setTasks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [deletedTask]);

  const handleCheckboxChange = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (!taskToUpdate) {
      console.error("Task not found");
      return;
    }
  
    const updatedTask = {
      ...taskToUpdate,
      status: taskToUpdate.status === "completed" ? "pending" : "completed",
    };
  
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTask);
      setLoading(false);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
  
      // Enqueue snackbar notification when task is completed
      if (updatedTask.status === 'completed') {
        enqueueSnackbar("Congratulations! Task Completed!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error occurred while updating task status:", error);
    }
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetailsModal = () => {
    setSelectedTask(null);
  };

  const openDeleteModal = (task) => {
    setDeletedTask(task);
  };

  const closeDeleteModal = () => {
    setDeletedTask(null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="p-8 lg:w-1/3 md:w-1/2 sm:w-full bg-white rounded-lg shadow-lg h-5/6">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-3xl md:text-xl my-8 font-semibold text-black">
            What's the plan for today?
          </h1>
          <Link to="/tasks/create">
            <MdOutlineAddBox className="text-sky-800 lg:text-4xl md:text-2xl hover:scale-110" />
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex justify-center items-center text-gray-600 mt-14 font-style:italic lg:text-2xl md:text-xl">
            <p className="flex items-center">
              No tasks added yet. Why not add one?{" "}
              <span className="ml-2">
                <LuClipboardSignature className="lg:text-3xl md:text-xl" />
              </span>
            </p>
          </div>
        ) : (
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100% - 140px)" }}
          >
            <ul className="divide-y divide-gray-300 py-1">
              {tasks.map((task, index) => (
                <li
                  key={task._id}
                  className={`task-item p-4 flex justify-between items-center border border-gray-200 rounded-lg shadow-md mt-1 hover:cursor-pointer ${
                    task.status === "completed" ? "bg-green-300" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 h-5 w-5 accent-green-500 border-gray-300 rounded-md hover:cursor-pointer"
                      onChange={() => handleCheckboxChange(task._id)}
                      checked={task.status === "completed"}
                    />
                    <span className="lg:text-2xl md:text-xl font-bold mr-2">
                      {index + 1}.
                    </span>
                    <span className="lg:text-2xl md:text-xl max-w-[10ch] lg:max-w-[20ch] overflow-hidden overflow-ellipsis whitespace-nowrap">{task.title}</span>
                  </div>
                  <div className="flex gap-2 lg:mr-4 md:mr-2 sm:mr-1 ml-1">
                    <BsInfoCircle
                      className="lg:text-3xl md:text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => openTaskDetailsModal(task)}
                    />
                    <Link to={`/tasks/edit/${task._id}`}>
                      <AiOutlineEdit className="lg:text-3xl md:text-xl text-yellow-500 hover:text-yellow-600 cursor-pointer" />
                    </Link>
                    <MdOutlineDelete
                      className="lg:text-3xl md:text-xl text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => openDeleteModal(task)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={closeTaskDetailsModal} />
      )}
      {deletedTask && (
        <DeleteTaskModal task={deletedTask} onClose={closeDeleteModal} />
      )}
    </div>
  );
};

export default Home;