import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useTranslation } from 'react-i18next'

import { fetchCategoryByIdThunk } from '../../../context/slices/adminCategorySlice'
import { resetForm, submitFormThunk, updateField, updateHasSubmited, updateImgSuccess, uploadImagesThunk } from '../../../context/slices/formSlice'
import { pageLabels } from '../../../data/pageLabels'
import useImageUpload from '../../../hooks/useImageUpload'
import { createCategoryFormFields } from '../../../service/formInputsService'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'
import FormField from '../../Molecules/FormField/FormField'
import '../CreateEditProductForm/createEditProductForm.css'

const CreateEditCategoryForm = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const token = localStorage.getItem('token')

  const { categoryData, error, imgSuccess } = useSelector((state) => state.form)
  const { selectedCategory } = useSelector((state) => state.adminCategory)

  const maxDescriptionCharacters = 200
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
    dispatch(resetForm())
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
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: `${t('categoryModifiedSuccessfully')}`,
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => {
              dispatch(resetForm())
              navigate('/administracion/categorias')
            }, '3000')
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: `${t('weCanNotModifyThisCategory')}`,
              showConfirmButton: false,
              timer: 3000
            })
          })
      } else {
        dispatch(submitFormThunk({ formData: { ...categoryData, iconoCat: categoryData.iconoCat[0].url }, formURL: 'categories/register', token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: `${t('categoryCreatedSuccessfully')}`,
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => {
              dispatch(resetForm())
              navigate('/administracion/categorias')
            }, '3000')
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: `${t('weCanNotCreateThisCategory')}`,
              showConfirmButton: false,
              timer: 3000
            })
          })
      }
    }
  }, [imgSuccess, categoryData, dispatch, location, navigate, selectedCategory, token])

  return (
    <form className='create-product-form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='back-form-btn'>
        <BackBtn />
      </div>
      <p className='title form-title'>{t('category')}</p>

      <div className='form-fields-container'>
        {
          createCategoryFormFields.map(({ id, label, validation, extraErrorMessage }) => (
            <FormField
              fieldWidth='w-11/12'
              key={id}
              id={id}
              type='text'
              label={t(label)}
              value={categoryData[id]}
              inputClass='input'
              register={register}
              validation={{
                required: { value: true, message: 'thisFieldIsRequired' },
                ...validation
              }}
              onChange={handleInputChange}
              error={errors[id]}
              promiseError={error}
              extraErrorMessage={t(extraErrorMessage)}
            />
          ))
        }

        <div className='field-container relative w-11/12'>
          <label htmlFor='descripcion' className='label'>
            {t('labelDescription')}
          </label>
          <textarea
            id='descripcion'
            maxLength={maxDescriptionCharacters}
            value={categoryData.descripcion}
            className={`input description-input ${errors.descripcion && 'border-red1'}`}
            placeholder={t('labelDescription')}
            {...register('descripcion', {
              required: {
                value: true,
                message: 'thisFieldIsRequired'
              }
            })}
            onChange={(e) => {
              handleInputChange(e)
              e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }}
          />
          <div className='input-counter'>
            {maxDescriptionCharacters - (categoryData.descripcion?.length || 0)} {t('remainingCharacters')}
          </div>
          {
          errors.descripcion && <FormErrorMessage message={t(errors.descripcion.message)} error='description' />
          }
        </div>

        <div className='field-container relative w-11/12'>
          <label htmlFor='iconoCat' className='label'>
            {t('labelIcon')}
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
              <p className='img-placeholder'>{t('selectIcon')}</p>
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
            imagesRequiredError && <FormErrorMessage message={t('thisFieldIsRequired')} error='images' />
          }
        </div>

        <div className='btn-container'>
          <SaveBtn />
          <CancelBtn handleClick={handleCancelClick} />
        </div>
      </div>
    </form>
  )
}

export default CreateEditCategoryForm
