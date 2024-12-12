const createProductFormFields = [
  { id: 'marca', label: 'labelMake' },
  { id: 'modelo', label: 'labelModel' },
  { id: 'matricula', label: 'labelPlate', validation: { pattern: { value: /^[A-Z]{3}\d{3}$/, message: 'typeAValidPlate' } }, extraErrorMessage: 'thisPlateIsAlreadyRegistered' },
  { id: 'fechaFabricacion', label: 'labelYearOfMaking', validation: { pattern: { value: /\b(19[0-9]{2}|20[0-1][0-9]|202[0-5])\b/, message: 'typeAValidYear' } } },
  { id: 'potenciaHP', label: 'labelHorsepower', validation: { pattern: { value: /^\d{1,4}(\.\d{1,2})?$/, message: 'typeAValidNumber' } } },
  { id: 'velocidad', label: 'labelSpeed', validation: { pattern: { value: /^([1-9][0-9]{0,2}|1000)$/, message: 'typeAValidNumber' } } },
  { id: 'aceleracion', label: 'labelAcceleration', validation: { pattern: { value: /^([1-9]|[1-9]\d|[1-9]\d\.\d|10|10\.0|[1-9]\.\d{1,2})$/, message: 'typeAValidNumber' } } },
  { id: 'precioDia', label: 'labelDayPrice', validation: { pattern: { value: /^(0|[1-9]\d*)(\.\d{1,2})?$/, message: 'typeAValidNumber' } } }
]

const createCharacteristicFormFields = [
  { id: 'nombre', type: 'text', label: 'labelName' }
]

const createCategoryFormFields = [
  { id: 'nombre', type: 'text', label: 'labelName' }
]

const loginFormFields = [
  { autoComplete: 'email', id: 'userName', type: 'text', label: 'labelEmail', validation: { pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'typeAValidEmail' } } },
  { autoComplete: 'current-password', id: 'password', type: 'password', label: 'labelPassword' }
]

const signupFormFields = [
  { id: 'nombre', type: 'text', label: 'labelName', validation: { pattern: { value: /^[a-zA-Z]+$/, message: 'typeAValidName' } } },
  { id: 'apellido', type: 'text', label: 'labelLastName', validation: { pattern: { value: /^[a-zA-Z]+$/, message: 'typeAValidLastName' } } },
  { id: 'dni', type: 'text', label: 'labelDni', validation: { pattern: { value: /^\d{8,11}$/, message: 'typeAValidDni' } }, extraErrorMessage: 'thisDniIsAlreadyRegistered' },
  { id: 'edad', type: 'text', label: 'labelAge', validation: { pattern: { value: /^(1[89]|[2-9]\d)$/, message: 'youMustBeOfAgeToRentACar' } } },
  { id: 'telefono', type: 'text', label: 'labelPhone', validation: { pattern: { value: /^\d{7,15}$/, message: 'typeAValidPhone' } } },
  { id: 'nacionalidad', type: 'text', label: 'labelNacionality', validation: { pattern: { value: /^[a-zA-Z]+$/, message: 'typeAValidNationality' } } },
  { id: 'email', type: 'text', label: 'labelEmail', validation: { pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'typeAValidEmail' } }, extraErrorMessage: 'thisEmailIsAlreadyRegistered' },
  { id: 'password', type: 'password', label: 'labelPassword', validation: { pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@.#$*_-])[A-Za-z0-9@.#$*_-]{8,20}$/, message: 'invalidPasswordCheckThePasswordRequirementsBellow', minLength: { value: 8, message: 'passwordMustContainAtLeast8Characters' }, maxLength: { value: 20, message: 'passwordCannotExceed20Characters' } } } },
  { id: 'confirmPassword', type: 'password', label: 'labelConfirmPassword' }
]

export { createCategoryFormFields, createCharacteristicFormFields, createProductFormFields, loginFormFields, signupFormFields }

