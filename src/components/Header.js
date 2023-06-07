import React, { useContext, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { SocketContext } from "../utils/Socket";
import ProfilePage from './ProfilePage';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

function Header({ setInRoom, setShowHeader, userName, gamesWon }) {
  const socket = useContext(SocketContext);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [nav, setNav] = useState(false);

  const disconnectRoom = () => {
    socket.disconnect();
    setInRoom(false);
    setShowHeader(false)
    socket.off()
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleNav = () => {
    setNav(!nav)
  };

  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="flex items-center justify-between mx-auto p-4">
        <div className="flex items-center">
            {/* <img src="" className="h-8 mr-3" alt="Phrazel Logo" /> */}
            <span  id="logo-nav-font" className="self-center text-4xl whitespace-nowrap text-sky-400/75 ">PHRAZ_L</span>
        </div>

        <ul className="hidden md:flex font-medium  flex-row p-0 md:space-x-8">
          <li>
            {/* <!-- Modal Toggle --> */}
            <button onClick={openProfileModal} className="block py-2 pl-3 pr-4 rounded text-white hover:text-cyan-500 md:border-0 md:p-0">
              Profile
            </button>
          </li>
          <li>
            <button onClick={disconnectRoom} className="block py-2 pl-3 pr-4 rounded  text-white  hover:text-cyan-500 md:border-0 md:p-0">
              Logout
            </button>
          </li>
        </ul>
          
        <div onClick={handleNav} className='text-cyan-400 block md:hidden'>
          {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* mobile menu */}
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%]'}>
          <div className="flex items-center m-5">
            <span  id="logo-nav-font" className="self-center text-4xl whitespace-nowrap text-sky-400/75 ">PHRAZ_L</span>
          </div>
            <ul className="font-medium p-0 md:space-x-8 pt-20 uppercase text-4xl">
              <li className='border-b border-cyan-600'>
                {/* <!-- Modal Toggle --> */}
                <button onClick={openProfileModal} className="block py-2 pl-3 pr-4 mb-8 rounded text-white hover:text-cyan-500 md:border-0 md:p-0">
                  Profile
                </button>
              </li>
              <li className='border-b border-cyan-600'>
                <button onClick={disconnectRoom} className="block py-2 pl-3 pr-4 mb-8 mt-3 rounded text-white hover:text-cyan-500 md:border-0 md:p-0">
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
          <div className="relative z-50 bg-gray-600 rounded-lg px-60 py-44 border-2 border-cyan-600 hover:shadow-xl hover:shadow-cyan-500/50">
            <div className="absolute top-0 right-0">
              <button onClick={closeProfileModal} className="text-gray-200 hover:text-gray-700">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ProfilePage userName={userName} gamesWon={gamesWon} />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header