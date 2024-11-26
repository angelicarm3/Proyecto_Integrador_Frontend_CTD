import React from 'react'
import { Link } from 'react-router-dom'
import { pageLabels } from '../../../data/pageLabels'
import './AdminPanel.css'
import { useSelector } from 'react-redux'

const AdminPanel = () => {
  return (
    <div className='admin-panel-container'>
      <div className='admin-panel-mobile-message-div'>
        <h2 className='admin-panel-mobile-message-text'>{pageLabels.adminPanel.mobileMessage}</h2>
      </div>

      <section className='admin-panel-seccion-conatiner'>
        <h1 className='admin-panel-main-title'>{pageLabels.adminPanel.mainTitle}</h1>
        <Link
          to='/administracion/productos'
          className='admin-panel-link'
        >
          {pageLabels.adminPanel.productsList}
        </Link>
        <Link
          to='/administracion/caracteristicas'
          className='admin-panel-link'
        >
          {pageLabels.adminCharacteristics.title}
        </Link>
        <Link
          to='/administracion/categorias'
          className='admin-panel-link'
        >
          {pageLabels.adminCategory.title}
        </Link>
        <Link
          to='/administracion/caracteristicas'
          className='admin-panel-link'
        >
          {pageLabels.adminCharacteristics.title}
        </Link>
        <Link
          to='/administracion/categorias'
          className='admin-panel-link'
        >
          {pageLabels.adminCategories.title}
        </Link>

      </section>
    </div>
  )
}

export default AdminPanel
