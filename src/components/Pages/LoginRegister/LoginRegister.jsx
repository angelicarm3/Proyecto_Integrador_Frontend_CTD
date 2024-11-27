import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { setLoginOrRegister } from '../../../context/slices/loginRegisterSlice'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import LoginRegisterGrid from '../../Templates/LoginRegisterGrid/LoginRegisterGrid'

const LoginRegister = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.form)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setLoginOrRegister(location.pathname))
  }, [dispatch, location])

  return (
    <div className='main-page justify-center my-auto mt-[68px] relative bg-gray2'>
      <LoginRegisterGrid />
      {
          loading &&
            <LoaderComponent />
        }
    </div>
  )
}

export default LoginRegister
