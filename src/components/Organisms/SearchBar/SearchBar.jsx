import { pageData } from '../../../data/page'
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'

const SearchBar = () => {
  return (
    <div className='w-11/12 h-14 flex self-center justify-around items-center font-bold bg-gray3 rounded-xl px-2 my-6'>
      <p className='mx-2'>{pageData.searchBar.title}</p>
      <input className='w-5/12 h-10 bg-gray4 rounded-lg outline-none px-4' type='text' placeholder={pageData.searchBar.inputs[0]} />
      <input className='w-5/12 h-10 bg-gray4 rounded-lg outline-none px-4' type='text' placeholder={pageData.searchBar.inputs[1]} />
      <SearchBtn />
    </div>
  )
}

export default SearchBar
