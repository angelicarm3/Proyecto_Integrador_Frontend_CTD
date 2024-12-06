import { useSelector } from 'react-redux'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import '../FormField/formField.css'
import './buttonField.css'

const ButtonField = ({ items, containerClass, label, labelClass, selectedItems, onChange, errorMessage }) => {
  const { hasSubmited } = useSelector((state) => state.form)

  return (
    <div className={containerClass}>
      <p className={labelClass}>{label}</p>
      <div className='flex flex-wrap gap-3'>
        {items?.map((item, index) => (
          item.nombre !== 'Todos' && (
            <button
              key={index}
              type='button'
              className={`btn-item font-semibold font-Urbanist ${selectedItems.some(selected => selected.id === item.id) && 'btn-selected'}`}
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
