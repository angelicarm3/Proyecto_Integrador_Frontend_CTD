import { useDispatch, useSelector } from 'react-redux'

import { pageLabels } from '../../../data/pageLabels'
import { setLoginOrRegister, changeFormNumber } from '../../../context/slices/loginRegisterSlice'
import { resetForm } from '../../../context/slices/formSlice'

// eslint-disable-next-line react/prop-types
const LoginRegisterSwitch = () => {
  const dispatch = useDispatch()
  const { loginOrRegister } = useSelector((state) => state.loginRegister)
  const { formNumber } = useSelector((state) => state.loginRegister)

  const handleClick = (option) => {
    dispatch(setLoginOrRegister(option))
    dispatch(resetForm())
    dispatch(changeFormNumber(1))
  }

  return (
    <section className='flex w-full h-[60px] bg-black1 justify-center items-center rounded-[33px] mt-2 p-2'>
      <div className={`flex w-full h-[44px] justify-center items-center text-[18px] font-bold rounded-[36px] cursor-pointer ${loginOrRegister === 'login' ? 'bg-yellow1 text-black1' : 'bg-transparent text-white'}`} onClick={() => handleClick('/inicio-sesion')}>
        {pageLabels.buttons.logIn}
      </div>

      <div className={`flex w-full h-[44px] justify-center items-center text-[18px] font-bold rounded-[36px] cursor-pointer ${loginOrRegister === 'register' ? 'bg-yellow1 text-black1' : 'bg-transparent text-white'}`} onClick={() => handleClick('/registro')}>
        {pageLabels.buttons.signUp}
      </div>
    </section>
  )
}

export default LoginRegisterSwitch
