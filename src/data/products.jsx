import {
  AudiQ8SLine1, AudiQ8SLine2, AudiQ8SLine3, AudiQ8SLine4, AudiQ8SLine5, AudiRS6Avant1, AudiRS6Avant2, AudiRS6Avant3, AudiRS6Avant4, AudiRS6Avant5, BentleyContinentalGTC1, BentleyContinentalGTC2, BentleyContinentalGTC3, BentleyContinentalGTC4, BMWM4Cabrio1, BMWM4Cabrio2, BMWM4Cabrio3, BMWM4Cabrio4, BMWM4Cabrio5, BMWX740d1, BMWX740d2, BMWX740d3, BMWX740d4, BMWX740d5, BMWX740d6, BMWX740d7, BMWX740d8, Ferrari296GTB1, Ferrari296GTB2, Ferrari296GTB3, Ferrari296GTB4, Ferrari296GTB5, Ferrari296GTS1, Ferrari296GTS2, Ferrari296GTS3, Ferrari296GTS4, Ferrari296GTS5, Ferrari488Spider1, Ferrari488Spider2, Ferrari488Spider3, Ferrari488Spider4, Ferrari488Spider5, FerrariF8Spider1, FerrariF8Spider2, FerrariF8Spider3, FerrariF8Spider4, FerrariF8Spider5, FerrariPortofino1, FerrariPortofino2, FerrariPortofino3, FerrariPortofino4, FerrariPortofino5, FordMustangGTCabrio1, FordMustangGTCabrio2, FordMustangGTCabrio3, FordMustangGTCabrio4, FordMustangGTCabrio5, LamborghiniHuracanEvoSpyder1,
  LamborghiniHuracanEvoSpyder10,
  LamborghiniHuracanEvoSpyder2, LamborghiniHuracanEvoSpyder3, LamborghiniHuracanEvoSpyder4, LamborghiniHuracanEvoSpyder5, LamborghiniHuracanEvoSpyder6, LamborghiniHuracanEvoSpyder7, LamborghiniHuracanEvoSpyder8, LamborghiniHuracanEvoSpyder9,
  LamborghiniHuracanTecnica1, LamborghiniHuracanTecnica2, LamborghiniHuracanTecnica3, LamborghiniHuracanTecnica4, LamborghiniHuracanTecnica5, LamborghiniUrus1, LamborghiniUrus2, LamborghiniUrus3, LamborghiniUrus4, LamborghiniUrus5, LamborghiniUrusS1, LamborghiniUrusS2, LamborghiniUrusS3, LamborghiniUrusS4, LamborghiniUrusS5, LamborghiniUrusS6, MercedesClaseV1, MercedesClaseV2, MercedesClaseV3, MercedesG63AMG1, MercedesG63AMG2, MercedesG63AMG3, MercedesG63AMG4, MercedesG63AMG5, MercedesG63AMG6, Porsche718BoxsterGTS1, Porsche718BoxsterGTS2, Porsche718BoxsterGTS3, Porsche718BoxsterGTS4, Porsche718BoxsterGTS5, Porsche718BoxsterGTS6, Porsche718BoxsterGTS7, Porsche992GT31, Porsche992GT32, Porsche992GT33, Porsche992GT34, Porsche992GT35, Porsche992GT36, PorscheCarreraSCabrio1, PorscheCarreraSCabrio2, PorscheCarreraSCabrio3, PorscheCarreraSCabrio4, PorscheCarreraSCabrio5, PorscheCarreraSCabrio6, RangeRoverSportDynamicSEMHEV1, RangeRoverSportDynamicSEMHEV2, RangeRoverSportDynamicSEMHEV3, RangeRoverSportDynamicSEMHEV4
} from '../assets/productsImg'

export const productsData = {
  products: [
    {
      id: 1,
      matricula: 'QWE123',
      descripcion: '¿Quieres vivir la sensación de conducir un SUV de alta gama? Alquila un Audi Q8 S Line y experimenta la combinación perfecta de lujo y rendimiento en un solo automóvil. Con su diseño elegante y deportivo, el Audi Q8 S Line te cautivará desde el primer momento.',
      marca: 'Audi',
      modelo: 'Q8 S Line',
      potenciaHp: '231',
      velocidad: '233',
      aceleracion: '7.1',
      precioDia: 400,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 1,
          img: AudiQ8SLine1,
          es_principal: true
        },
        {
          id: 2,
          img: AudiQ8SLine2,
          es_principal: false
        },
        {
          id: 3,
          img: AudiQ8SLine3,
          es_principal: false
        },
        {
          id: 4,
          img: AudiQ8SLine4,
          es_principal: false
        },
        {
          id: 5,
          img: AudiQ8SLine5,
          es_principal: false
        }
      ],
      categorias: [
        'SUV'
      ]
    },
    {
      id: 2,
      matricula: 'ASD123',
      descripcion: '¿Te gustaría conducir un coche deportivo de prestigio? Alquila un Audi RS 6 Avant y disfruta de una dinámica y un lujo insuperables en cada detalle. Descubre la combinación perfecta de potencia, estilo y funcionalidad en un solo vehículo con este deportivo que redefine las expectativas, ofreciendo una experiencia de conducción emocionante y versátil.',
      marca: 'Audi',
      modelo: 'RS6 Avant',
      potenciaHp: '600',
      velocidad: '250',
      aceleracion: '3.6',
      precioDia: 749,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 6,
          img: AudiRS6Avant1,
          es_principal: true
        },
        {
          id: 7,
          img: AudiRS6Avant2,
          es_principal: false
        },
        {
          id: 8,
          img: AudiRS6Avant3,
          es_principal: false
        },
        {
          id: 9,
          img: AudiRS6Avant4,
          es_principal: false
        },
        {
          id: 10,
          img: AudiRS6Avant5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports',
        'Premium'
      ]
    },
    {
      id: 3,
      matricula: 'ZXC123',
      descripcion: 'Alquila un Bentley Continental GTC y experimenta la emoción de conducir un automóvil de élite. ¿Listo para descubrir un mundo de lujo y exclusividad en su máxima expresión?',
      marca: 'Bentley',
      modelo: 'Continental GTC',
      potenciaHp: '550',
      velocidad: '318',
      aceleracion: '4.1',
      precioDia: 1199,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 11,
          img: BentleyContinentalGTC1,
          es_principal: true
        },
        {
          id: 12,
          img: BentleyContinentalGTC2,
          es_principal: false
        },
        {
          id: 13,
          img: BentleyContinentalGTC3,
          es_principal: false
        },
        {
          id: 14,
          img: BentleyContinentalGTC4,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 4,
      matricula: 'RTY123',
      descripcion: '¿Te gustaría descubrir una ciudad o bordear una carretera de playa con un descapotable? Alquila un BMW M4 Cabrio Competition y experimenta la máxima emoción al volante de este deportivo descapotable de alta gama.',
      marca: 'BMW',
      modelo: 'M4 Cabrio Competition',
      potenciaHp: '510',
      velocidad: '250',
      aceleracion: '3.4',
      precioDia: 599,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 15,
          img: BMWM4Cabrio1,
          es_principal: true
        },
        {
          id: 16,
          img: BMWM4Cabrio2,
          es_principal: false
        },
        {
          id: 17,
          img: BMWM4Cabrio3,
          es_principal: false
        },
        {
          id: 18,
          img: BMWM4Cabrio4,
          es_principal: false
        },
        {
          id: 19,
          img: BMWM4Cabrio5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports',
        'Premium'
      ]
    },
    {
      id: 5,
      matricula: 'FGH123',
      descripcion: 'Si deseas conducir un SUV de lujo con un diseño imponente, tecnología de vanguardia y un rendimiento excepcional el BMW X7 40D 2024 es tu vehículo ideal. Descubre la excelencia en cada detalle y vive una experiencia de conducción inigualable con tu familia.',
      marca: 'BMW',
      modelo: 'X7 40D',
      potenciaHp: '340',
      velocidad: '250',
      aceleracion: '6.1',
      precioDia: 449,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 20,
          img: BMWX740d1,
          es_principal: true
        },
        {
          id: 21,
          img: BMWX740d2,
          es_principal: false
        },
        {
          id: 22,
          img: BMWX740d3,
          es_principal: false
        },
        {
          id: 23,
          img: BMWX740d4,
          es_principal: false
        },
        {
          id: 24,
          img: BMWX740d5,
          es_principal: false
        },
        {
          id: 25,
          img: BMWX740d6,
          es_principal: false
        },
        {
          id: 26,
          img: BMWX740d7,
          es_principal: false
        },
        {
          id: 27,
          img: BMWX740d8,
          es_principal: false
        }
      ],
      categorias: [
        'SUV'
      ]
    },
    {
      id: 6,
      matricula: 'VBN123',
      descripcion: '¿Por qué conformarte con un coche convencional cuando puedes vivir la experiencia de conducir un Ferrari? Alquila un Ferrari 296 GTB y adéntrate en el mundo de la potencia y la sofisticación con un deportivo de última generación que combina la elegancia y la innovación tecnológica para brindarte una experiencia de conducción inigualable.',
      marca: 'Ferrari',
      modelo: '296 GTB',
      potenciaHp: '830',
      velocidad: '330',
      aceleracion: '2.9',
      precioDia: 1649,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 28,
          img: Ferrari296GTB1,
          es_principal: true
        },
        {
          id: 29,
          img: Ferrari296GTB2,
          es_principal: false
        },
        {
          id: 30,
          img: Ferrari296GTB3,
          es_principal: false
        },
        {
          id: 31,
          img: Ferrari296GTB4,
          es_principal: false
        },
        {
          id: 32,
          img: Ferrari296GTB5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 7,
      matricula: 'UIO123',
      descripcion: '',
      marca: 'Ferrari',
      modelo: '296 GTS',
      potenciaHp: '830',
      velocidad: '330',
      aceleracion: '2.9',
      precioDia: 1749,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 33,
          img: Ferrari296GTS1,
          es_principal: true
        },
        {
          id: 34,
          img: Ferrari296GTS2,
          es_principal: false
        },
        {
          id: 35,
          img: Ferrari296GTS3,
          es_principal: false
        },
        {
          id: 36,
          img: Ferrari296GTS4,
          es_principal: false
        },
        {
          id: 37,
          img: Ferrari296GTS5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 8,
      matricula: 'JKL123',
      descripcion: '¿Te gustaría conducir un Ferrari descapotable? Haz realidad tu sueño y alquila un Ferrari 488 Spider para vivir una experiencia de conducción inigualable.',
      marca: 'Ferrari',
      modelo: '488 Spider',
      potenciaHp: '670',
      velocidad: '330',
      aceleracion: '3',
      precioDia: 1349,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 38,
          img: Ferrari488Spider1,
          es_principal: true
        },
        {
          id: 39,
          img: Ferrari488Spider2,
          es_principal: false
        },
        {
          id: 40,
          img: Ferrari488Spider3,
          es_principal: false
        },
        {
          id: 41,
          img: Ferrari488Spider4,
          es_principal: false
        },
        {
          id: 42,
          img: Ferrari488Spider5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 9,
      matricula: 'VBN123',
      descripcion: '¿Alguna vez has soñado con conducir un Ferrari? Ahora es tu oportunidad de hacerlo realidad. Alquila un Ferrari F8 Spider y experimenta la emoción de conducir un superdeportivo de alta gama por carreteras de ensueño.',
      marca: 'Ferrari',
      modelo: 'F8 Spider',
      potenciaHp: '720',
      velocidad: '340',
      aceleracion: '2.9',
      precioDia: 1649,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 43,
          img: FerrariF8Spider1,
          es_principal: true
        },
        {
          id: 44,
          img: FerrariF8Spider2,
          es_principal: false
        },
        {
          id: 45,
          img: FerrariF8Spider3,
          es_principal: false
        },
        {
          id: 46,
          img: FerrariF8Spider4,
          es_principal: false
        },
        {
          id: 47,
          img: FerrariF8Spider5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 10,
      matricula: 'QWE456',
      descripcion: '¿Te gustaría disfrutar de una experiencia de conducción única? Alquila un Ferrari Portofino y descubre lo emocionante que puede ser manejar un superdeportivo de alto rendimiento. Este convertible no solo es un lujo en movimiento, sino también una fuente de emociones intensas y una experiencia visualmente impactante.​',
      marca: 'Ferrari',
      modelo: 'Portofino',
      potenciaHp: '600',
      velocidad: '320',
      aceleracion: '3.5',
      precioDia: 1249,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 48,
          img: FerrariPortofino1,
          es_principal: true
        },
        {
          id: 49,
          img: FerrariPortofino2,
          es_principal: false
        },
        {
          id: 50,
          img: FerrariPortofino3,
          es_principal: false
        },
        {
          id: 51,
          img: FerrariPortofino4,
          es_principal: false
        },
        {
          id: 52,
          img: FerrariPortofino5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 11,
      matricula: 'ASD456',
      descripcion: 'Si siempre has soñado en conducir un vehículo icónico, ahora es tu oportunidad de hacerlo realidad. Alquila un Ford Mustang 5.0 Cabrio GT y vive la experiencia de conducir este clásico moderno.',
      marca: 'Ford',
      modelo: 'Mustang GT 5.0 Cabrio',
      potenciaHp: '450',
      velocidad: '249',
      aceleracion: '4.8',
      precioDia: 400,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 53,
          img: FordMustangGTCabrio1,
          es_principal: true
        },
        {
          id: 54,
          img: FordMustangGTCabrio2,
          es_principal: false
        },
        {
          id: 55,
          img: FordMustangGTCabrio3,
          es_principal: false
        },
        {
          id: 56,
          img: FordMustangGTCabrio4,
          es_principal: false
        },
        {
          id: 57,
          img: FordMustangGTCabrio5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 12,
      matricula: 'ZXC456',
      descripcion: '¿Quieres sentir una experiencia única al volante? Alquila un Lamborghini Huracán EVO Spyder y despierta todos tus sentidos. La sofisticación de su diseño y un rendimiento excepcional te harán vivir una experiencia inolvidable.',
      marca: 'Lamborghini',
      modelo: 'Huracán EVO Spyder',
      potenciaHp: '640',
      velocidad: '325',
      aceleracion: '2.9',
      precioDia: 1499,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 58,
          img: LamborghiniHuracanEvoSpyder1,
          es_principal: true
        },
        {
          id: 59,
          img: LamborghiniHuracanEvoSpyder2,
          es_principal: false
        },
        {
          id: 60,
          img: LamborghiniHuracanEvoSpyder3,
          es_principal: false
        },
        {
          id: 61,
          img: LamborghiniHuracanEvoSpyder4,
          es_principal: false
        },
        {
          id: 62,
          img: LamborghiniHuracanEvoSpyder5,
          es_principal: false
        },
        {
          id: 63,
          img: LamborghiniHuracanEvoSpyder6,
          es_principal: false
        },
        {
          id: 64,
          img: LamborghiniHuracanEvoSpyder7,
          es_principal: false
        },
        {
          id: 65,
          img: LamborghiniHuracanEvoSpyder8,
          es_principal: false
        },
        {
          id: 66,
          img: LamborghiniHuracanEvoSpyder9,
          es_principal: false
        },
        {
          id: 67,
          img: LamborghiniHuracanEvoSpyder10,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 13,
      matricula: 'RTY456',
      descripcion: '¿Te interesa vivir una experiencia de conducción emocionante y vibrante? Alquilar un Lamborghini Huracán Tecnica puede ser tu mejor elección. Este superdeportivo no solo ofrece un diseño elegante, sino que también garantiza un rendimiento espectacular, combinando a la perfección la belleza con la eficacia aerodinámica.',
      marca: 'Lamborghini',
      modelo: 'Huracán Tecnica',
      potenciaHp: '604',
      velocidad: '325',
      aceleracion: '3.2',
      precioDia: 1749,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 68,
          img: LamborghiniHuracanTecnica1,
          es_principal: true
        },
        {
          id: 69,
          img: LamborghiniHuracanTecnica2,
          es_principal: false
        },
        {
          id: 70,
          img: LamborghiniHuracanTecnica3,
          es_principal: false
        },
        {
          id: 71,
          img: LamborghiniHuracanTecnica4,
          es_principal: false
        },
        {
          id: 72,
          img: LamborghiniHuracanTecnica5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 14,
      matricula: 'FGH456',
      descripcion: '¿Quieres disfrutar de la esencia de un superdeportivo con la funcionalidad de un SUV? Alquila un Lamborghini Urus y vive una experiencia de conducción única.',
      marca: 'Lamborghini',
      modelo: 'Urus',
      potenciaHp: '650',
      velocidad: '305',
      aceleracion: '3.6',
      precioDia: 1499,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 73,
          img: LamborghiniUrus1,
          es_principal: true
        },
        {
          id: 74,
          img: LamborghiniUrus2,
          es_principal: false
        },
        {
          id: 75,
          img: LamborghiniUrus3,
          es_principal: false
        },
        {
          id: 76,
          img: LamborghiniUrus4,
          es_principal: false
        },
        {
          id: 77,
          img: LamborghiniUrus5,
          es_principal: false
        }
      ],
      categorias: [
        'Sports',
        'SUV'
      ]
    },
    {
      id: 15,
      matricula: 'VBN456',
      descripcion: '¿Quieres adentrarte en el mundo de los SUV deportivos de lujo? Con esencia de superdeportivo y la funcionalidad de un SUV, el Lamborghini Urus Sport combina la elegancia y el lujo del Lamborghini Urus con elementos deportivos que llevan la experiencia de conducción a otro nivel.',
      marca: 'Lamborghini',
      modelo: 'Urus S',
      potenciaHp: '666',
      velocidad: '305',
      aceleracion: '3.5',
      precioDia: 1649,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 78,
          img: LamborghiniUrusS1,
          es_principal: true
        },
        {
          id: 79,
          img: LamborghiniUrusS2,
          es_principal: false
        },
        {
          id: 80,
          img: LamborghiniUrusS3,
          es_principal: false
        },
        {
          id: 81,
          img: LamborghiniUrusS4,
          es_principal: false
        },
        {
          id: 82,
          img: LamborghiniUrusS5,
          es_principal: false
        },
        {
          id: 83,
          img: LamborghiniUrusS6,
          es_principal: false
        }
      ],
      categorias: [
        'Sports',
        'SUV'
      ]
    },
    {
      id: 16,
      matricula: 'UIO456',
      descripcion: '¿Te gustaría conducir una furgoneta de alta gama? Alquila un Mercedes-Benz Clase V y descubre la elegancia y el lujo combinados con la versatilidad y el confort..',
      marca: 'Mercedes',
      modelo: 'Clase V',
      potenciaHp: '239',
      velocidad: '206',
      aceleracion: '8.5',
      precioDia: 299,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 84,
          img: MercedesClaseV1,
          es_principal: true
        },
        {
          id: 85,
          img: MercedesClaseV2,
          es_principal: false
        },
        {
          id: 86,
          img: MercedesClaseV3,
          es_principal: false
        }
      ],
      categorias: [
        'Premium'
      ]
    },
    {
      id: 17,
      matricula: 'JKL456',
      descripcion: '¿Quieres vivir una experiencia de conducción única al volante de un icónico SUV? Alquila un Mercedes G63 AMG y adéntrate en el mundo del lujo, la potencia y el rendimiento.',
      marca: 'Mercedes',
      modelo: 'G63 AMG',
      potenciaHp: '585',
      velocidad: '220',
      aceleracion: '4.5',
      precioDia: 949,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 87,
          img: MercedesG63AMG1,
          es_principal: true
        },
        {
          id: 88,
          img: MercedesG63AMG2,
          es_principal: false
        },
        {
          id: 89,
          img: MercedesG63AMG3,
          es_principal: false
        },
        {
          id: 90,
          img: MercedesG63AMG4,
          es_principal: false
        },
        {
          id: 91,
          img: MercedesG63AMG5,
          es_principal: false
        },
        {
          id: 92,
          img: MercedesG63AMG6,
          es_principal: false
        }
      ],
      categorias: [
        'Premium',
        'SUV'
      ]
    },
    {
      id: 18,
      matricula: 'QWE789',
      descripcion: '¿Quieres adentrarte en el mundo del automovilismo de alto rendimiento? Alquila un Porsche 718 Boxster GTS 4.0 y descubre la fusión perfecta entre elegancia y deportividad.',
      marca: 'Porsche',
      modelo: '718 Boxster GTS 4.0',
      potenciaHp: '400',
      velocidad: '293',
      aceleracion: '4.5',
      precioDia: 599,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 93,
          img: Porsche718BoxsterGTS1,
          es_principal: true
        },
        {
          id: 94,
          img: Porsche718BoxsterGTS2,
          es_principal: false
        },
        {
          id: 95,
          img: Porsche718BoxsterGTS3,
          es_principal: false
        },
        {
          id: 96,
          img: Porsche718BoxsterGTS4,
          es_principal: false
        },
        {
          id: 97,
          img: Porsche718BoxsterGTS5,
          es_principal: false
        },
        {
          id: 98,
          img: Porsche718BoxsterGTS6,
          es_principal: false
        },
        {
          id: 99,
          img: Porsche718BoxsterGTS7,
          es_principal: false
        }
      ],
      categorias: [
        'Sports'
      ]
    },
    {
      id: 19,
      matricula: 'ASD789',
      descripcion: '¿Sueñas con conducir un Porsche? Alquila un Porsche 992 GT3 y experimenta el placer de conducir este icónico superdeportivo descapotable por carreteras de ensueño.',
      marca: 'Porsche',
      modelo: '992 GT3',
      potenciaHp: '510',
      velocidad: '293',
      aceleracion: '3.9',
      precioDia: 949,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 100,
          img: Porsche992GT31,
          es_principal: true
        },
        {
          id: 101,
          img: Porsche992GT32,
          es_principal: false
        },
        {
          id: 102,
          img: Porsche992GT33,
          es_principal: false
        },
        {
          id: 103,
          img: Porsche992GT34,
          es_principal: false
        },
        {
          id: 104,
          img: Porsche992GT35,
          es_principal: false
        },
        {
          id: 105,
          img: Porsche992GT36,
          es_principal: false
        }
      ],
      categorias: [
        'Sports',
        'Premium'
      ]
    },
    {
      id: 20,
      matricula: 'ZXC789',
      descripcion: '¿Sueñas con conducir un Porsche? Alquila un Porsche 911-992 Carrera S Cabrio y experimenta el placer de conducir este icónico superdeportivo descapotable por carreteras de ensueño.',
      marca: 'Porsche',
      modelo: '911-992 Carrera S Cabrio',
      potenciaHp: '450',
      velocidad: '308',
      aceleracion: '3.7',
      precioDia: 799,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 106,
          img: PorscheCarreraSCabrio1,
          es_principal: true
        },
        {
          id: 107,
          img: PorscheCarreraSCabrio2,
          es_principal: false
        },
        {
          id: 108,
          img: PorscheCarreraSCabrio3,
          es_principal: false
        },
        {
          id: 109,
          img: PorscheCarreraSCabrio4,
          es_principal: false
        },
        {
          id: 110,
          img: PorscheCarreraSCabrio5,
          es_principal: false
        },
        {
          id: 111,
          img: PorscheCarreraSCabrio6,
          es_principal: false
        }
      ],
      categorias: [
        'Sports',
        'Premium'
      ]
    },
    {
      id: 21,
      matricula: 'RTY789',
      descripcion: '¿Buscas lujo, versatilidad y rendimiento? Alquila un Range Rover Sport y vive una experiencia de conducción excepcional en todo tipos de carreteras, ya sean pavimentadas o en terrenos más desafiantes.',
      marca: 'Range Rover',
      modelo: 'Sport Dynamic SE MHEV',
      potenciaHp: '300',
      velocidad: '209',
      aceleracion: '7.3',
      precioDia: 449,
      año: '2023',
      estaActivo: true,
      imagenes: [
        {
          id: 112,
          img: RangeRoverSportDynamicSEMHEV1,
          es_principal: true
        },
        {
          id: 113,
          img: RangeRoverSportDynamicSEMHEV2,
          es_principal: false
        },
        {
          id: 114,
          img: RangeRoverSportDynamicSEMHEV3,
          es_principal: false
        },
        {
          id: 115,
          img: RangeRoverSportDynamicSEMHEV4,
          es_principal: false
        }
      ],
      categorias: [
        'SUV'
      ]
    }
  ]
}
