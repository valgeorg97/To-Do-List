import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/tasks')
      .then((res) => {
        setTasks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
    <div className="p-4 w-2/5">
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Tasks</h1>
        <Link to='/tasks/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl hover:scale-110' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="list-disc">
          {tasks.map((task, index) => (
            <li key={task.id} className="text-2xl my-2 flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold mr-2">{index + 1}.</span>
                {task.title}
              </div>
              <div className="flex gap-2">
              <Link to={`/tasks/details/${task._id}`} className="mr-2">
                  <BsInfoCircle className="text-3xl text-green-800 hover:scale-110 cursor-pointer" />
                </Link>
                <Link to={`/tasks/edit/${task._id}`} className="mr-2">
                  <AiOutlineEdit className="text-3xl text-yellow-600 hover:scale-110 cursor-pointer" />
                </Link>
                <Link to={`/tasks/delete/${task._id}`} className="mr-2">
                <MdOutlineDelete className="text-3xl text-red-600 hover:scale-110 cursor-pointer" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default Home
