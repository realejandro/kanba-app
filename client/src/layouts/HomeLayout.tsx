import React from 'react'
import Navbar from '../components/Navbar'

export const HomeLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <>
        <Navbar />
        { children }
    </>
  )
}
