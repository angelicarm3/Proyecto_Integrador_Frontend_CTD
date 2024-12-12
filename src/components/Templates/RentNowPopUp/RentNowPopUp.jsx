import { useTranslation } from 'react-i18next'
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect, useState } from 'react'
import { resetForm } from '../../../context/slices/formSlice'
import RentNowDetails from '../../Organisms/RentNowDetails/RentNowDetails'
import RentNowForm from '../../Organisms/RentNowForm/RentNowForm'

const RentNowPopUp = ({ onClose }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [formNumber, setFormNumber] = useState(1)
  const { error, success } = useSelector((state) => state.form)

  const handleClose = () => {
    dispatch(resetForm())
    onClose()
  }

  useEffect(() => {
    if (error) {
      setFormNumber(1)
    } else if (success) {
      onClose()
    }
  }, [error, success])

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-popUpBg1 z-10'>
      <div className='w-11/12 md:w-[695px] h-fit flex flex-col justify-center items-center bg-gray2 rounded-lg p-6 relative mx-auto border border-gray1 pt-10'>
        <AiOutlineClose className='clickable close-btn absolute top-4 right-4' size={30} onClick={() => handleClose()} />
        {
          formNumber === 1
            ? <>
              <p className='text-white text-xl font-Urbanist mb-2'>{t('defineYourBookinDetails')}</p>
            </>
            : <p className='text-white text-xl font-Urbanist mb-2'>{t('confirmYourBookinDetails')}</p>
        }
        <div className='w-full flex justify-center text-yellow1 font-bold relative mb-3'>
          {
            formNumber !== 1 &&
              <AiOutlineArrowLeft size={20} className='cursor-pointer absolute left-0' onClick={() => setFormNumber(formNumber - 1)} />
          }
          <p className=''>{t('step')} {formNumber}</p>
        </div>

        {
          formNumber === 1 &&
            <RentNowForm onClose={handleClose} formNumber={formNumber} setFormNumber={setFormNumber} />
        }
        {
          formNumber === 2 &&
            <RentNowDetails onClose={handleClose} />
        }
      </div>
    </div>
  )
}

export default RentNowPopUp
