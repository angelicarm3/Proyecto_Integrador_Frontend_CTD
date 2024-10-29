import React from 'react'
import AdminProductList from '../../Organisms/AdminProductList/AdminProductList'
import { FaArrowCircleLeft } from "react-icons/fa";

const AdminProducts = () => {
  const handleAddProduct = () => {
    // Lógica para agregar el producto
    console.log(`Agregar producto ${product.id}`)
  }

  return (
    <div className='p-4 flex-column'>
      <h1 className='text-2xl font-bold'>Administración de Productos</h1>
      <section className='flex flex-row items-center'>
      <FaArrowCircleLeft />
        <div className='p-4 flex flex-row gap-2 items-center'>
          <input
            type='text'
            placeholder='Buscar productos...'
            className='border border-gray-300 px-4 py-2 rounded w-full  h-8'
          />
          <button
            className='bg-blue-500 text-white  h-8 px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full'
          >
            Buscar
          </button>
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2  h-8 rounded hover:bg-blue-600 transition duration-200'
          onClick={handleAddProduct}
        >
          Agregar Producto
        </button>
      </section>
      <AdminProductList />
    </div>
  )
}

export default AdminProducts
