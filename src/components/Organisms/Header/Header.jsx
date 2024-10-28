import isoGold from '../../../assets/brand/isoGold.svg'
import LogInBtn from '../../Atoms/LoginBtn/LoginBtn'
import SignUpBtn from '../../Atoms/SignUpBtn/SignUpBtn'
import Navbar from '../../Molecules/Navbar/Navbar'
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './header.css'


function Header () {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <header className='headerStyles'>
      <Link to='/'>
        <img src={isoGold} alt='logo' class="h-12 mr-5"/>
      </Link>
      {/*<Navbar />*/}
      <div class="flex gap-2.5 w-fit hidden sm:flex space-x-4">
        <LogInBtn />
        <SignUpBtn />
      </div>
      <button onClick={toggleMenu} className="text-white sm:hidden focus:outline-none text-[rgb(212 175 55)]-50">
          ☰
      </button>
    </header>
  )
}

export default Header
