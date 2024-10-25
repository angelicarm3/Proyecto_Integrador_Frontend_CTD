import {
  premiumCar,
  sportsCar,
  SUVCar
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
      }
    ]
  }
}
