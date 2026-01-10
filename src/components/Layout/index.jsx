import React from 'react'
import {Navbar} from '../Navbar'


const Layout = ({ children, idPage }) => {
  return (
    <>
        <div className="bg-background text-text-light dark:text-text-dark min-h-screen flex flex-col font-body transition-colors duration-300">
            <Navbar />
            <main id={idPage}>{children}</main>
        </div>
    </>
  )
}

export default Layout
