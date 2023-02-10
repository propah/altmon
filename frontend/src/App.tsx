import React from 'react';
import './App.css';
import Logo from './icons/logo.svg';

function App() {
  return (
    <div className='flex flex-wrap bg-black p-6'>
      <button className='flex fs-bold font-medium items-center text-white mb-4 md:mb-0'>
        <img src={Logo} className='bg-white rounded-full w-15 h-20 py-6 px-1'/>
        <span className='ml-3 text-3xl'>altmon</span>
      </button>
      <nav className='ml-auto mr-auto flex flex-wrap items-center justify-center fs-bold xl:text-xl md:text-base'>
        <button className="mr-5 p-5 text-white hover:">Home</button>
        <button className="mr-5 p-5 text-white">Dashboard</button>
      </nav>
      <button className='inline-flex items-center text-white border-0 text-base fs-regular'>
        <span className='focus:outline-none hover:bg-gray-200 hover:text-black p-3 rounded'>Login</span>
      </button>
    </div>
  );
}

export default App;
