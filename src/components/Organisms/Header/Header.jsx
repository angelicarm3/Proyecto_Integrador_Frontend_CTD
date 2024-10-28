import isoGold from '../../../assets/brand/isoGold.svg'
import LogInBtn from '../../Atoms/LoginBtn/LoginBtn'
import SignUpBtn from '../../Atoms/SignUpBtn/SignUpBtn'
import Navbar from '../../Molecules/Navbar/Navbar'
import { Link } from 'react-router-dom'
import './header.css'


function Header () {
  return (
    <header className='headerStyles'>
      <Link to='/'>
        <img src={isoGold} alt='logo' class="h-12 mr-5"/>
      </Link>
      <Navbar />
      <div class="flex gap-2.5 w-fit">
        <LogInBtn />
        <SignUpBtn />
      </div>
    </header>
  )
}

export default Header
