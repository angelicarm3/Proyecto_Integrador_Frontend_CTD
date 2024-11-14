import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { pageLabels } from '../../../data/pageLabels'
import { signupFormFields } from '../../../service/formInputsService'
import { submitFormThunk, updateField, resetForm } from '../../../context/slices/formSlice'
import { changeFormNumber } from '../../../context/slices/loginRegisterSlice'

import FormField from '../../Molecules/FormField/FormField'
import LogInRegisterFormBtn from '../../Atoms/LogInRegisterFormBtn/LogInRegisterFormBtn'
import { AiOutlineArrowLeft } from 'react-icons/ai'
// import CheckboxButton from './CheckboxButton'

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData, response, error, success } = useSelector((state) => state.form)
  const { formNumber } = useSelector((state) => state.loginRegister)

  const { register, handleSubmit, formState: { errors }, clearErrors, setValue, watch, trigger } = useForm({ mode: 'onBlur', defaultValues: userData })

  useEffect(() => {
    Object.keys(userData).forEach((key) => {
      setValue(key, userData[key])
    })
  }, [userData, setValue])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    clearErrors(id)
    dispatch(updateField({ field: id, value, form: 'signUp' }))
  }

  const handleNextStep = async () => {
    // Filtra los campos relevantes del formulario actual
    const currentFields = signupFormFields
      .filter((_, index) =>
        (formNumber === 1 && index < 4) ||
        (formNumber === 2 && index > 3 && index < 7) ||
        (formNumber === 3 && index > 6)
      )
      .map(field => field.id)

    // Valida los campos del paso actual
    const isValid = await trigger(currentFields)

    if (isValid) {
      // Avanza al siguiente paso si los campos son válidos
      dispatch(changeFormNumber(formNumber + 1))
    } else {
      console.log('Errores de validación:', errors)
    }
  }

  const onSubmit = () => {
    dispatch(submitFormThunk({ formData: userData, formURL: 'users/register' }))
  }

  console.log(success)
  console.log(error)
  return (
    <form className='w-full h-fit flex flex-col font-Urbanist' onSubmit={handleSubmit(onSubmit)}>
      {/* {
        error === 'Bad credentials' &&
          <div className='w-full h-fit flex justify-center items-center text-sm text-red1 font-medium border-red1 border rounded p-2 mb-4'>
            <p>{pageLabels.loginRegister.badCredentialsError}</p>
          </div>
      } */}
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
    </form>
  )
}

export default SignupForm
