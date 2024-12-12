import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { resetForm, submitFormThunk, updateField } from '../../../context/slices/formSlice'
import { fetchUserByUserNameThunk } from '../../../context/slices/loginRegisterSlice'
import { pageLabels } from '../../../data/pageLabels'
import { loginFormFields } from '../../../service/formInputsService'

import LogInRegisterFormBtn from '../../Atoms/LogInRegisterFormBtn/LogInRegisterFormBtn'
import FormField from '../../Molecules/FormField/FormField'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { loginData, response, error, success } = useSelector((state) => state.form)
  const { isAdmin, logInSuccess } = useSelector((state) => state.loginRegister)

  const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm({ mode: 'onBlur', defaultValues: loginData })

  useEffect(() => {
    dispatch(resetForm())
  }, [])

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
            <p>{t('invalidEmailOrPassword')}</p>
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
                label={t(label)}
                value={loginData[id]}
                inputClass='input-dark'
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
      </div>

      <LogInRegisterFormBtn />
    </form>
  )
}

export default LoginForm
