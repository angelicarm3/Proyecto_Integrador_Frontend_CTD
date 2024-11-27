import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { fetchCharacteristicByIdThunk } from '../../../context/slices/adminCharacteristicSlice'
import { resetForm, submitFormThunk, updateField, updateHasSubmited, updateImgSuccess, uploadImagesThunk } from '../../../context/slices/formSlice'
import { pageLabels } from '../../../data/pageLabels'
import useImageUpload from '../../../hooks/useImageUpload'
import { createCharacteristicFormFields } from '../../../service/formInputsService'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import SaveBtn from '../../Atoms/SaveBtn/SaveBtn'
import FormField from '../../Molecules/FormField/FormField'
import '../CreateEditProductForm/createEditProductForm.css'

const CreateEditCharacteristicForm = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const { characteristicData, error, imgSuccess } = useSelector((state) => state.form)
  const { selectedCharacteristic } = useSelector((state) => state.adminCharacteristic)

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
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: 'Característica modificada exitosamente',
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => {
              dispatch(resetForm())
              navigate('/administracion/caracteristicas')
            }, '3000')
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: 'No se puede modificar esta característica',
              showConfirmButton: false,
              timer: 3000
            })
          })
      } else {
        dispatch(submitFormThunk({ formData: { ...characteristicData, icono: characteristicData.icono[0].url }, formURL: 'characteristics/register', token }))
          .unwrap()
          .then((response) => {
            withReactContent(Swal).fire({
              icon: 'success',
              text: 'Característica creada exitosamente',
              showConfirmButton: false,
              timer: 3000
            })
            setTimeout(() => {
              dispatch(resetForm())
              navigate('/administracion/caracteristicas')
            }, '3000')
          })
          .catch(() => {
            withReactContent(Swal).fire({
              icon: 'error',
              text: 'No se puede crear esta característica',
              showConfirmButton: false,
              timer: 3000
            })
          })
      }
    }
  }, [imgSuccess, characteristicData, dispatch, location, navigate, selectedCharacteristic, token])

  return (
    <form className='create-product-form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='back-form-btn'>
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
    </form>
  )
}

export default CreateEditCharacteristicForm
