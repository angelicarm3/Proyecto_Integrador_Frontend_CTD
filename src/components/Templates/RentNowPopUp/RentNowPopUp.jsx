/* eslint-disable react/prop-types */
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'

import './rentNowPopUp.css'
import { productsData } from '../../../data/products'

const RentNowPopUp = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className='pop-up-bg'>
      <AiOutlineClose className='close-btn' size={30} onClick={() => navigate(-1)} />
    </div>
  )
}

export default RentNowPopUp
