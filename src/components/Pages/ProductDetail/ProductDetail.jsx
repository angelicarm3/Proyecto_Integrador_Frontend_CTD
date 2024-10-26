import { useParams } from 'react-router-dom'

import './productDetail.css'
import { productsData } from '../../../data/products'
import ProductDetailCard from '../../Templates/ProductDetailCard/ProductDetailCard'

const ProductDetail = () => {
  const { id } = useParams()
  const product = productsData.products.filter((product) => product.id === parseInt(id))

  return (
    <section className='main-section products-detail-container'>
      <ProductDetailCard product={product[0]} />
    </section>
  )
}

export default ProductDetail
