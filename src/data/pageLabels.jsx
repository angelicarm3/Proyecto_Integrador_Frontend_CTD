import {
  premiumCar,
  sportsCar,
  SUVCar,
  allCars
} from '../assets/pageImg'

export const pageLabels = {
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
        id: 1,
        img: sportsCar,
        text: 'Deportivo',
        filter: 'Sports'
      },
      {
        id: 2,
        img: premiumCar,
        text: 'Premium',
        filter: 'Premium'
      },
      {
        id: 3,
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
    characterCount: 'caracteres restantes',
    imgPlaceholder: 'Seleccionar imágenes',
    fileCount: 'archivos seleccionados',
    successMessage: '¡Producto creado con éxito!',
    requiredError: 'Este campo es obligatorio',
    validPlateError: 'Ingrese una matrícula válida',
    validYearError: 'Ingrese un año válido',
    validNumberError: 'Ingrese un número válido',
    existingProductError: 'Esta matrícula ya está registrada'
  },
  adminPanel: {
    mobileMessage: 'No disponible en dispositivos móviles',
    mainTitle: 'Panel de Administración',
    productsList: 'Lista de productos',
    usersList: 'Usuarios'
  },
  addBtn: {
    label: '+ Añadir'
  },
  AddBtnUsers: {
    label: '+ Añadir'
  },

  adminProducts: {
    confirmDelation: '¿Desea eliminar este producto?',
    delete: 'Eliminar'
  },
  adminUsers: {
    confirmDelate: '¿Desea eliminar este usuario',
    deleteUser: 'Eliminar'
  },
  adminSearchBar: {
    placeholder: 'Palabra Clave'
  }
}
