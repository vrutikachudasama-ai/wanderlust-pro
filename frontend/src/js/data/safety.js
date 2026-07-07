/**
 * safety.js
 * Safety-related data: scams, emergency numbers, connectivity, transport.
 * Production note: sensitive/live data (emergency numbers) should be served
 * from GET /api/safety/:country and kept server-side for accuracy.
 */

/** Destination scam warnings and safety scores */
export const scamData = {
  bali: {
    name: 'Bali, Indonesia', safetyScore: 80, scoreClass: 'high',
    scams: [
      '"Money changer" scams — illegal changers give great rates then use sleight of hand to shortchange you',
      'Taxi drivers claiming your hotel is "closed" or "flooded" to take you to their commission hotel',
      '"Broken" taxi meters — always use Grab or insist on a meter before starting',
      'Fake art galleries and silver shops claiming to support local artists',
      'Monkey Forest vendors letting their monkey sit on you then charging ₹500+',
    ],
    avoid: ['Illegal money changers on Kuta/Legian streets', 'Unlicensed taxis outside airport arrivals', 'ATMs attached to restaurants or shops (card skimming risk)'],
    emergency: [['Police', '110'], ['Ambulance', '118'], ['Tourist Police', '+62 361-224-111'], ['Fire', '113']],
  },
  goa: {
    name: 'Goa, India', safetyScore: 78, scoreClass: 'high',
    scams: [
      'Overcharging by auto-rickshaws — always negotiate fare before boarding',
      'Beach vendors selling "fixed price" goods — all prices are negotiable',
      'Fake police officers asking for "fines" for minor infractions',
      'Drug sellers near beach areas — avoid entirely, harsh penalties',
      'Rented scooter "damage" scams — photograph the bike before renting',
    ],
    avoid: ['Isolated beaches after dark', 'Random strangers offering drugs near beach areas', 'Keeping valuables on the beach while swimming'],
    emergency: [['Police', '100'], ['Ambulance', '108'], ['Tourist Helpline', '1363'], ['Fire', '101']],
  },
  paris: {
    name: 'Paris, France', safetyScore: 72, scoreClass: 'mid',
    scams: [
      '"Friendship bracelet" scam at Sacré-Cœur — someone ties a bracelet on your wrist then demands payment',
      'Petition scam near Eiffel Tower — someone asks you to sign a petition, then demands money',
      'Card game (three-card monte) near Châtelet — never play',
      'Pickpockets on Line 1 Metro and at major tourist sites',
      '"Good Samaritan" who finds a ring on the ground and offers it to you — demands money',
    ],
    avoid: ['Seine riverbanks late at night alone', 'Gare du Nord area after midnight', 'Anyone approaching you near the Louvre with a survey or petition'],
    emergency: [['Police', '17'], ['Ambulance (SAMU)', '15'], ['Fire', '18'], ['All emergencies', '112']],
  },
  tokyo: {
    name: 'Tokyo, Japan', safetyScore: 95, scoreClass: 'high',
    scams: [
      'Hostess bar overcharging — bars in Kabukichō can add exorbitant "table charges" not shown on menus',
      'Taxi overcharging for tourists who don\'t know routes — use Google Maps to verify',
      'Counterfeit electronics in Akihabara — buy from official stores only',
    ],
    avoid: ['Accepting drink invitations from strangers in Kabukichō or Roppongi', 'Unlicensed massage parlors in entertainment districts'],
    emergency: [['Police', '110'], ['Ambulance/Fire', '119'], ['Tourist Helpline', '#7119 (Tokyo)'], ['Coast Guard', '118']],
  },
  istanbul: {
    name: 'Istanbul, Turkey', safetyScore: 73, scoreClass: 'mid',
    scams: [
      '"Shoe shine drop" scam — cleaner drops his brush, you help, then gets charged for a shine',
      'Carpet shop invitations from friendly strangers in tourist areas',
      'Taxi currency confusion — driver claims he got small bills when you paid large ones',
      'Counterfeit goods sold as authentic at Grand Bazaar',
      'Tea invitation leading to pressure sales',
    ],
    avoid: ['Unlicensed taxi drivers near Sultanahmet', 'Accepting unsolicited tea from strangers near tourist sites'],
    emergency: [['Police', '155'], ['Ambulance', '112'], ['Tourist Police', '+90 212-527-4503'], ['Fire', '110']],
  },
  barcelona: {
    name: 'Barcelona, Spain', safetyScore: 70, scoreClass: 'mid',
    scams: [
      "Pickpockets on La Rambla and at Barceloneta beach — among the worst in Europe",
      "Mustard/ketchup distraction — someone squirts something on you and an accomplice steals your bag",
      'Fake policemen asking to see your wallet',
      'Three-card monte on La Rambla',
      'Restaurant upselling — olives and bread left on table are charged',
    ],
    avoid: ['El Raval after midnight', 'Keeping valuables in back pockets anywhere near Las Ramblas', 'ATMs inside bars or restaurants'],
    emergency: [['Police (National)', '091'], ['Police (Local)', '092'], ['Ambulance', '061'], ['Emergency', '112']],
  },
  jaipur: {
    name: 'Jaipur, India', safetyScore: 76, scoreClass: 'mid',
    scams: [
      'Rickshaw/auto drivers taking tourists to their family shops instead of requested destination',
      'Gem and jewelry scam — offered "investment-grade" stones you can resell at home (you can\'t)',
      'Fake "government approved" handicraft shops',
      'Camel/elephant ride operators adding unannounced extra charges',
      'Fake student artists asking you to buy their work to help them graduate',
    ],
    avoid: ['Deserted areas near Amber Fort at night', 'Random strangers offering to take you to "authentic" markets'],
    emergency: [['Police', '100'], ['Ambulance', '108'], ['Tourist Police', '+91 141-511-0598'], ['Fire', '101']],
  },
};

/** Emergency numbers by country */
export const emergencyData = {
  india: {
    country: 'India', flag: '🇮🇳',
    police: { num: '100', detail: 'National Emergency Police' },
    ambulance: { num: '108', detail: 'Free ambulance service across states' },
    tourist: { num: '1363', detail: 'India Tourism Helpline (24/7, multilingual)' },
    embassy: { num: '+91 11-2419-8000', detail: 'US Embassy New Delhi | For Indian citizens: contact respective embassy' },
    tip: 'Download the "UMANG" app for access to government services. The "112 India" app connects to all emergency services simultaneously.',
  },
  indonesia: {
    country: 'Indonesia (Bali)', flag: '🇮🇩',
    police: { num: '110', detail: 'National Police' },
    ambulance: { num: '118', detail: 'Emergency Ambulance' },
    tourist: { num: '+62 361-224-111', detail: 'Bali Tourist Police (Denpasar)' },
    embassy: { num: '+62 21-3435-9000', detail: 'US Embassy Jakarta | Indian Embassy Jakarta: +62 21-520-4150' },
    tip: 'In Bali, the Kuta Beach Rescue Team (021-751-0470) operates its own rescue. Private hospitals (BIMC, SOS) are preferred by tourists.',
  },
  thailand: {
    country: 'Thailand', flag: '🇹🇭',
    police: { num: '191', detail: 'Royal Thai Police' },
    ambulance: { num: '1669', detail: 'Emergency Medical Services' },
    tourist: { num: '1155', detail: 'Tourist Police (English-speaking, 24/7)' },
    embassy: { num: '+66 2-205-4000', detail: 'US Embassy Bangkok | Indian Embassy: +66 2-258-0300' },
    tip: 'The Tourist Police (1155) are specifically trained for visitor issues and speak English. Always contact them first for scams, theft, or legal problems.',
  },
  france: {
    country: 'France', flag: '🇫🇷',
    police: { num: '17', detail: 'Police Nationale' },
    ambulance: { num: '15 (SAMU)', detail: 'Medical Emergencies' },
    tourist: { num: '3114', detail: 'National Crisis & Support Line' },
    embassy: { num: '+33 1-43-12-22-22', detail: 'US Embassy Paris | Indian Embassy: +33 1-40-50-70-70' },
    tip: 'In France, 112 is the single EU-wide emergency number and works from any phone including without a SIM. The SAMU (15) dispatcher decides which service to send.',
  },
  spain: {
    country: 'Spain', flag: '🇪🇸',
    police: { num: '091 (national) / 092 (local)', detail: 'National vs. Local Police' },
    ambulance: { num: '061 / 112', detail: '061 for medical; 112 for all emergencies' },
    tourist: { num: '+34 902-102-112', detail: 'Spanish Tourist Board helpline' },
    embassy: { num: '+34 91-587-2200', detail: 'US Embassy Madrid | Indian Embassy: +34 91-309-9891' },
    tip: "Barcelona has Mossos d'Esquadra (088) as the Catalan police — the most relevant force for tourist areas. Use 112 for any life-threatening emergency.",
  },
  japan: {
    country: 'Japan', flag: '🇯🇵',
    police: { num: '110', detail: 'Police (English operators available)' },
    ambulance: { num: '119', detail: 'Fire & Ambulance (same number)' },
    tourist: { num: '#7119 (Tokyo) / 03-3503-4311', detail: 'Japan Tourism Agency Helpline' },
    embassy: { num: '+81 3-3224-5000', detail: 'US Embassy Tokyo | Indian Embassy: +81 3-3262-2391' },
    tip: 'Japan is extremely safe, but natural disasters are a concern. Download the "Safety Tips" app for earthquake/tsunami alerts in English. Hospitals display a blue "H" sign.',
  },
  turkey: {
    country: 'Turkey', flag: '🇹🇷',
    police: { num: '155', detail: 'Turkish National Police' },
    ambulance: { num: '112', detail: 'All Emergencies (ambulance, fire, police)' },
    tourist: { num: '+90 212-527-4503', detail: 'Tourist Police Sultanahmet (Istanbul)' },
    embassy: { num: '+90 312-455-5555', detail: 'US Embassy Ankara | Indian Embassy: +90 312-438-2195' },
    tip: 'Istanbul has a dedicated Tourist Police station in Sultanahmet (near Hagia Sophia). For road accidents, the Traffic Police number is 154.',
  },
  greece: {
    country: 'Greece', flag: '🇬🇷',
    police: { num: '100', detail: 'Hellenic Police' },
    ambulance: { num: '166', detail: 'EKAB National Medical Center' },
    tourist: { num: '171', detail: 'Tourist Police (multi-language)' },
    embassy: { num: '+30 210-720-2401', detail: 'US Embassy Athens | Indian Embassy: +30 210-721-6227' },
    tip: 'On islands like Santorini, the local tourist police are very responsive. The coast guard (108) handles sea emergencies. Helicopter evacuation may be needed for serious medical cases on islands.',
  },
  newzealand: {
    country: 'New Zealand', flag: '🇳🇿',
    police: { num: '111', detail: 'Police, Ambulance, Fire (all emergencies)' },
    ambulance: { num: '111', detail: 'Same number for all emergency services' },
    tourist: { num: '0800-TOURIST', detail: 'NZ Tourism Assistance' },
    embassy: { num: '+64 4-462-6000', detail: 'US Embassy Wellington | Indian High Commission: +64 4-473-6390' },
    tip: 'For non-emergencies, call 105 (Police non-emergency). In wilderness areas, PLB (Personal Locator Beacons) are recommended — available for hire at DOC offices.',
  },
  georgia: {
    country: 'Georgia', flag: '🇬🇪',
    police: { num: '112', detail: 'Unified Emergency Number (Police, Ambulance, Fire)' },
    ambulance: { num: '112', detail: 'Same number covers all emergencies' },
    tourist: { num: '+995 322-99-00-09', detail: 'Georgian Tourism Helpline (Tbilisi)' },
    embassy: { num: '+995 32-227-7000', detail: 'US Embassy Tbilisi | Indian Embassy: +995 32-253-5051' },
    tip: 'Georgia uses a single 112 number for all emergencies. Tbilisi is one of the safest capitals for tourists. The tourism authority office on Rustaveli Avenue has English-speaking staff.',
  },
};

/** SIM/eSIM connectivity guide by country */
export const connectivityData = {
  indonesia: {
    country: 'Indonesia (Bali)', flag: '🇮🇩',
    sims: [{ name: 'Telkomsel SimPATI', note: 'Best coverage across Bali & tourist areas' }, { name: 'XL Axiata', note: 'Good 4G in urban areas, budget-friendly' }, { name: 'Indosat Ooredoo', note: 'Good for Lombok and outer islands' }],
    esims: [{ name: 'Airalo', note: 'From ₹500 for 1GB/7 days' }, { name: 'Holafly', note: 'Unlimited data plans available' }, { name: 'eSIM Plus', note: 'Multi-country plans' }],
    speed: '15–50 Mbps (4G LTE)',
    wifi: 'Good in tourist areas: cafes, hotels, co-working spaces in Canggu & Seminyak',
    tip: 'Buy a SIM at Ngurah Rai Airport arrival hall — prices are regulated. Bring your passport.',
  },
  thailand: {
    country: 'Thailand', flag: '🇹🇭',
    sims: [{ name: 'AIS SIM2Fly', note: 'Best tourist SIM, 8-day unlimited from ฿299' }, { name: 'DTAC Tourist SIM', note: 'Good coverage, easy top-up' }, { name: 'True Move H', note: 'Best in Bangkok, solid 4G' }],
    esims: [{ name: 'Airalo', note: 'Thailand plans from ₹400' }, { name: 'Klook eSIM', note: 'Pre-purchase before departure' }, { name: 'Nomad', note: 'Regional ASEAN plans available' }],
    speed: '20–80 Mbps (4G/5G in cities)',
    wifi: 'Excellent — 7-Eleven, cafes, malls, and most restaurants have free WiFi',
    tip: 'AIS counters are at Suvarnabhumi airport before immigration. Buy the 15-day tourist SIM.',
  },
  india: {
    country: 'India', flag: '🇮🇳',
    sims: [{ name: 'Jio Tourist SIM', note: '₹699 for 28 days, 2GB/day + calls' }, { name: 'Airtel', note: 'Best network in mountains; premium rates' }, { name: 'BSNL', note: 'Works in remote areas where others fail' }],
    esims: [{ name: 'Airtel eSIM', note: 'Available for compatible phones' }, { name: 'Jio eSIM', note: 'Activate at airport kiosks' }, { name: 'Airalo India', note: 'Data-only for foreign visitors' }],
    speed: '10–40 Mbps (4G); 5G in major cities',
    wifi: 'Available in cafes, hotels, malls; patchy in mountain regions',
    tip: 'Jio SIM requires passport + photo. Buy at airports or Jio stores. In Ladakh, BSNL is the only network that works reliably.',
  },
  japan: {
    country: 'Japan', flag: '🇯🇵',
    sims: [{ name: 'IIJmio Tourist eSIM', note: 'Best value for short trips' }, { name: 'Softbank Tourist SIM', note: 'Available at airports, no registration needed' }, { name: 'Docomo SIM', note: 'Widest coverage including rural areas' }],
    esims: [{ name: 'IIJmio eSIM', note: 'Purchase online before arriving' }, { name: 'Airalo Japan', note: 'Plans from ₹800/15 days' }, { name: 'eConnect Japan', note: 'Unlimited plans available' }],
    speed: '50–150 Mbps (4G/5G)',
    wifi: 'Pocket WiFi rental is very popular — rent at airport from ₹500/day',
    tip: 'Japan is extremely well-connected. Buy a data SIM at Narita/Haneda on arrival. Pocket WiFi rental at airports is excellent for groups.',
  },
  france: {
    country: 'France', flag: '🇫🇷',
    sims: [{ name: 'Orange Holiday SIM', note: 'Best tourist option, €20 for 10GB + calls' }, { name: 'Free Mobile', note: 'Budget option, good coverage' }, { name: 'Bouygues Telecom', note: 'Solid 4G/5G coverage' }],
    esims: [{ name: 'Airalo EU', note: 'Works across 30+ European countries' }, { name: 'Holafly Europe', note: 'Unlimited data, higher cost' }, { name: 'Nomad', note: 'Europe-wide coverage' }],
    speed: '40–150 Mbps (4G/5G in cities)',
    wifi: 'Free WiFi in most cafes, hotels, and public spaces; Paris has city-wide free WiFi zones',
    tip: 'Orange Holiday SIM is sold at CDG Airport and Orange stores. EU eSIMs work across all of Europe — ideal if visiting multiple countries.',
  },
  spain: {
    country: 'Spain', flag: '🇪🇸',
    sims: [{ name: 'Movistar Tourist SIM', note: 'Best nationwide coverage' }, { name: 'Vodafone Spain', note: 'Strong 4G, good for cities' }, { name: 'Orange Spain', note: 'Good value tourist packs' }],
    esims: [{ name: 'Airalo EU', note: 'Works across Europe' }, { name: 'Holafly', note: 'Unlimited data plans' }, { name: 'eSIM.net', note: 'Budget European plans' }],
    speed: '30–120 Mbps (4G/5G in cities)',
    wifi: 'Widely available in cafes and restaurants; Barcelona and Madrid have city WiFi',
    tip: "SIMs available at any phone shop (locutorio) or El Corte Inglés. An EU eSIM is your best bet for multi-country travel.",
  },
  turkey: {
    country: 'Turkey', flag: '🇹🇷',
    sims: [{ name: 'Turkcell 3-Day', note: 'Best coverage, sold at airports' }, { name: 'Vodafone Turkey', note: 'Good urban coverage' }, { name: 'Turk Telekom', note: 'Budget option' }],
    esims: [{ name: 'Airalo Turkey', note: 'Plans from ₹600/7 days' }, { name: 'Holafly', note: 'Unlimited data available' }, { name: 'Nomad', note: 'Regional plans' }],
    speed: '20–60 Mbps (4G)',
    wifi: 'Good in Istanbul hotels and cafes; free WiFi at Grand Bazaar and major tourist sites',
    tip: 'Buy Turkcell at Istanbul airport — it has the best coverage across the country. VPN required for some social media platforms.',
  },
  newzealand: {
    country: 'New Zealand', flag: '🇳🇿',
    sims: [{ name: 'Spark Prepaid', note: 'Best nationwide coverage including rural' }, { name: 'Vodafone NZ', note: 'Strong 4G in cities' }, { name: '2degrees', note: 'Budget SIM, good for cities' }],
    esims: [{ name: 'Airalo NZ', note: 'Data plans from ₹900/30 days' }, { name: 'Spark eSIM', note: 'Available for compatible phones' }, { name: 'Nomad NZ', note: 'Flexible plans' }],
    speed: '30–100 Mbps (4G/5G in cities)',
    wifi: 'Excellent in cities; limited in Fiordland and remote Queenstown areas',
    tip: 'Mobile coverage is limited in Fiordland and Milford Sound. Download offline maps before visiting remote areas. Spark has the best rural coverage.',
  },
  georgia: {
    country: 'Georgia', flag: '🇬🇪',
    sims: [{ name: 'Magti', note: 'Best coverage across Georgia' }, { name: 'Geocell', note: 'Good 4G, budget rates' }, { name: 'Beeline Georgia', note: 'Cheap data packages' }],
    esims: [{ name: 'Airalo Georgia', note: 'Affordable plans from ₹350' }, { name: 'Holafly', note: 'Available for Georgia' }, { name: 'eSIM Plus', note: 'Regional Caucasus plans' }],
    speed: '10–40 Mbps (4G)',
    wifi: 'Excellent in Tbilisi; most cafes and restaurants have free fast WiFi',
    tip: 'Georgia has surprisingly affordable and fast internet. Buy a Magti SIM at Tbilisi Airport for under ₹400 — includes 10GB+ data.',
  },
};

/** Local transport options per city */
export const transportData = {
  bali: {
    city: 'Bali',
    options: [
      { icon: '🛵', name: 'Scooter Rental', avail: 'yes', detail: 'Most popular way to get around. ₹200–400/day from most warungs.', cost: '₹200–400/day' },
      { icon: '🚗', name: 'Grab / Gojek', avail: 'yes', detail: 'Ride-hailing apps work well in Kuta, Seminyak, Ubud. Significantly cheaper than taxis.', cost: '₹50–400/trip' },
      { icon: '🚕', name: 'Blue Bird Taxi', avail: 'yes', detail: 'Most reliable metered taxi. Avoid unmarked taxis.', cost: '₹120/km' },
      { icon: '🚗', name: 'Private Driver', avail: 'yes', detail: 'Full-day private drivers are incredibly affordable and recommended for longer routes.', cost: '₹1,200–1,800/day' },
      { icon: '✈️', name: 'Airport Transfer', avail: 'yes', detail: 'Official airport taxis have fixed zones. Grab is 50% cheaper but must be met outside airport grounds.', cost: '₹300–800 to Seminyak' },
    ],
  },
  bangkok: {
    city: 'Bangkok',
    options: [
      { icon: '🚇', name: 'BTS Skytrain', avail: 'yes', detail: 'Clean, fast, and covers most tourist areas. Buy a Rabbit Card for convenience.', cost: '฿16–59/trip (≈₹50–200)' },
      { icon: '🚇', name: 'MRT Subway', avail: 'yes', detail: 'Connects Chatuchak, Sukhumvit, and Silom areas.', cost: '฿17–42/trip' },
      { icon: '📱', name: 'Grab', avail: 'yes', detail: 'Best for door-to-door. More reliable than taxis in Bangkok traffic.', cost: '฿60–200/trip' },
      { icon: '🚢', name: 'Chao Phraya Boat', avail: 'yes', detail: 'Scenic way to reach riverside temples. Very cheap and avoids traffic.', cost: '฿15–40/trip' },
      { icon: '🛺', name: 'Tuk-Tuk', avail: 'limited', detail: "Touristy and overpriced. Only use if you've agreed a firm price. Avoid from strangers near temples.", cost: '฿60–200/trip (negotiate)' },
    ],
  },
  tokyo: {
    city: 'Tokyo',
    options: [
      { icon: '🚇', name: 'Tokyo Metro', avail: 'yes', detail: 'Most efficient way to get around. Buy a Suica card at any station for tap-and-go travel.', cost: '¥170–320/trip' },
      { icon: '🚄', name: 'JR Trains', avail: 'yes', detail: 'JR Pass covers Shinkansen and JR lines. Essential for day trips.', cost: 'Covered by JR Pass' },
      { icon: '📱', name: 'Uber / GO', avail: 'yes', detail: 'Available but expensive vs. trains. Useful for luggage or late nights.', cost: '¥1,000–4,000/trip' },
      { icon: '🚌', name: 'City Bus', avail: 'yes', detail: 'Flat ¥210 in most city areas. Slower than metro but scenic.', cost: '¥210/trip' },
      { icon: '🚲', name: 'Bicycle Rental', avail: 'yes', detail: 'Docomo Bike Share is excellent for exploring neighborhoods. App-based rental.', cost: '¥165/30 min' },
    ],
  },
  paris: {
    city: 'Paris',
    options: [
      { icon: '🚇', name: 'Paris Métro', avail: 'yes', detail: '14 lines covering entire city. Buy a Navigo Pass for unlimited travel.', cost: '€1.90/trip or €30/week pass' },
      { icon: '🚌', name: 'City Bus / RER', avail: 'yes', detail: 'RER B connects CDG airport to city center in 35 minutes.', cost: '€11.80 CDG→city' },
      { icon: '📱', name: 'Uber', avail: 'yes', detail: 'Available and works well. Similar to Bolt (also available).', cost: '€8–25/trip' },
      { icon: '🛴', name: "Vélib' Scooter", avail: 'yes', detail: 'City bike share system — great for exploring along the Seine.', cost: '€1 unlock + €0.10/min' },
      { icon: '🚕', name: 'Taxi', avail: 'yes', detail: 'Fixed rates from airports. Must use official taxi ranks.', cost: '€50–70 from CDG' },
    ],
  },
  barcelona: {
    city: 'Barcelona',
    options: [
      { icon: '🚇', name: 'Barcelona Metro', avail: 'yes', detail: '10 lines, T-Casual 10-trip card is best value for tourists.', cost: '€2.40/trip or €11.35 T-Casual' },
      { icon: '🚌', name: 'City Bus', avail: 'yes', detail: 'Extensive network; same tickets as Metro.', cost: '€2.40/trip' },
      { icon: '📱', name: 'Uber / Cabify', avail: 'yes', detail: 'Both work well. Cabify is popular locally.', cost: '€8–20/trip' },
      { icon: '🚲', name: 'Bicing / Donkey Bikes', avail: 'yes', detail: 'City bike share. Donkey Republic is more tourist-friendly.', cost: '€2/trip + time' },
      { icon: '✈️', name: 'Airport Transfer', avail: 'yes', detail: 'Aerobus direct from T1/T2 to Plaça de Catalunya every 5 minutes.', cost: '€6.75 Aerobus' },
    ],
  },
  istanbul: {
    city: 'Istanbul',
    options: [
      { icon: '🚇', name: 'Metro / Tram', avail: 'yes', detail: 'Tram T1 connects Grand Bazaar, Galata Bridge, and Sultanahmet. Buy an Istanbulkart.', cost: '₺10/trip (≈₹35)' },
      { icon: '🚢', name: 'Bosphorus Ferry', avail: 'yes', detail: 'Iconic way to cross between European and Asian sides. Also great for sightseeing.', cost: '₺15/trip' },
      { icon: '📱', name: 'BiTaksi / Uber', avail: 'yes', detail: 'BiTaksi is the local app. Uber also works. Better than flagging taxis.', cost: '₺80–200/trip' },
      { icon: '🚌', name: 'İETT Bus', avail: 'yes', detail: 'Istanbulkart required. Covers areas not served by metro.', cost: '₺10/trip' },
      { icon: '🚠', name: 'Teleferik / Cable Car', avail: 'yes', detail: 'Short cable car connecting Eyüp to Pierre Loti Hill. Worth it for the view.', cost: '₺10/trip' },
    ],
  },
  goa: {
    city: 'Goa',
    options: [
      { icon: '🛵', name: 'Scooter Rental', avail: 'yes', detail: 'Best way to explore Goa. Available at most beaches for ₹300–500/day.', cost: '₹300–500/day' },
      { icon: '🛺', name: 'Auto-rickshaw', avail: 'yes', detail: 'Fixed rates for short hops within towns. Negotiate before boarding.', cost: '₹50–200/trip' },
      { icon: '📱', name: 'Goa Miles / Rapido', avail: 'yes', detail: 'Goa Miles is the official app. Rapido for bike taxis in North Goa.', cost: '₹80–300/trip' },
      { icon: '🚌', name: 'KTC Bus', avail: 'yes', detail: 'Cheap government buses connecting all major towns. Slow but scenic.', cost: '₹15–60/trip' },
      { icon: '✈️', name: 'Airport Transfer', avail: 'yes', detail: 'Pre-paid taxis at Goa Airport. Goa Miles is 30% cheaper if you can walk outside.', cost: '₹400–800' },
    ],
  },
  mumbai: {
    city: 'Mumbai',
    options: [
      { icon: '🚇', name: 'Mumbai Local Train', avail: 'yes', detail: "Lifeline of the city. Buy a day pass or single journey ticket. Women's compartments are safe.", cost: '₹5–30/trip' },
      { icon: '🚇', name: 'Mumbai Metro', avail: 'yes', detail: 'Newer metro lines are AC and modern. Lines 1, 2A, 7 operational.', cost: '₹10–60/trip' },
      { icon: '📱', name: 'Ola / Uber', avail: 'yes', detail: 'Both work well. Ola is often cheaper. Surge pricing during peak hours.', cost: '₹80–400/trip' },
      { icon: '🚌', name: 'BEST Bus', avail: 'yes', detail: 'Extensive network, very cheap. AC buses available on major routes.', cost: '₹6–30/trip' },
      { icon: '✈️', name: 'Airport Transfer', avail: 'yes', detail: 'Ola/Uber from T2 (Domestic) or T1 (International). Metro line T5 under construction.', cost: '₹300–600 to South Mumbai' },
    ],
  },
};

/** Crowd index per destination, per month (1=low, 2=moderate, 3=peak) */
export const crowdData = {
  goa:       [3, 2, 2, 1, 1, 1, 2, 2, 1, 2, 3, 3],
  manali:    [1, 1, 1, 1, 2, 3, 3, 3, 2, 1, 1, 1],
  bali:      [2, 2, 2, 1, 1, 1, 3, 3, 2, 1, 2, 2],
  paris:     [2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 1, 2],
  santorini: [1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 1, 1],
  tokyo:     [2, 2, 3, 3, 2, 2, 2, 2, 2, 3, 3, 2],
  jaipur:    [2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 3],
  ladakh:    [1, 1, 1, 1, 1, 2, 3, 3, 2, 1, 1, 1],
};
