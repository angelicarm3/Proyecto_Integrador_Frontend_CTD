import { FaSearch } from 'react-icons/fa'

import { useDispatch } from 'react-redux'

import './searchBtn.css'

const SearchBtn = ({ onSearchClick }) => {
  const dispatch = useDispatch()
  return (
    <button className='primary-btn search-btn' onClick={() => dispatch(onSearchClick())}>
      <FaSearch className='search-icon' />
    </button>
  )
}

export default SearchBtn
