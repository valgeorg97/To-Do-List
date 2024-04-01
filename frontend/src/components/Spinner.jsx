import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";

const Spinner = () => {
  return (
    <div className='flex justify-center w-16 h-16 m-8 rounded-full'>
      <PulseLoader/>
    </div>
  )
}

export default Spinner;
