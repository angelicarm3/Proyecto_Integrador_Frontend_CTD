import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'

import '../CreateEditProductForm/createEditProductForm.css'
import { pageLabels } from '../../../data/pageLabels'
import useImageUpload from '../../../hooks/useImageUpload'
import { createCategoryFormFields } from '../../../service/formInputsService'
import { fetchCategoryByIdThunk } from '../../../context/slices/adminCategorySlice'
import { submitFormThunk, uploadImagesThunk, updateField, resetForm, updateHasSubmited, updateImgSuccess } from '../../../context/slices/formSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import FormField from '../../Molecules/FormField/FormField'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'

const CreateEditCategoryForm = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const maxDescriptionCharacters = 200
  const { categoryData, error, success, imgSuccess } = useSelector((state) => state.form)
  const { selectedCategory } = useSelector((state) => state.adminCategory)
  // const { token } = useSelector((state) => state.loginRegister)
  const token = localStorage.getItem('token')
  const { selectedImages, filePreviews, setFilePreviews, imagesRequiredError, setImagesRequiredError, handleFileChange } = useImageUpload()
  const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({ mode: 'onBlur', defaultValues: categoryData })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetForm())
    const fetchData = async () => {
      if (id) {
        await dispatch(fetchCategoryByIdThunk(id))
      }
    }
    fetchData()
  }, [dispatch, id])

  useEffect(() => {
    if (selectedCategory) {
      Object.keys(selectedCategory).forEach((key) => {
        setValue(key, selectedCategory[key] || '')
        dispatch(updateField({ field: key, value: selectedCategory[key], form: 'createCategory' }))
      })
      setFilePreviews([{ url: selectedCategory.iconoCat }] || [])
    }
  }, [selectedCategory, dispatch])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    clearErrors(id)
    dispatch(updateField({ field: id, value, form: 'createCategory' }))
  }

  const handleCancelClick = () => {
    navigate(-1)
  }

  const onSubmit = () => {
    window.scrollTo(0, 0)
    dispatch(updateHasSubmited())

    if (selectedImages.length === 0) {
      if (filePreviews.length === 0) {
        setImagesRequiredError(true)
      } else {
        dispatch(updateField({ field: 'iconoCat', value: filePreviews, form: 'createCategory' }))
        dispatch(updateImgSuccess())
      }
    } else {
      dispatch(uploadImagesThunk({ files: selectedImages, form: 'createCategory' }))
    }
  }

  useEffect(() => {
    if (imgSuccess && categoryData?.iconoCat?.length > 0) {
      if (location.pathname.includes('editar')) {
        dispatch(submitFormThunk({
          formData: { ...categoryData, iconoCat: categoryData.iconoCat[0].url },
          formURL: `categories/update/${categoryData?.id}`,
          token
        }))
      } else {
        dispatch(submitFormThunk({ formData: { ...categoryData, iconoCat: categoryData.iconoCat[0].url }, formURL: 'categories/register', token }))
      }
    }
  }, [imgSuccess, categoryData, dispatch, location, selectedCategory, token])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetForm())
        navigate('/administracion/categorias')
      }, '3000')
    }
  }, [success, navigate, dispatch])

  return (
    <form className='create-product-form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='primary-btn back-form-btn'>
        <BackBtn />
      </div>
      <p className='title form-title'>{pageLabels.createCategory.title}</p>

      <div className='form-fields-container'>
        {
          createCategoryFormFields.map(({ id, label, validation, extraErrorMessage }) => (
            <FormField
              fieldWidth='w-11/12'
              key={id}
              id={id}
              type='text'
              label={label}
              value={categoryData[id]}
              inputClass='input'
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

        <div className='field-container relative w-11/12'>
          <label htmlFor='descripcion' className='label'>
            {pageLabels.createProduct.description}
          </label>
          <textarea
            id='descripcion'
            maxLength={maxDescriptionCharacters}
            value={categoryData.descripcion}
            className={`input description-input ${errors.descripcion && 'border-red1'}`}
            placeholder={pageLabels.createCategory.description}
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
            {maxDescriptionCharacters - (categoryData.descripcion?.length || 0)} {pageLabels.createProduct.characterCount}
          </div>
          {
          errors.descripcion && <FormErrorMessage message={errors.descripcion.message} error='description' />
          }
        </div>

        <div className='field-container relative w-11/12'>
          <label htmlFor='iconoCat' className='label'>
            {pageLabels.createCategory.icon}
          </label>
          <div className='flex gap-4'>
            <input
              id='iconoCat'
              type='file'
              onChange={handleFileChange}
              className='hidden'
            />
            <button
              type='button'
              className={`input images-btn ${imagesRequiredError && 'border-red1'}`}
              onClick={() => document.getElementById('iconoCat').click()}
            >
              <AiOutlineFileImage size={40} className='img-icon' />
              <p className='img-placeholder'>{pageLabels.createCharacteristic.imgPlaceholder}</p>
            </button>
            <div className='preview-grid'>
              {
                filePreviews?.map((img, index) => (
                  <div key={index} className='relative'>
                    {
                      img.url &&
                        <img src={img.url} alt='icono' className='w-[50px]' />
                    }
                  </div>
                ))
              }
            </div>
          </div>
          {
            imagesRequiredError && <FormErrorMessage message={pageLabels.createProduct.requiredError} error='images' />
          }
        </div>

        <div className='btn-container'>
          <SaveBtn />
          <CancelBtn handleClick={handleCancelClick} />
        </div>
      </div>
      {
        success &&
          <div className='pop-up-bg success-bg'>
            <div className='success-box'>
              <p className='success-text'>{location.pathname.includes('editar') ? pageLabels.createCategory.successUpdateMessage : pageLabels.createCategory.successCreateMessage}</p>
            </div>
          </div>
      }
    </form>
  )
}

export default CreateEditCategoryForm
