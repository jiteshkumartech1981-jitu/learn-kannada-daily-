export const TRAVEL_THEMES = [
  { id: 'heritage', label: 'Ancient Heritage & Temples', icon: 'Landmark' },
  { id: 'nature', label: 'Coffee Hills & Waterfalls', icon: 'Trees' },
  { id: 'coastal', label: 'Beaches & Coastal Culture', icon: 'Waves' },
  { id: 'royal', label: 'Royal Palaces & Art', icon: 'Crown' }
];

export const DESTINATIONS_DATA = {
  hampi: {
    id: 'hampi',
    name: 'Hampi & Badami',
    kannadaName: 'ಹಂಪಿ ಮತ್ತು ಬಾದಾಮಿ',
    theme: 'heritage',
    tagline: 'The Boulder-Strewn Capital of the Vijayanagara Empire (UNESCO World Heritage)',
    bestMonths: 'October to March',
    budgetOptions: {
      budget: '₹3,000 - ₹5,000 / person (Homestays & Cycle tours)',
      moderate: '₹6,000 - ₹12,000 / person (Heritage Resorts & Guided Tours)',
      luxury: '₹15,000+ / person (Luxury Wilderness Cottages & Private Chauffeur)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Virupaksha Temple & Hemakuta Sunset',
        highlights: [
          'Sunrise climb atop Matanga Hill for 360-degree boulder vistas',
          'Visit 7th-century Virupaksha Temple with sacred elephant Lakshmi',
          'Explore Kadalekalu and Sasivekalu Ganesha statues',
          'Sunset over Tungabhadra river from Hemakuta Hill'
        ],
        localFood: 'Traditional South Indian thali served on banana leaf with fresh coconut chutney'
      },
      {
        day: 2,
        title: 'Vijaya Vittala & Royal Enclosure',
        highlights: [
          'Marvel at the iconic Stone Chariot and musical pillars at Vittala Temple',
          'Coracle boat ride across Tungabhadra river to Anegundi (Kishkindha)',
          'Visit Lotus Mahal, Elephant Stables, and Queen\'s Bath'
        ],
        localFood: 'Uttara Karnataka Jolada Rotti with Yennegai (stuffed brinjal curry)'
      },
      {
        day: 3,
        title: 'Badami Cave Temples & Pattadakal',
        highlights: [
          'Excursion to 6th-century Badami rock-cut sandstone cave temples',
          'Agastya lake panoramic reflections and Bhutanatha Temple',
          'UNESCO complex of Pattadakal and Aihole cradle of temple architecture'
        ],
        localFood: 'Dharwad Peda and Shenga Chutney Pudi'
      }
    ],
    survivalPhrases: [
      { kannada: 'ಈ ದೇವಸ್ಥಾನ ಎಷ್ಟು ಹಳೆಯದು?', transliteration: 'Ee devasthaana eshtu haleyadhu?', english: 'How old is this temple?' },
      { kannada: 'ತೆಪ್ಪದಲ್ಲಿ ನದಿ ದಾಟಲು ಎಷ್ಟು?', transliteration: 'Theppadalli nadi daatalu eshtu?', english: 'How much for the coracle boat river crossing?' },
      { kannada: 'ಸೂರ್ಯಾಸ್ತ ನೋಡಲು ಉತ್ತಮ ಸ್ಥಳ ಯಾವುದು?', transliteration: 'Sooryaastha nodalu uththama sthala yaavudu?', english: 'Which is the best spot to watch the sunset?' }
    ]
  },
  coorg: {
    id: 'coorg',
    name: 'Coorg (Madikeri) & Chikmagalur',
    kannadaName: 'ಕೊಡಗು ಮತ್ತು ಚಿಕ್ಕಮಗಳೂರು',
    theme: 'nature',
    tagline: 'Mist-Clad Western Ghats, Coffee Plantations & Roaring Waterfalls',
    bestMonths: 'September to May',
    budgetOptions: {
      budget: '₹4,000 - ₹6,000 / person (Cozy plantation estate homestays)',
      moderate: '₹8,000 - ₹15,000 / person (Boutique coffee estate villas)',
      luxury: '₹20,000+ / person (5-Star Ayurvedic rainforest resorts)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Misty Waterfalls & Coffee Estates',
        highlights: [
          'Scenic walk through aromatic Arabica & Robusta coffee plantations with spice trails',
          'Visit roaring Abbey Falls surrounded by lush pepper vines',
          'Sunset panorama at Raja\'s Seat garden overlooking misty Coorg valleys'
        ],
        localFood: 'Akki Rotti with Kaad Mange curry or fresh bamboo shoot pickle (Kaniile)'
      },
      {
        day: 2,
        title: 'Talacauvery & Tibetan Golden Temple',
        highlights: [
          'Pilgrimage to Talacauvery (birthplace of holy river Cauvery) atop Brahmagiri hills',
          'Explore Bylakuppe Golden Temple (Namdroling Monastery) with chanting monks'
        ],
        localFood: 'Freshly roasted filter coffee and steaming Kadambuttu (steamed rice dumplings)'
      },
      {
        day: 3,
        title: 'Mullayanagiri Peak & Bababudangiri',
        highlights: [
          'Trek to Karnataka\'s highest peak: Mullayanagiri (1,930m)',
          'Hebbe & Jhari falls 4x4 jeep safari in Chikmagalur'
        ],
        localFood: 'Authentic Malnad thali with Jackfruit papad and buttermilk'
      }
    ],
    survivalPhrases: [
      { kannada: 'ತಾಜಾ ಕಾಫಿ ಪುಡಿ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?', transliteration: 'Thaaja coffee pudi yelli siguthade?', english: 'Where can I get freshly ground coffee powder?' },
      { kannada: 'ಜಲಪಾತದ ಹಾದಿ ಸುರಕ್ಷಿತವಾಗಿದೆಯಾ?', transliteration: 'Jalapaathada haadi surakshitavaagideya?', english: 'Is the trail to the waterfall safe?' },
      { kannada: 'ಇಲ್ಲಿ ಮಳೆ ಬರುವ ಸಂಭವವಿದೆಯಾ?', transliteration: 'Illi male baruva sambhavavideya?', english: 'Is there a chance of rain here?' }
    ]
  },
  gokarna: {
    id: 'gokarna',
    name: 'Gokarna, Karwar & Murudeshwar',
    kannadaName: 'ಗೋಕರ್ಣ ಮತ್ತು ಮುರುಡೇಶ್ವರ',
    theme: 'coastal',
    tagline: 'Pristine Beaches, Sacred Coastal Shrines & Arabian Sea Serenity',
    bestMonths: 'October to April',
    budgetOptions: {
      budget: '₹3,000 - ₹5,000 / person (Beach shacks and pilgrim lodges)',
      moderate: '₹6,000 - ₹11,000 / person (Cliffside sea-view cottages)',
      luxury: '₹14,000+ / person (Coastal wellness retreat & private yacht cruise)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Beach Trekking & Om Beach',
        highlights: [
          'Morning coastal trek across Kudle Beach, Om Beach, Half Moon Beach & Paradise Beach',
          'Dolphin spotting boat cruise along the Arabian shoreline',
          'Evening chill with sunset views at Namaste Cafe'
        ],
        localFood: 'Coastal Mangalorean Neer Dosa with spicy fish curry / tender coconut payasam'
      },
      {
        day: 2,
        title: 'Mahabaleshwar Temple & Murudeshwar Shiva Statue',
        highlights: [
          'Visit ancient Atmalinga at Mahabaleshwar Temple Gokarna',
          'Drive to Murudeshwar to marvel at the 123-foot Lord Shiva statue and 20-story Rajagopura by the beach'
        ],
        localFood: 'Kundapura chicken/mushroom ghee roast with crispy Kori Rotti'
      },
      {
        day: 3,
        title: 'Netrani Island Snorkeling or Karwar Islands',
        highlights: [
          'Scuba diving/snorkeling adventure trip to Netrani Island coral reefs',
          'Walk along Karwar\'s Rabindranath Tagore beach where Tagore penned his poetry'
        ],
        localFood: 'Karwar fish thali with Sol Kadi'
      }
    ],
    survivalPhrases: [
      { kannada: 'ಓಂ ಬೀಚ್‌ಗೆ ನಡೆದುಕೊಂಡು ಹೋಗಬಹುದಾ?', transliteration: 'Om beach-ge nadedhukondu hogabahudaa?', english: 'Can we walk to Om Beach from here?' },
      { kannada: 'ತಾಜಾ ಎಳನೀರು ಕೊಡಿ.', transliteration: 'Thaaja elaneeru kodi.', english: 'Please give a fresh tender coconut.' },
      { kannada: 'ಸಮುದ್ರದಲ್ಲಿ ಈಜುವುದು ಸುರಕ್ಷಿತವೇ?', transliteration: 'Samudradalli eejuvudu surakshitave?', english: 'Is it safe to swim in the sea right now?' }
    ]
  },
  mysuru: {
    id: 'mysuru',
    name: 'Mysuru & Srirangapatna',
    kannadaName: 'ಮೈಸೂರು ಮತ್ತು ಶ್ರೀರಂಗಪಟ್ಟಣ',
    theme: 'royal',
    tagline: 'City of Palaces, Dasara Heritage, Sandalwood & Silk',
    bestMonths: 'All year round (Special during Dasara in Oct/Nov)',
    budgetOptions: {
      budget: '₹2,500 - ₹4,500 / person (City center hotels & heritage walks)',
      moderate: '₹5,000 - ₹9,000 / person (Royal heritage homestays & palace suites)',
      luxury: '₹12,000+ / person (Lalitha Mahal Palace Hotel heritage stay)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Amba Vilas Mysore Palace & Chamundi Hill',
        highlights: [
          'Climb Chamundi Hill to visit Sri Chamundeshwari Temple and colossal Nandi statue',
          'Tour the magnificent Indo-Saracenic Mysore Palace and royal armory',
          'Witness the 100,000-bulb illumination of Mysore Palace at dusk'
        ],
        localFood: 'Mylari Hotel soft butter dosa with sagu and steaming filter coffee'
      },
      {
        day: 2,
        title: 'Srirangapatna & Brindavan Gardens',
        highlights: [
          'Historic island fort of Tipu Sultan: Dariya Daulat Bagh and Summer Palace',
          'Bird sanctuary at Ranganathittu (boat safari to see pelicans, painted storks and crocodiles)',
          'Musical fountains show at Krishnaraja Sagara (KRS) Brindavan Gardens'
        ],
        localFood: 'World-famous authentic melt-in-mouth Mysore Pak from Guru Sweets'
      },
      {
        day: 3,
        title: 'Devaraja Market & Chamarajendra Art Gallery',
        highlights: [
          'Walk the 130-year-old vibrant Devaraja Market filled with flower garlands, sandalwood and perfumes',
          'Explore Raja Ravi Varma original royal oil paintings at Jaganmohan Palace Art Gallery'
        ],
        localFood: 'Traditional Mysore Rasam with hot rice and dry papad'
      }
    ],
    survivalPhrases: [
      { kannada: 'ಅರಮನೆ ಬೆಳಕು ಎಷ್ಟು ಗಂಟೆಗೆ ಇರುತ್ತದೆ?', transliteration: 'Aramane belaku eshtu gantege iruthade?', english: 'What time is the palace illuminated?' },
      { kannada: 'ಅಸಲಿ ಮೈಸೂರು ಪಾಕ್ ಎಲ್ಲಿ ಸಿಗುತ್ತೆ?', transliteration: 'Asali Mysore Pak yelli siguththe?', english: 'Where do we get authentic Mysore Pak?' },
      { kannada: 'ಚಾಮುಂಡಿ ಬೆಟ್ಟಕ್ಕೆ ಬಸ್ ಯಾವಾಗ ಇದೆ?', transliteration: 'Chamundi bettakke bus yaavaaga ide?', english: 'When is the bus to Chamundi Hill?' }
    ]
  }
};
