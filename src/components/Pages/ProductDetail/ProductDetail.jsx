import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getBookinsByProductId } from '../../../context/slices/bookinsSlice'
import { arrangeImagesGrid, fetchAllProductsThunk, fetchProductByIdThunk } from '../../../context/slices/productSlice'
import ProductDetailCard from '../../Templates/ProductDetailCard/ProductDetailCard'
import RentNowPopUp from '../../Templates/RentNowPopUp/RentNowPopUp'
import RequireLoginPopup from '../../Templates/RequireLoginPopup/RequireLoginPopup'
import './productDetail.css'
import RegistrationConfirmPopUp from '../../Templates/RegistrationConfirmPopUp/RegistrationConfirmPopUp'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [successReview, setSuccessReview] = useState(false)
  const [showRentPopUp, setShowRentPopUp] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [showRequireLoginPopup, setShowRequireLoginPopup] = useState(false)
  const { success } = useSelector((state) => state.form)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      await dispatch(fetchAllProductsThunk())
      await dispatch(fetchProductByIdThunk(id))
      dispatch(arrangeImagesGrid())
    }

    fetchData()
  }, [dispatch, id, successReview])

  useEffect(() => {
    if (selectedProduct) {
      dispatch(getBookinsByProductId(selectedProduct.id))
    }
  }, [selectedProduct])

  useEffect(() => {
    if (successReview) {
      setSuccessReview(false)
    }
  }, [successReview])

  const handleRentClick = () => {
    if (token) {
      setShowRentPopUp(true)
    } else {
      setShowRequireLoginPopup(true)
    }
  }

  useEffect(() => {
    if (success) {
      setIsOpen(true)
    }
  }, [success])

  return (
    <section className='main-page products-detail-container'>
      {
      selectedProduct &&
        <ProductDetailCard onSuccess={() => setSuccessReview(!successReview)} setShowRequireLoginPopup={setShowRequireLoginPopup} onRentClick={handleRentClick} />
      }
      {
      showRentPopUp &&
        <RentNowPopUp onClose={() => setShowRentPopUp(false)} />
      }
      {
        showRequireLoginPopup &&
          <RequireLoginPopup onClose={() => setShowRequireLoginPopup(false)} />
      }
      {
        success &&
          <RegistrationConfirmPopUp type='rent' setIsOpen={setIsOpen} />
      }
    </section>
  )
}

export default ProductDetail
