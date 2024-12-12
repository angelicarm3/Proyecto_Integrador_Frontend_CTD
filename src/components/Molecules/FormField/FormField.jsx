import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setShowPassword } from '../../../context/slices/formSlice'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import './formField.css'

const FormField = ({ autoComplete, fieldWidth, label, id, type, value, inputClass, register, validation, onChange, error, promiseError, extraErrorMessage }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { showPassword } = useSelector((state) => state.form)

  return (
    <div className={`${fieldWidth} field-container`}>
      <label htmlFor={id} className='label'>{label}</label>
      <input
        autoComplete={autoComplete}
        id={id}
        type={type}
        value={value}
        className={`${inputClass} ${(error || (promiseError?.includes('ya existe en el sistema') && id === 'matricula') || (promiseError?.includes('email') && id === 'email') || (promiseError?.includes('DNI') && id === 'dni')) && 'border-red1'}`}
        placeholder={label}
        {...register(id, validation)}
        onChange={onChange}
      />

      {
        (id === 'password' || id === 'confirmPassword') &&
          <div className='clickable w-6 absolute top-[44px] right-4 cursor-pointer hover:opacity-75' onClick={() => dispatch(setShowPassword())}>
            {
          showPassword
            ? <AiOutlineEye className='clickable' size={24} />
            : <AiOutlineEyeInvisible className='clickable' size={24} />
        }
          </div>
      }
      {
        error &&
          <FormErrorMessage message={t(error.message)} />
      }
      {
        promiseError && id === 'matricula' && promiseError.includes('ya existe en el sistema') && <FormErrorMessage message={extraErrorMessage} />
      }
      {
        promiseError && id === 'email' && promiseError.includes('ya existe en el sistema') && promiseError.includes('email') && <FormErrorMessage message={extraErrorMessage} />
      }
      {
        promiseError && id === 'dni' && promiseError.includes('ya existe en el sistema') && promiseError.includes('DNI') && <FormErrorMessage message={extraErrorMessage} />
      }
    </div>
  )
}

export default FormField
