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
    title: 'Búsqueda rápida',
    subtitle: 'Utiliza nuestro motor de búsqueda para encontrar tu vehículo ideal',
    input: 'Busca tu auto'
  },
  categories: {
    title: 'Categorías',
    resultCountOne: ' coincidencia de ',
    resultCount: ' coincidencias de '
  },
  characteristics: {
    title: 'Características'
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
    title: 'Producto',
    make: 'Marca',
    model: 'Modelo',
    plate: 'Matrícula (ABC123)',
    year: 'Año de fabricación',
    horsepower: 'Potencia del motor (CV)',
    speed: 'Velocidad máxima (km/h)',
    acceleration: 'Aceleración (0-100km)',
    dayPrice: 'Precio por día ($)',
    characteristic: 'Características (Seleccione todas las que apliquen)',
    category: 'Categorías (Seleccione todas las que apliquen)',
    description: 'Descripción (Máximo 200 caracteres)',
    images: 'Imágenes (Máximo 10 archivos)',
    characterCount: 'caracteres restantes',
    imgPlaceholder: 'Seleccionar imágenes',
    fileCount: 'archivos seleccionados',
    successCreateMessage: '¡Producto creado con éxito!',
    successUpdateMessage: '¡Producto actualizado con éxito!',
    requiredError: 'Este campo es obligatorio',
    requiredSelectionError: 'Por favor selecciona al menos una opción',
    validPlateError: 'Ingrese una matrícula válida',
    validYearError: 'Ingrese un año válido',
    validNumberError: 'Ingrese un número válido',
    existingProductError: 'Esta matrícula ya está registrada'
  },
  createCharacteristic: {
    title: 'Característica',
    name: 'Nombre',
    icon: 'Icono (Máximo 1 archivo)',
    imgPlaceholder: 'Seleccionar ícono',
    successCreateMessage: 'Característica creada con éxito!',
    successUpdateMessage: 'Característica actualizada con éxito!'
  },
  createCategory: {
    title: 'Categoría',
    name: 'Nombre',
    description: 'Descripción (Máximo 200 caracteres)',
    icon: 'Icono (Máximo 1 archivo)',
    successCreateMessage: 'Categoría creada con éxito!',
    successUpdateMessage: 'Categoría actualizads con éxito!'
  },
  loginRegister: {
    email: 'Email',
    password: 'Contraseña',
    confirmPassword: 'Confirme su contraseña',
    firstName: 'Nombre',
    lastName: 'Apellido',
    dni: 'DNI',
    age: 'Edad',
    phone: 'Telefono',
    nacionality: 'Nacionalidad',
    forgotPassword: '¿Olvidó su contraseña?',
    logInBtn: 'Ingresar',
    registerBtn: 'Registrarse',
    invalidNameError: 'Por favor ingrese un nombre válido',
    invalidLastNameError: 'Por favor ingrese un apellido válido',
    invalidNationalityError: 'Por favor ingrese una nacionalidad válida',
    invalidDniError: 'Por favor ingrese un número de identificación válido',
    invalidOfAgeError: 'Debe ser mayor de edad para rentar un auto',
    invalidEmailError: 'Por favor ingrese una dirección de email válida',
    invalidPhoneError: 'Por favor ingrese un número de teléfono válido',
    badCredentialsError: 'Email o contraseña inválidos.',
    shortPasswordError: 'La contraseña debe tener al menos 8 caracteres',
    longPasswordError: 'La contraseña no puede exceder 20 caracteres.',
    passwordRequirementsError: 'Contraseña inválida. Compruebe los requerimientos para la contraseña abajo',
    blankSpaceError: 'La contraseña no puede contener espacios en blanco',
    passwordsDontMatchError: 'Las contraseñas no coinciden. Intente de nuevo',
    existingEmailError: 'Este email ya está registrado',
    existingDNIError: 'Este DNI ya está registrado',
    passwordReq: [
      'La contraseña debe entre 8 y 20 caracteres',
      'la contraseña debe contener al menos un símbolo @.#$*_- y un número',
      'La contraseña debe contener al menos una letra mayúscula y una minúscula'
    ]
  },
  createBookin: {
    cities: [
      { id: 1, nombre: 'Bogotá' },
      { id: 2, nombre: 'Cartagena' },
      { id: 3, nombre: 'Medellín' },
      { id: 4, nombre: 'Pasto' }
    ],
    title: 'Reserva',
    subtitle: 'Define los detalles de tu reserva',
    subtitle2: 'Confirma los detalles de tu reserva',
    dates: 'Seleccione las fechas de alquiler',
    pickUp: 'Selecciona el lugar de recogida',
    dropOff: 'Selecciona el lugar de retorno',
    comment: 'Comentario',
    successUpdateMessage: 'Categoría actualizads con éxito!'
  },
  adminPanel: {
    mobileMessage: 'No disponible en dispositivos móviles',
    mainTitle: 'Panel de Administración',
    productsList: 'Lista de productos',
    usersList: 'Lista de usuarios'
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
  adminCharacteristics: {
    title: 'Administrar características',
    result: 'Resultados'
  },
  adminCategories: {
    title: 'Administrar categorías',
    result: 'Resultados'
  }
}
