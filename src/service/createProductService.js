import { pageLabels } from '../data/pageLabels'

export const createProductFormFields = [
  { id: 'marca', label: pageLabels.createProduct.make },
  { id: 'modelo', label: pageLabels.createProduct.model },
  { id: 'matricula', label: pageLabels.createProduct.plate, validation: { pattern: { value: /^[A-Z]{3}\d{3}$/, message: `${pageLabels.createProduct.validPlateError}` } }, extraErrorMessage: `${pageLabels.createProduct.existingProductError}` },
  { id: 'fechaFabricacion', label: pageLabels.createProduct.year, validation: { pattern: { value: /\b(19[0-9]{2}|20[0-1][0-9]|202[0-5])\b/, message: `${pageLabels.createProduct.validYearError}` } } },
  { id: 'potenciaHP', label: pageLabels.createProduct.horsepower, validation: { pattern: { value: /^\d{1,4}(\.\d{1,2})?$/, message: `${pageLabels.createProduct.validNumberError}` } } },
  { id: 'velocidad', label: pageLabels.createProduct.speed, validation: { pattern: { value: /^([1-9][0-9]{0,2}|1000)$/, message: `${pageLabels.createProduct.validNumberError}` } } },
  { id: 'aceleracion', label: pageLabels.createProduct.acceleration, validation: { pattern: { value: /^([1-9]|[1-9]\d|[1-9]\d\.\d|10|10\.0|[1-9]\.\d{1,2})$/, message: `${pageLabels.createProduct.validNumberError}` } } },
  { id: 'precioDia', label: pageLabels.createProduct.dayPrice, validation: { pattern: { value: /^(0|[1-9]\d*)(\.\d{1,2})?$/, message: `${pageLabels.createProduct.validNumberError}` } } }
]
