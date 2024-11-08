import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineFileImage, AiOutlineLoading } from 'react-icons/ai'

import './createProductForm.css'
import { pageLabels } from '../../../data/pageLabels'
import useImageUpload from '../../../hooks/useImageUpload'
import { createProductFormFields } from '../../../service/createProductService'
import { fetchAllCategoriesThunk } from '../../../context/slices/categorySlice'
import { fetchAllCharacteristicsThunk } from '../../../context/slices/characteristicSlice'
import { submitFormThunk, uploadImagesThunk, updateField, clearError, resetForm, updateHasSubmited } from '../../../context/slices/formSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import FormField from '../../Molecules/FormField/FormField'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import ButtonField from '../../Molecules/CheckboxField/ButtonField'

const CreateProductForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { productData, loading, error, success, imgSuccess } = useSelector((state) => state.form)
  const allCategories = useSelector((state) => state.category.allCategories)
  const allCharacteristics = useSelector((state) => state.characteristic.allCharacteristics)
  const { selectedImages, filePreviews, imagesRequiredError, setImagesRequiredError, handleFileChange, removeImage } = useImageUpload()
  const maxDescriptionCharacters = 200
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([])
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllCategoriesThunk())
    dispatch(fetchAllCharacteristicsThunk())
  }, [dispatch])

  const handleSelectionChange = (item, setState) => {
    setState((prev) =>
      prev.some(selected => selected.id === item.id)
        ? prev.filter(selected => selected.id !== item.id)
        : [...prev, item]
    )
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id === 'matricula') {
      dispatch(clearError())
    }
    clearErrors(id)
    dispatch(updateField({ field: id, value, form: 'createProduct' }))
  }

  const handleCancelClick = () => {
    navigate(-1)
  }

  const onSubmit = () => {
    window.scrollTo(0, 0)
    dispatch(updateHasSubmited())
    if (selectedImages.length === 0) {
      setImagesRequiredError(true)
    } else {
      dispatch(updateField({ field: 'categorias', value: selectedCategories, form: 'createProduct' }))
      dispatch(updateField({ field: 'caracteristicas', value: selectedCharacteristics, form: 'createProduct' }))
      dispatch(uploadImagesThunk({ files: selectedImages, form: 'createProduct' }))
    }
  }

  useEffect(() => {
    if (imgSuccess && productData.imagenes.length > 0) {
      dispatch(submitFormThunk({ formData: productData, formURL: 'autos/register' }))
    }
  }, [imgSuccess, productData, dispatch])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetForm())
        navigate(-1)
      }, '3000')
    }
  }, [success, navigate, dispatch])

  console.log(productData)
  console.log(selectedCategories)
  console.log(selectedCharacteristics)

  return (
    <form className='create-product-form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='primary-btn back-form-btn'>
        <BackBtn />
      </div>
      <p className='title form-title'>{pageLabels.createProduct.title}</p>

      <div className='form-fields-container'>
        {
          createProductFormFields.map(({ id, label, validation, extraErrorMessage }) => (
            <FormField
              key={id}
              id={id}
              label={label}
              value={productData[id]}
              register={register}
              validation={{
                required: { value: true, message: pageLabels.createProduct.requiredError },
                ...validation
              }}
              onChange={handleInputChange}
              error={errors[id]}
              promiseError={error}
              extraErrorMessage={extraErrorMessage}
            />
          ))
        }

        <ButtonField
          items={allCharacteristics}
          label={pageLabels.createProduct.characteristic}
          selectedItems={selectedCharacteristics}
          onChange={(item) => handleSelectionChange(item, setSelectedCharacteristics)}
          errorMessage={pageLabels.createProduct.requiredSelectionError}
        />

        <ButtonField
          items={allCategories}
          label={pageLabels.createProduct.category}
          selectedItems={selectedCategories}
          onChange={(item) => handleSelectionChange(item, setSelectedCategories)}
          errorMessage={pageLabels.createProduct.requiredSelectionError}
        />

        <div className='field-container relative w-11/12'>
          <label htmlFor='descripcion' className='label'>
            {pageLabels.createProduct.description}
          </label>
          <textarea
            id='descripcion'
            maxLength={maxDescriptionCharacters}
            value={productData.descripcion}
            className={`input description-input ${errors.descripcion && 'border-red1'}`}
            placeholder={pageLabels.createProduct.description}
            {...register('descripcion', {
              required: {
                value: true,
                message: `${pageLabels.createProduct.requiredError}`
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          <div className='input-counter'>
            {maxDescriptionCharacters - (productData.descripcion?.length || 0)} {pageLabels.createProduct.characterCount}
          </div>
          {
          errors.descripcion && <FormErrorMessage message={errors.descripcion.message} error='description' />
          }
        </div>

        <div className='field-container relative w-11/12'>
          <label htmlFor='imagenes' className='label'>
            {pageLabels.createProduct.images}
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
              <p className='img-placeholder'>{pageLabels.createProduct.imgPlaceholder}</p>
            </button>
            <div className='preview-grid'>
              {
                filePreviews?.map((img, index) => (
                  <div key={index} className='relative'>
                    <img src={img.url} alt={`Foto ${index + 1}`} className='preview-img' />
                    <AiOutlineClose className='absolute top-0 right-0 cursor-pointer hover:text-gray3' size={20} onClick={() => removeImage(index)} />
                  </div>
                ))
              }
            </div>
          </div>
          {
            imagesRequiredError && <FormErrorMessage message={pageLabels.createProduct.requiredError} error='images' />
          }
          <p className='input-counter'>{filePreviews.length} {pageLabels.createProduct.fileCount}</p>
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
              <p className='success-text'>{pageLabels.createProduct.successMessage}</p>
            </div>
          </div>
      }
    </form>
  )
}

export default CreateProductForm
