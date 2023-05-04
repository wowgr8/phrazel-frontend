import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SocketContext } from "../utils/Socket";
import ProfilePage from './ProfilePage';

function Header({ setInRoom, setShowHeader }) {
  const socket = useContext(SocketContext);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const disconnectRoom = () => {
    socket.disconnect();
    setInRoom(false);
    setShowHeader(false)
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
            {/* <img src="" className="h-8 mr-3" alt="Phrazel Logo" /> */}
            <span  id="logo-nav-font" className="self-center text-4xl whitespace-nowrap text-sky-400/75 ">PHRAZ_L</span>
        </div>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900 bg-gray-800 border-gray-700">
            <li>
              {/* <!-- Modal Toggle --> */}
              <button onClick={openProfileModal} className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 hover:text-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">
                Profile
              </button>
            </li>
            <li>
              <button onClick={disconnectRoom} className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">
                Logout
              </button>
            </li>
          </ul>
        </div>        
      </div>

      {/* <!-- Modal content --> */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-30" onClick={closeProfileModal}></div>
          {/* <!-- Modal body --> */}
          <div className="relative z-50 bg-gray-600 rounded-lg px-60 py-44 border-2 border-cyan-600">
            <div className="absolute top-0 right-0">
              <button onClick={closeProfileModal} className="text-gray-200 hover:text-gray-700">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ProfilePage />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header