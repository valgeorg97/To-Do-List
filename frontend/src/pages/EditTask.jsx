import React, { useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() =>{
    setLoading(true);
    axios.get(`http://localhost:5000/tasks/${id}`)
    .then((res) =>{
      setTitle(res.data.title);
      setDescription(res.data.description);
      setStatus(res.data.status);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      alert('Error occurred, please check the console!');
      console.log(err)
    })
  }, []);

  const handleEditTask = () =>{
    const data = {
      title,
      description,
      status: 'pending'
    };
    setLoading(true);
    axios
    .put(`http://localhost:5000/tasks/${id}`, data)
    .then(() =>{
      setLoading(false);
      navigate('/')
    })
    .catch((err) =>{
      setLoading(false);
      alert('Error occurred, please check the console!');
      console.log(err);
    });
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Task</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Status</label>
          <input
            type='text'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditTask}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditTask;
