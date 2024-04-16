import React from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { API_BASE_URL } from "../constants/API_BASE_URL";

const DeleteTaskModal = ({ task, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTask = () => {
    axios
      .delete(`${API_BASE_URL}/tasks/${task._id}`)
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
        className="md:max-w-[400px] lg:max-w-[500px] md:w-auto md:h-auto h-[auto] bg-white rounded-xl p-2 md:p-4 flex flex-col relative"
      >
        <div className="my-1 md:my-2">
          <h3 className="text-sm md:text-base text-center md:text-left">
            Are you sure you want <br className="md:hidden" /> to delete this task?
          </h3>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-evenly">
          <button
            className="p-1 md:p-2 bg-red-600 text-white m-1 md:m-2 w-full md:w-auto rounded-md text-xs md:text-sm"
            onClick={handleDeleteTask}
          >
            Yes, Delete it
          </button>
          <button
            className="p-1 md:p-2 bg-gray-400 text-white m-1 md:m-2 w-full md:w-auto rounded-md text-xs md:text-sm"
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
