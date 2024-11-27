import { FaSearch } from 'react-icons/fa'

import './searchBtn.css'
import { useDispatch } from 'react-redux'

const SearchBtn = ({ onSearchClick, searchTerm, selectedDates }) => {
  const dispatch = useDispatch()
  return (
    <button className='primary-btn search-btn' onClick={() => dispatch(onSearchClick())}>
      <FaSearch className='search-icon' />
    </button>
  )
}

export default SearchBtn
