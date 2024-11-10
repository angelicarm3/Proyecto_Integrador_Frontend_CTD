import '../FormField/formField.css'
import './buttonField.css'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import { useSelector } from 'react-redux'

const ButtonField = ({ items, label, selectedItems, onChange, errorMessage }) => {
  const { hasSubmited } = useSelector((state) => state.form)

  return (
    <div className='field-container w-11/12'>
      <p className='label'>{label}</p>
      <div className='flex flex-wrap gap-3'>
        {items?.map((item, index) => (
          index !== 0 && (
            <button
              key={index}
              type='button'
              className={`btn-item ${selectedItems.some(selected => selected.id === item.id) && 'btn-selected'}`}
              onClick={() => onChange(item)}
            >
              {item.icono && <img src={item.icono} alt='' className='w-6 h-6' />}
              <span>{item.nombre}</span>
            </button>
          )
        ))}
      </div>
      {
        hasSubmited && selectedItems.length === 0 && errorMessage && (
          <FormErrorMessage message={errorMessage} />
        )
      }
    </div>
  )
}

export default ButtonField
