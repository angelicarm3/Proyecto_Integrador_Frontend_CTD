import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { fetchAllCategoriesThunk } from '../../../context/slices/categorySlice'
import { resetPagination } from '../../../context/slices/paginatorSlice'
import { fetchAllProductsThunk, getRecommendedProducts } from '../../../context/slices/productSlice'
import Banner from '../../Organisms/Banner/Banner'
import Categories from '../../Organisms/Categories/Categories'
import SearchBar from '../../Organisms/SearchBar/SearchBar'
import ProductsGrid from '../../Templates/ProductsGrid/ProductsGrid'
import RecommendationsGrid from '../../Templates/RecommendationsGrid/RecommendationsGrid'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      await dispatch(resetPagination())
      await dispatch(fetchAllCategoriesThunk())
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
      <ProductsGrid />
      <RecommendationsGrid />
    </div>
  )
}

export default Home
