import React from 'react';
import Header from '../component/Header';
import Navbar from '../component/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className='w-full shadow-md fixed top-0 left-0 bg-white z-10'>
        <Header />
        <Navbar />
      </div>
      <main className='mt-32'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout