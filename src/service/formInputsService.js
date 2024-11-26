import { pageLabels } from '../data/pageLabels'

const createProductFormFields = [
  { id: 'marca', label: pageLabels.createProduct.make },
  { id: 'modelo', label: pageLabels.createProduct.model },
  { id: 'matricula', label: pageLabels.createProduct.plate, validation: { pattern: { value: /^[A-Z]{3}\d{3}$/, message: `${pageLabels.createProduct.validPlateError}` } }, extraErrorMessage: `${pageLabels.createProduct.existingProductError}` },
  { id: 'fechaFabricacion', label: pageLabels.createProduct.year, validation: { pattern: { value: /\b(19[0-9]{2}|20[0-1][0-9]|202[0-5])\b/, message: `${pageLabels.createProduct.validYearError}` } } },
  { id: 'potenciaHP', label: pageLabels.createProduct.horsepower, validation: { pattern: { value: /^\d{1,4}(\.\d{1,2})?$/, message: `${pageLabels.createProduct.validNumberError}` } } },
  { id: 'velocidad', label: pageLabels.createProduct.speed, validation: { pattern: { value: /^([1-9][0-9]{0,2}|1000)$/, message: `${pageLabels.createProduct.validNumberError}` } } },
  { id: 'aceleracion', label: pageLabels.createProduct.acceleration, validation: { pattern: { value: /^([1-9]|[1-9]\d|[1-9]\d\.\d|10|10\.0|[1-9]\.\d{1,2})$/, message: `${pageLabels.createProduct.validNumberError}` } } },
  { id: 'precioDia', label: pageLabels.createProduct.dayPrice, validation: { pattern: { value: /^(0|[1-9]\d*)(\.\d{1,2})?$/, message: `${pageLabels.createProduct.validNumberError}` } } }
]

const createCharacteristicFormFields = [
  { id: 'nombre', type: 'text', label: pageLabels.createCharacteristic.name }
]

const createCategoryFormFields = [
  { id: 'nombre', type: 'text', label: pageLabels.createCategory.name }
]

const loginFormFields = [
  { autoComplete: 'email', id: 'userName', type: 'text', label: pageLabels.loginRegister.email, validation: { pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: `${pageLabels.loginRegister.invalidEmailError}` } } },
  { autoComplete: 'current-password', id: 'password', type: 'password', label: pageLabels.loginRegister.password }
]

const signupFormFields = [
  { id: 'nombre', type: 'text', label: pageLabels.loginRegister.firstName, validation: { pattern: { value: /^[a-zA-Z]+$/, message: `${pageLabels.loginRegister.invalidNameError}` } } },
  { id: 'apellido', type: 'text', label: pageLabels.loginRegister.lastName, validation: { pattern: { value: /^[a-zA-Z]+$/, message: `${pageLabels.loginRegister.invalidLastNameError}` } } },
  { id: 'dni', type: 'text', label: pageLabels.loginRegister.dni, validation: { pattern: { value: /^\d{10}$/, message: `${pageLabels.loginRegister.invalidDniError}` } }, extraErrorMessage: `${pageLabels.loginRegister.existingDNIError}` },
  { id: 'edad', type: 'text', label: pageLabels.loginRegister.age, validation: { pattern: { value: /^(1[89]|[2-9]\d)$/, message: `${pageLabels.loginRegister.invalidOfAgeError}` } } },
  { id: 'telefono', type: 'text', label: pageLabels.loginRegister.phone, validation: { pattern: { value: /^\d{7,15}$/, message: `${pageLabels.loginRegister.invalidPhoneError}` } } },
  { id: 'nacionalidad', type: 'text', label: pageLabels.loginRegister.nacionality, validation: { pattern: { value: /^[a-zA-Z]+$/, message: `${pageLabels.loginRegister.invalidNationalityError}` } } },
  { id: 'email', type: 'text', label: pageLabels.loginRegister.email, validation: { pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: `${pageLabels.loginRegister.invalidEmailError}` } }, extraErrorMessage: `${pageLabels.loginRegister.existingEmailError}` },
  { id: 'password', type: 'password', label: pageLabels.loginRegister.password, validation: { pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@.#$*])[A-Za-z0-9@.#$*]{8,20}$/, message: `${pageLabels.loginRegister.passwordRequirementsError}`, minLength: { value: 8, message: `${pageLabels.loginRegister.shortPasswordError}` }, maxLength: { value: 20, message: `${pageLabels.loginRegister.longPasswordError}` } } } },
  { id: 'confirmPassword', type: 'password', label: pageLabels.loginRegister.confirmPassword }
]

export { createProductFormFields, createCharacteristicFormFields, createCategoryFormFields, loginFormFields, signupFormFields }
