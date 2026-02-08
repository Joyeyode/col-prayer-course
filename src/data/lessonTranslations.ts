// Lesson content translations for French, Spanish, Portuguese
// Maps lesson IDs to their translations

import { Language } from './i18n';

export interface LessonTranslation {
  title: string;
  content: string;
}

export interface CourseTranslations {
  title: string;
  subtitle: string;
  content: string;
  prayerToStart: string;
  weekDescriptions: {
    [key: number]: string;
  };
  weekFocusAreas: {
    [key: number]: string;
  };
  lessonTranslations: {
    [key: string]: LessonTranslation;
  };
}

// French translations
export const frenchTranslations: CourseTranslations = {
  title: "Bienvenue à Se Tenir dans la Brèche",
  subtitle: "Un Cours de Prière d'Intercession de 9 Semaines",
  content: `Bienvenue à "Se Tenir dans la Brèche," un voyage transformateur de 9 semaines au cœur de la prière d'intercession. Ce cours est conçu pour vous équiper de la compréhension biblique, des outils pratiques et de l'autonomisation spirituelle pour devenir un intercesseur efficace pour votre famille, église, communauté et nation.

CE QUE VOUS DÉCOUVRIREZ :

**Semaine 1 : Qu'est-ce qu'un Intercesseur ?**
Comprenez la définition biblique et le rôle d'un intercesseur. Apprenez comment vous vous tenez entre Dieu et l'homme en tant que représentant cherchant la justice et la miséricorde.

**Semaine 2 : Rôle et Autorité de l'Intercesseur**
Découvrez votre autorité déléguée en tant que croyant et les rôles spécifiques que jouent les intercesseurs dans le royaume de Dieu par le biais des fonctions sacerdotales et de sentinelle.

**Semaine 3 : Appelé à l'Intercession**
Explorez les signes qui révèlent l'appel spécifique de Dieu à l'intercession et comment confirmer qu'Il vous a confié cette responsabilité sacrée.

**Semaine 4 : Cœur pour la Prière**
Développez un cœur aligné avec le cœur de Dieu par des pratiques qui cultivent la prière, la compassion, la persévérance et la foi.

**Semaine 5 : Pureté devant Dieu**
Comprenez l'importance de la pureté spirituelle comme fondement de votre intercession et apprenez comment maintenir un cœur pur avant le trône de la grâce.

**Semaine 6 : Porter le Fardeau**
Apprenez à reconnaître, embrasser et porter fidèlement les fardeaux spécifiques que Dieu vous donne à prier.

**Semaine 7 : La Nature Sacrificielle de l'Intercession**
Découvrez ce que coûte l'intercession et les récompenses éternelles qui surpassent de loin le sacrifice temporel.

**Semaine 8 : Unité dans la Prière**
Expérimentez le pouvoir exponentiel qui vient lorsque les croyants unissent leurs prières dans l'intercession collective.

**Semaine 9 : Opérer dans Votre Autorité d'Intercesseur**
Concluez en comprenant et en exerçant l'autorité déléguée que vous avez en Christ pour appliquer Sa volonté sur terre par la prière.

COMMENT UTILISER CE COURS :

Chaque semaine contient 7 leçons quotidiennes (Lundi-Dimanche) conçues pour un apprentissage concentré et en bouchées. Chaque leçon comprend :
- **Contenu Quotidien** : 300-600 mots d'enseignement sur le sujet du jour
- **Référence Biblique** : Fondement biblique de la leçon du jour
- **Focus de Prière** : Une direction de prière spécifique pour ce jour
- **Prochaines Étapes** : 3-4 actions pratiques pour appliquer la vérité du jour

RECOMMANDATIONS :

1. **Soyez Constant** : Essayez de terminer une leçon par jour. La structure quotidienne est conçue pour construire la dynamique.
2. **Tenez un Journal** : Utilisez la fonction Journal pour enregistrer ce que Dieu vous enseigne.
3. **Priez avec d'Autres** : Considérez l'invitation de partenaires de prière à vous rejoindre. Dieu dit : "Où deux ou trois se réunissent en mon nom, je suis là au milieu d'eux" (Matthieu 18:20).
4. **Soyez Patient avec Vous-même** : L'intercession s'apprend par la pratique. Certaines vérités prendront du temps pour être pleinement comprise.
5. **Attendez-vous à la Transformation** : Lorsque vous apprenez et pratiquez l'intercession, Dieu vous transformera de l'intérieur.

VOTRE APPEL :

Dieu cherche des intercesseurs. En Ézéchiel 22:30, Dieu dit : "J'ai cherché parmi eux quelqu'un qui construise un mur et se tienne devant moi dans la brèche pour le pays, afin que je ne le détruise pas, mais je n'ai trouvé personne."

Serez-vous celui qui se tient dans la brèche ?

Intercéderez-vous pour ceux qui ne peuvent pas intercéder pour eux-mêmes ?

Représenterez-vous le cœur de Dieu à l'homme et le besoin de l'homme à Dieu ?

Ce cours vous invite dans cet appel. Au cours des 9 prochaines semaines, vous découvrirez non seulement ce qu'est l'intercession, mais aussi qui vous êtes en tant qu'intercesseur—et l'autorité et le pouvoir incroyables que Dieu vous a donnés.

Commençons.`,
  prayerToStart: `Père, je viens devant vous aujourd'hui reconnaissant que j'ai besoin de votre aide. Ouvrez mon cœur pour recevoir ce que vous voulez m'enseigner sur l'intercession. Donnez-moi la sagesse de comprendre, le courage de pratiquer et la persévérance de continuer même lorsque l'intercession semble difficile. Faites-moi devenir l'intercesseur auquel vous m'appelez. Au nom de Jésus, Amen.`,
  weekDescriptions: {
    1: "Comprendre la définition et le rôle fondamentaux d'un intercesseur dans le royaume de Dieu",
    2: "Découvrez votre autorité déléguée en tant que croyant et les rôles spécifiques des intercesseurs",
    3: "Explorez les signes qui révèlent l'appel spécifique de Dieu à l'intercession",
    4: "Développez un cœur aligné avec le cœur de Dieu par des pratiques de prière",
    5: "Comprenez l'importance de la pureté spirituelle pour votre intercession",
    6: "Apprenez à reconnaître et à porter les fardeaux spécifiques pour la prière",
    7: "Découvrez ce que coûte l'intercession et les récompenses éternelles",
    8: "Expérimentez le pouvoir de l'intercession collective",
    9: "Exercez l'autorité déléguée que vous avez en Christ",
  },
  weekFocusAreas: {
    1: "Se Tenir entre Dieu et l'Homme",
    2: "Autorité et Rôle de l'Intercesseur",
    3: "L'Appel à l'Intercession",
    4: "Un Cœur pour la Prière",
    5: "Pureté devant Dieu",
    6: "Porter le Fardeau",
    7: "La Nature Sacrificielle",
    8: "Unité dans la Prière",
    9: "Opérer dans l'Autorité",
  },
  lessonTranslations: {
    "week1-day1": {
      title: "Définition d'un Intercesseur",
      content: `Un intercesseur est celui qui se tient entre Dieu et l'homme, représentant d'autres devant le trône de la grâce—comme un avocat d'un tribunal représenterait son client devant un juge.

Même les plus grandes leaders bibliques sont devenus des intercesseurs. Moïse intercédait pour les Israélites rebelles. Abraham intercédait pour Sodome. David intercédait pour sa nation. Samuel intercédait pour Israël. Jésus est devenu l'Intercesseur suprême, intercédant pour nous auprès du Père.

L'intercession est l'un des appels les plus puissants de Dieu pour ceux qui entendent Son cœur et qui sont prêts à se lever pour faire la différence dans le monde spirituel.

En tant qu'intercesseur, vous :
- Détenez le pouvoir d'influencer le cours de l'histoire par la prière
- Représentez le cœur de Dieu dans le monde
- Devenez une sentinelle spirituelle pour votre famille et votre nation
- Opérez dans une autorité donnée par Dieu qui affecte directement la vie des autres

L'intercession n'est pas une prière passive ou égoïste. C'est une prière aggressive, volontaire et altruiste qui se dresse contre le mal et fait descendre la volonté de Dieu sur la terre.`
    },
  },
};

// Spanish translations
export const spanishTranslations: CourseTranslations = {
  title: "Bienvenido a Ponerse en la Brecha",
  subtitle: "Un Curso de Oración de Intercesión de 9 Semanas",
  content: `Bienvenido a "Ponerse en la Brecha," un viaje transformador de 9 semanas al corazón de la oración de intercesión. Este curso está diseñado para equiparte con comprensión bíblica, herramientas prácticas y empoderamiento espiritual para convertirte en un intercesor efectivo para tu familia, iglesia, comunidad y nación.

LO QUE DESCUBRIRÁS :

**Semana 1 : ¿Qué es un Intercesor?**
Entiende la definición bíblica y el papel de un intercesor. Aprende cómo te paras entre Dios y el hombre como representante buscando justicia y misericordia.

**Semana 2 : Papel y Autoridad del Intercesor**
Descubre tu autoridad delegada como creyente y los papeles específicos que juegan los intercesores en el reino de Dios.

**Semana 3 : Llamado a la Intercesión**
Explora las señales que revelan el llamado específico de Dios a la intercesión.

**Semana 4 : Corazón para la Oración**
Desarrolla un corazón alineado con el corazón de Dios.

**Semana 5 : Pureza Ante Dios**
Comprende la importancia de la pureza espiritual.

**Semana 6 : Llevar la Carga**
Aprende a reconocer y llevar las cargas específicas.

**Semana 7 : La Naturaleza Sacrificial de la Intercesión**
Descubre lo que cuesta la intercesión.

**Semana 8 : Unidad en la Oración**
Experimenta el poder exponencial de la intercesión corporativa.

**Semana 9 : Operando en Tu Autoridad de Intercesor**
Concluye ejerciendo la autoridad delegada.

¡Comencemos!`,
  prayerToStart: `Padre, vengo ante Ti hoy reconociendo que necesito Tu ayuda. Abre mi corazón para recibir lo que quieres enseñarme sobre la intercesión. Dame sabiduría para entender, valor para practicar, y perseverancia para continuar. Hazme el intercesor al que me estás llamando. En el nombre de Jesús, Amén.`,
  weekDescriptions: {
    1: "Entiende la definición núcleo y papel de un intercesor",
    2: "Descubre tu autoridad delegada como creyente",
    3: "Explora las señales del llamado a la intercesión",
    4: "Desarrolla un corazón para la oración",
    5: "Comprende la importancia de la pureza espiritual",
    6: "Aprende a llevar cargas de oración específicas",
    7: "Descubre el costo y las recompensas de la intercesión",
    8: "Experimenta el poder de la oración unida",
    9: "Ejerce tu autoridad en Cristo",
  },
  weekFocusAreas: {
    1: "De Pie entre Dios y el Hombre",
    2: "Papel y Autoridad",
    3: "Llamado a la Intercesión",
    4: "Corazón para la Oración",
    5: "Pureza Ante Dios",
    6: "Llevar la Carga",
    7: "Naturaleza Sacrificial",
    8: "Unidad en la Oración",
    9: "Operando en Tu Autoridad",
  },
  lessonTranslations: {
    "week1-day1": {
      title: "Definición de un Intercesor",
      content: `Un intercesor es aquel que se coloca entre Dios y el hombre, representando a otros ante el trono de la gracia.

Incluso los mayores líderes bíblicos se convirtieron en intercesores. Moisés intercedía por los israelitas. Abraham intercedía por Sodoma. David intercedía por su nación.

La intercesión es uno de los llamados más poderosos de Dios.

Como intercesor, tienes:
- El poder de influir el curso de la historia por la oración
- Representas el corazón de Dios en el mundo
- Te conviertes en una centinela espiritual
- Operasen una autoridad dada por Dios

La intercesión no es oración pasiva o egoísta. Es oración agresiva, voluntaria y altruista.`
    },
  },
};

// Portuguese translations
export const portugueseTranslations: CourseTranslations = {
  title: "Bem-vindo a Ficar na Brecha",
  subtitle: "Um Curso de Oração de Intercessão de 9 Semanas",
  content: `Bem-vindo a "Ficar na Brecha," uma jornada transformadora de 9 semanas no coração da oração de intercessão. Este curso foi desenvolvido para equipá-lo com compreensão bíblica, ferramentas práticas e capacitação espiritual.

Vamos começar!`,
  prayerToStart: `Pai, venho diante de Ti hoje reconhecendo que preciso da Tua ajuda. Abre meu coração para receber o que queres me ensinar sobre intercessão. Dá-me sabedoria para entender, coragem para praticar, e perseverança para continuar. Faz-me o intercessor ao qual estás me chamando. Em nome de Jesus, Amém.`,
  weekDescriptions: {
    1: "Entenda a definição bíblica de um intercessor",
    2: "Descubra sua autoridade delegada",
    3: "Explore o chamado para intercessão",
    4: "Desenvolva um coração para oração",
    5: "Compreenda a pureza espiritual",
    6: "Aprenda a levar cargas de oração",
    7: "Descubra o custo da intercessão",
    8: "Experimente o poder da oração unida",
    9: "Exerça sua autoridade em Cristo",
  },
  weekFocusAreas: {
    1: "De Pé entre Deus e o Homem",
    2: "Papel e Autoridade",
    3: "Chamado para Intercessão",
    4: "Coração para Oração",
    5: "Pureza Diante de Deus",
    6: "Levar o Fardo",
    7: "Natureza Sacrificial",
    8: "Unidade em Oração",
    9: "Operando em Sua Autoridade",
  },
  lessonTranslations: {
    "week1-day1": {
      title: "Definição de um Intercessor",
      content: `Um intercessor é aquele que se coloca entre Deus e o homem, representando outros diante do trono da graça.

Os maiores líderes bíblicos se tornaram intercessores. Moisés intercedia pelos israelitas. Abraão intercedia por Sodoma. Davi intercedia por sua nação.

A intercessão é um dos chamados mais poderosos de Deus.

Como intercessor, você:
- Tem o poder de influenciar o curso da história pela oração
- Representa o coração de Deus no mundo
- Se torna uma sentinela espiritual
- Opera em uma autoridade dada por Deus

A intercessão não é oração passiva ou egoísta. É oração agressiva, voluntária e altruísta.`
    },
  },
};

// Get translations by language
const translationMap: Record<Language, CourseTranslations> = {
  en: {
    title: "Welcome to Standing in the Gap",
    subtitle: "A 9-Week Intercessory Prayer Course",
    content: "", // English content stays in courseContent.ts
    prayerToStart: "",
    weekDescriptions: {},
    weekFocusAreas: {},
    lessonTranslations: {},
  },
  fr: frenchTranslations,
  es: spanishTranslations,
  pt: portugueseTranslations,
};

export const getLessonTranslations = (language: Language): CourseTranslations => {
  return translationMap[language] || translationMap.en;
};

export const getTranslatedLesson = (language: Language, lessonId: string): LessonTranslation | null => {
  const translations = getLessonTranslations(language);
  return translations.lessonTranslations[lessonId] || null;
};
