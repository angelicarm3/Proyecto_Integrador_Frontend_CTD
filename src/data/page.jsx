import {
  premiumCar,
  sportsCar,
  SUVCar,
  allCars
} from '../assets/pageImg'

export const pageData = {
  buttons: {
    logIn: 'Iniciar sesión',
    signUp: 'Crear cuenta',
    back: 'Atrás',
    rentNow: 'Rentar Ahora',
    save: 'Guardar',
    cancel: 'Cancelar'
  },
  searchBar: {
    title: 'Buscar',
    inputs: [
      'Marca',
      'Modelo'
    ]
  },
  categories: {
    title: 'Categorías',
    buttons: [
      {
        img: sportsCar,
        text: 'Deportivo',
        filter: 'Sports'
      },
      {
        img: premiumCar,
        text: 'Premium',
        filter: 'Premium'
      },
      {
        img: SUVCar,
        text: 'SUV',
        filter: 'SUV'
      },
      {
        img: allCars,
        text: 'Todos',
        filter: 'All'
      }
    ]
  },
  productCard: {
    dia: '/día',
    features: {
      horsepower: 'CV',
      speed: 'km/h',
      timeframe: '0-100:',
      acceleration: 's'
    }
  },
  productDetail: {
    seeMore: 'Ver más...'
  },
  createProduct: {
    title: 'Nuevo producto',
    make: 'Marca',
    model: 'Modelo',
    plate: 'Matrícula (ABC123)',
    year: 'Año de fabricación',
    horsepower: 'Potencia del motor (CV)',
    speed: 'Velocidad máxima (km/h)',
    acceleration: 'Aceleración (0-100km)',
    dayPrice: 'Precio por día',
    category: 'Categorías',
    description: 'Descripción',
    images: 'Imágenes (max. 10 archivos)',
    requiredError: 'Este campo es obligatorio',
    validPlateError: 'Ingrese una matrícula válida',
    validYearError: 'Ingrese un año válido',
    validNumberError: 'Ingrese un número válido',
    existingProductError: 'Esta matrícula ya está registrada'
  }
}
