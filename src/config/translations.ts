/**
 * UI Translations for multiple languages
 */

export type Language = 'en' | 'uz' | 'ru'

export interface Translations {
  // Header
  quizMaster: string
  learnAndPractice: string
  home: string
  code: string
  
  // Home Page
  masterYourSkills: string
  chooseSubject: string
  interactiveQuestions: string
  instantFeedback: string
  progressTracking: string
  whyChooseQuizMaster: string
  subjectsAvailable: string
  comprehensiveCoverage: string
  questionsPerSubject: string
  extensivePractice: string
  instantResults: string
  immediatelyFeedback: string
  startPractice: string
  
  // Subject Page
  selectLanguage: string
  totalQuestions: string
  groups: string
  perGroup: string
  attempts: string
  practiceGroups: string
  noQuestionsAvailable: string
  tipsForSuccess: string
  takeYourTime: string
  reviewWrongAnswers: string
  practiceMultipleTimes: string
  backToSubjects: string
  subjectNotFound: string
  
  // Quiz Page
  question: string
  of: string
  correct: string
  incorrect: string
  retakeQuiz: string
  nextGroup: string
  previousGroup: string
  congratulations: string
  yourScore: string
  answeredCorrectly: string
  reviewAnswers: string
  goBack: string
  questionsLoading: string
  loadingQuestions: string
  errorLoading: string
  
  // Footer
  copyright: string
  builtFor: string
}

export const translations: Record<Language, Translations> = {
  en: {
    quizMaster: 'Quiz Master',
    learnAndPractice: 'Learn & Practice',
    home: 'Home',
    code: 'Code',
    
    masterYourSkills: 'Master Your Skills',
    chooseSubject: 'Choose a Subject',
    interactiveQuestions: 'Interactive questions',
    instantFeedback: 'Instant feedback',
    progressTracking: 'Progress tracking',
    whyChooseQuizMaster: "Why Choose Quiz Master?",
    subjectsAvailable: 'Subjects available',
    comprehensiveCoverage: 'Comprehensive coverage of all topics',
    questionsPerSubject: 'Questions per subject',
    extensivePractice: 'Extensive practice material',
    instantResults: 'Instant results',
    immediatelyFeedback: 'Get immediate feedback',
    startPractice: 'Start Practice',
    
    selectLanguage: 'Select Language',
    totalQuestions: 'Total Questions',
    groups: 'Groups',
    perGroup: 'Per Group',
    attempts: 'Attempts',
    practiceGroups: 'Practice Groups',
    noQuestionsAvailable: 'No questions available for the selected language',
    tipsForSuccess: 'Tips for Success',
    takeYourTime: 'Take your time to understand each question',
    reviewWrongAnswers: 'Review your wrong answers to learn',
    practiceMultipleTimes: 'Practice multiple times to improve',
    backToSubjects: 'Back to Subjects',
    subjectNotFound: 'Subject not found',
    
    question: 'Question',
    of: 'of',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    retakeQuiz: 'Retake Quiz',
    nextGroup: 'Next Group',
    previousGroup: 'Previous Group',
    congratulations: 'Congratulations!',
    yourScore: 'Your Score',
    answeredCorrectly: 'answered correctly',
    reviewAnswers: 'Review Answers',
    goBack: 'Go Back',
    questionsLoading: 'Loading questions...',
    loadingQuestions: 'Loading questions',
    errorLoading: 'Error loading questions',
    
    copyright: '© 2026 Quiz Master. Built by Sanjarbek. Telegram: Sanjarbek_Ismatov.',
    builtFor: 'Built for learning excellence.',
  },
  uz: {
    quizMaster: 'Quiz Master',
    learnAndPractice: 'Oʻqing va Amaliyot Qiling',
    home: 'Bosh sahifa',
    code: 'Kod',
    
    masterYourSkills: 'Koʻnikmalangizni Yuzaga Chiqaring',
    chooseSubject: 'Mavzuni Tanlang',
    interactiveQuestions: 'Interaktiv savollar',
    instantFeedback: 'Tezkor javob',
    progressTracking: 'Taraqqiyot kuzatish',
    whyChooseQuizMaster: "Nega Quiz Master ni Tanlaysiz?",
    subjectsAvailable: 'Mavzular mavjud',
    comprehensiveCoverage: 'Barcha mavzularni toʻla qamrab oladi',
    questionsPerSubject: 'Mavzu boʻyicha savollar',
    extensivePractice: 'Keng amaliyot materiallari',
    instantResults: 'Tezkor natijalar',
    immediatelyFeedback: 'Darhol javob oling',
    startPractice: 'Amaliyotni Boshlang',
    
    selectLanguage: 'Tilni Tanlang',
    totalQuestions: 'Jami Savollar',
    groups: 'Guruhlar',
    perGroup: 'Har bir guruhda',
    attempts: 'Urinishlar',
    practiceGroups: 'Amaliyot Guruhlari',
    noQuestionsAvailable: 'Tanlangan til uchun savollar mavjud emas',
    tipsForSuccess: 'Muvaffaqiyat uchun Maslahatlar',
    takeYourTime: 'Har bir savolni tushunishga vaqt ayting',
    reviewWrongAnswers: 'Xato javoblarni koʻrib chiqing va oʻrganing',
    practiceMultipleTimes: 'Yaxshilash uchun bir necha marta amaliyot qiling',
    backToSubjects: 'Mavzularga qaytish',
    subjectNotFound: 'Mavzu topilmadi',
    
    question: 'Savol',
    of: 'dan',
    correct: 'Toʻgʻri!',
    incorrect: 'Notoʻgʻri',
    retakeQuiz: 'Viktorinani yana oʻtkazing',
    nextGroup: 'Keyingi Guruh',
    previousGroup: 'Oldingi Guruh',
    congratulations: 'Tabriklaymiz!',
    yourScore: 'Sizning Ballingiz',
    answeredCorrectly: 'toʻgʻri javob berdi',
    reviewAnswers: 'Javoblarni Koʻrib Chiqing',
    goBack: 'Orqaga Qayting',
    questionsLoading: 'Savollar yuklanmoqda...',
    loadingQuestions: 'Savollar yuklanmoqda',
    errorLoading: 'Savollarni yuklashda xato',
    
    copyright: '© 2026 Quiz Master. Sanjarbek tomonidan qurilgan. Telegram: Sanjarbek_Ismatov.',
    builtFor: 'Oʻqish takomillashtirishligi uchun qurilgan.',
  },
  ru: {
    quizMaster: 'Quiz Master',
    learnAndPractice: 'Учитесь и Практикуйтесь',
    home: 'Главная',
    code: 'Код',
    
    masterYourSkills: 'Овладейте своими навыками',
    chooseSubject: 'Выберите предмет',
    interactiveQuestions: 'Интерактивные вопросы',
    instantFeedback: 'Мгновенная обратная связь',
    progressTracking: 'Отслеживание прогресса',
    whyChooseQuizMaster: "Почему выбрать Quiz Master?",
    subjectsAvailable: 'Доступные предметы',
    comprehensiveCoverage: 'Полное охватывание всех тем',
    questionsPerSubject: 'Вопросов по предмету',
    extensivePractice: 'Обширный практический материал',
    instantResults: 'Мгновенные результаты',
    immediatelyFeedback: 'Получите немедленную обратную связь',
    startPractice: 'Начать Практику',
    
    selectLanguage: 'Выберите язык',
    totalQuestions: 'Всего вопросов',
    groups: 'Группы',
    perGroup: 'В группе',
    attempts: 'Попытки',
    practiceGroups: 'Группы практики',
    noQuestionsAvailable: 'Нет вопросов для выбранного языка',
    tipsForSuccess: 'Советы для успеха',
    takeYourTime: 'Уделите время пониманию каждого вопроса',
    reviewWrongAnswers: 'Пересмотрите неправильные ответы, чтобы учиться',
    practiceMultipleTimes: 'Практикуйтесь несколько раз для улучшения',
    backToSubjects: 'Вернуться к предметам',
    subjectNotFound: 'Предмет не найден',
    
    question: 'Вопрос',
    of: 'из',
    correct: 'Правильно!',
    incorrect: 'Неправильно',
    retakeQuiz: 'Пройти тест снова',
    nextGroup: 'Следующая группа',
    previousGroup: 'Предыдущая группа',
    congratulations: 'Поздравляем!',
    yourScore: 'Ваш результат',
    answeredCorrectly: 'ответили правильно',
    reviewAnswers: 'Просмотреть ответы',
    goBack: 'Вернуться',
    questionsLoading: 'Загрузка вопросов...',
    loadingQuestions: 'Загрузка вопросов',
    errorLoading: 'Ошибка при загрузке вопросов',

    copyright: '© 2026 Quiz Master. Создано Sanjarbek. Telegram: Sanjarbek_Ismatov.',
    builtFor: 'Создано для совершенства в обучении.',
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language]
}
