import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import './AdminPanel.css'

const AdminPanel = () => {
  const { t } = useTranslation()

  return (
    <div className='admin-panel-container'>
      <div className='admin-panel-mobile-message-div'>
        <h2 className='admin-panel-mobile-message-text'>{t('doNotAvailableInMobileDevices')}</h2>
      </div>

      <section className='admin-panel-seccion-conatiner'>
        <h1 className='admin-panel-main-title'>{t('adminPanel')}</h1>
        <Link
          to='/administracion/productos'
          className='admin-panel-link'
        >
          {t('productsList')}
        </Link>

        <Link
          to='/administracion/usuarios'
          className='admin-panel-link'
        >
          {t('usersList')}
        </Link>
        <Link
          to='/administracion/caracteristicas'
          className='admin-panel-link'
        >
          {t('administrateCharacteristics')}
        </Link>
        <Link
          to='/administracion/categorias'
          className='admin-panel-link'
        >
          {t('administrateCategories')}
        </Link>

      </section>
    </div>
  )
}

export default AdminPanel
