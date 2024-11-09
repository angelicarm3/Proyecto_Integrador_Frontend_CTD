import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './productDetail.css'
import { arrangeImagesGrid, fetchAllProductsThunk, fetchProductByIdThunk } from '../../../context/slices/productSlice'
import ProductDetailCard from '../../Templates/ProductDetailCard/ProductDetailCard'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const selectedProduct = useSelector((state) => state.product.selectedProduct)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      await dispatch(fetchAllProductsThunk())
      await dispatch(fetchProductByIdThunk(id))
      dispatch(arrangeImagesGrid())
    }

    fetchData()
  }, [dispatch, id])

  return (
    <section className='main-page products-detail-container'>
      {
      selectedProduct &&
        <ProductDetailCard />
    }
    </section>
  )
}

export default ProductDetail
