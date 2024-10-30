import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminProductList from '../../Organisms/AdminProductList/AdminProductList'
import SearchBar from '../../../components/Organisms/SearchBar/SearchBar'

import SearchBtn from '../../Atoms/SearchBtn/SearchBtn'
import Dropdown from '../../Atoms/DropDown/DropDown'
import Pagination from '../../Molecules/Pagination/Pagination';

import { setItemsToShow, setPage } from '../../../context/slices/adminProductSlice'


const AdminProducts = () => {
  const options = [10, 20, 30, 40, 50]
  const dispatch = useDispatch()

  const handleAddProduct = () => {
    // Lógica para agregar el producto
    console.log(`Agregar producto ${product.id}`)
  }

  const productsList = useSelector((state) => state.adminProducts.allProducts)
  const itemsToShow = useSelector((state) => state.adminProducts.itemsToShow)
  const currentPage = useSelector((state) => state.adminProducts.currentPage)


  const handleSelect = (count) => {
    dispatch(setItemsToShow(count))
    console.log(`Mostrar ${count} elementos`)
  }
  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  const filteredProducts = productsList.slice(0, itemsToShow)
  const totalItems = productsList.length
  const startIndex = (currentPage - 1) * itemsToShow
  const endIndex = startIndex + itemsToShow
  const currentProducts = productsList.slice(startIndex, endIndex)


  return (
    <div className='p-4 flex-column mt-[68px]'>
      <section className='flex items-center justify-around align-middle mb-4'>
        <button
          onClick={handleAddProduct}
          className='primary-btn  text-white px-4 py-2  h-8 rounded-2xl hover:bg-black1 transition duration-200'
        >
          + Añadir
        </button>
        <div className='flex w-3/5 gap-4'>
          <input
            type="text"
            placeholder="Palabra Clave"
            className="outline-none bg-transparent placeholder-gray-500 text-gray-700 border rounded-full px-4 py-2 flex-grow"
          />
          <SearchBtn />
        </div>

        <div className='flex items-center gap-2'>
          <span>Resultados</span>
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
      </section>
      <AdminProductList products={currentProducts} />
      <div className='flex justify-between space-x-2'>
        <Pagination totalItems={totalItems} itemsPerPage={itemsToShow} onPageChange={handlePageChange} currentPage={currentPage} />
        <p className='text-gray-500'>{`Resultados ${startIndex + 1} a ${endIndex} de ${totalItems}`}</p>
      </div>
    </div>
  )
}

export default AdminProducts
