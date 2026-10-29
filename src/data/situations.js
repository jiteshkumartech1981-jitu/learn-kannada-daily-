export const CATEGORIES = [
  { id: 'all', label: 'All Scenarios', icon: 'Sparkles', count: 32 },
  { id: 'transport', label: 'Auto & Metro Transit', icon: 'Car', count: 6 },
  { id: 'market', label: 'Market & Groceries', icon: 'ShoppingBag', count: 6 },
  { id: 'dining', label: 'Darshini & Food', icon: 'Utensils', count: 6 },
  { id: 'delivery', label: 'Home Delivery & Services', icon: 'Package', count: 5 },
  { id: 'healthcare', label: 'Hospital & Pharmacy', icon: 'HeartPulse', count: 5 },
  { id: 'workplace', label: 'Office & Social', icon: 'Briefcase', count: 4 }
];

export const SITUATIONS = [
  // --- TRANSPORT (AUTO, METRO, BUS) ---
  {
    id: 'tr-1',
    category: 'transport',
    situation: 'Auto Rickshaw',
    kannada: 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಬರ್ತೀರಾ?',
    phonetic: 'Majestic-ge bar-theera?',
    english: 'Will you come to Majestic?',
    context: 'Direct question to the auto driver before boarding',
    keywords: ['majestic', 'auto', 'hire', 'come'],
    difficulty: 'Beginner'
  },
  {
    id: 'tr-2',
    category: 'transport',
    situation: 'Auto Fare',
    kannada: 'ಮೀಟರ್ ಹಾಕಿ ಹೋಗಿ ಸಾರ್.',
    phonetic: 'Meter haaki hogi, sir.',
    english: 'Please run by the meter, sir.',
    context: 'Requesting standard fair meter pricing',
    keywords: ['meter', 'auto', 'price', 'fare'],
    difficulty: 'Beginner'
  },
  {
    id: 'tr-3',
    category: 'transport',
    situation: 'Route Navigation',
    kannada: 'ಇಲ್ಲಿ ಮುಂದೆ ರೈಟ್ ತಗೊಳ್ಳಿ, ಸಿಗ್ನಲ್ ಹತ್ತಿರ ನಿಲ್ಲಿಸಿ.',
    phonetic: 'Illi munde right thagolli, signal hathira nillisi.',
    english: 'Take a right ahead here, stop near the traffic signal.',
    context: 'Guiding the driver to your drop location',
    keywords: ['right', 'signal', 'stop', 'navigation'],
    difficulty: 'Intermediate'
  },
  {
    id: 'tr-4',
    category: 'transport',
    situation: 'Payment & UPI',
    kannada: 'ಎಷ್ಟು ಆಯ್ತು? ಗೂಗಲ್ ಪೇ ಅಥವಾ ಕ್ಯೂಆರ್ ಕೋಡ್ ಇದೆಯಾ?',
    phonetic: 'Eshtu aaythu? Google Pay athava QR code ideya?',
    english: 'How much is it? Do you have Google Pay or a QR code?',
    context: 'Settling the ride fare digitally',
    keywords: ['eshtu', 'cost', 'pay', 'qr', 'gpay'],
    difficulty: 'Beginner'
  },
  {
    id: 'tr-5',
    category: 'transport',
    situation: 'Namma Metro',
    kannada: 'ಇಂದಿರಾನಗರಕ್ಕೆ ಮೆಟ್ರೋ ಟಿಕೆಟ್ ಕೊಡಿ.',
    phonetic: 'Indiranagar-kke Metro ticket kodi.',
    english: 'Please give a Metro ticket / token to Indiranagar.',
    context: 'At the Namma Metro counter',
    keywords: ['metro', 'ticket', 'token'],
    difficulty: 'Beginner'
  },
  {
    id: 'tr-6',
    category: 'transport',
    situation: 'BMTC Bus',
    kannada: 'ಈ ಬಸ್ ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಕಡೆ ಹೋಗುತ್ತಾ?',
    phonetic: 'Ee bus Silk Board kade hogutthaa?',
    english: 'Does this bus go towards Silk Board?',
    context: 'Checking bus destination with conductor or co-passengers',
    keywords: ['bus', 'route', 'destination'],
    difficulty: 'Intermediate'
  },

  // --- MARKET & GROCERIES ---
  {
    id: 'mk-1',
    category: 'market',
    situation: 'Vegetable Market',
    kannada: 'ಟೊಮ್ಯಾಟೊ ಒಂದು ಕೆಜಿಗೆ ಎಷ್ಟು?',
    phonetic: 'Tomato ondu kg-ge eshtu?',
    english: 'How much for one kilo of tomatoes?',
    context: 'Asking unit price at vegetable stall',
    keywords: ['price', 'kg', 'tomato', 'cost'],
    difficulty: 'Beginner'
  },
  {
    id: 'mk-2',
    category: 'market',
    situation: 'Quality Check',
    kannada: 'ತರಕಾರಿ ತಾಜಾ ಇದೆಯಾ? ಇವತ್ತಿನದಾ?',
    phonetic: 'Tharakaari thaaja ideya? Ivatthinadaa?',
    english: 'Are the vegetables fresh? From today?',
    context: 'Confirming freshness with vendor',
    keywords: ['fresh', 'quality', 'today'],
    difficulty: 'Intermediate'
  },
  {
    id: 'mk-3',
    category: 'market',
    situation: 'Polite Bargaining',
    kannada: 'ಸ್ವಲ್ಪ ಜಾಸ್ತಿ ಆಯ್ತು, ಕಡಿಮೆ ಮಾಡಿ ಕೊಡಿ ಅಣ್ಣಾ.',
    phonetic: 'Swalpa jaasthi aaythu, kadime maadi kodi anna.',
    english: 'It is a bit high, please reduce the price a little, brother.',
    context: 'Friendly neighborhood bargaining',
    keywords: ['discount', 'reduce', 'bargain', 'anna'],
    difficulty: 'Intermediate'
  },
  {
    id: 'mk-4',
    category: 'market',
    situation: 'Free Herbs Tradition',
    kannada: 'ಸ್ವಲ್ಪ ಕೊತ್ತಂಬರಿ ಮತ್ತು ಕರಿಬೇವಿನ ಸೊಪ್ಪು ಹಾಕಿ.',
    phonetic: 'Swalpa kothambari matthu karibevina soppu haaki.',
    english: 'Please add some coriander and curry leaves.',
    context: 'Asking for the staple complimentary greens',
    keywords: ['coriander', 'curry leaves', 'herbs'],
    difficulty: 'Intermediate'
  },
  {
    id: 'mk-5',
    category: 'market',
    situation: 'Cash & Change',
    kannada: 'ನನ್ನ ಹತ್ತಿರ ಚಿಲ್ಲರೆ ಇಲ್ಲ, ಐನೂರು ರೂಪಾಯಿ ನೋಟು ಇದೆ.',
    phonetic: 'Nanna hathira chillare illa, ainooru roopaayi notu ide.',
    english: 'I do not have loose change, I only have a ₹500 note.',
    context: 'Cash transaction at a local Kirana store',
    keywords: ['change', 'cash', 'loose money'],
    difficulty: 'Intermediate'
  },
  {
    id: 'mk-6',
    category: 'market',
    situation: 'Fruit Stalls',
    kannada: 'ಒಂದು ಡಜನ್ ಬಾಳೆಹಣ್ಣು ಕೊಡಿ.',
    phonetic: 'Ondu dozen baalehannu kodi.',
    english: 'Please give one dozen bananas.',
    context: 'Buying fruits from roadside cart',
    keywords: ['fruit', 'banana', 'dozen'],
    difficulty: 'Beginner'
  },

  // --- DINING & RESTAURANTS ---
  {
    id: 'dn-1',
    category: 'dining',
    situation: 'Iconic Order',
    kannada: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಬಿಸಿ ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ.',
    phonetic: 'Ondu masala dose matthu bisi filter coffee kodi.',
    english: 'Please give one masala dosa and hot filter coffee.',
    context: 'Classic Bangalore breakfast order',
    keywords: ['dosa', 'coffee', 'order', 'breakfast'],
    difficulty: 'Beginner'
  },
  {
    id: 'dn-2',
    category: 'dining',
    situation: 'Spice Preference',
    kannada: 'ಖಾರ ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ, ಮಕ್ಕಳು ತಿಂತಾರೆ.',
    phonetic: 'Khaara swalpa kadime maadi, makklu thinthaare.',
    english: 'Please make it less spicy, children are eating.',
    context: 'Customizing spice level at lunch/dinner',
    keywords: ['spicy', 'less', 'mild'],
    difficulty: 'Intermediate'
  },
  {
    id: 'dn-3',
    category: 'dining',
    situation: 'Refill Request',
    kannada: 'ಸಾಂಬಾರ್ ಮತ್ತು ಚಟ್ನಿ ಇನ್ನೊಂದು ಸ್ವಲ್ಪ ಕೊಡಿ.',
    phonetic: 'Sambar matthu chutney innondu swalpa kodi.',
    english: 'Please give a little more sambar and chutney.',
    context: 'Requesting refills at the table or counter',
    keywords: ['sambar', 'chutney', 'refill', 'extra'],
    difficulty: 'Beginner'
  },
  {
    id: 'dn-4',
    category: 'dining',
    situation: 'Food Compliment',
    kannada: 'ತಿಂಡಿ ಮತ್ತು ಕಾಫಿ ತುಂಬಾ ರುಚಿಯಾಗಿದೆ!',
    phonetic: 'Thindi matthu coffee thumba ruchiyaagide!',
    english: 'The food and coffee are very delicious!',
    context: 'Appreciating the cook or restaurant owner',
    keywords: ['delicious', 'tasty', 'compliment', 'ruchi'],
    difficulty: 'Beginner'
  },
  {
    id: 'dn-5',
    category: 'dining',
    situation: 'Drinking Water',
    kannada: 'ದಯವಿಟ್ಟು ಬಿಸಿ ಕುಡಿಯುವ ನೀರು ಕೊಡಿ.',
    phonetic: 'Dayavittu bisi kudiyuva neeru kodi.',
    english: 'Please give warm drinking water.',
    context: 'Asking for drinking water',
    keywords: ['water', 'drink', 'warm'],
    difficulty: 'Beginner'
  },
  {
    id: 'dn-6',
    category: 'dining',
    situation: 'The Bill',
    kannada: 'ಬಿಲ್ ಕೊಡಿ ಸಾರ್, ಎಷ್ಟು ಆಯ್ತು?',
    phonetic: 'Bill kodi sir, eshtu aaythu?',
    english: 'Please give the bill, sir. How much is the total?',
    context: 'Requesting bill after meal',
    keywords: ['bill', 'pay', 'total'],
    difficulty: 'Beginner'
  },

  // --- HOME DELIVERY & SERVICES ---
  {
    id: 'dl-1',
    category: 'delivery',
    situation: 'Delivery Call',
    kannada: 'ಹಲೋ, ನಾನು ಸೆಕೆಂಡ್ ಫ್ಲೋರ್‌ನಲ್ಲಿ ಇದ್ದೀನಿ, ಡೋರ್‌ಬೆಲ್ ಒತ್ತಿ.',
    phonetic: 'Hello, naanu second floor-nalli iddeeni, doorbell otthi.',
    english: 'Hello, I am on the second floor, please ring the doorbell.',
    context: 'Guiding Swiggy / Zomato / Amazon delivery partner',
    keywords: ['delivery', 'doorbell', 'floor', 'swiggy', 'zomato'],
    difficulty: 'Intermediate'
  },
  {
    id: 'dl-2',
    category: 'delivery',
    situation: 'Drop at Security',
    kannada: 'ಪಾರ್ಸೆಲ್ ಅನ್ನು ಸೆಕ್ಯುರಿಟಿ ಗೇಟ್ ಹತ್ತಿರ ಇಟ್ಟು ಹೋಗಿ.',
    phonetic: 'Parcel annu security gate hathira ittu hogi.',
    english: 'Please leave the parcel near the security gate.',
    context: 'When not at home during delivery',
    keywords: ['parcel', 'security', 'leave'],
    difficulty: 'Intermediate'
  },
  {
    id: 'dl-3',
    category: 'delivery',
    situation: 'OTP Verification',
    kannada: 'ಓಟಿಪಿ ಹೇಳಿ ಸಾರ್, ಡೆಲಿವರಿ ಕಂಪ್ಲೀಟ್ ಮಾಡ್ತೀನಿ.',
    phonetic: 'OTP heli sir, delivery complete maadtheeni.',
    english: 'Please tell the OTP, sir, I will complete the delivery.',
    context: 'Completing courier delivery',
    keywords: ['otp', 'delivery'],
    difficulty: 'Beginner'
  },
  {
    id: 'dl-4',
    category: 'delivery',
    situation: 'Calling Plumber/Electrician',
    kannada: 'ಮನೆಯಲ್ಲಿ ನಲ್ಲಿ ಲೀಕ್ ಆಗ್ತಿದೆ, ಇವತ್ತು ಬರ್ತೀರಾ?',
    phonetic: 'Maneyalli nalli leak aagthide, ivatthu bar-theera?',
    english: 'The water tap is leaking at home, can you visit today?',
    context: 'Calling home service professional',
    keywords: ['plumber', 'repair', 'tap', 'leak'],
    difficulty: 'Intermediate'
  },
  {
    id: 'dl-5',
    category: 'delivery',
    situation: 'House Help / Maid',
    kannada: 'ನಾಳೆ ಬೆಳಗ್ಗೆ ಒಂಬತ್ತು ಗಂಟೆಗೆ ಬನ್ನಿ ಸಾಕು.',
    phonetic: 'Naale belagge ombatthu gantege banni saaku.',
    english: 'Please come at 9 AM tomorrow morning, that is fine.',
    context: 'Scheduling work with domestic helper',
    keywords: ['morning', 'time', 'tomorrow'],
    difficulty: 'Intermediate'
  },

  // --- HEALTHCARE & CLINIC ---
  {
    id: 'hc-1',
    category: 'healthcare',
    situation: 'Symptom Description',
    kannada: 'ನನಗೆ ಎರಡು ದಿನದಿಂದ ಜ್ವರ ಮತ್ತು ತಲೆನೋವು ಇದೆ.',
    phonetic: 'Nanage eradu dinadinda jwara matthu talenovu ide.',
    english: 'I have had a fever and headache for two days.',
    context: 'Explaining symptoms to the doctor',
    keywords: ['fever', 'headache', 'jwara', 'doctor'],
    difficulty: 'Intermediate'
  },
  {
    id: 'hc-2',
    category: 'healthcare',
    situation: 'Pharmacy Inquiry',
    kannada: 'ಈ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ನಲ್ಲಿ ಇರುವ ಔಷಧಿಗಳು ಇವೆಯಾ?',
    phonetic: 'Ee prescription-nalli iruva aushadhigalu iveya?',
    english: 'Do you have the medicines written on this prescription?',
    context: 'Handing prescription to the chemist',
    keywords: ['medicine', 'prescription', 'pharmacy'],
    difficulty: 'Intermediate'
  },
  {
    id: 'hc-3',
    category: 'healthcare',
    situation: 'Dosage Timing',
    kannada: 'ಈ ಮಾತ್ರೆ ಊಟಕ್ಕಿಂತ ಮುಂಚೆನಾ ಅಥವಾ ಊಟ ಆದ್ಮೇಲೆನಾ?',
    phonetic: 'Ee maatre ootakkintha munchenaa athava oota aadmelenaa?',
    english: 'Should this tablet be taken before food or after food?',
    context: 'Confirming medicine schedule',
    keywords: ['tablet', 'food', 'before', 'after'],
    difficulty: 'Intermediate'
  },
  {
    id: 'hc-4',
    category: 'healthcare',
    situation: 'Emergency Doctor',
    kannada: 'ಡಾಕ್ಟರ್ ಯಾವಾಗ ಕ್ಲಿನಿಕ್‌ಗೆ ಬರ್ತಾರೆ?',
    phonetic: 'Doctor yaavaaga clinic-ge barthaare?',
    english: 'When will the doctor arrive at the clinic?',
    context: 'Clinic reception desk inquiry',
    keywords: ['doctor', 'clinic', 'timing'],
    difficulty: 'Beginner'
  },
  {
    id: 'hc-5',
    category: 'healthcare',
    situation: 'Medical Rest',
    kannada: 'ಸ್ವಲ್ಪ ವಿಶ್ರಾಂತಿ ತಗೊಳ್ಳಿ, ಬಿಸಿ ನೀರು ಕುಡಿಯಿರಿ.',
    phonetic: 'Swalpa vishraanthi thagolli, bisi neeru kudiyiri.',
    english: 'Take some rest, and drink warm water.',
    context: 'Doctor / family health advice',
    keywords: ['rest', 'advice', 'warm water'],
    difficulty: 'Beginner'
  },

  // --- WORKPLACE & SOCIAL ---
  {
    id: 'wp-1',
    category: 'workplace',
    situation: 'Courteous Greeting',
    kannada: 'ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಾ? ಊಟ ಆಯ್ತಾ?',
    phonetic: 'Namaskara, neevu hegiddheera? Oota aaytha?',
    english: 'Hello, how are you? Did you have lunch?',
    context: 'Warm, respectful Kannada greeting for colleagues',
    keywords: ['hello', 'greeting', 'lunch', 'oota'],
    difficulty: 'Beginner'
  },
  {
    id: 'wp-2',
    category: 'workplace',
    situation: 'Humble Learner',
    kannada: 'ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ, ದಯವಿಟ್ಟು ನನ್ನ ಜೊತೆ ಕನ್ನಡದಲ್ಲೇ ಮಾತನಾಡಿ.',
    phonetic: 'Naanu Kannada kaliyuththedhdheene, dayavittu nanna jothe Kannadadalle maathanaadi.',
    english: 'I am learning Kannada, please speak with me in Kannada.',
    context: 'Winning hearts among local coworkers & friends',
    keywords: ['learn', 'speak', 'kannada', 'please'],
    difficulty: 'Intermediate'
  },
  {
    id: 'wp-3',
    category: 'workplace',
    situation: 'Tea Break Invite',
    kannada: 'ಚಹಾ ಅಥವಾ ಫಿಲ್ಟರ್ ಕಾಫಿ ಕುಡಿಯೋಕೆ ಹೋಗೋಣ್ವಾ?',
    phonetic: 'Chaha athava filter coffee kudiyoke hogonvaa?',
    english: 'Shall we go to drink tea or filter coffee?',
    context: 'Inviting team members for afternoon chai break',
    keywords: ['tea', 'coffee', 'break', 'colleagues'],
    difficulty: 'Beginner'
  },
  {
    id: 'wp-4',
    category: 'workplace',
    situation: 'Expressing Gratitude',
    kannada: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ!',
    phonetic: 'Thumba dhanyavaadagalu nimma sahaayakke!',
    english: 'Thank you very much for your help!',
    context: 'Expressing heartfelt appreciation',
    keywords: ['thank you', 'thanks', 'gratitude'],
    difficulty: 'Beginner'
  }
];

export const SCENARIO_QUIZZES = [
  {
    id: 'q1',
    situation: 'Auto Bargaining',
    question: 'You want the auto driver to use the meter. What is the most natural sentence to say?',
    options: [
      'Meter haaki hogi sir. (ಮೀಟರ್ ಹಾಕಿ ಹೋಗಿ ಸಾರ್)',
      'Oota aaytha sir? (ಊಟ ಆಯ್ತಾ ಸಾರ್?)',
      'Yelli hogbeku sir? (ಎಲ್ಲಿ ಹೋಗ್ಬೇಕು ಸಾರ್?)',
      'Chillare ideya sir? (ಚಿಲ್ಲರೆ ಇದೆಯಾ ಸಾರ್?)'
    ],
    correctIndex: 0,
    explanation: '"Meter haaki hogi sir" asks the driver to turn on the meter.'
  },
  {
    id: 'q2',
    situation: 'Vegetable Stall',
    question: 'How do you ask "How much for 1 kg of tomatoes?"',
    options: [
      'Tomato thaaja ideya?',
      'Tomato ondu kg-ge eshtu?',
      'Tomato swalpa kodi.',
      'Tomato beda.'
    ],
    correctIndex: 1,
    explanation: '"Eshtu" means "How much", so "Tomato ondu kg-ge eshtu?" asks for the price per kilogram.'
  },
  {
    id: 'q3',
    situation: 'Darshini Restaurant',
    question: 'What does "Khaara swalpa kadime maadi" mean?',
    options: [
      'Make it extra spicy',
      'Please give more sambar',
      'Please reduce the spice a little',
      'Bring the bill quickly'
    ],
    correctIndex: 2,
    explanation: '"Khaara" = Spicy, "swalpa kadime" = reduce a little.'
  },
  {
    id: 'q4',
    situation: 'Medicine & Health',
    question: 'What is the Kannada word for "Headache"?',
    options: [
      'Jwara (ಜ್ವರ)',
      'Talenovu (ತಲೆನೋವು)',
      'Kasa (ಕಸ)',
      'Neeru (ನೀರು)'
    ],
    correctIndex: 1,
    explanation: '"Tale" = Head, "Novu" = Pain/Ache. Hence "Talenovu" is headache.'
  },
  {
    id: 'q5',
    situation: 'Workplace & Social',
    question: 'Which question is widely used in Karnataka as a polite and friendly way of asking "How are you doing?"',
    options: [
      'Oota aaytha? (Did you eat?)',
      'Eshtu aaythu? (How much is it?)',
      'Yellige hoythu? (Where did it go?)',
      'Bega banni! (Come fast!)'
    ],
    correctIndex: 0,
    explanation: 'In Kannada culture, asking "Oota aaytha?" (Did you have your meal?) is the primary sign of care and friendship!'
  }
];
