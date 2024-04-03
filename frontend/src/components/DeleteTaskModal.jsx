import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteTaskModal = ({ task, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTask = () => {
    axios
      .delete(`http://localhost:5000/tasks/${task._id}`)
      .then(() => {
        enqueueSnackbar("Task deleted successfully!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        onClose();
      })
      .catch((error) => {
        enqueueSnackbar("Error deleting task!", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        console.log(error);
      });
  };

  return (
    <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[200px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="my-4">
          <h3 className="text-xl">
            Are you sure you want to delete this task?
          </h3>
        </div>
        <div className="flex justify-between">
          <button
            className="p-3 bg-red-600 text-white m-8 flex-grow rounded-md"
            onClick={handleDeleteTask}
          >
            Yes, Delete it
          </button>
          <button
            className="p-3 bg-gray-400 text-white m-8 flex-grow rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
