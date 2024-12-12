import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import './saveBtn.css'

const SaveBtn = () => {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <button className={`${location.pathname.includes('/producto/') ? 'primary-btn px-4 rounded-full text-black1' : 'save-btn'}`} type='submit'>
      <p>{t('save')}</p>
    </button>
  )
}

export default SaveBtn
