/**
 * Portfolio projects data — extracted from legacy StuffBits website
 * Categories: automotive | industrial | iot | power | instrumentation
 */

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'iot', label: 'IoT' },
  { id: 'power', label: 'Power' },
  { id: 'instrumentation', label: 'Instrumentation' },
]

export const PORTFOLIO_PROJECTS = [
  {
    id: 'multi-product-fuel-dispenser',
    title: 'Multi-Product Fuel Dispenser',
    category: 'automotive',
    image: '/images/portfolio/1.jpg',
    excerpt:
      'Certified, secure, and field-proven — explore how Stuffbits engineered a complete Multi-Product Fuel Dispenser firmware stack with CAN bus architecture and CDAC-approved AES-256 encryption.',
    description: [
      'Stuffbits architected and delivered production-grade firmware for every module of a Multi-Product Fuel Dispenser — from the master CPU card down to each slave node communicating over a robust CAN bus network.',
      'Slave subsystems were engineered for reliability and precision: power-retentive static displays maintain critical data through outages, an LCD and keypad interface enables seamless operator configuration, a non-resettable totalizer ensures tamper-proof cumulative dispensing records, and a high-accuracy encoder guarantees real-time volume measurement with zero compromise.',
      'Beyond the core dispenser, the solution integrates remote fueling support, MMC-based transaction logging, thermal receipt printing, and a Battery Management System (BMS) — delivering a fully self-contained, production-ready platform.',
      'Designed to exceed the stringent compliance requirements governing fuel dispensing equipment, the latest model is secured with 256-bit AES encryption on a PKI infrastructure and is officially certified by CDAC — making it ready for regulated, large-scale deployments.',
    ],
    tags: ['CAN Bus', 'Firmware', 'CDAC Certified', 'AES-256 Encryption', 'PKI Security'],
  },
  {
    id: 'ups-front-panel-display',
    title: 'UPS Front Panel Display',
    category: 'power',
    image: '/images/portfolio/2.jpg',
    excerpt:
      'A feature-rich 4.3" TFT touchscreen panel engineered for UPS systems — with CAN Bus integration, Modbus support, and one-touch USB log export.',
    description: [
      'The UPS Front Panel Display is a purpose-built operator interface featuring a 4.3" TFT screen with resistive touch, complemented by physical keys for environments where touch input is impractical.',
      'The panel communicates directly with the UPS DSP controller over a CAN Bus network, enabling real-time data exchange with high reliability.',
      'Operators can export system logs to a USB flash drive in a single button press, with the panel functioning as a USB Host for seamless data transfer.',
      'Connectivity is further extended through Modbus and SEC protocol support for UPS communication, along with an Ethernet port for PC integration — supporting both static and dynamic IP addressing.',
    ],
    tags: ['TFT Display', 'CAN Bus', 'Modbus', 'USB Host', 'Ethernet'],
  },
  {
    id: 'digital-manometer',
    title: 'Digital Manometer',
    category: 'instrumentation',
    image: '/images/portfolio/3.jpg',
    excerpt:
      'Industrial-grade digital differential pressure measurement with multi-sensor support, analog outputs, and Modbus connectivity.',
    description: [
      'The Digital Manometer is a precision differential pressure measurement device engineered for industrial applications, supporting a wide range of both digital and analog pressure sensors across multiple measurement ranges.',
      'Designed for flexible deployment, the unit operates on 12V to 30VDC. An alternate model includes a built-in SMPS for direct 230VAC mains operation — eliminating the need for external power conditioning.',
      'Outputs include a standard industrial 4–20mA 3-wire transmitter and a 0–10V analog signal, enabling direct integration with PLCs, SCADA systems, and data acquisition platforms.',
      'Additional features include configurable alarm thresholds, relay output for process control, and Modbus RTU support for seamless integration into industrial communication networks.',
    ],
    tags: ['Pressure Measurement', '4–20mA', 'Modbus', 'Differential Pressure'],
  },
  {
    id: 'clean-room-monitor-led',
    title: 'Clean Room Monitor — LED Display',
    category: 'industrial',
    image: '/images/portfolio/4.jpg',
    excerpt:
      'Pharmaceutical-grade clean room monitor for real-time Temperature, Humidity, and Differential Pressure measurement — with Modbus support and Windows configuration software.',
    description: [
      'The Clean Room Monitor (LED) is purpose-designed for pharmaceutical environments, providing continuous monitoring of Temperature, Humidity, and Differential Pressure to meet stringent cleanroom compliance requirements.',
      'Its slim profile supports flush mounting on both modular and brick walls with minimal cabling, while three dedicated 7-segment displays deliver at-a-glance readings for each parameter.',
      'The unit operates on 12V to 30VDC and provides dual analog outputs — industrial 4–20mA 3-wire and 0–10V — for all three parameters, ensuring compatibility with a wide range of industrial control systems.',
      'Equipped with configurable alarm functions, relay output, and Modbus RTU support. Includes a Windows 10 configuration and monitoring application accessible via USB.',
    ],
    tags: ['Pharma', 'Clean Room', '7-Segment Display', 'Modbus'],
  },
  {
    id: 'clean-room-monitor-tft',
    title: 'Clean Room Monitor — TFT',
    category: 'industrial',
    image: '/images/portfolio/5.jpg',
    excerpt:
      'Enhanced pharmaceutical clean room monitor with a 2.8" TFT resistive touchscreen for intuitive on-device configuration and real-time monitoring.',
    description: [
      'The Clean Room Monitor (TFT) is an advanced variant of the CRM-LED, offering the same robust monitoring of Temperature, Humidity, and Differential Pressure — elevated with a 2.8" TFT resistive touchscreen for a more intuitive operator experience.',
      'Designed for pharmaceutical cleanroom environments, it supports flush mounting on modular and brick wall surfaces with a minimal cabling footprint.',
      'Operates on 12V to 30VDC and delivers dual analog outputs — 4–20mA 3-wire and 0–10V — across all three monitored parameters, ensuring broad compatibility with industrial control infrastructure.',
      'Features configurable alarms, Modbus RTU support, and a Windows 10 application via USB for advanced configuration and remote monitoring.',
    ],
    tags: ['TFT Touch', 'Pharma', 'Clean Room', 'Modbus'],
  },
  {
    id: 'digital-pressure-transmitter',
    title: 'Digital Pressure Transmitter',
    category: 'industrial',
    image: '/images/portfolio/6.jpg',
    excerpt:
      'Compact IP65-rated differential pressure transmitter built for cleanroom wall mounting — with dual analog outputs and Modbus connectivity.',
    description: [
      'The Digital Pressure Transmitter is a compact, field-ready device engineered for accurate differential pressure measurement and signal transmission in demanding cleanroom environments.',
      'Housed in an IP65-rated enclosure, it is optimized for flush mounting on modular or brick cleanroom walls and operates reliably on 12V to 30VDC.',
      'Provides dual analog outputs — industrial 4–20mA 3-wire and 0–10V — for seamless integration with PLCs, building management systems, and data acquisition platforms. Modbus RTU support enables network-based monitoring and control.',
      'Includes a Windows 10 configuration and monitoring application, accessible via USB for rapid commissioning and on-site diagnostics.',
    ],
    tags: ['IP65', 'Pressure Transmitter', '4–20mA', 'Modbus'],
  },
  {
    id: 'humidity-temperature-transmitter',
    title: 'Humidity and Temperature Transmitter',
    category: 'industrial',
    image: '/images/portfolio/7.jpg',
    excerpt:
      'IP65-rated compact transmitter for accurate Humidity and Temperature measurement in pharmaceutical cleanrooms — with dual analog outputs and Modbus support.',
    description: [
      'The Humidity and Temperature Transmitter is engineered for precise, continuous environmental monitoring in cleanroom and industrial settings, delivering reliable measurement and signal transmission for both parameters.',
      'Enclosed in a compact IP65-rated housing, it is designed for easy flush mounting on modular or brick cleanroom walls and operates on 12V to 30VDC.',
      'Offers dual analog outputs — 4–20mA 3-wire and 0–10V — independently for both Humidity and Temperature, ensuring compatibility with a broad range of building management and process control systems.',
      'Modbus RTU support enables network integration, while the included Windows 10 USB application streamlines configuration and real-time monitoring.',
    ],
    tags: ['IP65', 'Humidity', 'Temperature', 'Modbus'],
  },
  {
    id: 'kelfos-pressure-transmitter',
    title: 'Kelfos Pressure Transmitter',
    category: 'industrial',
    image: '/images/portfolio/8.jpg',
    excerpt:
      'Precision differential pressure transmitter in a premium IP65 Takachi enclosure — built for industrial cleanroom environments.',
    description: [
      'The Kelfos Pressure Transmitter is a precision-engineered differential pressure measurement and transmission device, designed for industrial cleanroom and controlled environment applications.',
      'Housed in a premium IP65-rated Takachi enclosure, it combines a compact form factor with a robust build quality suited for demanding installation environments. Operates on 12V to 30VDC.',
      'Delivers dual analog outputs — industrial 4–20mA 3-wire and 0–10V — for direct compatibility with PLCs, SCADA systems, and building automation platforms.',
      'Modbus RTU support enables seamless network integration, complemented by a Windows 10 USB application for straightforward on-site configuration and monitoring.',
    ],
    tags: ['IP65', 'Takachi Enclosure', '4–20mA', 'Modbus'],
  },
  {
    id: 'miniclimate',
    title: 'Miniclimate',
    category: 'industrial',
    image: '/images/portfolio/9.jpg',
    excerpt:
      'All-in-one compact cleanroom monitor with a 2" TFT display — tracking Temperature, Humidity, and Differential Pressure in a single IP65 device.',
    description: [
      'Miniclimate is a compact, all-in-one environmental monitor engineered to measure Temperature, Humidity, and Differential Pressure — delivering multi-parameter visibility in a single, space-efficient device.',
      'Its IP65-rated enclosure supports flush mounting on modular and brick cleanroom walls, while the built-in 2" TFT display and physical keys provide a practical interface for on-device configuration without the need for external tools.',
      'Operates on 12V to 30VDC and provides dual analog outputs — 4–20mA 3-wire and 0–10V — for all monitored parameters, ensuring compatibility with standard industrial control and automation systems.',
      'Features configurable alarm thresholds, Modbus RTU support for network integration, and a Windows 10 USB application for advanced configuration and real-time monitoring.',
    ],
    tags: ['TFT Display', 'IP65', 'Multi-Parameter', 'Modbus'],
  },
  {
    id: 'passbox-controller',
    title: 'Passbox Controller',
    category: 'industrial',
    image: '/images/portfolio/10.jpg',
    excerpt:
      'Intelligent cleanroom passbox controller with dual-door management, UV/CFL/blower automation, and built-in SMPS for direct mains operation.',
    description: [
      'The Passbox Controller is a purpose-built cleanroom solution managing two independent door assemblies, each with a dedicated display — all governed by a central control board that drives relays for CFL lighting, UV sterilization, and blower operation.',
      'Safety is built into every layer: a configurable UV timer, door open alarms, and programmable door timers ensure compliant, safe passbox operation in regulated environments.',
      'Operates directly on 230VAC via an integrated SMPS, eliminating the need for external power supplies. Supports Modbus RTU communication alongside onboard pressure and temperature measurement for complete environmental oversight.',
    ],
    tags: ['Clean Room', 'Passbox', 'MODBUS', '230V SMPS'],
  },
  {
    id: 'biosafety-controller',
    title: 'Biosafety Controller',
    category: 'industrial',
    image: '/images/portfolio/11.jpg',
    excerpt:
      'Advanced Biosafety Cabinet controller with TFT display, SSR-based motorized window control, and integrated HEPA filter management.',
    description: [
      'The Biosafety Controller is engineered for precise window sash control in Biosafety Cabinets, featuring a TFT display for real-time monitoring and intuitive operator configuration.',
      'A central control board manages window sash positioning alongside relay-driven CFL lighting, UV sterilization, and blower control. SSR-based motor control ensures smooth, fault-tolerant window sash operation.',
      'Includes a configurable UV timer, HEPA filter maintenance timer, and operates directly on 230VAC via an integrated SMPS. Modbus RTU support and onboard pressure and temperature measurement enable seamless integration into facility management systems.',
    ],
    tags: ['Biosafety Cabinet', 'TFT', 'SSR Motor Control', 'MODBUS'],
  },
  {
    id: 'turbine-flowmeter',
    title: 'Turbine Flowmeter',
    category: 'instrumentation',
    image: '/images/portfolio/12.jpg',
    excerpt:
      'Industrial digital flowmeter with multi-unit support, SD card data logging, and Modbus connectivity — operating across a wide DC input range.',
    description: [
      'The Turbine Flowmeter converts flow signals from industrial magnetic sensors into accurate digital readings, supporting eight selectable flow units to accommodate a wide range of industrial measurement applications.',
      'An integrated totalizer tracks cumulative flow, while onboard SD card logging provides a reliable record of flow data for audit, reporting, and process analysis purposes.',
      'Provides a standard 4–20mA analog output for direct integration with PLCs and control systems, and supports Modbus RTU for network-based monitoring. Operates on a wide input range of 7V to 30VDC.',
    ],
    tags: ['Flow Measurement', 'SD Card Logging', 'Modbus', '4–20mA'],
  },
  {
    id: 'rfid-attendance-system',
    title: 'RFID Attendance System',
    category: 'iot',
    image: '/images/portfolio/13.jpg',
    excerpt:
      'Institutional RFID attendance system for 125kHz cards — with Ethernet connectivity, Modbus support, and onboard storage for up to 2,000 log entries.',
    description: [
      'The RFID Attendance System is a robust, network-connected solution designed for student attendance management in schools and institutions, utilizing 125kHz clamshell RFID cards for contactless identification.',
      'The device connects to a central PC via Ethernet and Modbus, enabling seamless transmission of attendance logs and synchronization of the student database. It supports local storage of up to 2,000 attendance records and 1,000 student IDs — ensuring continuity even during network interruptions.',
      'Student SQL databases can be loaded directly onto the device, simplifying deployment and eliminating the need for complex middleware or custom integration layers.',
    ],
    tags: ['RFID', 'Ethernet', 'Modbus', 'Attendance'],
  },
  {
    id: 'gas-analyzer',
    title: 'Gas Analyzer',
    category: 'instrumentation',
    image: '/images/portfolio/14.jpg',
    excerpt:
      'Dual-channel industrial gas analyzer with auto-zeroing, 2-point factory calibration, alarm outputs, and Modbus support.',
    description: [
      'The Gas Analyzer is a precision dual-channel measurement instrument supporting a broad range of analog gas sensors with input signals from -12V to +12V — delivering accurate, real-time gas concentration data across diverse industrial environments.',
      'An automatic zeroing function continuously compensates for temperature-induced sensor drift, maintaining measurement accuracy within 2% error. Factory-mode 2-point calibration enables precise configuration during production for consistent unit-to-unit performance.',
      'Each channel provides an independent 4–20mA analog output and relay output for threshold-based alarm and process control. Modbus RTU support enables centralized monitoring, and an integrated SMPS allows direct 230VAC mains operation.',
    ],
    tags: ['Gas Sensing', 'Auto-Zero', 'Modbus', '4–20mA'],
  },
  {
    id: 'ac-high-voltage-test-system',
    title: 'AC High Voltage Test System',
    category: 'industrial',
    image: '/images/portfolio/15.jpg',
    excerpt:
      'Windows 10 USB interface with Excel-based data logging for RE AC high voltage test systems — modular and scalable across multiple product variants.',
    description: [
      'Stuffbits developed a Windows 10 USB application to extend the capabilities of multiple RE AC High Voltage Test System models, providing a standardized PC interface for test monitoring and data capture.',
      'The application was architected with a modular codebase, enabling straightforward adaptation across different hardware variants without significant redevelopment — reducing integration time and long-term maintenance overhead.',
      'Key features include real-time error indication, configurable log intervals, and automatic export of test data to Excel — providing structured, audit-ready records for quality assurance and compliance reporting.',
    ],
    tags: ['High Voltage', 'USB', 'Windows 10', 'Excel Logging'],
  },
  {
    id: 'windmill-remote-monitoring',
    title: 'Windmill Remote Monitoring',
    category: 'iot',
    image: '/images/portfolio/16.jpg',
    excerpt:
      'GSM-based remote monitoring system for windmill parameters — with admin-controlled data access, tamper-proof totalizers, and robust network fault handling.',
    description: [
      'The Windmill Remote Monitoring System continuously tracks critical windmill operational parameters and transmits data over GSM to a central PC on demand — with readings organized across three display pages and three dedicated configuration pages for easy on-site management.',
      'Peak and totalizer values are protected against unauthorized resets, accessible only via authenticated admin mobile commands or a secure keypress sequence — ensuring data integrity across the asset lifecycle.',
      'Built on the Quectel M66 modem, the firmware incorporates resilient connection management — automatically handling network loss, 2G-to-4G transitions, and network unavailability to ensure continuous, uninterrupted data transmission.',
      'Admin and user contact numbers are configurable via a single key. On receiving an SMS prompt from an authorized admin or user, the device automatically replies with the requested operational details.',
    ],
    tags: ['GSM', 'Remote Monitoring', 'Wind Energy', 'Quectel M66'],
  },
  {
    id: 'fleet-tracking-solution',
    title: 'Fleet Tracking Solution',
    category: 'iot',
    image: '/images/portfolio/17.jpg',
    excerpt:
      'End-to-end GPS fleet tracking solution with real-time MQTT updates, motion-aware power management, and OTA firmware upgrade capability.',
    description: [
      'The Fleet Tracking Solution is a complete hardware and firmware platform enabling real-time vehicle tracking via Google Maps, with continuous GPS position updates transmitted over 2G/4G networks for live fleet visibility.',
      'The custom firmware integrates a U-blox GSM/GPRS module for cellular connectivity, a NEO-M8N GPS receiver for precise positioning, and an LIS3DH accelerometer for motion detection — all orchestrated by an STM32 low-power microcontroller.',
      'When a vehicle is in motion, the device continuously transmits coordinates to the server over MQTT. A low-power standby mode activates during periods of inactivity, significantly extending battery life for field deployments.',
      'Advanced capabilities include FTP-based file transfer and a secure bootloader with OTA firmware upgrade support — enabling remote maintenance and feature updates without physical access to deployed hardware.',
    ],
    tags: ['GPS', 'MQTT', 'STM32', 'OTA', 'Fleet Management'],
  },
  {
    id: 'soil-sensor-prototype',
    title: 'Soil Sensor Prototype',
    category: 'iot',
    image: '/images/portfolio/18.jpg',
    excerpt:
      'Multi-sensor soil parameter evaluation platform supporting JXCT NPK, pH, and environmental sensors via Modbus — with STM32 and TFT display.',
    description: [
      'The Soil Sensor Prototype is a dedicated evaluation and display module developed to assess and validate JXCT soil sensors over Modbus RS485 — built on an STM32 microcontroller with a 2.8" TFT display and a 4-key physical interface for intuitive on-device control.',
      'The platform supports four JXCT sensor models: JXBS-3001-NPK-RS for soil nutrient analysis, JXBS-3001-PH-RS for pH measurement, JXBS-3001-TR-RS, and JXBS-3001-TH-RS for temperature and humidity profiling.',
      'Up to four sensors can be monitored simultaneously across individual display pages, with Modbus address and sensor model selectable per channel — enabling flexible multi-point soil analysis in agricultural research and precision farming applications.',
    ],
    tags: ['Soil Sensing', 'Modbus', 'STM32', 'JXCT Sensors'],
  },
  {
    id: 'air-purifier-controller',
    title: 'Air Purifier Controller',
    category: 'industrial',
    image: '/images/portfolio/19.jpg',
    excerpt:
      'Compact, cost-efficient 230VAC controller for electric air purifiers — with triac-based fan speed control and multi-mode operation.',
    description: [
      'The Air Purifier Controller is a compact, cost-optimized control solution developed for electric air filtration units that utilize high-voltage electrodes for air sanitization.',
      'Integrating a built-in SMPS for direct 230VAC operation, the controller drives a relay output for high-voltage electrode activation and features triac-based speed control for two internal AC fans — delivering precise airflow management within a minimal footprint.',
      'Four selectable operating modes and three fan speed settings — each configurable via dedicated rotary switches — provide operators with straightforward, tool-free adjustment for varying purification requirements.',
    ],
    tags: ['Air Purifier', '230V', 'Triac', 'Compact Controller'],
  },
  {
    id: 'parking-sensor',
    title: 'Parking Sensor',
    category: 'iot',
    image: '/images/portfolio/20.jpg',
    excerpt:
      'Cost-efficient smart parking management system with ultrasonic detection, RGB LED guidance indicators, and centralized Modbus control for up to 128 spaces.',
    description: [
      'The Parking Sensor System is a scalable, cost-efficient off-street parking management solution, providing high-visibility colour-coded RGB LED overhead indicators to guide drivers to available spaces in real time.',
      'Each unit employs an ultrasonic sensor for reliable obstacle detection, with high-wattage RGB LEDs delivering clear, colour-coded occupancy status visible across wide bay widths and varying ambient lighting conditions.',
      'Up to 128 sensor nodes can be networked over Modbus, enabling centralized monitoring of parking space availability across an entire facility from a single management point.',
      'A dedicated PC configuration tool allows operators to set detection thresholds, assign device IDs, and configure colour codes per sensor — simplifying initial commissioning and ongoing system management.',
    ],
    tags: ['Ultrasonic', 'Smart Parking', 'Modbus', 'RGB LED'],
  },
]
