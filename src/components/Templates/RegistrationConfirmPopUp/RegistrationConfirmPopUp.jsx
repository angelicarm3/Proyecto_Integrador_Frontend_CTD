import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import isoWhite from '../../../assets/brand/isoWhite.png'
import { resetForm } from '../../../context/slices/formSlice'
import { sendConfirmationEmailThunk } from '../../../context/slices/loginRegisterSlice'
import './registrationConfirmPopUp.css'

function RegistrationConfirmPopUp ({ setIsOpen, type }) {
  const location = useLocation()
  const { t } = useTranslation()
  const { userData } = useSelector((state) => state.form)
  const { emailConfig } = useSelector((state) => state.loginRegister)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    if (location.pathname.includes('/producto/')) {
      dispatch(resetForm())
      window.location.reload()
    } else {
      setIsOpen(false)
      navigate('/')
    }
  }

  const resendEmail = () => {
    dispatch(sendConfirmationEmailThunk({ ...emailConfig, toUser: [userData.email], name: userData.nombre }))
    navigate('/')
  }

  return (
    <div className='registration-modal-overlay'>
      <div
        className='registration-modal-content'
      >
        <div className='clickable secondary-btn registration-modal-close cursor-pointer' onClick={() => handleClose()}>
          ✖
        </div>
        <div className='registration-modal-content-info'>
          <div className='w-[100px] lg:w-[120px] h-4 bg-yellow1 absolute top-[-10px]' />
          <img src={isoWhite} alt='isoWhite' className='w-[100px] lg:w-[120px] absolute top-[-40px] lg:top-[-55px]' />
          {
            type === 'rent'
              ? <div className='flex flex-col gap-y-2 m-4 pt-8 md:m-8 md:pt-16'>
                <p>{t('bookinCreatedSuccessfully')}</p>
                <p>{t('weWillShortlySendAConfirmationEmail')}</p>
              </div>
              : <div className='flex flex-col mx-8 gap-y-2 pt-16 pb-8'>
                <p>{t('accountCreatedSuccessfully')}</p>
                <p>{t('weWillShortlySendAConfirmationEmail')}</p>
              </div>
          }
        </div>
        {
          type !== 'rent' &&
            <div className='registration-modal-content-button'>
              <span>{t('haveYouNotReceivedAnEmail')}</span>
              <button type='button' className='secondary-btn' onClick={() => resendEmail()}>{t('resend')}</button>
            </div>
        }
      </div>
    </div>
  )
}

export default RegistrationConfirmPopUp
