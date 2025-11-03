import React from 'react';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';

export const BoardLayout = ({ children } : {children: React.ReactNode }) => {
  return (
    <div className='grid lg:grid-cols-[1fr_4fr]'>
        <SideBar  />
        <div>
            <Navbar/>
            {children}
        </div>
    </div>
  )
}

