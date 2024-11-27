import React from 'react'
import './registrationConfirmModal.css'
import isoWhite from '../../../assets/brand/isoWhite.svg'
import { useDispatch, useSelector } from 'react-redux'
import { sendConfirmationEmailThunk } from '../../../context/slices/loginRegisterSlice'
import { useNavigate } from 'react-router-dom'

function RegistrationConfirmModal ({ setIsOpen, newData }) {
  const { userData } = useSelector((state) => state.form)
  const { emailConfig } = useSelector((state) => state.loginRegister)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    setIsOpen(false)
    navigate('/')
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
          <img src={isoWhite} alt='isoWhite' />
          <p>
            Tu inscripción se ha realizado con éxito.<br />
            En breve te enviaremos un
            <br />
            correo de confirmación.
          </p>
        </div>
        <div className='registration-modal-content-button'>
          <span>¿No has recibido ningún correo?</span>
          <button type='button' className='secondary-btn' onClick={() => resendEmail()}>Reenviar</button>
        </div>
      </div>
    </div>
  )
}

export default RegistrationConfirmModal
