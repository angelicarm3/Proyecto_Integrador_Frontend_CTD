import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { FaRegStar, FaStar } from 'react-icons/fa'
import Rating from 'react-rating'
import { resetForm, submitFormThunk, updateField } from '../../../context/slices/formSlice'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'

const ReviewForm = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = localStorage.getItem('token')
  const { reviewData, success } = useSelector((state) => state.form)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const maxDescriptionCharacters = 200

  const { handleSubmit, formState: { errors }, clearErrors, setValue } = useForm({ mode: 'onBlur', defaultValues: reviewData })

  useEffect(() => {
    dispatch(resetForm())
  }, [])

  useEffect(() => {
    Object.keys(reviewData).forEach((key) => {
      setValue(key, reviewData[key])
    })
  }, [reviewData, setValue])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    clearErrors(id)
    dispatch(updateField({ field: id, value, form: 'createReview' }))
  }

  const handleCancelClick = () => {
    dispatch(resetForm())
    onClose()
  }

  const ratingChanged = (rate) => {
    dispatch(updateField({ field: 'puntuacion', value: rate, form: 'createReview' }))
  }

  const onSubmit = () => {
    const formData = { usuarioId: loggedUser.id, autoId: selectedProduct.id, puntuacion: reviewData.puntuacion, comentario: reviewData.comentario }

    dispatch(submitFormThunk({ formData, formURL: 'reviews/register', token }))
  }

  useEffect(() => {
    if (success) {
      onSuccess()
      dispatch(resetForm())
      onClose()
    }
  }, [success])

  return (
    <form className='w-full h-full flex flex-col justify-center items-center font-Urbanist' onSubmit={handleSubmit(onSubmit)}>
      <div className='field-container w-full'>
        <label htmlFor='comentario' className='label'>
          {t('rateYourExperience')}
        </label>
        <Rating
          className='clickable'
          placeholderRating={reviewData.puntuacion}
          onChange={rate => ratingChanged(rate)}
          emptySymbol={<FaRegStar href='#icon-star-empty' className='text-gray3 text-3xl' />}
          fullSymbol={<FaStar href='#icon-star-full' className='text-yellow1 text-3xl' />}
          placeholderSymbol={<FaStar href='#icon-star-full' className='text-yellow1 text-3xl' />}
        />
      </div>

      <div className='field-container w-full'>
        <label htmlFor='comentario' className='label'>
          {t('labelComment')}
        </label>
        <textarea
          id='comentario'
          maxLength={maxDescriptionCharacters}
          value={reviewData.comentario}
          className={`input text-black1 description-input ${errors.descripcion && 'border-red1'}`}
          placeholder={t('leaveYourComment')}
          onChange={(e) => {
            handleInputChange(e)
            e.target.dispatchEvent(new Event('input', { bubbles: true }))
          }}
        />
        <div className='input-counter'>
          {maxDescriptionCharacters - (reviewData.comentario?.length || 0)} {t('remainingCharacters')}
        </div>
      </div>
      <div className='flex gap-6 mt-4'>
        <SaveBtn />
        <CancelBtn handleClick={handleCancelClick} />
      </div>
    </form>
  )
}

export default ReviewForm
