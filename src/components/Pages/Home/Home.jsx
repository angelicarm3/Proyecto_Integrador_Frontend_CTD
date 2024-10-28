import Banner from '../../Organisms/Banner/Banner'
import Categories from '../../Organisms/Categories/Categories'
import CategoriesMobile from '../../Organisms/Categories/CategoriesMobile'
import ProductsGrid from '../../Templates/ProductsGrid/ProductsGrid'
import SearchBar from '../../Organisms/SearchBar/SearchBar'
import RecommendationsGrid from '../../Templates/RecommendationsGrid/RecommendationsGrid'

const Home = () => {
  return (
    <>
      <Banner />
      <SearchBar />
      <Categories />
      <CategoriesMobile />
      <ProductsGrid />
      <RecommendationsGrid />
    </>
  )
}

export default Home
