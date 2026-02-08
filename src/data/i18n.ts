// Internationalization (i18n) system for multi-language support

export type Language = 'en' | 'es' | 'fr' | 'pt';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export interface Translations {
  // Navigation
  dashboard: string;
  progress: string;
  course: string;
  favorites: string;
  journal: string;
  resources: string;
  language: string;

  // Common
  back: string;
  next: string;
  previous: string;
  complete: string;
  completed: string;
  markComplete: string;
  loading: string;
  error: string;
  search: string;
  filter: string;
  delete: string;
  edit: string;
  save: string;
  cancel: string;

  // Course
  courseWeeks: string;
  overview: string;
  week: string;
  day: string;
  lesson: string;

  // Dashboard
  overallProgress: string;
  lessonsCompleted: string;
  currentStreak: string;
  daysOfConsistentPrayer: string;
  dayOfConsistentPrayer: string;
  milestonesAchieved: string;
  weeklyProgress: string;

  // Lesson
  weekFocus: string;
  scriptureReference: string;
  prayerFocus: string;
  nextSteps: string;
  addNote: string;

  // Favorites
  myFavorites: string;
  noFavoritesYet: string;
  markAsFavorite: string;
  openLesson: string;

  // Weekly Review
  weeklySummary: string;
  keyScriptures: string;
  weeklyPrayerFocus: string;
  weekReflection: string;
  takeTimeToReflect: string;

  // Personality Quiz
  personalityQuiz: string;
  takeQuiz: string;
  yourType: string;
  shareResults: string;
  copiedToClipboard: string;

  // Settings
  darkMode: string;
  light: string;
  dark: string;
  theme: string;
}

const translationsEN: Translations = {
  // Navigation
  dashboard: 'Dashboard',
  progress: 'Progress',
  course: 'Course',
  favorites: 'Favorites',
  journal: 'Journal',
  resources: 'Resources',
  language: 'Language',

  // Common
  back: 'Back',
  next: 'Next',
  previous: 'Previous',
  complete: 'Complete',
  completed: 'Completed',
  markComplete: 'Mark Complete',
  loading: 'Loading...',
  error: 'Error',
  search: 'Search',
  filter: 'Filter',
  delete: 'Delete',
  edit: 'Edit',
  save: 'Save',
  cancel: 'Cancel',

  // Course
  courseWeeks: 'Course Weeks',
  overview: 'Overview',
  week: 'Week',
  day: 'Day',
  lesson: 'Lesson',

  // Dashboard
  overallProgress: 'Overall Progress',
  lessonsCompleted: 'Lessons Completed',
  currentStreak: 'Current Streak',
  daysOfConsistentPrayer: 'days of consistent prayer',
  dayOfConsistentPrayer: 'day of consistent prayer',
  milestonesAchieved: 'Milestones Achieved',
  weeklyProgress: 'Weekly Progress',

  // Lesson
  weekFocus: 'Week Focus',
  scriptureReference: 'Scripture Reference',
  prayerFocus: 'Prayer Focus',
  nextSteps: 'Next Steps',
  addNote: 'Add Note',

  // Favorites
  myFavorites: 'My Favorites',
  noFavoritesYet: 'No favorites yet',
  markAsFavorite: 'Add to favorites',
  openLesson: 'Open Lesson',

  // Weekly Review
  weeklySummary: 'Week Summary',
  keyScriptures: 'Key Scriptures',
  weeklyPrayerFocus: 'Weekly Prayer Focus',
  weekReflection: 'Week Reflection',
  takeTimeToReflect: 'Take time to reflect on this week\'s journey:',

  // Personality Quiz
  personalityQuiz: 'Personality Quiz',
  takeQuiz: 'Take Quiz',
  yourType: 'Your Type',
  shareResults: 'Share Results',
  copiedToClipboard: 'Copied to clipboard!',

  // Settings
  darkMode: 'Dark Mode',
  light: 'Light',
  dark: 'Dark',
  theme: 'Theme',
};

const translationsES: Translations = {
  dashboard: 'Panel de Control',
  progress: 'Progreso',
  course: 'Curso',
  favorites: 'Favoritos',
  journal: 'Diario',
  resources: 'Recursos',
  language: 'Idioma',

  back: 'Atrás',
  next: 'Siguiente',
  previous: 'Anterior',
  complete: 'Completar',
  completed: 'Completado',
  markComplete: 'Marcar como Completado',
  loading: 'Cargando...',
  error: 'Error',
  search: 'Buscar',
  filter: 'Filtro',
  delete: 'Eliminar',
  edit: 'Editar',
  save: 'Guardar',
  cancel: 'Cancelar',

  // Course
  courseWeeks: 'Semanas del Curso',
  overview: 'Descripción General',
  week: 'Semana',
  day: 'Día',
  lesson: 'Lección',

  // Dashboard
  overallProgress: 'Progreso General',
  lessonsCompleted: 'Lecciones Completadas',
  currentStreak: 'Racha Actual',
  daysOfConsistentPrayer: 'días de oración consistente',
  dayOfConsistentPrayer: 'día de oración consistente',
  milestonesAchieved: 'Hitos Alcanzados',
  weeklyProgress: 'Progreso Semanal',

  weekFocus: 'Enfoque de la Semana',
  scriptureReference: 'Referencia Bíblica',
  prayerFocus: 'Enfoque de Oración',
  nextSteps: 'Próximos Pasos',
  addNote: 'Agregar Nota',

  myFavorites: 'Mis Favoritos',
  noFavoritesYet: 'Sin favoritos aún',
  markAsFavorite: 'Añadir a favoritos',
  openLesson: 'Abrir Lección',

  weeklySummary: 'Resumen Semanal',
  keyScriptures: 'Escrituras Clave',
  weeklyPrayerFocus: 'Enfoque de Oración Semanal',
  weekReflection: 'Reflexión de la Semana',
  takeTimeToReflect: 'Tómate un tiempo para reflexionar sobre el viaje de esta semana:',

  personalityQuiz: 'Cuestionario de Personalidad',
  takeQuiz: 'Realizar Cuestionario',
  yourType: 'Tu Tipo',
  shareResults: 'Compartir Resultados',
  copiedToClipboard: '¡Copiado al portapapeles!',

  darkMode: 'Modo Oscuro',
  light: 'Claro',
  dark: 'Oscuro',
  theme: 'Tema',
};

const translationsFR: Translations = {
  dashboard: 'Tableau de Bord',
  progress: 'Progrès',
  course: 'Cours',
  favorites: 'Favoris',
  journal: 'Journal',
  resources: 'Ressources',
  language: 'Langue',

  back: 'Retour',
  next: 'Suivant',
  previous: 'Précédent',
  complete: 'Terminer',
  completed: 'Terminé',
  markComplete: 'Marquer comme Terminé',
  loading: 'Chargement...',
  error: 'Erreur',
  search: 'Rechercher',
  filter: 'Filtre',
  delete: 'Supprimer',
  edit: 'Éditer',
  save: 'Enregistrer',
  cancel: 'Annuler',

  // Course
  courseWeeks: 'Semaines du Cours',
  overview: 'Aperçu',
  week: 'Semaine',
  day: 'Jour',
  lesson: 'Leçon',

  // Dashboard
  overallProgress: 'Progrès Global',
  lessonsCompleted: 'Leçons Complétées',
  currentStreak: 'Série Actuelle',
  daysOfConsistentPrayer: 'jours de prière constante',
  dayOfConsistentPrayer: 'jour de prière constante',
  milestonesAchieved: 'Jalons Réalisés',
  weeklyProgress: 'Progrès Hebdomadaire',

  weekFocus: 'Focus de la Semaine',
  scriptureReference: 'Référence Biblique',
  prayerFocus: 'Focus de Prière',
  nextSteps: 'Prochaines Étapes',
  addNote: 'Ajouter une Note',

  myFavorites: 'Mes Favoris',
  noFavoritesYet: 'Pas de favoris pour le moment',
  markAsFavorite: 'Ajouter aux favoris',
  openLesson: 'Ouvrir la Leçon',

  weeklySummary: 'Résumé Hebdomadaire',
  keyScriptures: 'Écritures Clés',
  weeklyPrayerFocus: 'Focus de Prière Hebdomadaire',
  weekReflection: 'Réflexion de la Semaine',
  takeTimeToReflect: 'Prenez du temps pour réfléchir au voyage de cette semaine :',

  personalityQuiz: 'Quiz de Personnalité',
  takeQuiz: 'Faire le Quiz',
  yourType: 'Votre Type',
  shareResults: 'Partager les Résultats',
  copiedToClipboard: 'Copié dans le presse-papiers !',

  darkMode: 'Mode Sombre',
  light: 'Clair',
  dark: 'Sombre',
  theme: 'Thème',
};

const translationsPT: Translations = {
  dashboard: 'Painel de Controle',
  progress: 'Progresso',
  course: 'Curso',
  favorites: 'Favoritos',
  journal: 'Diário',
  resources: 'Recursos',
  language: 'Idioma',

  back: 'Voltar',
  next: 'Próximo',
  previous: 'Anterior',
  complete: 'Concluir',
  completed: 'Concluído',
  markComplete: 'Marcar como Concluído',
  loading: 'Carregando...',
  error: 'Erro',
  search: 'Pesquisar',
  filter: 'Filtro',
  delete: 'Deletar',
  edit: 'Editar',
  save: 'Salvar',
  cancel: 'Cancelar',

  // Course
  courseWeeks: 'Semanas do Curso',
  overview: 'Visão Geral',
  week: 'Semana',
  day: 'Dia',
  lesson: 'Lição',

  // Dashboard
  overallProgress: 'Progresso Geral',
  lessonsCompleted: 'Aulas Concluídas',
  currentStreak: 'Sequência Atual',
  daysOfConsistentPrayer: 'dias de oração consistente',
  dayOfConsistentPrayer: 'dia de oração consistente',
  milestonesAchieved: 'Marcos Alcançados',
  weeklyProgress: 'Progresso Semanal',

  weekFocus: 'Foco da Semana',
  scriptureReference: 'Referência Bíblica',
  prayerFocus: 'Foco de Oração',
  nextSteps: 'Próximos Passos',
  addNote: 'Adicionar Nota',

  myFavorites: 'Meus Favoritos',
  noFavoritesYet: 'Sem favoritos ainda',
  markAsFavorite: 'Adicionar aos favoritos',
  openLesson: 'Abrir Aula',

  weeklySummary: 'Resumo Semanal',
  keyScriptures: 'Escrituras-Chave',
  weeklyPrayerFocus: 'Foco de Oração Semanal',
  weekReflection: 'Reflexão da Semana',
  takeTimeToReflect: 'Tire um tempo para refletir sobre a jornada desta semana:',

  personalityQuiz: 'Quiz de Personalidade',
  takeQuiz: 'Fazer Quiz',
  yourType: 'Seu Tipo',
  shareResults: 'Compartilhar Resultados',
  copiedToClipboard: 'Copiado para a área de transferência!',

  darkMode: 'Modo Escuro',
  light: 'Claro',
  dark: 'Escuro',
  theme: 'Tema',
};

const translationMap: Record<Language, Translations> = {
  en: translationsEN,
  es: translationsES,
  fr: translationsFR,
  pt: translationsPT,
};

export const getTranslations = (language: Language): Translations => {
  return translationMap[language] || translationsEN;
};
