import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveTask = () => {
    const data = {
      title,
      description,
      status: 'pending'
    };
    setLoading(true);
    axios
      .post('http://localhost:5000/tasks', data)
      .then(() =>{
        setLoading(false);
        enqueueSnackbar('Task created successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
        navigate('/')
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Error creating task!', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
        console.log(err);
      });
  }

  return (
    <div className='flex justify-center items-start pt-20 min-h-screen bg-gray-200'>
      <div className='p-4'>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col shadow-lg w-[600px] p-4 mx-auto bg-white rounded-lg'>
          <div className='items-center mb-4'>
            <BackButton />
            <div className='text-center'>
              <h1 className='text-3xl'>Add Task</h1>
            </div>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              maxLength={25}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 rounded-md border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Description</label>
            <textarea
              value={description}
              maxLength={125}
              onChange={(e) => setDescription(e.target.value)}
              className='border-2 rounded-md border-gray-500 px-4 py-2 w-full resize-y'
            />
          </div>
          <button className='justify-center p-2 w-2/6 bg-sky-300 m-auto my-6 rounded-sm hover:bg-sky-500' onClick={handleSaveTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
