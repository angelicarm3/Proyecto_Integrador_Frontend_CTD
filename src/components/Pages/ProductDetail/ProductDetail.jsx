import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getBookinsByProductId, sendConfirmationEmailThunk } from '../../../context/slices/bookinsSlice'
import { arrangeImagesGrid, fetchAllProductsThunk, fetchProductByIdThunk } from '../../../context/slices/productSlice'
import ProductDetailCard from '../../Templates/ProductDetailCard/ProductDetailCard'
import RegistrationConfirmPopUp from '../../Templates/RegistrationConfirmPopUp/RegistrationConfirmPopUp'
import RentNowPopUp from '../../Templates/RentNowPopUp/RentNowPopUp'
import RequireLoginPopup from '../../Templates/RequireLoginPopup/RequireLoginPopup'
import './productDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [successReview, setSuccessReview] = useState(false)
  const [showRentPopUp, setShowRentPopUp] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [reload, setReload] = useState(false)

  const [showRequireLoginPopup, setShowRequireLoginPopup] = useState(false)
  const { bookinData, success, totalDays, totalPrice } = useSelector((state) => state.form)
  const selectedProduct = useSelector((state) => state.product.selectedProduct)
  const {emailConfig} = useSelector((state) => state.bookins)
  const { loggedUser } = useSelector((state) => state.loginRegister)

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
      const newData = { ...emailConfig, toUser: [loggedUser.email], name: loggedUser.nombre, details: { modelo: selectedProduct.marca + ' ' + selectedProduct.modelo, matricula: selectedProduct.matricula, salida: [bookinData.fechaInicio, bookinData.lugarRecogida], retorno: [bookinData.fechaFin, bookinData.lugarEntrega], dias: totalDays, precio: totalPrice } }
      dispatch(sendConfirmationEmailThunk(newData))
    }
  }, [success])

  return (
    <section className='main-page products-detail-container'>
      {
      selectedProduct &&
        <ProductDetailCard onSuccess={() => setSuccessReview(!successReview)} setShowRequireLoginPopup={setShowRequireLoginPopup} onRentClick={handleRentClick} reload={reload} />
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
          <RegistrationConfirmPopUp type='rent' setIsOpen={setIsOpen} setReload={() => setReload(!reload)} />
      }
    </section>
  )
}

export default ProductDetail
