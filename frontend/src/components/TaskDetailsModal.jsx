import { AiOutlineClose } from 'react-icons/ai';

const TaskDetailsModal = ({ task, onClose }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-[600px] max-w-full h-[500px] bg-white rounded-xl p-4 flex flex-col relative"
            >
                <AiOutlineClose
                    className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
                    onClick={onClose}
                />
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl">Task Details</h1>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Title:</span>
                    <span className="text-2xl">{task.title}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Description:</span>
                    <span className="text-2xl break-words">{task.description}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Status:</span>
                    <span className="text-2xl">{task.status}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Create Time:</span>
                    <span className="text-2xl">{formatDate(task.createdAt)}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Last Update Time:</span>
                    <span className="text-2xl">{formatDate(task.updatedAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;
