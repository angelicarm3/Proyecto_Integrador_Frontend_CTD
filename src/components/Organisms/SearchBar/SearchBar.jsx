import './searchBar.css'
import { pageData } from '../../../data/page'
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'

const SearchBar = () => {
  return (
    <section className='main-section search-bar-container'>
      <p className='search-bar-title'>{pageData.searchBar.title}</p>
      <input className='search-bar-input' type='text' placeholder={pageData.searchBar.inputs[0]} />
      <input className='search-bar-input' type='text' placeholder={pageData.searchBar.inputs[1]} />
      <SearchBtn />
    </section>
  )
}

export default SearchBar
