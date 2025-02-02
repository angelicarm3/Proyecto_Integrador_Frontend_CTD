import { useTranslation } from 'react-i18next'
import { AiOutlineClose } from 'react-icons/ai'

import isoGold from '../../../assets/brand/isoGold.png'
import LogInBtn from '../../Atoms/LoginBtn/LoginBtn'
import SignUpBtn from '../../Atoms/SignUpBtn/SignUpBtn'

const RequireLoginPopup = ({ onClose }) => {
  const { t } = useTranslation()

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-popUpBg1 z-10'>
      <div className='w-11/12 md:w-[500px] flex flex-col justify-center items-center bg-gray2 rounded-lg p-6 relative mx-auto overflow-auto border border-gray1 gap-4'>
        <AiOutlineClose
          onClick={onClose}
          className='clickable absolute top-4 md:top-5 right-6 text-white hover:text-gray3 z-20 text-xl font-bold cursor-pointer'
        />
        <img src={isoGold} alt='Logo de la marca' className='w-[120px]' />
        <div className='text-white text-center'>
          <p>{t('youNeedToLogInToCompleteThisAction')}</p>
          <p>{t('ifYouDoNotHaveAnAccountSignUp')}</p>
        </div>
        <div className='w-full flex justify-center gap-4'>
          <LogInBtn />
          <SignUpBtn />
        </div>
      </div>
    </div>
  )
}

export default RequireLoginPopup
