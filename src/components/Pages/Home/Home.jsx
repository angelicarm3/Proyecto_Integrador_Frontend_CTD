import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { fetchAllProductsThunk, getRecommendedProducts } from '../../../context/slices/productSlice'
import Banner from '../../Organisms/Banner/Banner'
import Categories from '../../Organisms/Categories/Categories'
import CategoriesMobile from '../../Organisms/Categories/CategoriesMobile'
import ProductsGrid from '../../Templates/ProductsGrid/ProductsGrid'
import SearchBar from '../../Organisms/SearchBar/SearchBar'
import RecommendationsGrid from '../../Templates/RecommendationsGrid/RecommendationsGrid'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      await dispatch(fetchAllProductsThunk())
      dispatch(getRecommendedProducts())
    }

    fetchData()
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
