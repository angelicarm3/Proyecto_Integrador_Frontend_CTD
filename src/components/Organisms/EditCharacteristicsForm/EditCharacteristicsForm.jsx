import React from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import './EditCharacteristicsForm'

const EditCharacteristicsForm = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur'
  })

  if (!isOpen) return null

  const handleEditCategory = () => {
    // TODO obtenerlos del formulario
    const updatedData = {
      nombre: 'Nuevo Nombre',
      icono: 'https://nuevaurl.com/icono.png'
    }
    dispatch(updateCharacteristicThunk({ id: product.id, data: updatedData }))
      .then(() => console.log(`Producto ${product.id} actualizado exitosamente`))
      .catch((error) => console.error('Error al actualizar la característica:', error))
  }

  return (
    <div className='modal-bg'>
      <p>Holaaaaaaaaaa</p>
      <div className='simple-modal-form-container'>
        <AiOutlineClose className='close-icon' size={24} onClick={onClose} />
        <form onSubmit={handleSubmit(onSubmit)} className='simple-form'>
          <h2 className='modal-title'>Agregar Icono</h2>

          <div className='field-container'>
            <label htmlFor='name' className='label'>Nombre</label>
            <input
              id='name'
              type='text'
              className={`input ${errors.name ? 'border-red1' : ''}`}
              placeholder='Nombre del icono'
              {...register('name', {
                required: 'Este campo es obligatorio',
                minLength: {
                  value: 4,
                  message: 'El nombre debe tener al menos 4 caracteres'
                }
              })}
            />
            {errors.name && <p className='error-message'>{errors.name.message}</p>}
          </div>

          <div className='field-container'>
            <label htmlFor='iconUrl' className='label'>URL del Icono</label>
            <input
              id='iconUrl'
              type='url'
              className={`input ${errors.iconUrl ? 'border-red1' : ''}`}
              placeholder='https://example.com/icon.png'
              {...register('iconUrl', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: 'Debe ser una URL válida'
                }
              })}
            />
            {errors.iconUrl && <p className='error-message'>{errors.iconUrl.message}</p>}
          </div>

          <button type='submit' className='submit-btn'>Guardar</button>
        </form>
      </div>
    </div>
  )
}

export default EditCharacteristicsForm
