import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineMenu } from 'react-icons/ai'


import './header.css'
import isoTipoGold from '../../../assets/brand/isoTipoGold.svg'
import { fetchUserByUserNameThunk } from '../../../context/slices/loginRegisterSlice'
import sloganGold from '../../../assets/brand/sloganGold.png'
import logoGold from '../../../assets/brand/logoGold.png'
import LogInBtn from '../../Atoms/LoginBtn/LoginBtn'
import { resetState } from '../../../context/slices/loginRegisterSlice'
import SignUpBtn from '../../Atoms/SignUpBtn/SignUpBtn'
import Navbar from '../../Molecules/Navbar/Navbar'

function Header () {
  const dispatch = useDispatch()

  const { isAdmin, loggedUser, error, userName, isLoggedIn} = useSelector((state) => state.loginRegister)
  const token = localStorage.getItem('token')

  const [isOn, setIsOn] = useState(false)
  const toggleDropdown = () => {
    setIsOn(!isOn);
  };

  const handleLogout = () => {
    console.log('Cerrar sesión')
    dispatch(resetState())
    localStorage.removeItem('token')
  };

  useEffect(() => {
    if (userName && token) {
      dispatch(fetchUserByUserNameThunk({ userName, token }))
    }
    if (error?.includes('JWT es invalido')) {
      localStorage.clear()
    }
  }, [userName, error, token, dispatch])

  return (
    <header className='header'>
      <AiOutlineMenu size={30} className='hamburguer-icon' />
      <Link to='/' className='logo-container'>
        <img src={isoTipoGold} alt='isotipo' className='isotipo' />
        <div className='logo-slogan-container'>
          <img src={logoGold} alt='logo' className='logo' />
          <img src={sloganGold} alt='slogan' className='slogan' />
        </div>
      </Link>
      {/* <Navbar /> */}
      {isLoggedIn ? 
      <div className='flex'>
        <h3 className='my-user-name'>{loggedUser.nombre + " " +loggedUser.apellido}</h3>
        <div onClick={toggleDropdown} className='my-avatar-icon'>
            {loggedUser.nombre.charAt(0) + loggedUser.apellido.charAt(0)}
        </div>
        {isOn && (
        <div className="dropdown-menu">
          <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        </div>
        )}
      </div>
      :
      <div className='buttons-container'>
        <LogInBtn />
        <SignUpBtn />
      </div>
      }
    </header>
  )
}

export default Header
