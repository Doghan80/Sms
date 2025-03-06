import {FaMoon,FaSun} from "react-icons/fa";
import{HiOutlineMenuAlt2} from "react-icons/hi";
import React from 'react'
interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar:()=>void;
  sidebarOpen: boolean; 
}

function Header({darkMode ,toggleDarkMode,toggleSidebar,sidebarOpen}:HeaderProps) {
  
  return (
    <nav className={`fixed top-0 z-50 w-full bg-white dark:bg-hover border-secondary dark:border-gray-700 shadow-lg  ${sidebarOpen ? 'ml-0' : '  ml-0'}  `}>
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end ">
            <button onClick={toggleSidebar} className={`inline-flex p-2 text-sm text-gray-500 rounded-lg  hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary  dark:text-secondary dark:hover:bg-hover dark:focus:ring-secondary  ${!sidebarOpen ? 'bg-blue-200' : ''} `}>
              <HiOutlineMenuAlt2 className="text-2xl"/>
            </button>
          </div>  
          <button className={`dark:bg-secondary w-8 h-8 rounded-full text-center flex items-center justify-center bg-primary text-secondary hover:bg-hover dark:text-primary rounded full ${!sidebarOpen ? 'mr-0' : ''}`} onClick={toggleDarkMode}>{darkMode?<FaSun/>:<FaMoon/>}</button>
        </div>
      </div>
    </nav>
  )
}

export default Header