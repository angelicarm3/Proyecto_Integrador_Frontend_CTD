import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AiOutlineFileImage, AiOutlineLoading } from 'react-icons/ai'

import './createProductForm.css'
import { pageData } from '../../../data/page'
import { submitFormThunk, uploadImagesThunk, updateField, clearError, resetForm } from '../../../context/slices/formSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'

const CreateProductForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedImages, setSelectedImages] = useState([])
  const [filePreviews, setFilePreviews] = useState([])
  const [imagesRequiredError, setImagesRequiredError] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const { data, loading, error, success } = useSelector((state) => state.form)
  const maxDescriptionCharacters = 200
  const maxFiles = 10

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        dispatch(resetForm())
        navigate(-1)
      }, '3000')
    }
  }, [success, navigate, dispatch])

  const handleFileChange = (event) => {
    setImagesRequiredError(false)
    const files = Array.from(event.target.files)
    setSelectedImages(files.slice(0, maxFiles))
    setFilePreviews(files.slice(0, maxFiles).map((file) => ({
      url: URL.createObjectURL(file)
    })))
  }

  const handleCategoryChange = (e, category) => {
    const { checked } = e.target

    setSelectedCategories((prev) =>
      checked
        ? [...prev, { id: category.id, nombre: category.nombre }] // Agrega el objeto completo
        : prev.filter((selected) => selected.id !== category.id) // Elimina según el id
    )
  }

  const handleCancelClick = () => {
    navigate(-1)
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id === 'matricula') {
      dispatch(clearError())
    }
    clearErrors(id)
    dispatch(updateField({ field: id, value }))
  }

  const categories = [
    {
      id: 1,
      nombre: 'Sports'
    },
    {
      id: 2,
      nombre: 'Premium'
    },
    {
      id: 3,
      nombre: 'SUV'
    }
  ]

  const updateData = async () => {
    console.log('Añadiendo categorias e imagenes')
    dispatch(updateField({ field: 'categorias', value: selectedCategories }))
    await dispatch(uploadImagesThunk(selectedImages))
    console.log('Añadidas')
  }

  const onSubmit = async () => {
    if (selectedImages.length === 0) {
      setImagesRequiredError(true)
    } else {
      await updateData()
      console.log(data)
      // setTimeout(() => {
      //   console.log(data)
      //   dispatch(submitFormThunk(data))
      // }, '5000')
    }
  }
  // console.log(data)

  return (
    <form className='create-product-form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='primary-btn back-form-btn'>
        <BackBtn />
      </div>
      <p className='title form-title'>{pageData.createProduct.title}</p>

      <div className='form-fields-container'>
        <div className='field-container'>
          <label htmlFor='marca' className='label'>
            {pageData.createProduct.make}
          </label>
          <input
            id='marca'
            type='text'
            value={data.marca}
            className={`input ${errors.marca && 'border-red1'}`}
            placeholder={pageData.createProduct.make}
            {...register('marca', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.marca && <FormErrorMessage message={errors.marca.message} />
        }
        </div>

        <div className='field-container'>
          <label htmlFor='modelo' className='label'>
            {pageData.createProduct.model}
          </label>
          <input
            id='modelo'
            type='text'
            value={data.modelo}
            className={`input ${errors.modelo && 'border-red1'}`}
            placeholder={pageData.createProduct.model}
            {...register('modelo', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.modelo && <FormErrorMessage message={errors.modelo.message} />
          }
        </div>

        <div className='field-container'>
          <label htmlFor='matricula' className='label'>
            {pageData.createProduct.plate}
          </label>
          <input
            id='matricula'
            type='text'
            value={data.matricula}
            className={`input ${(errors.matricula || error?.includes('ya existe en el sistema')) && 'border-red1'}`}
            placeholder={pageData.createProduct.plate}
            {...register('matricula', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^[A-Z]{3}\d{3}$/,
                message: `${pageData.createProduct.validPlateError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.matricula && <FormErrorMessage message={errors.matricula.message} />
          }
          {
          error && error.includes('ya existe en el sistema') && <FormErrorMessage message={pageData.createProduct.existingProductError} />
          }
        </div>

        <div className='field-container'>
          <label htmlFor='fechaFabricacion' className='label'>
            {pageData.createProduct.year}
          </label>
          <input
            id='fechaFabricacion'
            type='text'
            value={data.fechaFabricacion}
            className={`input ${errors.fechaFabricacion && 'border-red1'}`}
            placeholder={pageData.createProduct.year}
            {...register('fechaFabricacion', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /\b(19|20)\d{2}\b/,
                message: `${pageData.createProduct.validYearError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.fechaFabricacion && <FormErrorMessage message={errors.fechaFabricacion.message} />
          }
        </div>

        <div className='field-container'>
          <label htmlFor='potenciaHP' className='label'>
            {pageData.createProduct.horsepower}
          </label>
          <input
            id='potenciaHP'
            type='text'
            value={data.potenciaHP}
            className={`input ${errors.potenciaHP && 'border-red1'}`}
            placeholder={pageData.createProduct.horsepower}
            {...register('potenciaHP', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^\d{1,4}(\.\d{1,2})?$/,
                message: `${pageData.createProduct.validNumberError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.potenciaHP && <FormErrorMessage message={errors.potenciaHP.message} />
          }
        </div>

        <div className='field-container'>
          <label htmlFor='velocidad' className='label'>
            {pageData.createProduct.speed}
          </label>
          <input
            id='velocidad'
            type='text'
            value={data.velocidad}
            className={`input ${errors.velocidad && 'border-red1'}`}
            placeholder={pageData.createProduct.speed}
            {...register('velocidad', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^([1-9][0-9]{0,2}|1000)$/,
                message: `${pageData.createProduct.validNumberError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.velocidad && <FormErrorMessage message={errors.velocidad.message} />
          }
        </div>

        <div className='field-container'>
          <label htmlFor='aceleracion' className='label'>
            {pageData.createProduct.acceleration}
          </label>
          <input
            id='aceleracion'
            type='text'
            value={data.aceleracion}
            className={`input ${errors.aceleracion && 'border-red1'}`}
            placeholder={pageData.createProduct.acceleration}
            {...register('aceleracion', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^([1-9]|[1-9]\d|[1-9]\d\.\d|10|10\.0|[1-9]\.\d{1,2})$/,
                message: `${pageData.createProduct.validNumberError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.aceleracion && <FormErrorMessage message={errors.aceleracion.message} />
          }
        </div>

        <div className='field-container'>
          <label htmlFor='precioDia' className='label'>
            {pageData.createProduct.dayPrice}
          </label>
          <input
            id='precioDia'
            type='number'
            value={data.precioDia}
            className={`input ${errors.precioDia && 'border-red1'}`}
            placeholder={pageData.createProduct.dayPrice}
            {...register('precioDia', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              },
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
                message: `${pageData.createProduct.validNumberError}`
              }
            })}
            onChange={(e) => {
              const value = e.target.value
              handleInputChange({ target: { id: 'precioDia', value: parseFloat(value) } })
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          {
          errors.precioDia && <FormErrorMessage message={errors.precioDia.message} />
          }
        </div>

        <div className='field-container w-11/12'>
          <p className='label'>
            {pageData.createProduct.category}
          </p>
          <div className='flex justify-between'>
            {
            categories.map((category, index) => (
              <div key={index} className='flex items-center gap-3'>
                <input
                  type='checkbox'
                  name={`${category.nombre}`}
                  className={`input ${errors.categorias && 'border-red1'}`}
                  // {...register('categorias', {
                  //   required: {
                  //     value: true,
                  //     message: `${pageData.createProduct.requiredError}`
                  //   }
                  // })}
                  onChange={(e) => {
                    handleCategoryChange(e, category) // Pasamos el objeto completo
                    e.target.dispatchEvent(new Event('input', { bubbles: true }))
                  }}
                />
                <label htmlFor={category.nombre}>{category.nombre}</label>
              </div>
            ))
            }
          </div>
          {
          errors.categorias && <FormErrorMessage message={errors.categorias.message} />
          }
        </div>

        <div className='field-container relative w-11/12'>
          <label htmlFor='descripcion' className='label'>
            {pageData.createProduct.description}
          </label>
          <textarea
            id='descripcion'
            maxLength={maxDescriptionCharacters}
            value={data.descripcion}
            className={`input description-input ${errors.descripcion && 'border-red1'}`}
            placeholder={pageData.createProduct.description}
            {...register('descripcion', {
              required: {
                value: true,
                message: `${pageData.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          <div className='input-counter'>
            {maxDescriptionCharacters - (data.descripcion?.length || 0)} {pageData.createProduct.characterCount}
          </div>
          {
          errors.descripcion && <FormErrorMessage message={errors.descripcion.message} error='description' />
          }
        </div>

        <div className='field-container w-11/12'>
          <label htmlFor='imagenes' className='label'>
            {pageData.createProduct.images}
          </label>
          <div className='flex gap-4'>
            <input
              id='imagenes'
              type='file'
              multiple
              onChange={handleFileChange}
              className='hidden'
            />
            <button
              type='button'
              className={`input images-btn ${imagesRequiredError && 'border-red1'}`}
              onClick={() => document.getElementById('imagenes').click()}
            >
              <AiOutlineFileImage size={40} className='img-icon' />
              <p className='img-placeholder'>{pageData.createProduct.imgPlaceholder}</p>
            </button>
            <div className='preview-grid'>
              {filePreviews?.map((img, index) => (
                <img key={index} src={img.url} alt={`Foto ${index + 1}`} className='preview-img' />
              ))}
            </div>
          </div>
          {
            imagesRequiredError && <FormErrorMessage message={pageData.createProduct.requiredError} error='images' />
          }
          <p className='input-counter'>{filePreviews.length} {pageData.createProduct.fileCount}</p>
        </div>

        <div className='btn-container'>
          <SaveBtn />
          <CancelBtn handleClick={handleCancelClick} />
        </div>
      </div>
      {
        loading &&
          <div className='pop-up-bg loader-bg'>
            <AiOutlineLoading size={40} className='loader-icon' />
          </div>
      }
      {
        success &&
          <div className='pop-up-bg success-bg'>
            <div className='success-box'>
              <p className='success-text'>{pageData.createProduct.successMessage}</p>
            </div>
          </div>
      }
    </form>
  )
}

export default CreateProductForm
