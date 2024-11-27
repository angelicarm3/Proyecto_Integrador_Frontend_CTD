import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { clearError, resetForm, submitFormThunk, updateField } from '../../../context/slices/formSlice'
import { changeFormNumber, sendConfirmationEmailThunk } from '../../../context/slices/loginRegisterSlice'
import { pageLabels } from '../../../data/pageLabels'
import { signupFormFields } from '../../../service/formInputsService'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import LogInRegisterFormBtn from '../../Atoms/LogInRegisterFormBtn/LogInRegisterFormBtn'
import FormField from '../../Molecules/FormField/FormField'
import RegistrationConfirmPopUp from '../../Templates/RegistrationConfirmPopUp/RegistrationConfirmPopUp'

const SignupForm = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { userData, success } = useSelector((state) => state.form)
  const { formNumber, emailConfig, error } = useSelector((state) => state.loginRegister)

  const { register, handleSubmit, formState: { errors }, clearErrors, setValue, watch, trigger } = useForm({ mode: 'onBlur', defaultValues: userData })

  useEffect(() => {
    dispatch(resetForm())
  }, [])

  useEffect(() => {
    Object.keys(userData).forEach((key) => {
      setValue(key, userData[key])
    })
  }, [userData, setValue])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id === 'dni' || id === 'email') {
      dispatch(clearError())
    }
    clearErrors(id)
    dispatch(updateField({ field: id, value, form: 'signUp' }))
  }

  const handleNextStep = async () => {
    const currentFields = signupFormFields
      .filter((_, index) =>
        (formNumber === 1 && index < 4) ||
        (formNumber === 2 && index > 3 && index < 7) ||
        (formNumber === 3 && index > 6)
      )
      .map(field => field.id)

    const isValid = await trigger(currentFields)

    if (isValid) {
      dispatch(changeFormNumber(formNumber + 1))
    }
  }

  const onSubmit = () => {
    dispatch(submitFormThunk({ formData: userData, formURL: 'users/register' }))
  }

  useEffect(() => {
    if (error && error.includes('DNI')) {
      dispatch(changeFormNumber(1))
    } else if (error && error.includes('email')) {
      dispatch(changeFormNumber(2))
    }
  }, [error, dispatch])

  useEffect(() => {
    if (success) {
      setIsOpen(true)
      const newData = { ...emailConfig, toUser: [userData.email], name: userData.nombre }
      dispatch(sendConfirmationEmailThunk(newData))
    }
  }, [success, dispatch])

  return (
    <form className='w-full h-fit flex flex-col font-Urbanist' onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full flex justify-center text-yellow1 font-bold relative mb-3'>
        {
          formNumber !== 1 &&
            <AiOutlineArrowLeft size={20} className='cursor-pointer absolute left-0' onClick={() => dispatch(changeFormNumber(formNumber - 1))} />
        }
        <p className=''>Paso {formNumber}</p>
      </div>
      <div className='w-full flex justify-between flex-wrap'>
        {
          signupFormFields.map(({ id, type, label, validation, extraErrorMessage }, index) => {
            if (
              (formNumber === 1 && index < 4) ||
            (formNumber === 2 && index > 3 && index < 7) ||
            (formNumber === 3 && index > 6)
            ) {
              return (
                <FormField
                  fieldWidth={`${id === 'dni' || id === 'edad' ? 'w-[calc(50%-5px)]' : 'w-full'}`}
                  key={id}
                  id={id}
                  type={type}
                  label={label}
                  value={userData[id]}
                  inputClass='input-dark'
                  register={register}
                  validation={{
                    required: { value: true, message: pageLabels.createProduct.requiredError },
                    ...validation,
                    ...(id === 'confirmPassword' && {
                      validate: {
                        matchesPassword: value =>
                          value === watch('password') || 'Las contraseñas no coinciden'
                      }
                    })
                  }}
                  onChange={handleInputChange}
                  error={errors[id]}
                  promiseError={error}
                  extraErrorMessage={extraErrorMessage}
                />
              )
            }
            return null
          })
        }
      </div>

      {
        formNumber !== 3
          ? (
            <button
              type='button'
              className='primary-btn w-full h-[44px] text-[18px] text-black1 font-bold rounded-[36px] my-4'
              onClick={handleNextStep}
            >
              Continuar
            </button>
            )
          : (
            <div className=''>
              <LogInRegisterFormBtn />
              <ul className='list-disc flex flex-col gap-1'>
                {
                pageLabels.loginRegister.passwordReq.map((requirement, index) => (
                  <li key={index} className='text-sm'>{requirement}</li>
                ))
              }
              </ul>
            </div>
            )
      }
      {
        success &&
          <RegistrationConfirmPopUp setIsOpen={setIsOpen} />
      }
    </form>
  )
}

export default SignupForm
