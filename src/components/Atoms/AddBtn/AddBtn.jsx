import { useNavigate } from 'react-router-dom'
import { pageLabels } from '../../../data/pageLabels'
import './AddBtn.css'

const AddBtn = ({ navigateTo }) => {
  const navigate = useNavigate()

  const handleAddProduct = () => {
    console.log('Agregar producto')
    navigate(navigateTo)
    // navigate('/administracion/agregar-producto')
  }

  return (
    <button
      onClick={handleAddProduct}
      className='primary-btn addBtn'
    // TODO: primary-btn class check
    >
      {pageLabels.addBtn.label}
    </button>
  )
}

export default AddBtn
