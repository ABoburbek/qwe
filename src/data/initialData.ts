import {
  User,
  NewsArticle,
  AchievementSpotlight,
  Course,
  StoreBranch,
  WorkIssue,
  AssignedTask,
  ChatChannel,
  ChatMessage,
  FailedQuestionMistake,
  Certificate,
  CourseQAQuestion,
  ApplianceSpec,
  NasiyaPartner,
  AuditCriterion,
  DailyQuizQuestion,
  RewardStoreItem,
  CustomerPersona,
  DuelQuestion,
  StoreLeagueBranch,
  PDPCompetency,
  PDPMilestone,
  OnboardingDayPlan,
  ObjectionScript,
  ProductMatcherItem,
  SkillHeatmapBranch,
  StoreCompetitionChallenge,
  RoiCorrelationData,
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: "usr_1",
    name: "Anvar Rahimov",
    role: "employee",
    position: "Katta Sotuvchi-Konsultant",
    department: "Savdo Bo'limi",
    storeId: "store_1",
    storeName: "Chilonzor Filiali",
    email: "anvar.rahimov@hamkor.uz",
    phone: "+998 90 123 45 67",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Hamkor jamoasida 2 yildan beri faoliyat yuritaman. Mijozlarga oliy darajada xizmat ko'rsatish mening bosh maqsadim!",
    points: 1250,
    streakDays: 14,
    completedCourseIds: ["crs_1"],
    badges: [
      {
        id: "bdg_1",
        title: "Bilimdon Sotuvchi",
        description: "Chakana savdo standartlari kursini 100% ball bilan yakunladi",
        icon: "Award",
        earnedDate: "2026-07-15",
        color: "from-amber-500 to-yellow-400",
      },
      {
        id: "bdg_2",
        title: "Muntazam Ta'lim",
        description: "14 kun davomida har kuni o'quv portalida faol bo'ldi",
        icon: "Zap",
        earnedDate: "2026-08-01",
        color: "from-emerald-500 to-teal-400",
      },
    ],
    joinedDate: "2024-03-10",
  },
  {
    id: "usr_2",
    name: "Malika Karimova",
    role: "employee",
    position: "Bosh Kassir",
    department: "Kassa Bo'limi",
    storeId: "store_1",
    storeName: "Chilonzor Filiali",
    email: "malika.karimova@hamkor.uz",
    phone: "+998 91 234 56 78",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    bio: "Moliyaviy hisob-kitoblar va mijozlar bilan muloqotda aniqlik tarafdoriman.",
    points: 980,
    streakDays: 8,
    completedCourseIds: [],
    badges: [
      {
        id: "bdg_3",
        title: "Kassa Ustasi",
        description: "Kassa intizomi va moliyaviy testdan a'lo baho oldi",
        icon: "ShieldCheck",
        earnedDate: "2026-06-20",
        color: "from-blue-500 to-indigo-500",
      },
    ],
    joinedDate: "2024-08-15",
  },
  {
    id: "usr_3",
    name: "Dilshod Qodirov",
    role: "manager",
    position: "Do'kon Rahbari",
    department: "Boshqaruv",
    storeId: "store_1",
    storeName: "Chilonzor Filiali",
    email: "dilshod.qodirov@hamkor.uz",
    phone: "+998 93 345 67 89",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Chilonzor filiali jamoasi rahbari. Biz har doim O'zbekistondagi eng yaxshi xizmatni ko'rsatishga intilamiz.",
    points: 2400,
    streakDays: 30,
    completedCourseIds: ["crs_1", "crs_2"],
    badges: [
      {
        id: "bdg_4",
        title: "Lider Menejer",
        description: "Eng faol va tartibli do'kon jamoasini shakllantirdi",
        icon: "Users",
        earnedDate: "2026-05-10",
        color: "from-purple-500 to-indigo-600",
      },
    ],
    joinedDate: "2022-01-15",
  },
  {
    id: "usr_4",
    name: "Malika Ikromova",
    role: "trainer",
    position: "O'quv Bo'limi Bosh Metodisti",
    department: "O'quv va Rivojlanish (L&D)",
    storeId: "store_main",
    storeName: "Bosh Office (L&D)",
    email: "malika.ikromova@hamkor.uz",
    phone: "+998 97 456 78 90",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Hamkor korporativ akademiyasi metodistiman. Interaktiv presentationlar va testlar muallifi.",
    points: 3100,
    streakDays: 45,
    completedCourseIds: ["crs_1", "crs_2", "crs_3"],
    badges: [
      {
        id: "bdg_5",
        title: "Akademiya Yaratuvchisi",
        description: "50 dan ortiq interaktiv o'quv modullari va prezintatsiyalar muallifi",
        icon: "BookOpen",
        earnedDate: "2025-11-01",
        color: "from-rose-500 to-pink-500",
      },
    ],
    joinedDate: "2021-09-01",
  },
  {
    id: "usr_5",
    name: "Jasur Alimov",
    role: "admin",
    position: "Tizim Admini",
    department: "IT & Rivojlanish",
    storeId: "store_main",
    storeName: "Bosh Office",
    email: "jasur.alimov@hamkor.uz",
    phone: "+998 99 567 89 01",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Hamkor LMS portalining uzluksiz ishlashi va axborot xavfsizligi mas'uli.",
    points: 4000,
    streakDays: 60,
    completedCourseIds: ["crs_1", "crs_2", "crs_3", "crs_4"],
    badges: [
      {
        id: "bdg_6",
        title: "Portal Admini",
        description: "Tizimning to'liq boshqaruvi va doimiy qo'llab-quvvatlovi",
        icon: "Settings",
        earnedDate: "2025-01-01",
        color: "from-slate-700 to-slate-900",
      },
    ],
    joinedDate: "2020-05-01",
  },
];

export const INITIAL_STORES: StoreBranch[] = [
  {
    id: "store_1",
    name: "Chilonzor Filiali",
    city: "Toshkent",
    address: "Chilonzor tumani, Qatortol ko'chasi 28-uy",
    managerName: "Dilshod Qodirov",
    employeeCount: 12,
    averageScore: 92.5,
  },
  {
    id: "store_2",
    name: "Yunusobod Filiali",
    city: "Toshkent",
    address: "Yunusobod tumani, Amir Temur shox ko'chasi 107-uy",
    managerName: "Sardor Ergashev",
    employeeCount: 15,
    averageScore: 88.0,
  },
  {
    id: "store_3",
    name: "Samarqand Markaz Filiali",
    city: "Samarqand",
    address: "Samarqand sh., Registon ko'chasi 14-uy",
    managerName: "Rustam Abdullayev",
    employeeCount: 10,
    averageScore: 94.2,
  },
  {
    id: "store_4",
    name: "Farg'ona Filiali",
    city: "Farg'ona",
    address: "Farg'ona sh., Al-Farg'oniy ko'chasi 52-uy",
    managerName: "Otabek Soliyev",
    employeeCount: 9,
    averageScore: 85.8,
  },
  {
    id: "store_5",
    name: "Buxoro Filiali",
    city: "Buxoro",
    address: "Buxoro sh., Naqshbandiy ko'chasi 88-uy",
    managerName: "Nodira Azimova",
    employeeCount: 11,
    averageScore: 90.1,
  },
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "news_1",
    title: "Hamkor 2026-yil 3-chorak uchun Yangi O'quv Standartlarini e'lon qildi!",
    content: "Hurmatli hamkasblar! Kompaniyamiz mijozlarga xizmat ko'rsatish darajasini yangi bosqichga olib chiqish maqsadida iSpring formatidagi yangilangan o'quv modulini tayyorladi. Barcha do'kon xodimlari 25-avgustga qadar ushbu kursni tamomlashlari shart.",
    category: "Korporativ Yangiliklar",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    author: "O'quv Bo'limi (L&D)",
    date: "2026-08-08",
    likes: 42,
    likedBy: ["usr_1", "usr_3"],
    commentsCount: 8,
    isImportant: true,
  },
  {
    id: "news_2",
    title: "Iyul Oyining Eng Yaxshi Do'koni va Xodimlari Aniqlandi!",
    content: "Samarqand Markaz filiali o'quv kurslarini tamomlash va test natijalari bo'yicha Respublika miqyosida 1-o'rinni egalladi! Chilonzor filiali sotuvchisi Anvar Rahimov esa 100% test natijasi va mijozlar minnatdorchiligi bilan 'Oy Xodimi' deb topildi.",
    category: "Yutuqlar va E'tirof",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    author: "HR Bo'limi",
    date: "2026-08-05",
    likes: 68,
    likedBy: ["usr_1", "usr_2", "usr_3", "usr_4"],
    commentsCount: 14,
    isImportant: false,
  },
  {
    id: "news_3",
    title: "Yangi Kassa Dasturi va Naqd Puldagi Intizom Bo'yicha Master-Klass",
    content: "Kassir va hisobchilarimiz uchun yangi avtomatlashtirilgan kassa moduli ishga tushirildi. Portalimizdagi 15 daqiqalik video darslik va amaliy test orqali yangi funksiyalarni tezda o'rganib oling.",
    category: "Texnik Yo'riqnoma",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67d165545f?w=800&auto=format&fit=crop&q=80",
    author: "IT va Moliya Bo'limi",
    date: "2026-08-02",
    likes: 29,
    likedBy: ["usr_2"],
    commentsCount: 4,
    isImportant: false,
  },
];

export const INITIAL_SPOTLIGHTS: AchievementSpotlight[] = [
  {
    id: "spt_1",
    employeeName: "Anvar Rahimov",
    employeeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    position: "Katta Sotuvchi",
    storeName: "Chilonzor Filiali",
    title: "Iyul Oyi Sotuv va Bilim Chempioni",
    description: "Chakana savdo testi bo'yicha 100/100 ball to'pladi hamda oylik rejani 145% ga bajardi!",
    pointsEarned: 500,
    date: "2026-08-01",
  },
  {
    id: "spt_2",
    employeeName: "Nigora Yoqubova",
    employeeAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    position: "Mijozlar Bilan Muloqot Mutaxassisi",
    storeName: "Samarqand Markaz Filiali",
    title: "Eng Yuqori Mijoz Reytingi",
    description: "100 dan ortiq xaridorlardan faqat 5+ yulduzli sharhlar to'pladi.",
    pointsEarned: 450,
    date: "2026-08-03",
  },
  {
    id: "spt_3",
    employeeName: "Malika Karimova",
    employeeAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    position: "Bosh Kassir",
    storeName: "Chilonzor Filiali",
    title: "Kassa Intizomi Bo'yicha Buzuq Xatosiz Ko'rsatkich",
    description: "Barcha kassa testlarini a'lo darajada topshirib, eng aniq hisobot topshirdi.",
    pointsEarned: 400,
    date: "2026-07-28",
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: "crs_1",
    title: "Chakana Savdo Standartlari va Oliy Xizmat Ko'rsatish",
    category: "Mijozlarga Xizmat",
    description: "Hamkor do'konlarida xaridorlarni kutib olish, ehtiyojlarini aniqlash, mahsulotni professional taqdim etish va e'tirozlarni yengish ko'nikmalari.",
    coverImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=80",
    author: "Malika Ikromova (L&D Metodist)",
    durationHours: 1.5,
    level: "Boshlang'ich",
    passScorePercentage: 80,
    assignedStores: ["all"],
    createdDate: "2026-07-01",
    modules: [
      {
        id: "mod_1_1",
        title: "1-Qism: iSpring Taqdimot - Mijoz Bilan Muloqot Oltin Qoidalari",
        type: "presentation",
        durationMinutes: 20,
        slides: [
          {
            id: "sld_1",
            slideNumber: 1,
            title: "Xush Kelibsiz: Hamkor Standartlari",
            content: "Hamkor do'konlar tizimida har bir mijoz — eng aziz mehmonimizdir. Bizning maqsadimiz faqat mahsulot sotish emas, balki samimiy va ishonchli munosabat o'rnatishdir.",
            bulletPoints: [
              "Tabassum va iliq salomlashish (Birinchi 3 sekunda)",
              "Xaridor ehtiyojini tinglash va to'g'ri savol berish",
              "Sifat va kafolat kafolatlari",
            ],
            imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=80",
            audioDurationSec: 45,
            speakerNotes: "Salomlashishda xaridorning ko'ziga samimiy qarab, standard va mayin ovozda tabassum bilan gapiring.",
          },
          {
            id: "sld_2",
            slideNumber: 2,
            title: "Ehtiyojni Aniqlash Texnikasi (SPIN Metodi)",
            content: "Mijozga mos mahsulot taklif qilishdan oldin, uning aniq maqsadi va qiyinchiligini tushunib olish kerak.",
            bulletPoints: [
              'Vaziyatga oid savollar: "Ushbu mahsulotni kimgadir sovg\'a sifatida qidiryapsizmi?"',
              'Muammoli savollar: "Amaldagi vositangizda nimalar sizni qoniqtirmayapti?"',
              'Yo\'naltiruvchi savollar: "Agarda doimiy kafolat berilsa, ushbu model sizga qulayroq bo\'lardi, to\'g\'rimi?"',
            ],
            imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
            audioDurationSec: 60,
            speakerNotes: "Mijoz o'z fikrini aytayotganda, uning gapini bo'lmang va asosiy fikrlarni qayd eting.",
          },
          {
            id: "sld_3",
            slideNumber: 3,
            title: 'E\'tirozlar Bilan Ishlash: "Qimmat" iborasiga javob',
            content: "Qimmat deyilganda xaridor mahsulot qiymatini hali to'liq anglab yetmagan bo'ladi. Narxni emas, afzallikni tushuntiring!",
            bulletPoints: [
              'Rozilik bildiring: "Tushunaman, narx har doim muhim omil..."',
              'Qiymatni ko\'rsating: "...lekin ushbu model energiya tejaydi va 3 yil bepul kafolatga ega!"',
              'Taqqoslang: "Kuniga hisoblaganda ushbu investitsiya juda arzon tushadi."',
            ],
            imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=80",
            audioDurationSec: 50,
            speakerNotes: "Hech qachon mijoz bilan tortishmang. 'Yo'q, bu qimmat emas' deyish qat'iyan man etiladi.",
          },
        ],
      },
      {
        id: "mod_1_2",
        title: "2-Qism: Amaliy Video Darslik - Zal Dasturi va Vitrina Tartibi",
        type: "video",
        durationMinutes: 15,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "mod_1_dialogue",
        title: "3-Qism: iSpring Muloqot Simulyatsiyasi (Mijoz E'tirozlari Bilan Ishlash)",
        type: "dialogue_simulation",
        durationMinutes: 10,
        dialogueData: {
          id: "sim_muloqot_1",
          title: "Mijoz E'tirozi va Narx Standartlari Simulyatsiyasi",
          scenarioDescription: "Do'konga kirgan xaridor mahsulot narxidan va kafolat shartlaridan norozi bo'lmoqda. Xushmuomalalik bilan mijoz e'tirozini bartaraf eting.",
          passingScore: 70,
          steps: [
            {
              id: "step_1",
              characterName: "Nodira Karimova",
              characterRole: "Xaridor (Ikkilanayotgan mijoz)",
              characterAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
              characterMood: "angry",
              speechBubble: "Assalomu alaykum. Ushbu mahsulot narxi boshqa joyga qaraganda qimmatroq ekan-ku! Nega sizlarda narxlar buncha baland?",
              options: [
                {
                  id: "opt_1",
                  text: "Samimiy tabassum bilan: 'Tushunaman, narx muhim omil. Bizda barcha mahsulotlar rasmiy va 3 yillik bepul servis kafolatiga ega!'",
                  nextStepId: "step_2",
                  points: 15,
                  moodChange: "happy",
                  feedbackMessage: "Ofarin! Narx e'tiroziga qiymat va bepul servis kafolati orqali javob berish iSpring standartlariga to'liq mos keladi.",
                },
                {
                  id: "opt_2",
                  text: "Bizda sifatli mahsulot, xohlasangiz boshqa arzonroq do'konga borishingiz mumkin deyish.",
                  nextStepId: "step_2",
                  points: -10,
                  moodChange: "angry",
                  feedbackMessage: "Xato yondashuv! Mijozga bunday muomala qilish korporativ brend va servis madaniyatiga zid.",
                },
              ],
            },
            {
              id: "step_2",
              characterName: "Nodira Karimova",
              characterRole: "Xaridor (Mamnun va Razi bo'lgan mijoz)",
              characterAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
              characterMood: "delighted",
              speechBubble: "Rahmat! Rasmiy kafolat va servis judayam muhim. Menga ushbu modelni rasmiylashtirib bering!",
              options: [
                {
                  id: "opt_21",
                  text: "Kassaga kuzatib qo'yish, mos aksessuarni tavsiya qilish hamda xarid uchun rahmat aytish.",
                  nextStepId: "finish",
                  points: 20,
                  moodChange: "delighted",
                  feedbackMessage: "A'lo darajadagi sotuv yakuni! Mijoz mamnun bo'ldi va qo'shimcha mahsulot taklifi bildirildi.",
                },
              ],
            },
          ],
        },
      },
      {
        id: "mod_1_3",
        title: "4-Qism: Yakuniy Interaktiv Test (Mijozlar Bilan Ishlash)",
        type: "quiz",
        durationMinutes: 15,
        questions: [
          {
            id: "q_1_1",
            question: "Xaridor do'konga kirganida birinchi salomlashish qaysi vaqt oralig'ida amalga oshirilishi shart?",
            options: [
              "Dastlabki 3 soniya ichida",
              "Xaridor o'zi yondashganida",
              "1 daqiqadan so'ng",
              "Kassaga yaqinlashganda",
            ],
            correctAnswerIndex: 0,
            explanation: "Hamkor standartiga ko'ra, birinchi 3 soniya mijozda samimiy taassurot qoldirish uchun hal qiluvchi hisoblanadi.",
            points: 25,
          },
          {
            id: "q_1_2",
            question: 'Mijoz "Bu mahsulot juda qimmat ekan" deganda eng to\'g\'ri reaksiya qanday bo\'lishi kerak?',
            options: [
              "Darhol narxni e'tirozsiz pasaytirish",
              "Rozilik bildirib, mahsulot afzalligi va kafolatini tushuntirish",
              "Mijozga arzonroq boshqa do'konga borishni maslahat berish",
              'Inkor qilib, "Aksincha bu juda arzon" deyish',
            ],
            correctAnswerIndex: 1,
            explanation: "Mijoz e'tiroziga birinchi bo'lib rozilik bildirilib, keyin narxdan ko'ra sifat va kafolat urg'ulanadi.",
            points: 25,
          },
          {
            id: "q_1_3",
            question: "Ehtiyojni aniqlashda ochiq savollarning maqsadi nima?",
            options: [
              "Mijozni tezroq chiqarib yuborish",
              "Mijozning batafsil talabi va muammosini tinglab olish",
              'Faqat "Ha" yoki "Yo\'q" javobini olish',
              "Mahsulot kodini aniqlash",
            ],
            correctAnswerIndex: 1,
            explanation: "Ochiq savollar mijozning erkin gapirishiga va uning haqiqiy ehtiyojini tushunishga imkon beradi.",
            points: 25,
          },
          {
            id: "q_1_4",
            question: "Xaridor do'kondan chiqib ketayotganda nima deyish lozim?",
            options: [
              "Hech narsa demaslik",
              "Xaridingiz uchun rahmat, sizni yana kutib qolamiz!",
              "Eshikni yopib keting",
              "Kassaga murojaat qiling",
            ],
            correctAnswerIndex: 1,
            explanation: "Minnatdorchilik bildirish takroriy xaridlarni va mijoz sodiqligini oshiradi.",
            points: 25,
          },
        ],
      },
    ],
  },
  {
    id: "crs_2",
    title: "Kassa Tizimi va Naqd Puldagi Hisob-Kitob Intizomi",
    category: "Moliya va Kassa",
    description: "Kassirlar uchun 1C va POS terminallar bilan ishlash, terminal to'lovlari, incassatsiya va kunlik hisobot topshirish tartiblari.",
    coverImage: "https://images.unsplash.com/photo-1556742049-0a67d165545f?w=800&auto=format&fit=crop&q=80",
    author: "Malika Ikromova & Moliya Bo'limi",
    durationHours: 1.0,
    level: "O'rta",
    passScorePercentage: 85,
    assignedStores: ["all"],
    createdDate: "2026-07-10",
    modules: [
      {
        id: "mod_2_1",
        title: "1-Qism: Kassa Operatsiyalari va QR-to'lovlar Taqdimoti",
        type: "presentation",
        durationMinutes: 15,
        slides: [
          {
            id: "sld_2_1",
            slideNumber: 1,
            title: "POS Terminal va QR To'lovlar",
            content: "Zamonaviy kassa amaliyotida Humo, Uzcard, Click va Payme orqali to'lovlarni to'g'ri qabul qilish va kassa chekini taqdim etish majburiydir.",
            bulletPoints: [
              "Terminal chekini saqlash",
              "Fiskal chek va QR kod berish",
              "Qaytarib berish (Return) tartibi",
            ],
            imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=80",
            audioDurationSec: 30,
          },
        ],
      },
      {
        id: "mod_2_2",
        title: "2-Qism: Kassa Testi",
        type: "quiz",
        durationMinutes: 10,
        questions: [
          {
            id: "q_2_1",
            question: "Mijoz to'lovni QR-kod orqali amalga oshirganda fiskal chek berish shartmi?",
            options: [
              "Ha, albatta fiskal chek berilishi shart",
              "Yo'q, elektron to'lovda chek shart emas",
              "Faqat mijoz so'rasagina",
              "Faqat 100 ming so'mdan oshsa",
            ],
            correctAnswerIndex: 0,
            explanation: "Qonunchilikka va Hamkor kassa intizomiga ko'ra har qanday to'lov turi bo'yicha fiskal chek majburiydir.",
            points: 50,
          },
          {
            id: "q_2_2",
            question: "Kun oxirida kassadagi naqd pul inkassatsiyaga qanday topshiriladi?",
            options: [
              "Sanab, inkassatsiya xaltasiga muhrlab va dalolatnoma rasmiylashtirib",
              "Shunchaki sumkaga solib beriladi",
              "Do'konda ertangi kunga qoldiriladi",
              "Menejersiz rasmiylashtiriladi",
            ],
            correctAnswerIndex: 0,
            explanation: "Inkassatsiya faqat rasmiy muhr va ikki nusxali dalolatnoma orqali amalga oshiriladi.",
            points: 50,
          },
        ],
      },
    ],
  },
  {
    id: "crs_3",
    title: "Mahsulotlar Katalogi: Maishiy Texnika va Elektronika Tezislar",
    category: "Mahsulot Bilimi",
    description: "Yangi mavsum mahsulotlari bilan tanishish, texnik ko'rsatkichlar va ularning amaldagi afzalliklari.",
    coverImage: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80",
    author: "O'quv Bo'limi (L&D)",
    durationHours: 2.0,
    level: "Yuqori",
    passScorePercentage: 75,
    assignedStores: ["store_1", "store_3"],
    createdDate: "2026-07-20",
    modules: [
      {
        id: "mod_3_1",
        title: "Video Darslik: Yangi Avlod Texnikalari Afzalliklari",
        type: "video",
        durationMinutes: 25,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
];

export const INITIAL_WORK_ISSUES: WorkIssue[] = [
  {
    id: "iss_1",
    storeId: "store_1",
    storeName: "Chilonzor Filiali",
    reportedBy: "Malika Karimova",
    reportedByRole: "Bosh Kassir",
    title: "Yangi chegirma promo-kodlarini kassa terminalida qo'llashda sekinlashish",
    description: "Aksiya doirasidagi chegirmalarni kassa dasturida skaner qilganda 2-3 marta xatolik berayapti. Mijozlar navbatda kutib qolmoqda.",
    category: "Kassa Tizimi",
    status: "Jarayonda",
    date: "2026-08-07",
    assignedManagerId: "usr_3",
    notes: "IT bo'limiga bildirishnoma yuborildi. Bugun kassa dasturi yangilanadi.",
  },
  {
    id: "iss_2",
    storeId: "store_1",
    storeName: "Chilonzor Filiali",
    reportedBy: "Anvar Rahimov",
    reportedByRole: "Katta Sotuvchi",
    title: "Yangi konditsionerlar modelining kafolat shartlari bo'yicha ko'proq ma'lumot kerak",
    description: "Xaridorlar invertor konditsionerlar bepul o'rnatilishi haqida so'rashyapti. Rasmiy yo'riqnoma qisqa.",
    category: "Mijozlar Bilan Muloqot",
    status: "Yangi",
    date: "2026-08-08",
    assignedManagerId: "usr_3",
  },
];

export const INITIAL_TASKS: AssignedTask[] = [
  {
    id: "tsk_1",
    assignedByManagerId: "usr_3",
    assignedByManagerName: "Dilshod Qodirov (Do'kon Rahbari)",
    assignedToUserId: "usr_1",
    assignedToUserName: "Anvar Rahimov",
    courseId: "crs_1",
    title: "Chakana Savdo Standartlari testini takroran takomillashtirish",
    description: "Mijozlar e'tirozi bilan ishlash modulidagi xatolarni qayta ko'rib chiqing va testni 100% ga yakunlang.",
    deadline: "2026-08-12",
    status: "Bajarilmoqda",
    createdDate: "2026-08-06",
  },
  {
    id: "tsk_2",
    assignedByManagerId: "usr_3",
    assignedByManagerName: "Dilshod Qodirov (Do'kon Rahbari)",
    assignedToUserId: "usr_2",
    assignedToUserName: "Malika Karimova",
    courseId: "crs_2",
    title: "Kassa intizomi va QR to'lovlar modulini yakunlash",
    description: "Bugun kechki smenagacha Kassa kursining 2-modulini muvaffaqiyatli topshirishingiz lozim.",
    deadline: "2026-08-10",
    status: "Kutilmoqda",
    createdDate: "2026-08-07",
  },
];

export const INITIAL_CHANNELS: ChatChannel[] = [
  {
    id: "chn_1",
    name: "📢 Umumiy Korporativ Chat",
    description: "Barcha filial va xodimlar uchun umumiy muloqot hamda e'lonlar xonasi",
    type: "public",
  },
  {
    id: "chn_store_1",
    name: "🏪 Chilonzor Filiali Chati",
    description: "Faqat Chilonzor filiali xodimlari va rahbari uchun maxsus ichki muloqot",
    type: "store",
    storeId: "store_1",
    rulesOrNotice: "Hurmatli Chilonzor filiali jamoasi! Kunlik savdo va smena rejasini shu yerda muhokama qilamiz.",
  },
  {
    id: "chn_store_2",
    name: "🏪 Yunusobod Filiali Chati",
    description: "Faqat Yunusobod filiali xodimlari va rahbari uchun maxsus ichki muloqot",
    type: "store",
    storeId: "store_2",
    rulesOrNotice: "Yunusobod filiali ichki muloqot va intizom kanali.",
  },
  {
    id: "chn_store_3",
    name: "🏪 Samarqand Markaz Chati",
    description: "Faqat Samarqand Markaz filiali xodimlari va rahbari uchun maxsus muloqot",
    type: "store",
    storeId: "store_3",
    rulesOrNotice: "Samarqand Markaz filiali jamoasi uchun.",
  },
  {
    id: "chn_store_4",
    name: "🏪 Farg'ona Filiali Chati",
    description: "Faqat Farg'ona filiali xodimlari va rahbari uchun maxsus muloqot",
    type: "store",
    storeId: "store_4",
  },
  {
    id: "chn_store_5",
    name: "🏪 Buxoro Filiali Chati",
    description: "Faqat Buxoro filiali xodimlari va rahbari uchun maxsus muloqot",
    type: "store",
    storeId: "store_5",
  },
  {
    id: "chn_3",
    name: "🎓 LMS Savol-Javob va Yordam",
    description: "Kurslar, prezentatsiyalar va testlar bo'yicha metodist hamda trenerlar bilan muloqot",
    type: "public",
  },
];

export const INITIAL_QA_QUESTIONS: CourseQAQuestion[] = [
  {
    id: "qa_1",
    courseId: "crs_1",
    courseTitle: "Chakana Savdo Standartlari va Oliy Xizmat Ko'rsatish",
    userId: "usr_1",
    userName: "Anvar Rahimov",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    userRole: "Katta Sotuvchi",
    title: "Mijoz e'tiroz bildirganda 'SPIN' usuli amaliyotda qanday ishlaydi?",
    content: "Mijoz mahsulot narxiga darhol e'tiroz bildirganda, birinchi bo'lib qaysi turdagi savolni berish samaraliroq?",
    date: "2026-08-08",
    likes: 8,
    likedBy: ["usr_2", "usr_3", "usr_4"],
    answers: [
      {
        id: "ans_1",
        questionId: "qa_1",
        userId: "usr_4",
        userName: "Malika Ikromova",
        userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        userRole: "L&D Metodist",
        text: "Assalomu alaykum Anvar! SPIN usulida birinchi bo'lib Muammoli savol berish kerak: 'Ushbu mahsulotda siz uchun eng muhim funksiya nima?'. Shu orqali mijoz diqqatini narxdan qimmatga va foydaga burasiz.",
        date: "2026-08-08",
        isOfficialSolution: true,
      },
    ],
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg_1",
    channelId: "chn_1",
    senderId: "usr_4",
    senderName: "Malika Ikromova",
    senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    senderRole: "L&D Metodist",
    text: "Assalomu alaykum qadrli Hamkor jamoasi! Portalimizga yangi iSpring uslubidagi interaktiv prezentatsiya kurslari joylandi.",
    timestamp: "10:15",
  },
  {
    id: "msg_2",
    channelId: "chn_store_1",
    senderId: "usr_3",
    senderName: "Dilshod Qodirov",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    senderRole: "Do'kon Rahbari",
    text: "Salom jamoa! Chilonzor filiali bu hafta o'quv ko'rsatkichlari bo'yicha a'lo natija ko'rsatyapti. Anvar va Malika, yangi vazifalarni ko'rib chiqinglar.",
    timestamp: "11:30",
  },
  {
    id: "msg_3",
    channelId: "chn_store_1",
    senderId: "usr_1",
    senderName: "Anvar Rahimov",
    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    senderRole: "Katta Sotuvchi",
    text: "Tushundim Dilshod aka! Hozir e'tirozlar moduli ustida ishlayapman.",
    timestamp: "11:32",
  },
];

export const INITIAL_MISTAKES: FailedQuestionMistake[] = [
  {
    id: "mst_1",
    userId: "usr_1",
    courseId: "crs_1",
    courseTitle: "Chakana Savdo Standartlari",
    question: {
      id: "q_1_2",
      question: 'Mijoz "Bu mahsulot juda qimmat ekan" deganda eng to\'g\'ri reaksiya qanday bo\'lishi kerak?',
      options: [
        "Darhol narxni e'tirozsiz pasaytirish",
        "Rozilik bildirib, mahsulot afzalligi va kafolatini tushuntirish",
        "Mijozga arzonroq boshqa do'konga borishni maslahat berish",
        'Inkor qilib, "Aksincha bu juda arzon" deyish',
      ],
      correctAnswerIndex: 1,
      explanation: "E'tirozga avval rozilik bildirilib, keyin mahsulot sifati va uzoq muddatli tejash afzalligi tushuntiriladi.",
      points: 25,
    },
    userWrongAnswerIndex: 3,
    failedDate: "2026-08-04",
    isResolved: false,
  },
  {
    id: "mst_2",
    userId: "usr_1",
    courseId: "crs_2",
    courseTitle: "Kassa Tizimi va Hisob-Kitob Intizomi",
    question: {
      id: "q_2_1",
      question: "Mijoz to'lovni QR-kod orqali amalga oshirganda fiskal chek berish shartmi?",
      options: [
        "Ha, albatta fiskal chek berilishi shart",
        "Yo'q, elektron to'lovda chek shart emas",
        "Faqat mijoz so'rasagina",
        "Faqat 100 ming so'mdan oshsa",
      ],
      correctAnswerIndex: 0,
      explanation: "O'zbekiston kassa intizomiga ko'ra har qanday to'lov usulida fiskal chek majburiydir.",
      points: 50,
    },
    userWrongAnswerIndex: 1,
    failedDate: "2026-08-05",
    isResolved: false,
  },
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "cert_101",
    certificateNumber: "HMK-2026-8841",
    userId: "usr_1",
    userName: "Anvar Rahimov",
    userPosition: "Katta Sotuvchi-Konsultant",
    courseId: "crs_1",
    courseTitle: "Chakana Savdo Standartlari va Oliy Xizmat Ko'rsatish",
    scorePercentage: 100,
    issuedDate: "2026-08-01",
  },
];

export const INITIAL_APPLIANCE_SPECS: ApplianceSpec[] = [
  {
    id: 'comp_tv_1',
    category: 'tv',
    categoryLabel: 'Televizorlar',
    modelA: {
      brand: 'Samsung',
      name: 'Samsung 55" QLED Q60C 4K Smart TV',
      specs: ['Quantum Dot Texnologiyasi', 'Dual LED Yoritish', '100% Rang Hajmi', 'SolarCell Pult'],
      pros: ["Yorqin xonalarda ham mukammal tasvir", "Quyosh va xona chirog'idan quvvat oluvchi pult"],
      priceUzs: 8200000,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=400',
    },
    modelB: {
      brand: 'LG',
      name: 'LG 55" NanoCell NANO77 4K Smart TV',
      specs: ['NanoCell Filtr', 'webOS 23 Tizimi', 'Magic Remote Pult (Sichqoncha)', 'α5 AI Processor Gen6'],
      pros: ["Keng ko'rish burchagi (IPS)", "Sehrli Magic Remote pult va ovozli qidiruv"],
      priceUzs: 7900000,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=400',
    },
    keyDifference: "Samsung QLED yorqin ranglar va quyoshli xonalar uchun afzal, LG NanoCell esa o'yinlar va Magic pult qulayligi uchun eng yaxshisi.",
    customerObjection: "Nega oddiy LED TVdan qimmat?",
    bestSalesPitch: "QLED rang so'nib qolmaydi, 10 yil kuyishga (burn-in) kafolati bor va pultiga batareyka sotib olish shart emas!",
  },
  {
    id: 'comp_washer_1',
    category: 'washers',
    categoryLabel: 'Kir Yuvish Mashinalari',
    modelA: {
      brand: 'LG',
      name: 'LG Inverter Direct Drive 8 kg (F2V3GS6W)',
      specs: ['Inverter Direct Drive Motor', 'AI DD Sun\'iy Intellekt Mato Aniqlash', 'Steam Bug\'da Ishlov Berish', '10 Yil Mator Kafolati'],
      pros: ["Deyarli shovqinsiz va tebranishsiz ishlaydi", "Matoni zararlamay avtomatik yuvish rejimi"],
      priceUzs: 6400000,
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400',
    },
    modelB: {
      brand: 'Samsung',
      name: 'Samsung EcoBubble 8 kg (WW80T3040BS)',
      specs: ['EcoBubble Ko\'pik Texnologiyasi', 'Digital Inverter Motor', 'Steam Wash Bug\'', 'Drum Clean Baraban Tozalash'],
      pros: ["Sovuq suvda ham ko'pik orqali chuqur tozalaydi", "Kam elektr energiyasi sarflaydi (A+++)"],
      priceUzs: 6100000,
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400',
    },
    keyDifference: "LG to'g'ridan-to'g mehanizm (Direct Drive) tufayli jim ishlaydi, Samsung esa sovuq suvda dog'larni ketkazish va tejamkorlikda ustun.",
    customerObjection: "Inverter motor qimmat emasmi?",
    bestSalesPitch: "Inverter mator elektrni 40% tejaydi va 10 yil kafolati bor. 2 yilda elektr tejalgani hisobiga farq o'zini qoplaydi!",
  },
  {
    id: 'comp_fridge_1',
    category: 'fridge',
    categoryLabel: 'Muzlatgichlar',
    modelA: {
      brand: 'Samsung',
      name: 'Samsung NoFrost SpaceMax 385L (RB34T600FSA)',
      specs: ['SpaceMax Qalin bo\'lmagan devorlar', 'All-Around Cooling har tomonlama sovitish', 'Digital Inverter Kompressor', 'NoFrost Muzlamaydigan'],
      pros: ["Tashqi o'lchami standart, ichki sig'imi esa 30% kattaroq", "Har bir tokchada alohida sovuq havo puflagich"],
      priceUzs: 7400000,
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=400',
    },
    modelB: {
      brand: 'Artel',
      name: 'Artel Grand Inverter 360L (HD430WEN)',
      specs: ['Inverter Kompressor', 'Multi Air Flow havo oqimi', 'Fresh Zone sabzavot qutisi', 'Mahalliy Kafolat va Servis'],
      pros: ["O'zbekiston bo'ylab 50+ rasmiy servis markazi mavjud", "Elektr toki o'ynashiga chidamli (Volt Control)"],
      priceUzs: 5300000,
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=400',
    },
    keyDifference: "Samsung kattaroq ichki hajm va premium metall dizaynga ega, Artel esa hamyonbop narx va viloyatlarda tezkor servis afzalligiga ega.",
    customerObjection: "Muzlatgich devorlari qizib ketadimi?",
    bestSalesPitch: "Hozirgi barcha zamonaviy NoFrost muzlatgichlarda radiator devor ichiga yashirilgan, qizishi bu normal va orqa tomonga chang yig'ilmaydi!",
  },
  {
    id: 'comp_ac_1',
    category: 'ac',
    categoryLabel: 'Konditsionerlar',
    modelA: {
      brand: 'Midea',
      name: 'Midea Breezeless 12000 BTU Inverter',
      specs: ['TwinFlap 7928 ta Mikro-Teshikcha', 'Full DC Inverter', 'Wi-Fi Smart Boshqaruv', 'I-Clean O\'zini Tozalash'],
      pros: ["Sovuq shamol to'g'ridan-to'g'ri badanga urmaydi (Breezeless)", "A+++ yuqori energiya samaradorligi"],
      priceUzs: 5800000,
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400',
    },
    modelB: {
      brand: 'Artel',
      name: 'Artel Shahrisabz Inverter 12000 BTU',
      specs: ['Inverter Kompressor', 'Golden Fin antikorrozion qoplama', '3 Yil To\'liq Kafolat', 'Past kuchlanishda ishlash (160V)'],
      pros: ["Kuchlanish pasayganda ham barqaror ishlaydi", "Ehtiyot qismlari arzon va tez topiladi"],
      priceUzs: 4200000,
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400',
    },
    keyDifference: "Midea Breezeless chaqaloq va qariyalari bor xonadonlar uchun shamol urishidan himoyalaydi, Artel esa viloyatlardagi tok o'ynashiga bardoshli.",
    customerObjection: "Inverter konditsioner oddiysidan nimasi yaxshi?",
    bestSalesPitch: "Oddiy konditsioner o'chib-yonib tokni ko'p yeydi. Inverter esa xona haroratini bir me'yorda ushlab elektrni 60% tejaydi!",
  },
];

export const INITIAL_NASIYA_PARTNERS: NasiyaPartner[] = [
  { id: 'anorbank', name: 'Anorbank Nasiya', markupRate: 0.18, ratePercent: 18, maxMonths: [3, 6, 12, 24], description: '18% yillik ustama • Bepul karta rasmiylashtirish', color: 'indigo', badgeColor: 'indigo' },
  { id: 'iman', name: 'Iman Nasiya (Halol)', markupRate: 0.20, ratePercent: 20, maxMonths: [3, 6, 12], description: '20% yillik Ustama • Halol shariat standartlariga mos', color: 'emerald', badgeColor: 'emerald' },
  { id: 'uzum', name: 'Uzum Nasiya', markupRate: 0.22, ratePercent: 22, maxMonths: [3, 6, 12], description: '22% yillik ustama • Uzum ilovasi orqali instant tasdiq', color: 'purple', badgeColor: 'purple' },
  { id: 'solfy', name: 'Solfy Plastik', markupRate: 0.15, ratePercent: 15, maxMonths: [3, 6, 12, 18], description: '15% yillik ustama • Solfy rasmiy plastik kartasi egalariga', color: 'blue', badgeColor: 'blue' },
];

export const INITIAL_AUDIT_CRITERIA: AuditCriterion[] = [
  {
    id: 'audit_1',
    category: "Tsennik va Narxnomalar (Price Tags)",
    title: "Barcha maishiy texnikada rasmiy tsennik va aksiya yorliqlari joyidami?",
    description: "Kassa va vitrinadagi har bir TV, muzlatgich, kir yuvish mashinasida narxi va oylik nasiya to'lovi ko'rsatilgan bo'lishi shart.",
    weight: 15,
  },
  {
    id: 'audit_2',
    category: "Raskladka va Merchandising (Visual Display)",
    title: "Texnikalar toifa va brend bo'yicha to'g'ri joylashtirilganmi?",
    description: "Televizorlar diagonal bo'yicha, muzlatgichlar hajmi bo'yicha va kir yuvish mashinalari chiroyli ketma-ketlikda turishi kerak.",
    weight: 20,
  },
  {
    id: 'audit_3',
    category: "Demo va Ishchi Holat (Active Displays)",
    title: "Namoyishdagi TV va texnikalar ishchi holatda va 4K rolik ijro etilmoqdami?",
    description: "Barcha namoyish TVlarida sifatli video roliklar yoniq bo'lishi hamda stendlardagi chiroqlar ishlashi shart.",
    weight: 20,
  },
  {
    id: 'audit_4',
    category: "Tozalik va Gigiyena (Cleanliness)",
    title: "Texnika va shisha javonlarda chang hamda barmoq izlari yo'qmi?",
    description: "Displeylar va metall sirtlar maxsus vosita bilan tozalangan va pollar topshirilgan.",
    weight: 15,
  },
  {
    id: 'audit_5',
    category: "Xodimlar Intizomi va Forma (Staff Standards)",
    title: "Sotuvchi va kassirlar rasmiy forma va bejdikda samimiy muloqotdami?",
    description: "Xodimlar bejdik taqqan, tartibli va mijozlarni 3 soniya ichida tabassum bilan kutib olmoqda.",
    weight: 15,
  },
  {
    id: 'audit_6',
    category: "Kassa va Hujjatlar (Cashier & Documents)",
    title: "Kassada QR chek, kafolat taloni va terminal kassa apparatlari sozg'mi?",
    description: "Xaridorlarga kafolat taloni rasmiylashtirilmoqda va kassa hujjati to'g'ri topshirilmoqda.",
    weight: 15,
  },
];

export const INITIAL_DAILY_QUIZ: DailyQuizQuestion[] = [
  {
    id: 'dq_1',
    question: "Samsung QLED va LG NanoCell televizorlarida rasmiy kuyish (burn-in) kafolati qaysi brendda 10 yil beriladi?",
    options: ["LG NanoCell", "Samsung QLED", "Artel Smart TV", "Ikkalasida ham yo'q"],
    correctIndex: 1,
    explanation: "Samsung QLED Quantum Dot panellari kuyishga qarshi 10 yillik rasmiy kafolatga ega.",
  },
  {
    id: 'dq_2',
    question: "Inverter Direct Drive kir yuvish mashinalarining boshqalardan eng asosiy texnik afzalligi nimada?",
    options: [
      "Suv sarflamaydi",
      "Tasmalar (ремень) yo'q va mator barabanga to'g'ridan-to'g'ri ulangan (shovqinsiz)",
      "Faqat issiq suvda ishlaydi",
      "Muzlatgich bilan birga ishlaydi",
    ],
    correctIndex: 1,
    explanation: "Direct Drive matorida kamarlar (tasma) bo'lmaydi, mator to'g'ridan-to'g'ri ulangani uchun tebranish va shovqin kamayadi.",
  },
  {
    id: 'dq_3',
    question: "Midea Breezeless konditsionerining 'Breezeless' funksiyasi nimani anglatadi?",
    options: [
      "Sovuq havo urmaydi, mayin va tarqoq mikro-teshikchalar orqali sovutadi",
      "Isitish rejimida ishlamaydi",
      "Faqat tunda ishlaydi",
      "Pultsiz ishlaydi",
    ],
    correctIndex: 0,
    explanation: "Breezeless texnologiyasi 7928 ta mikro-teshiklar orqali sovuq havo oqimini tarqatib, to'g'ridan-to'g'ri shamol urishidan himoya qiladi.",
  },
];

export const INITIAL_REWARDS_CATALOG: RewardStoreItem[] = [
  {
    id: 'reward_polo',
    title: "Brendlangan Polo Futbolkasi (Samsung / LG / Store)",
    category: 'merch',
    costCoins: 300,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300',
    description: "Paxtali premium matodan tayyorlangan do'kon rasmiy xodimlar Polo futbolkasi.",
    stock: 12,
  },
  {
    id: 'reward_thermos',
    title: "Eko Termos-Krujka 500ml",
    category: 'merch',
    costCoins: 200,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=300',
    description: "Issiq kofe va choyni 12 soat davomida haroratini saqlovchi zanglamaydigan termos.",
    stock: 8,
  },
  {
    id: 'reward_voucher',
    title: "100 000 So'mlik Do'kon Sovg'a Vaucheri",
    category: 'voucher',
    costCoins: 500,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=300',
    description: "Tarmoq do'konlarimizdan istalgan maishiy texnika va aksessuarga ishlatish mumkin.",
    stock: 20,
  },
  {
    id: 'reward_coffee',
    title: "Tushlik va Kofe Abonomenti (5 kunlik)",
    category: 'perks',
    costCoins: 150,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=300',
    description: "Do'kon yonidagi kofexona va oshxonada bepul tushlik qilish kuponi.",
    stock: 15,
  },
  {
    id: 'reward_badge',
    title: "Oltin 'Oy Mutaxassisi' Bejdik Va Unvoni",
    category: 'badge',
    costCoins: 400,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300',
    description: "Do'konda maxsus imtiyoz beruvchi va profilda aks etuvchi oltin unvon.",
    stock: 5,
  },
];

// ==========================================
// 1. AI SOTUV TRENAJYORI & E'TIROZLAR PERSONAS
// ==========================================
export const INITIAL_CUSTOMER_PERSONAS: CustomerPersona[] = [
  {
    id: 'persona_1',
    name: 'Bahodir Aka (Arzon Variant Qidiruvchi)',
    role: 'Tejamkor Xaridor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    difficulty: "O'rta",
    personality: 'Narxga juda sezgir, boshqa bozor va do\'konlarni taqqoslaydi, lekin sifatli narsani tushuntirsa sotib oladi.',
    targetProduct: 'Samsung 55" QLED 4K Smart TV',
    initialObjection: '"Ukam, Abu Saxiy bozorida yoki boshqa do\'konda xuddi shu televizor 500 ming so\'m arzonroq ekan, sizlarda nega qimmat?"',
    dialogueRounds: [
      {
        roundNumber: 1,
        customerSpeech: '"Ukam, Abu Saxiy bozorida yoki boshqa do\'konda xuddi shu televizor 500 ming so\'m arzonroq ekan, sizlarda nega qimmat?"',
        suggestedHints: [
          "Mijoz e'tiroziga avval rozilik bildiring (Empatiya)",
          "Rasmiy 3 yillik servis kafolati va bepul yetkazib o'rnatishni ta'kidlang",
          "Bozordagi kontrabanda yoki xitoy proshivka xavfini muloyim tushuntiring"
        ],
        sampleBestAnswer: "Bahodir aka, to'g'ri aytasiz, pulni tejash har doim muhim! Lekin bizdagi televizor to'liq rasmiy O'zbekiston uchun ishlab chiqarilgan bo'lib, 3 yil to'liq rasmiy servis markazi kafolati va bepul uyga yetkazib devorga o'rnatib berish xizmati ichida.",
        options: [
          {
            id: 'opt_1_a',
            text: "Bahodir aka, to'g'ri aytdingiz, tejash muhim! Lekin bizdagi TV rasmiy 3 yillik kafolat va xonadoningizga bepul yetkazib o'rnatib berish bilan taqdim etiladi. Bozorlardagi nusxalarda esa kafolat va bepul servis bo'lmasligi mumkin.",
            score: 95,
            feedback: "A'lo darajada! Empatiya bildirildi va qo'shimcha qiymat (rasmiy kafolat + bepul o'rnatish) orqali narx oqlandi.",
            customerReaction: '"Ha, to\'g\'ri aytasiz, ertaga buzilsa bozorni qidirib yurgandan ko\'ra rasmiy servis yaxshi... Lekin bu QLED oddiy TVdan nima bilan farq qiladi?"'
          },
          {
            id: 'opt_1_b',
            text: "Bozordagilar kontrabanda va qalloblik, biz rasmiy do'konmiz, narximiz shunaqa.",
            score: 30,
            feedback: "Qo'pol va agressiv javob. Mijoz o'zini noqulay his qildi.",
            customerReaction: '"Nega endi hamma bozordagi sotuvchilar qallob bo\'lsin? Menga bunday gapirmang."'
          },
          {
            id: 'opt_1_c',
            text: "Agar xohlasangiz 100 ming chegirma qilib berishim mumkin, rozi bo'lasizmi?",
            score: 55,
            feedback: "Mahsulot qadrini ochmasdan darhol marginni yo'qotdingiz.",
            customerReaction: '"100 ming kam-ku, bozor bilan farq baribir 400 ming qolyapti."'
          }
        ]
      },
      {
        roundNumber: 2,
        customerSpeech: '"Lekin bu QLED oddiy LED televizordan nima bilan farq qiladi? Ortiqcha pul to\'lashga arziydimi?"',
        suggestedHints: [
          "Quantum Dot rang to'yinganligini tushuntiring",
          "10 yillik kuyishga qarshi (burn-in) kafolatni ayting",
          "Kunduzgi yorug' xonada ham qorayib qolmasligini ko'rsating"
        ],
        sampleBestAnswer: "QLED texnologiyasi quyoshli xonada ham ranglarni 100% tiniq ko'rsatadi, eng asosiysi ekranda piksellar kuyib ketmaydi va pulti quyoshdan quvvat oladi.",
        options: [
          {
            id: 'opt_2_a',
            text: "QLED texnologiyasida Quantum Dot kristallari ishlatiladi. Bu hatto yorug' kunduz kuni ham ranglarni 100% tiniq saqlaydi va 10 yil ekran kuyishiga kafolati bor. Pultiga ham batareyka olish shart emas, quyoshdan zaryad oladi!",
            score: 100,
            feedback: "Mukammal texnik tushuntirish va mijoz uchun amaliy foydalar sanab o'tildi!",
            customerReaction: '"Zo\'r ekan-ku! Pultiga batareyka kerak emasligi ayniqsa yoqdi. Qani bir ko\'raylikchi, qanday rasmiylashtirsak bo\'ladi?"'
          },
          {
            id: 'opt_2_b',
            text: "QLED yangi model, hamma shuni olyapti, sifati zo'r.",
            score: 40,
            feedback: "Juda yuzaki javob. Texnik faktlar va mijoz foydasi aytilmadi.",
            customerReaction: '"Hamma olsa ham menga farqi nimada ekanligi qiziq-da ukam..."'
          }
        ]
      }
    ]
  },
  {
    id: 'persona_2',
    name: 'Nilufar Opa (Kafolat va Servisga Shubhali)',
    role: 'Oila Bekasi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    difficulty: "O'rta",
    personality: 'Oldin boshqa joydan olgan texnikasi tez buzilib qolgan, shuning uchun kafolat, servis va usta xizmatiga juda qattiq e\'tibor beradi.',
    targetProduct: 'LG Inverter Direct Drive 8kg Kir Yuvish Mashinasi',
    initialObjection: '"O\'tgan yili olgan kir yuvish mashinam 6 oyda sakrab, qattiq ovoz chiqarib buzildi. Bu LG ham shunaqa bo\'lib qolmaydimi?"',
    dialogueRounds: [
      {
        roundNumber: 1,
        customerSpeech: '"O\'tgan yili olgan kir yuvish mashinam 6 oyda sakrab, qattiq ovoz chiqarib buzildi. Bu LG ham shunaqa bo\'lib qolmaydimi?"',
        suggestedHints: [
          "Avvalgi noxush tajribasiga hamdardlik bildiring",
          "Direct Drive (to'g'ridan-to'g'ri mator) ning tasmasiz ekanini va tebranmasligini tushuntiring",
          "Matorga 10 yillik rasmiy zavod kafolatini ayting"
        ],
        sampleBestAnswer: "Nilufar opa, sizni juda yaxshi tushunaman, mashina sakrab shovqin qilsa asab buziladi. Lekin bu LG modelida kamar (tasme) yo'q — mator to'g'ridan-to'g'ri barabanga ulangan, shuning uchun sakramaydi va motoriga 10 yil kafolat beriladi.",
        options: [
          {
            id: 'opt_2_1',
            text: "Nilufar opa, sizni juda yaxshi tushunaman, shovqinli texnika asabni buzadi. Bu LG modelida Direct Drive tizimi mavjud — ya'ni rezinka kamar yo'q, mator to'g'ridan-to'g'ri barabanga ulangan. Shu sababli deyarli sakramaydi va zavod motorni 10 yil kafolatlaydi.",
            score: 98,
            feedback: "Qoyilmaqom! Empatiya orqali ishonch o'rnatildi va texnik afzallik tushunarli tilda ifodalandi.",
            customerReaction: '"Rostdanmi? Qanaqa yuvish rejimlari bor? Nozik kiyimlarni yirtib qo\'ymaydimi?"'
          },
          {
            id: 'opt_2_2',
            text: "Yo'q, LG brendi yaxshi, buzilmaydi xavotir olmang.",
            score: 35,
            feedback: "Shubhali mijozga quruq va'da berish ishonchni oshirmaydi.",
            customerReaction: '"Oldingisi ham taniqli brend edi, lekin buzildi-da..."'
          }
        ]
      }
    ]
  },
  {
    id: 'persona_3',
    name: 'Jasur (Brend va Imidjga Qiziquvchi Yosh Yigit)',
    role: 'Texnologiya Ishqibozi',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    difficulty: 'Ekspert',
    personality: 'Zamonaviy gadjetlar, Smart Home, Wi-Fi boshqaruv va dizaynga qiziqadi. Standart gaplarga ishonmaydi.',
    targetProduct: 'Midea Breezeless Inverter Konditsioner',
    initialObjection: '"Menga oddiy sovuq uradigan konditsioner kerak emas, zamonaviy va telefondan boshqariladigani bormi o\'zi?"',
    dialogueRounds: [
      {
        roundNumber: 1,
        customerSpeech: '"Menga oddiy sovuq uradigan konditsioner kerak emas, zamonaviy va telefondan boshqariladigani bormi o\'zi?"',
        suggestedHints: [
          "Midea Breezeless 7928 ta mikro-teshikli texnologiyasini tushuntiring",
          "SmartHome Wi-Fi ilovasi orqali yo'ldan kelayotganda yoqish qulayligini ayting",
          "Energiya tejash darajasi (A+++) haqida gapiring"
        ],
        sampleBestAnswer: "Aynan siz qidirgan model — Midea Breezeless! SmartHome ilovasi orqali ishdan qaytayotib yoqib qo'yasiz, 7928 ta mikro-teshiklari esa to'g'ridan-to'g'ri shamol urmasdan xonani bir tekis mayin sovutadi.",
        options: [
          {
            id: 'opt_3_1',
            text: "Aynan siz uchun Midea Breezeless modeli mukammal mos keladi! Unda o'rnatilgan Wi-Fi orqali smartfondan masofadan boshqarish mumkin. 7928 ta mikro-teshikchasi esa shamol urmasdan mayin havo tarqatadi.",
            score: 100,
            feedback: "Mijozning barcha talablariga 100% mos taklif berildi!",
            customerReaction: '"Voy ancha zo\'r narsa ekan-ku! Ilovasi o\'zbek tilida ham ishlaydimi?"'
          },
          {
            id: 'opt_3_2',
            text: "Bizda oddiy konditsionerlar ham bor, narxi ancha arzon.",
            score: 25,
            feedback: "Mijozning ehtiyojini inkor qildingiz va down-sell qildingiz.",
            customerReaction: '"Men arzon demadim, smart va sifatli dedim-ku..."'
          }
        ]
      }
    ]
  }
];

// ==========================================
// 2. 1V1 KNOWLEDGE DUEL QUESTIONS & LEAGUE
// ==========================================
export const INITIAL_DUEL_QUESTIONS: DuelQuestion[] = [
  {
    id: 'dq_duel_1',
    question: "Samsung QLED televizorlarida quyosh va xona chirog'idan quvvat oluvchi pult qanday nomlanadi?",
    options: ["Magic Remote", "SolarCell Remote", "Air Remote", "Smart Clicker"],
    correctIndex: 1,
    category: "Televizorlar",
    timeLimitSec: 15,
  },
  {
    id: 'dq_duel_2',
    question: "LG Inverter Direct Drive kir yuvish mashinalarida qaysi detal umuman mavjud emas?",
    options: ["Baraban", "Elektr toki", "Kamar (ремень)", "Filtr"],
    correctIndex: 2,
    category: "Kir Yuvish",
    timeLimitSec: 15,
  },
  {
    id: 'dq_duel_3',
    question: "NoFrost muzlatgichlarning asosiy xususiyati nimada?",
    options: [
      "Muzlatmaydi, faqat isitadi",
      "Devorlarida muz va qirov hosil bo'lmaydi",
      "Faqat qishda ishlaydi",
      "Elektrsiz ishlaydi"
    ],
    correctIndex: 1,
    category: "Muzlatgichlar",
    timeLimitSec: 15,
  },
  {
    id: 'dq_duel_4',
    question: "Mijoz 'Bu mahsulot juda qimmat' deganida birinchi qilinadigan eng to'g'ri harakat?",
    options: [
      "Darhol 50% chegirma qilish",
      "Mijoz his-tuyg'usiga rozilik bildirib (Empatiya), qiymat va afzallikni ochish",
      "Do'kondan chiqib ketishini so'rash",
      "Boshqa sotuvchiga o'tkazish"
    ],
    correctIndex: 1,
    category: "Savdo Psixologiyasi",
    timeLimitSec: 15,
  },
  {
    id: 'dq_duel_5',
    question: "Midea Breezeless konditsionerida sovuq shamol to'g'ridan-to'g'ri urmasligi uchun nechta mikro-teshikcha mavjud?",
    options: ["100 ta", "1000 ta", "7928 ta", "50 ta"],
    correctIndex: 2,
    category: "Konditsionerlar",
    timeLimitSec: 15,
  },
  {
    id: 'dq_duel_6',
    question: "Chakana savdo qoidalariga ko'ra do'konga kirgan xaridorga necha soniyada salom berilishi kerak?",
    options: ["3-5 soniya ichida", "10 daqiqadan keyin", "Faqat xaridor o'zi kelsa", "Kassaga borganda"],
    correctIndex: 0,
    category: "Xizmat Standartlari",
    timeLimitSec: 15,
  }
];

export const INITIAL_STORE_LEAGUE: StoreLeagueBranch[] = [
  {
    rank: 1,
    storeId: 'store_1',
    storeName: 'Chilonzor Flagman Filiali',
    city: 'Toshkent',
    duelsWon: 142,
    totalPoints: 8950,
    winRatePercent: 88,
    trend: 'up',
    badge: '🏆 Oltin Filial',
  },
  {
    rank: 2,
    storeId: 'store_3',
    storeName: 'Samarqand Registon Filiali',
    city: 'Samarqand',
    duelsWon: 128,
    totalPoints: 8120,
    winRatePercent: 82,
    trend: 'up',
    badge: '🥈 Kumush Filial',
  },
  {
    rank: 3,
    storeId: 'store_2',
    storeName: 'Yunusobod Mega Filiali',
    city: 'Toshkent',
    duelsWon: 115,
    totalPoints: 7640,
    winRatePercent: 78,
    trend: 'down',
    badge: '🥉 Bronza Filial',
  },
  {
    rank: 4,
    storeId: 'store_4',
    storeName: 'Farg\'ona Vodiy Filiali',
    city: 'Farg\'ona',
    duelsWon: 98,
    totalPoints: 6890,
    winRatePercent: 74,
    trend: 'same',
    badge: '⭐ Faol Filial',
  },
  {
    rank: 5,
    storeId: 'store_5',
    storeName: 'Buxoro Qadim Filiali',
    city: 'Buxoro',
    duelsWon: 85,
    totalPoints: 5900,
    winRatePercent: 70,
    trend: 'up',
    badge: '⭐ Rivojlanayotgan',
  }
];

// ==========================================
// 3. AI SMART PDP (INDIVIDUAL RIVOJLANISH XARITASI)
// ==========================================
export const INITIAL_PDP_COMPETENCIES: PDPCompetency[] = [
  {
    key: 'product_knowledge',
    name: 'Maishiy Texnika Bilimi (QLED, Inverter, NoFrost)',
    currentLevel: 85,
    targetLevel: 95,
    status: 'good',
    recommendedAction: "Midea konditsionerlari va yangi avlod muzlatgichlari taqqoslash modulini takrorlang."
  },
  {
    key: 'objection_handling',
    name: "E'tirozlar Qaytirish (Narx, Kafolat, Brend)",
    currentLevel: 72,
    targetLevel: 90,
    status: 'needs_focus',
    recommendedAction: "AI Sotuv Trenajyorida Bahodir aka (arzon variant izlovchi) bilan 2 marta mashq qiling."
  },
  {
    key: 'customer_psychology',
    name: 'Mijoz Psixologiyasi va SPIN Savollari',
    currentLevel: 88,
    targetLevel: 95,
    status: 'master',
    recommendedAction: "Xaridorni tinglash va ehtiyojni aniqlash ko'rsatkichi a'lo darajada!"
  },
  {
    key: 'cashier_standards',
    name: 'Kassa va Rasmiylashtirish Intizomi',
    currentLevel: 65,
    targetLevel: 85,
    status: 'needs_focus',
    recommendedAction: "Fiskal QR cheklar va kafolat taloni rasmiylashtirish testidan o'ting."
  },
  {
    key: 'service_speed',
    name: 'Tezkor Xizmat va Do\'kon Auditi',
    currentLevel: 90,
    targetLevel: 95,
    status: 'master',
    recommendedAction: "Vitrina raskladkasi va 3 soniya qoidasiga to'liq rioya qilinmoqda."
  }
];

export const INITIAL_PDP_MILESTONES: PDPMilestone[] = [
  {
    id: 'ms_1',
    title: "Chakana Savdo Standartlari Kursi",
    category: "Asosiy Kurs",
    duration: "45 daqiqa",
    isCompleted: true,
    scoreRequirement: 90,
    actionTab: "courses",
    tips: "Siz ushbu modulni 100% a'lo natija bilan yakunlagansiz."
  },
  {
    id: 'ms_2',
    title: "AI Sotuv Trenajyorida 3 ta E'tirozni Yengish",
    category: "Amaliy Mashq",
    duration: "15 daqiqa",
    isCompleted: false,
    scoreRequirement: 85,
    actionTab: "sales_sim",
    tips: "Bahodir aka va Nilufar opa keyslarini muvaffaqiyatli yakunlab +100 tanga oling."
  },
  {
    id: 'ms_3',
    title: "Xatolar Bankidagi 2 ta Savolni Qayta Topshirish",
    category: "Xatolar Ustida Ishlash",
    duration: "5 daqiqa",
    isCompleted: false,
    scoreRequirement: 100,
    actionTab: "mistakes",
    tips: "Xatolar bankidagi savollarga javob berib, o'zlashtirish foizingizni 95% ga yetkazing."
  },
  {
    id: 'ms_4',
    title: "1v1 Bilim Duelida 3 marta G'alaba Qozonish",
    category: "Gamification",
    duration: "10 daqiqa",
    isCompleted: false,
    scoreRequirement: 3,
    actionTab: "duel",
    tips: "Hamkasblar bilan bilim bellashuvida g'olib bo'ling va filial reytingini ko'taring."
  }
];

// ==========================================
// 4. ONBOARDING & STAJYOR ROADMAP (14 KUN)
// ==========================================
export const INITIAL_ONBOARDING_DAYS: OnboardingDayPlan[] = [
  {
    dayNumber: 1,
    title: "1-Kun: Kompaniya Madaniyati, Jamoa va Qoidalar",
    stage: 'madaniyat',
    description: "Kompaniya qadriyatlari, do'kon ichki tartib-qoidalari, kiyinish kodi (dress-code) va bejdik bilan tanishuv.",
    mentorSigned: true,
    tasks: [
      { id: 'ob_1_1', title: "Kompaniya tarixi va missiyasi taqdimotini ko'rish", description: "Hamkor maishiy texnika tarmog'i falsafasi va xizmat sifati.", durationMinutes: 20, isDone: true, requiredType: 'reading', linkedTab: 'courses' },
      { id: 'ob_1_2', title: "Do'kon rahbari va biriktirilgan murabbiy (mentor) bilan tanishish", description: "Do'konda xavfsizlik va ichki qoidalar yo'riqnomasi.", durationMinutes: 15, isDone: true, requiredType: 'mentor_check' },
      { id: 'ob_1_3', title: "Portalda shaxsiy profilni to'ldirish va rasm yuklash", description: "O'quv portalida faollikni boshlash.", durationMinutes: 10, isDone: true, requiredType: 'practice', linkedTab: 'profile' }
    ]
  },
  {
    dayNumber: 2,
    title: "2-Kun: Do'kon Zonasi va Mahsulotlar Joylashuvi",
    stage: 'madaniyat',
    description: "Do'kondagi zonalash: TV devori, oq texnika (muzlatgich, kir yuvish), mayda maishiy texnika va kassa hududi.",
    mentorSigned: true,
    tasks: [
      { id: 'ob_2_1', title: "Do'kon xaritasini o'rganish va rastalar joylashuvini yod olish", description: "Har bir toifadagi texnikalar qayerda joylashganini bilish.", durationMinutes: 30, isDone: true, requiredType: 'practice' },
      { id: 'ob_2_2', title: "Tsenniklar (narxnomalar) va aksiya stikerlarini tekshirish", description: "Barcha texnikalarda narxnomalar to'g'ri o'rnatilganini nazorat qilish.", durationMinutes: 20, isDone: true, requiredType: 'mentor_check', linkedTab: 'store_audit' }
    ]
  },
  {
    dayNumber: 3,
    title: "3-Kun: Televizorlar: QLED, OLED va Smart TV Asoslari",
    stage: 'texnika',
    description: "Samsung, LG, Artel televizorlarining farqlari, pultlar, Android TV va Tizen operatsion tizimlari.",
    mentorSigned: false,
    tasks: [
      { id: 'ob_3_1', title: "Televizorlar taqqoslash shpargalkasini o'qib chiqish", description: "QLED vs NanoCell farqlari va xaridor e'tirozlarini o'rganish.", durationMinutes: 25, isDone: true, requiredType: 'reading', linkedTab: 'cheat_sheet' },
      { id: 'ob_3_2', title: "Showroomda 3 ta televizorga Magic va Solar pultlarni ulab ko'rish", description: "Mijozga namoyish qilib berish bo'yicha amaliyot.", durationMinutes: 20, isDone: false, requiredType: 'practice' },
      { id: 'ob_3_3', title: "Kunlik 1-minutlik viktorinada qatnashish", description: "Televizorlar bo'yicha savollarga javob berish.", durationMinutes: 5, isDone: false, requiredType: 'quiz', linkedTab: 'rewards_store' }
    ]
  },
  {
    dayNumber: 5,
    title: "5-Kun: Kir Yuvish Mashinalari va Muzlatgichlar",
    stage: 'texnika',
    description: "Direct Drive inverter motorlar, EcoBubble, NoFrost va SpaceMax texnologiyalarini o'rganish.",
    mentorSigned: false,
    tasks: [
      { id: 'ob_5_1', title: "LG va Samsung kir yuvish mashinalari farqi modulini o'rganish", description: "Kamarli va kamarsiz motorlar farqini tushuntirish.", durationMinutes: 25, isDone: false, requiredType: 'reading', linkedTab: 'cheat_sheet' },
      { id: 'ob_5_2', title: "NoFrost muzlatgichlar afzalligini murabbiyga aytib berish", description: "Murabbiy oldida mini-taqdimot o'tkazish.", durationMinutes: 15, isDone: false, requiredType: 'mentor_check' }
    ]
  },
  {
    dayNumber: 8,
    title: "8-Kun: Mijoz Bilan Muloqotning 5 Oltin Bosqichi",
    stage: 'savdo_mijoz',
    description: "Salomlashish, ehtiyojni aniqlash, mahsulot taqdimoti, e'tirozlar bilan ishlash va sotuvni yopish.",
    mentorSigned: false,
    tasks: [
      { id: 'ob_8_1', title: "Chakana Savdo Standartlari kursini to'liq yakunlash", description: "Barcha interaktiv slaydlar va testlarni topshirish.", durationMinutes: 40, isDone: true, requiredType: 'reading', linkedTab: 'courses' },
      { id: 'ob_8_2', title: "AI Sotuv Trenajyorida 1-mashg'ulotni bajarish", description: "Bahodir aka bilan muzokarada kamida 85 ball olish.", durationMinutes: 15, isDone: false, requiredType: 'practice', linkedTab: 'sales_sim' }
    ]
  },
  {
    dayNumber: 12,
    title: "12-Kun: Kassa Intizomi, Kafolat va Servis",
    stage: 'savdo_mijoz',
    description: "Kafolat taloni to'ldirish, fiskal chek, qaytarish qoidalari va mijozga servisni tushuntirish.",
    mentorSigned: false,
    tasks: [
      { id: 'ob_12_1', title: "Kassa Tizimi va Hisob-Kitob Intizomi kursini o'rganish", description: "Moliyaviy xatolar va qoidalarni o'zlashtirish.", durationMinutes: 30, isDone: false, requiredType: 'reading', linkedTab: 'courses' },
      { id: 'ob_12_2', title: "Murabbiy nazorati ostida 1 ta namunaviy kafolat talonini to'ldirish", description: "Amaliy hujjat rasmiylashtirish.", durationMinutes: 15, isDone: false, requiredType: 'mentor_check' }
    ]
  },
  {
    dayNumber: 14,
    title: "14-Kun: Yakuniy Imtihon va Rasmiy Sertifikatlash",
    stage: 'imtihon',
    description: "14 kunlik stajirovka natijalari: nazariy test, amaliy savdo simulyatori va diplom topshirish.",
    mentorSigned: false,
    tasks: [
      { id: 'ob_14_1', title: "Yakuniy sertifikatlash testini 90%+ ball bilan topshirish", description: "Barcha 14 kunlik bilimlar bo'yicha imtihon.", durationMinutes: 30, isDone: false, requiredType: 'quiz', linkedTab: 'courses' },
      { id: 'ob_14_2', title: "Do'kon rahbari bilan yakuniy suhbat va stajirovkadan o'tganlik hujjati", description: "Asosiy shtatga qabul qilinish va unvon olish.", durationMinutes: 20, isDone: false, requiredType: 'mentor_check' }
    ]
  }
];

// ---------------- 5. INITIAL OBJECTION SCRIPTS ----------------
export const INITIAL_OBJECTION_SCRIPTS: ObjectionScript[] = [
  {
    id: 'obj_1',
    customerObjection: "Bozor yoki boshqa do'konda xuddi shu model 300-400 ming so'm arzonroq ekan...",
    category: 'price',
    difficulty: "O'rta",
    shortQuickAnswer: "To'g'ri, narx muhim omil. Lekin bizdagi narx ichiga rasmiy servis kafolati va bepul yetkazib berish kiradi.",
    detailedScript: "1. Rozi bo'ling va qadrlang: 'Sizni juda yaxshi tushunaman, narx solishtirish eng to'g'ri qaror.'\n2. Sababini ko'rsating: 'Bozordagi arzonroq modellar ko'pincha noqonuniy olib kirilgan (kulrang import) bo'ladi va ularda O'zbekiston bo'yicha rasmiy servis markazi xizmat ko'rsatmaydi.'\n3. Qiymat bering: 'Bizdan xarid qilsangiz, to'g'ridan-to'g'ri zavod kafolati, bepul o'rnatish va 1 yil davomida har qanday nosozlikda bepul xizmat kafolatlanadi. Kichik tejash tufayli keyinchalik katta xarajat qilib yurmaysiz.'",
    psychologyTip: "Hech qachon bozor yoki raqobatchini to'g'ridan-to'g'ri yomonlamang. Xaridorning tejash istagini to'g'ri qabul qilib, xavfsizlik va rasmiy servis qiymatini birinchi o'ringa qo'ying.",
    tags: ['narx', 'bozor', 'kafolat', 'chegirma']
  },
  {
    id: 'obj_2',
    customerObjection: "Hozircha faqat qiziqib ko'ryapman, turmush o'rtog'im / oilam bilan maslahatlashib keyin kelaman.",
    category: 'hesitation',
    difficulty: "Oson",
    shortQuickAnswer: "Albatta, oilaviy maslahatlashish juda to'g'ri! Keling, u kishiga ko'rsatishingiz uchun barcha parametr va taklifni qog'ozga yoki QR orqali yozib beraman.",
    detailedScript: "1. Ijobiy qo'llab-quvvatlang: 'Juda to'g'ri qaror, bunday texnika ko'p yillarga olinadi, oilaviy maslahat juda muhim.'\n2. Qulaylik yarating: 'Keling, adashib ketmasligingiz uchun men ushbu modelning 2 ta asosiy farqi, rasmiy narxi va do'konimiz aksiyasini QR orqali telefoningizga jo'nataman.'\n3. Zudlik (urgency) yarating: 'Aytgancha, ushbu modelga bepul yetkazib berish aksiyamiz shu haftagacha amal qiladi. Savollaringiz bo'lsa, to'g'ridan-to'g'ri menga aloqaga chiqishingiz mumkin.'",
    psychologyTip: "Xaridorni majburlamang, aksincha unga oilasi oldida 'ekspert' bo'lib ma'lumot berishiga yordam bering (Smart QR yoki vizitka berish orqali aloqani saqlang).",
    tags: ['ikkilanish', 'maslahat', 'oila']
  },
  {
    id: 'obj_3',
    customerObjection: "Artel / Shivaki sifatli emas, menga faqat Samsung yoki LG kerak deb eshitganman.",
    category: 'brand',
    difficulty: "Qiyin",
    shortQuickAnswer: "Samsung va LG dunyo giganti, ammo Artel/Shivaki ham aynan o'sha standartlarda, mahalliy sharoit va kafolat tezligi bo'yicha katta ustunlikka ega.",
    detailedScript: "1. Hurmat ko'rsating: 'Samsung va LG haqiqatan ham jahon brendlari, ularning texnologiyalari juda kuchli.'\n2. Solishtiring: 'Lekin Artelning yangi seriyalarida ham xuddi o'sha Inverter kompressorlar va A+++ energiya tejamkorlik moduli qo'llangan.'\n3. Eng katta ustunlik: 'Eng muhimi — mahalliy servis! Agar chet el brendiga ehtiyot qism 2-3 hafta kutilsa, Artel uchun har qanday detal do'konimiz servisida 24 soat ichida mavjud va 3 yillik to'liq kafolat beriladi.'",
    psychologyTip: "Mijozning brendga ishonchini sindirmang, mahalliy brendning ehtiyot qismlar arzonligi va kafolatning zudlik bilan bajarilishini asosiy qurol qiling.",
    tags: ['brend', 'sifat', 'artel', 'samsung']
  },
  {
    id: 'obj_4',
    customerObjection: "Nasiya savdoda ustama foiz juda ko'p ekan, foizsiz muddatli to'lov bormi?",
    category: 'credit',
    difficulty: "O'rta",
    shortQuickAnswer: "Bizda Anorbank, Uzum Nasiya va Alif orqali 0% boshlang'ich to'lov va qulay muddatlar bor. Kunlik hisoblasak arzimas summa chiqadi.",
    detailedScript: "1. Oylik xarajatga bo'lib bering: 'To'g'ri, yillik summani birdaniga ko'rganda ko'pdek tuyulishi mumkin. Lekin oylik to'lovga bo'lsak, masalan, oyiga 350 ming so'm — bu kuniga 10-12 ming so'm degani (bitta kofe puli).'\n2. Inflyatsiya va qulaylik: 'Eng asosiysi, texnika bugunoq uyingizda ishlaydi, narxlar oshsa ham sizning oylik to'lovingiz o'zgarmaydi.'\n3. Hujjat rasmiylashtirish: 'Passportingiz bo'lsa, 3 daqiqada hech qanday qog'ozbozliksiz tasdiqlab beramiz.'",
    psychologyTip: "Katta yillik summani kunlik yoki oylik kichik tushunarli xarajatlarga bo'lib ko'rsating.",
    tags: ['nasiya', 'muddatli_tolov', 'kredit']
  }
];

// ---------------- 6. INITIAL PRODUCT MATCHERS ----------------
export const INITIAL_PRODUCT_MATCHERS: ProductMatcherItem[] = [
  {
    id: 'pm_1',
    category: 'tv',
    productName: "Samsung 55' Crystal UHD 4K (CU7000)",
    brand: 'Samsung',
    price: 5900000,
    budgetTier: 'mid',
    roomSize: '20-30',
    keyFeature: 'Smart 4K / QLED',
    whyRecommended: "20-30 kv.m xonalar uchun eng ideal 4K tiniqlik va Tizen Smart tizimi.",
    salesPitch: "Mijozga: 'Ushbu modelda PurColor ranglar tizimi bor, oddiy kanallarni ham avtomatik ravishda 4K sifatga ko'tarib beradi. 3-4 metr masofadan ko'z charchamaydi.'",
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'pm_2',
    category: 'tv',
    productName: "Artel 43' Android Smart TV (9000 Series)",
    brand: 'Artel',
    price: 3200000,
    budgetTier: 'budget',
    roomSize: '15-20',
    keyFeature: 'Smart 4K / QLED',
    whyRecommended: "Hamyonbop narxda rasmiy Android TV va ovozli boshqaruvli pult.",
    salesPitch: "Mijozga: 'Yotoqxona yoki oshxona uchun eng qulay variant. Pultiga mikrofonda gapirsangiz, YouTube va kinolarni darhol ochib beradi.'",
    imageUrl: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'pm_3',
    category: 'washer',
    productName: "LG 7kg Direct Drive Inverter (AI DD)",
    brand: 'LG',
    price: 6400000,
    budgetTier: 'mid',
    familySize: '4-6',
    keyFeature: "Bug'da yuvish (Steam)",
    whyRecommended: "Kamarsiz to'g'ridan-to'g'ri inverter motor — shovqinsiz va 10 yillik motor kafolati.",
    salesPitch: "Mijozga: 'AI DD aqlli datchigi mato turini o'zi aniqlab, kiyimlarni yirtmasdan yumshoq yuvadi va Steam bug' tizimi barcha bakteriyalarni yo'qotadi.'",
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'pm_4',
    category: 'fridge',
    productName: "Samsung NoFrost SpaceMax 340L (RB34)",
    brand: 'Samsung',
    price: 7800000,
    budgetTier: 'mid',
    familySize: '4-6',
    keyFeature: 'NoFrost / FreshZone',
    whyRecommended: "SpaceMax ingichka devorlari hisobiga tashqi o'lchami kichik bo'lsa ham ichki sig'imi juda katta.",
    salesPitch: "Mijozga: 'All-Around Cooling har bir tokchaga bir tekis sovuq havo puflaydi. Mevalar va ko'katlar 2 barobar uzoqroq yangi saqlanadi.'",
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'pm_5',
    category: 'ac',
    productName: "Artel Inverter 12HP (Shahrisabz Series)",
    brand: 'Artel',
    price: 4600000,
    budgetTier: 'mid',
    roomSize: '20-30',
    keyFeature: 'Inverter / Kam Energiya',
    whyRecommended: "A+++ energiya tejamkorligi, past kuchlanishda (150V) ham to'xtovsiz ishlash qobiliyati.",
    salesPitch: "Mijozga: 'Bizning issiq yozimiz va qishki sovuqlarimizga moslangan. Elektr tokini 40% gacha tejaydi va kuchlanish o'ynaganda ham o'chib qolmaydi.'",
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80'
  }
];

// ==========================================
// 7. SKILL MATRIX & BRANCH HEATMAP DATA
// ==========================================
export const INITIAL_SKILL_HEATMAPS: SkillHeatmapBranch[] = [
  {
    storeId: 'store_1',
    storeName: 'Chilonzor Flagman Filiali',
    city: 'Toshkent',
    managerName: 'Zafar Qodirov',
    employeeCount: 14,
    skills: {
      techKnowledge: 92,
      salesPsychology: 89,
      serviceAndWarranty: 94,
      cashAndStandards: 85,
      creditAndNasiya: 90,
      overallScore: 90,
    },
    criticalGaps: ["Kassa fiskal cheklari va qaytarish qoidalari"],
    recommendedCourseId: 'c_retail_1',
    lastAssessmentDate: '2026-08-15',
  },
  {
    storeId: 'store_2',
    storeName: 'Yunusobod Mega Filiali',
    city: 'Toshkent',
    managerName: 'Nodira Salimova',
    employeeCount: 11,
    skills: {
      techKnowledge: 78,
      salesPsychology: 74,
      serviceAndWarranty: 82,
      cashAndStandards: 91,
      creditAndNasiya: 70,
      overallScore: 79,
    },
    criticalGaps: ["Nasiya hamkorlari shartlari va foizsiz muddatlar", "Savdoda SPIN savollar"],
    recommendedCourseId: 'c_retail_1',
    lastAssessmentDate: '2026-08-16',
  },
  {
    storeId: 'store_3',
    storeName: 'Samarqand Registon Filiali',
    city: 'Samarqand',
    managerName: 'Sherzod Alimov',
    employeeCount: 12,
    skills: {
      techKnowledge: 88,
      salesPsychology: 85,
      serviceAndWarranty: 90,
      cashAndStandards: 88,
      creditAndNasiya: 86,
      overallScore: 87,
    },
    criticalGaps: ["Oshxona texnikasi induksion plitalar"],
    recommendedCourseId: 'c_appliances_1',
    lastAssessmentDate: '2026-08-14',
  },
  {
    storeId: 'store_4',
    storeName: 'Farg\'ona Vodiy Filiali',
    city: 'Farg\'ona',
    managerName: 'Javohir Toshmatov',
    employeeCount: 9,
    skills: {
      techKnowledge: 68,
      salesPsychology: 72,
      serviceAndWarranty: 76,
      cashAndStandards: 80,
      creditAndNasiya: 64,
      overallScore: 72,
    },
    criticalGaps: ["QLED vs OLED TV farqlari", "Muddatli to'lov skriptlari"],
    recommendedCourseId: 'c_appliances_1',
    lastAssessmentDate: '2026-08-17',
  },
  {
    storeId: 'store_5',
    storeName: 'Buxoro Qadim Filiali',
    city: 'Buxoro',
    managerName: 'Aziza Karimova',
    employeeCount: 8,
    skills: {
      techKnowledge: 82,
      salesPsychology: 79,
      serviceAndWarranty: 85,
      cashAndStandards: 88,
      creditAndNasiya: 81,
      overallScore: 83,
    },
    criticalGaps: ["Inverter konditsionerlar maydon hisobi"],
    recommendedCourseId: 'c_appliances_1',
    lastAssessmentDate: '2026-08-12',
  }
];

// ==========================================
// 8. STORE COMPETITIONS & LEAGUES
// ==========================================
export const INITIAL_STORE_COMPETITIONS: StoreCompetitionChallenge[] = [
  {
    id: 'comp_1',
    title: 'Avgust: Smart Texnika & Konditsionerlar Chempionati',
    category: 'Mavsumiy Savdo',
    description: "Eng yuqori o'quv testi o'zlashtirishi va konditsionerlar hamda Smart TV savdo ko'rsatkichiga ega bo'lgan 3 ta eng kuchli do'kon jamoasiga yirik pul mukofoti va korporativ sayohat yo'llanmasi.",
    prizePool: '25,000,000 so\'m',
    bonusCoins: 5000,
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    status: 'active',
    bannerImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    targetMetric: "O'quv kursi o'zlashtirish 90%+ va premium texnika savdo tushumi",
    topBranches: [
      {
        rank: 1,
        storeId: 'store_1',
        storeName: 'Chilonzor Flagman Filiali',
        score: 96,
        salesVolumeUzs: 485000000,
        badge: '🥇 1-O\'rin',
      },
      {
        rank: 2,
        storeId: 'store_3',
        storeName: 'Samarqand Registon Filiali',
        score: 92,
        salesVolumeUzs: 420000000,
        badge: '🥈 2-O\'rin',
      },
      {
        rank: 3,
        storeId: 'store_2',
        storeName: 'Yunusobod Mega Filiali',
        score: 88,
        salesVolumeUzs: 390000000,
        badge: '🥉 3-O\'rin',
      }
    ]
  },
  {
    id: 'comp_2',
    title: 'Xizmat Standarti va Mystery Shopper Kubogi',
    category: 'Sifat Auditi',
    description: "Do'kon tozaligi, vitrina tartibi, 3-soniya salomlashish va xatolarsiz kassa cheklari bo'yicha eng yuqori ball to'plagan filialga maxsus kubok.",
    prizePool: '10,000,000 so\'m',
    bonusCoins: 3000,
    startDate: '2026-08-10',
    endDate: '2026-09-10',
    status: 'active',
    bannerImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=80',
    targetMetric: "360 Audit ko'rsatkichi 95%+ va xaridorlar e'tirozining minimal darajasi",
    topBranches: [
      {
        rank: 1,
        storeId: 'store_3',
        storeName: 'Samarqand Registon Filiali',
        score: 98,
        salesVolumeUzs: 310000000,
        badge: '🥇 Lider',
      },
      {
        rank: 2,
        storeId: 'store_1',
        storeName: 'Chilonzor Flagman Filiali',
        score: 95,
        salesVolumeUzs: 340000000,
        badge: '🥈 2-O\'rin',
      }
    ]
  }
];

// ==========================================
// 9. ROI & BUSINESS IMPACT CORRELATION DATA
// ==========================================
export const INITIAL_ROI_DATA: RoiCorrelationData[] = [
  {
    storeName: 'Chilonzor Flagman Filiali',
    city: 'Toshkent',
    trainingCompletionRate: 95,
    salesRevenueGrowthPercent: 32,
    customerSatisfactionScore: 4.9,
    complaintsReducedPercent: 52,
    status: 'high_performer',
  },
  {
    storeName: 'Samarqand Registon Filiali',
    city: 'Samarqand',
    trainingCompletionRate: 91,
    salesRevenueGrowthPercent: 26,
    customerSatisfactionScore: 4.8,
    complaintsReducedPercent: 44,
    status: 'high_performer',
  },
  {
    storeName: 'Buxoro Qadim Filiali',
    city: 'Buxoro',
    trainingCompletionRate: 84,
    salesRevenueGrowthPercent: 18,
    customerSatisfactionScore: 4.7,
    complaintsReducedPercent: 35,
    status: 'growing',
  },
  {
    storeName: 'Yunusobod Mega Filiali',
    city: 'Toshkent',
    trainingCompletionRate: 79,
    salesRevenueGrowthPercent: 14,
    customerSatisfactionScore: 4.5,
    complaintsReducedPercent: 22,
    status: 'growing',
  },
  {
    storeName: 'Farg\'ona Vodiy Filiali',
    city: 'Farg\'ona',
    trainingCompletionRate: 68,
    salesRevenueGrowthPercent: 6,
    customerSatisfactionScore: 4.2,
    complaintsReducedPercent: 10,
    status: 'needs_attention',
  }
];



