import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './productDetail.css'
import { getAllProducts, getProductById } from '../../../context/slices/productSlice'
import ProductDetailCard from '../../Templates/ProductDetailCard/ProductDetailCard'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getProductById(id))
  }, [dispatch, id])

  return (
    <section className='main-section products-detail-container my-auto'>
      <ProductDetailCard />
    </section>
  )
}

export default ProductDetail
