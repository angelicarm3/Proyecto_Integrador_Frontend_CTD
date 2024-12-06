import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import isoWhite from '../../../assets/brand/isoWhite.png'
import { sendConfirmationEmailThunk } from '../../../context/slices/loginRegisterSlice'
import './registrationConfirmPopUp.css'
import { resetForm } from '../../../context/slices/formSlice'

function RegistrationConfirmPopUp ({ setIsOpen, type }) {
  const location = useLocation()
  const { userData } = useSelector((state) => state.form)
  const { emailConfig } = useSelector((state) => state.loginRegister)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    if (location.pathname.includes('/producto/')) {
      dispatch(resetForm())
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
        <div className='secondary-btn registration-modal-close cursor-pointer' onClick={() => handleClose()}>
          ✖
        </div>
        <div className='registration-modal-content-info'>
          <div className='w-[120px] h-[100px] bg-yellow1 absolute bottom-[100px]'>
            <img src={isoWhite} alt='isoWhite' />
          </div>
          {
            type === 'rent'
              ? <p>
                Tu reserva se ha realizado con éxito.<br />
                En breve te enviaremos un
                <br />
                correo de confirmación.
              </p>
              : <p>
                Tu inscripción se ha realizado con éxito.<br />
                En breve te enviaremos un
                <br />
                correo de confirmación.
              </p>
          }
        </div>
        {
          type !== 'rent' &&
            <div className='registration-modal-content-button'>
              <span>¿No has recibido ningún correo?</span>
              <button type='button' className='secondary-btn' onClick={() => resendEmail()}>Reenviar</button>
            </div>
        }
      </div>
    </div>
  )
}

export default RegistrationConfirmPopUp
