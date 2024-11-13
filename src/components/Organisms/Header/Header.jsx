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
import SignUpBtn from '../../Atoms/SignUpBtn/SignUpBtn'
import Navbar from '../../Molecules/Navbar/Navbar'

function Header () {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const { isAdmin, loggedUser, userName, token } = useSelector((state) => state.loginRegister)

  useEffect(() => {
    if (userName && token) {
      dispatch(fetchUserByUserNameThunk({ userName, token }))
    }
  }, [userName, token, dispatch])

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
      <div className='buttons-container'>
        <LogInBtn />
        <SignUpBtn />
      </div>
    </header>
  )
}

export default Header
