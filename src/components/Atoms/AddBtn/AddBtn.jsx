import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { pageLabels } from '../../../data/pageLabels'
import './AddBtn.css'

const AddBtn = ({ navigateTo }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleAddProduct = () => {
    navigate(navigateTo)
  }

  return (
    <button
      onClick={handleAddProduct}
      className='primary-btn addBtn'
    >
      {t('add')}
    </button>
  )
}

export default AddBtn
