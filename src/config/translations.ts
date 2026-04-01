import { Language } from '../contexts/LanguageContext'

export interface Translations {
  quizMaster: string
  learnAndPractice: string
  home: string
  code: string
  developer: string

  // Hero
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
  progress: string
  answered: string
  correctLabel: string
  wrongLabel: string
  resultsSummary: string
  excellentWork: string
  back: string
  retry: string
  prev: string
  next: string

  // Footer
  copyright: string
  builtFor: string

  // Disclaimer Modal
  disclaimerTitle: string
  disclaimerContent: string
  disclaimerWarning: string
  disclaimerReport: string
  disclaimerAgree: string
  disclaimerQuit: string

  // Admin
  adminAccess: string
  adminLogin: string
  adminPassword: string
  adminLoginBtn: string
  adminInvalid: string
  adminWelcome: string
  adminLogout: string
  adminOveralls: string
  adminManage: string
  adminParser: string
  adminTotalSubjects: string
  adminTotalQuestions: string
  adminAvgQuestions: string
  adminSubjectName: string
  adminStatus: string
  adminActive: string
  adminRawInput: string
  adminParseBtn: string
  adminPreview: string
  adminDownloadJson: string
  adminDetected: string
  adminNoData: string
}

export const translations: Record<Language, Translations> = {
  en: {
    quizMaster: 'Quiz Master',
    learnAndPractice: 'Learn & Practice',
    home: 'Home',
    code: 'Code',
    developer: 'Developer: Sanjarbek',

    masterYourSkills: 'Master Your Skills',
    chooseSubject: 'Choose a Subject',
    interactiveQuestions: 'Interactive questions',
    instantFeedback: 'Instant feedback',
    progressTracking: 'Progress tracking',
    whyChooseQuizMaster: 'Why Choose Quiz Master?',
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
    progress: 'Progress',
    answered: 'Answered',
    correctLabel: 'Correct',
    wrongLabel: 'Wrong',
    resultsSummary: "Here's how you performed",
    excellentWork: 'Excellent work!',
    back: 'Back',
    retry: 'Retry',
    prev: 'Prev',
    next: 'Next',

    copyright: '© 2026 Quiz Master. Built by Sanjarbek. Telegram: Sanjarbek_Ismatov.',
    builtFor: 'Built for learning excellence.',

    disclaimerTitle: 'Important Disclaimer',
    disclaimerContent: 'Welcome to Quiz Master! Please read the following disclaimer before using this application.',
    disclaimerWarning: 'Sanjarbek (the creator of this website) is not responsible for any inaccuracies, errors, or outdated information in the quiz questions and answers. While every effort has been made to ensure accuracy, the content may contain mistakes or may not reflect the most current information.',
    disclaimerReport: 'If you find any mistakes, inaccuracies, or have suggestions for improvement, please report them via Telegram: @Sanjarbek_Ismatov. Your feedback helps improve the quality of this educational resource.',
    disclaimerAgree: 'I Agree',
    disclaimerQuit: 'Quit',

    adminAccess: 'Admin Access',
    adminLogin: 'Login',
    adminPassword: 'Password',
    adminLoginBtn: 'Login',
    adminInvalid: 'Invalid credentials',
    adminWelcome: 'Welcome back, Sanjarbek',
    adminLogout: 'Logout',
    adminOveralls: 'Overalls',
    adminManage: 'Manage Tests',
    adminParser: 'Parser',
    adminTotalSubjects: 'Total Subjects',
    adminTotalQuestions: 'Total Questions',
    adminAvgQuestions: 'Avg Qs per Subject',
    adminSubjectName: 'Subject Name',
    adminStatus: 'Status',
    adminActive: 'Active',
    adminRawInput: 'Raw Input',
    adminParseBtn: 'Parse Content',
    adminPreview: 'Preview & Result',
    adminDownloadJson: 'Download JSON',
    adminDetected: 'Detected {count} questions.',
    adminNoData: 'No data parsed yet. Paste some content on the left.',
  },
  uz: {
    quizMaster: 'Quiz Master',
    learnAndPractice: 'Oʻqing va Amaliyot Qiling',
    home: 'Bosh sahifa',
    code: 'Kod',
    developer: 'Dasturchi: Sanjarbek',

    masterYourSkills: 'Koʻnikmalangizni Yuzaga Chiqaring',
    chooseSubject: 'Mavzuni Tanlang',
    interactiveQuestions: 'Interaktiv savollar',
    instantFeedback: 'Tezkor javob',
    progressTracking: 'Taraqqiyot kuzatish',
    whyChooseQuizMaster: 'Nega Quiz Master ni Tanlaysiz?',
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
    progress: 'Jarayon',
    answered: 'Javob berildi',
    correctLabel: 'Toʻgʻri',
    wrongLabel: 'Notoʻgʻri',
    resultsSummary: 'Sizning natijalaringiz',
    excellentWork: 'Ajoyib ish!',
    back: 'Orqaga',
    retry: 'Qayta urinish',
    prev: 'Oldingi',
    next: 'Keyingi',

    copyright: '© 2026 Quiz Master. Sanjarbek tomonidan qurilgan. Telegram: Sanjarbek_Ismatov.',
    builtFor: 'Oʻqish takomillashtirishligi uchun qurilgan.',

    disclaimerTitle: 'Muhim Ogohlantirish',
    disclaimerContent: 'Quiz Master ga xush kelibsiz! Ilovadan foydalanishdan oldin quyidagi ogohlantirishni oʻqing.',
    disclaimerWarning: 'Sanjarbek (bu veb-saytning yaratuvchisi) viktorina savollari va javoblaridagi har qanday notoʻgʻriliklar, xatolar yoki eskirgan maʼlumotlar uchun javobgar emas. Toʻgʻrilikka erishish uchun har qanday harakat qilingan boʻlsa-da, kontentda xatolar boʻlishi yoki eng dolzarb maʼlumotlarni aks ettirmasligi mumkin.',
    disclaimerReport: 'Agar siz har qanday xatolar, notoʻgʻriliklar topgan boʻlsangiz yoki yaxshilash uchun takliflar boʻlsa, iltimos, Telegram orqali xabar bering: @Sanjarbek_Ismatov. Sizning fikr-mulohazalaringiz ushbu taʼlim resursining sifatini yaxshilashga yordam beradi.',
    disclaimerAgree: 'Men Roziman',
    disclaimerQuit: 'Chiqish',

    adminAccess: 'Admin Kirish',
    adminLogin: 'Login',
    adminPassword: 'Parol',
    adminLoginBtn: 'Kirish',
    adminInvalid: 'Login yoki parol notoʻgʻri',
    adminWelcome: 'Xush kelibsiz, Sanjarbek',
    adminLogout: 'Chiqish',
    adminOveralls: 'Umumiy',
    adminManage: 'Testlarni boshqarish',
    adminParser: 'Parser',
    adminTotalSubjects: 'Jami Mavzular',
    adminTotalQuestions: 'Jami Savollar',
    adminAvgQuestions: 'Har bir mavzuga oʻrtacha savollar',
    adminSubjectName: 'Mavzu nomi',
    adminStatus: 'Holati',
    adminActive: 'Faol',
    adminRawInput: 'Xom maʼlumotlar',
    adminParseBtn: 'Tahlil qilish',
    adminPreview: 'Koʻrib chiqish va natija',
    adminDownloadJson: 'JSON yuklab olish',
    adminDetected: '{count} ta savol aniqlandi.',
    adminNoData: 'Hali hech qanday maʼlumot tahlil qilinmadi. Chap tomonga kontentni joylashtiring.',
  },
  ru: {
    quizMaster: 'Quiz Master',
    learnAndPractice: 'Учитесь и Практикуйтесь',
    home: 'Главная',
    code: 'Код',
    developer: 'Разработчик: Sanjarbek',

    masterYourSkills: 'Овладейте своими навыками',
    chooseSubject: 'Выберите предмет',
    interactiveQuestions: 'Интерактивные вопросы',
    instantFeedback: 'Мгновенная обратная связь',
    progressTracking: 'Отслеживание прогресса',
    whyChooseQuizMaster: 'Почему выбрать Quiz Master?',
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
    progress: 'Прогресс',
    answered: 'Отвечено',
    correctLabel: 'Правильно',
    wrongLabel: 'Неправильно',
    resultsSummary: 'Ваши результаты',
    excellentWork: 'Отличная работа!',
    back: 'Назад',
    retry: 'Повторить',
    prev: 'Пред',
    next: 'След',

    copyright: '© 2026 Quiz Master. Создано Sanjarbek. Telegram: Sanjarbek_Ismatov.',
    builtFor: 'Создано для совершенства в обучении.',

    disclaimerTitle: 'Важное предупреждение',
    disclaimerContent: 'Добро пожаловать в Quiz Master! Пожалуйста, прочитайте следующее предупреждение перед использованием этого приложения.',
    disclaimerWarning: 'Sanjarbek (создатель этого веб-сайта) не несет ответственности за любые неточности, ошибки или устаревшую информацию в вопросах и ответах викторины. Хотя были приложены все усилия для обеспечения точности, контент может содержать ошибки или может не отражать самую актуальную информацию.',
    disclaimerReport: 'Если вы обнаружите какие-либо ошибки, неточности или у вас есть предложения по улучшению, пожалуйста, сообщите об этом через Telegram: @Sanjarbek_Ismatov. Ваши отзывы помогают улучшить качество этого образовательного ресурса.',
    disclaimerAgree: 'Я Согласен',
    disclaimerQuit: 'Выход',

    adminAccess: 'Доступ администратора',
    adminLogin: 'Логин',
    adminPassword: 'Пароль',
    adminLoginBtn: 'Войти',
    adminInvalid: 'Неверный логин или пароль',
    adminWelcome: 'С возвращением, Sanjarbek',
    adminLogout: 'Выйти',
    adminOveralls: 'Общее',
    adminManage: 'Управление тестами',
    adminParser: 'Парсер',
    adminTotalSubjects: 'Всего предметов',
    adminTotalQuestions: 'Всего вопросов',
    adminAvgQuestions: 'Среднее кол-во вопросов на предмет',
    adminSubjectName: 'Название предмета',
    adminStatus: 'Статус',
    adminActive: 'Активен',
    adminRawInput: 'Исходные данные',
    adminParseBtn: 'Проанализировать',
    adminPreview: 'Предпросмотр и результат',
    adminDownloadJson: 'Скачать JSON',
    adminDetected: 'Обнаружено вопросов: {count}',
    adminNoData: 'Данные еще не проанализированы. Вставьте контент слева.',
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language]
}
