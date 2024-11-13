import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { setLoginOrRegister } from '../../../context/slices/loginRegisterSlice'
import LoginRegisterGrid from '../../Templates/LoginRegisterGrid/LoginRegisterGrid'

const LoginRegister = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setLoginOrRegister(location.pathname))
  }, [dispatch, location])

  return (
    <div className='main-page justify-center my-auto mt-[68px] bg-gray2'>
      <LoginRegisterGrid />
    </div>
  )
}

export default LoginRegister
