export const SITUATIONS = [
  {
    id: 'transport',
    title: 'Auto Rickshaw & Cabs',
    kannadaTitle: 'ಆಟೋ ಮತ್ತು ಟ್ಯಾಕ್ಸಿ ಪ್ರಯಾಣ',
    icon: 'Car',
    color: 'from-amber-500 to-yellow-600',
    description: 'Bargaining, asking for meter, giving directions and paying.',
    phrases: [
      {
        id: 'auto-1',
        kannada: 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಬರ್ತೀರಾ?',
        transliteration: 'Majestic-ge bar-theera?',
        english: 'Will you come to Majestic?',
        context: 'Asking driver if they will go to your destination',
        category: 'Inquiry'
      },
      {
        id: 'auto-2',
        kannada: 'ಮೀಟರ್ ಹಾಕಿ ಹೋಗಿ ಸಾರ್.',
        transliteration: 'Meter haaki hogi, sir.',
        english: 'Please put the meter and go, sir.',
        context: 'Insisting on fair fare',
        category: 'Bargaining'
      },
      {
        id: 'auto-3',
        kannada: 'ಇಲ್ಲಿ ರೈಟ್ ತಗೊಳ್ಳಿ, ಮುಂದೆ ಲೆಫ್ಟ್.',
        transliteration: 'Illi right thagolli, munde left.',
        english: 'Take a right here, then left ahead.',
        context: 'Directing the driver on the road',
        category: 'Directions'
      },
      {
        id: 'auto-4',
        kannada: 'ಎಷ್ಟು ಆಯ್ತು? ಆನ್‌ಲೈನ್ ಪೇ ಮಾಡ್ತೀನಿ.',
        transliteration: 'Eshtu aaythu? Online pay maadtheeni.',
        english: 'How much is it? I will pay online (UPI).',
        context: 'Payment at trip end',
        category: 'Payment'
      },
      {
        id: 'auto-5',
        kannada: 'ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಹೋಗಿ.',
        transliteration: 'Swalpa nidhaanavaagi hogi.',
        english: 'Please drive a little slower.',
        context: 'Safety request',
        category: 'Safety'
      }
    ],
    quiz: [
      {
        question: 'How do you politely ask an auto driver "How much is it?" in Kannada?',
        options: [
          'Eshtu aaythu?',
          'Yelli hogbeku?',
          'Yaaru neevu?',
          'Oota aaytha?'
        ],
        correct: 0,
        explanation: '"Eshtu aaythu?" directly means "How much did it become?" or "How much is it?".'
      },
      {
        question: 'What does "Swalpa nidhaanavaagi hogi" mean?',
        options: [
          'Drive very fast',
          'Please drive a little slowly',
          'Stop right here',
          'Turn left now'
        ],
        correct: 1,
        explanation: '"Swalpa" = a little, "nidhaanavaagi" = slowly, "hogi" = go.'
      }
    ]
  },
  {
    id: 'market',
    title: 'Vegetable & Grocery Market',
    kannadaTitle: 'ತರಕಾರಿ ಮತ್ತು ದಿನಸಿ ಮಾರುಕಟ್ಟೆ',
    icon: 'ShoppingBag',
    color: 'from-emerald-500 to-green-600',
    description: 'Asking prices, checking freshness, and quantity bargaining.',
    phrases: [
      {
        id: 'mkt-1',
        kannada: 'ಟೊಮ್ಯಾಟೊ ಒಂದು ಕೆಜಿಗೆ ಎಷ್ಟು?',
        transliteration: 'Tomato ondu kg-ge eshtu?',
        english: 'How much for one kilo of tomatoes?',
        context: 'Asking unit price',
        category: 'Pricing'
      },
      {
        id: 'mkt-2',
        kannada: 'ತರಕಾರಿ ತಾಜಾ ಇದೆಯಾ?',
        transliteration: 'Tharakaari thaaja ideya?',
        english: 'Are the vegetables fresh?',
        context: 'Checking quality',
        category: 'Quality'
      },
      {
        id: 'mkt-3',
        kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ ಕೊಡಿ ಅಣ್ಣಾ.',
        transliteration: 'Swalpa kadime maadi kodi anna.',
        english: 'Please reduce the price a bit, brother.',
        context: 'Polite bargaining with vendor',
        category: 'Bargaining'
      },
      {
        id: 'mkt-4',
        kannada: 'ಸ್ವಲ್ಪ ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು ಹಾಕಿ.',
        transliteration: 'Swalpa kothambari soppu haaki.',
        english: 'Please put some extra coriander leaves.',
        context: 'Asking for complimentary herbs',
        category: 'Complimentary'
      },
      {
        id: 'mkt-5',
        kannada: 'ಚಿಲ್ಲರೆ ಇದೆಯಾ ನಿಮ್ಮ ಹತ್ತಿರ?',
        transliteration: 'Chillare ideya nimma hathira?',
        english: 'Do you have loose change?',
        context: 'Cash transaction check',
        category: 'Payment'
      }
    ],
    quiz: [
      {
        question: 'What is the Kannada word for "Fresh"?',
        options: ['Bisi (ಬಿಸಿ)', 'Thaaja (ತಾಜಾ)', 'Thanna (ತಣ್ಣ)', 'Kempu (ಕೆಂಪು)'],
        correct: 1,
        explanation: '"Thaaja" means fresh. "Bisi" means hot.'
      }
    ]
  },
  {
    id: 'restaurant',
    title: 'Hotels & Darshinis',
    kannadaTitle: 'ಹೋಟೆಲ್ ಮತ್ತು ತಿಂಡಿ',
    icon: 'Utensils',
    color: 'from-orange-500 to-red-500',
    description: 'Ordering crispy dosas, filter coffee, and requesting bills.',
    phrases: [
      {
        id: 'res-1',
        kannada: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಬಿಸಿ ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ.',
        transliteration: 'Ondu masala dose matthu bisi filter coffee kodi.',
        english: 'Please give one masala dosa and hot filter coffee.',
        context: 'Iconic breakfast order in Bangalore',
        category: 'Ordering'
      },
      {
        id: 'res-2',
        kannada: 'ಖಾರ ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.',
        transliteration: 'Khaara swalpa kadime maadi.',
        english: 'Make it a little less spicy.',
        context: 'Customizing spice level',
        category: 'Preference'
      },
      {
        id: 'res-3',
        kannada: 'ಸಾಂಬಾರ್ ಇನ್ನೊಂದು ಸ್ವಲ್ಪ ಕೊಡಿ.',
        transliteration: 'Sambar innondu swalpa kodi.',
        english: 'Please give a little more sambar.',
        context: 'Requesting refill at table',
        category: 'Refill'
      },
      {
        id: 'res-4',
        kannada: 'ತಿಂಡಿ ತುಂಬಾ ರುಚಿಯಾಗಿದೆ!',
        transliteration: 'Thindi thumba ruchiyaagide!',
        english: 'The breakfast/food is very delicious!',
        context: 'Complimenting the chef/staff',
        category: 'Appreciation'
      },
      {
        id: 'res-5',
        kannada: 'ಬಿಲ್ ಕೊಡಿ ಸಾರ್.',
        transliteration: 'Bill kodi sir.',
        english: 'Please give the bill, sir.',
        context: 'Settling meal',
        category: 'Billing'
      }
    ],
    quiz: [
      {
        question: 'What is "Thumba ruchiyaagide"?',
        options: [
          'It is very cold',
          'It is very spicy',
          'It is very delicious',
          'I want more food'
        ],
        correct: 2,
        explanation: '"Ruchi" means taste/flavor, so "ruchiyaagide" means delicious.'
      }
    ]
  },
  {
    id: 'healthcare',
    title: 'Doctor & Medical Pharmacy',
    kannadaTitle: 'ಆಸ್ಪತ್ರೆ ಮತ್ತು ಔಷಧಾಲಯ',
    icon: 'HeartPulse',
    color: 'from-rose-500 to-pink-600',
    description: 'Explaining symptoms, buying prescribed medicines, and asking dosages.',
    phrases: [
      {
        id: 'med-1',
        kannada: 'ನನಗೆ ಎರಡು ದಿನದಿಂದ ಜ್ವರ ಮತ್ತು ತಲೆನೋವು ಇದೆ.',
        transliteration: 'Nanage eradu dinadinda jwara matthu talenovu ide.',
        english: 'I have had a fever and headache for two days.',
        context: 'Explaining symptoms to doctor',
        category: 'Symptoms'
      },
      {
        id: 'med-2',
        kannada: 'ಈ ಮಾತ್ರೆ ಊಟ ಆದ್ಮೇಲೆ ತಗೋಬೇಕಾ?',
        transliteration: 'Ee maatre oota aadmele thagobeka?',
        english: 'Should I take this tablet after food?',
        context: 'Confirming medicine schedule with pharmacist',
        category: 'Dosage'
      },
      {
        id: 'med-3',
        kannada: 'ತುರ್ತು ಚಿಕಿತ್ಸೆ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?',
        transliteration: 'Thurtu chikithse yelli siguthade?',
        english: 'Where can I find emergency care?',
        context: 'Hospital reception inquiry',
        category: 'Emergency'
      },
      {
        id: 'med-4',
        kannada: 'ಈ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ನಲ್ಲಿ ಇರುವ ಔಷಧಿ ಇದೆಯಾ?',
        transliteration: 'Ee prescription-nalli iruva aushadhi ideya?',
        english: 'Do you have the medicines in this prescription?',
        context: 'Pharmacy desk inquiry',
        category: 'Pharmacy'
      }
    ],
    quiz: [
      {
        question: 'What does "Talenovu" mean?',
        options: ['Stomach pain', 'Headache', 'Back pain', 'Fever'],
        correct: 1,
        explanation: '"Tale" = Head, "Novu" = Pain. Hence headache.'
      }
    ]
  },
  {
    id: 'workplace',
    title: 'Workplace & Casual Chat',
    kannadaTitle: 'ಕಚೇರಿ ಮತ್ತು ಸ್ನೇಹಿತರ ಸಂಭಾಷಣೆ',
    icon: 'Briefcase',
    color: 'from-blue-500 to-indigo-600',
    description: 'Friendly greetings, meeting coworkers, tea-break conversation.',
    phrases: [
      {
        id: 'work-1',
        kannada: 'ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಾ?',
        transliteration: 'Namaskara, neevu hegiddheera?',
        english: 'Hello/Greetings, how are you?',
        context: 'Formal and polite workplace greeting',
        category: 'Greeting'
      },
      {
        id: 'work-2',
        kannada: 'ಊಟ ಆಯ್ತಾ ನಿಮ್ಮದು?',
        transliteration: 'Oota aaytha nimmadhu?',
        english: 'Did you have your lunch/meal?',
        context: 'The most common friendly care question in Karnataka',
        category: 'Courtesy'
      },
      {
        id: 'work-3',
        kannada: 'ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ, ಸ್ವಲ್ಪ ಸಹಾಯ ಮಾಡಿ.',
        transliteration: 'Naanu Kannada kaliyuththedhdheene, swalpa sahaaya maadi.',
        english: 'I am learning Kannada, please help me a little.',
        context: 'Humbling & loved phrase among local teammates',
        category: 'Learning'
      },
      {
        id: 'work-4',
        kannada: 'ಚಹಾ ಕುಡಿಯೋಕೆ ಹೋಗೋಣ್ವಾ?',
        transliteration: 'Chaha kudiyoke hogonvaa?',
        english: 'Shall we go for a tea break?',
        context: 'Inviting colleagues for a tea break',
        category: 'Social'
      },
      {
        id: 'work-5',
        kannada: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು!',
        transliteration: 'Thumba dhanyavaadagalu!',
        english: 'Thank you very much!',
        context: 'Expressing gratitude',
        category: 'Gratitude'
      }
    ],
    quiz: [
      {
        question: 'What is the Kannada equivalent of "Thank you very much"?',
        options: [
          'Hogi banni',
          'Thumba dhanyavaadagalu',
          'Yenu aaythu',
          'Neevu hegiddheera'
        ],
        correct: 1,
        explanation: '"Thumba dhanyavaadagalu" translates to thank you very much.'
      }
    ]
  }
];
