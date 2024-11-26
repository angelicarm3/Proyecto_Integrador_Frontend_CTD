import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import './searchBar.css'
import { setSearchTerm, setSuggestions, resetFilters, getProductsBySearchTerm, resetSearchBar } from '../../../context/slices/productSlice'
import { pageLabels } from '../../../data/pageLabels'
// import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'

const SearchBar = () => {
  const dispatch = useDispatch()
  const { searchTerm, suggestions, filteredProducts } = useSelector((state) => state.product)
  const { setValue } = useForm({ mode: 'onBlur', defaultValues: searchTerm })

  useEffect(() => {
    setValue('searchTerm', searchTerm)
  }, [searchTerm, setValue])

  const handleInputChange = (e) => {
    const { value } = e.target
    dispatch(setSearchTerm(value))

    if (value.trim() !== '') {
      dispatch(setSuggestions(value))
    } else if (searchTerm !== '') {
      dispatch(resetFilters())
    }
  }

  const handleSearchBarFocus = () => {
    if (searchTerm.trim() !== '') {
      dispatch(resetSearchBar())
    }
  }

  const handleClickSearchTerm = (value) => {
    setValue('searchTerm', value)
    dispatch(setSearchTerm(value))
    dispatch(getProductsBySearchTerm(value))
    dispatch(setSuggestions(''))
  }

  return (
    <section className='main-section flex flex-col items-center'>
      <p className='title'>{pageLabels.searchBar.title}</p>
      <p className='search-bar-subtitle '>{pageLabels.searchBar.subtitle}</p>
      <div className='w-full flex flex-col md:flex-row gap-3'>
        <div className='search-bar-container'>
          <label htmlFor='searchTerm' className='label'>Buscar por palabra clave</label>
          <input
            className='w-full input'
            id='searchTerm'
            type='text'
            value={searchTerm}
            placeholder={pageLabels.searchBar.input}
            onChange={handleInputChange}
            onFocus={handleSearchBarFocus}
          />

          {
            suggestions.length > 0 && (
              <ul className='suggestions-list w-full top-12 bg-white border rounded mt-2 shadow absolute'>
                {
                  suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className='cursor-pointer px-4 py-2 hover:bg-gray-200'
                      onClick={() => handleClickSearchTerm(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>

        <div className='search-bar-container'>
          <label htmlFor='searchTerm' className='label'>Buscar por fechas</label>
          fechas
        </div>
      </div>
    </section>
  )
}

export default SearchBar
