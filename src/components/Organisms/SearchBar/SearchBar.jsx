import './searchBar.css'
import { pageLabels } from '../../../data/pageLabels'
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'

const SearchBar = () => {
  return (
    <section className='main-section search-bar-container'>
      <p className='search-bar-title'>{pageLabels.searchBar.title}</p>
      <input className='search-bar-input' type='text' placeholder={pageLabels.searchBar.inputs[0]} />
      {/* <input className='search-bar-input' type='text' placeholder={pageLabels.searchBar.inputs[1]} /> */}
      <SearchBtn />
    </section>
  )
}

export default SearchBar
