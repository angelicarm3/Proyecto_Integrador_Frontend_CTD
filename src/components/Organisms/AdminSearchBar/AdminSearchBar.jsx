import { useState } from 'react'
import { pageLabels } from '../../../data/pageLabels'
import './AdminSearchBar.css'

const AdminSearchBar = ({ productsList }) => {
  const [searchItem, setSearchItem] = useState()

  // TODO: implement search function

  return (
    <input
      className='admin-search-bar-container-input'
      placeholder={pageLabels.adminSearchBar.placeholder}
      type='text'
      onChange={(e) => setSearchItem(e.target.value)}
      value={searchItem}
    />

  )
}

export default AdminSearchBar
