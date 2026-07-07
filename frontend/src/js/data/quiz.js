/**
 * quiz.js
 * Destination match quiz questions and answer key.
 */

export const quizQuestions = [
  { q:"What's your travel budget per person?", options:['Under ₹15,000','₹15,000–40,000','₹40,000–1,00,000','No limit — I want luxury'] },
  { q:'What type of landscape speaks to your soul?', options:['Beach & Ocean 🏖️','Mountains & Snow 🏔️','Cities & Culture 🌆','Countryside & Farms 🌾'] },
  { q:'How do you prefer to travel?', options:['Solo — freedom above all','With a partner (romantic)','With close friends','Family trip with kids'] },
  { q:"What's your travel vibe?", options:['Adventure & Thrill 🧗','Relaxation & Wellness 🧘','Culture & History 🏛️','Food & Nightlife 🍜'] },
];

/** Each entry: a[i] = answer index for question i (0-based). Nearest-match wins. */
export const quizResults = [
  { a:[0,0,0,0], dest:'Coorg or Pondicherry', why:'Budget-friendly, peaceful, perfect for a solo nature escape close to home.' },
  { a:[0,0,1,1], dest:'Goa', why:'Affordable, romantic beaches, great food scene, and incredible sunsets.' },
  { a:[0,1,0,0], dest:'Manali', why:'Budget Himalayan adventure with peaks, snow, and old cafes.' },
  { a:[1,0,1,0], dest:'Bali', why:'Mid-budget paradise with surf, yoga, temples, and incredible food.' },
  { a:[1,0,1,3], dest:'Bangkok', why:'Great value, spectacular street food, and vibrant nightlife.' },
  { a:[1,1,1,2], dest:'Santorini', why:'Mid-budget romance — sunsets, wine, and whitewashed magic.' },
  { a:[2,0,0,0], dest:'Maldives', why:'Dream beach escape — worth saving up for this once-in-a-lifetime experience.' },
  { a:[2,1,0,2], dest:'Paris', why:'Culture, romance, and exquisite food in the most beautiful city on Earth.' },
  { a:[1,0,0,0], dest:'Ladakh', why:'A high-altitude adventure unlike anything else — monasteries, lakes, and silence.' },
  { a:[2,2,1,2], dest:'Tokyo', why:'A city that perfectly blends culture, incredible food, and urban exploration.' },
  { a:[3,0,0,0], dest:'Swiss Alps', why:"The world's most breathtaking mountain destination, no compromises." },
  { a:[3,0,1,1], dest:'Queenstown, NZ', why:'Adventure capital of the world — bungee, skydive, and stunning landscapes.' },
  { a:[1,2,1,2], dest:'Istanbul', why:'East meets West with incredible food, history, and culture at mid-range costs.' },
  { a:[0,2,0,2], dest:'Spiti Valley', why:"One of India's last frontiers — raw, spiritual, and unforgettable." },
];

/** Destination generator pool for the random picker */
export const generatorPool = [
  { name:'Bali', country:'Indonesia', flag:'🇮🇩', budget:'₹40,000', bestMonth:'April–September', why:'A magical island that feeds the soul — temples, rice terraces, surf, and incredible food.' },
  { name:'Spiti Valley', country:'India', flag:'🇮🇳', budget:'₹14,000', bestMonth:'June–September', why:'Cold desert landscapes, ancient monasteries, and the kind of silence that changes you.' },
  { name:'Santorini', country:'Greece', flag:'🇬🇷', budget:'₹95,000', bestMonth:'May–June or September', why:'The most beautiful sunset you will ever witness, set against volcanic cliffs and azure sea.' },
  { name:'Tbilisi', country:'Georgia', flag:'🇬🇪', budget:'₹45,000', bestMonth:'April–June or September', why:'A hidden gem where ancient culture, incredible wine, and affordability collide.' },
  { name:'Queenstown', country:'New Zealand', flag:'🇳🇿', budget:'₹1,20,000', bestMonth:'Dec–Feb (summer)', why:'The adventure capital — bungee over canyons, ski the Remarkables, sail crystal fjords.' },
  { name:'Pondicherry', country:'India', flag:'🇮🇳', budget:'₹5,000', bestMonth:'October–February', why:'A pocket of France in South India — pastel villas, ashrams, and phenomenal coffee.' },
  { name:'Prague', country:'Czech Republic', flag:'🇨🇿', budget:'₹65,000', bestMonth:'April–May or September', why:'A fairy-tale city untouched by the wars that destroyed its neighbours. Pure magic.' },
  { name:'Ladakh', country:'India', flag:'🇮🇳', budget:'₹18,000', bestMonth:'July–September', why:'A high-altitude desert kingdom with turquoise lakes and star-filled skies unlike anywhere.' },
  { name:'Kyoto', country:'Japan', flag:'🇯🇵', budget:'₹90,000', bestMonth:'March–April or November', why:'Ancient Japan preserved in amber — bamboo forests, geishas, and 1,600 Buddhist temples.' },
  { name:'Ziro Valley', country:'India (Arunachal)', flag:'🇮🇳', budget:'₹10,000', bestMonth:'September–November', why:'A serene UNESCO-nominated valley with rice fields and the best music festival in India.' },
  { name:'Lisbon', country:'Portugal', flag:'🇵🇹', budget:'₹70,000', bestMonth:'March–May or September', why:"Europe's sunniest capital on cobblestone hills — Fado music, pastéis, and ocean views." },
  { name:'Manali', country:'India', flag:'🇮🇳', budget:'₹10,000', bestMonth:'April–June or October', why:'Snow peaks, river walks, old cafes, and the feeling that the world is very far away.' },
];
