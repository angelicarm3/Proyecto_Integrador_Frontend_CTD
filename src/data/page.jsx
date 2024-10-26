import {
  premiumCar,
  sportsCar,
  SUVCar,
  allCars
} from '../assets/pageImg'

export const pageData = {
  buttons: {
    logIn: 'Ingresar',
    signUp: 'Registro',
    rentNow: 'Rentar Ahora'
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
  }
}
