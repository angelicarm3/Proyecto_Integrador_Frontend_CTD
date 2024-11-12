import './formField.css'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'

const FormField = ({ id, label, type = 'text', value, register, validation, onChange, error, promiseError, extraErrorMessage }) => {
  return (
    <div className='field-container'>
      <label htmlFor={id} className='label'>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        className={`input ${(error || (promiseError?.includes('ya existe en el sistema') && id === 'matricula')) && 'border-red1'}`}
        placeholder={label}
        {...register(id, validation)}
        onChange={onChange}
      />
      {
        error &&
          <FormErrorMessage message={error.message} />
      }
      {
        promiseError && id === 'matricula' && promiseError.includes('ya existe en el sistema') && <FormErrorMessage message={extraErrorMessage} />
      }
    </div>
  )
}

export default FormField
