/**
 * hidden-gems.js
 * Single source of truth for hidden gems and "miss spots" data.
 */

export const hiddenGems = [
  { name:'Kalga Village', loc:'Kheerganga, Himachal Pradesh', type:'Village', desc:'A secret hippie village at 7,700 ft with cozy cafes, apple orchards, and the famous Kheerganga hot springs trek.', budget:'₹500/day', icon:'🏘️', tip:'Stay at a local homestay for ₹400/night' },
  { name:'Lamayuru Moonland', loc:'Ladakh, India', type:'Landscape', desc:'An otherworldly lunar landscape between Srinagar and Leh — looks like a scene straight from another planet.', budget:'Free (en route)', icon:'🌙', tip:'Stop here on the Leh–Srinagar highway' },
  { name:'Gandikota Gorge', loc:'Kadapa, Andhra Pradesh', type:'Canyon', desc:"India's Grand Canyon — a stunning gorge with 16th-century fort ruins that remains beautifully undiscovered.", budget:'₹500–800', icon:'🏜️', tip:'Camp overnight for a magical sunrise' },
  { name:'Dhanushkodi Ghost Town', loc:'Rameswaram, Tamil Nadu', type:'Historical', desc:"A hauntingly beautiful ghost town at India's southernmost tip, abandoned after a 1964 cyclone. Surreal and magical.", budget:'₹400–600', icon:'🏚️', tip:'Take a 4x4 jeep from Rameswaram' },
  { name:'Tabo Monastery', loc:'Spiti Valley, Himachal', type:'Spiritual', desc:'Over 1,000 years old — the Ajanta of the Himalayas with the finest ancient Buddhist murals, rarely crowded.', budget:'₹100 entry', icon:'🛕', tip:'Attend morning prayers at 6 AM for an unforgettable experience' },
  { name:'Divar Island', loc:'Old Goa', type:'Island', desc:'A quiet river island in the Mandovi with Portuguese-era villages, zero tourist crowds, and pure countryside charm.', budget:'Free (ferry only)', icon:'🌿', tip:'Rent a cycle from the ferry landing at ₹100' },
  { name:'Autumn Valley, Dalhousie', loc:'Himachal Pradesh', type:'Valley', desc:'A hidden meadow near Dalhousie with no tourist crowds — just pine trees, wildflowers, and mountain silence.', budget:'₹300', icon:'🍁', tip:'Best in October–November for vivid autumn colors' },
  { name:'Phyang Village', loc:'Ladakh', type:'Village', desc:'A peaceful Ladakhi village bypassed by tourists, with a stunning monastery, apricot orchards, and welcoming locals.', budget:'Free to explore', icon:'🌸', tip:'Visit in July for the Phyang Tsedup festival' },
  { name:'Mawlynnong Village', loc:'Meghalaya', type:'Village', desc:"Asia's cleanest village — living root bridges, bamboo walkways, sky walks, and breathtaking misty landscapes.", budget:'₹500–1,000', icon:'🌱', tip:'Hire a local guide for the root bridge trail' },
  { name:'Magnetic Hill Café', loc:'Leh, Ladakh', type:'Café', desc:'A tiny café near the famous Magnetic Hill where time slows down — try the yak butter tea and legendary apple pie.', budget:'₹200–400', icon:'☕', tip:'The apple pie is said to be the best in Ladakh' },
  { name:'Kuntala Waterfall', loc:'Adilabad, Telangana', type:'Waterfall', desc:'The highest waterfall in Telangana that most tourists never discover — monsoon magic at its absolute finest.', budget:'₹200 entry', icon:'💧', tip:'Visit July–September for the waterfall in full glory' },
  { name:'Chopta Meadows', loc:'Uttarakhand', type:'Nature', desc:"A peaceful high-altitude meadow known as Uttarakhand's mini Switzerland — rhododendrons, snow, and silence.", budget:'₹3,000–5,000', icon:'⛺', tip:'Camp here for zero light pollution and incredible stargazing' }
];

/** Destinations tourists commonly miss (shown in the "Don't Miss" section) */
export const missSpots = [
  { name:'Majuli Island', loc:'Assam', cat:'nature', desc:"World's largest river island — Assamese culture, masks, monasteries, and a disappearing wonder.", tip:'Best Oct–Mar before floods' },
  { name:'Aizawl', loc:'Mizoram', cat:'culture', desc:'A hilltop city of extraordinary beauty and the most unique culture in Northeast India.', tip:'Try Bai stew and attend Chapchar Kut (March)' },
  { name:'Dzukou Valley', loc:'Nagaland/Manipur', cat:'nature', desc:'The Valley of Flowers of Northeast India — seasonal blooms, zero tourists, pristine wilderness.', tip:'Trek from Viswema village; camp at the valley base' },
  { name:'Gandikota', loc:'Andhra Pradesh', cat:'adventure', desc:"India's Grand Canyon with a 16th-century fort that almost no one knows about.", tip:'Camp overnight; the gorge turns gold at sunrise' },
  { name:'Chettinad', loc:'Tamil Nadu', cat:'culture', desc:'A lost civilization of palatial mansions, heritage cuisine, and hand-tiled floors that rival the world.', tip:'Stay at a heritage mansion homestay' },
  { name:'Munsiyari', loc:'Uttarakhand', cat:'mountains', desc:'A pristine Himalayan town with direct views of the Panchachuli peaks — almost no crowds.', tip:'Visit for rhododendron blooms in April–May' },
  { name:'Varkala Cliff', loc:'Kerala', cat:'beaches', desc:"A red laterite cliff with a beach below — Kerala's most dramatic coastline and far less crowded than Kovalam.", tip:'Cliff-top restaurants are overpriced; eat in town' },
  { name:'Hemis', loc:'Ladakh', cat:'spiritual', desc:"Ladakh's largest and wealthiest monastery with a twice-a-decade appearance of the massive Thangka.", tip:'Visit during Hemis Festival in July' }
];
