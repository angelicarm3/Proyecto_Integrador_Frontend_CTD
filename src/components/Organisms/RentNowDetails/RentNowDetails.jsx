import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { setIsAgreeTerms, submitFormThunk } from '../../../context/slices/formSlice'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import CheckboxButton from '../../Atoms/CheckboxButton/CheckboxButton'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import ProductFeatures from '../../Molecules/ProductFeatures/ProductFeatures'

const RentNowDetails = ({ onClose }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [agreedTerms, setAgreedTerms] = useState(true)
  const { bookinData, agreeTerms, loading } = useSelector((state) => state.form)
  const { selectedProduct, mainImg } = useSelector((state) => state.product)
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const { totalDays } = useSelector((state) => state.form)

  const checkClick = () => {
    dispatch(setIsAgreeTerms())
    if (!agreedTerms) {
      setAgreedTerms(!agreedTerms)
    }
  }

  const handleConfirmClick = () => {
    if (agreeTerms) {
      dispatch(submitFormThunk({ formData: bookinData, formURL: 'reservations/create', token }))
    } else {
      setAgreedTerms(!agreedTerms)
    }
  }

  return (
    <div className='w-full h-fit flex flex-col justify-center items-center gap-4'>
      <div className='w-full flex justify-center gap-5'>
        <div className='min-w-[360px] flex flex-col'>
          <p className='title text-xl text-left'>Vehículo</p>
          <div className='w-full flex justify-center gap-4'>
            <img src={mainImg[0]?.url} alt='' className='min-w-[100px] h-[110px] object-cover rounded-lg' />
            <div className='w-full flex flex-col text-gray6 text-lg gap-2'>
              <p>{selectedProduct.marca} {selectedProduct.modelo}</p>
              <ProductFeatures product={selectedProduct} type='detail' />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col text-gray6 text-lg gap-2'>
          <p className='title text-xl text-left'>Usuario</p>
          <p>{loggedUser.nombre} {loggedUser.apellido}</p>
          <p>{loggedUser.email}</p>
        </div>
      </div>
      <div className='w-full flex flex-col text-gray6 text-lg gap-2'>
        <p className='title text-xl'>Reserva</p>
        <div className='w-full flex justify-center gap-12'>
          <div className='w-fit'>
            <p className='font-semibold'>Recogida</p>
            <p>{bookinData.fechaInicio}</p>
            <p>{bookinData.lugarRecogida}</p>
          </div>
          <div className='w-fit'>
            <p className='font-semibold'>Retorno</p>
            <p>{bookinData.fechaFin}</p>
            <p>{bookinData.lugarEntrega}</p>
          </div>
          <div className='w-fit'>
            <p className='font-semibold'>${bookinData.precioFinal}</p>
            <p>{totalDays} días</p>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center h-6 relative mt-4'>
        <input
          id='rememberMe'
          type='checkbox'
          name='rememberMe'
        />
        <div className='w-full flex justify-center items-center absolute text-sm text-gray6 font-normal bg-gray2 py-2 gap-4 top-[-10px] cursor-pointer' onClick={() => checkClick()}>
          <CheckboxButton />
          <label htmlFor='rememberMe' className='cursor-pointer'>
            Confirmo que he leído y acepto los <Link to='/politicas-uso' target='_blank' rel='noopener noreferrer' className='text-yellow1 underline'>Términos de uso</Link>
          </label>
          {
            !agreedTerms &&
              <FormErrorMessage error='terms' message='Es necesario que accepte los términos de uso' />
          }
        </div>
      </div>

      <div className='flex gap-6 mt-4'>
        <button className='primary-btn px-4 rounded-full text-black1' type='button' onClick={handleConfirmClick}>
          <p>Confirmar</p>
        </button>
        <CancelBtn handleClick={onClose} />
      </div>

      {
        loading &&
          <LoaderComponent />
      }
    </div>
  )
}

export default RentNowDetails
