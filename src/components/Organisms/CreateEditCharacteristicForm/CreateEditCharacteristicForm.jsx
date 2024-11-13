import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'

import '../CreateEditProductForm/createEditProductForm.css'
import { pageLabels } from '../../../data/pageLabels'
import useImageUpload from '../../../hooks/useImageUpload'
import { createCharacteristicFormFields } from '../../../service/formInputsService'
import { fetchCharacteristicByIdThunk } from '../../../context/slices/adminCharacteristicSlice'
import { submitFormThunk, uploadImagesThunk, updateField, resetForm, updateHasSubmited, updateImgSuccess } from '../../../context/slices/formSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import FormField from '../../Molecules/FormField/FormField'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'

const CreateEditCharacteristicForm = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { characteristicData, error, success, imgSuccess } = useSelector((state) => state.form)
  const { selectedCharacteristic } = useSelector((state) => state.adminCharacteristic)
  const { token } = useSelector((state) => state.loginRegister)
  const { selectedImages, filePreviews, setFilePreviews, imagesRequiredError, setImagesRequiredError, handleFileChange } = useImageUpload()
  const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({ mode: 'onBlur', defaultValues: characteristicData })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetForm())
    const fetchData = async () => {
      if (id) {
        await dispatch(fetchCharacteristicByIdThunk(id))
      }
    }
    fetchData()
  }, [dispatch, id])

  useEffect(() => {
    if (selectedCharacteristic) {
      Object.keys(selectedCharacteristic).forEach((key) => {
        setValue(key, selectedCharacteristic[key] || '')
        dispatch(updateField({ field: key, value: selectedCharacteristic[key], form: 'createCharacteristic' }))
      })
      setFilePreviews([{ url: selectedCharacteristic.icono }] || [])
    }
  }, [selectedCharacteristic, dispatch])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    clearErrors(id)
    dispatch(updateField({ field: id, value, form: 'createCharacteristic' }))
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
        dispatch(updateField({ field: 'icono', value: filePreviews, form: 'createCharacteristic' }))
        dispatch(updateImgSuccess())
      }
    } else {
      dispatch(uploadImagesThunk({ files: selectedImages, form: 'createCharacteristic' }))
    }
  }

  useEffect(() => {
    if (imgSuccess && characteristicData?.icono?.length > 0) {
      if (location.pathname.includes('editar')) {
        dispatch(submitFormThunk({
          formData: { ...characteristicData, icono: characteristicData.icono[0].url },
          formURL: `characteristics/update/${selectedCharacteristic?.id}`,
          token
        }))
      } else {
        dispatch(submitFormThunk({ formData: { ...characteristicData, icono: characteristicData.icono[0].url }, formURL: 'characteristics/register', token }))
      }
    }
  }, [imgSuccess, characteristicData, dispatch, location, selectedCharacteristic, token])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetForm())
        navigate('/administracion/caracteristicas')
      }, '3000')
    }
  }, [success, navigate, dispatch])

  // console.log(characteristicData)
  // console.log(filePreviews)
  return (
    <form className='create-product-form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='primary-btn back-form-btn'>
        <BackBtn />
      </div>
      <p className='title form-title'>{pageLabels.createCharacteristic.title}</p>

      <div className='form-fields-container'>
        {
          createCharacteristicFormFields.map(({ id, label, validation, extraErrorMessage }) => (
            <FormField
              fieldWidth='w-11/12'
              key={id}
              id={id}
              type='text'
              label={label}
              value={characteristicData[id]}
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
          <label htmlFor='icono' className='label'>
            {pageLabels.createCharacteristic.icon}
          </label>
          <div className='flex gap-4'>
            <input
              id='icono'
              type='file'
              onChange={handleFileChange}
              className='hidden'
            />
            <button
              type='button'
              className={`input images-btn ${imagesRequiredError && 'border-red1'}`}
              onClick={() => document.getElementById('icono').click()}
            >
              <AiOutlineFileImage size={40} className='img-icon' />
              <p className='img-placeholder'>{pageLabels.createProduct.imgPlaceholder}</p>
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
              <p className='success-text'>{location.pathname.includes('editar') ? pageLabels.createProduct.successUpdateMessage : pageLabels.createProduct.successCreateMessage}</p>
            </div>
          </div>
      }
    </form>
  )
}

export default CreateEditCharacteristicForm
