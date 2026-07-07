/**
 * checklist.js
 * Packing checklist data organised by trip type and category.
 */

export const checklistData = {
  general: {
    'Documents': [
      { id:'cl_pass',  label:'Passport / National ID card',           priority:'essential' },
      { id:'cl_tick',  label:'Flight / Train / Bus tickets',          priority:'essential' },
      { id:'cl_hotel', label:'Hotel booking confirmation',            priority:'essential' },
      { id:'cl_ins',   label:'Travel insurance documents',            priority:'important' },
      { id:'cl_visa',  label:'Visa (if required for destination)',     priority:'essential' },
      { id:'cl_cash',  label:'Cash & travel debit card',              priority:'essential' },
      { id:'cl_ec',    label:'Emergency contact list',                 priority:'important' },
    ],
    'Electronics': [
      { id:'cl_ph',  label:'Smartphone & charger',          priority:'essential' },
      { id:'cl_pb',  label:'Power bank (10,000+ mAh)',      priority:'important' },
      { id:'cl_ad',  label:'Travel adapter (universal)',    priority:'important' },
      { id:'cl_cam', label:'Camera & memory cards',         priority:'optional'  },
      { id:'cl_ear', label:'Earphones / headphones',        priority:'optional'  },
    ],
    'Clothing': [
      { id:'cl_clo', label:'Clothes (1 outfit per day)',      priority:'essential' },
      { id:'cl_un',  label:'Underwear & socks (extra pair)', priority:'essential' },
      { id:'cl_pj',  label:'Sleepwear / pajamas',            priority:'important' },
      { id:'cl_jk',  label:'Light jacket or cardigan',       priority:'important' },
      { id:'cl_sh',  label:'Comfortable walking shoes',      priority:'essential' },
      { id:'cl_fo',  label:'One formal / smart outfit',      priority:'optional'  },
    ],
    'Toiletries': [
      { id:'cl_tb',  label:'Toothbrush & toothpaste',  priority:'essential' },
      { id:'cl_sp',  label:'Shampoo & conditioner',    priority:'essential' },
      { id:'cl_bs',  label:'Body wash / soap',         priority:'essential' },
      { id:'cl_deo', label:'Deodorant',                priority:'essential' },
      { id:'cl_fw',  label:'Face wash & moisturizer',  priority:'important' },
      { id:'cl_sun', label:'Sunscreen SPF 30+',        priority:'important' },
    ],
    'Health': [
      { id:'cl_med', label:'Regular prescription medicines',      priority:'essential' },
      { id:'cl_par', label:'Painkiller (paracetamol / ibuprofen)', priority:'important' },
      { id:'cl_ant', label:'Antiseptic cream & band-aids',         priority:'important' },
      { id:'cl_anac',label:'Antacid / digestion tablets',          priority:'important' },
      { id:'cl_san', label:'Hand sanitizer',                       priority:'important' },
    ],
    'Accessories': [
      { id:'cl_sg',  label:'Sunglasses',                       priority:'important' },
      { id:'cl_bp',  label:'Day backpack or handbag',          priority:'important' },
      { id:'cl_wb',  label:'Reusable water bottle',            priority:'important' },
      { id:'cl_umb', label:'Compact umbrella / rain cover',    priority:'optional'  },
      { id:'cl_sn',  label:'Travel snacks',                    priority:'optional'  },
      { id:'cl_np',  label:'Travel neck pillow',               priority:'optional'  },
    ],
  },

  beach: {
    'Documents': [
      { id:'b_pass', label:'Passport / ID',             priority:'essential' },
      { id:'b_tick', label:'Travel tickets & bookings', priority:'essential' },
      { id:'b_ins',  label:'Travel insurance',          priority:'important' },
    ],
    'Beach Essentials': [
      { id:'b_sw',  label:'Swimwear (2–3 sets)',                priority:'essential' },
      { id:'b_sun', label:'Sunscreen SPF 50+ (water resistant)',priority:'essential' },
      { id:'b_sg',  label:'UV-protection sunglasses',          priority:'essential' },
      { id:'b_tw',  label:'Beach towel (quick-dry)',           priority:'essential' },
      { id:'b_ff',  label:'Flip flops / sandals',              priority:'essential' },
      { id:'b_bag', label:'Waterproof beach bag',              priority:'important' },
      { id:'b_sn',  label:'Snorkel set',                       priority:'optional'  },
      { id:'b_rg',  label:'Rash guard / swim shirt',          priority:'optional'  },
      { id:'b_cu',  label:'Beach cover-up or sarong',         priority:'important' },
    ],
    'Electronics': [
      { id:'b_ph', label:'Phone & charger',             priority:'essential' },
      { id:'b_wc', label:'Waterproof phone case',       priority:'important' },
      { id:'b_pb', label:'Power bank',                  priority:'important' },
      { id:'b_go', label:'GoPro / underwater camera',   priority:'optional'  },
    ],
    'Health': [
      { id:'b_as',  label:'After-sun lotion / aloe vera gel', priority:'important' },
      { id:'b_ms',  label:'Motion sickness tablets',          priority:'optional'  },
      { id:'b_med', label:'Regular medicines',                priority:'essential' },
      { id:'b_ir',  label:'Insect repellent',                 priority:'important' },
    ],
  },

  mountain: {
    'Documents': [
      { id:'m_id',   label:'ID / Passport',                          priority:'essential' },
      { id:'m_pm',   label:'Inner line permit (if required)',         priority:'essential' },
      { id:'m_tick', label:'Travel & accommodation bookings',         priority:'essential' },
      { id:'m_ins',  label:'Travel insurance with medical cover',     priority:'essential' },
    ],
    'Layered Clothing': [
      { id:'m_th',  label:'Thermal innerwear (top & bottom)',        priority:'essential' },
      { id:'m_fl',  label:'Fleece jacket or heavy sweater',          priority:'essential' },
      { id:'m_dj',  label:'Down / winter jacket (−10°C rated)',      priority:'essential' },
      { id:'m_tp',  label:'Trekking pants (wind resistant)',         priority:'essential' },
      { id:'m_rj',  label:'Waterproof outer shell / rain jacket',    priority:'important' },
      { id:'m_ws',  label:'Woolen socks (3+ pairs)',                 priority:'essential' },
      { id:'m_gl',  label:'Insulated gloves',                        priority:'essential' },
      { id:'m_bn',  label:'Warm beanie / thermal hat',               priority:'essential' },
      { id:'m_sc',  label:'Neck gaiter / balaclava',                 priority:'important' },
    ],
    'Footwear': [
      { id:'m_tb', label:'Ankle-support trekking boots (waterproof)', priority:'essential' },
      { id:'m_ss', label:'Camp sandals',                              priority:'optional'  },
    ],
    'Gear': [
      { id:'m_tp2', label:'Trekking poles',               priority:'important' },
      { id:'m_hl',  label:'Headlamp + spare batteries',  priority:'essential' },
      { id:'m_slb', label:'Sleeping bag (temperature rated)', priority:'important' },
      { id:'m_dp',  label:'Daypack 20–30L',              priority:'essential' },
    ],
    'Health & Safety': [
      { id:'m_alt', label:'Altitude sickness medicine (Diamox)',   priority:'important' },
      { id:'m_pi',  label:'Painkiller / ibuprofen',                priority:'essential' },
      { id:'m_sn',  label:'Sunscreen SPF 50+ (UV stronger at altitude)', priority:'essential' },
      { id:'m_lb',  label:'SPF lip balm',                          priority:'essential' },
      { id:'m_fa',  label:'Complete first aid kit',                priority:'essential' },
      { id:'m_eb',  label:'High-energy snacks & bars',             priority:'important' },
      { id:'m_wp',  label:'Water purification tablets',            priority:'important' },
    ],
  },

  international: {
    'Critical Documents': [
      { id:'i_pass', label:'Passport (valid 6+ months beyond trip)',  priority:'essential' },
      { id:'i_visa', label:'Visa (apply well in advance)',            priority:'essential' },
      { id:'i_tick', label:'International flight tickets (printed)',  priority:'essential' },
      { id:'i_ins',  label:'International travel insurance',          priority:'essential' },
      { id:'i_fx',   label:'Forex card + local currency',             priority:'essential' },
      { id:'i_emb',  label:'Embassy & emergency contact numbers',     priority:'important' },
      { id:'i_cop',  label:'Photocopies of all documents',            priority:'important' },
    ],
    'Electronics': [
      { id:'i_ph',  label:'Phone & charger',          priority:'essential' },
      { id:'i_ad',  label:'Universal travel adapter', priority:'essential' },
      { id:'i_pb',  label:'Power bank',               priority:'important' },
      { id:'i_lap', label:'Laptop (if needed)',        priority:'optional'  },
    ],
    'Clothing': [
      { id:'i_clo', label:'Weather-appropriate clothing',       priority:'essential' },
      { id:'i_lay', label:'Layering options',                   priority:'important' },
      { id:'i_sm',  label:'Smart casual outfit (for nice dinners)', priority:'optional'  },
    ],
    'Health & Safety': [
      { id:'i_vac', label:'Required vaccinations (check destination)', priority:'essential' },
      { id:'i_med', label:'Prescription medicines + extra supply',     priority:'essential' },
      { id:'i_kit', label:'Travel health kit',                         priority:'important' },
      { id:'i_san', label:'Hand sanitizer',                            priority:'important' },
    ],
    'Connectivity': [
      { id:'i_sim', label:'International SIM / eSIM',              priority:'important' },
      { id:'i_map', label:'Offline maps downloaded (Google Maps)', priority:'important' },
      { id:'i_tr',  label:'Translation app installed',             priority:'optional'  },
      { id:'i_vpn', label:'VPN app (for some countries)',           priority:'optional'  },
    ],
  },

  camping: {
    'Documents': [
      { id:'c_id',  label:'ID & national park permits', priority:'essential' },
      { id:'c_ins', label:'Travel insurance',           priority:'essential' },
    ],
    'Shelter & Sleep': [
      { id:'c_tent', label:'Tent (weather-rated, stakes & fly)', priority:'essential' },
      { id:'c_slb',  label:'Sleeping bag (season-appropriate)', priority:'essential' },
      { id:'c_pad',  label:'Sleeping pad / foam mat',            priority:'essential' },
      { id:'c_tar',  label:'Extra tarp / rain fly',              priority:'important' },
    ],
    'Clothing': [
      { id:'c_bl', label:'Moisture-wicking base layers',  priority:'essential' },
      { id:'c_ml', label:'Warm mid-layer (fleece)',        priority:'essential' },
      { id:'c_rl', label:'Waterproof outer layer',         priority:'essential' },
      { id:'c_cs', label:'Camp sandals / crocs',           priority:'important' },
    ],
    'Cooking & Food': [
      { id:'c_stv', label:'Camping stove + gas canister',   priority:'important' },
      { id:'c_cw',  label:'Lightweight cookware set',        priority:'important' },
      { id:'c_ut',  label:'Cutlery, cup, plate',             priority:'essential' },
      { id:'c_fd',  label:'Non-perishable food supplies',    priority:'essential' },
      { id:'c_wf',  label:'Water filter / purification',     priority:'essential' },
    ],
    'Safety & Tools': [
      { id:'c_hl',  label:'Headlamp + spare batteries',                priority:'essential' },
      { id:'c_nav', label:'Topographic map & compass',                 priority:'important' },
      { id:'c_mt',  label:'Multi-tool / knife',                        priority:'important' },
      { id:'c_fa',  label:'Full first aid kit',                        priority:'essential' },
      { id:'c_fs',  label:'Fire starter (lighter + waterproof matches)', priority:'essential' },
      { id:'c_wh',  label:'Emergency whistle',                         priority:'important' },
      { id:'c_sun', label:'Sunscreen & bug repellent',                 priority:'important' },
    ],
  },
};
