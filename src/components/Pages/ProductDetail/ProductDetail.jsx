import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { arrangeImagesGrid, fetchAllProductsThunk, fetchProductByIdThunk } from '../../../context/slices/productSlice'
import ProductDetailCard from '../../Templates/ProductDetailCard/ProductDetailCard'
import './productDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [successReview, setSuccessReview] = useState(false)
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
    if (successReview) {
      setSuccessReview(false)
    }
  }, [successReview])

  return (
    <section className='main-page products-detail-container'>
      {
      selectedProduct &&
        <ProductDetailCard onSuccess={() => setSuccessReview(!successReview)} />
    }
    </section>
  )
}

export default ProductDetail
