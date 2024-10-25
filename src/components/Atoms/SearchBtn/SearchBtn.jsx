import { FaSearch } from 'react-icons/fa'

const SearchBtn = () => {
  return (
    <button className='primaryBtn w-10 hover:bg-black hover:text-white rounded-lg'>
      <FaSearch className='text-xl m-auto' />
    </button>
  )
}

export default SearchBtn
