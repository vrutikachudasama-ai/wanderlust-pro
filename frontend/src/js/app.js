
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';

/* Sanitize user input before injecting into innerHTML — prevents XSS */
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

const destinations = [
  { id:1, name:'Maldives', country:'Maldives', cat:'beaches', desc:'Crystal-clear lagoons, overwater bungalows, and pristine white-sand beaches in the heart of the Indian Ocean.', budget:'₹80,000/person', rating:4.9, views:'2.4M', months:[11,12,1,2,3,4], img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', tags:['Luxury','Honeymoon','Snorkeling'], highlights:['Snorkeling with manta rays','Sunset cruises','Underwater restaurants'], weather:'Sunny, 28–30°C', bestFor:'Couples · Honeymoon · Luxury' },
  { id:2, name:'Goa', country:'India', cat:'beaches', desc:'Sun-kissed beaches, Portuguese heritage, vibrant nightlife, and incredible seafood on India\'s favourite coastal escape.', budget:'₹12,000/person', rating:4.6, views:'5.1M', months:[11,12,1,2,3], img:'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80', tags:['Beach','Budget','Nightlife'], highlights:['Sunset at Vagator','Water sports','Fish curry & feni'], weather:'Hot & sunny, 25–32°C', bestFor:'Friends · Budget · Solo' },
  { id:3, name:'Bali', country:'Indonesia', cat:'beaches', desc:'A magical island of temples, terraced rice fields, surf breaks, and spiritual retreats with endless tropical charm.', budget:'₹40,000/person', rating:4.8, views:'8.2M', months:[4,5,6,7,8,9], img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', tags:['Spiritual','Yoga','Surfing'], highlights:['Tanah Lot temple','Ubud rice terraces','Seminyak beach clubs'], weather:'Tropical, 26–32°C', bestFor:'Solo · Couples · Spiritual' },
  { id:4, name:'Phuket', country:'Thailand', cat:'beaches', desc:'Thailand\'s largest island — stunning beaches, vibrant markets, elephant sanctuaries, and phenomenal Thai cuisine.', budget:'₹30,000/person', rating:4.6, views:'6.3M', months:[11,12,1,2,3,4], img:'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80', tags:['Beach','Adventure','Food'], highlights:['Phi Phi Islands','Big Buddha','Night markets'], weather:'Hot & humid, 27–33°C', bestFor:'Families · Couples · Backpackers' },
  { id:5, name:'Santorini', country:'Greece', cat:'beaches', desc:'Iconic whitewashed buildings, caldera views, volcanic beaches, and world-class wine in the Aegean Sea.', budget:'₹95,000/person', rating:4.9, views:'7.8M', months:[4,5,6,9,10], img:'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80', tags:['Luxury','Romance','Photography'], highlights:['Oia sunset','Caldera cruise','Wine tasting'], weather:'Mediterranean, 22–30°C', bestFor:'Honeymoon · Couples · Photographers' },
  { id:6, name:'Manali', country:'India', cat:'mountains', desc:'A Himalayan resort town surrounded by snow-capped peaks, pine forests, and ancient temples in Himachal Pradesh.', budget:'₹10,000/person', rating:4.7, views:'3.2M', months:[3,4,5,6,10,11], img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', tags:['Mountains','Adventure','Budget'], highlights:['Rohtang Pass','Solang Valley','Old Manali cafes'], weather:'Cool to cold, 5–20°C', bestFor:'Adventure · Couples · Groups' },
  { id:7, name:'Ladakh', country:'India', cat:'mountains', desc:'A high-altitude desert kingdom with ancient monasteries, dramatic landscapes, turquoise lakes, and star-filled skies.', budget:'₹18,000/person', rating:4.8, views:'2.8M', months:[6,7,8,9], img:'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80', tags:['Adventure','Spiritual','Photography'], highlights:['Pangong Lake','Nubra Valley','Hemis Monastery'], weather:'Cold & dry, −5 to 20°C', bestFor:'Adventure · Photographers · Solo' },
  { id:8, name:'Swiss Alps', country:'Switzerland', cat:'mountains', desc:'Europe\'s most dramatic mountain range with world-class skiing, charming alpine villages, and breathtaking views.', budget:'₹1,50,000/person', rating:4.9, views:'4.5M', months:[12,1,2,6,7,8], img:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', tags:['Luxury','Skiing','Alpine'], highlights:['Jungfraujoch','Interlaken','Grindelwald'], weather:'Cold to alpine, −5 to 18°C', bestFor:'Families · Couples · Skiing' },
  { id:9, name:'Queenstown', country:'New Zealand', cat:'mountains', desc:'The adventure capital of the world — spectacular mountains, crystal lakes, and world-class outdoor activities.', budget:'₹1,20,000/person', rating:4.8, views:'3.1M', months:[12,1,2,6,7], img:'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80', tags:['Adventure','Nature','Extreme'], highlights:['Bungee jumping','Milford Sound','The Remarkables'], weather:'Varied, 5–25°C', bestFor:'Adventure · Solo · Couples' },
  { id:10, name:'Shimla', country:'India', cat:'mountains', desc:'The Queen of Hill Stations with colonial architecture, pine forests, the famous Mall Road, and spectacular valley views.', budget:'₹7,000/person', rating:4.5, views:'2.4M', months:[3,4,5,9,10,11,12], img:'https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpbWxhfGVufDB8fDB8fHww', tags:['Heritage','Mountains','Family'], highlights:['Mall Road','Kufri','Jakhu temple'], weather:'Cool & pleasant, 5–22°C', bestFor:'Families · Couples · Budget' },
  { id:11, name:'Paris', country:'France', cat:'cafes', desc:'The City of Light — iconic boulevards, world-class museums, charming sidewalk cafes, and the finest pastries on Earth.', budget:'₹1,10,000/person', rating:4.8, views:'12.5M', months:[4,5,6,9,10], img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', tags:['Culture','Romance','Food'], highlights:['Eiffel Tower','Café de Flore','Louvre Museum'], weather:'Mild, 10–25°C', bestFor:'Couples · Culture · Foodies' },
  { id:12, name:'Istanbul', country:'Turkey', cat:'cafes', desc:'Where East meets West — Grand Bazaars, ancient mosques, Bosphorus sunsets, and exceptional Turkish coffee culture.', budget:'₹55,000/person', rating:4.7, views:'5.8M', months:[3,4,5,9,10,11], img:'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80', tags:['Culture','History','Food'], highlights:['Hagia Sophia','Grand Bazaar','Bosphorus cruise'], weather:'Mediterranean, 8–28°C', bestFor:'Culture · Foodies · History' },
  { id:13, name:'Vienna', country:'Austria', cat:'cafes', desc:'The city of music, art, and coffee culture with magnificent palaces, world-class opera, and legendary Kaffeehäuser.', budget:'₹90,000/person', rating:4.7, views:'3.9M', months:[4,5,6,9,10,11], img:'https://images.unsplash.com/photo-1519923041107-e4dc8d9193da?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmllbm5hfGVufDB8fDB8fHww', tags:['Culture','Music','Coffee'], highlights:['Schönbrunn Palace','Café Central','Vienna Philharmonic'], weather:'Continental, 5–25°C', bestFor:'Culture · Art · Couples' },
  { id:14, name:'Melbourne', country:'Australia', cat:'cafes', desc:'Australia\'s culture capital — world-famous coffee scene, street art laneways, rooftop bars, and diverse cuisine.', budget:'₹1,20,000/person', rating:4.6, views:'4.1M', months:[10,11,12,1,2,3], img:'https://images.unsplash.com/photo-1470294402047-fc1b5f39bd99?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbGJvdXJuZXxlbnwwfHwwfHx8MA%3D%3D', tags:['Coffee','Urban','Culture'], highlights:['Degraves Street cafes','Hosier Lane art','Queen Victoria Market'], weather:'Oceanic, 10–25°C', bestFor:'Solo · Foodies · Culture' },
  { id:15, name:'Coorg', country:'India', cat:'weekend', desc:'Scotland of India — misty coffee plantations, lush valleys, cascading waterfalls, and cozy homestays in Karnataka.', budget:'₹6,000/person', rating:4.6, views:'1.8M', months:[10,11,12,1,2,3,4], img:'https://images.unsplash.com/photo-1710612198146-77512950a4b7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29vcmd8ZW58MHx8MHx8fDA%3D', tags:['Nature','Weekend','Coffee'], highlights:['Abbey Falls','Coffee plantation tour','Dubare elephant camp'], weather:'Cool & misty, 15–25°C', bestFor:'Couples · Families · Weekend' },
  { id:16, name:'Pondicherry', country:'India', cat:'weekend', desc:'A slice of France in South India — colorful colonial villas, serene beaches, ashrams, and incredible French cuisine.', budget:'₹5,000/person', rating:4.5, views:'1.6M', months:[10,11,12,1,2,3], img:'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80', tags:['Heritage','Beach','Weekend'], highlights:['French Quarter','Serenity Beach','Auroville'], weather:'Tropical, 22–32°C', bestFor:'Couples · Solo · Weekend' },
  { id:17, name:'Jaipur', country:'India', cat:'weekend', desc:'The Pink City — magnificent forts, royal palaces, vibrant bazaars, and authentic Rajasthani cuisine and culture.', budget:'₹7,000/person', rating:4.6, views:'2.9M', months:[10,11,12,1,2,3], img:'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', tags:['Heritage','Culture','Food'], highlights:['Amber Fort','Hawa Mahal','Johari Bazaar'], weather:'Dry & warm, 15–30°C', bestFor:'Culture · Families · History' },
  { id:18, name:'Udaipur', country:'India', cat:'weekend', desc:'City of Lakes — romantic rooftop restaurants, floating palaces, boat rides on Lake Pichola, and Rajput heritage.', budget:'₹8,000/person', rating:4.7, views:'2.1M', months:[10,11,12,1,2,3], img:'https://images.unsplash.com/photo-1695956353120-54ce5e91632b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dWRhaXB1cnxlbnwwfHwwfHx8MA%3D%3D', tags:['Romance','Heritage','Lakes'], highlights:['Lake Palace','City Palace','Lake Pichola sunset'], weather:'Pleasant, 15–28°C', bestFor:'Couples · Honeymoon · Heritage' },
  { id:19, name:'Ziro Valley', country:'India', cat:'hidden', desc:'A serene UNESCO-nominated valley in Arunachal Pradesh, home to the Apatani tribe, rice fields, and the Ziro Music Festival.', budget:'₹10,000/person', rating:4.7, views:'180K', months:[3,4,5,9,10,11], img:'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80', tags:['Hidden Gem','Tribal','Nature'], highlights:['Apatani village','Ziro Music Festival','Pine forest treks'], weather:'Cool & fresh, 10–25°C', bestFor:'Solo · Photographers · Culture' },
  { id:20, name:'Spiti Valley', country:'India', cat:'hidden', desc:'A cold desert mountain valley in Himachal with ancient Buddhist monasteries, fossil sites, and surreal moonlike landscapes.', budget:'₹14,000/person', rating:4.8, views:'420K', months:[6,7,8,9], img:'https://images.unsplash.com/photo-1746093846930-ab89242b9fb9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BpdGklMjB2YWxsZXl8ZW58MHx8MHx8fDA%3D', tags:['Hidden Gem','Adventure','Spiritual'], highlights:['Key Monastery','Chandratal Lake','Fossil Park'], weather:'Cold desert, 0–20°C', bestFor:'Adventure · Photographers · Solo' },
  { id:21, name:'Chopta', country:'India', cat:'hidden', desc:'Uttarakhand\'s mini Switzerland — a peaceful meadow with rhododendron forests, Tungnath temple, and views of Chaukhamba peaks.', budget:'₹5,000/person', rating:4.7, views:'230K', months:[4,5,6,9,10], img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', tags:['Hidden Gem','Trek','Meadow'], highlights:['Tungnath trek','Chandrashila peak','Bugyal meadows'], weather:'Cool to cold, 5–20°C', bestFor:'Trekkers · Solo · Nature' },
  { id:22, name:'Gandikota', country:'India', cat:'hidden', desc:'India\'s Grand Canyon — a stunning gorge with an ancient fort that remains largely undiscovered by mainstream tourism.', budget:'₹2,000/person', rating:4.6, views:'95K', months:[10,11,12,1,2,3], img:'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', tags:['Hidden Gem','Canyon','Camping'], highlights:['Gandikota gorge','Ancient fort','Overnight camping'], weather:'Dry & warm, 18–32°C', bestFor:'Adventure · Photographers · Camping' },
  { id:23, name:'Tokyo', country:'Japan', cat:'international', desc:'A city of contrasts — ancient temples beside futuristic skyscrapers, world-class ramen, cherry blossoms, and seamless efficiency.', budget:'₹95,000/person', rating:4.9, views:'9.3M', months:[3,4,10,11], img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', tags:['Urban','Culture','Food'], highlights:['Shibuya crossing','Senso-ji temple','Tsukiji market'], weather:'Varied, 5–30°C', bestFor:'Solo · Couples · Culture' },
  { id:24, name:'Barcelona', country:'Spain', cat:'international', desc:'Gaudí\'s masterpiece city — La Sagrada Família, vibrant Las Ramblas, tapas culture, and Mediterranean beaches all in one.', budget:'₹85,000/person', rating:4.8, views:'7.6M', months:[4,5,6,9,10], img:'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80', tags:['Architecture','Beach','Food'], highlights:['Sagrada Família','Park Güell','La Boqueria'], weather:'Mediterranean, 15–28°C', bestFor:'Couples · Art · Foodies' },
  { id:25, name:'Prague', country:'Czech Republic', cat:'international', desc:'The City of a Hundred Spires — fairytale castles, cobblestone squares, Gothic churches, and legendary Czech beer.', budget:'₹65,000/person', rating:4.8, views:'5.2M', months:[4,5,6,9,10], img:'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&q=80', tags:['History','Architecture','Budget'], highlights:['Prague Castle','Old Town Square','Charles Bridge'], weather:'Continental, 5–25°C', bestFor:'Budget · History · Couples' },
  { id:26, name:'Lisbon', country:'Portugal', cat:'international', desc:'Europe\'s most charming capital — sun-soaked hilltop viewpoints, vintage trams, Fado music, and custard tarts.', budget:'₹70,000/person', rating:4.7, views:'4.8M', months:[3,4,5,9,10,11], img:'https://images.unsplash.com/photo-1536663815808-535e2280d2c2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlzYm9ufGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1585208798174-6cedd4b8d2a4?w=600&q=80', tags:['Culture','Food','Budget'], highlights:['Belém Tower','Alfama district','Pastéis de Belém'], weather:'Mediterranean, 12–28°C', bestFor:'Budget · Solo · Foodies' },
  { id:27, name:'Tbilisi', country:'Georgia', cat:'international', desc:'A hidden European gem with ancient sulfur baths, medieval fortress, wine culture going back 8,000 years, and incredible value.', budget:'₹45,000/person', rating:4.7, views:'1.8M', months:[4,5,6,9,10,11], img:'https://images.unsplash.com/photo-1565008576549-57569a49371d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGJpbGlzaXxlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1565008576549-57569a49c5b0?w=600&q=80', tags:['Hidden Gem','Culture','Wine'], highlights:['Narikala fortress','Sulfur baths','Georgian wine tour'], weather:'Continental, 10–30°C', bestFor:'Budget · Foodies · Solo' }
];

/* ═══════════════════════════════
   HIDDEN GEMS DATA
═══════════════════════════════ */
const hiddenGems = [
  { name:'Kalga Village', loc:'Kheerganga, Himachal Pradesh', type:'Village', desc:'A secret hippie village at 7,700 ft with cozy cafes, apple orchards, and the famous Kheerganga hot springs trek.', budget:'₹500/day', icon:'🏘️', tip:'Stay at a local homestay for ₹400/night' },
  { name:'Lamayuru Moonland', loc:'Ladakh, India', type:'Landscape', desc:'An otherworldly lunar landscape between Srinagar and Leh — looks like a scene straight from another planet.', budget:'Free (en route)', icon:'🌙', tip:'Stop here on the Leh–Srinagar highway' },
  { name:'Gandikota Gorge', loc:'Kadapa, Andhra Pradesh', type:'Canyon', desc:'India\'s Grand Canyon — a stunning gorge with 16th-century fort ruins that remains beautifully undiscovered.', budget:'₹500–800', icon:'🏜️', tip:'Camp overnight for a magical sunrise' },
  { name:'Dhanushkodi Ghost Town', loc:'Rameswaram, Tamil Nadu', type:'Historical', desc:'A hauntingly beautiful ghost town at India\'s southernmost tip, abandoned after a 1964 cyclone. Surreal and magical.', budget:'₹400–600', icon:'🏚️', tip:'Take a 4x4 jeep from Rameswaram' },
  { name:'Tabo Monastery', loc:'Spiti Valley, Himachal', type:'Spiritual', desc:'Over 1,000 years old — the Ajanta of the Himalayas with the finest ancient Buddhist murals, rarely crowded.', budget:'₹100 entry', icon:'🛕', tip:'Attend morning prayers at 6 AM for an unforgettable experience' },
  { name:'Divar Island', loc:'Old Goa', type:'Island', desc:'A quiet river island in the Mandovi with Portuguese-era villages, zero tourist crowds, and pure countryside charm.', budget:'Free (ferry only)', icon:'🌿', tip:'Rent a cycle from the ferry landing at ₹100' },
  { name:'Autumn Valley, Dalhousie', loc:'Himachal Pradesh', type:'Valley', desc:'A hidden meadow near Dalhousie with no tourist crowds — just pine trees, wildflowers, and mountain silence.', budget:'₹300', icon:'🍁', tip:'Best in October–November for vivid autumn colors' },
  { name:'Phyang Village', loc:'Ladakh', type:'Village', desc:'A peaceful Ladakhi village bypassed by tourists, with a stunning monastery, apricot orchards, and welcoming locals.', budget:'Free to explore', icon:'🌸', tip:'Visit in July for the Phyang Tsedup festival' },
  { name:'Mawlynnong Village', loc:'Meghalaya', type:'Village', desc:'Asia\'s cleanest village — living root bridges, bamboo walkways, sky walks, and breathtaking misty landscapes.', budget:'₹500–1,000', icon:'🌱', tip:'Hire a local guide for the root bridge trail' },
  { name:'Magnetic Hill Café', loc:'Leh, Ladakh', type:'Café', desc:'A tiny café near the famous Magnetic Hill where time slows down — try the yak butter tea and legendary apple pie.', budget:'₹200–400', icon:'☕', tip:'The apple pie is said to be the best in Ladakh' },
  { name:'Kuntala Waterfall', loc:'Adilabad, Telangana', type:'Waterfall', desc:'The highest waterfall in Telangana that most tourists never discover — monsoon magic at its absolute finest.', budget:'₹200 entry', icon:'💧', tip:'Visit July–September for the waterfall in full glory' },
  { name:'Chopta Meadows', loc:'Uttarakhand', type:'Nature', desc:'A peaceful high-altitude meadow known as Uttarakhand\'s mini Switzerland — rhododendrons, snow, and silence.', budget:'₹3,000–5,000', icon:'⛺', tip:'Camp here for zero light pollution and incredible stargazing' }
];

/* ═══════════════════════════════
   CHECKLIST DATA
═══════════════════════════════ */
const checklistData = {
  general: {
    'Documents': [
      { id:'cl_pass', label:'Passport / National ID card', priority:'essential' },
      { id:'cl_tick', label:'Flight / Train / Bus tickets', priority:'essential' },
      { id:'cl_hotel', label:'Hotel booking confirmation', priority:'essential' },
      { id:'cl_ins', label:'Travel insurance documents', priority:'important' },
      { id:'cl_visa', label:'Visa (if required for destination)', priority:'essential' },
      { id:'cl_cash', label:'Cash & travel debit card', priority:'essential' },
      { id:'cl_ec', label:'Emergency contact list', priority:'important' }
    ],
    'Electronics': [
      { id:'cl_ph', label:'Smartphone & charger', priority:'essential' },
      { id:'cl_pb', label:'Power bank (10,000+ mAh)', priority:'important' },
      { id:'cl_ad', label:'Travel adapter (universal)', priority:'important' },
      { id:'cl_cam', label:'Camera & memory cards', priority:'optional' },
      { id:'cl_ear', label:'Earphones / headphones', priority:'optional' }
    ],
    'Clothing': [
      { id:'cl_clo', label:'Clothes (1 outfit per day)', priority:'essential' },
      { id:'cl_un', label:'Underwear & socks (extra pair)', priority:'essential' },
      { id:'cl_pj', label:'Sleepwear / pajamas', priority:'important' },
      { id:'cl_jk', label:'Light jacket or cardigan', priority:'important' },
      { id:'cl_sh', label:'Comfortable walking shoes', priority:'essential' },
      { id:'cl_fo', label:'One formal / smart outfit', priority:'optional' }
    ],
    'Toiletries': [
      { id:'cl_tb', label:'Toothbrush & toothpaste', priority:'essential' },
      { id:'cl_sp', label:'Shampoo & conditioner', priority:'essential' },
      { id:'cl_bs', label:'Body wash / soap', priority:'essential' },
      { id:'cl_deo', label:'Deodorant', priority:'essential' },
      { id:'cl_fw', label:'Face wash & moisturizer', priority:'important' },
      { id:'cl_sun', label:'Sunscreen SPF 30+', priority:'important' }
    ],
    'Health': [
      { id:'cl_med', label:'Regular prescription medicines', priority:'essential' },
      { id:'cl_par', label:'Painkiller (paracetamol / ibuprofen)', priority:'important' },
      { id:'cl_ant', label:'Antiseptic cream & band-aids', priority:'important' },
      { id:'cl_anac', label:'Antacid / digestion tablets', priority:'important' },
      { id:'cl_san', label:'Hand sanitizer', priority:'important' }
    ],
    'Accessories': [
      { id:'cl_sg', label:'Sunglasses', priority:'important' },
      { id:'cl_bp', label:'Day backpack or handbag', priority:'important' },
      { id:'cl_wb', label:'Reusable water bottle', priority:'important' },
      { id:'cl_umb', label:'Compact umbrella / rain cover', priority:'optional' },
      { id:'cl_sn', label:'Travel snacks', priority:'optional' },
      { id:'cl_np', label:'Travel neck pillow', priority:'optional' }
    ]
  },
  beach: {
    'Documents': [
      { id:'b_pass', label:'Passport / ID', priority:'essential' },
      { id:'b_tick', label:'Travel tickets & bookings', priority:'essential' },
      { id:'b_ins', label:'Travel insurance', priority:'important' }
    ],
    'Beach Essentials': [
      { id:'b_sw', label:'Swimwear (2–3 sets)', priority:'essential' },
      { id:'b_sun', label:'Sunscreen SPF 50+ (water resistant)', priority:'essential' },
      { id:'b_sg', label:'UV-protection sunglasses', priority:'essential' },
      { id:'b_tw', label:'Beach towel (quick-dry)', priority:'essential' },
      { id:'b_ff', label:'Flip flops / sandals', priority:'essential' },
      { id:'b_bag', label:'Waterproof beach bag', priority:'important' },
      { id:'b_sn', label:'Snorkel set', priority:'optional' },
      { id:'b_rg', label:'Rash guard / swim shirt', priority:'optional' },
      { id:'b_cu', label:'Beach cover-up or sarong', priority:'important' }
    ],
    'Electronics': [
      { id:'b_ph', label:'Phone & charger', priority:'essential' },
      { id:'b_wc', label:'Waterproof phone case', priority:'important' },
      { id:'b_pb', label:'Power bank', priority:'important' },
      { id:'b_go', label:'GoPro / underwater camera', priority:'optional' }
    ],
    'Health': [
      { id:'b_as', label:'After-sun lotion / aloe vera gel', priority:'important' },
      { id:'b_ms', label:'Motion sickness tablets', priority:'optional' },
      { id:'b_med', label:'Regular medicines', priority:'essential' },
      { id:'b_ir', label:'Insect repellent', priority:'important' }
    ]
  },
  mountain: {
    'Documents': [
      { id:'m_id', label:'ID / Passport', priority:'essential' },
      { id:'m_pm', label:'Inner line permit (if required)', priority:'essential' },
      { id:'m_tick', label:'Travel & accommodation bookings', priority:'essential' },
      { id:'m_ins', label:'Travel insurance with medical cover', priority:'essential' }
    ],
    'Layered Clothing': [
      { id:'m_th', label:'Thermal innerwear (top & bottom)', priority:'essential' },
      { id:'m_fl', label:'Fleece jacket or heavy sweater', priority:'essential' },
      { id:'m_dj', label:'Down / winter jacket (−10°C rated)', priority:'essential' },
      { id:'m_tp', label:'Trekking pants (wind resistant)', priority:'essential' },
      { id:'m_rj', label:'Waterproof outer shell / rain jacket', priority:'important' },
      { id:'m_ws', label:'Woolen socks (3+ pairs)', priority:'essential' },
      { id:'m_gl', label:'Insulated gloves', priority:'essential' },
      { id:'m_bn', label:'Warm beanie / thermal hat', priority:'essential' },
      { id:'m_sc', label:'Neck gaiter / balaclava', priority:'important' }
    ],
    'Footwear': [
      { id:'m_tb', label:'Ankle-support trekking boots (waterproof)', priority:'essential' },
      { id:'m_ss', label:'Camp sandals', priority:'optional' }
    ],
    'Gear': [
      { id:'m_tp2', label:'Trekking poles', priority:'important' },
      { id:'m_hl', label:'Headlamp + spare batteries', priority:'essential' },
      { id:'m_slb', label:'Sleeping bag (temperature rated)', priority:'important' },
      { id:'m_dp', label:'Daypack 20–30L', priority:'essential' }
    ],
    'Health & Safety': [
      { id:'m_alt', label:'Altitude sickness medicine (Diamox)', priority:'important' },
      { id:'m_pi', label:'Painkiller / ibuprofen', priority:'essential' },
      { id:'m_sn', label:'Sunscreen SPF 50+ (UV stronger at altitude)', priority:'essential' },
      { id:'m_lb', label:'SPF lip balm', priority:'essential' },
      { id:'m_fa', label:'Complete first aid kit', priority:'essential' },
      { id:'m_eb', label:'High-energy snacks & bars', priority:'important' },
      { id:'m_wp', label:'Water purification tablets', priority:'important' }
    ]
  },
  international: {
    'Critical Documents': [
      { id:'i_pass', label:'Passport (valid 6+ months beyond trip)', priority:'essential' },
      { id:'i_visa', label:'Visa (apply well in advance)', priority:'essential' },
      { id:'i_tick', label:'International flight tickets (printed)', priority:'essential' },
      { id:'i_ins', label:'International travel insurance', priority:'essential' },
      { id:'i_fx', label:'Forex card + local currency', priority:'essential' },
      { id:'i_emb', label:'Embassy & emergency contact numbers', priority:'important' },
      { id:'i_cop', label:'Photocopies of all documents', priority:'important' }
    ],
    'Electronics': [
      { id:'i_ph', label:'Phone & charger', priority:'essential' },
      { id:'i_ad', label:'Universal travel adapter', priority:'essential' },
      { id:'i_pb', label:'Power bank', priority:'important' },
      { id:'i_lap', label:'Laptop (if needed)', priority:'optional' }
    ],
    'Clothing': [
      { id:'i_clo', label:'Weather-appropriate clothing', priority:'essential' },
      { id:'i_lay', label:'Layering options', priority:'important' },
      { id:'i_sm', label:'Smart casual outfit (for nice dinners)', priority:'optional' }
    ],
    'Health & Safety': [
      { id:'i_vac', label:'Required vaccinations (check destination)', priority:'essential' },
      { id:'i_med', label:'Prescription medicines + extra supply', priority:'essential' },
      { id:'i_kit', label:'Travel health kit', priority:'important' },
      { id:'i_san', label:'Hand sanitizer', priority:'important' }
    ],
    'Connectivity': [
      { id:'i_sim', label:'International SIM / eSIM', priority:'important' },
      { id:'i_map', label:'Offline maps downloaded (Google Maps)', priority:'important' },
      { id:'i_tr', label:'Translation app installed', priority:'optional' },
      { id:'i_vpn', label:'VPN app (for some countries)', priority:'optional' }
    ]
  },
  camping: {
    'Documents': [
      { id:'c_id', label:'ID & national park permits', priority:'essential' },
      { id:'c_ins', label:'Travel insurance', priority:'essential' }
    ],
    'Shelter & Sleep': [
      { id:'c_tent', label:'Tent (weather-rated, stakes & fly)', priority:'essential' },
      { id:'c_slb', label:'Sleeping bag (season-appropriate)', priority:'essential' },
      { id:'c_pad', label:'Sleeping pad / foam mat', priority:'essential' },
      { id:'c_tar', label:'Extra tarp / rain fly', priority:'important' }
    ],
    'Clothing': [
      { id:'c_bl', label:'Moisture-wicking base layers', priority:'essential' },
      { id:'c_ml', label:'Warm mid-layer (fleece)', priority:'essential' },
      { id:'c_rl', label:'Waterproof outer layer', priority:'essential' },
      { id:'c_cs', label:'Camp sandals / crocs', priority:'important' }
    ],
    'Cooking & Food': [
      { id:'c_stv', label:'Camping stove + gas canister', priority:'important' },
      { id:'c_cw', label:'Lightweight cookware set', priority:'important' },
      { id:'c_ut', label:'Cutlery, cup, plate', priority:'essential' },
      { id:'c_fd', label:'Non-perishable food supplies', priority:'essential' },
      { id:'c_wf', label:'Water filter / purification', priority:'essential' }
    ],
    'Safety & Tools': [
      { id:'c_hl', label:'Headlamp + spare batteries', priority:'essential' },
      { id:'c_nav', label:'Topographic map & compass', priority:'important' },
      { id:'c_mt', label:'Multi-tool / knife', priority:'important' },
      { id:'c_fa', label:'Full first aid kit', priority:'essential' },
      { id:'c_fs', label:'Fire starter (lighter + waterproof matches)', priority:'essential' },
      { id:'c_wh', label:'Emergency whistle', priority:'important' },
      { id:'c_sun', label:'Sunscreen & bug repellent', priority:'important' }
    ]
  }
};

/* ═══════════════════════════════
   STATE
═══════════════════════════════ */
let bookmarks = JSON.parse(localStorage.getItem('wanderlust_bookmarks') || '[]');
let checkedItems = JSON.parse(localStorage.getItem('wanderlust_checklist') || '{}');
let currentChecklistType = 'general';
let currentCategory = 'all';
let customItems = JSON.parse(localStorage.getItem('wanderlust_custom_items') || '{}');

/* ═══════════════════════════════
   INIT
═══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAuth();
  updateBookmarkCount();
  initScrollAnimations();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-field')) hideSuggestions();
    if (!e.target.closest('.user-menu-wrap')) closeUserMenu();
  });

  /* ESC key: close open modals, menus, and mobile menu */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    ['bookmarksModal','destModal','authModal','profileModal','customItemModal'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.classList.contains('active')) closeModalDirect(id);
    });
    closeUserMenu();
    closeMobileMenu();
  });

  setCurrentMonth();
  renderMonthPicks();
  renderDestinations('all');
  renderHiddenGems();
  initCategoryTabs();
  autoShowReminder();
  renderFestivals();
  renderEtiquette();
  filterMissSpots('all', document.querySelector('.miss-tab'));
  initQuiz();
  renderBuddies();
  renderDailySpending('INR');
  convertCurrency();
  loadFoodBudget('street', document.querySelector('.food-tab'));
  const activeBtn = document.querySelector('.type-btn.active');
  if (activeBtn) loadChecklist('general', activeBtn);
});

/* ═══════════════════════════════
   NAVBAR
═══════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    if (backToTop) {
      if (window.scrollY > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  });

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(s => observer.observe(s));
  }
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ═══════════════════════════════
   MONTH PICKS
═══════════════════════════════ */
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function setCurrentMonth() {
  const month = new Date().getMonth() + 1;
  document.getElementById('currentMonthName').textContent = monthNames[month - 1];
}

function renderMonthPicks() {
  const month = new Date().getMonth() + 1;
  const picks = destinations.filter(d => d.months.includes(month)).slice(0, 6);
  const grid = document.getElementById('monthGrid');
  if (!picks.length) { grid.innerHTML = '<p style="text-align:center;color:var(--text-lt)">No specific picks for this month — browse all destinations below!</p>'; return; }
  grid.innerHTML = picks.map(d => `
    <div class="month-card reveal" onclick="showDestDetail(${d.id})">
      <div class="month-card-img"><img src="${d.img}" alt="${d.name}" loading="lazy"></div>
      <div class="month-card-info">
        <div class="month-card-name">${d.name}</div>
        <div class="month-card-country">${d.country}</div>
        <div class="month-card-budget">${d.budget}</div>
      </div>
    </div>`).join('');
  observeReveal();
}

/* ═══════════════════════════════
   DESTINATION EXPLORER
═══════════════════════════════ */
function initCategoryTabs() {
  document.getElementById('categoryTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDestinations(btn.dataset.cat);
  });
}

function renderDestinations(cat) {
  currentCategory = cat;
  const list = cat === 'all' ? destinations : destinations.filter(d => d.cat === cat);
  const grid = document.getElementById('destinationsGrid');
  grid.innerHTML = list.map(d => renderDestCard(d)).join('');
  observeReveal();
}

function renderDestCard(d) {
  const saved = bookmarks.includes(d.id);
  const stars = '★'.repeat(Math.min(Math.round(d.rating), 5));
  const catLabel = { beaches:'Beach', mountains:'Mountain', cafes:'Culture', weekend:'Weekend', hidden:'Hidden Gem', international:'International' }[d.cat] || d.cat;
  return `
    <div class="dest-card reveal" onclick="showDestDetail(${d.id})">
      <div class="dest-card-img">
        <img src="${d.img}" alt="${d.name}" loading="lazy">
        <div class="dest-card-cat">${catLabel}</div>
        <button class="dest-card-bookmark ${saved ? 'saved' : ''}" onclick="toggleBookmark(event, ${d.id})" title="${saved ? 'Remove bookmark' : 'Save place'}">
          ${saved ? '🔖' : '🤍'}
        </button>
      </div>
      <div class="dest-card-info">
        <div class="dest-card-header">
          <div>
            <div class="dest-card-name">${d.name}</div>
            <div class="dest-card-country">📍 ${d.country}</div>
          </div>
          <div class="dest-card-rating">${stars} ${d.rating}</div>
        </div>
        <div class="dest-card-desc">${d.desc}</div>
        <div class="dest-card-tags">${d.tags.map(t => `<span class="dest-tag">${t}</span>`).join('')}</div>
        <div class="dest-card-footer">
          <span class="dest-card-budget">From ${d.budget}</span>
          <span class="dest-card-views">👁 ${d.views} views</span>
        </div>
      </div>
    </div>`;
}

/* ═══════════════════════════════
   DESTINATION DETAIL MODAL
═══════════════════════════════ */
function showDestDetail(id) {
  const d = destinations.find(x => x.id === id);
  if (!d) return;
  const saved = bookmarks.includes(d.id);
  document.getElementById('destModalTitle').textContent = `${d.name}, ${d.country}`;
  document.getElementById('destModalBody').innerHTML = `
    <div class="dest-modal-hero">
      <img src="${d.img}" alt="${d.name}">
      <div class="dest-modal-overlay"></div>
      <div class="dest-modal-badge">${d.cat.toUpperCase()}</div>
    </div>
    <p style="font-size:0.9rem;color:var(--text-md);line-height:1.7;margin-bottom:16px">${d.desc}</p>
    <div class="dest-modal-grid">
      <div class="dest-modal-stat"><div class="dest-modal-stat-label">Budget (est.)</div><div class="dest-modal-stat-value">${d.budget}</div></div>
      <div class="dest-modal-stat"><div class="dest-modal-stat-label">Rating</div><div class="dest-modal-stat-value">⭐ ${d.rating} / 5</div></div>
      <div class="dest-modal-stat"><div class="dest-modal-stat-label">Weather</div><div class="dest-modal-stat-value">🌡️ ${d.weather}</div></div>
      <div class="dest-modal-stat"><div class="dest-modal-stat-label">Best For</div><div class="dest-modal-stat-value">${d.bestFor}</div></div>
    </div>
    <div class="dest-modal-highlights">
      <h4>Top Highlights</h4>
      <div class="highlight-list">${d.highlights.map(h => `<span class="highlight-tag">✦ ${h}</span>`).join('')}</div>
    </div>
    <div class="dest-modal-actions">
      <button class="dest-modal-btn primary" onclick="toggleBookmark(event, ${d.id}); document.querySelector('#destModal .modal-hd button').click()">${saved ? '🔖 Saved!' : '🤍 Save Place'}</button>
      <button class="dest-modal-btn secondary" onclick="prefillBudget('${d.name}')">💰 Plan Budget</button>
      <button class="dest-modal-btn secondary" onclick="prefillItinerary('${d.name}')">🗺️ Plan Trip</button>
    </div>`;
  openModal('destModal');
}

function prefillBudget(name) {
  closeModalDirect('destModal');
  document.getElementById('budgetDest').value = name;
  document.getElementById('budget').scrollIntoView({ behavior: 'smooth' });
}

function prefillItinerary(name) {
  closeModalDirect('destModal');
  document.getElementById('itinDest').value = name;
  document.getElementById('tripName').value = `My ${name} Trip`;
  document.getElementById('itinerary').scrollIntoView({ behavior: 'smooth' });
}

/* ═══════════════════════════════
   HIDDEN GEMS
═══════════════════════════════ */
function renderHiddenGems() {
  document.getElementById('gemsGrid').innerHTML = hiddenGems.map(g => `
    <div class="gem-card reveal">
      <div class="gem-header">
        <div class="gem-icon">${g.icon}</div>
        <div class="gem-title-block">
          <div class="gem-name">${g.name}</div>
          <div class="gem-location">📍 ${g.loc}</div>
        </div>
      </div>
      <div class="gem-type">${g.type}</div>
      <div class="gem-desc">${g.desc}</div>
      <div class="gem-footer">
        <span class="gem-budget">💚 ${g.budget}</span>
        <span class="gem-tip">💡 ${g.tip}</span>
      </div>
    </div>`).join('');
  observeReveal();
}

/* ═══════════════════════════════
   SEARCH
═══════════════════════════════ */
function showSuggestions(query) {
  const box = document.getElementById('searchSuggestions');
  if (!query.trim()) { box.classList.remove('open'); return; }
  const matches = destinations.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  if (!matches.length) { box.classList.remove('open'); return; }
  box.innerHTML = matches.map(d => `
    <div class="suggestion-item" onclick="selectSuggestion('${d.name}', ${d.id})">
      <span class="sug-icon">${{ beaches:'🏖️', mountains:'🏔️', cafes:'☕', weekend:'🌿', hidden:'💎', international:'✈️' }[d.cat]}</span>
      <span class="sug-name">${d.name}</span>
      <span class="sug-loc">${d.country}</span>
    </div>`).join('');
  box.classList.add('open');
}

function selectSuggestion(name, id) {
  document.getElementById('searchDestination').value = name;
  hideSuggestions();
  showDestDetail(id);
}

function hideSuggestions() {
  document.getElementById('searchSuggestions').classList.remove('open');
}

function searchDestinations() {
  const query = document.getElementById('searchDestination').value.trim().toLowerCase();
  const month = parseInt(document.getElementById('searchMonth').value);
  let results = [...destinations];
  if (query) results = results.filter(d => d.name.toLowerCase().includes(query) || d.country.toLowerCase().includes(query) || d.tags.some(t => t.toLowerCase().includes(query)));
  if (month) results = results.filter(d => d.months.includes(month));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-cat="all"]').classList.add('active');
  document.getElementById('destinationsGrid').innerHTML = results.length
    ? results.map(d => renderDestCard(d)).join('')
    : `<div style="text-align:center;padding:60px;color:var(--text-lt);grid-column:1/-1"><div style="font-size:3rem;margin-bottom:12px">🔍</div><p>No destinations found. Try a different search!</p></div>`;
  document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
  observeReveal();
}

/* ═══════════════════════════════
   WEATHER
═══════════════════════════════ */
async function getWeather() {
  const city = document.getElementById('weatherCity').value.trim();
  if (!city) { showToast('Please enter a city name'); return; }
  const resultEl = document.getElementById('weatherResult');
  resultEl.innerHTML = '<div class="weather-loading">🌐 Fetching live weather data...</div>';
  if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
    showDemoWeather(city, resultEl);
    return;
  }
  try {
    const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`);
    if (!r.ok) throw new Error('City not found');
    const data = await r.json();
    renderWeather(data, resultEl);
  } catch {
    resultEl.innerHTML = `<div class="weather-error"><div style="font-size:2.5rem;margin-bottom:12px">🌫️</div><p>City not found or API error. Check your API key in app.js.</p></div>`;
  }
}

function showDemoWeather(city, el) {
  const demos = { 'bali':{ temp:29, feels:33, humidity:78, wind:14, desc:'Partly cloudy', icon:'⛅' }, 'paris':{ temp:17, feels:15, humidity:65, wind:22, desc:'Light rain', icon:'🌦️' }, 'goa':{ temp:31, feels:36, humidity:82, wind:18, desc:'Sunny and warm', icon:'☀️' }, 'manali':{ temp:12, feels:8, humidity:55, wind:30, desc:'Clear skies', icon:'🌤️' }, 'tokyo':{ temp:22, feels:21, humidity:60, wind:16, desc:'Sunny', icon:'☀️' } };
  const key = city.toLowerCase();
  const d = demos[key] || { temp: Math.floor(Math.random()*20)+15, feels: Math.floor(Math.random()*20)+13, humidity: Math.floor(Math.random()*40)+40, wind: Math.floor(Math.random()*30)+10, desc:'Clear skies', icon:'🌤️' };
  renderWeatherData(city, d.icon, d.desc, d.temp, d.feels, d.humidity, d.wind, el, true);
}

function renderWeather(data, el) {
  const iconMap = { '01':'☀️','02':'⛅','03':'🌥️','04':'☁️','09':'🌧️','10':'🌦️','11':'⛈️','13':'❄️','50':'🌫️' };
  const code = data.weather[0].icon.substring(0,2);
  const icon = iconMap[code] || '🌤️';
  renderWeatherData(data.name, icon, data.weather[0].description, Math.round(data.main.temp), Math.round(data.main.feels_like), data.main.humidity, Math.round(data.wind.speed * 3.6), el, false);
}

function renderWeatherData(city, icon, desc, temp, feels, humidity, wind, el, isDemo) {
  const advice = getWeatherAdvice(temp, desc);
  const safeCity = sanitizeHTML(city);
  const safeDesc = sanitizeHTML(desc);
  el.innerHTML = `
    <div class="weather-display">
      ${isDemo ? '<p style="text-align:center;font-size:0.75rem;color:var(--text-lt);margin-bottom:8px">Demo mode — add your OpenWeatherMap API key for live data</p>' : ''}
      <div class="weather-main">
        <div>
          <div class="weather-city-name">${safeCity}</div>
          <div class="weather-country">${safeDesc.charAt(0).toUpperCase() + safeDesc.slice(1)}</div>
        </div>
        <div class="weather-temp-block">
          <div class="weather-icon-emoji">${icon}</div>
          <div class="weather-temp">${temp}°C</div>
        </div>
      </div>
      <div class="weather-stats-grid">
        <div class="weather-stat-item"><div class="weather-stat-icon">🌡️</div><div><div class="weather-stat-label">Feels Like</div><div class="weather-stat-value">${feels}°C</div></div></div>
        <div class="weather-stat-item"><div class="weather-stat-icon">💧</div><div><div class="weather-stat-label">Humidity</div><div class="weather-stat-value">${humidity}%</div></div></div>
        <div class="weather-stat-item"><div class="weather-stat-icon">💨</div><div><div class="weather-stat-label">Wind Speed</div><div class="weather-stat-value">${wind} km/h</div></div></div>
        <div class="weather-stat-item"><div class="weather-stat-icon">👗</div><div><div class="weather-stat-label">Pack</div><div class="weather-stat-value">${temp < 15 ? 'Warm layers' : temp < 25 ? 'Light layers' : 'Light clothes'}</div></div></div>
      </div>
      <div class="weather-advice">💡 ${advice}</div>
    </div>`;
}

function getWeatherAdvice(temp, desc) {
  const d = desc.toLowerCase();
  if (d.includes('rain') || d.includes('drizzle')) return 'Rain expected — pack a waterproof jacket and an umbrella!';
  if (d.includes('snow')) return 'Snow expected — bring heavy winter layers, boots, and gloves.';
  if (d.includes('thunder')) return 'Thunderstorms likely — consider indoor activities and avoid exposed areas.';
  if (temp > 35) return 'Very hot! Pack light breathable clothes, sunscreen SPF 50+, and stay hydrated.';
  if (temp > 28) return 'Warm and sunny — perfect travel weather! Don\'t forget sunscreen and sunglasses.';
  if (temp > 20) return 'Comfortable temperatures — great for sightseeing. Light layers recommended.';
  if (temp > 12) return 'Cool weather — pack a warm jacket and comfortable layers.';
  return 'Cold temperatures — heavy winter clothing, thermal layers, and warm accessories essential.';
}

/* ═══════════════════════════════
   BUDGET CALCULATOR
═══════════════════════════════ */
/* Single source of truth for all currency conversions (INR base) */
const currencySymbols = { INR:'₹', USD:'$', EUR:'€', GBP:'£' };
const currencyRates   = { INR:1, USD:83.5, EUR:90.2, GBP:105.8, AED:22.7, JPY:0.55, THB:2.35, SGD:61.4 };

function calculateBudget() {
  const dest = document.getElementById('budgetDest').value.trim() || 'Your Trip';
  const days = parseInt(document.getElementById('budgetDays').value) || 0;
  const transport = parseFloat(document.getElementById('transportBudget').value) || 0;
  const hotel = parseFloat(document.getElementById('hotelBudget').value) || 0;
  const food = parseFloat(document.getElementById('foodBudget').value) || 0;
  const activities = parseFloat(document.getElementById('activitiesBudget').value) || 0;
  const travelers = parseInt(document.getElementById('numTravelers').value) || 1;
  const currency = document.getElementById('currency').value;
  if (!days) { showToast('Please enter the number of days'); return; }
  const sym = currencySymbols[currency];
  const rate = currencyRates[currency];
  const transportTotal = transport * days * travelers;
  const hotelTotal = hotel * days;
  const foodTotal = food * days * travelers;
  const activitiesTotal = activities * days * travelers;
  const subtotal = transportTotal + hotelTotal + foodTotal + activitiesTotal;
  const misc = subtotal * 0.1;
  const grandTotal = subtotal + misc;
  const perPerson = grandTotal / travelers;
  const fmt = (n) => `${sym}${(n / rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  document.getElementById('resultDest').textContent = dest;
  document.getElementById('resultDaysLabel').textContent = `${days} day${days > 1 ? 's' : ''} · ${travelers} traveler${travelers > 1 ? 's' : ''}`;
  document.getElementById('rTransport').textContent = fmt(transportTotal);
  document.getElementById('rHotel').textContent = fmt(hotelTotal);
  document.getElementById('rFood').textContent = fmt(foodTotal);
  document.getElementById('rActivities').textContent = fmt(activitiesTotal);
  document.getElementById('rMisc').textContent = fmt(misc);
  document.getElementById('totalPerPerson').textContent = fmt(perPerson);
  document.getElementById('totalCost').textContent = fmt(grandTotal);
  document.getElementById('budgetTips').innerHTML = getBudgetTips(grandTotal / rate, days, dest);
  const resultEl = document.getElementById('budgetResult');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getBudgetTips(total, days, dest) {
  const daily = total / days;
  let tips = '💡 <strong>Smart Travel Tips:</strong><br>';
  if (daily < 2000) tips += '✓ Great budget! Book accommodation in advance for better deals.<br>';
  else if (daily < 5000) tips += '✓ Mid-range budget — you can enjoy comfortable travel with local experiences.<br>';
  else tips += '✓ Generous budget — look for luxury stays and premium experiences!<br>';
  tips += '✓ Carry a mix of cash and cards for emergencies.<br>';
  tips += '✓ Save 10–15% extra for unexpected expenses.';
  return tips;
}

function saveToItinerary() {
  const dest = document.getElementById('budgetDest').value || 'My Trip';
  const days = document.getElementById('budgetDays').value || 7;
  document.getElementById('itinDest').value = dest;
  document.getElementById('tripName').value = `My ${dest} Trip`;
  document.getElementById('itinDays').value = days;
  generateItinerary();
  document.getElementById('itinerary').scrollIntoView({ behavior: 'smooth' });
  showToast('Budget saved! Generating itinerary...');
}

/* ═══════════════════════════════
   ITINERARY PLANNER
═══════════════════════════════ */
const defaultActivities = [
  { time:'Morning', items:['Breakfast at local café','Visit top attraction','Explore neighborhood'] },
  { time:'Afternoon', items:['Lunch at recommended spot','Sightseeing tour','Market or bazaar visit'] },
  { time:'Evening', items:['Sunset viewpoint','Dinner (local cuisine)','Night walk / evening show'] }
];

function generateItinerary() {
  const name = document.getElementById('tripName').value || 'My Trip';
  const dest = document.getElementById('itinDest').value || 'Destination';
  const days = parseInt(document.getElementById('itinDays').value) || 0;
  const startDate = document.getElementById('startDate').value;
  if (!days || days < 1) { showToast('Please enter the number of days (1–30)'); return; }
  const wrap = document.getElementById('itinDaysWrap');
  const start = startDate ? new Date(startDate) : null;
  const specificDays = getDestinationItinerary(dest, days);
  const isSpecific = !!(specificDays && specificDays.length);

  let html = `<div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
    <div><h3 style="font-family:var(--font-display);color:var(--navy);font-size:1.15rem">${name}</h3>
    <p style="font-size:0.82rem;color:var(--text-lt)">📍 ${dest} · ${days} day${days>1?'s':''}</p>
    ${isSpecific ? '<span style="font-size:0.72rem;background:var(--tropical);color:#fff;padding:2px 10px;border-radius:20px;margin-left:8px">Destination-Specific Plan</span>' : ''}</div>
    <button class="itin-print-btn" onclick="window.print()">🖨️ Print</button></div>`;

  for (let i = 1; i <= Math.min(days, 20); i++) {
    const dateLabel = start ? `${new Date(start.getTime() + (i-1)*86400000).toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' })}` : `Day ${i}`;
    const dayPlan = isSpecific && specificDays[i-1] ? specificDays[i-1] : null;

    if (dayPlan) {
      html += `<div class="day-card ${i===1?'open':''}">
        <div class="day-card-header" onclick="toggleDay(this.parentElement)">
          <div><div class="day-label">Day ${i} — ${dayPlan.title}</div><div class="day-date-label">${dateLabel}</div></div>
          <span class="day-toggle">▾</span>
        </div>
        <div class="day-body">
          <div class="activity-slot"><div class="activity-time">Morning</div><textarea class="activity-input" rows="3">${dayPlan.morning}</textarea></div>
          <div class="activity-slot"><div class="activity-time">Afternoon</div><textarea class="activity-input" rows="3">${dayPlan.afternoon}</textarea></div>
          <div class="activity-slot"><div class="activity-time">Evening</div><textarea class="activity-input" rows="3">${dayPlan.evening}</textarea></div>
          <button class="add-activity-btn" onclick="addActivity(this)">+ Add activity</button>
        </div>
      </div>`;
    } else {
      const slots = defaultActivities;
      html += `<div class="day-card ${i===1&&!isSpecific?'open':''}">
        <div class="day-card-header" onclick="toggleDay(this.parentElement)">
          <div><div class="day-label">Day ${i}</div><div class="day-date-label">${dateLabel}</div></div>
          <span class="day-toggle">▾</span>
        </div>
        <div class="day-body">
          ${slots.map(slot => `
            <div class="activity-slot">
              <div class="activity-time">${slot.time}</div>
              <textarea class="activity-input" rows="2" placeholder="${slot.items[0]}..."></textarea>
            </div>`).join('')}
          <button class="add-activity-btn" onclick="addActivity(this)">+ Add activity</button>
        </div>
      </div>`;
    }
  }
  if (days > 20) html += `<p style="text-align:center;font-size:0.82rem;color:var(--text-lt);padding:12px">Showing first 20 days. Print to see full plan.</p>`;
  wrap.innerHTML = html;
  if (isSpecific) showToast(`Realistic ${dest} itinerary loaded! Edit any field to customize.`);
}

function toggleDay(card) {
  card.classList.toggle('open');
}

function addActivity(btn) {
  const body = btn.parentElement;
  const slot = document.createElement('div');
  slot.className = 'activity-slot';
  slot.innerHTML = `<div class="activity-time" contenteditable="true" style="cursor:text;outline:none">Time</div><textarea class="activity-input" rows="2" placeholder="Add your activity..."></textarea>`;
  body.insertBefore(slot, btn);
}

/* ═══════════════════════════════
   CHECKLIST
═══════════════════════════════ */
function loadChecklist(type, btn) {
  currentChecklistType = type;
  if (btn) {
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  const data = checklistData[type];
  if (!data) return;
  const grid = document.getElementById('checklistGrid');
  grid.innerHTML = Object.entries(data).map(([cat, items]) => `
    <div class="checklist-category">
      <h4>${getCatIcon(cat)} ${cat}</h4>
      <div class="checklist-items">
        ${items.map(item => renderCheckItem(item, type)).join('')}
        ${(customItems[type] || []).filter(ci => ci.cat === cat).map(ci => renderCheckItem(ci, type)).join('')}
      </div>
    </div>`).join('');
  updateProgress();
}

function getCatIcon(cat) {
  const icons = { 'Documents':'📄','Electronics':'🔌','Clothing':'👕','Toiletries':'🧴','Health':'💊','Accessories':'🎒','Beach Essentials':'🏖️','Footwear':'👟','Gear':'⛏️','Layered Clothing':'🧥','Critical Documents':'🛂','Connectivity':'📱','Health & Safety':'🏥','Shelter & Sleep':'⛺','Cooking & Food':'🍳','Safety & Tools':'🔦' };
  return icons[cat] || '📦';
}

function renderCheckItem(item, type) {
  const key = `${type}_${item.id}`;
  const checked = checkedItems[key] || false;
  return `<div class="checklist-item ${checked?'checked':''}" onclick="toggleCheckItem('${item.id}', '${type}', this)">
    <div class="cl-checkbox">${checked ? '✓' : ''}</div>
    <span class="cl-item-label">${item.label}</span>
    <div class="priority-dot ${item.priority}" title="${item.priority}"></div>
  </div>`;
}

function toggleCheckItem(id, type, el) {
  const key = `${type}_${id}`;
  checkedItems[key] = !checkedItems[key];
  localStorage.setItem('wanderlust_checklist', JSON.stringify(checkedItems));
  el.classList.toggle('checked', checkedItems[key]);
  el.querySelector('.cl-checkbox').textContent = checkedItems[key] ? '✓' : '';
  updateProgress();
}

function updateProgress() {
  const data = checklistData[currentChecklistType];
  if (!data) return;
  let total = 0, done = 0;
  Object.values(data).forEach(items => {
    items.forEach(item => {
      total++;
      if (checkedItems[`${currentChecklistType}_${item.id}`]) done++;
    });
  });
  (customItems[currentChecklistType] || []).forEach(ci => {
    total++;
    if (checkedItems[`${currentChecklistType}_${ci.id}`]) done++;
  });
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${pct}% packed (${done}/${total})`;
  if (pct === 100) showToast('🎉 All packed! Ready to travel!');
}

function resetChecklist() {
  const data = checklistData[currentChecklistType];
  if (!data) return;
  Object.values(data).forEach(items => items.forEach(item => delete checkedItems[`${currentChecklistType}_${item.id}`]));
  (customItems[currentChecklistType] || []).forEach(ci => delete checkedItems[`${currentChecklistType}_${ci.id}`]);
  localStorage.setItem('wanderlust_checklist', JSON.stringify(checkedItems));
  loadChecklist(currentChecklistType, null);
  showToast('Checklist reset!');
}

function addCustomItem() { openModal('customItemModal'); }

function saveCustomItem() {
  const name = document.getElementById('customItemName').value.trim();
  const cat = document.getElementById('customItemCat').value;
  if (!name) { showToast('Please enter an item name'); return; }
  if (!customItems[currentChecklistType]) customItems[currentChecklistType] = [];
  const id = 'custom_' + Date.now();
  customItems[currentChecklistType].push({ id, label: name, cat, priority: 'optional' });
  localStorage.setItem('wanderlust_custom_items', JSON.stringify(customItems));
  closeModalDirect('customItemModal');
  document.getElementById('customItemName').value = '';
  loadChecklist(currentChecklistType, null);
  showToast(`"${name}" added to your checklist!`);
}

/* ═══════════════════════════════
   REMINDERS
═══════════════════════════════ */
function setReminder() {
  const messages = [
    'Have you packed your passport and ID?',
    'Don\'t forget your phone charger and power bank!',
    'Did you pack your medicines and first aid kit?',
    'Sunscreen is essential — have you packed it?',
    'Remember to carry cash and your travel cards!'
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  showReminder('Packing Reminder! 🧳', msg);
  showToast('Reminder set! We\'ll keep you on track.');
}

function autoShowReminder() {
  if (sessionStorage.getItem('wl_reminder_shown')) return;
  setTimeout(() => {
    sessionStorage.setItem('wl_reminder_shown', '1');
    showReminder('Welcome to Wanderlust! ✈️', 'Start by exploring destinations or calculating your trip budget.');
  }, 5000);
}

function showReminder(title, msg) {
  document.getElementById('reminderTitle').textContent = title;
  document.getElementById('reminderMsg').textContent = msg;
  const popup = document.getElementById('reminderPopup');
  popup.style.display = 'block';
  setTimeout(closeReminder, 7000);
}

function closeReminder() {
  document.getElementById('reminderPopup').style.display = 'none';
}

/* ═══════════════════════════════
   BOOKMARKS
═══════════════════════════════ */
function toggleBookmark(event, id) {
  event.stopPropagation();
  const idx = bookmarks.indexOf(id);
  if (idx > -1) {
    bookmarks.splice(idx, 1);
    showToast('Removed from saved places');
  } else {
    bookmarks.push(id);
    showToast('Place saved! ❤️');
  }
  localStorage.setItem('wanderlust_bookmarks', JSON.stringify(bookmarks));
  updateBookmarkCount();
  const btn = event.currentTarget || event.target.closest('.dest-card-bookmark');
  if (btn) {
    const saved = bookmarks.includes(id);
    btn.className = `dest-card-bookmark ${saved ? 'saved' : ''}`;
    btn.textContent = saved ? '🔖' : '🤍';
  }
}

function updateBookmarkCount() {
  document.getElementById('bookmarkCount').textContent = bookmarks.length;
}

function showBookmarks() {
  const list = document.getElementById('bookmarksList');
  if (!bookmarks.length) {
    list.innerHTML = `<div class="no-bookmarks"><div class="no-bookmarks-icon">🤍</div><p>No saved places yet.</p><p style="font-size:0.82rem;margin-top:6px;color:var(--text-lt)">Browse destinations and tap the heart to save places!</p></div>`;
  } else {
    const saved = bookmarks.map(id => destinations.find(d => d.id === id)).filter(Boolean);
    list.innerHTML = saved.map(d => `
      <div class="bookmark-item" onclick="closeModalDirect('bookmarksModal'); showDestDetail(${d.id})">
        <div class="bookmark-item-img"><img src="${d.img}" alt="${d.name}" loading="lazy"></div>
        <div class="bookmark-item-info">
          <div class="bookmark-item-name">${d.name}</div>
          <div class="bookmark-item-country">📍 ${d.country}</div>
          <div class="bookmark-item-budget">${d.budget}</div>
        </div>
        <button class="bookmark-remove" onclick="event.stopPropagation(); toggleBookmark(event, ${d.id}); showBookmarks()">✕</button>
      </div>`).join('');
  }
  openModal('bookmarksModal');
}

/* ═══════════════════════════════
   MODALS
═══════════════════════════════ */

let _openModalCount = 0;
function openModal(id) {
  const el = document.getElementById(id);
  el.classList.add('active');
  _openModalCount++;
  document.body.style.overflow = 'hidden';
}
function closeModal(id, event) {
  if (event && event.target !== document.getElementById(id)) return;
  closeModalDirect(id);
}
function closeModalDirect(id) {
  const el = document.getElementById(id);
  if (!el || !el.classList.contains('active')) return;
  el.classList.remove('active');
  _openModalCount = Math.max(0, _openModalCount - 1);
  if (_openModalCount === 0) document.body.style.overflow = '';
}

/* ═══════════════════════════════
   TOAST
═══════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ═══════════════════════════════
   SCROLL ANIMATIONS
═══════════════════════════════ */
let _revealObserver = null;
function initScrollAnimations() {
  _revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        _revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  observeReveal();
}
function observeReveal() {
  if (!_revealObserver) return;
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => _revealObserver.observe(el));
}

/* ═══════════════════════════════
   AUTH SYSTEM
═══════════════════════════════ */
function initAuth() {
  const session = JSON.parse(sessionStorage.getItem('wl_session') || 'null');
  const remembered = JSON.parse(localStorage.getItem('wl_session') || 'null');
  const user = session || remembered;
  if (user) applyLoggedInState(user);
}

function openAuthModal(tab) {
  switchAuthTab(tab);
  clearAuthErrors();
  openModal('authModal');
}

function switchAuthTab(tab) {
  document.getElementById('loginTab').classList.toggle('active', tab === 'login');
  document.getElementById('signupTab').classList.toggle('active', tab === 'signup');
  document.getElementById('loginForm').style.display = tab === 'login' ? 'flex' : 'none';
  document.getElementById('signupForm').style.display = tab === 'signup' ? 'flex' : 'none';
  document.getElementById('loginForm').style.flexDirection = 'column';
  document.getElementById('signupForm').style.flexDirection = 'column';
  clearAuthErrors();
}

function clearAuthErrors() {
  ['loginError','signupError'].forEach(id => {
    const el = document.getElementById(id);
    el.textContent = '';
    el.classList.remove('show');
  });
}

function showAuthError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.add('show');
}

/* Simple hash (for demo — NOT production-safe) */
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (Math.imul(31, h) + str.charCodeAt(i)) | 0; }
  return h.toString(36);
}

function handleSignup(e) {
  e.preventDefault();
  const first = document.getElementById('signupFirst').value.trim();
  const last = document.getElementById('signupLast').value.trim();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const pw = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  if (!first || !last) return showAuthError('signupError', 'Please enter your full name.');
  if (pw.length < 6) return showAuthError('signupError', 'Password must be at least 6 characters.');
  if (pw !== confirm) return showAuthError('signupError', 'Passwords don\'t match — please try again.');
  const users = JSON.parse(localStorage.getItem('wl_users') || '{}');
  if (users[email]) return showAuthError('signupError', 'An account with this email already exists.');
  users[email] = { first, last, email, pw: simpleHash(pw), joined: new Date().toISOString() };
  localStorage.setItem('wl_users', JSON.stringify(users));
  const user = { first, last, email, joined: users[email].joined };
  loginUser(user, false);
  showToast(`Welcome to Wanderlust, ${first}! 🌍`);
  closeModalDirect('authModal');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pw = document.getElementById('loginPassword').value;
  const remember = document.getElementById('rememberMe').checked;
  const users = JSON.parse(localStorage.getItem('wl_users') || '{}');
  const user = users[email];
  if (!user) return showAuthError('loginError', 'No account found with this email.');
  if (user.pw !== simpleHash(pw)) return showAuthError('loginError', 'Incorrect password. Please try again.');
  const userData = { first: user.first, last: user.last, email: user.email, joined: user.joined };
  loginUser(userData, remember);
  showToast(`Welcome back, ${user.first}! ✈️`);
  closeModalDirect('authModal');
}

function loginUser(user, remember) {
  sessionStorage.setItem('wl_session', JSON.stringify(user));
  if (remember) localStorage.setItem('wl_session', JSON.stringify(user));
  applyLoggedInState(user);
}

function applyLoggedInState(user) {
  const initials = (user.first[0] + user.last[0]).toUpperCase();
  const displayName = user.first;
  document.getElementById('authGuest').style.display = 'none';
  document.getElementById('authUser').style.display = 'flex';
  document.getElementById('userInitials').textContent = initials;
  document.getElementById('userDisplayName').textContent = displayName;
  document.getElementById('userDropdownInitials').textContent = initials;
  document.getElementById('userDropdownName').textContent = `${user.first} ${user.last}`;
  document.getElementById('userDropdownEmail').textContent = user.email;
}

function logoutUser() {
  sessionStorage.removeItem('wl_session');
  localStorage.removeItem('wl_session');
  document.getElementById('authGuest').style.display = 'flex';
  document.getElementById('authUser').style.display = 'none';
  closeUserMenu();
  closeModalDirect('profileModal');
  showToast('Logged out. Safe travels! ✈️');
}

function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('open');
}
function closeUserMenu() {
  const dd = document.getElementById('userDropdown');
  if (dd) dd.classList.remove('open');
}

function openProfileModal() {
  const session = JSON.parse(sessionStorage.getItem('wl_session') || localStorage.getItem('wl_session') || 'null');
  if (!session) return;
  const initials = (session.first[0] + session.last[0]).toUpperCase();
  const joined = session.joined ? new Date(session.joined).toLocaleDateString('en-IN', { year:'numeric', month:'long' }) : 'Recently';
  document.getElementById('profileBody').innerHTML = `
    <div class="profile-card">
      <div class="profile-avatar-large">${initials}</div>
      <div class="profile-name">${session.first} ${session.last}</div>
      <div class="profile-email">${session.email}</div>
      <div class="profile-joined">✈ Member since ${joined}</div>
    </div>
    <div class="profile-stats">
      <div class="profile-stat">
        <div class="profile-stat-num">${bookmarks.length}</div>
        <div class="profile-stat-label">Saved Places</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-num">${Object.values(JSON.parse(localStorage.getItem('wanderlust_checklist') || '{}')).filter(Boolean).length}</div>
        <div class="profile-stat-label">Items Packed</div>
      </div>
    </div>
    <button class="profile-logout-btn" onclick="logoutUser()">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Log Out
    </button>`;
  openModal('profileModal');
}

function showForgotPassword() {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const users = JSON.parse(localStorage.getItem('wl_users') || '{}');
  if (!email) { showAuthError('loginError', 'Enter your email first, then click Forgot Password.'); return; }
  if (!users[email]) { showAuthError('loginError', 'No account found with this email.'); return; }
  showToast(`Password reset link sent to ${email} (demo only)`);
}

function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else { input.type = 'password'; btn.textContent = '👁'; }
}

function checkPasswordStrength(pw) {
  const wrap = document.getElementById('pwStrengthWrap');
  const fill = document.getElementById('pwStrengthFill');
  const label = document.getElementById('pwStrengthLabel');
  if (!pw) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'flex';
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { w:'20%', bg:'#e74c3c', txt:'Weak', color:'#e74c3c' },
    { w:'40%', bg:'#e67e22', txt:'Fair', color:'#e67e22' },
    { w:'60%', bg:'#f39c12', txt:'Good', color:'#f39c12' },
    { w:'80%', bg:'#27ae60', txt:'Strong', color:'#27ae60' },
    { w:'100%', bg:'#1a6b47', txt:'Very Strong', color:'#1a6b47' }
  ];
  const lvl = levels[Math.max(0, Math.min(score - 1, 4))];
  fill.style.width = lvl.w;
  fill.style.background = lvl.bg;
  label.textContent = lvl.txt;
  label.style.color = lvl.color;
}

/* ═══════════════════════════════
   SCAM ALERTS DATA
═══════════════════════════════ */
const scamData = {
  bali: {
    name: 'Bali, Indonesia', safetyScore: 72, scoreClass: 'mid',
    scams: ['Fake "closed temple" scam — a local says the temple is closed and offers an alternative where his friend sells overpriced crafts','Taxi overcharging — meters are often ignored; always negotiate fare upfront or use Grab','Money exchange scams — unofficial money changers give bad rates or short-change you','Art school/gallery scam — young men invite you to a "student exhibition" then pressure you to buy expensive pieces','Petrol shortage scam — drivers claim petrol is hard to find and take you to inflated stations'],
    avoid: ['Dark alleys in Kuta late at night','Unlicensed motorbike taxis','Unofficial money exchange booths'],
    emergency: [['Police','110'],['Ambulance','118'],['Tourist Police','+62 361-754-599'],['Fire','113']]
  },
  paris: {
    name: 'Paris, France', safetyScore: 78, scoreClass: 'mid',
    scams: ['"Friendship bracelet" scam near Sacré-Cœur — person ties bracelet on your wrist then demands payment','Petition scam — clipboard people ask you to sign petitions and pickpocket you','Three-card monte on bridges','Fake ring scam — stranger "finds" gold ring and asks you to buy it','Waiters adding extra items to your bill at tourist-heavy cafes'],
    avoid: ['Pickpockets on RER B from CDG airport','Châtelet–Les Halles area late at night','Suspiciously cheap "art gallery" tours'],
    emergency: [['Police','17'],['Ambulance / SAMU','15'],['Fire','18'],['Emergency (EU)','112']]
  },
  goa: {
    name: 'Goa, India', safetyScore: 80, scoreClass: 'mid',
    scams: ['Auto/taxi overcharging — always fix the price before boarding','Fake spice tours — you\'re taken to overpriced shops after a "free" tour','Beach vendors using emotional pressure to force sales','Counterfeit alcohol at shady beach shacks','Scooter rental damage scams — pre-existing damage blamed on you'],
    avoid: ['Isolated beaches after dark','Unlicensed liquor shops','Suspicious offers from strangers on buses'],
    emergency: [['Police','100'],['Ambulance','108'],['Tourist Helpline','1363'],['Fire','101']]
  },
  bangkok: {
    name: 'Bangkok, Thailand', safetyScore: 74, scoreClass: 'mid',
    scams: ['Tuk-tuk gem scam — driver offers low-price city tour, ends at gem store','Closed Grand Palace scam — friendly local says it\'s closed (it\'s not) and takes you to a travel agency','Jet ski damage scam in beach areas','Bar girl/ping-pong show scam — inflated bills or dangerous situations','Taxi meters — many refuse to use them; insist on the meter or use Grab'],
    avoid: ['Accepting unsolicited offers from friendly strangers near tourist sites','Late nights in Patpong without a trusted group','Unlicensed tour operators'],
    emergency: [['Police','191'],['Ambulance','1669'],['Tourist Police','1155'],['Fire','199']]
  },
  tokyo: {
    name: 'Tokyo, Japan', safetyScore: 96, scoreClass: 'high',
    scams: ['Hostess bars charging thousands without clear menu pricing','Fake designer goods in Akihabara side streets','Overpriced food tours with substandard experiences','Taxi drivers taking unnecessarily long routes with tourists'],
    avoid: ['Kabukicho hostess bars without clear pricing','Unlicensed tour guides near Shibuya'],
    emergency: [['Police','110'],['Ambulance / Fire','119'],['Tourist Hotline','03-3503-4311'],['English Helpline','#7119']]
  },
  istanbul: {
    name: 'Istanbul, Turkey', safetyScore: 73, scoreClass: 'mid',
    scams: ['"Shoe shine drop" scam — cleaner drops his brush, you help, then gets charged for a shine','Carpet shop invitations from friendly strangers in tourist areas','Taxi currency confusion — driver claims he got small bills when you paid large ones','Counterfeit goods sold as authentic at Grand Bazaar','Tea invitation leading to pressure sales'],
    avoid: ['Unlicensed taxi drivers near Sultanahmet','Accepting unsolicited tea from strangers near tourist sites'],
    emergency: [['Police','155'],['Ambulance','112'],['Tourist Police','+90 212-527-4503'],['Fire','110']]
  },
  barcelona: {
    name: 'Barcelona, Spain', safetyScore: 70, scoreClass: 'mid',
    scams: ['Pickpockets on La Rambla and at Barceloneta beach — among the worst in Europe','Mustard/ketchup distraction — someone squirts something on you and an accomplice steals your bag while you\'re distracted','Fake policemen asking to see your wallet','Three-card monte on La Rambla','Restaurant upselling — olives and bread left on table are charged'],
    avoid: ['El Raval after midnight','Keeping valuables in back pockets anywhere near Las Ramblas','ATMs inside bars or restaurants'],
    emergency: [['Police (National)','091'],['Police (Local)','092'],['Ambulance','061'],['Emergency','112']]
  },
  jaipur: {
    name: 'Jaipur, India', safetyScore: 76, scoreClass: 'mid',
    scams: ['Rickshaw/auto drivers taking tourists to their family shops instead of requested destination','Gem and jewelry scam — offered "investment-grade" stones you can resell at home (you can\'t)','Fake "government approved" handicraft shops','Camel/elephant ride operators adding unannounced extra charges','Fake student artists asking you to buy their work to help them graduate'],
    avoid: ['Deserted areas near Amber Fort at night','Random strangers offering to take you to "authentic" markets'],
    emergency: [['Police','100'],['Ambulance','108'],['Tourist Police','+91 141-511-0598'],['Fire','101']]
  }
};

function loadScamData(dest) {
  const el = document.getElementById('scamResult');
  if (!dest) { el.innerHTML = ''; return; }
  const d = scamData[dest];
  if (!d) return;
  el.innerHTML = `
    <div class="scam-safety-header">
      <div>
        <div class="scam-dest-name">${d.name}</div>
        <p style="font-size:0.82rem;color:rgba(255,255,255,0.6);margin-top:4px">Review before you travel</p>
      </div>
      <div class="scam-score-wrap">
        <div class="scam-score-circle ${d.scoreClass}">${d.safetyScore}</div>
        <div class="scam-score-label">Safety Score</div>
      </div>
    </div>
    <div class="scam-result-wrap">
      <div class="scam-card">
        <h4>⚠️ Common Scams</h4>
        <ul class="scam-list">${d.scams.map(s=>`<li>${s}</li>`).join('')}</ul>
      </div>
      <div class="scam-card">
        <h4>🚫 Areas to Avoid</h4>
        <ul class="scam-list scam-avoid-list" style="margin-bottom:20px">${d.avoid.map(a=>`<li>${a}</li>`).join('')}</ul>
        <h4>📞 Emergency Numbers</h4>
        <div class="emergency-nums">${d.emergency.map(([s,n])=>`<div class="emg-num-row"><span>${s}</span><strong>${n}</strong></div>`).join('')}</div>
      </div>
    </div>`;
  observeReveal();
}

/* ═══════════════════════════════
   CURRENCY CONVERTER
═══════════════════════════════ */
/* fxRates removed — use unified currencyRates above */
const currencySymbolMap = { INR:'₹', USD:'$', EUR:'€', GBP:'£', AED:'د.إ', JPY:'¥', THB:'฿', SGD:'S$' };

function convertCurrency() {
  const amount = parseFloat(document.getElementById('currencyAmount').value) || 0;
  const from = document.getElementById('currencyFrom').value;
  const to = document.getElementById('currencyTo').value;
  const el = document.getElementById('currencyResultDisplay');
  if (!amount) { el.innerHTML='<p class="currency-placeholder-msg">Enter an amount above to see the conversion</p>'; return; }
  const inINR = amount * currencyRates[from];
  const result = inINR / currencyRates[to];
  const rate = currencyRates[from] / currencyRates[to];
  const sym = currencySymbolMap;
  el.innerHTML = `
    <div class="currency-big-rate">${sym[from]}${amount.toLocaleString()} = ${sym[to]}${result.toLocaleString('en-IN',{maximumFractionDigits:2})}</div>
    <div class="currency-rate-sub">1 ${from} = ${sym[to]}${rate.toFixed(4)} ${to}</div>
    <div class="currency-rate-note">Static indicative rates · Verify with your bank before travelling</div>`;
  renderDailySpending(to);
}

function swapCurrencies() {
  const f = document.getElementById('currencyFrom');
  const t = document.getElementById('currencyTo');
  [f.value, t.value] = [t.value, f.value];
  convertCurrency();
}

function renderDailySpending(toCurrency) {
  const sym = currencySymbolMap[toCurrency] || '₹';
  const rate = currencyRates['INR'] / currencyRates[toCurrency];
  const fmt = n => sym + (n * rate).toFixed(toCurrency === 'JPY' ? 0 : 2);
  const spots = [
    { dest:'Goa', budget:2500 }, { dest:'Manali', budget:2000 }, { dest:'Bali', budget:3500 },
    { dest:'Bangkok', budget:4000 }, { dest:'Paris', budget:8500 }, { dest:'Tokyo', budget:7000 }
  ];
  document.getElementById('dailySpendingGrid').innerHTML = spots.map(s=>`
    <div class="daily-card">
      <div class="daily-card-dest">📍 ${s.dest}</div>
      <div class="daily-card-amt">${fmt(s.budget)}</div>
      <div class="daily-card-style">per day · mid-range</div>
    </div>`).join('');
}


/* ═══════════════════════════════
   CONNECTIVITY GUIDE
═══════════════════════════════ */
const connectivityData = {
  indonesia: {
    country:'Indonesia (Bali)', flag:'🇮🇩',
    sims:[{name:'Telkomsel SimPATI',note:'Best coverage across Bali & tourist areas'},{ name:'XL Axiata',note:'Good 4G in urban areas, budget-friendly'},{ name:'Indosat Ooredoo',note:'Good for Lombok and outer islands'}],
    esims:[{name:'Airalo',note:'From ₹500 for 1GB/7 days'},{name:'Holafly',note:'Unlimited data plans available'},{name:'eSIM Plus',note:'Multi-country plans'}],
    speed:'15–50 Mbps (4G LTE)',
    wifi:'Good in tourist areas: cafes, hotels, co-working spaces in Canggu & Seminyak',
    tip:'Buy a SIM at Ngurah Rai Airport arrival hall — prices are regulated. Bring your passport.'
  },
  thailand: {
    country:'Thailand', flag:'🇹🇭',
    sims:[{name:'AIS SIM2Fly',note:'Best tourist SIM, 8-day unlimited from ฿299'},{name:'DTAC Tourist SIM',note:'Good coverage, easy top-up'},{name:'True Move H',note:'Best in Bangkok, solid 4G'}],
    esims:[{name:'Airalo',note:'Thailand plans from ₹400'},{name:'Klook eSIM',note:'Pre-purchase before departure'},{name:'Nomad',note:'Regional ASEAN plans available'}],
    speed:'20–80 Mbps (4G/5G in cities)',
    wifi:'Excellent — 7-Eleven, cafes, malls, and most restaurants have free WiFi',
    tip:'AIS counters are at Suvarnabhumi airport before immigration. Buy the 15-day tourist SIM.'
  },
  india: {
    country:'India', flag:'🇮🇳',
    sims:[{name:'Jio Tourist SIM',note:'₹699 for 28 days, 2GB/day + calls'},{name:'Airtel',note:'Best network in mountains; premium rates'},{name:'BSNL',note:'Works in remote areas where others fail'}],
    esims:[{name:'Airtel eSIM',note:'Available for compatible phones'},{name:'Jio eSIM',note:'Activate at airport kiosks'},{name:'Airalo India',note:'Data-only for foreign visitors'}],
    speed:'10–40 Mbps (4G); 5G in major cities',
    wifi:'Available in cafes, hotels, malls; patchy in mountain regions',
    tip:'Jio SIM requires passport + photo. Buy at airports or Jio stores. In Ladakh, BSNL is the only network that works reliably.'
  },
  japan: {
    country:'Japan', flag:'🇯🇵',
    sims:[{name:'IIJmio Tourist eSIM',note:'Best value for short trips'},{name:'Softbank Tourist SIM',note:'Available at airports, no registration needed'},{name:'Docomo SIM',note:'Widest coverage including rural areas'}],
    esims:[{name:'IIJmio eSIM',note:'Purchase online before arriving'},{name:'Airalo Japan',note:'Plans from ₹800/15 days'},{name:'eConnect Japan',note:'Unlimited plans available'}],
    speed:'50–150 Mbps (4G/5G)',
    wifi:'Pocket WiFi rental is very popular — rent at airport from ₹500/day',
    tip:'Japan is extremely well-connected. Buy a data SIM at Narita/Haneda on arrival. Pocket WiFi rental at airports is excellent for groups.'
  },
  france: {
    country:'France', flag:'🇫🇷',
    sims:[{name:'Orange Holiday SIM',note:'Best tourist option, €20 for 10GB + calls'},{name:'Free Mobile',note:'Budget option, good coverage'},{name:'Bouygues Telecom',note:'Solid 4G/5G coverage'}],
    esims:[{name:'Airalo EU',note:'Works across 30+ European countries'},{name:'Holafly Europe',note:'Unlimited data, higher cost'},{name:'Nomad',note:'Europe-wide coverage'}],
    speed:'40–150 Mbps (4G/5G in cities)',
    wifi:'Free WiFi in most cafes, hotels, and public spaces; Paris has city-wide free WiFi zones',
    tip:'Orange Holiday SIM is sold at CDG Airport and Orange stores. EU eSIMs work across all of Europe — ideal if visiting multiple countries.'
  },
  spain: {
    country:'Spain', flag:'🇪🇸',
    sims:[{name:'Movistar Tourist SIM',note:'Best nationwide coverage'},{name:'Vodafone Spain',note:'Strong 4G, good for cities'},{name:'Orange Spain',note:'Good value tourist packs'}],
    esims:[{name:'Airalo EU',note:'Works across Europe'},{name:'Holafly',note:'Unlimited data plans'},{name:'eSIM.net',note:'Budget European plans'}],
    speed:'30–120 Mbps (4G/5G in cities)',
    wifi:'Widely available in cafes and restaurants; Barcelona and Madrid have city WiFi',
    tip:'SIMs available at any phone shop (locutorio) or El Corte Inglés. An EU eSIM is your best bet for multi-country travel.'
  },
  turkey: {
    country:'Turkey', flag:'🇹🇷',
    sims:[{name:'Turkcell 3-Day',note:'Best coverage, sold at airports'},{name:'Vodafone Turkey',note:'Good urban coverage'},{name:'Turk Telekom',note:'Budget option'}],
    esims:[{name:'Airalo Turkey',note:'Plans from ₹600/7 days'},{name:'Holafly',note:'Unlimited data available'},{name:'Nomad',note:'Regional plans'}],
    speed:'20–60 Mbps (4G)',
    wifi:'Good in Istanbul hotels and cafes; free WiFi at Grand Bazaar and major tourist sites',
    tip:'Buy Turkcell at Istanbul airport — it has the best coverage across the country. VPN required for some social media platforms.'
  },
  newzealand: {
    country:'New Zealand', flag:'🇳🇿',
    sims:[{name:'Spark Prepaid',note:'Best nationwide coverage including rural'},{name:'Vodafone NZ',note:'Strong 4G in cities'},{name:'2degrees',note:'Budget SIM, good for cities'}],
    esims:[{name:'Airalo NZ',note:'Data plans from ₹900/30 days'},{name:'Spark eSIM',note:'Available for compatible phones'},{name:'Nomad NZ',note:'Flexible plans'}],
    speed:'30–100 Mbps (4G/5G in cities)',
    wifi:'Excellent in cities; limited in Fiordland and remote Queenstown areas',
    tip:'Mobile coverage is limited in Fiordland and Milford Sound. Download offline maps before visiting remote areas. Spark has the best rural coverage.'
  },
  georgia: {
    country:'Georgia', flag:'🇬🇪',
    sims:[{name:'Magti',note:'Best coverage across Georgia'},{name:'Geocell',note:'Good 4G, budget rates'},{name:'Beeline Georgia',note:'Cheap data packages'}],
    esims:[{name:'Airalo Georgia',note:'Affordable plans from ₹350'},{name:'Holafly',note:'Available for Georgia'},{name:'eSIM Plus',note:'Regional Caucasus plans'}],
    speed:'10–40 Mbps (4G)',
    wifi:'Excellent in Tbilisi; most cafes and restaurants have free fast WiFi',
    tip:'Georgia has surprisingly affordable and fast internet. Buy a Magti SIM at Tbilisi Airport for under ₹400 — includes 10GB+ data.'
  }
};

function loadConnectivity(country) {
  const el = document.getElementById('connectResult');
  if (!country) { el.innerHTML=''; return; }
  const d = connectivityData[country];
  if (!d) return;
  el.innerHTML = `
    <div class="connect-grid">
      <div class="connect-card">
        <h4>📱 Best SIM Cards</h4>
        ${d.sims.map(s=>`<div class="connect-item"><span class="connect-item-icon">SIM</span><div><div style="font-weight:600;color:var(--navy)">${s.name}</div><div style="font-size:0.78rem;color:var(--text-lt)">${s.note}</div></div></div>`).join('')}
      </div>
      <div class="connect-card">
        <h4>📡 eSIM Providers</h4>
        ${d.esims.map(e=>`<div class="connect-item"><span class="connect-item-icon">eSIM</span><div><div style="font-weight:600;color:var(--navy)">${e.name}</div><div style="font-size:0.78rem;color:var(--text-lt)">${e.note}</div></div></div>`).join('')}
      </div>
      <div class="connect-card">
        <h4>🌐 Internet Speeds & WiFi</h4>
        <div class="connect-item"><span class="connect-item-icon">⚡</span><div><div style="font-weight:600;color:var(--navy)">Avg Speed</div><div style="font-size:0.82rem;color:var(--text-md)">${d.speed}</div></div></div>
        <div class="connect-item"><span class="connect-item-icon">📶</span><div><div style="font-weight:600;color:var(--navy)">Public WiFi</div><div style="font-size:0.82rem;color:var(--text-md)">${d.wifi}</div></div></div>
        <div style="margin-top:14px;background:var(--gold-pale);border-radius:var(--radius-m);padding:12px;font-size:0.82rem;color:var(--text-md);line-height:1.6">💡 <strong>Pro Tip:</strong> ${d.tip}</div>
      </div>
    </div>`;
}

/* ═══════════════════════════════
   LOCAL TRANSPORT
═══════════════════════════════ */
const transportData = {
  bali: { city:'Bali', options:[
    { icon:'🛵', name:'Scooter Rental', avail:'yes', detail:'Most popular way to get around. ₹200–400/day from most warungs.', cost:'₹200–400/day' },
    { icon:'🚗', name:'Grab / Gojek', avail:'yes', detail:'Ride-hailing apps work well in Kuta, Seminyak, Ubud. Significantly cheaper than taxis.', cost:'₹50–400/trip' },
    { icon:'🚕', name:'Blue Bird Taxi', avail:'yes', detail:'Most reliable metered taxi. Avoid unmarked taxis.', cost:'₹120/km' },
    { icon:'🚗', name:'Private Driver', avail:'yes', detail:'Full-day private drivers are incredibly affordable and recommended for longer routes.', cost:'₹1,200–1,800/day' },
    { icon:'✈️', name:'Airport Transfer', avail:'yes', detail:'Official airport taxis have fixed zones. Grab is 50% cheaper but must be met outside airport grounds.', cost:'₹300–800 to Seminyak' }
  ]},
  bangkok: { city:'Bangkok', options:[
    { icon:'🚇', name:'BTS Skytrain', avail:'yes', detail:'Clean, fast, and covers most tourist areas. Buy a Rabbit Card for convenience.', cost:'฿16–59/trip (≈₹50–200)' },
    { icon:'🚇', name:'MRT Subway', avail:'yes', detail:'Connects Chatuchak, Sukhumvit, and Silom areas.', cost:'฿17–42/trip' },
    { icon:'📱', name:'Grab', avail:'yes', detail:'Best for door-to-door. More reliable than taxis in Bangkok traffic.', cost:'฿60–200/trip' },
    { icon:'🚢', name:'Chao Phraya Boat', avail:'yes', detail:'Scenic way to reach riverside temples. Very cheap and avoids traffic.', cost:'฿15–40/trip' },
    { icon:'🛺', name:'Tuk-Tuk', avail:'limited', detail:'Touristy and overpriced. Only use if you\'ve agreed a firm price. Avoid from strangers near temples.', cost:'฿60–200/trip (negotiate)' }
  ]},
  tokyo: { city:'Tokyo', options:[
    { icon:'🚇', name:'Tokyo Metro', avail:'yes', detail:'Most efficient way to get around. Buy a Suica card at any station for tap-and-go travel.', cost:'¥170–320/trip' },
    { icon:'🚄', name:'JR Trains', avail:'yes', detail:'JR Pass covers Shinkansen and JR lines. Essential for day trips.', cost:'Covered by JR Pass' },
    { icon:'📱', name:'Uber / GO', avail:'yes', detail:'Available but expensive vs. trains. Useful for luggage or late nights.', cost:'¥1,000–4,000/trip' },
    { icon:'🚌', name:'City Bus', avail:'yes', detail:'Flat ¥210 in most city areas. Slower than metro but scenic.', cost:'¥210/trip' },
    { icon:'🚲', name:'Bicycle Rental', avail:'yes', detail:'Docomo Bike Share is excellent for exploring neighborhoods. App-based rental.', cost:'¥165/30 min' }
  ]},
  paris: { city:'Paris', options:[
    { icon:'🚇', name:'Paris Métro', avail:'yes', detail:'14 lines covering entire city. Buy a Navigo Pass for unlimited travel.', cost:'€1.90/trip or €30/week pass' },
    { icon:'🚌', name:'City Bus / RER', avail:'yes', detail:'RER B connects CDG airport to city center in 35 minutes.', cost:'€11.80 CDG→city' },
    { icon:'📱', name:'Uber', avail:'yes', detail:'Available and works well. Similar to Bolt (also available).', cost:'€8–25/trip' },
    { icon:'🛴', name:'Vélib\' Scooter', avail:'yes', detail:'City bike share system — great for exploring along the Seine.', cost:'€1 unlock + €0.10/min' },
    { icon:'🚕', name:'Taxi', avail:'yes', detail:'Fixed rates from airports. Must use official taxi ranks.', cost:'€50–70 from CDG' }
  ]},
  barcelona: { city:'Barcelona', options:[
    { icon:'🚇', name:'Barcelona Metro', avail:'yes', detail:'10 lines, T-Casual 10-trip card is best value for tourists.', cost:'€2.40/trip or €11.35 T-Casual' },
    { icon:'🚌', name:'City Bus', avail:'yes', detail:'Extensive network; same tickets as Metro.', cost:'€2.40/trip' },
    { icon:'📱', name:'Uber / Cabify', avail:'yes', detail:'Both work well. Cabify is popular locally.', cost:'€8–20/trip' },
    { icon:'🚲', name:'Bicing / Donkey Bikes', avail:'yes', detail:'City bike share. Donkey Republic is more tourist-friendly.', cost:'€2/trip + time' },
    { icon:'✈️', name:'Airport Transfer', avail:'yes', detail:'Aerobus direct from T1/T2 to Plaça de Catalunya every 5 minutes.', cost:'€6.75 Aerobus' }
  ]},
  istanbul: { city:'Istanbul', options:[
    { icon:'🚇', name:'Metro / Tram', avail:'yes', detail:'Tram T1 connects Grand Bazaar, Galata Bridge, and Sultanahmet. Buy an Istanbulkart.', cost:'₺10/trip (≈₹35)' },
    { icon:'🚢', name:'Bosphorus Ferry', avail:'yes', detail:'Iconic way to cross between European and Asian sides. Also great for sightseeing.', cost:'₺15/trip' },
    { icon:'📱', name:'BiTaksi / Uber', avail:'yes', detail:'BiTaksi is the local app. Uber also works. Better than flagging taxis.', cost:'₺80–200/trip' },
    { icon:'🚌', name:'İETT Bus', avail:'yes', detail:'Istanbulkart required. Covers areas not served by metro.', cost:'₺10/trip' },
    { icon:'🚠', name:'Teleferik / Cable Car', avail:'yes', detail:'Short cable car connecting Eyüp to Pierre Loti Hill. Worth it for the view.', cost:'₺10/trip' }
  ]},
  goa: { city:'Goa', options:[
    { icon:'🛵', name:'Scooter Rental', avail:'yes', detail:'Best way to explore Goa. Available at most beaches for ₹300–500/day.', cost:'₹300–500/day' },
    { icon:'🛺', name:'Auto-rickshaw', avail:'yes', detail:'Fixed rates for short hops within towns. Negotiate before boarding.', cost:'₹50–200/trip' },
    { icon:'📱', name:'Goa Miles / Rapido', avail:'yes', detail:'Goa Miles is the official app. Rapido for bike taxis in North Goa.', cost:'₹80–300/trip' },
    { icon:'🚌', name:'KTC Bus', avail:'yes', detail:'Cheap government buses connecting all major towns. Slow but scenic.', cost:'₹15–60/trip' },
    { icon:'✈️', name:'Airport Transfer', avail:'yes', detail:'Pre-paid taxis at Goa Airport. Goa Miles is 30% cheaper if you can walk outside.', cost:'₹400–800' }
  ]},
  mumbai: { city:'Mumbai', options:[
    { icon:'🚇', name:'Mumbai Local Train', avail:'yes', detail:'Lifeline of the city. Buy a day pass or single journey ticket. Women\'s compartments are safe.', cost:'₹5–30/trip' },
    { icon:'🚇', name:'Mumbai Metro', avail:'yes', detail:'Newer metro lines are AC and modern. Lines 1, 2A, 7 operational.', cost:'₹10–60/trip' },
    { icon:'📱', name:'Ola / Uber', avail:'yes', detail:'Both work well. Ola is often cheaper. Surge pricing during peak hours.', cost:'₹80–400/trip' },
    { icon:'🚌', name:'BEST Bus', avail:'yes', detail:'Extensive network, very cheap. AC buses available on major routes.', cost:'₹6–30/trip' },
    { icon:'✈️', name:'Airport Transfer', avail:'yes', detail:'Ola/Uber from T2 (Domestic) or T1 (International). Metro line T5 under construction.', cost:'₹300–600 to South Mumbai' }
  ]}
};

function loadTransport(city) {
  const el = document.getElementById('transportResult');
  if (!city) { el.innerHTML=''; return; }
  const d = transportData[city];
  if (!d) return;
  el.innerHTML = `<div class="transport-grid">${d.options.map(o=>`
    <div class="transport-card">
      <div class="transport-card-icon">${o.icon}</div>
      <div class="transport-card-name">${o.name}</div>
      <div class="transport-avail ${o.avail}">${o.avail==='yes'?'✓ Available':o.avail==='limited'?'⚠ Limited':'✗ Not Available'}</div>
      <div class="transport-detail">${o.detail}</div>
      <div class="transport-cost">💰 ${o.cost}</div>
    </div>`).join('')}</div>`;
}

/* ═══════════════════════════════
   CULTURAL ETIQUETTE
═══════════════════════════════ */
const etiquetteData = [
  { country:'Japan', flag:'🇯🇵', rules:[
    { type:'do', text:'Remove shoes before entering homes and many traditional restaurants' },
    { type:'do', text:'Bow slightly when greeting someone — deeper bow shows more respect' },
    { type:'do', text:'Use both hands when giving or receiving business cards or gifts' },
    { type:'dont', text:'Don\'t talk loudly on trains or public transport — considered very rude' },
    { type:'dont', text:'Don\'t tip — tipping is considered insulting in Japan' },
    { type:'dont', text:'Don\'t eat or drink while walking on the street' }
  ]},
  { country:'Thailand', flag:'🇹🇭', rules:[
    { type:'do', text:'Wai (press palms together) to greet — especially to monks and elders' },
    { type:'do', text:'Dress modestly when visiting temples (shoulders and knees covered)' },
    { type:'do', text:'Remove shoes before entering temples and some businesses' },
    { type:'dont', text:'Never disrespect the Thai Royal Family — it\'s a criminal offense' },
    { type:'dont', text:'Don\'t touch someone\'s head — considered the most sacred part of the body' },
    { type:'dont', text:'Don\'t point your feet at people, monks, or Buddha images' }
  ]},
  { country:'India', flag:'🇮🇳', rules:[
    { type:'do', text:'Remove footwear before entering temples, mosques, and many homes' },
    { type:'do', text:'Use your right hand for eating, giving, and receiving (left is considered unclean)' },
    { type:'do', text:'Dress conservatively in rural areas and religious sites' },
    { type:'dont', text:'Don\'t photograph people without permission, especially tribal communities' },
    { type:'dont', text:'Avoid public displays of affection in conservative areas' },
    { type:'dont', text:'Don\'t waste food — it\'s considered disrespectful' }
  ]},
  { country:'France', flag:'🇫🇷', rules:[
    { type:'do', text:'Greet with "Bonjour" before any interaction — skipping it is considered rude' },
    { type:'do', text:'Bisous (cheek kisses) are normal between friends — left cheek first' },
    { type:'do', text:'Dress smartly — the French value personal presentation' },
    { type:'dont', text:'Don\'t expect fast service — meals are meant to be enjoyed slowly' },
    { type:'dont', text:'Avoid asking personal questions about money or salary' },
    { type:'dont', text:'Don\'t skip the greeting ritual — it\'s essential to French social etiquette' }
  ]},
  { country:'Indonesia', flag:'🇮🇩', rules:[
    { type:'do', text:'Cover shoulders and knees when entering temples — sarongs are provided at entrances' },
    { type:'do', text:'Use your right hand for eating and giving/receiving items' },
    { type:'do', text:'Say "permisi" (excuse me) when passing in front of someone' },
    { type:'dont', text:'Don\'t touch someone\'s head — very disrespectful' },
    { type:'dont', text:'Don\'t point with one finger — use your thumb or gesture with an open hand' },
    { type:'dont', text:'Avoid raising your voice or showing anger publicly' }
  ]},
  { country:'Turkey', flag:'🇹🇷', rules:[
    { type:'do', text:'Remove shoes when entering mosques and many homes' },
    { type:'do', text:'Dress modestly when visiting mosques (women must cover their hair)' },
    { type:'do', text:'Accept tea when offered — refusing can be seen as impolite' },
    { type:'dont', text:'Don\'t photograph military installations or guards' },
    { type:'dont', text:'Avoid discussing the Kurdistan issue or Armenian history casually' },
    { type:'dont', text:'Don\'t eat, drink, or smoke in public during Ramadan in conservative areas' }
  ]}
];

function renderEtiquette() {
  document.getElementById('etiquetteGrid').innerHTML = etiquetteData.map(e=>`
    <div class="etiquette-card reveal">
      <div class="etiquette-card-header">
        <div class="etiquette-flag">${e.flag}</div>
        <div class="etiquette-country">${e.country}</div>
      </div>
      <div class="etiquette-rules">
        ${e.rules.map(r=>`<div class="etiquette-rule ${r.type}"><div class="etiquette-rule-icon">${r.type==='do'?'✅':'❌'}</div><span>${r.text}</span></div>`).join('')}
      </div>
    </div>`).join('');
  observeReveal();
}

/* ═══════════════════════════════
   PLACES MOST TOURISTS MISS
═══════════════════════════════ */
const missSpots = [
  { name:'Divar Island', loc:'Old Goa', cat:'beach', icon:'🌿', desc:'A quiet river island in the Mandovi with Portuguese-era villages, zero tourist crowds, and pure countryside charm. Rent a cycle from the ferry landing.' },
  { name:'Café Lota', loc:'Delhi, India', cat:'cafe', icon:'☕', desc:'Hidden inside the National Crafts Museum campus — serves incredible Indian regional food in a garden setting that most tourists completely miss.' },
  { name:'Karimunjawa Islands', loc:'Central Java, Indonesia', cat:'beach', icon:'🏝️', desc:'Indonesia\'s least-visited island group with pristine reefs, no concrete hotels, and a relaxed fishing community feel.' },
  { name:'Rila Monastery', loc:'Bulgaria', cat:'photo', icon:'📸', desc:'A UNESCO site that gets a fraction of Santorini\'s visitors but has equally stunning frescoes, mountain scenery, and a deeply spiritual atmosphere.' },
  { name:'Rishikesh Beatles Ashram', loc:'Uttarakhand, India', cat:'photo', icon:'🎸', desc:'The abandoned ashram where The Beatles wrote their White Album. Covered in extraordinary street art and eerily beautiful ruins in the jungle.' },
  { name:'Sepilok, Sabah', loc:'Malaysian Borneo', cat:'photo', icon:'🦧', desc:'Watch wild orangutans at a rehabilitation center — one of the most moving wildlife experiences on Earth, with very few tourists.' },
  { name:'Mawlynnong Village', loc:'Meghalaya, India', cat:'market', icon:'🌱', desc:'Asia\'s cleanest village with living root bridges, bamboo walkways, and sky walks overlooking Bangladesh.' },
  { name:'Rue Mouffetard Market', loc:'Paris, France', cat:'market', icon:'🛒', desc:'A centuries-old street market in the Latin Quarter that Parisians actually use. Fresh produce, cheese, and pastries without the tourist mark-up.' },
  { name:'Chefchaouen Blue Labyrinth', loc:'Morocco', cat:'photo', icon:'💙', desc:'The famous blue city has secret alleyways away from the main square that almost no tourists find — head uphill from the medina.' },
  { name:'Sunset at Gunung Batur', loc:'Bali', cat:'sunset', icon:'🌅', desc:'Skip the overcrowded Kuta beach sunset. Climb Batur at 4am for a sunrise above the clouds — far more dramatic and rarely crowded.' },
  { name:'Lantern Street', loc:'Hoi An, Vietnam', cat:'sunset', icon:'🏮', desc:'Walk away from the main tourist strip into the residential lanes after 6pm — lanterns glow over quiet family-run restaurants at half the price.' },
  { name:'Dhanushkodi Ghost Town', loc:'Tamil Nadu, India', cat:'photo', icon:'🏚️', desc:'A hauntingly beautiful abandoned town at India\'s southernmost tip, destroyed by a 1964 cyclone. Surreal and photogenic.' },
  { name:'Chota Char Dham', loc:'Uttarakhand, India', cat:'sunset', icon:'⛰️', desc:'Four high-altitude temples that rival Kedarnath in spirituality but attract a fraction of the crowds. Best in September.' },
  { name:'Tbilisi Sulfur Bath District', loc:'Georgia', cat:'cafe', icon:'♨️', desc:'The Abanotubani district has centuries-old sulfur bathhouses where locals relax — private baths from just ₹400/hour.' }
];

let currentMissFilter = 'all';
function renderMissSpots() {
  filterMissSpots('all', document.querySelector('.miss-tab.active'));
}
function filterMissSpots(filter, btn) {
  currentMissFilter = filter;
  document.querySelectorAll('.miss-tab').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const list = filter==='all' ? missSpots : missSpots.filter(s=>s.cat===filter);
  const catLabels = { cafe:'Secret Café', beach:'Hidden Beach', sunset:'Sunset Spot', market:'Local Market', photo:'Photo Spot' };
  document.getElementById('missGrid').innerHTML = list.map(s=>`
    <div class="miss-card reveal">
      <div class="miss-card-top">
        <div class="miss-card-icon">${s.icon}</div>
        <div><div class="miss-card-name">${s.name}</div><div class="miss-card-loc">📍 ${s.loc}</div></div>
      </div>
      <div class="miss-cat-badge">${catLabels[s.cat]||s.cat}</div>
      <div class="miss-card-desc">${s.desc}</div>
    </div>`).join('');
  observeReveal();
}

/* ═══════════════════════════════
   INSTAGRAM SPOTS
═══════════════════════════════ */
const instaSpots = {
  bali:[
    { name:'Tegallalang Rice Terraces', loc:'Ubud', bestTime:'6–8am', crowd:'high', tip:'Go at sunrise to beat the photographers' },
    { name:'Lempuyang "Gate of Heaven"', loc:'Karangasem', bestTime:'7–9am', crowd:'high', tip:'Queue starts at 5am; go on weekdays' },
    { name:'Nungnung Waterfall', loc:'Badung Regency', bestTime:'8–11am', crowd:'low', tip:'20-min hike; misty mornings are magical' },
    { name:'Canggu Sunset Beach', loc:'Canggu', bestTime:'5:30–6:30pm', crowd:'mid', tip:'Low tide gives the best reflections' },
    { name:'Tirta Gangga Water Palace', loc:'Karangasem', bestTime:'7–9am', crowd:'low', tip:'Fewer visitors than Tanah Lot; stunning koi ponds' }
  ],
  paris:[
    { name:'Eiffel Tower Champ de Mars', loc:'7th Arrondissement', bestTime:'Golden hour (varies)', crowd:'high', tip:'Shoot from Trocadéro plaza, not directly under it' },
    { name:'Pont Alexandre III Bridge', loc:'8th Arrondissement', bestTime:'Blue hour dusk', crowd:'mid', tip:'Best with river reflections at dusk' },
    { name:'Montmartre Vineyard', loc:'18th Arrondissement', bestTime:'10am–noon', crowd:'low', tip:'Hidden behind Sacré-Cœur; very few tourists know it' },
    { name:'Canal Saint-Martin', loc:'10th Arrondissement', bestTime:'Early morning', crowd:'low', tip:'Iron footbridges reflect perfectly in still water' }
  ],
  tokyo:[
    { name:'Shibuya Crossing from Above', loc:'Shibuya Sky', bestTime:'Dusk (5–7pm)', crowd:'mid', tip:'Shibuya Sky observation deck gives the best angle' },
    { name:'Shinjuku Gyoen Garden', loc:'Shinjuku', bestTime:'7am or 4pm', crowd:'low', tip:'Cherry blossoms + Mount Fuji view in spring' },
    { name:'Senso-ji Temple at Dawn', loc:'Asakusa', bestTime:'5:30–7am', crowd:'low', tip:'Temple opens at sunrise; streets are empty' },
    { name:'Omoide Yokocho Alley', loc:'Shinjuku West', bestTime:'7–9pm', crowd:'mid', tip:'Smoky lantern-lit alleyway; ultra photogenic at night' }
  ],
  santorini:[
    { name:'Oia Blue Dome Churches', loc:'Oia', bestTime:'7–9am or 1 hour before sunset', crowd:'high', tip:'The famous church is 5 min from the main path — go early or late' },
    { name:'Ammoudi Bay', loc:'Below Oia', bestTime:'10–11am', crowd:'low', tip:'Hidden port below Oia — few tourists know the path down' },
    { name:'Perissa Black Sand Beach', loc:'South Santorini', bestTime:'Morning', crowd:'mid', tip:'Volcanic black sand creates unique contrast shots' },
    { name:'Skaros Rock', loc:'Imerovigli', bestTime:'Sunrise', crowd:'low', tip:'Dramatic sea rock formation — better than Oia for photographers' }
  ],
  rajasthan:[
    { name:'Thar Desert Camel Dunes', loc:'Jaisalmer', bestTime:'Sunset or Sunrise', crowd:'low', tip:'Sam Sand Dunes are touristy; Khuri dunes are quiet and better for photography' },
    { name:'Mehrangarh Fort Blue City View', loc:'Jodhpur', bestTime:'Golden hour', crowd:'mid', tip:'The fort wall facing the city turns golden at sunset — iconic blue-city backdrop' },
    { name:'Chand Baori Stepwell', loc:'Abhaneri, near Jaipur', bestTime:'10am–noon', crowd:'low', tip:'One of India\'s most geometric structures; visited by almost no tourists' },
    { name:'Jal Mahal Water Palace', loc:'Jaipur', bestTime:'Sunrise', crowd:'low', tip:'Best at sunrise when the lake is still — you can\'t enter but reflections are stunning' }
  ],
  ladakh:[
    { name:'Pangong Lake at Sunrise', loc:'Ladakh', bestTime:'5:30–7am', crowd:'low', tip:'Stay at lakeside camps for dawn light; avoid May–June peak' },
    { name:'Nubra Valley Sand Dunes', loc:'Diskit', bestTime:'4–6pm', crowd:'low', tip:'Double-hump Bactrian camels against snow peaks — frame from low angle' },
    { name:'Thiksey Monastery Dawn', loc:'Thiksey', bestTime:'6–8am', crowd:'low', tip:'Monastery wakes at 5am; monks perform prayers — very photogenic' },
    { name:'Magnetic Hill Road', loc:'Leh-Kargil Highway', bestTime:'Morning', crowd:'low', tip:'Long exposure on the "gravity-defying" road creates surreal abstract images' }
  ]
};

function loadInstaSpots(city) {
  const el = document.getElementById('instaGrid');
  if (!city) { el.innerHTML=''; return; }
  const spots = instaSpots[city];
  if (!spots) return;
  const crowdLabels = { low:'🟢 Low Crowd', mid:'🟡 Moderate', high:'🔴 Very Crowded' };
  el.innerHTML = spots.map(s=>`
    <div class="insta-card reveal">
      <div class="insta-card-name">📍 ${s.name}</div>
      <div class="insta-card-loc">${s.loc}</div>
      <div class="insta-row"><span class="insta-row-label">Best time</span><span class="insta-row-val">${s.bestTime}</span></div>
      <div class="insta-crowd ${s.crowd}">${crowdLabels[s.crowd]}</div>
      <div class="insta-tip">💡 ${s.tip}</div>
    </div>`).join('');
  observeReveal();
}

/* ═══════════════════════════════
   TRAVEL COST REALITY CHECKER
═══════════════════════════════ */
const realityCosts = {
  goa:    { budget:1200, mid:2800, luxury:7000, name:'Goa, India', currency:'₹' },
  manali: { budget:900,  mid:2000, luxury:5500, name:'Manali, India', currency:'₹' },
  bali:   { budget:2200, mid:4500, luxury:12000, name:'Bali, Indonesia', currency:'₹' },
  thailand:{ budget:2000, mid:4200, luxury:10000, name:'Thailand', currency:'₹' },
  europe: { budget:6500, mid:10000, luxury:22000, name:'Europe (avg)', currency:'₹' },
  maldives:{ budget:12000, mid:22000, luxury:60000, name:'Maldives', currency:'₹' },
  paris:  { budget:7000, mid:12000, luxury:28000, name:'Paris, France', currency:'₹' }
};

const realityCompromises = {
  budget:['Dorms or basic guesthouses (₹300–800/night)','Street food and local dhabas/warungs only','Public transport and shared taxis','Free/cheap sightseeing only','No shopping or souvenirs'],
  mid:['Budget hotels or Airbnb (₹1,000–2,500/night)','Mix of local restaurants and mid-range cafes','Occasional ride-hailing + public transport','Paid activities like scuba or cooking classes','Limited shopping budget'],
  luxury:['Boutique hotels or resorts (₹3,000+/night)','Fine dining + curated experiences','Private taxis and tuk-tuks','Premium experiences: spa, private tours','Comfortable souvenir and shopping budget']
};

function checkRealityCost() {
  const dest = document.getElementById('realityDest').value;
  const budget = parseFloat(document.getElementById('realityBudget').value) || 0;
  const days = parseInt(document.getElementById('realityDays').value) || 0;
  const style = document.getElementById('realityStyle').value;
  if (!budget || !days) { showToast('Please enter your budget and number of days'); return; }
  const d = realityCosts[dest];
  const dailyCost = d[style];
  const totalNeeded = dailyCost * days;
  const ratio = budget / totalNeeded;
  let verdict, verdictClass, verdictIcon;
  if (ratio >= 1.15) { verdict='Yes, you can do it!'; verdictClass='yes'; verdictIcon='✅'; }
  else if (ratio >= 0.85) { verdict='Tight — but possible!'; verdictClass='tight'; verdictIcon='⚠️'; }
  else { verdict='Budget too low'; verdictClass='no'; verdictIcon='❌'; }
  const el = document.getElementById('realityResult');
  el.style.display='block';
  el.innerHTML = `
    <div class="reality-verdict ${verdictClass}">
      <div class="reality-verdict-icon">${verdictIcon}</div>
      <div class="reality-verdict-title">${verdict}</div>
      <div class="reality-verdict-sub">For a ${days}-day ${style} trip to ${d.name}, you need approximately ₹${totalNeeded.toLocaleString('en-IN')}. Your budget: ₹${budget.toLocaleString('en-IN')}.</div>
    </div>
    <div class="reality-breakdown">
      <div class="reality-bk-row"><span>Estimated daily cost</span><strong>₹${dailyCost.toLocaleString('en-IN')}</strong></div>
      <div class="reality-bk-row"><span>Total for ${days} days</span><strong>₹${totalNeeded.toLocaleString('en-IN')}</strong></div>
      <div class="reality-bk-row"><span>Your budget</span><strong>₹${budget.toLocaleString('en-IN')}</strong></div>
      <div class="reality-bk-row"><span>Surplus / Deficit</span><strong style="color:${ratio>=1?'var(--tropical)':'var(--coral)'}">${ratio>=1?'+':'-'}₹${Math.abs(budget-totalNeeded).toLocaleString('en-IN')}</strong></div>
    </div>
    <div class="reality-compromise">
      <strong>What your budget covers (${style} style):</strong><br>
      ${realityCompromises[style].map(c=>`✓ ${c}`).join('<br>')}
    </div>`;
  el.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

/* ═══════════════════════════════
   SUNRISE / SUNSET TRACKER
═══════════════════════════════ */
const sunData = {
  bali:     { city:'Bali, Indonesia', note:'Times for June (Dry Season)', sunrise:'6:04 AM', sunset:'6:12 PM', goldenMorn:'6:04–6:45 AM', goldenEve:'5:30–6:12 PM', blueMorn:'5:35–6:04 AM', blueEve:'6:12–6:40 PM', tip:'Best sunrise at Mount Batur (requires 4am start). Best sunset from Uluwatu Temple or Tanah Lot.' },
  santorini:{ city:'Santorini, Greece', note:'Times for July (Peak Season)', sunrise:'6:20 AM', sunset:'8:45 PM', goldenMorn:'6:20–7:00 AM', goldenEve:'8:00–8:45 PM', blueMorn:'5:55–6:20 AM', blueEve:'8:45–9:15 PM', tip:'The famous Oia sunset is best from the castle ruins. Arrive 90 minutes early for a spot in summer.' },
  rajasthan:{ city:'Rajasthan, India', note:'Times for October (Best Season)', sunrise:'6:15 AM', sunset:'6:05 PM', goldenMorn:'6:15–7:00 AM', goldenEve:'5:20–6:05 PM', blueMorn:'5:50–6:15 AM', blueEve:'6:05–6:30 PM', tip:'Jaisalmer fort at golden hour is spectacular. Sam Sand Dunes sunrise is worth the 5am drive.' },
  ladakh:   { city:'Ladakh, India', note:'Times for August (Best Month)', sunrise:'5:40 AM', sunset:'7:20 PM', goldenMorn:'5:40–6:20 AM', goldenEve:'6:40–7:20 PM', blueMorn:'5:15–5:40 AM', blueEve:'7:20–7:50 PM', tip:'Pangong Lake at sunrise is other-worldly. The light changes incredibly fast at 14,000ft altitude.' },
  paris:    { city:'Paris, France', note:'Times for September', sunrise:'7:20 AM', sunset:'7:45 PM', goldenMorn:'7:20–8:05 AM', goldenEve:'7:00–7:45 PM', blueMorn:'6:55–7:20 AM', blueEve:'7:45–8:15 PM', tip:'Trocadéro plaza at blue hour gives the best Eiffel Tower shots. Montmartre at sunrise has almost no tourists.' },
  tokyo:    { city:'Tokyo, Japan', note:'Times for April (Cherry Blossom)', sunrise:'5:30 AM', sunset:'6:20 PM', goldenMorn:'5:30–6:10 AM', goldenEve:'5:40–6:20 PM', blueMorn:'5:05–5:30 AM', blueEve:'6:20–6:50 PM', tip:'Shinjuku Gyoen at sunrise during cherry blossom season — arrive before 6am to have the park to yourself.' },
  goa:      { city:'Goa, India', note:'Times for December (Peak Season)', sunrise:'6:45 AM', sunset:'6:05 PM', goldenMorn:'6:45–7:25 AM', goldenEve:'5:25–6:05 PM', blueMorn:'6:20–6:45 AM', blueEve:'6:05–6:35 PM', tip:'Vagator Beach sunset is stunning but crowded. Try Anjuna cliffs for a quieter golden hour spot.' },
  queenstown:{ city:'Queenstown, New Zealand', note:'Times for January (Summer)', sunrise:'5:55 AM', sunset:'9:25 PM', goldenMorn:'5:55–6:40 AM', goldenEve:'8:40–9:25 PM', blueMorn:'5:30–5:55 AM', blueEve:'9:25–9:55 PM', tip:'Cecil Peak Lookout at sunset is dramatic. Lake Wakatipu reflects The Remarkables range at golden hour.' }
};

function loadSunTimes(city) {
  const el = document.getElementById('sunResult');
  if (!city) { el.innerHTML=''; return; }
  const d = sunData[city];
  if (!d) return;
  el.innerHTML = `
    <div class="sun-city-header">
      <div class="sun-city-name">${d.city}</div>
      <div class="sun-city-note">${d.note}</div>
    </div>
    <div class="sun-result-grid">
      <div class="sun-card"><div class="sun-card-icon">🌅</div><div class="sun-card-label">Sunrise</div><div class="sun-card-time">${d.sunrise}</div></div>
      <div class="sun-card"><div class="sun-card-icon">🌇</div><div class="sun-card-label">Sunset</div><div class="sun-card-time">${d.sunset}</div></div>
      <div class="sun-card golden"><div class="sun-card-icon">✨</div><div class="sun-card-label">Golden Hour (Morning)</div><div class="sun-card-time" style="font-size:1.2rem">${d.goldenMorn}</div><div class="sun-card-detail">Warm, soft directional light</div></div>
      <div class="sun-card golden"><div class="sun-card-icon">🌟</div><div class="sun-card-label">Golden Hour (Evening)</div><div class="sun-card-time" style="font-size:1.2rem">${d.goldenEve}</div><div class="sun-card-detail">Best for landscape photography</div></div>
      <div class="sun-card blue-hr"><div class="sun-card-icon">🌙</div><div class="sun-card-label">Blue Hour (Morning)</div><div class="sun-card-time" style="font-size:1.2rem">${d.blueMorn}</div><div class="sun-card-detail">Cool, even light before sunrise</div></div>
      <div class="sun-card blue-hr"><div class="sun-card-icon">💫</div><div class="sun-card-label">Blue Hour (Evening)</div><div class="sun-card-time" style="font-size:1.2rem">${d.blueEve}</div><div class="sun-card-detail">City lights + sky balance</div></div>
    </div>
    <div class="sun-tip">💡 <strong>Photographer's tip:</strong> ${d.tip}</div>`;
}

/* ═══════════════════════════════
   FESTIVALS
═══════════════════════════════ */
const festivalsData = {
  1:[
    { name:'Jaipur Literature Festival', loc:'Jaipur, India', dates:'Jan 23–27', desc:'The world\'s largest free literary festival with authors from 50+ countries.', type:'Culture' },
    { name:'Ice & Snow Festival', loc:'Harbin, China', dates:'Jan 5 – Feb 25', desc:'Breathtaking sculptures carved from ice blocks taken from the frozen Songhua River.', type:'Winter' },
    { name:'Thaipusam', loc:'Penang & Kuala Lumpur', dates:'Late Jan', desc:'Hindu festival with extraordinary body piercing kavadis carried through streets.', type:'Religious' },
    { name:'Carnival of Venice', loc:'Venice, Italy', dates:'Late Jan–Feb', desc:'Elaborate masquerade balls and ornate costumes on gondolas through the canals.', type:'Cultural' }
  ],
  2:[
    { name:'Rio Carnival', loc:'Rio de Janeiro, Brazil', dates:'Feb (varies)', desc:'The world\'s biggest carnival — 2 million people dance through the streets each day.', type:'Festival' },
    { name:'Losar (Tibetan New Year)', loc:'Ladakh, India', dates:'Feb (varies)', desc:'Colorful masked dances, butter sculptures, and monastery celebrations.', type:'Religious' },
    { name:'Mardi Gras', loc:'New Orleans, USA', dates:'Feb/Mar', desc:'Jazz, beads, and parades across the French Quarter.', type:'Festival' },
    { name:'Holi (some regions)', loc:'Mathura, India', dates:'Late Feb/Mar', desc:'Festival of colors — the most exuberant celebration on Earth.', type:'Religious' }
  ],
  3:[
    { name:'Holi', loc:'Mathura & Vrindavan, India', dates:'Mar 5–6 (2026)', desc:'The ultimate festival of colors — powder fights, bhang, and celebrations in the birthplace of Krishna.', type:'Religious' },
    { name:'Cherry Blossom Season', loc:'Tokyo, Japan', dates:'Late Mar–Apr', desc:'Japan\'s most beloved tradition — hanami picnics under clouds of pink sakura.', type:'Nature' },
    { name:'St. Patrick\'s Day', loc:'Dublin, Ireland', dates:'Mar 17', desc:'The biggest party in Ireland — parades, live music, and oceans of Guinness.', type:'Cultural' },
    { name:'Nowruz (Persian New Year)', loc:'Tehran, Iran / Central Asia', dates:'Mar 20', desc:'The Persian new year celebrated with huge feasts, fire jumping, and family gatherings.', type:'Cultural' }
  ],
  4:[
    { name:'Songkran Water Festival', loc:'Chiang Mai, Thailand', dates:'Apr 13–15', desc:'Thai New Year — the world\'s biggest water fight. The whole country drenches each other.', type:'Festival' },
    { name:'Bali Spirit Festival', loc:'Ubud, Bali', dates:'Apr (varies)', desc:'World music, yoga, and dance from 70+ countries in the heart of the rice terraces.', type:'Wellness' },
    { name:'Seville Spring Fair', loc:'Seville, Spain', dates:'Late Apr', desc:'Flamenco, bullfights, horses, and tapas in Andalusia\'s most joyful week.', type:'Cultural' },
    { name:'Tulip Season', loc:'Amsterdam, Netherlands', dates:'Mid-Mar–May', desc:'Keukenhof Gardens explode in color with 7 million tulips.', type:'Nature' }
  ],
  5:[
    { name:'Buddha Purnima', loc:'Bodh Gaya, India', dates:'May 12 (2025)', desc:'The holiest Buddhist festival marking the birth, enlightenment, and death of the Buddha.', type:'Religious' },
    { name:'Monaco Grand Prix', loc:'Monaco', dates:'Late May', desc:'The most glamorous race on the Formula 1 calendar — streets turned into a circuit.', type:'Sports' },
    { name:'Cannes Film Festival', loc:'Cannes, France', dates:'Mid May', desc:'The world\'s most prestigious film festival with red carpets and screenings.', type:'Arts' },
    { name:'Chelsea Flower Show', loc:'London, UK', dates:'Late May', desc:'The most celebrated garden show in the world.', type:'Nature' }
  ],
  6:[
    { name:'Eid al-Adha', loc:'Worldwide (varies)', dates:'Jun 6–7 (2025)', desc:'The Feast of Sacrifice — celebrated with family gatherings, prayers, and sharing food with the poor.', type:'Religious' },
    { name:'Glastonbury Festival', loc:'Somerset, UK', dates:'Late Jun', desc:'The world\'s most iconic music festival — Pyramid Stage performances that make history.', type:'Music' },
    { name:'Midnight Sun Festival', loc:'Tromsø, Norway', dates:'Jun–Jul', desc:'24-hour daylight in the Arctic — fish markets, live music, and midnight hiking.', type:'Nature' },
    { name:'Bali Arts Festival', loc:'Denpasar, Bali', dates:'Jun–Jul', desc:'Month-long celebration of Balinese dance, gamelan music, and traditional crafts.', type:'Cultural' }
  ],
  7:[
    { name:'Running of the Bulls', loc:'Pamplona, Spain', dates:'Jul 6–14', desc:'San Fermín festival — eight adrenaline-fueled mornings of bulls charging through streets.', type:'Cultural' },
    { name:'Fuji Rock Festival', loc:'Naeba, Japan', dates:'Late Jul', desc:'Japan\'s biggest outdoor music festival set on a ski resort in the mountains.', type:'Music' },
    { name:'Hemis Monastery Festival', loc:'Ladakh, India', dates:'Jul (varies)', desc:'Two-day masked Cham dance festival at Ladakh\'s largest monastery.', type:'Religious' },
    { name:'Edinburgh Festival Fringe', loc:'Edinburgh, UK', dates:'Aug (starts late Jul)', desc:'The world\'s largest arts festival — comedy, theatre, music for 25 days.', type:'Arts' }
  ],
  8:[
    { name:'Edinburgh Fringe Festival', loc:'Edinburgh, Scotland', dates:'Aug 1–25', desc:'The world\'s largest arts festival — 3,500 shows, 300 venues, pure creative chaos.', type:'Arts' },
    { name:'Onam', loc:'Kerala, India', dates:'Aug/Sep (varies)', desc:'Kerala\'s harvest festival — snake boat races, flower carpets (pookalam), and traditional sadya feasts.', type:'Cultural' },
    { name:'La Tomatina', loc:'Buñol, Spain', dates:'Last Wed Aug', desc:'The world\'s biggest food fight — 20,000 people hurl 150,000 tomatoes at each other.', type:'Festival' },
    { name:'Notting Hill Carnival', loc:'London, UK', dates:'Late Aug', desc:'Europe\'s largest street carnival — Caribbean music, jerk chicken, and two million revelers.', type:'Cultural' }
  ],
  9:[
    { name:'Oktoberfest', loc:'Munich, Germany', dates:'Late Sep–Oct', desc:'The world\'s largest folk festival — 7 million litres of beer consumed over 18 days.', type:'Festival' },
    { name:'Navratri', loc:'Gujarat, India', dates:'Sep/Oct (varies)', desc:'Nine nights of Garba dancing — Gujarat transforms into an ocean of color and music.', type:'Religious' },
    { name:'Mid-Autumn Festival', loc:'China / Southeast Asia', dates:'Sep 17 (2024)', desc:'Lanterns, mooncakes, and family reunions under the full moon.', type:'Cultural' },
    { name:'Rosh Hashanah', loc:'Jerusalem, Israel', dates:'Sep/Oct', desc:'Jewish New Year — synagogues, prayer, honey cake, and shofar calls across Jerusalem.', type:'Religious' }
  ],
  10:[
    { name:'Diwali', loc:'India, worldwide', dates:'Oct 20 (2025)', desc:'Festival of Lights — fireworks, diyas, sweets, and the triumphant return of Ram to Ayodhya.', type:'Religious' },
    { name:'Durga Puja', loc:'Kolkata, India', dates:'Oct (5 days)', desc:'Kolkata\'s grandest festival — extraordinary pandals, artistic displays, and city-wide celebrations.', type:'Religious' },
    { name:'Día de los Muertos', loc:'Oaxaca, Mexico', dates:'Oct 31–Nov 2', desc:'Mexico\'s beautiful celebration of ancestors with flower altars, face paint, and midnight cemetery vigils.', type:'Cultural' },
    { name:'Halloween', loc:'Dublin, Ireland', dates:'Oct 31', desc:'The birthplace of Halloween — world-class costumes and pub culture across Temple Bar.', type:'Cultural' }
  ],
  11:[
    { name:'Pushkar Camel Fair', loc:'Pushkar, India', dates:'Nov 1–9 (2025)', desc:'The world\'s largest camel fair — 50,000 camels, folk music, and an extraordinary desert atmosphere.', type:'Cultural' },
    { name:'Loy Krathong', loc:'Chiang Mai, Thailand', dates:'Nov (full moon)', desc:'Thousands of glowing paper lanterns released into the night sky over the city moat.', type:'Festival' },
    { name:'Diwali Season', loc:'Varanasi, India', dates:'Nov', desc:'Varanasi on Diwali night — candles floating on the Ganga with chants and fire pujas.', type:'Religious' },
    { name:'Melbourne Cup', loc:'Melbourne, Australia', dates:'First Tue Nov', desc:'Australia\'s most famous horse race — the entire nation stops for 3 minutes.', type:'Sports' }
  ],
  12:[
    { name:'Christmas Markets', loc:'Vienna / Prague / Bruges', dates:'Dec 1–24', desc:'Fairy-tale Christmas markets with mulled wine, handcrafted gifts, and snow-dusted cobblestones.', type:'Cultural' },
    { name:'New Year\'s Eve in Sydney', loc:'Sydney, Australia', dates:'Dec 31', desc:'The world\'s first major NYE fireworks display over the Harbor Bridge.', type:'Festival' },
    { name:'New Year\'s Eve in Goa', loc:'Goa, India', dates:'Dec 31', desc:'India\'s biggest New Year celebration — beach parties, fireworks, and all-night festivities.', type:'Festival' },
    { name:'Winter Solstice at Stonehenge', loc:'Wiltshire, UK', dates:'Dec 21', desc:'Thousands gather at Stonehenge at dawn to mark the shortest day.', type:'Cultural' }
  ]
};

let currentFestivalMonth = new Date().getMonth() + 1;
function renderFestivals() {
  const tabs = document.getElementById('festivalMonthTabs');
  tabs.innerHTML = monthNames.map((m,i)=>`<button class="festival-month-btn ${i+1===currentFestivalMonth?'active':''}" onclick="showFestivals(${i+1}, this)">${m.slice(0,3)}</button>`).join('');
  showFestivals(currentFestivalMonth, tabs.querySelector('.active'));
}
function showFestivals(month, btn) {
  currentFestivalMonth = month;
  document.querySelectorAll('.festival-month-btn').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const list = festivalsData[month] || [];
  document.getElementById('festivalsGrid').innerHTML = list.map(f=>`
    <div class="festival-card reveal">
      <div class="festival-name">${f.name}</div>
      <div class="festival-location">📍 ${f.loc}</div>
      <div class="festival-desc">${f.desc}</div>
      <div class="festival-meta">
        <span class="festival-dates">📅 ${f.dates}</span>
        <span class="festival-type-badge">${f.type}</span>
      </div>
    </div>`).join('');
  observeReveal();
}

/* ═══════════════════════════════
   FOOD BUDGET PREDICTOR
═══════════════════════════════ */
const foodBudgetData = {
  india:{
    street:{ daily:250, items:[{ e:'🥘', n:'Thali (full meal)', p:'₹80–120', d:'Rice, 3 sabzis, dal, chapati, papad' },{ e:'🥪', n:'Chai + Samosa', p:'₹20–30', d:'Morning snack at local chai stall' },{ e:'🥗', n:'Chole Bhature', p:'₹60–80', d:'Filling Punjab street classic' },{ e:'🍦', n:'Kulfi / Lassi', p:'₹30–60', d:'Afternoon cool-down' }]},
    mid:{ daily:700, items:[{ e:'🍳', n:'Hotel Breakfast', p:'₹150–200', d:'Idli, dosa, or paratha set' },{ e:'🍛', n:'Restaurant Lunch', p:'₹200–350', d:'AC restaurant thali' },{ e:'🍽️', n:'Dinner with drinks', p:'₹300–500', d:'Multi-cuisine restaurant' },{ e:'☕', n:'Cafe & snacks', p:'₹100–150', d:'Specialty coffee + cake' }]},
    luxury:{ daily:2500, items:[{ e:'🍾', n:'Rooftop Brunch', p:'₹800–1200', d:'Five-star weekend brunch spread' },{ e:'🦞', n:'Seafood Dinner', p:'₹1,500+', d:'Fresh catch at premium beach shack' },{ e:'🍸', n:'Bar + cocktails', p:'₹500–800', d:'Craft cocktails at a rooftop bar' },{ e:'🍰', n:'High-end cafe', p:'₹400–600', d:'Artisan desserts + specialty coffee' }]}
  },
  bali:{
    street:{ daily:400, items:[{ e:'🍜', n:'Nasi Goreng', p:'₹80–120', d:'Fried rice with egg, the Bali staple' },{ e:'🥙', n:'Mie Goreng', p:'₹80–100', d:'Fried noodles from a warung' },{ e:'🥥', n:'Young Coconut', p:'₹50–80', d:'Fresh coconut from a beach vendor' },{ e:'🍢', n:'Satay Sticks', p:'₹60–100', d:'Grilled meat on skewers' }]},
    mid:{ daily:1200, items:[{ e:'🍳', n:'Cafe Breakfast', p:'₹250–350', d:'Avocado toast + Bali coffee at Canggu cafe' },{ e:'🥗', n:'Warung Lunch', p:'₹200–300', d:'Local Balinese rice dish' },{ e:'🍸', n:'Sunset drinks', p:'₹300–500', d:'Cocktails at a beach club' },{ e:'🍽️', n:'Restaurant dinner', p:'₹400–700', d:'Mid-range Seminyak restaurant' }]},
    luxury:{ daily:4500, items:[{ e:'🥂', n:'Beach Club Day', p:'₹1,500–3,000', d:'Potato Head or Ku De Ta with minimum spend' },{ e:'🦞', n:'Fine Dining', p:'₹2,000+', d:'Locavore or Merah Putih, Ubud\'s best' },{ e:'🍾', n:'Private Villa Dinner', p:'₹3,000+', d:'Private chef in a villa setting' },{ e:'🍹', n:'Seminyak cocktail bar', p:'₹500–800', d:'Motel Mexicola or La Favela' }]}
  },
  thailand:{
    street:{ daily:350, items:[{ e:'🍜', n:'Pad Thai from stall', p:'₹80–120', d:'The classic — noodles with egg, bean sprouts, lime' },{ e:'🥘', n:'Green Curry + rice', p:'₹100–140', d:'From a local shop, not tourist restaurant' },{ e:'🥭', n:'Mango Sticky Rice', p:'₹60–80', d:'Street dessert at any market' },{ e:'🥤', n:'Thai Iced Tea', p:'₹30–50', d:'Creamy, sweet, and orange-colored' }]},
    mid:{ daily:950, items:[{ e:'🍳', n:'Hotel / guesthouse breakfast', p:'₹150–200', d:'Fruit, toast, eggs, fresh juice' },{ e:'🍛', n:'Restaurant lunch', p:'₹250–350', d:'Air-conditioned local Thai restaurant' },{ e:'🍽️', n:'Night market dinner', p:'₹300–500', d:'Multiple dishes at Chiang Mai Night Bazaar' },{ e:'🍺', n:'Beer + snacks', p:'₹200–300', d:'Chang beer + som tam at a local bar' }]},
    luxury:{ daily:3500, items:[{ e:'🥂', n:'Rooftop bar dinner', p:'₹1,500+', d:'Above Eleven or Vertigo, Bangkok' },{ e:'🦐', n:'River cruise dinner', p:'₹2,000+', d:'Chao Phraya dinner cruise' },{ e:'🍸', n:'Sky Bar cocktails', p:'₹800–1,200', d:'Lebua State Tower (Hangover bar)' },{ e:'🍰', n:'High tea', p:'₹700–1,000', d:'Mandarin Oriental Bangkok' }]}
  },
  japan:{
    street:{ daily:1000, items:[{ e:'🍣', n:'Conveyor-belt sushi', p:'₹200–350', d:'Kura Sushi or Sushiro — budget sushi chains' },{ e:'🍜', n:'Ramen shop', p:'₹180–250', d:'A bowl of tonkotsu ramen' },{ e:'🍱', n:'Convenience store bento', p:'₹120–180', d:'7-Eleven or Lawson quality is surprisingly high' },{ e:'🥟', n:'Gyoza set', p:'₹150–200', d:'Dumpling restaurant chain' }]},
    mid:{ daily:2800, items:[{ e:'🍱', n:'Set lunch', p:'₹500–700', d:'Izakaya lunch sets are excellent value' },{ e:'🍛', n:'Tempura restaurant', p:'₹700–1000', d:'Sit-down tempura with rice' },{ e:'🍺', n:'Izakaya evening', p:'₹1,000–1,500', d:'Multiple small dishes + sake' },{ e:'☕', n:'Specialty coffee + cake', p:'₹300–400', d:'Tokyo has world-class cafes' }]},
    luxury:{ daily:8000, items:[{ e:'🥩', n:'Wagyu Omakase', p:'₹4,000–8,000', d:'Top-grade Wagyu tasting menu' },{ e:'🍣', n:'Tsukiji sushi counter', p:'₹2,000–3,000', d:'Premium sushi at the market counter' },{ e:'🍾', n:'Tokyo Skybar', p:'₹1,500–2,000', d:'New York Bar, Park Hyatt, Lost in Translation' },{ e:'🍵', n:'Tea ceremony + kaiseki', p:'₹2,000–3,000', d:'Traditional multi-course Japanese meal' }]}
  },
  europe:{
    street:{ daily:2500, items:[{ e:'🥖', n:'Boulangerie + cafe', p:'₹400–600', d:'Croissant, coffee, and juice at a Parisian bakery' },{ e:'🌭', n:'Street food lunch', p:'₹600–900', d:'Kebab, crêpe, or falafel from a street stand' },{ e:'🍕', n:'Slice of pizza', p:'₹300–500', d:'Roman-style pizza al taglio' },{ e:'🍦', n:'Gelato', p:'₹200–300', d:'2 scoops from a gelateria' }]},
    mid:{ daily:5500, items:[{ e:'🍳', n:'Cafe breakfast', p:'₹700–1000', d:'Full breakfast in a local cafe' },{ e:'🥗', n:'Restaurant lunch', p:'₹1,200–1,800', d:'Prix fixe lunch menu (best value in Europe)' },{ e:'🍷', n:'Wine + dinner', p:'₹2,000–3,000', d:'Mid-range restaurant with house wine' },{ e:'☕', n:'Coffee breaks', p:'₹300–500', d:'Espresso or café au lait at a terrace cafe' }]},
    luxury:{ daily:15000, items:[{ e:'🥂', n:'Michelin restaurant', p:'₹8,000–15,000', d:'One Michelin star tasting menu' },{ e:'🍾', n:'Wine tasting experience', p:'₹3,000–5,000', d:'Burgundy or Champagne tasting' },{ e:'🦞', n:'Seafood platter', p:'₹4,000–6,000', d:'Mediterranean seafood restaurant' },{ e:'🍫', n:'Luxury cafe + patisserie', p:'₹1,000–1,500', d:'Ladurée or Pierre Hermé, Paris' }]}
  },
  maldives:{
    street:{ daily:1800, items:[{ e:'🐟', n:'Mas Huni', p:'₹300–400', d:'Tuna, coconut, onion — the Maldivian breakfast' },{ e:'🍚', n:'Local "short eats"', p:'₹150–250', d:'Fried riha, bajiya, and keemia at a local cafe' },{ e:'🥥', n:'King Coconut', p:'₹100–150', d:'Fresh coconut from any shop' },{ e:'🍜', n:'Garudhiya fish soup', p:'₹300–400', d:'Traditional Maldivian fish broth with rice' }]},
    mid:{ daily:5000, items:[{ e:'🍳', n:'Resort breakfast', p:'₹1,000–1,500', d:'Buffet at a guesthouse resort' },{ e:'🐠', n:'Fresh catch lunch', p:'₹1,500–2,500', d:'Grilled catch of the day at a resort restaurant' },{ e:'🍸', n:'Sunset cocktails', p:'₹800–1,200', d:'Cocktails at an overwater bar' },{ e:'🍽️', n:'Dinner', p:'₹2,000–3,000', d:'Resort restaurant set menu' }]},
    luxury:{ daily:25000, items:[{ e:'🦞', n:'Overwater dining', p:'₹8,000–15,000', d:'Underwater restaurant like Ithaa at Conrad' },{ e:'🍾', n:'Champagne on a sandbank', p:'₹5,000–10,000', d:'Private sandbank dining setup' },{ e:'🐠', n:'Chef\'s Table experience', p:'₹8,000+', d:'Resort chef\'s tasting menu with wine pairing' },{ e:'🥂', n:'Sunset cruise drinks', p:'₹3,000–5,000', d:'Champagne on a private catamaran' }]}
  }
};

let currentFoodStyle = 'street';
function loadFoodBudget(style, btn) {
  currentFoodStyle = style;
  document.querySelectorAll('.food-tab').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  refreshFoodBudget();
}
function refreshFoodBudget() {
  const dest = document.getElementById('foodDest').value;
  const data = foodBudgetData[dest]?.[currentFoodStyle];
  if (!data) return;
  const grid = document.getElementById('foodResultsGrid');
  grid.innerHTML = data.items.map(i=>`
    <div class="food-item-card">
      <div class="food-item-emoji">${i.e}</div>
      <div class="food-item-name">${i.n}</div>
      <div class="food-item-price">${i.p}</div>
      <div class="food-item-desc">${i.d}</div>
    </div>`).join('') + `
    <div class="food-daily-total" style="grid-column:1/-1">
      <div class="food-daily-label">Estimated daily food budget</div>
      <div class="food-daily-amt">₹${data.daily.toLocaleString('en-IN')}/day</div>
    </div>`;
}

/* ═══════════════════════════════
   TRAVEL BUDDY FINDER
═══════════════════════════════ */
const buddyProfiles = [
  { name:'Aarav Mehta', type:'solo', age:26, from:'Mumbai', dest:'Backpacking Southeast Asia', bio:'Software dev traveling SEA for 3 months. Looking for a travel buddy for Vietnam & Cambodia legs.', avatar:'#1a5276', initials:'AM' },
  { name:'Priya Sharma', type:'nomad', age:29, from:'Bangalore', dest:'Bali & Tbilisi', bio:'UX designer working remotely. Moving between co-working hubs. Always down for sunrise hikes.', avatar:'#1a6b47', initials:'PS' },
  { name:'David Chen', type:'backpacker', age:24, from:'Singapore', dest:'India (Rajasthan → Ladakh)', bio:'Recent grad on a gap year. Budget traveler, loves camping and off-the-beaten-path spots.', avatar:'#7d3c98', initials:'DC' },
  { name:'Ananya Iyer', type:'solo', age:31, from:'Chennai', dest:'Japan & South Korea', bio:'Teacher on summer break. Big fan of street food, anime neighborhoods, and photography.', avatar:'#c4955a', initials:'AI' },
  { name:'Marco Rossi', type:'nomad', age:33, from:'Italy', dest:'Goa & Rishikesh', bio:'Freelance photographer based anywhere. Currently looking for a travel buddy for South India.', avatar:'#d4704a', initials:'MR' },
  { name:'Kavya Nair', type:'backpacker', age:22, from:'Kerala', dest:'Spiti Valley & Zanskar', bio:'Student on summer adventure. Strong hiker, done 5 Himalayan treks. Looking for trek partners.', avatar:'#1f6391', initials:'KN' },
  { name:'James Okafor', type:'nomad', age:35, from:'London', dest:'Tbilisi & Istanbul', bio:'Tech writer traveling the Caucasus. Looking for a travel companion who loves food and architecture.', avatar:'#2e86c1', initials:'JO' },
  { name:'Riya Patel', type:'solo', age:28, from:'Ahmedabad', dest:'Sri Lanka solo trip', bio:'First solo trip after years of dreaming. Looking for safety buddy for Southern Sri Lanka circuit.', avatar:'#a04000', initials:'RP' }
];

let currentBuddyFilter = 'all';
function renderBuddies() {
  filterBuddies('all', document.querySelector('.buddy-tab'));
}
function filterBuddies(type, btn) {
  currentBuddyFilter = type;
  document.querySelectorAll('.buddy-tab').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const list = type==='all' ? buddyProfiles : buddyProfiles.filter(b=>b.type===type);
  const typeLabels = { solo:'Solo Traveler', backpacker:'Backpacker', nomad:'Digital Nomad' };
  document.getElementById('buddyGrid').innerHTML = list.map(b=>`
    <div class="buddy-card reveal">
      <div class="buddy-card-top">
        <div class="buddy-avatar" style="background:${b.avatar}">${b.initials}</div>
        <div>
          <div class="buddy-name">${b.name}</div>
          <div class="buddy-type-badge ${b.type}">${typeLabels[b.type]}</div>
        </div>
      </div>
      <div class="buddy-bio">${b.bio}</div>
      <div class="buddy-dest">✈ ${b.dest}</div>
      <div style="font-size:0.78rem;color:var(--text-lt);margin-top:4px">📍 From ${b.from} · Age ${b.age}</div>
      <button class="buddy-connect-btn" onclick="showToast('Connect feature coming soon! 😊')">Connect</button>
    </div>`).join('');
  observeReveal();
}

/* ═══════════════════════════════
   DESTINATION MATCH QUIZ
═══════════════════════════════ */
const quizQuestions = [
  { q:'What\'s your travel budget per person?', options:['Under ₹15,000','₹15,000–40,000','₹40,000–1,00,000','No limit — I want luxury'] },
  { q:'What type of landscape speaks to your soul?', options:['Beach & Ocean 🏖️','Mountains & Snow 🏔️','Cities & Culture 🌆','Countryside & Farms 🌾'] },
  { q:'How do you prefer to travel?', options:['Solo — freedom above all','With a partner (romantic)','With close friends','Family trip with kids'] },
  { q:'What\'s your travel vibe?', options:['Adventure & Thrill 🧗','Relaxation & Wellness 🧘','Culture & History 🏛️','Food & Nightlife 🍜'] }
];

const quizResults = [
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
  { a:[3,0,0,0], dest:'Swiss Alps', why:'The world\'s most breathtaking mountain destination, no compromises.' },
  { a:[3,0,1,1], dest:'Queenstown, NZ', why:'Adventure capital of the world — bungee, skydive, and stunning landscapes.' },
  { a:[1,2,1,2], dest:'Istanbul', why:'East meets West with incredible food, history, and culture at mid-range costs.' },
  { a:[0,2,0,2], dest:'Spiti Valley', why:'One of India\'s last frontiers — raw, spiritual, and unforgettable.' }
];

let quizAnswers = [];
function initQuiz() {
  quizAnswers = [];
  renderQuizStep();
}
function renderQuizStep() {
  const step = quizAnswers.length;
  const el = document.getElementById('quizContent');
  if (step >= quizQuestions.length) {
    showQuizResult();
    return;
  }
  const q = quizQuestions[step];
  el.innerHTML = `
    <div class="quiz-q-num">Question ${step+1} of ${quizQuestions.length}</div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">
      ${q.options.map((o,i)=>`<button class="quiz-option" onclick="quizAnswer(${i})">${o}</button>`).join('')}
    </div>
    <div class="quiz-progress">${quizQuestions.map((_,i)=>`<div class="quiz-dot ${i<step?'done':i===step?'active':''}"></div>`).join('')}</div>`;
}
function quizAnswer(idx) {
  quizAnswers.push(idx);
  renderQuizStep();
}
function showQuizResult() {
  const result = quizResults.reduce((best, r) => {
    const score = r.a.filter((a, i) => a === quizAnswers[i]).length;
    return score > best.score ? { result: r, score } : best;
  }, { result: quizResults[0], score: -1 }).result;
  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-result">
      <div style="font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold-light)">Your Perfect Destination</div>
      <div class="quiz-result-dest">${sanitizeHTML(result.dest)}</div>
      <div class="quiz-result-why">${sanitizeHTML(result.why)}</div>
      <div class="quiz-result-actions">
        <button class="quiz-restart-btn" onclick="initQuiz()">🔄 Try Again</button>
        <a href="#budget" class="quiz-result-cta-btn">💰 Plan Budget</a>
        <a href="#itinerary" class="quiz-result-cta-btn">🗺️ Build Itinerary</a>
      </div>
    </div>`;
}

/* ═══════════════════════════════
   RANDOM DESTINATION GENERATOR
═══════════════════════════════ */
const generatorPool = [
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
  { name:'Lisbon', country:'Portugal', flag:'🇵🇹', budget:'₹70,000', bestMonth:'March–May or September', why:'Europe\'s sunniest capital on cobblestone hills — Fado music, pastéis, and ocean views.' },
  { name:'Manali', country:'India', flag:'🇮🇳', budget:'₹10,000', bestMonth:'April–June or October', why:'Snow peaks, river walks, old cafes, and the feeling that the world is very far away.' }
];

function generateDestination() {
  const d = generatorPool[Math.floor(Math.random()*generatorPool.length)];
  document.getElementById('generatorResult').innerHTML = `
    <div class="gen-card">
      <div class="gen-card-flag">${d.flag}</div>
      <div class="gen-card-name">${d.name}</div>
      <div class="gen-card-country">📍 ${d.country}</div>
      <div class="gen-card-grid">
        <div><div class="gen-stat-label">Budget (est.)</div><div class="gen-stat-val">${d.budget}/person</div></div>
        <div><div class="gen-stat-label">Best Time to Go</div><div class="gen-stat-val">${d.bestMonth}</div></div>
      </div>
      <div class="gen-why">${d.why}</div>
    </div>`;
}

/* ═══════════════════════════════
   CROWD PREDICTOR
═══════════════════════════════ */
const crowdData = {
  goa:      [3,2,2,1,1,1,2,2,1,2,3,3],
  manali:   [1,1,1,1,2,3,3,3,2,1,1,1],
  bali:     [2,2,2,1,1,1,3,3,2,1,2,2],
  paris:    [2,2,2,3,3,3,3,3,2,2,1,2],
  santorini:[1,1,1,1,2,3,3,3,3,2,1,1],
  tokyo:    [2,2,3,3,2,2,2,2,2,3,3,2],
  jaipur:   [2,2,2,1,1,1,1,1,1,2,2,3],
  ladakh:   [1,1,1,1,1,2,3,3,2,1,1,1]
};

function loadCrowdData(dest) {
  const el = document.getElementById('crowdGrid');
  if (!dest) { el.innerHTML=''; return; }
  const data = crowdData[dest];
  if (!data) return;
  const labels = {1:{ cls:'low', emoji:'🟢', label:'Low Crowd'}, 2:{ cls:'mid', emoji:'🟡', label:'Moderate'}, 3:{ cls:'high', emoji:'🔴', label:'Very Crowded'}};
  el.innerHTML = data.map((level,i)=>{
    const l = labels[level];
    return `<div class="crowd-month-card ${l.cls}"><div class="crowd-month-name">${monthNames[i].slice(0,3)}</div><div class="crowd-indicator">${l.emoji}</div><div class="crowd-level-label">${l.label}</div></div>`;
  }).join('') +
  `<div style="grid-column:1/-1;display:flex;gap:20px;justify-content:center;margin-top:12px;font-size:0.82rem;color:var(--text-md)">
    <span>🟢 Low — Best time to go</span><span>🟡 Moderate — Book in advance</span><span>🔴 Peak — Crowded & expensive</span>
  </div>`;
}

/* ═══════════════════════════════
   EMERGENCY TOOLKIT
═══════════════════════════════ */
const emergencyData = {
  india:{ country:'India', flag:'🇮🇳',
    police:{num:'100',detail:'National Emergency Police'},
    ambulance:{num:'108',detail:'Free ambulance service across states'},
    tourist:{num:'1363',detail:'India Tourism Helpline (24/7, multilingual)'},
    embassy:{num:'+91 11-2419-8000',detail:'US Embassy New Delhi | For Indian citizens: contact respective embassy'},
    tip:'Download the "UMANG" app for access to government services. The "112 India" app connects to all emergency services simultaneously.'
  },
  indonesia:{ country:'Indonesia (Bali)', flag:'🇮🇩',
    police:{num:'110',detail:'National Police'},
    ambulance:{num:'118',detail:'Emergency Ambulance'},
    tourist:{num:'+62 361-224-111',detail:'Bali Tourist Police (Denpasar)'},
    embassy:{num:'+62 21-3435-9000',detail:'US Embassy Jakarta | Indian Embassy Jakarta: +62 21-520-4150'},
    tip:'In Bali, the Kuta Beach Rescue Team (021-751-0470) operates its own rescue. Private hospitals (BIMC, SOS) are preferred by tourists.'
  },
  thailand:{ country:'Thailand', flag:'🇹🇭',
    police:{num:'191',detail:'Royal Thai Police'},
    ambulance:{num:'1669',detail:'Emergency Medical Services'},
    tourist:{num:'1155',detail:'Tourist Police (English-speaking, 24/7)'},
    embassy:{num:'+66 2-205-4000',detail:'US Embassy Bangkok | Indian Embassy: +66 2-258-0300'},
    tip:'The Tourist Police (1155) are specifically trained for visitor issues and speak English. Always contact them first for scams, theft, or legal problems.'
  },
  france:{ country:'France', flag:'🇫🇷',
    police:{num:'17',detail:'Police Nationale'},
    ambulance:{num:'15 (SAMU)',detail:'Medical Emergencies'},
    tourist:{num:'3114',detail:'National Crisis & Support Line'},
    embassy:{num:'+33 1-43-12-22-22',detail:'US Embassy Paris | Indian Embassy: +33 1-40-50-70-70'},
    tip:'In France, 112 is the single EU-wide emergency number and works from any phone including without a SIM. The SAMU (15) dispatcher decides which service to send.'
  },
  spain:{ country:'Spain', flag:'🇪🇸',
    police:{num:'091 (national) / 092 (local)',detail:'National vs. Local Police'},
    ambulance:{num:'061 / 112',detail:'061 for medical; 112 for all emergencies'},
    tourist:{num:'+34 902-102-112',detail:'Spanish Tourist Board helpline'},
    embassy:{num:'+34 91-587-2200',detail:'US Embassy Madrid | Indian Embassy: +34 91-309-9891'},
    tip:'Barcelona has Mossos d\'Esquadra (088) as the Catalan police — the most relevant force for tourist areas. Use 112 for any life-threatening emergency.'
  },
  japan:{ country:'Japan', flag:'🇯🇵',
    police:{num:'110',detail:'Police (English operators available)'},
    ambulance:{num:'119',detail:'Fire & Ambulance (same number)'},
    tourist:{num:'#7119 (Tokyo) / 03-3503-4311',detail:'Japan Tourism Agency Helpline'},
    embassy:{num:'+81 3-3224-5000',detail:'US Embassy Tokyo | Indian Embassy: +81 3-3262-2391'},
    tip:'Japan is extremely safe, but natural disasters are a concern. Download the "Safety Tips" app for earthquake/tsunami alerts in English. Hospitals display a blue "H" sign.'
  },
  turkey:{ country:'Turkey', flag:'🇹🇷',
    police:{num:'155',detail:'Turkish National Police'},
    ambulance:{num:'112',detail:'All Emergencies (ambulance, fire, police)'},
    tourist:{num:'+90 212-527-4503',detail:'Tourist Police Sultanahmet (Istanbul)'},
    embassy:{num:'+90 312-455-5555',detail:'US Embassy Ankara | Indian Embassy: +90 312-438-2195'},
    tip:'Istanbul has a dedicated Tourist Police station in Sultanahmet (near Hagia Sophia). For road accidents, the Traffic Police number is 154.'
  },
  greece:{ country:'Greece', flag:'🇬🇷',
    police:{num:'100',detail:'Hellenic Police'},
    ambulance:{num:'166',detail:'EKAB National Medical Center'},
    tourist:{num:'171',detail:'Tourist Police (multi-language)'},
    embassy:{num:'+30 210-720-2401',detail:'US Embassy Athens | Indian Embassy: +30 210-721-6227'},
    tip:'On islands like Santorini, the local tourist police are very responsive. The coast guard (108) handles sea emergencies. Helicopter evacuation may be needed for serious medical cases on islands.'
  },
  newzealand:{ country:'New Zealand', flag:'🇳🇿',
    police:{num:'111',detail:'Police, Ambulance, Fire (all emergencies)'},
    ambulance:{num:'111',detail:'Same number for all emergency services'},
    tourist:{num:'0800-TOURIST',detail:'NZ Tourism Assistance'},
    embassy:{num:'+64 4-462-6000',detail:'US Embassy Wellington | Indian High Commission: +64 4-473-6390'},
    tip:'For non-emergencies, call 105 (Police non-emergency). In wilderness areas, PLB (Personal Locator Beacons) are recommended — available for hire at DOC offices.'
  },
  georgia:{ country:'Georgia', flag:'🇬🇪',
    police:{num:'112',detail:'Unified Emergency Number (Police, Ambulance, Fire)'},
    ambulance:{num:'112',detail:'Same number covers all emergencies'},
    tourist:{num:'+995 322-99-00-09',detail:'Georgian Tourism Helpline (Tbilisi)'},
    embassy:{num:'+995 32-227-7000',detail:'US Embassy Tbilisi | Indian Embassy: +995 32-253-5051'},
    tip:'Georgia uses a single 112 number for all emergencies. Tbilisi is one of the safest capitals for tourists. The tourism authority office on Rustaveli Avenue has English-speaking staff.'
  }
};

function loadEmergencyData(country) {
  const el = document.getElementById('emergencyResult');
  if (!country) { el.innerHTML=''; return; }
  const d = emergencyData[country];
  if (!d) return;
  el.innerHTML = `
    <div class="emergency-grid">
      <div class="emergency-card police">
        <div class="emergency-card-icon">🚔</div>
        <div class="emergency-card-title">Police</div>
        <div class="emergency-numbers">
          <div class="emg-row"><span class="emg-service">Emergency</span><span class="emg-number">${d.police.num}</span></div>
          <div style="font-size:0.78rem;color:var(--text-lt);margin-top:6px">${d.police.detail}</div>
        </div>
      </div>
      <div class="emergency-card medical">
        <div class="emergency-card-icon">🚑</div>
        <div class="emergency-card-title">Ambulance & Medical</div>
        <div class="emergency-numbers">
          <div class="emg-row"><span class="emg-service">Emergency</span><span class="emg-number">${d.ambulance.num}</span></div>
          <div style="font-size:0.78rem;color:var(--text-lt);margin-top:6px">${d.ambulance.detail}</div>
        </div>
      </div>
      <div class="emergency-card tourist">
        <div class="emergency-card-icon">🎒</div>
        <div class="emergency-card-title">Tourist Helpline</div>
        <div class="emergency-numbers">
          <div class="emg-row"><span class="emg-service">Helpline</span><span class="emg-number">${d.tourist.num}</span></div>
          <div style="font-size:0.78rem;color:var(--text-lt);margin-top:6px">${d.tourist.detail}</div>
        </div>
      </div>
      <div class="emergency-card embassy">
        <div class="emergency-card-icon">🏛️</div>
        <div class="emergency-card-title">Embassy Information</div>
        <div class="emergency-numbers">
          <div class="emg-row"><span class="emg-service">Contact</span><span class="emg-number" style="font-size:0.82rem">${d.embassy.num}</span></div>
          <div style="font-size:0.78rem;color:var(--text-lt);margin-top:6px">${d.embassy.detail}</div>
        </div>
      </div>
    </div>
    <div class="emergency-note">💡 <strong>Safety Tip for ${d.country}:</strong> ${d.tip}</div>`;
}

/* ═══════════════════════════════
   DESTINATION BUDGET ESTIMATES
   Sources: TripAdvisor, Numbeo, Budget Your Trip, MakeMyTrip (2024-25)
   All values in INR. Hotel = per night, others = per person per day.
═══════════════════════════════ */
const destinationEstimates = {
  'goa':        { name:'Goa, India',         budget:{hotel:800,food:500,transport:350,activities:250}, mid:{hotel:2500,food:1200,transport:600,activities:700},    luxury:{hotel:9000,food:3000,transport:1500,activities:2000},  tips:['Book beachside hotels 2-3 months ahead for Dec-Jan','Scooter rental (₹300-500/day) beats autos for exploring','Beach shacks offer far better value than hotel restaurants'] },
  'manali':     { name:'Manali, India',       budget:{hotel:600,food:400,transport:400,activities:300}, mid:{hotel:2000,food:900,transport:800,activities:900},     luxury:{hotel:7000,food:2500,transport:2000,activities:3000}, tips:['Book Rohtang Pass permit online 2 days in advance (₹600)','Old Manali cafes offer best budget meals (₹150-250/meal)','Carry cash — ATMs unreliable beyond Manali town'] },
  'jaipur':     { name:'Jaipur, India',       budget:{hotel:700,food:400,transport:350,activities:300}, mid:{hotel:2200,food:1000,transport:600,activities:800},    luxury:{hotel:8000,food:3000,transport:1500,activities:2500}, tips:['Composite ticket (₹1000) covers Amber Fort + 4 other sites','Auto drivers often have commission deals — negotiate firmly','Local restaurants near Johari Bazaar offer authentic thali (₹80-150)'] },
  'udaipur':    { name:'Udaipur, India',      budget:{hotel:800,food:450,transport:350,activities:300}, mid:{hotel:2500,food:1100,transport:600,activities:900},    luxury:{hotel:10000,food:3500,transport:1500,activities:2500},tips:['Lake Pichola boat ride: ₹700/person (govt.) or ₹400 (local ferryman)','Rooftop restaurants around Pichola offer ₹200 cheaper food with same views','Avoid tourist trap menus near City Palace gate'] },
  'ladakh':     { name:'Ladakh, India',       budget:{hotel:700,food:450,transport:700,activities:500}, mid:{hotel:2500,food:1100,transport:1500,activities:1800},   luxury:{hotel:8000,food:2500,transport:4000,activities:6000}, tips:['Inner Line Permit required for Nubra/Pangong: ₹400/person online','Acclimatize for 2 full days before any high-altitude activity (altitude 3500m)','BSNL is the only reliable network — get a local SIM before leaving Leh'] },
  'coorg':      { name:'Coorg, India',        budget:{hotel:900,food:500,transport:350,activities:250}, mid:{hotel:3000,food:1200,transport:700,activities:700},    luxury:{hotel:12000,food:3000,transport:1500,activities:1500},tips:['Coffee estate homestays often include meals — better value than resorts','Rent a self-drive car for the day (₹1500-2000) to cover multiple estates','Visit Abbey Falls early morning before tourist buses arrive'] },
  'shimla':     { name:'Shimla, India',       budget:{hotel:600,food:400,transport:300,activities:200}, mid:{hotel:1800,food:900,transport:600,activities:600},     luxury:{hotel:6000,food:2500,transport:1500,activities:1500}, tips:['No vehicles allowed on Mall Road — everything is walkable in the town center','Toy Train from Kalka to Shimla is a heritage experience (₹350 chair car)','Ridge and Mall Road food stalls are cheaper than sit-down restaurants'] },
  'pondicherry':{ name:'Pondicherry, India',  budget:{hotel:700,food:400,transport:250,activities:200}, mid:{hotel:2200,food:1000,transport:500,activities:600},    luxury:{hotel:7000,food:2500,transport:1200,activities:1500}, tips:['French Quarter hotels are pricier — Goubert Avenue area has better budget options','Rent a cycle (₹100-200/day) — the town is perfectly sized for cycling','Best beaches (Serenity, Paradise) are south of town, beyond walking distance'] },
  'spiti':      { name:'Spiti Valley, India', budget:{hotel:500,food:350,transport:800,activities:300}, mid:{hotel:1500,food:800,transport:2000,activities:900},    luxury:{hotel:5000,food:2000,transport:5000,activities:3000}, tips:['Chandratal Lake camping: carry your own sleeping bag (nights hit -10°C in August)','The Kinnaur-Spiti circuit road from Shimla side opens only May-October','Carry extra cash — no ATMs beyond Kaza; Kaza ATM is unreliable'] },
  'bali':       { name:'Bali, Indonesia',     budget:{hotel:1500,food:700,transport:500,activities:600}, mid:{hotel:5000,food:2000,transport:1200,activities:2000},   luxury:{hotel:18000,food:5500,transport:3000,activities:7000},tips:['Grab/Gojek apps are 50% cheaper than metered taxis in Kuta/Seminyak','Ubud restaurants near the rice terraces offer authentic local food (₹200-400)','Most Bali beach clubs have a minimum spend policy (₹1500-3000) — budget accordingly'] },
  'thailand':   { name:'Thailand',            budget:{hotel:1400,food:700,transport:500,activities:600}, mid:{hotel:4500,food:1800,transport:1000,activities:1800},   luxury:{hotel:15000,food:4500,transport:2500,activities:6000},tips:['AIS 8-day tourist SIM (₹600 equiv.) is best value for data','Chiang Mai is 40% cheaper than Bangkok for equivalent accommodation','Always use metered taxis in Bangkok or book via Grab — never negotiate prices on the street'] },
  'paris':      { name:'Paris, France',       budget:{hotel:7000,food:3000,transport:800,activities:1500}, mid:{hotel:14000,food:6000,transport:1500,activities:4000}, luxury:{hotel:40000,food:15000,transport:4500,activities:12000},tips:['Navigo weekly pass (₹2500 equiv.) covers all Metro, RER, and buses','Prix-fixe lunch menus at restaurants (€12-18) offer far better value than à la carte','Museum Pass (₹3600 equiv.) covers Louvre, Versailles, Orsay + 60 museums in 2-6 days'] },
  'tokyo':      { name:'Tokyo, Japan',        budget:{hotel:5500,food:2500,transport:800,activities:1200}, mid:{hotel:12000,food:5000,transport:1500,activities:3500}, luxury:{hotel:35000,food:12000,transport:4500,activities:10000},tips:['Suica/Pasmo card (IC card) works on all Tokyo trains, buses, and in vending machines','Convenience stores (7-Eleven, Lawson) sell excellent ¥500-700 bento boxes and onigiri','Tokyo Fuji Pass (₹3500 equiv.) covers 3 days unlimited Metro travel'] },
  'santorini':  { name:'Santorini, Greece',   budget:{hotel:8000,food:3500,transport:1500,activities:1500}, mid:{hotel:18000,food:7500,transport:2500,activities:5000}, luxury:{hotel:55000,food:20000,transport:7000,activities:15000},tips:['Oia accommodation costs 30% more than Fira — stay in Fira, day trip to Oia','The caldera cruise (₹3500-5000) is the best value activity on the island','Athenian wineries offer free tastings — try Assyrtiko and Nykteri wines'] },
  'barcelona':  { name:'Barcelona, Spain',    budget:{hotel:5500,food:2500,transport:700,activities:1000}, mid:{hotel:11000,food:5000,transport:1200,activities:3000}, luxury:{hotel:28000,food:12000,transport:3500,activities:8000},tips:['T-Casual 10-trip Metro card (₹950 equiv.) is best value for 3-4 day visits','Sagrada Família tickets MUST be pre-booked online — no walk-in sales','La Boqueria: eat at stalls away from the main entrance (50% cheaper)'] },
  'istanbul':   { name:'Istanbul, Turkey',    budget:{hotel:2500,food:1500,transport:600,activities:700}, mid:{hotel:6000,food:3000,transport:1200,activities:1800},   luxury:{hotel:18000,food:8000,transport:3500,activities:5000},tips:['Istanbulkart (₹350 equiv.) works on all metro, tram, ferry, and bus lines','Topkapi Palace tickets (₹700 equiv.) are separate from Hagia Sophia (free)','Grand Bazaar prices are 40% negotiable — always offer half the starting price'] },
  'prague':     { name:'Prague, Czech Republic', budget:{hotel:3000,food:1500,transport:400,activities:800}, mid:{hotel:7000,food:3500,transport:800,activities:2000},  luxury:{hotel:18000,food:8000,transport:2500,activities:6000},tips:['Prague Card covers public transport + 50+ museums (₹5000 equiv. for 3 days)','Eating just one street away from Old Town Square saves 40% on food','Try svíčková (beef sirloin) and trdelník at local non-tourist restaurants'] },
  'georgia':    { name:'Tbilisi, Georgia',    budget:{hotel:1500,food:900,transport:400,activities:400}, mid:{hotel:4000,food:2000,transport:900,activities:1200},    luxury:{hotel:12000,food:5000,transport:2500,activities:4000},tips:['Tbilisi has free public transport for locals — visitors can buy a 3 GEL metro card (₹100 equiv.)','Georgian wine and food is extraordinarily affordable — expect to spend just ₹900-1500 at good restaurants','Private sulfur bath in Abanotubani: ₹400-600/hour for 2 people'] },
  'maldives':   { name:'Maldives',            budget:{hotel:18000,food:2500,transport:2000,activities:2500}, mid:{hotel:35000,food:7000,transport:4000,activities:6000}, luxury:{hotel:100000,food:18000,transport:10000,activities:18000},tips:['Local island guesthouses (Maafushi, Dhigurah) are 70% cheaper than resort islands','Speedboat transfers (₹2500) are far cheaper than seaplane (₹10000) — check timing','Bring your own reef-safe sunscreen: resorts charge ₹1500-2000 for the same bottle'] },
  'lisbon':     { name:'Lisbon, Portugal',    budget:{hotel:3500,food:2000,transport:600,activities:800}, mid:{hotel:8000,food:4000,transport:1200,activities:2200},   luxury:{hotel:22000,food:10000,transport:3500,activities:6000},tips:['Lisboa Card (₹2500 equiv.) covers all trams + 30+ museums for 24-72 hours','Pastéis de Belém — the original custard tart shop — costs just ₹100 per tart','Time Out Market on the waterfront offers best value food hall in Lisbon (€4-12 per dish)'] },
  'queenstown': { name:'Queenstown, New Zealand', budget:{hotel:7000,food:3000,transport:2500,activities:4000}, mid:{hotel:15000,food:6000,transport:5000,activities:10000}, luxury:{hotel:35000,food:12000,transport:10000,activities:25000},tips:['NZeTA visa + IVL levy required for most non-NZ visitors: apply 72 hrs before travel','Combo activity deals (bungee + jet boat) are 15-20% cheaper than booking separately','The Remarkables and Coronet Peak ski passes cost ₹7000-10000/day — book early for discounts'] },
  'swiss alps': { name:'Swiss Alps',          budget:{hotel:12000,food:4500,transport:3500,activities:2500}, mid:{hotel:22000,food:8500,transport:6000,activities:6000}, luxury:{hotel:55000,food:20000,transport:12000,activities:18000},tips:['Swiss Travel Pass (₹15000 equiv. for 4 days) covers trains, buses, and most boats','Supermarkets (Migros, Coop) for lunch saves ₹1500/day vs restaurants','Jungfraujoch summit train (₹8000 equiv.) — book early for 25% "Good Morning" discount'] }
};

function getDestinationEstimates(destInput) {
  if (!destInput) return null;
  const key = destInput.toLowerCase().trim();
  const entries = Object.entries(destinationEstimates);
  const exact = entries.find(([k]) => k === key);
  if (exact) return { key: exact[0], ...exact[1] };
  const partial = entries.find(([k]) => key.startsWith(k) || k.startsWith(key));
  if (partial) return { key: partial[0], ...partial[1] };
  return null;
}

function autoFillBudget(style) {
  const destInput = (document.getElementById('budgetDest') || {}).value || '';
  const est = getDestinationEstimates(destInput);
  if (!est) { showToast('Destination not found. Enter values manually or try a listed destination.'); return; }
  const tier = est[style];
  if (!tier) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  set('hotelBudget', tier.hotel);
  set('foodBudget', tier.food);
  set('transportBudget', tier.transport);
  set('activitiesBudget', tier.activities);
  const noteEl = document.getElementById('estimateNote');
  if (noteEl) {
    noteEl.style.display = 'flex';
    noteEl.innerHTML = `<span>📊</span><span>Realistic estimates for <strong>${est.name}</strong> — ${style === 'budget' ? 'Budget Backpacker' : style === 'mid' ? 'Mid-Range Comfort' : 'Luxury'} style. <em>These are estimates based on TripAdvisor, Numbeo & traveler data (2024-25). Actual costs may vary.</em></span>`;
  }
  showToast(`Estimates loaded for ${est.name} — adjust if needed!`);
}

/* ═══════════════════════════════
   REALISTIC DESTINATION ITINERARIES
   Based on real attractions, timings, and local tips
═══════════════════════════════ */
const destinationItineraries = {
  'goa': [
    { title:'Arrival & North Goa Beaches', morning:'Arrive at Goa Airport (Dabolim/Mopa). Check into your hotel in North Goa (Calangute or Baga area). Freshen up.', afternoon:'Head to Calangute Beach — 30 mins of walking, then try water sports: parasailing (₹600), jet ski (₹500/15 min), banana boat (₹300). Browse the beach promenade.', evening:'Sunset at Baga Beach. Dinner at a beach shack on Baga — must-try: prawn curry rice (₹250-350), Goan fish thali (₹200-300), and a glass of local feni (cashew spirit).' },
    { title:'Anjuna & Chapora Fort', morning:'If it\'s Wednesday, visit the famous Anjuna Flea Market (10am-6pm) for handicrafts, clothes, and trinkets. Otherwise, explore Anjuna Beach and its cliffside cafes.', afternoon:'Drive to Chapora Fort (free entry) — made iconic by the film Dil Chahta Hai. Stunning panoramic views over Vagator and Morjim beaches. 20-minute walk up from parking.', evening:'Sunset from Vagator\'s "Red Cliff" viewpoint. Dinner at Thalassa Greek Restaurant (₹800-1,200/person) for sunset views, or at a local Calangute shack for ₹300.' },
    { title:'Old Goa Heritage & Panjim', morning:'Visit the UNESCO-listed Old Goa churches. Basilica of Bom Jesus (St. Francis Xavier\'s relics — free entry), Se Cathedral (free), Church of St. Francis of Assisi.', afternoon:'Head to Panjim (Panaji) — the state capital. Stroll through the Latin Quarter (Fontainhas) with its colorful Portuguese-era houses. Visit the Church of Our Lady of the Immaculate Conception (1541).', evening:'Dinner in Panjim — try Sher-E-Punjab for authentic Goan-Punjabi fusion, or Viva Panjim in Fontainhas for Goan cuisine (₹400-700/person).' },
    { title:'South Goa\'s Pristine Beaches', morning:'Drive to South Goa (45 min from Calangute). Cola Beach — a hidden lagoon accessible by a 10-min jungle walk or boat (₹100). Completely different from North Goa\'s busy beaches.', afternoon:'Continue to Palolem Beach — one of Goa\'s most beautiful crescent beaches. Try kayaking (₹400/hr) or just relax. Don\'t miss the silent disco boats in the evening (book in advance).', evening:'Sunset and dinner on Palolem Beach — seafood is the highlight. Tiger prawns, lobster, and fresh fish grilled on the beach at reasonable prices (₹500-900/person).' },
    { title:'Dudhsagar Falls & Market Day', morning:'Early start (7am) for Dudhsagar Waterfall — India\'s 5th highest at 310m. Either join a jeep safari from Mollem (₹600-800/person, includes entry) or trek 14km through the forest.', afternoon:'Return by 2pm. Head to Mapusa Market (Fridays) or Panjim Market for Goan spices, cashews, bebinca (local cake), and handicrafts — far cheaper than beach vendors.', evening:'Farewell dinner at your favorite beach shack. Don\'t leave without trying vindaloo, cafreal, or xacuti — Goa\'s signature spice blends.' }
  ],
  'bali': [
    { title:'Arrival & Seminyak', morning:'Arrive at Ngurah Rai International Airport, Denpasar. Transfer to Seminyak or Canggu (30-45 min). Check in and recover from your flight.', afternoon:'Explore Seminyak — Jalan Laksmana (Eat Street) has excellent cafes. Merah Putih restaurant for upscale Balinese food (₹1,500-2,500/person), or La Plancha beach bar for casual dining.', evening:'Sunset at Seminyak Beach or Kuta Beach. Watch local surfers. Dinner at a warung (local restaurant) for nasi goreng (₹150-200) or try Ku De Ta beach club (dress code required).' },
    { title:'Ubud — Rice Terraces & Culture', morning:'7am start — Tegallalang Rice Terraces (₹100 entry + photo spots ₹50-100 each). Go early to beat tour groups. Breakfast at a warung overlooking the terraces (₹150-250).', afternoon:'Ubud Sacred Monkey Forest Sanctuary (₹250 entry, 1,000+ monkeys). Ubud Palace (Puri Saren) and main market. Visit Agung Rai Museum of Art (ARMA, ₹150) for traditional Balinese paintings.', evening:'Kecak Fire Dance at Uluwatu Temple (₹200-300, begins at 6pm, sunset backdrop) or Ubud Palace Kecak/Legong dance (₹180). Book tickets on arrival in Ubud.' },
    { title:'Mount Batur Sunrise Trek', morning:'Wake at 2am. Meet your guide by 2:30am at base camp (Toya Bungkah). 2-hour hike to summit (1717m). Watch sunrise at 6am above the clouds. Cost: ₹1,000-1,500/person including guide.', afternoon:'Natural hot springs at Toya Bungkah (₹300-600 depending on resort). Lunch in Kintamani with the famous caldera view — worth the tourist price (₹500-800).', evening:'Return to your base. Rest afternoon. Dinner in Ubud at Locavore restaurant (book weeks ahead, ₹4,000/person for tasting menu) or casual warung for ₹300.' },
    { title:'Uluwatu, Temples & Jimbaran', morning:'Drive to Uluwatu Peninsula (1 hr from Seminyak). Uluwatu Temple — perched on a 70m sea cliff, stunning views. Wear a sarong (provided free). Watch for monkeys that steal belongings.', afternoon:'Visit Padang Padang Beach (₹50 entry), Dreamland Beach, and Bingin Beach (surfers paradise). The cliff walk between beaches takes 2 hours.', evening:'Kecak Dance at Uluwatu at sunset (₹200-300). Then Jimbaran Bay seafood dinner on the beach — fresh fish, prawns, and lobster by candlelight (₹800-2,000/person).' },
    { title:'Tanah Lot & Canggu', morning:'Tanah Lot Temple (₹200 entry) — best at low tide when you can walk to it. Go early (7-8am) before tour buses. The cliff-top view from Tanah Lot is the most photographed in Bali.', afternoon:'Drive to Canggu — Bali\'s hippest area. Browse Berawa Beach and Finn\'s Beach Club. Try surfing lessons at Batu Bolong Beach (₹600-900/1.5hr lesson with board).', evening:'The Lawn or Old Man\'s bar in Canggu for sunset. Dinner at Peloton Supershop (vegan) or Echo Beach warung. Night ride home through paddy fields.' },
    { title:'Nusa Dua Water Sports & Shopping', morning:'Nusa Dua water sports complex — banana boat (₹400), parasailing (₹700), seawalker (underwater walking, ₹900). Calm lagoon waters, safe for families.', afternoon:'Kuta Art Market and Seminyak shopping — batik shirts (₹200-400), silver jewelry, rattan bags. Negotiate all prices to 50-60% of asking. Suckling pig at Ibu Oka (₹300-400, lunch only, queue from noon).', evening:'Packing, last dinner, early rest if flying out tomorrow. Check airport transfer time — Ngurah Rai is 30-45 min from Seminyak.' }
  ],
  'jaipur': [
    { title:'Forts & Bazaars', morning:'Amber Fort (₹550 Indians / ₹200 foreigners with SAARC — or ₹1000 composite ticket). Take the jeep up (₹700 return shared) or walk 30 min uphill. Sheesh Mahal (Mirror Palace) inside is breathtaking. Allow 2 hours.', afternoon:'Nahargarh Fort (₹200) on the ridge above the city — best views of Jaipur. Sunset here is magnificent. Short 1km walk from the road. Chokhi Dhani cultural village (₹850, all-inclusive folk dinner show).', evening:'Johari Bazaar for traditional Rajasthani jewelry (Kundan, Meenakari). Try Laxmi Misthan Bhandar for lassi (₹80) and ghewar. Dinner at Natraj Restaurant for Rajasthani thali (₹350).' },
    { title:'City Palace & Jantar Mantar', morning:'City Palace (₹700/₹200) — the royal residence with 7 courtyards, stunning architecture, and excellent Maharaja Sawai Man Singh II Museum. Allow 2.5 hours. Includes entry to Diwan-i-Khas.', afternoon:'Jantar Mantar (UNESCO World Heritage, ₹200) — the world\'s largest stone sundial. Allow 1 hour with a guide (₹200 extra). Hawa Mahal (₹200) just 10 minutes away — facade best from outside, climb inside for city views.', evening:'Albert Hall Museum (₹150, open until 8pm) — excellent collection of Rajasthani artifacts. Bapu Bazaar for textiles and block-printed fabrics. Dinner at Peacock Rooftop Restaurant near Hawa Mahal (₹500-800/person).' },
    { title:'Jal Mahal & Departure', morning:'Jal Mahal (Water Palace) — free to view from the roadside, stunning at sunrise. Birla Mandir (free, dawn-dusk) — pristine white marble Lakshmi-Narayan temple. Sisodia Rani Garden (₹50) for Mughal garden walk.', afternoon:'Nehru Bazaar for mojari shoes and lac bangles. Visit Rajasthan government emporiums for authentic handicrafts at fixed prices. Last-minute local food: Rawat Misthan Bhandar for pyaaz kachori (₹25) — Jaipur\'s most famous snack.', evening:'Depart or move to next destination. Pink City Cab or Ola for airport/station transfer.' }
  ],
  'ladakh': [
    { title:'Arrival & Acclimatization (CRITICAL)', morning:'Arrive at Leh Kushok Bakula Rimpochhe Airport (3500m altitude). IMPORTANT: Do not rush. Drink 3-4L of water. Avoid alcohol and heavy meals. Rest for first 4-5 hours. Altitude sickness symptoms (headache, nausea) are normal.', afternoon:'Gentle 30-min walk only — Hall of Fame Museum (₹50, Indian Army museum on Kargil war). Buy Inner Line Permits if visiting Nubra/Pangong (₹400/person at DC Office or online). Leh Market browsing.', evening:'Light dinner at a local dhaba — try thukpa (noodle soup), tingmo, and butter tea. Sleep by 9pm. No Diamox needed unless you have a history of altitude sickness (consult doctor before travel).' },
    { title:'Leh City & Monasteries', morning:'Leh Palace (₹100) — 17th-century 9-story royal palace, former residence of Namgyal dynasty. 20-min uphill walk from market. Shanti Stupa (free) — 15-min ride, panoramic 360° view of the Indus Valley.', afternoon:'Namgyal Tsemo Gompa (free) — small gompa above Leh Palace. Leh Market for Tibetan artifacts, prayer wheels, and pashmina shawls. Changspa Road cafes — Gesmo\'s or Chopsticks for lunch (₹200-400).', evening:'Acclimatization day 2 — most altitude sickness resolves. Try Tibetan momos (₹150-200) at Bon Appetit or Penguin Garden. Early rest again.' },
    { title:'Nubra Valley — Sand Dunes & Camels', morning:'6am start — Khardung La Pass (5359m, claimed to be world\'s highest motorable road). Check permit at checkpost. Photo stop at summit. Total drive to Nubra: 3.5 hours.', afternoon:'Diskit Monastery (₹50) — beautiful hilltop gompa with a 32m Maitreya Buddha statue overlooking the Shyok river. Hunder sand dunes — Bactrian camel safari (double-hump camels, ₹300-400 for 20 min).', evening:'Stay overnight in Nubra (guesthouses ₹800-1,500/night including meals). Stargazing is extraordinary — no light pollution at 3200m altitude.' },
    { title:'Return to Leh & More Monasteries', morning:'Morning at Nubra. Drive back via Khardung La. Stop at Thiksey Monastery (₹50) — modeled after the Potala Palace in Lhasa. The morning prayer at 6am is extraordinary if you can time it.', afternoon:'Hemis Monastery (₹100, 45km from Leh) — the largest and wealthiest in Ladakh. Hemis Festival (July) features the famous Cham masked dance. Stok Palace Museum (₹150) optional.', evening:'Back in Leh. River Indus walk. Dinner at Tibetan Kitchen or Penguin Garden. Buy local souvenirs — Ladakhi apricot jam, sea buckthorn juice, and pashmina products.' },
    { title:'Pangong Lake — The Blue Mirror', morning:'5am start — Pangong Tso (the famous blue lake from 3 Idiots). 5-hour drive via Chang La Pass (5360m). The lake changes colors — blue, turquoise, green — throughout the day.', afternoon:'Walk along the south shore. Most tourists cluster at the main point — walk 1km east for the same views without crowds. Permit checkpoint at Spangmik. The lake stretches 134km into China.', evening:'Stay overnight at lakeside camps (₹2,000-3,500/person including dinner) for the magical sunrise the next morning. Temperatures drop to -5°C even in August — carry warm layers.' },
    { title:'Pangong Sunrise & Departure', morning:'5:30am sunrise at Pangong — one of India\'s most beautiful dawns. The colors on the water are extraordinary. Drive back to Leh (5 hours).', afternoon:'Last-minute shopping in Leh market. Change remaining cash (no exchange at airport). Apricot oil, local thangka paintings, and mala beads are authentic Ladakhi purchases.', evening:'Depart from Leh Airport. Arrive in Delhi 1.5 hours later.' }
  ],
  'paris': [
    { title:'Icons of Paris', morning:'Eiffel Tower (book online — queue is 2-3 hours walk-in). Top floor ticket: ₹2,200 equiv. Best views at summit. Go early (9am opening) to beat crowds.', afternoon:'Trocadéro plaza for the classic tower photo (free). Walk along the Seine to Invalides (Napoleon\'s tomb, ₹900 equiv.). Rodin Museum garden (₹750 equiv.) — sculptures including The Thinker.', evening:'Champ de Mars picnic at sunset with wine and baguette from a nearby boulangerie. Tower sparkles every hour after dark for 5 minutes — magical. Dinner near Montparnasse (less touristy prices).' },
    { title:'The Louvre & Marais', morning:'Louvre Museum (₹1,500 equiv. — book online, skip the pyramid queue). Allow 3 hours minimum for the highlights: Mona Lisa, Venus de Milo, Winged Victory. Get an app to navigate.', afternoon:'Walk through the Tuileries Garden to Place de la Concorde. Marais district (Le Marais) — the most authentic old Paris neighborhood. Place des Vosges (free), the Jewish Quarter, and Île Saint-Louis.', evening:'Rue de Bretagne market in Marais for dinner. Try L\'As du Fallafel for the best falafel in Paris (₹700 equiv., locals queue here). Gelato on Île Saint-Louis at Berthillon.' },
    { title:'Montmartre & Hidden Paris', morning:'Take the Funiculaire (Metro ticket) up to Sacré-Cœur Basilica (free). Morning is best — few crowds. Walk down through Montmartre village — authentic artists\' quarter with steep cobblestone streets.', afternoon:'Place du Tertre — working artists paint here daily (buy an original for €30-80). Dalí Museum (₹600). Canal Saint-Martin (10th Arr.) — iron footbridges and trendy canal-side cafes.', evening:'Palais Royal gardens (free, beautiful at dusk). Galerie Vivienne covered arcade. Dinner in Canal Saint-Martin neighborhood — far cheaper than tourist areas and authentically Parisian.' },
    { title:'Versailles Day Trip', morning:'Take RER C from Invalides station to Versailles (₹700 equiv. return). Palace of Versailles (₹1,900 equiv.) — arrive by 9am when it opens to avoid queues. Marie Antoinette\'s private apartments require advance booking.', afternoon:'Hall of Mirrors — the most extraordinary room in Europe (200 windows, 357 mirrors). Marie Antoinette\'s Hamlet in the gardens (extra ticket ₹500 equiv.). The gardens are free until 8am and after 8pm.', evening:'Return to Paris by 6pm. Dinner at a local bistro near your hotel. Request "Le menu" — the fixed-price lunch or dinner menu — always the best value in French restaurants.' },
    { title:'Art, Flea Markets & Departure', morning:'Musée d\'Orsay (₹1,200 equiv.) — world\'s finest Impressionist collection. Monet, Renoir, Van Gogh all here. Go early (10am) — queues build by noon.', afternoon:'Saint-Germain-des-Prés — Café de Flore and Les Deux Magots (have a coffee at ₹500-700 equiv., the price includes a seat in literary history). Luxembourg Gardens (free). Bon Marché department store.', evening:'Departure or final dinner. Montparnasse area has excellent value restaurants — avoid the tourist-priced places on the Champs-Élysées.' }
  ],
  'bangkok': [
    { title:'Grand Palace & Old City', morning:'Grand Palace complex (₹1,300 equiv.) — includes Wat Phra Kaew (Emerald Buddha). Dress code strictly enforced: shoulders and knees covered. Go early (8:30am open) — midday heat is brutal.', afternoon:'Wat Pho (Reclining Buddha, ₹500 equiv.) — 5 minutes from Grand Palace. 46-meter golden Buddha. Thai massage at Wat Pho massage school (₹1,000/hr — the original, most authentic).', evening:'Khao San Road — the legendary backpacker street. Pad Thai from street stalls (₹80-120), fresh fruit smoothies (₹60), and people-watching. Takes on a different energy after 9pm.' },
    { title:'Floating Market & Chatuchak', morning:'Damnoen Saduak Floating Market (90 min from Bangkok by bus or taxi). Go before 9am — vendors pack up by noon. Boats sell fresh Thai food, fruits, and souvenirs. Negotiate boat rides (₹200-300 for 30 min).', afternoon:'Chatuchak Weekend Market (Saturdays and Sundays, 8am-6pm) — 15,000 stalls, everything imaginable. Section 2-3 for vintage clothes, Section 7 for plants, Section 16 for antiques. Great street food throughout.', evening:'Chinatown (Yaowarat Road) after dark — one of Bangkok\'s most vibrant food streets. Pad Thai, dim sum, roast duck, and seafood cooked street-side. Average meal ₹200-400.' },
    { title:'Temples, Art & Sukhumvit', morning:'Wat Arun (Temple of Dawn, ₹150 equiv.) — best viewed from across the Chao Phraya, spectacular at sunrise or sunset. Cross by the Tha Tien ferry (₹15 equiv.). Climb the steep central prang for river views.', afternoon:'Jim Thompson House (₹800 equiv.) — the former home of the American silk trader who disappeared in 1967. Beautiful traditional Thai architecture and silk collection. Bangkok Art and Culture Centre (BACC, free).', evening:'Sukhumvit Road for international restaurants, rooftop bars, and nightlife. Vertigo Moon Bar at Banyan Tree Hotel (₹1,200 cover) or Cielo for city views. Street food soi near BTS station.' },
    { title:'Ayutthaya Day Trip', morning:'7am train or minibus from Bangkok to Ayutthaya (1.5 hours, ₹250-350 equiv.). The ancient capital of Thailand (1351-1767) — UNESCO World Heritage city. Rent a bicycle (₹120) to cover the ruins.', afternoon:'Wat Phra Si Sanphet — the royal temple with three iconic chedis. Wat Mahathat — the famous Buddha head entwined in tree roots (₹200 equiv.). Boat tour around the island (₹500/hour).', evening:'Return to Bangkok by 7pm. Dinner at the Victory Monument area for excellent local Thai food away from tourist prices.' },
    { title:'Markets, Museums & Departure', morning:'Or Tor Kor Market (near Chatuchak) — Bangkok\'s most upscale fresh market. Excellent for breakfast: fresh rambutan, mangosteen, and cooked dishes. Museum of Siam (₹700 equiv.) in the Rattanakosin area.', afternoon:'Lumphini Park for morning exercise or afternoon walk (Bangkok\'s Central Park). Last-minute shopping at MBK Center or Platinum Fashion Mall. Massage at a reputable chain (Health Land, ₹1,000/2hr).', evening:'Airport transfer — allow extra time as Bangkok traffic is unpredictable. Suvarnabhumi Airport is 45-90 min from the city depending on traffic.' }
  ],
  'istanbul': [
    { title:'Sultanahmet & the Grand Bazaar', morning:'Hagia Sophia (free entry) — the greatest building in the world, built 537 AD. Originally a cathedral, then mosque, then museum, now mosque again. Early morning with no crowds is best.', afternoon:'Blue Mosque (Sultan Ahmed Mosque, free) — across the Hippodrome from Hagia Sophia. Closed during prayer times. Topkapi Palace (₹700 equiv.) — 700 years of Ottoman royal life. Harem is extra (₹400 equiv.).', evening:'Grand Bazaar (Kapalıçarşı, closed Sundays) — 61 covered streets, 4,000+ shops. Opening price is 3x the real price — always negotiate. Dinner at Hamdi Restaurant near Eminönü for classic kebabs (₹600-900/person).' },
    { title:'Bosphorus & Taksim', morning:'Bosphorus Cruise — the public ferry (₹300 equiv.) goes all the way to the Black Sea and back. Far better value than tourist boats. Passes palaces, mosques, and the fortress of Rumeli Hisarı.', afternoon:'Dolmabahçe Palace (₹700 equiv.) — the 19th-century Ottoman palace where Atatürk died. Extraordinary crystal staircase and chandelier collection. Cross to the Asian side via ferry (₹60 equiv.) for Kadıköy market.', evening:'Taksim Square and İstiklal Caddesi (pedestrian shopping boulevard, 1.4km long). Balık-ekmek (fish sandwich) from Galata Bridge boats (₹150) is Istanbul\'s most iconic street food.' },
    { title:'Spice Bazaar & Balat District', morning:'Spice Bazaar (Mısır Çarşısı, ₹100 equiv. entry) — overwhelming variety of spices, Turkish delight, saffron, and dried fruits. Buy directly from vendors, not tourist shops on the perimeter (30% cheaper inside).', afternoon:'Süleymaniye Mosque (free) — the masterpiece of architect Mimar Sinan (1557). Larger than the Blue Mosque and less crowded. The surrounding neighborhood has excellent traditional Turkish cafes.', evening:'Balat district — Istanbul\'s most photogenic neighborhood with rainbow-colored houses on steep hills. Authentic Jewish and Greek heritage quarter. Fener Greek Orthodox Patriarchate nearby.' },
    { title:'Asian Side & Departure', morning:'Take the ferry to Kadıköy (Asian side) — just ₹60 equiv., 20 min. Authentic Istanbul with no tourists. Kadıköy morning market (Tuesday and Friday) for fresh produce. Moda neighborhood for art galleries and cafes.', afternoon:'İznik ceramics and Turkish ceramics shopping in the Grand Bazaar area. Turkish bath (hamam) experience at Çemberlitaş Hamamı (1584 AD, ₹2,500-4,000 equiv. for full treatment).', evening:'Sunset drinks at rooftop bar in Beyoğlu. Airport transfer — allow extra time; new Istanbul Airport is 45 min to 1.5hr from city center depending on traffic.' }
  ]
};

function getDestinationItinerary(destInput, days) {
  if (!destInput) return null;
  const key = destInput.toLowerCase().trim();
  const entries = Object.entries(destinationItineraries);
  // Exact match first
  const exact = entries.find(([k]) => k === key || key === k);
  if (exact) return exact[1].slice(0, Math.min(days, exact[1].length));
  // Then: destination key starts with query or query starts with key (avoids "georgia" matching "goa")
  const partial = entries.find(([k]) => key.startsWith(k) || k.startsWith(key));
  if (partial) return partial[1].slice(0, Math.min(days, partial[1].length));
  return null;
}
