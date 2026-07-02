/**
 * Product catalog — add entries as you receive product details and images.
 * Place images in public/images/products/
 *
 * @typedef {Object} ProductImage
 * @property {string} src
 * @property {string} alt
 * @property {string} [label]
 *
 * @typedef {Object} ProductSpec
 * @property {string} label
 * @property {string} value
 *
 * @typedef {Object} Product
 * @property {string} id - URL slug
 * @property {string} name
 * @property {string} [navLabel]
 * @property {string} tagline
 * @property {string} description
 * @property {string} [cardSummary]
 * @property {string[]} [paragraphs]
 * @property {string[]} features
 * @property {string[]} [applications]
 * @property {ProductSpec[]} [specs]
 * @property {string|null} [image] - Primary image for listing cards
 * @property {ProductImage[]} [images] - Gallery views (overview section)
 * @property {string} [imageAlt]
 */

const DIGITRANS_IMAGES_BASE = '/images/products/digitrans-htt-411'
const DIGIMACKS_IMAGES_BASE = '/images/products/digimacks-s1'
const DIGITRANS_DPT_IMAGES_BASE = '/images/products/digitrans-dpt-411'
const DIGITRAK_AHU_IMAGES_BASE = '/images/products/digitrak-ahu-monitor'
const DIGISLEEK_IMAGES_BASE = '/images/products/digisleek'
const UNIVERSAL_GATEWAY_IMAGES_BASE = '/images/products/universal-gateway'
const DIGISENSE_DS_IMAGES_BASE = '/images/products/digisense-ds'

/** @type {Product[]} */
export const PRODUCTS = [
  {
    id: 'digiclean-crm',
    name: 'DIGICLEAN Clean Room Monitor',
    navLabel: 'DIGICLEAN CRM',
    tagline: 'Model CRM — Temperature, Humidity & Differential Pressure',
    cardSummary:
      'Flush-mount cleanroom monitor with 4.3" TFT, integrated sensors, and RS485 Modbus RTU for BMS integration.',
    description:
      'Designed to monitor Temperature, Humidity, and Differential Pressure in critical cleanroom environments. Supports flush mounting on modular or brick walls with integrated or external sensor configurations.',
    paragraphs: [
      'In the integrated model, Temperature and Humidity sensors are front-mounted on a stainless steel plate, while differential pressure ports are located at the rear with hose nozzle connections.',
      'A vibrant 4.3" TFT display provides clear multi-parameter visualization, with a built-in buzzer and LED indicators for real-time alarms and status alerts.',
      'With RS485 Modbus RTU communication, the CRM integrates seamlessly into Building Management Systems (BMS) — ideal for pharmaceutical and cleanroom applications.',
    ],
    features: [
      'Microcontroller-based design',
      'Touchscreen interface for easy programming',
      'Measures Temperature, Humidity & Differential Pressure',
      '4.3" TFT color display',
      'Real-time clock with battery backup',
      'Selectable pressure units: mm Wc & Pa',
      '3 programmable audio-visual alarms',
      'Password-protected programming',
      'RS485 Modbus RTU for BMS integration',
    ],
    applications: [
      'Pharmaceutical clean rooms',
      'Hospitals & operation theaters',
      'Medical device manufacturing',
      'HVAC systems',
      'Semiconductor manufacturing',
      'Electronic hardware manufacturing',
    ],
    specs: [
      { label: 'Supply voltage', value: '24 VDC' },
      { label: 'Humidity range', value: '0–100% RH (±2.0%)' },
      { label: 'Temperature range', value: '0 to 50°C (±0.5°C)' },
      { label: 'Differential pressure', value: '0–6 / 10 / 25 / 50 mm Wc' },
      { label: 'Resolution', value: '0.1 (RH/Temp); 0.1 mm Wc / 1 Pa' },
      { label: 'Display', value: '4.3" TFT color touchscreen' },
      { label: 'Communications', value: 'Isolated RS485, Modbus RTU, 19200 baud, 8N1' },
      { label: 'Alarms', value: 'Inbuilt buzzer — high/low on all parameters' },
      { label: 'Operating conditions', value: '10°C to 60°C, <90% RH (non-condensing)' },
      { label: 'Construction', value: 'SS 304 — 190 × 190 mm front plate' },
      { label: 'Enclosure', value: 'SS 304 back — 150 × 150 × 35 mm' },
      { label: 'Weight', value: '700 g' },
    ],
    image: '/images/products/digiclean-crm.png',
    imageAlt: 'DIGICLEAN Clean Room Monitor CRM with 4.3 inch TFT display on stainless steel plate',
  },
  {
    id: 'digitrans-htt-411',
    name: 'DIGITRANS HTT - 411',
    navLabel: 'DIGITRANS HTT-411',
    tagline: 'Humidity & Temperature Transmitter — IP65 ABS Enclosure',
    cardSummary:
      'Wall or panel-mount RH/T transmitter with ±2% RH and ±0.5°C accuracy, USB configuration, and 4–20 mA / 0–10 V outputs.',
    description:
      'DIGITRANS HTT - 411 is a humidity and temperature transmitter housed in a rugged IP65 ABS enclosure, suitable for wall or panel mounting. Designed for pharmaceutical cleanrooms and HVAC applications, it offers high precision with ±0.5% accuracy for temperature and ±2.0% for RH.',
    paragraphs: [
      'Configuration is easy via USB interface to PC. Dual analog outputs (4–20 mA or 0–10 V, 3-wire) support integration with PLCs, BMS, and process controllers.',
      'RS485 communication is available alongside USB for networked monitoring. The protected sensor probe allows reliable measurement in clean air and non-corrosive gas environments.',
    ],
    features: [
      'Easy to install — suitable for panel mounting',
      'Easy to configure via USB interface',
      'Accuracy ±2% RH and ±0.5°C temperature',
      'Output signal: 0–10 V / 4–20 mA (3-wire)',
      'USB and RS485 communication',
      'IP65-rated ABS enclosure',
    ],
    applications: [
      'Clean room monitoring',
      'HVAC & process control',
      'Pharmaceutical equipment',
      'Greenhouse monitoring',
    ],
    specs: [
      { label: 'Media', value: 'Air, non-combustible, non-corrosive gases' },
      { label: 'Power supply', value: '24 VDC' },
      { label: 'Optional output', value: '4–20 mA / 0–10 V (3-wire)' },
      { label: 'Communication', value: 'USB, RS485' },
      { label: 'Humidity range / accuracy', value: '0 to 100% RH (±2.0%)' },
      { label: 'Temperature range / accuracy', value: '0°C to 50°C (±0.5°C)' },
      { label: 'Loop resistance', value: '250 Ω @ 12–24 VDC' },
      { label: 'Connections', value: 'Screw terminals' },
      { label: 'Enclosure', value: 'ABS, IP65 rated' },
    ],
    image: `${DIGITRANS_IMAGES_BASE}/front.png`,
    imageAlt: 'DIGITRANS HTT-411 humidity and temperature transmitter front view',
    images: [
      {
        src: `${DIGITRANS_IMAGES_BASE}/front.png`,
        alt: 'DIGITRANS HTT-411 front view with sensor probe and cable gland',
        label: 'Front view',
      },
      {
        src: `${DIGITRANS_IMAGES_BASE}/angle.png`,
        alt: 'DIGITRANS HTT-411 three-quarter angle view',
        label: 'Angle view',
      },
      {
        src: `${DIGITRANS_IMAGES_BASE}/perspective.png`,
        alt: 'DIGITRANS HTT-411 perspective view showing mounting base',
        label: 'Perspective',
      },
      {
        src: `${DIGITRANS_IMAGES_BASE}/side-label.png`,
        alt: 'DIGITRANS HTT-411 side view with specification label',
        label: 'Side — label detail',
      },
      {
        src: `${DIGITRANS_IMAGES_BASE}/side.png`,
        alt: 'DIGITRANS HTT-411 side profile with sensor probe',
        label: 'Side profile',
      },
    ],
  },
  {
    id: 'digimacks-s1',
    name: 'DIGIMACKS® S1 Series',
    navLabel: 'DIGIMACKS S1',
    tagline: 'Digital Pressure Transmitter — Panel Mount',
    cardSummary:
      'Compact digital pressure transmitter with MEMS sensor, 4-digit LED display, keypad control, and optional 4–20 mA, RS485, or relay outputs.',
    description:
      'DIGIMACKS® S1 Series is a compact microcontroller-based digital pressure transmitter for measuring gauge, differential, and absolute pressure up to 1000 mm Wc. It features a highly stable MEMS pressure sensor with up to ±0.5% full-scale accuracy and displays readings in mm Wc or Pa.',
    paragraphs: [
      'The bright 7-segment LED shows pressure values, set points, and overflow alerts — a reliable alternative to mechanical gauges for panel-mount applications.',
      'User-friendly keypad on the face supports configuration without external tools. Optional password protection, audio-visual alarms (green normal, red alert, yellow delay), and multiple output options suit cleanroom and HVAC integration.',
    ],
    features: [
      'Easy to install — suitable for panel mounting',
      'Optional password protection',
      'User-friendly keypad on face',
      'Audio-visual alarm (green / red / yellow)',
      'High performance, low cost — ±0.5% FS accuracy',
      'Optional outputs: 0–10 V, 4–20 mA, SPDT relay, RS485',
      'Measures positive, negative & differential pressure',
      'Selectable units: mm Wc & Pa',
    ],
    applications: [
      'Laminar flow benches',
      'Biosafety cabinets',
      'Cleanroom pressure monitoring',
      'Air filters & AHU',
      'HVAC systems',
      'Pharmaceutical equipment',
    ],
    specs: [
      { label: 'Media', value: 'Air, non-combustible, non-corrosive gases' },
      { label: 'Power supply', value: '24 VDC' },
      { label: 'Accuracy', value: '±1.0% F.S (≤10 mm Wc); ±0.5% F.S (≥25 mm Wc)' },
      { label: 'Display', value: '0.56" 4-digit 7-segment LED' },
      { label: 'Alarms', value: 'Audio-visual for low/high pressure' },
      { label: 'Optional outputs', value: '4–20 mA, 0–10 V, relay, RS485' },
      { label: 'Response time', value: '100–3000 ms (menu selectable)' },
      { label: 'Operating temperature', value: '10°C to 60°C' },
      { label: 'User interface', value: 'Digital push buttons' },
      { label: 'Housing', value: 'Glass-filled nylon & SS304 front' },
      { label: 'Process connection', value: 'Push-fit for 3/16" ID tubing' },
      { label: 'Electrical connection', value: 'Screw terminals' },
      { label: 'Weight & size', value: '230 g — Ø114 × 30 mm deep' },
    ],
    image: `${DIGIMACKS_IMAGES_BASE}/front.png`,
    imageAlt: 'DIGIMACKS S1 Series digital pressure transmitter front panel with LED display',
    images: [
      {
        src: `${DIGIMACKS_IMAGES_BASE}/front.png`,
        alt: 'DIGIMACKS S1 Series front view with 7-segment LED display',
        label: 'Front view',
      },
      {
        src: `${DIGIMACKS_IMAGES_BASE}/angle.png`,
        alt: 'DIGIMACKS S1 Series three-quarter angle view',
        label: 'Angle view',
      },
      {
        src: `${DIGIMACKS_IMAGES_BASE}/front-ports.png`,
        alt: 'DIGIMACKS S1 Series front view showing process connections',
        label: 'Front — process ports',
      },
      {
        src: `${DIGIMACKS_IMAGES_BASE}/front-cable.png`,
        alt: 'DIGIMACKS S1 Series with cable connection',
        label: 'Front — installed',
      },
      {
        src: `${DIGIMACKS_IMAGES_BASE}/rear.png`,
        alt: 'DIGIMACKS S1 Series rear view with HIGH and LOW pressure ports',
        label: 'Rear view',
      },
      {
        src: `${DIGIMACKS_IMAGES_BASE}/rear-terminals.png`,
        alt: 'DIGIMACKS S1 Series rear view with screw terminals and wiring',
        label: 'Rear — terminals',
      },
    ],
  },
  {
    id: 'digitrans-dpt-411',
    name: 'DIGITRANS DPT - 411',
    navLabel: 'DIGITRANS DPT-411',
    tagline: 'Differential Pressure Transmitter — IP65 ABS Enclosure',
    cardSummary:
      'Wall or panel-mount differential pressure transmitter with ±0.5% accuracy, USB configuration, and 4–20 mA / 0–10 V outputs — ranges from 0–10 to 0–400 mm Wc.',
    description:
      'DIGITRANS DPT - 411 is a differential pressure transmitter housed in a rugged IP65 ABS enclosure, suitable for wall or panel mounting. Designed for pharmaceutical cleanrooms and HVAC applications, it offers 0.5% accuracy and USB-based PC configuration.',
    paragraphs: [
      'Pressure is displayed in Pa or mm Wc. Available ranges span 0–10 mm Wc through 0–400 mm Wc to match cleanroom, filter monitoring, and process control requirements.',
      'RS485 communication is available alongside USB for integration with BMS and supervisory systems. Push-fit process connections and screw terminal wiring simplify field installation.',
    ],
    features: [
      'Easy to install — suitable for panel mounting',
      'Easy to configure via USB interface',
      'Accuracy ±0.5%',
      'Output signal: 0–10 V / 4–20 mA (3-wire)',
      'Two selectable units: mm Wc and Pa',
      'USB and RS485 communication',
    ],
    applications: [
      'Pressure monitoring in clean rooms',
      'Monitoring air filters & AHU',
      'HVAC & process control',
      'Pharmaceutical equipment',
    ],
    specs: [
      { label: 'Media', value: 'Air, non-combustible, non-corrosive gases' },
      { label: 'Power supply', value: '24 VDC' },
      { label: 'Optional output', value: '4–20 mA / 0–10 V (3-wire)' },
      { label: 'Communication', value: 'USB, RS485' },
      { label: 'Accuracy', value: '±0.5%' },
      { label: 'Operating temperature', value: '10°C to 60°C' },
      { label: 'Loop resistance', value: '250 Ω @ 12–24 VDC' },
      { label: 'Electrical connection', value: 'Screw terminals' },
      { label: 'Process connection', value: 'Push-fit for 3/16" ID tubing' },
      { label: 'Enclosure', value: 'ABS, IP65' },
      { label: 'Weight', value: '100 g' },
    ],
    image: `${DIGITRANS_DPT_IMAGES_BASE}/front.png`,
    imageAlt: 'DIGITRANS DPT-411 differential pressure transmitter front view',
    images: [
      {
        src: `${DIGITRANS_DPT_IMAGES_BASE}/front.png`,
        alt: 'DIGITRANS DPT-411 front view with push-fit pressure ports',
        label: 'Front view',
      },
      {
        src: `${DIGITRANS_DPT_IMAGES_BASE}/angle.png`,
        alt: 'DIGITRANS DPT-411 isometric angle view',
        label: 'Angle view',
      },
      {
        src: `${DIGITRANS_DPT_IMAGES_BASE}/perspective.png`,
        alt: 'DIGITRANS DPT-411 perspective with cable gland and label',
        label: 'Perspective',
      },
      {
        src: `${DIGITRANS_DPT_IMAGES_BASE}/side.png`,
        alt: 'DIGITRANS DPT-411 side view with process connections',
        label: 'Side view',
      },
    ],
  },
  {
    id: 'digitrak-ahu-monitor',
    name: 'DIGITRAK AHU Monitor',
    navLabel: 'DIGITRAK AHU',
    tagline: '7-Segment or 4.3" TFT — Three-Stage Filter DP Monitoring',
    cardSummary:
      'AHU filter-stage differential pressure monitor with MEMS sensor (±0.5% F.S.), 7-segment LED or 4.3" TFT display, and programmable audio-visual alarms.',
    description:
      'DIGITRAK AHU Monitor is designed to measure and display differential pressure across three filter stages in an Air Handling Unit (AHU) system. It features a high-accuracy MEMS pressure sensor (±0.5% F.S.) for reliable readings in mm Wc or Pa.',
    paragraphs: [
      'Available with a bright 7-segment LED or 4.3" full-color TFT display for real-time pressure monitoring. Audible alarms and visual indicators alert users when pressure exceeds preset limits — enabling timely filter replacement to maintain airflow, indoor air quality, and energy efficiency.',
      'This digital monitor is a cost-effective, precise alternative to conventional analog pressure gauges. Choose the 7-segment model with magnetic switch programming or the TFT model with touchscreen configuration.',
    ],
    features: [
      'Microcontroller-based architecture for stable operation',
      'Magnetic switch programming (7-segment model)',
      'Touchscreen interface (TFT model)',
      'Monitors differential pressure across three filter stages',
      'Display: 0.56" seven-segment or 4.3" full-color TFT',
      'Real-time clock with long-life battery backup',
      'Selectable units: mm Wc or Pa',
      'Three programmable audio-visual alarms',
      'Password-protected setup',
      'Optional 4–20 mA / 0–10 V and RS485 outputs',
    ],
    applications: [
      'Pharmaceutical and cleanroom manufacturing',
      'Sterile processing environments',
      'Hospitals and healthcare facilities',
      'HVAC systems — commercial and industrial',
      'Semiconductor manufacturing',
      'Data centers and critical environmental zones',
    ],
    specs: [
      { label: 'Media compatibility', value: 'Air, non-combustible, non-corrosive gases' },
      { label: 'Supply voltage', value: '12–24 VDC' },
      { label: 'Accuracy', value: '≤10 mm Wc: ±1.0% F.S.; ≥25 mm Wc: ±0.5% F.S.' },
      { label: 'Display options', value: '0.56" 4-digit 7-segment LED or 4.3" TFT' },
      { label: 'Alarms', value: 'Inbuilt audio-visual high/low pressure' },
      { label: 'Optional outputs', value: '4–20 mA / 0–10 V (3-wire), RS485' },
      { label: 'Response time', value: '100–3000 ms (menu selectable)' },
      { label: 'Operating temperature', value: '10°C to 60°C' },
      { label: 'User interface', value: 'TFT: touchscreen; 7-seg: magnetic key switch' },
      { label: 'Electrical connection', value: 'Screw terminals' },
      { label: 'Process connection', value: 'Push-fit for 3/16" ID tubing' },
      { label: 'Weight', value: '700 g' },
      { label: 'Front plate (SS 304)', value: '175 × 175 mm' },
      { label: 'Back enclosure (SS 304)', value: '150 × 150 × 35 mm' },
    ],
    image: `${DIGITRAK_AHU_IMAGES_BASE}/front.png`,
    imageAlt: 'DIGITRAK AHU Monitor 7-segment display on stainless steel faceplate',
    images: [
      {
        src: `${DIGITRAK_AHU_IMAGES_BASE}/front.png`,
        alt: 'DIGITRAK AHU Monitor front view with 7-segment LED readings',
        label: 'Front view',
      },
      {
        src: `${DIGITRAK_AHU_IMAGES_BASE}/angle.png`,
        alt: 'DIGITRAK AHU Monitor three-quarter angle view',
        label: 'Angle view',
      },
      {
        src: `${DIGITRAK_AHU_IMAGES_BASE}/perspective.png`,
        alt: 'DIGITRAK AHU Monitor perspective with sensor probe',
        label: 'Perspective',
      },
    ],
  },
  {
    id: 'digisleek',
    name: 'DIGISLEEK',
    navLabel: 'DIGISLEEK',
    tagline: 'Digital Pressure Transmitter — 7-Segment or 1.8" TFT',
    cardSummary:
      'Panel-mount digital pressure transmitter with MEMS sensor (±0.5% FS), TFT or 7-segment display, and optional 4–20 mA / RS485 outputs — up to 700 mm Wc.',
    description:
      'DIGISLEEK microcontroller-based digital pressure transmitters measure differential, absolute, and gauge pressure up to 700 mm Wc. Engineered for accuracy and stability with a high-performance MEMS sensor at ±0.5% full-scale accuracy in mm Wc or Pa.',
    paragraphs: [
      'Bright 7-segment LED or high-resolution 1.8" TFT display shows live pressure readings, setpoints, and overflow alerts — a smart digital alternative to traditional mechanical gauges.',
      'Suitable for 50 mm composite panels and wall-mount installations. Ideal for HVAC, cleanrooms, laminar flow benches, and other precision-controlled environments.',
    ],
    features: [
      'Easy to install — suitable for panel mounting',
      'Optional password protection',
      'User-friendly keypad on face',
      'Audio-visual alarm (green / red / yellow)',
      'High performance, low cost — ±0.5% FS accuracy',
      'Optional outputs: 0–10 V, 4–20 mA, RS485',
      'Measures positive, negative & differential pressure',
      'Selectable units: mm Wc & Pa',
    ],
    applications: [
      'Laminar flow bench',
      'Bio safety cabinet & paint booth',
      'Pressure monitoring in clean rooms',
      'Monitoring air filters & AHU',
      'HVAC & process control',
      'Pharmaceutical equipment',
    ],
    specs: [
      { label: 'Media', value: 'Air, non-combustible, non-corrosive gases' },
      { label: 'Power supply', value: '24 VDC' },
      { label: 'Accuracy', value: '±1.0% F.S (≤10 mm Wc); ±0.5% F.S (≥25 mm Wc)' },
      { label: 'Display options', value: '0.56" 4-digit 7-segment LED or 1.8" TFT' },
      { label: 'Alarms', value: 'Audio-visual for low/high pressure' },
      { label: 'Optional outputs', value: '4–20 mA, 0–10 V, RS485' },
      { label: 'Response time', value: '100–3000 ms (menu selectable)' },
      { label: 'Operating temperature', value: '10°C to 60°C' },
      { label: 'User interface', value: 'Digital push buttons' },
      { label: 'Housing', value: 'ABS with SS304 front' },
      { label: 'Process connection', value: 'Push-fit for 3/16" ID tubing' },
      { label: 'Electrical connection', value: 'Screw terminals' },
      { label: 'Weight & size', value: '230 g — Ø114 × 30 mm deep' },
    ],
    image: `${DIGISLEEK_IMAGES_BASE}/front.png`,
    imageAlt: 'DIGISLEEK K1 Series digital pressure transmitter with TFT display',
    images: [
      {
        src: `${DIGISLEEK_IMAGES_BASE}/front.png`,
        alt: 'DIGISLEEK front view with TFT display showing mm Wc',
        label: 'Front view',
      },
      {
        src: `${DIGISLEEK_IMAGES_BASE}/front-cable.png`,
        alt: 'DIGISLEEK front view with power cable',
        label: 'Front — installed',
      },
      {
        src: `${DIGISLEEK_IMAGES_BASE}/front-keypad.png`,
        alt: 'DIGISLEEK front view with keypad layout',
        label: 'Front — keypad',
      },
      {
        src: `${DIGISLEEK_IMAGES_BASE}/angle.png`,
        alt: 'DIGISLEEK three-quarter angle view',
        label: 'Angle view',
      },
      {
        src: `${DIGISLEEK_IMAGES_BASE}/rear.png`,
        alt: 'DIGISLEEK rear view with terminals and pressure ports',
        label: 'Rear view',
      },
    ],
  },
  {
    id: 'universal-gateway-wifi-gsm',
    name: 'Universal Gateway — WiFi / GSM',
    navLabel: 'Universal Gateway',
    tagline: 'UrjaNXT — Industrial Plant Datalogger & IIoT Gateway',
    cardSummary:
      'Robust plant datalogger with WiFi 2.4G or GSM 4G connectivity, multi-channel I/O, RS485 Modbus, and secure MQTTS cloud integration.',
    description:
      'The Universal Plant Datalogger is a robust industrial device designed for reliable data acquisition and secure cloud connectivity. Offered in WiFi 2.4G and GSM 4G (with 2G fallback) variants for local network and remote field deployments.',
    paragraphs: [
      'The unit integrates current inputs, voltage inputs, isolated digital inputs, and isolated digital outputs — suitable for diverse industrial signals. RS485 and MQTTS connectivity enable secure, seamless data transfer to cloud servers or centralized management systems.',
      'Built on FreeRTOS with IP55 protection, OTA firmware upgrade over HTTPS, and secure boot. Lateral stackable I/O cards expand digital and analog channels. Product can be customized per client requirements.',
    ],
    features: [
      'WiFi 2.4G and GSM 4G (2G fallback) variants',
      '8× 4–20 mA and 8× 0–10 V analog inputs (3-wire)',
      '4 isolated digital inputs and 4 isolated digital outputs',
      'RS485 Modbus RTU for sensor integration',
      'MQTTS secure cloud communication',
      'USB 2.0 for configuration and debugging',
      '±0.1% FS typical accuracy',
      'OTA firmware upgrade — HTTPS, secure boot',
      'IP55 dust-proof enclosure',
      'Lateral stackable card form factor',
    ],
    applications: [
      'Plant energy management — centralized usage tracking',
      'Utility management — pressure, level, temperature',
      'Transformer monitoring — electrical parameters & health',
      'IoT-enabled plants — remote MQTTS server integration',
    ],
    specs: [
      { label: 'Input supply', value: '24 VDC, 1 A' },
      { label: 'LED indication', value: 'Power LED and Status LED' },
      { label: 'Digital outputs', value: '4 isolated (12–24 V)' },
      { label: 'Digital inputs', value: '4 isolated (5–24 V)' },
      { label: 'Analog inputs (4–20 mA)', value: '8 channels (3-wire)' },
      { label: 'Analog inputs (0–10 V)', value: '8 channels (3-wire)' },
      { label: 'Accuracy', value: '±0.1% FS typical' },
      { label: 'Form factor', value: 'Lateral stackable cards' },
      { label: 'WiFi', value: '2.4G — cloud connectivity' },
      { label: 'GSM', value: '4G with 2G fallback' },
      { label: 'USB', value: 'USB 2.0 — configuration & debugging' },
      { label: 'RS485', value: 'Modbus RTU — industrial sensor comms' },
      { label: 'MQTTS', value: 'Secure cloud server communication' },
      { label: 'Operating temperature', value: '0°C to +70°C' },
      { label: 'Operating system', value: 'FreeRTOS' },
      { label: 'Protection', value: 'IP55 dust proof' },
      { label: 'Firmware upgrade', value: 'OTA over HTTPS — secure boot enabled' },
    ],
    image: `${UNIVERSAL_GATEWAY_IMAGES_BASE}/front.png`,
    imageAlt: 'UrjaNXT Universal GSM Gateway industrial datalogger',
    images: [
      {
        src: `${UNIVERSAL_GATEWAY_IMAGES_BASE}/front.png`,
        alt: 'UrjaNXT Universal GSM Gateway front view',
        label: 'GSM gateway — front',
      },
      {
        src: `${UNIVERSAL_GATEWAY_IMAGES_BASE}/front-gsm.png`,
        alt: 'UrjaNXT Universal GSM Gateway with antenna',
        label: 'GSM variant',
      },
      {
        src: `${UNIVERSAL_GATEWAY_IMAGES_BASE}/front-iot.png`,
        alt: 'UrjaNXT Universal IIoT Gateway top view',
        label: 'IIoT gateway',
      },
      {
        src: `${UNIVERSAL_GATEWAY_IMAGES_BASE}/angle.png`,
        alt: 'Universal gateway angle view with wiring',
        label: 'Angle view',
      },
      {
        src: `${UNIVERSAL_GATEWAY_IMAGES_BASE}/side-label.png`,
        alt: 'Universal gateway side view with specification label',
        label: 'Side — label',
      },
    ],
  },
  {
    id: 'digisense-ds',
    name: 'DIGISENSE™ DS Series',
    navLabel: 'DIGISENSE DS',
    tagline: 'Differential Pressure Gauge Switch — Panel Mount',
    cardSummary:
      'Compact digital differential pressure gauge switch for low-pressure HVAC and cleanroom use — 0.38" LED, ±0.5% FS, ranges 0–10 to 0–400 mm Wc.',
    description:
      'DIGISENSE™ DS Series Differential Pressure Gauge Switch is designed for monitoring low-pressure pneumatic systems, including HVAC and cleanroom applications. It supports differential, absolute, and vacuum pressure measurements with ranges from 0–10 mm Wc to 0–400 mm Wc.',
    paragraphs: [
      'A compact panel-mount alternative to mechanical gauges, with user-friendly keypad programming, optional password protection, and audio-visual alarms (green normal, red alert, yellow delay).',
      'Measures positive, negative, and differential pressure with selectable units in mm Wc or Pa — ideal where space and cost matter without sacrificing accuracy.',
    ],
    features: [
      'Easy to install — suitable for panel mounting',
      'Optional password protection',
      'User-friendly keypad on face',
      'Audio-visual alarm (green / red / yellow)',
      'High performance, low cost — ±0.5% FS accuracy',
      'Measures positive, negative & differential pressure',
      'Selectable units: mm Wc & Pa',
    ],
    applications: [
      'Laminar flow benches',
      'Biosafety cabinets',
      'Cleanroom pressure monitoring',
      'Air filters & AHU',
      'HVAC systems',
      'Pharmaceutical equipment',
    ],
    specs: [
      { label: 'Media', value: 'Air, non-combustible, non-corrosive gases' },
      { label: 'Power supply', value: '12 VDC' },
      { label: 'Accuracy', value: '±1.0% FS (≤10 mm Wc); ±0.5% FS (≥25 mm Wc)' },
      { label: 'Display', value: '0.38" 4-digit 7-segment LED' },
      { label: 'Alarms', value: 'Audio-visual for low/high pressure' },
      { label: 'Response time', value: '100–3000 ms (menu selectable)' },
      { label: 'Operating temperature', value: '10°C to 60°C' },
      { label: 'User interface', value: 'Digital push buttons' },
      { label: 'Housing', value: 'ABS' },
      { label: 'Process connection', value: 'Push-fit for 3/16" ID tubing' },
      { label: 'Electrical connection', value: 'Screw terminals' },
      { label: 'Weight & size', value: '100 g — Ø80 mm × 35 mm deep' },
    ],
    image: `${DIGISENSE_DS_IMAGES_BASE}/front.png`,
    imageAlt: 'DIGISENSE DS Series differential pressure gauge switch front view',
    images: [
      {
        src: `${DIGISENSE_DS_IMAGES_BASE}/front.png`,
        alt: 'DIGISENSE DS Series front view with red LED display',
        label: 'Front view',
      },
      {
        src: `${DIGISENSE_DS_IMAGES_BASE}/front-alarms.png`,
        alt: 'DIGISENSE DS Series with status alarm indicators',
        label: 'Front — alarms',
      },
      {
        src: `${DIGISENSE_DS_IMAGES_BASE}/side.png`,
        alt: 'DIGISENSE DS Series side view with specification label',
        label: 'Side view',
      },
    ],
  },
]

export function getProductImages(product) {
  if (product.images?.length) return product.images
  if (product.image) {
    return [
      {
        src: product.image,
        alt: product.imageAlt || product.name,
        label: 'Product view',
      },
    ]
  }
  return []
}

export function getAllProducts() {
  return PRODUCTS
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.id === slug) ?? null
}
