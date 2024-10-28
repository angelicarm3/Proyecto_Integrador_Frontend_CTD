import { useState } from 'react'

import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'

import './header.css'
import isoTipoGold from '../../../assets/brand/isoTipoGold.svg'
import sloganGold from '../../../assets/brand/sloganGold.png'
import logoGold from '../../../assets/brand/logoGold.png'
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
    <header className='headerStyles z-40'>
      <AiOutlineMenu size={30} className='text-yellow1 cursor-pointer md:hidden hover:opacity-75' />
      <Link to='/' className='w-full md:w-fit flex justify-center items-center self-center md:self-start'>
        <img src={isoTipoGold} alt='logo' className='min-w-[70-px] h-12 mr-5' />
        <div className='flex flex-col justify-center items-center gap-2'>
          <img src={logoGold} alt='logo' className='h-5 object-cover' />
          <img src={sloganGold} alt='logo' className='h-3 object-cover' />
        </div>
      </Link>
      {/* <Navbar /> */}
      <div className='hidden md:flex gap-2.5 w-fit'>
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
