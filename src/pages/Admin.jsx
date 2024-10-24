import React from 'react'
import ProductList from '../Common/Components/ProductList/ProductList'

const Admin = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Administración de Productos</h1>
      <ProductList />
    </div>
  )
}

export default Admin
