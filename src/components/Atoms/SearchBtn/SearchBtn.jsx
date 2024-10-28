import { FaSearch } from 'react-icons/fa'

import './searchBtn.css'

const SearchBtn = () => {
  return (
    <button className='primary-btn search-btn'>
      <FaSearch className='search-icon' />
    </button>
  )
}

export default SearchBtn
