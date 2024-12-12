import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const LogInRegisterFormBtn = () => {
  const { t } = useTranslation()
  const { loginOrRegister } = useSelector((state) => state.loginRegister)

  return (
    <button type='submit' className='primary-btn w-full h-[44px] text-[18px] text-black1 font-bold rounded-[36px] my-4 cursor-pointer'>
      {
          loginOrRegister === 'login'
            ? `${t('logIn')}`
            : `${t('signUp')}`
        }
    </button>
  )
}

export default LogInRegisterFormBtn
