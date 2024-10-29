import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { getAllProducts, getRecommendedProducts } from '../../../context/slices/productSlice'
import Banner from '../../Organisms/Banner/Banner'
import Categories from '../../Organisms/Categories/Categories'
import CategoriesMobile from '../../Organisms/Categories/CategoriesMobile'
import ProductsGrid from '../../Templates/ProductsGrid/ProductsGrid'
import SearchBar from '../../Organisms/SearchBar/SearchBar'
import RecommendationsGrid from '../../Templates/RecommendationsGrid/RecommendationsGrid'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getRecommendedProducts())
  }, [dispatch])

  return (
    <div className='main-page'>
      <Banner />
      <SearchBar />
      <Categories />
      <CategoriesMobile />
      <ProductsGrid />
      <RecommendationsGrid />
    </div>
  )
}

export default Home
