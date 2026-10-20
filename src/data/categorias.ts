export type CategoriaKey =
  | 'entrenamiento'
  | 'material'
  | 'nutricion'
  | 'salud'
  | 'carreras';

export type Categoria = {
  slug: CategoriaKey;
  name: string;
  description: string;
  tone: string;
};

export const CATEGORIAS: Record<CategoriaKey, Categoria> = {
  entrenamiento: {
    slug: 'entrenamiento',
    name: 'Entrenamiento',
    description:
      'Planes, ritmos y sesiones para correr mejor sin vivir lesionado. Menos épica, más constancia.',
    tone: '#123F52',
  },
  material: {
    slug: 'material',
    name: 'Material',
    description:
      'Zapatillas, relojes y todo lo que se gasta. Qué importa, qué es marketing y cuándo jubilar algo.',
    tone: '#8A3B20',
  },
  nutricion: {
    slug: 'nutricion',
    name: 'Nutrición',
    description:
      'Qué comer, cuándo beber y qué no complicar antes de salir. Sin dietas milagro.',
    tone: '#6B5A1B',
  },
  salud: {
    slug: 'salud',
    name: 'Salud',
    description:
      'Lesiones, recuperación y sueño. Cuándo apretar, cuándo parar y a quién preguntar.',
    tone: '#1B5C5A',
  },
  carreras: {
    slug: 'carreras',
    name: 'Carreras',
    description:
      'De tu primera media maratón a la maratón. Planes, semanas de descarga y día de carrera.',
    tone: '#1C2559',
  },
};

export const CATEGORIA_LIST = Object.values(CATEGORIAS);

export function getCategoria(key: CategoriaKey): Categoria {
  return CATEGORIAS[key];
}
