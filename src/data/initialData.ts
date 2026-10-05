import { WorkerItem, EppCategory } from '../types';

export const WORKERS_LIST: WorkerItem[] = [
  // Trabajadores de Nómina Principal (Items 1 a 56 del archivo Excel)
  { id: '1', name: 'ACOSTA LUIS', category: 'principal' },
  { id: '2', name: 'JAIDER ARIAS', category: 'principal' },
  { id: '3', name: 'ARRIETA BASILIO', category: 'principal' },
  { id: '4', name: 'BARBOSA TORRES JOSÉ', category: 'principal' },
  { id: '5', name: 'BARROS CANTLLO JOSE', category: 'principal' },
  { id: '6', name: 'BROCHERO WILMER', category: 'principal' },
  { id: '7', name: 'CAMPO DEVIA JOSE', category: 'principal' },
  { id: '8', name: 'CALDERON ISMAEL', category: 'principal' },
  { id: '9', name: 'CANCHANO STALIN', category: 'principal' },
  { id: '10', name: 'CANTILLO JOSE', category: 'principal' },
  { id: '11', name: 'CARRILLO CARLOS', category: 'principal' },
  { id: '12', name: 'CASTILLO FRANCO', category: 'principal' },
  { id: '13', name: 'CHIQUILLO ALEXIS', category: 'principal' },
  { id: '14', name: 'CORREA ALEXANDER', category: 'principal' },
  { id: '15', name: 'CORREA RUBEN', category: 'principal' },
  { id: '16', name: 'FERNANDEZ FRANK', category: 'principal' },
  { id: '17', name: 'FONTALVO ALDEMIR', category: 'principal' },
  { id: '18', name: 'FRAGOZO ROBINSON', category: 'principal' },
  { id: '19', name: 'GARCIA FRANKLIN', category: 'principal' },
  { id: '20', name: 'ZAMIR GOMEZ', category: 'principal' },
  { id: '21', name: 'GOMEZ HENNER', category: 'principal' },
  { id: '22', name: 'GUERRA ARISTIDES', category: 'principal' },
  { id: '23', name: 'GUILLEN JAILKAR', category: 'principal' },
  { id: '24', name: 'HENRIQUEZ DWITH', category: 'principal' },
  { id: '25', name: 'HERNANDEZ FABIAN', category: 'principal' },
  { id: '26', name: 'JIMENEZ ALEX', category: 'principal' },
  { id: '27', name: 'JIMENEZ RUBEN', category: 'principal' },
  { id: '28', name: 'JIMENEZ CESAR', category: 'principal' },
  { id: '29', name: 'LECHUGA JAIR', category: 'principal' },
  { id: '30', name: 'LOPEZ JOLVER', category: 'principal' },
  { id: '31', name: 'MANGA HAROLD', category: 'principal' },
  { id: '32', name: 'MARQUEZ MANUEL', category: 'principal' },
  { id: '33', name: 'MARQUEZ SANTIAGO', category: 'principal' },
  { id: '34', name: 'MONTALVO DANIEL', category: 'principal' },
  { id: '35', name: 'MONTENEGRO EDUARDO', category: 'principal' },
  { id: '36', name: 'MORA JEFFERSON', category: 'principal' },
  { id: '37', name: 'MOZO CARLOS', category: 'principal' },
  { id: '38', name: 'NUÑEZ JUAN ANDRES', category: 'principal' },
  { id: '39', name: 'OCHOA JORGE', category: 'principal' },
  { id: '40', name: 'ORTIZ EDER', category: 'principal' },
  { id: '41', name: 'ORTIZ RODRIGO', category: 'principal' },
  { id: '42', name: 'PABON HURTADO ANGEL', category: 'principal' },
  { id: '43', name: 'PALACIO JHON', category: 'principal' },
  { id: '44', name: 'PAREDES JANDRY', category: 'principal' },
  { id: '45', name: 'PEREA JAIME', category: 'principal' },
  { id: '46', name: 'RIOS JENIFFER', category: 'principal' },
  { id: '47', name: 'RIVERA JAIME', category: 'principal' },
  { id: '48', name: 'ROMERO ANDRES', category: 'principal' },
  { id: '49', name: 'SALAZAR LIZANDRO', category: 'principal' },
  { id: '50', name: 'SANJUAN ANYELY', category: 'principal' },
  { id: '51', name: 'SILVA MANUEL', category: 'principal' },
  { id: '52', name: 'SOSA OSCAR', category: 'principal' },
  { id: '53', name: 'TRUJILLO JAIME', category: 'principal' },
  { id: '54', name: 'URIBE JUAN', category: 'principal' },
  { id: '55', name: 'VEGA DEIVI', category: 'principal' },
  { id: '56', name: 'ZARATE RAUL', category: 'principal' },

  // Contratistas / Personal Adicional / Visitantes (Items 59 a 98 del Excel)
  { id: '59', name: 'YAISON LEIVA', category: 'contratista' },
  { id: '60', name: 'JOSE GARCIA', category: 'contratista' },
  { id: '61', name: 'CARLOS SEGOVIA', category: 'contratista' },
  { id: '62', name: 'ROLAND VERGARA', category: 'contratista' },
  { id: '63', name: 'ANTONIO PALACIO', category: 'contratista' },
  { id: '64', name: 'LUIS DUARTE', category: 'contratista' },
  { id: '65', name: 'VICKY MARTINEZ', category: 'contratista' },
  { id: '66', name: 'IVANIA SALAS', category: 'contratista' },
  { id: '67', name: 'JERRY RIVERA', category: 'contratista' },
  { id: '68', name: 'CARLOS SEGOVIA (2)', category: 'contratista' },
  { id: '69', name: 'FRANCISCO LIZARAZO', category: 'contratista' },
  { id: '70', name: 'DEIBI BARCASNEGRAS', category: 'contratista' },
  { id: '71', name: 'WALDI', category: 'contratista' },
  { id: '72', name: 'VICTORIA GRAJAIRO', category: 'contratista' },
  { id: '73', name: 'WENDY PIMIENTO', category: 'contratista' },
  { id: '74', name: 'MARTINEZ NICOLAY', category: 'contratista' },
  { id: '75', name: 'OSPINO JESUS', category: 'contratista' },
  { id: '76', name: 'PALACIO ANTONIO', category: 'contratista' },
  { id: '77', name: 'CARDENAS MARGARITA', category: 'contratista' },
  { id: '78', name: 'INGENIERA YONA', category: 'contratista' },
  { id: '79', name: 'ERIKA DE LAS SALAS', category: 'contratista' },
  { id: '80', name: 'HEIBAR BORJA', category: 'contratista' },
  { id: '81', name: 'MÁS VERDE', category: 'contratista' },
  { id: '82', name: 'PEDRO SERPA', category: 'contratista' },
  { id: '83', name: 'JOSE SALAS', category: 'contratista' },
  { id: '84', name: 'ARTUR VARGAS', category: 'contratista' },
  { id: '85', name: 'CONTRATISTAS PRUEBA', category: 'contratista' },
  { id: '86', name: 'RAFAEL LÓPEZ', category: 'contratista' },
  { id: '87', name: 'NESTOR SURA', category: 'contratista' },
  { id: '88', name: 'FON DE ARGOS', category: 'contratista' },
  { id: '89', name: 'ANA MARIA DADSA', category: 'contratista' },
  { id: '90', name: 'VIVIANA SILVA DADSA', category: 'contratista' },
  { id: '91', name: 'BITU BLANCO DADSA', category: 'contratista' },
  { id: '92', name: 'MONICA VASQUEZ', category: 'contratista' },
  { id: '93', name: 'RONNY ARGOS', category: 'contratista' },
  { id: '94', name: 'JOSE PADILLA', category: 'contratista' },
  { id: '95', name: 'OLGA OVIEDO', category: 'contratista' },
  { id: '96', name: 'JUAN ITURRIAGO', category: 'contratista' },
  { id: '97', name: 'GLEIBER ARANGO', category: 'contratista' },
  { id: '98', name: 'VISITANTES', category: 'contratista' }
];

export const EPP_CATEGORIES: EppCategory[] = [
  {
    id: 'guantes',
    name: 'Guantes',
    icon: '🧤',
    bgColor: 'bg-amber-50 hover:bg-amber-100',
    textColor: 'text-amber-950',
    borderColor: 'border-amber-300',
    variants: [
      {
        id: 'guante_gris_corte',
        name: 'Guante Gris Resistente al Corte',
        excelColumn: 'Guante Grises R. corte',
        sizes: ['T9', 'T10'],
        helperText: 'Guante gris anticorte especial para trabajo pesado'
      },
      {
        id: 'guante_negro',
        name: 'Guante Negro',
        excelColumn: 'Guante Negro',
        sizes: ['T8', 'T9', 'T10'],
        helperText: 'Guante de protección color negro'
      },
      {
        id: 'guante_verde',
        name: 'Guante Verde',
        excelColumn: 'Guante Verde',
        sizes: ['T9', 'T10'],
        helperText: 'Guante de nitrilo / protección color verde'
      },
      {
        id: 'guante_palma_azul',
        name: 'Guante Palma Azul',
        excelColumn: 'Guante palma azul',
        sizes: ['T9', 'T10'],
        helperText: 'Guante con recubrimiento de palma azul'
      },
      {
        id: 'guante_nitrilo_azul',
        name: 'Guante Full Nitrilo (Azules)',
        excelColumn: 'Guante full nitrillo (azules)',
        helperText: 'Guante 100% recubierto de nitrilo azul'
      },
      {
        id: 'guante_amarillo_largo',
        name: 'Guante Amarillo Largo',
        excelColumn: 'Guante amarillo Largo',
        helperText: 'Guante de caucho amarillo caña larga'
      },
      {
        id: 'guante_barrier_ansell',
        name: 'Guante Barrier Ansell (TMO)',
        excelColumn: 'GUANTE BARRIER ANSELL T9 (TMO)',
        sizes: ['T9'],
        helperText: 'Guante químico Ansell Barrier'
      }
    ]
  },
  {
    id: 'gafas',
    name: 'Gafas',
    icon: '🥽',
    bgColor: 'bg-sky-50 hover:bg-sky-100',
    textColor: 'text-sky-950',
    borderColor: 'border-sky-300',
    variants: [
      {
        id: 'gafas_negras',
        name: 'Gafas Negras (Oscuras)',
        excelColumn: 'Gafas Negras',
        helperText: 'Protección ocular para exteriores y luz solar'
      },
      {
        id: 'gafas_transparentes',
        name: 'Gafas Transparentes (Claras)',
        excelColumn: 'Gafas Transp',
        helperText: 'Protección contra partículas e impactos en interiores'
      },
      {
        id: 'monogafas',
        name: 'Mono Gafas',
        excelColumn: 'Mono gafas',
        helperText: 'Monogafas selladas contra salpicaduras y polvo'
      }
    ]
  },
  {
    id: 'cascos',
    name: 'Casco y Cabeza',
    icon: '⛑️',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100',
    textColor: 'text-emerald-950',
    borderColor: 'border-emerald-300',
    variants: [
      {
        id: 'casco_amarillo',
        name: 'Casco Amarillo',
        excelColumn: 'Casco amarillo',
        helperText: 'Casco de seguridad tipo I/II color amarillo'
      },
      {
        id: 'casco_rojo',
        name: 'Casco Rojo',
        excelColumn: 'Casco Rojo',
        helperText: 'Casco de seguridad color rojo (Brigada / Supervisión)'
      },
      {
        id: 'casco_verde',
        name: 'Casco Verde',
        excelColumn: 'Casco Verde',
        helperText: 'Casco de seguridad color verde'
      },
      {
        id: 'barbuquejo',
        name: 'Barbuquejo',
        excelColumn: 'Barbuquejo',
        helperText: 'Banda elástica con mentonera para ajuste del casco'
      },
      {
        id: 'tafilete',
        name: 'Tafilete',
        excelColumn: 'Tafilete',
        helperText: 'Suspensión interna ajustable para casco'
      }
    ]
  },
  {
    id: 'respiratoria',
    name: 'Mascarilla y Respirador',
    icon: '😷',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100',
    textColor: 'text-indigo-950',
    borderColor: 'border-indigo-300',
    variants: [
      {
        id: 'mascarilla_desechable',
        name: 'Mascarilla Desechable',
        excelColumn: 'Mascarilla Desechable',
        helperText: 'Tapabocas desechable para polvo y partículas'
      },
      {
        id: 'mascarilla_lavable',
        name: 'Mascarilla Lavable',
        excelColumn: 'Mascarilla Lavable',
        helperText: 'Mascarilla de tela reutilizable lavable'
      },
      {
        id: 'respirador_media_cara',
        name: 'Respirador Media Cara',
        excelColumn: 'RESPIRADOR MEDIA CARA',
        helperText: 'Pieza facial elastomérica de media cara'
      },
      {
        id: 'filtro_3m_7093',
        name: 'Filtro 3M 7093 P-100',
        excelColumn: 'FILTRO 3M 7093 P-100',
        helperText: 'Par de filtros de alta eficiencia para partículas y humo'
      }
    ]
  },
  {
    id: 'auditiva',
    name: 'Protección Auditiva',
    icon: '🎧',
    bgColor: 'bg-violet-50 hover:bg-violet-100',
    textColor: 'text-violet-950',
    borderColor: 'border-violet-300',
    variants: [
      {
        id: 'protector_copa',
        name: 'Protector de Copa',
        excelColumn: 'Protector de copa',
        helperText: 'Protector tipo orejera para alto nivel de ruido'
      },
      {
        id: 'protector_insercion',
        name: 'Protector de Inserción',
        excelColumn: 'Protector de Inserción',
        helperText: 'Tapones auditivos de silicona o espuma'
      }
    ]
  },
  {
    id: 'alturas',
    name: 'Trabajo en Alturas',
    icon: '🧗',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
    textColor: 'text-orange-950',
    borderColor: 'border-orange-300',
    variants: [
      {
        id: 'arnes',
        name: 'Arnés de Seguridad',
        excelColumn: 'Arnes',
        helperText: 'Arnés de cuerpo entero multipropósito'
      },
      {
        id: 'eslinga',
        name: 'Eslinga',
        excelColumn: 'Eslinga',
        helperText: 'Eslinga de restricción / posicionamiento'
      },
      {
        id: 'arrestador',
        name: 'Arrestador de Caídas',
        excelColumn: 'Arrestador',
        helperText: 'Freno arrestador para línea de vida'
      }
    ]
  },
  {
    id: 'dotacion',
    name: 'Chaleco y Accesorios',
    icon: '🦺',
    bgColor: 'bg-teal-50 hover:bg-teal-100',
    textColor: 'text-teal-950',
    borderColor: 'border-teal-300',
    variants: [
      {
        id: 'chaleco',
        name: 'Chaleco Reflectivo',
        excelColumn: 'Chaleco',
        helperText: 'Chaleco de alta visibilidad con bandas reflectivas'
      },
      {
        id: 'porta_carnet',
        name: 'Porta Carnet',
        excelColumn: 'Porta carnet',
        helperText: 'Funda o brazalete porta carnet de identificación'
      }
    ]
  },
  {
    id: 'otro',
    name: 'Otro Elemento',
    icon: '📦',
    bgColor: 'bg-stone-50 hover:bg-stone-100',
    textColor: 'text-stone-950',
    borderColor: 'border-stone-300',
    variants: [
      {
        id: 'otro_epp',
        name: 'Otro Elemento Especial',
        excelColumn: 'Otro ¿Cuál? Describalo y coloque cantidad',
        requiresDescription: true,
        helperText: 'Escriba brevemente qué elemento se entrega'
      }
    ]
  }
];

// Lista consolidada de todas las columnas EPP del Excel original
export const EXCEL_COLUMNS_ORIGINAL: string[] = [
  'Gafas Negras',
  'Gafas Transp',
  'Mono gafas',
  'Guante Grises R. corte T9',
  'Guante Grises R. corte T10',
  'Guante full nitrillo (azules)',
  'Guante Negro T8',
  'Guante Negro T9',
  'Guante Negro T10',
  'Guante Verde T=9',
  'Guandes verde T10',
  'Guante amarillo Largo',
  'Guante palma azul T9',
  'Guante palma azul T10',
  'Protector de copa',
  'Protector de Inserción',
  'Barbuquejo',
  'Mascarilla Desechable',
  'Mascarilla Lavable',
  'RESPIRADOR MEDIA CARA',
  'FILTRO 3M 7093 P-100',
  'Tafilete',
  'Casco amarillo',
  'Casco Rojo',
  'Casco Verde',
  'Chaleco',
  'Arnes',
  'Eslinga',
  'Arrestador',
  'GUANTE BARRIER ANSELL T9 (TMO)',
  'Porta carnet',
  'Otro ¿Cuál? Describalo y coloque cantidad'
];
