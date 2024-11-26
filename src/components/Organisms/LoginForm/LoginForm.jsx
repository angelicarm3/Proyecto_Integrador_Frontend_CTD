import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { pageLabels } from '../../../data/pageLabels'
import { loginFormFields } from '../../../service/formInputsService'
import { fetchUserByUserNameThunk } from '../../../context/slices/loginRegisterSlice'
import { setIsRememberMe, submitFormThunk, updateField, resetForm } from '../../../context/slices/formSlice'

import FormField from '../../Molecules/FormField/FormField'
import CheckboxButton from '../../Atoms/CheckboxButton/CheckboxButton'
import LogInRegisterFormBtn from '../../Atoms/LogInRegisterFormBtn/LogInRegisterFormBtn'
// import CheckboxButton from './CheckboxButton'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loginData, response, error, success } = useSelector((state) => state.form)
  const { isAdmin, logInSuccess } = useSelector((state) => state.loginRegister)

  const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm({ mode: 'onBlur', defaultValues: loginData })

  useEffect(() => {
    Object.keys(loginData).forEach((key) => {
      setValue(key, loginData[key])
    })
  }, [loginData, setValue])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    clearErrors(id)
    dispatch(updateField({ field: id, value, form: 'logIn' }))
  }

  const onSubmit = () => {
    dispatch(submitFormThunk({ formData: loginData, formURL: 'login' }))
  }

  useEffect(() => {
    if (success) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('userName', response.userName)
      dispatch(fetchUserByUserNameThunk({ userName: response.userName, token: response.token }))
    }
  }, [success, navigate, dispatch])

  useEffect(() => {
    if (logInSuccess) {
      dispatch(resetForm())
      isAdmin ? navigate('/administracion') : navigate('/')
    }
  }, [logInSuccess, isAdmin, navigate, dispatch])

  return (
    <form className='w-full h-full flex flex-col font-Urbanist' onSubmit={handleSubmit(onSubmit)}>
      {
        error?.includes('username o password incorrecto') &&
          <div className='w-full h-fit flex justify-center items-center text-sm text-red1 font-medium border-red1 border rounded p-2 mb-4'>
            <p>{pageLabels.loginRegister.badCredentialsError}</p>
          </div>
      }
      <div className='w-full flex flex-col'>
        {
            loginFormFields.map(({ id, type, label, validation, extraErrorMessage }) => (
              <FormField
                fieldWidth='w-full'
                key={id}
                id={id}
                type={type}
                label={label}
                value={loginData[id]}
                inputClass='input-dark'
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
      </div>

      {/* <div className='flex justify-between font-normal mb-6'>
        <div className='flex h-6 items-start relative'>
          <input
            id='rememberMe'
            type='checkbox'
            name='rememberMe'
          />
          <div className='w-fit flex items-center absolute font-normal bg-black3 py-2 gap-4 top-[-10px] left-0 cursor-pointer' onClick={() => dispatch(setIsRememberMe())}>
            <CheckboxButton />
            <label htmlFor='rememberMe' className='cursor-pointer'>
              {pageLabels.loginRegister.rememberMe}
            </label>
          </div>
        </div>
        <div className='text-gray3 cursor-pointer'>
          {pageLabels.loginRegister.forgotPassword}
        </div>
      </div> */}

      <LogInRegisterFormBtn />

      {/* <p className='w-full text-center'>¿No tiene una cuenta?
        <span className='text-gray3 cursor-pointer ml-2' onClick={() => handleOptionClick('/registro')}>
          Regístrese
        </span>
      </p> */}
    </form>
  )
}

export default LoginForm
