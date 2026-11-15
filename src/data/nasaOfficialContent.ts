import { QuizQuestion } from './sentinelsData';

export interface NasaOfficialDossier {
  missionId: string;
  officialHeader: string;
  officialSubtitle: string;
  quickFacts: { label: string; value: string }[];
  scientificInstruments: string[];
  historicFirsts: string[];
  inDepthSections: {
    heading: string;
    paragraphs: string[];
  }[];
  keyDates: { date: string; event: string }[];
  extraQuizQuestions: QuizQuestion[];
}

export const NASA_OFFICIAL_DOSSIERS: Record<string, NasaOfficialDossier> = {
  'pioneer-10': {
    missionId: 'pioneer-10',
    officialHeader: 'NASA Official Briefing: Pioneer 10 (Pioneer-F)',
    officialSubtitle:
      'NASA’s first mission to the outer planets — designed for 21 months, operated for more than 30 years across 7.6 billion miles.',
    quickFacts: [
      { label: 'Spacecraft Designation', value: 'Pioneer-F (Pioneer 10 · NSSDCA 1972-012A)' },
      { label: 'Launch Date & Time', value: 'March 2, 1972 / 01:49:04 UT' },
      { label: 'Launch Vehicle', value: '3-Stage Atlas Centaur (AC-27 / Atlas 3C no. 5007C / Centaur D-1A + TE-M-364-4)' },
      { label: 'Launch Site', value: 'Cape Canaveral, Florida / Launch Complex 36A' },
      { label: 'Spacecraft Mass', value: '569 pounds (258 kilograms)' },
      { label: 'Mission Management', value: 'NASA Ames Research Center (ARC) · Built by TRW Inc.' },
      { label: 'Power System', value: 'All-nuclear: SNAP-19 RTGs (~140–155 W at Jupiter encounter)' },
      { label: 'Record Launch Speed', value: '32,110 mph (51,682 km/h) escape velocity' },
      { label: 'Jupiter Closest Approach', value: 'Dec. 4, 1973 (02:26 UT) at 81,000 miles (130,354 km) & 78,000 mph (126,000 km/h)' },
      { label: 'Final Signal Received', value: 'Jan. 23, 2003 from 7.6 billion miles (12.23 billion km · 11h 20m light travel time)' }
    ],
    scientificInstruments: [
      'Imaging Photopolarimeter (IPP)',
      'Helium Vector Magnetometer (HVM)',
      'Infrared Radiometer',
      'Quadrispherical Plasma Analyzer',
      'Ultraviolet Photometer',
      'Charged Particle Instrument (CPI)',
      'Cosmic Ray Telescope (CRT)',
      'Geiger Tube Telescope (GTT)',
      'Sisyphus Asteroid/Meteoroid Detector (AMD)',
      'Meteoroid Detectors',
      'Trapped Radiation Detector (TRD)'
    ],
    historicFirsts: [
      'First spacecraft placed on a trajectory to escape the solar system into interstellar space',
      'First spacecraft to fly beyond Mars',
      'First spacecraft to fly through the main asteroid belt (July 15, 1972 – Feb. 1973)',
      'First spacecraft to fly past Jupiter (Dec. 4, 1973)',
      'First human-made object to cross the orbit of Neptune (June 13, 1983)',
      'First spacecraft to use 100% nuclear electrical power (SNAP-19 RTGs)'
    ],
    inDepthSections: [
      {
        heading: 'Breaking Speed Records & Crossing the Asteroid Belt',
        paragraphs: [
          'Launched on a three-stage Atlas Centaur rocket equipped with a solid-propellant TE-M-364-4 third stage modified from the Surveyor lunar lander, Pioneer 10 reached an escape velocity of 32,110 mph (51,682 km/h)—faster than any previous human-made object. Controllers executed two course corrections on March 7 and March 26, 1972, targeting an occultation experiment with Jupiter’s moon Io.',
          'On July 15, 1972, Pioneer 10 became the first spacecraft to enter the main asteroid belt, emerging safely in February 1973 after a 271-million-mile (435-million-kilometer) crossing. Along the way, it measured the intensity of Zodiacal light in interplanetary space and teamed up with Pioneer 9 on Aug. 7, 1972, to record one of the most violent solar storms ever documented.'
        ]
      },
      {
        heading: 'Surviving Jupiter’s Bow Shock & Radiation Belts',
        paragraphs: [
          'At 20:30 UT on Nov. 26, 1973, Pioneer 10 recorded a sudden drop in solar wind and a 100-fold jump in plasma temperature—proving it had crossed Jupiter’s bow shock and entered its giant magnetosphere. By Dec. 1, with round-trip radio light-time up to 92 minutes, it was sending back sharper photos of Jupiter than any telescope on Earth.',
          'Closest approach occurred at 02:26 UT on Dec. 4, 1973, when Pioneer 10 screamed past Jupiter just 81,000 miles (130,354 km) away at 78,000 mph (126,000 km/h). Six of its 11 instruments operated continuously through the radiation storm. It photographed moons Callisto, Ganymede, and Europa (intense radiation jammed the photopolarimeter during the Io image), passed behind Jupiter’s limb 78 minutes after closest approach for a radio occultation experiment, and captured roughly 500 pictures of Jupiter’s clouds and Great Red Spot.'
        ]
      },
      {
        heading: 'Across Saturn and Neptune Toward Aldebaran',
        paragraphs: [
          'In February 1976, Pioneer 10 crossed Saturn’s orbit and detected that Jupiter’s magnetic tail stretched nearly 800 million kilometers all the way between the two giant planets. On June 13, 1983, it crossed the orbit of Neptune (then the outermost planet in our solar system).',
          'Routine contact ended for budget reasons on March 31, 1997, at 67 AU, though intermittent tracking continued with the Geiger Tube Telescope and Charged Particle Instrument. Pioneer 10 held the record as the farthest human-made object until Voyager 1 passed it at 69.4 AU on Feb. 17, 1998. Its final telemetry arrived April 27, 2002, and its very last whisper reached Earth on Jan. 23, 2003, from 7.6 billion miles (12.23 billion km), taking 11 hours and 20 minutes at the speed of light. Carrying its famous gold-anodized pulsar plaque, Pioneer 10 is heading upstream toward the nose of the heliosphere in the direction of the red star Aldebaran in Taurus, which it will pass in about two million years.'
        ]
      }
    ],
    keyDates: [
      { date: 'March 2, 1972', event: 'Launched from Cape Canaveral LC-36A at 32,110 mph (51,682 km/h)' },
      { date: 'July 15, 1972', event: 'Entered the Main Asteroid Belt (emerged Feb. 1973 after 271M miles)' },
      { date: 'Nov. 26, 1973', event: 'Crossed Jupiter’s bow shock (100-fold temperature jump into magnetosphere)' },
      { date: 'Dec. 4, 1973', event: 'Closest approach to Jupiter at 81,000 miles (130,354 km) & 78,000 mph' },
      { date: 'Feb. 1976', event: 'Crossed Saturn’s orbit inside Jupiter’s 800-million-km magnetic tail' },
      { date: 'June 13, 1983', event: 'Crossed Neptune’s orbit as the first craft beyond the outermost planet' },
      { date: 'March 31, 1997', event: 'Routine contact terminated at 67 AU from Earth' },
      { date: 'Jan. 23, 2003', event: 'Final faint signal received from 7.6 billion miles (12.23 billion km)' }
    ],
    extraQuizQuestions: [
      {
        id: 'p10-q4',
        question: 'What sudden change did Pioneer 10 detect on Nov. 26, 1973, proving it had crossed Jupiter’s bow shock and entered its magnetosphere?',
        options: [
          'A drop in the solar wind and a 100-fold increase in plasma temperature',
          'Solid ice clouds freezing onto the antenna',
          'A complete reversal of gravity',
          'Oxygen gas leaking from Jupiter’s rings'
        ],
        correctIndex: 0,
        explanation:
          'At 20:30 UT on Nov. 26, 1973, Pioneer 10 recorded a sharp decrease in solar wind speed and a 100-fold jump in temperature as it crossed Jupiter’s bow shock.',
        technicalTerm: 'Jovian Bow Shock & Magnetosphere'
      },
      {
        id: 'p10-q5',
        question: 'How far away was Pioneer 10 when it sent its final radio signal on January 23, 2003, and toward which star is it heading?',
        options: [
          '1 million miles away, heading toward Polaris',
          '7.6 billion miles (12.23 billion km) away—taking 11 hours 20 minutes to reach Earth—heading toward the red star Aldebaran in Taurus',
          'Inside Mars orbit, heading toward Venus',
          '500 light-years away, heading toward Andromeda'
        ],
        correctIndex: 1,
        explanation:
          'Pioneer 10’s last signal traveled 7.6 billion miles (12.23 billion km) in 11 hours and 20 minutes. The probe is coasting toward Aldebaran, the eye of Taurus, which it will pass in ~2 million years.',
        technicalTerm: 'Interstellar Escape Trajectory'
      }
    ]
  },

  'pioneer-11': {
    missionId: 'pioneer-11',
    officialHeader: 'NASA Official Briefing: Pioneer 11 (Pioneer-G)',
    officialSubtitle:
      'Used Jupiter’s gravity as an interplanetary slingshot to become humanity’s first explorer to reach ringed Saturn.',
    quickFacts: [
      { label: 'Spacecraft Designation', value: 'Pioneer-G (Pioneer 11 · NSSDCA 1973-019A)' },
      { label: 'Launch Date', value: 'April 6, 1973 from Cape Canaveral LC-36B' },
      { label: 'Spacecraft Mass', value: '570 pounds (258.5 kilograms)' },
      { label: 'Jupiter Flyby', value: 'Dec. 3, 1974 at 26,612 miles (42,828 km) — 3× closer than Pioneer 10' },
      { label: 'Saturn Flyby', value: 'Sept. 1, 1979 at 13,000 miles (21,000 km) above cloud tops' },
      { label: 'Final Contact', value: 'Nov. 24, 1995 (~44.7 AU from Earth)' }
    ],
    scientificInstruments: [
      'Helium Vector Magnetometer (HVM)',
      'Fluxgate Magnetometer (high-field sensor added for close Jupiter pass)',
      'Imaging Photopolarimeter (IPP)',
      'Quadrispherical Plasma Analyzer',
      'Charged Particle Instrument (CPI)',
      'Cosmic Ray Telescope (CRT)',
      'Geiger Tube Telescope (GTT)',
      'Ultraviolet Photometer',
      'Infrared Radiometer',
      'Asteroid/Meteoroid Detector (AMD)',
      'Meteoroid Penetration Detectors',
      'Trapped Radiation Detector'
    ],
    historicFirsts: [
      'First spacecraft to visit Saturn (Sept. 1, 1979)',
      'First spacecraft to image Jupiter’s polar regions',
      'Discovered Saturn’s narrow F Ring and inner moon Epimetheus',
      'Proved the safety of Saturn’s outer ring plane for the Voyager missions'
    ],
    inDepthSections: [
      {
        heading: 'The Gravity-Assist Slingshot to Saturn',
        paragraphs: [
          'After Pioneer 10 proved a spacecraft could survive Jupiter’s radiation belts, NASA aimed Pioneer 11 three times closer to Jupiter—skimming just 26,612 miles (42,828 km) above the cloud tops on Dec. 3, 1974. That daring dive used Jupiter’s gravity to hurl Pioneer 11 across the solar system toward Saturn and yielded the first views of Jupiter’s poles.',
          'On Sept. 1, 1979, Pioneer 11 raced underneath Saturn’s rings at 114,000 km/h, discovering the narrow F Ring, mapping Saturn’s magnetic field, and proving that Titan was too cold for liquid surface oceans.'
        ]
      },
      {
        heading: 'Pathfinder Through Saturn’s Rings & Final Telemetry',
        paragraphs: [
          'NASA used Pioneer 11 as a fearless scout to test whether the region just outside Saturn’s visible rings was safe from meteoroid debris before Voyager 1 and Voyager 2 arrived. By surviving the ring-plane crossing unscathed, Pioneer 11 cleared the path for Voyager.',
          'After 22 years of operation, Pioneer 11’s RTG power dropped too low to run its instruments and point its antenna toward Earth. Its final engineering signal arrived on Nov. 24, 1995, as it coasted toward the constellation Scutum.'
        ]
      }
    ],
    keyDates: [
      { date: 'April 6, 1973', event: 'Launched atop an Atlas-Centaur rocket from Cape Canaveral' },
      { date: 'Dec. 3, 1974', event: 'Closest approach to Jupiter (42,828 km) and polar imaging' },
      { date: 'Sept. 1, 1979', event: 'First spacecraft flyby of Saturn; discovered the F Ring' },
      { date: 'Nov. 24, 1995', event: 'Final engineering telemetry received on Earth' }
    ],
    extraQuizQuestions: [
      {
        id: 'p11-q3',
        question: 'How close did Pioneer 11 fly to Jupiter compared to Pioneer 10 to pull off its slingshot to Saturn?',
        options: [
          'Three times closer—skimming just 26,612 miles (42,828 km) above Jupiter’s cloud tops',
          'Ten times farther away',
          'It never visited Jupiter',
          'It landed on Jupiter’s moon Io'
        ],
        correctIndex: 0,
        explanation:
          'Skimming just 42,828 km above Jupiter allowed Pioneer 11 to gain the huge gravity boost needed to cross the solar system to Saturn while moving fast enough to limit radiation dose.',
        technicalTerm: 'Close Perijove Gravity Slingshot'
      },
      {
        id: 'p11-q4',
        question: 'What newly discovered feature of Saturn did Pioneer 11 reveal during its historic September 1, 1979 flyby?',
        options: [
          'Saturn’s narrow F Ring and inner moon Epimetheus, plus Saturn’s global magnetic field',
          'Liquid water oceans on Saturn’s cloud tops',
          'Volcanoes erupting through the Cassini Division',
          'A solid iron surface beneath the clouds'
        ],
        correctIndex: 0,
        explanation:
          'Pioneer 11 discovered Saturn’s narrow F Ring and a previously unknown inner moon, while proving the ring plane was safe for Voyager 1 and 2.',
        technicalTerm: 'Kronian Ring & Magnetosphere Discovery'
      }
    ]
  },

  'apollo-lm': {
    missionId: 'apollo-lm',
    officialHeader: 'NASA Official Briefing: Apollo 11, LRO & The Apollo Lunar Surface Journal',
    officialSubtitle:
      'Fulfilling the May 25, 1961 goal of landing humans on the Moon — preserved today by the Lunar Reconnaissance Orbiter (LRO) and the Apollo Journals.',
    quickFacts: [
      { label: 'Primary Objective', value: 'Crewed lunar landing and safe return to Earth (set May 25, 1961)' },
      { label: 'Apollo 11 Crew', value: 'Neil A. Armstrong (Commander), Buzz Aldrin (LM Pilot), Michael Collins (CM Pilot)' },
      { label: 'Apollo 11 Launch', value: 'July 16, 1969 (Saturn V from Kennedy Space Center LC-39A)' },
      { label: 'Lunar Touchdown', value: 'July 20, 1969 at Mare Tranquillitatis (0.6741° N, 23.4730° E)' },
      { label: 'Earth Splashdown', value: 'July 24, 1969 in the Pacific Ocean' },
      { label: 'LRO Orbiter Launch', value: 'June 18, 2009 — longest-lived lunar orbiting mission in history' },
      { label: 'Historical Archive', value: 'Apollo Lunar Surface Journal (Eric M. Jones, 1995) & Apollo Flight Journal (David Woods, 1998)' }
    ],
    scientificInstruments: [
      'TRW Deep-Throttling Lunar Module Descent Engine (LMDE)',
      'Early Apollo Scientific Experiments Package (EASEP)',
      'Lunar Reconnaissance Orbiter Camera (LROC — photographing all 6 Apollo sites from orbit since 2009)',
      'LRO Diviner Lunar Radiometer & LOLA Laser Altimeter (mapping South Pole water ice & sunlight for Artemis)'
    ],
    historicFirsts: [
      'First humans to set foot on another world (Neil Armstrong & Buzz Aldrin, July 20, 1969)',
      'First spacecraft designed to fly strictly in the vacuum of space (Grumman Lunar Module)',
      'Longest-lived lunar orbiter in history (Lunar Reconnaissance Orbiter, operating since June 18, 2009)',
      'Comprehensive annotated word-by-word preservation of all 12 moonwalkers’ transcripts in the Apollo Lunar Surface Journal'
    ],
    inDepthSections: [
      {
        heading: 'Apollo 11 & Commander Neil A. Armstrong',
        paragraphs: [
          'The primary objective of Apollo 11 was to complete the national goal set by President John F. Kennedy on May 25, 1961: perform a crewed lunar landing and return safely to Earth. Launched on July 16, 1969, and splashing down on July 24, 1969, the mission carried Commander Neil Armstrong, Buzz Aldrin, and Michael Collins.',
          'Neil A. Armstrong—the first human to set foot on the Moon—joined NASA’s predecessor, the NACA, as an aeronautical research scientist and pilot in 1955. Chosen in NASA’s second astronaut group in 1962, Armstrong flew on Gemini 8 in 1966 before commanding Apollo 11.'
        ]
      },
      {
        heading: 'Preserving Every Word: Eric M. Jones & The Apollo Journals',
        paragraphs: [
          'In 1988, astronomer Eric M. Jones had an epiphany at Johnson Space Center to annotate the air-to-ground transcripts of the Apollo missions—inspired by historian J.C. Beaglehole’s annotated journals of Captain James Cook. Starting in April 1989 with three days of interviews alongside Apollo 17 geologist-astronaut Harrison H. Schmitt, Jones went on to record detailed sessions with ten of the twelve moonwalking astronauts.',
          'First published online in mid-1995, the Apollo Lunar Surface Journal—joined in 1998 by David Woods’ companion Apollo Flight Journal—preserves every conversation, photo, map, and video clip from the lunar surface. Honored with the 2023 NASA Distinguished Public Service Medal and the 2024 AAS Ordway Award before his passing in July 2025 at age 81, Jones left behind a living historical archive of humanity’s first steps on another world.'
        ]
      },
      {
        heading: 'Lunar Reconnaissance Orbiter (LRO), ESSIO & CLPS',
        paragraphs: [
          'Launched on June 18, 2009, NASA’s Lunar Reconnaissance Orbiter (LRO) has studied the Moon up close for longer than any lunar orbiter in history. LRO has photographed the Apollo descent stages and footpath trails in sharp detail while mapping the Moon’s temperature, composition, radiation environment, and South Pole regions with water ice and extended sunlight.',
          'Within NASA’s Science Mission Directorate (SMD), the Exploration Science Strategy Integration Office (ESSIO) integrates National Academy Decadal Survey goals with the Artemis Moon-to-Mars architecture and Commercial Lunar Payload Services (CLPS), building a sustainable lunar economy for rapid, frequent science and human exploration.'
        ]
      }
    ],
    keyDates: [
      { date: 'May 25, 1961', event: 'President John F. Kennedy sets goal of landing humans on the Moon' },
      { date: 'July 16–24, 1969', event: 'Apollo 11 mission launches, lands at Tranquillity Base, and splashes down' },
      { date: 'Mid-1995 & 1998', event: 'Eric M. Jones publishes Apollo Lunar Surface Journal; David Woods launches Apollo Flight Journal' },
      { date: 'June 18, 2009', event: 'Lunar Reconnaissance Orbiter (LRO) launches to map the Moon for future Artemis & CLPS missions' }
    ],
    extraQuizQuestions: [
      {
        id: 'lm-q3',
        question: 'Which NASA orbiter, launched on June 18, 2009, is the longest-lived lunar orbiter in history and photographs the Apollo landing sites while mapping water ice near the Moon’s South Pole?',
        options: [
          'Lunar Reconnaissance Orbiter (LRO)',
          'Cassini-Huygens',
          'Galileo Orbiter',
          'Mariner 10'
        ],
        correctIndex: 0,
        explanation:
          'Launched on June 18, 2009, the Lunar Reconnaissance Orbiter (LRO) has mapped the Moon’s surface, temperature, and South Pole resources in unprecedented detail while imaging all six Apollo descent stages.',
        technicalTerm: 'Lunar Reconnaissance Orbiter (LRO)'
      },
      {
        id: 'lm-q4',
        question: 'Who created the Apollo Lunar Surface Journal in 1995 by interviewing ten of the twelve moonwalking astronauts—beginning with Apollo 17’s Harrison Schmitt—to annotate every lunar transcript?',
        options: [
          'Astronomer Eric M. Jones (joined by David Woods’ Apollo Flight Journal in 1998)',
          'Johannes Kepler',
          'Jules Verne',
          'Isaac Newton'
        ],
        correctIndex: 0,
        explanation:
          'Astronomer Eric M. Jones created the Apollo Lunar Surface Journal (published online in 1995) after interviewing 10 of the 12 moonwalkers, earning NASA’s Distinguished Public Service Medal in 2023.',
        technicalTerm: 'Apollo Lunar Surface Journal Archive'
      }
    ]
  },

  'lunar-rovers': {
    missionId: 'lunar-rovers',
    officialHeader: 'NASA Official Briefing: Apollo 15, 16 & 17 Lunar Roving Vehicles',
    officialSubtitle:
      'Foldable electric 4WD exploration buggies built by Boeing and GM Delco Electronics that expanded astronauts’ reach across lunar mountains and rilles.',
    quickFacts: [
      { label: 'Spacecraft', value: 'Lunar Roving Vehicles LRV-1, LRV-2, and LRV-3' },
      { label: 'Missions', value: 'Apollo 15 (1971), Apollo 16 (1972), and Apollo 17 (1972)' },
      { label: 'Mass', value: '462 lbs (210 kg) on Earth · 77 lbs (34.8 kg) in lunar gravity' },
      { label: 'Total Distance Driven', value: '90.8 km combined across 3 missions (35.9 km record on Apollo 17)' },
      { label: 'Wheels', value: 'Zinc-coated woven steel piano wire mesh with titanium chevron treads' }
    ],
    scientificInstruments: [
      'RCA Color Television Camera on Remote Pan/Tilt Mechanism',
      'Foldable Parabolic High-Gain Umbrella Antenna',
      'Directional Gyroscope & Wheel-Pulse Odometry Dead-Reckoning Computer'
    ],
    historicFirsts: [
      'First crewed wheeled vehicles driven on another celestial body',
      'Filmed the live liftoff of Apollo 17’s Ascent Stage from the Moon on Dec. 14, 1972'
    ],
    inDepthSections: [
      {
        heading: 'Engineering an Electric Car for the Vacuum of the Moon',
        paragraphs: [
          'Built in just 17 months by Boeing and General Motors’ Delco Electronics division, the Lunar Roving Vehicle folded tightly into Quadrant 1 of the Lunar Module Descent Stage. Four independent 0.25-horsepower electric hub motors and woven steel wire-mesh tires allowed astronauts to climb steep craters and explore kilometers from their lander.'
        ]
      },
      {
        heading: 'Filming Apollo 17’s Liftoff & 90.8 Kilometers of Geological Traverses',
        paragraphs: [
          'Across Apollo 15, 16, and 17, the three rovers logged 90.8 kilometers and enabled astronauts to collect diverse highland and valley rock samples, including the 4.5-billion-year-old Genesis Rock and volcanic orange glass soil.',
          'Before departing each site, astronauts parked the rover a short distance away so flight controller Ed Fendell in Houston could remotely tilt the rover’s RCA color TV camera to broadcast the Lunar Module’s ascent into orbit.'
        ]
      }
    ],
    keyDates: [
      { date: 'July 31, 1971', event: 'Apollo 15 astronauts Dave Scott and Jim Irwin take the first lunar drive' },
      { date: 'April 21, 1972', event: 'Apollo 16’s John Young sets the 18 km/h lunar speed record' },
      { date: 'Dec. 14, 1972', event: 'Apollo 17 LRV-3 broadcasts humanity’s final 20th-century lunar liftoff' }
    ],
    extraQuizQuestions: [
      {
        id: 'lrv-q3',
        question: 'How did the Lunar Roving Vehicle navigate back to the Lunar Module since the Moon has no global magnetic field for a compass and no GPS satellites?',
        options: [
          'Using a directional gyroscope and wheel-rotation odometer computer (dead reckoning)',
          'By following paved roads',
          'Using magnetic north compass needles',
          'By trailing a 10-kilometer string behind the seat'
        ],
        correctIndex: 0,
        explanation:
          'An onboard directional gyroscope combined with wheel-rotation counters continuously calculated the exact bearing and distance back to the Lunar Module.',
        technicalTerm: 'Gyroscopic Dead-Reckoning Navigation'
      },
      {
        id: 'lrv-q4',
        question: 'How was the live television video of Apollo 17 blasting off from the Moon captured on December 14, 1972?',
        options: [
          'By the RCA color TV camera mounted on the parked Lunar Roving Vehicle, tilted remotely from Mission Control in Houston',
          'By a drone hovering overhead',
          'By an astronaut left behind with a film camera',
          'By the Hubble Space Telescope'
        ],
        correctIndex: 0,
        explanation:
          'Astronauts parked LRV-3 near the lander so Mission Control could remotely pan and tilt its camera, timing the 1.3-second radio delay to track the Ascent Stage into orbit.',
        technicalTerm: 'Remote Lunar Television Uplink'
      }
    ]
  },

  'alsep-packages': {
    missionId: 'alsep-packages',
    officialHeader: 'NASA Official Briefing: ALSEP & Lunar Laser Retroreflectors',
    officialSubtitle:
      'Nuclear-powered geophysical stations that recorded 12,000+ moonquakes — and passive quartz corner-cube mirrors still reflecting Earth’s lasers today.',
    quickFacts: [
      { label: 'Prime Contractor', value: 'Bendix Aerospace Systems Division (Ann Arbor, Michigan)' },
      { label: 'Power Source', value: 'SNAP-27 Plutonium-238 RTG (~70 Watts continuous)' },
      { label: 'Radio Operations', value: 'July 1969 – Sept. 30, 1977 (12,000+ seismic events logged)' },
      { label: 'Active Today', value: 'Lunar Laser Ranging Retroreflector (LRRR) arrays on Apollo 11, 14 & 15' }
    ],
    scientificInstruments: [
      'Laser Ranging Retroreflector (LRRR — 100- to 300-corner-cube fused silica prism arrays)',
      'Passive & Active Seismic Experiments',
      'Lunar Surface Magnetometer & Heat Flow Probe',
      'Solar Wind Spectrometer & Suprathermal Ion Detector'
    ],
    historicFirsts: [
      'Discovered that the Moon is receding from Earth by 3.8 centimeters per year',
      'Mapped the Moon’s crust, mantle, and small partially molten core via 12,000+ moonquakes'
    ],
    inDepthSections: [
      {
        heading: 'Why Apollo’s Laser Mirrors Still Work After 55+ Years',
        paragraphs: [
          'While NASA commanded ALSEP’s nuclear-powered radio transmitters off on Sept. 30, 1977, the Lunar Laser Retroreflector arrays need zero electrical power. Their corner-cube quartz prisms bounce laser pulses from Earth observatories straight back to their source, measuring the Earth-Moon distance to millimeter precision.'
        ]
      },
      {
        heading: '12,000 Moonquakes & The Internal Structure of the Moon',
        paragraphs: [
          'Powered through freezing 14-day lunar nights by SNAP-27 Plutonium-238 generators, the ALSEP seismic network recorded deep tidal moonquakes, meteorite impacts, and shallow tectonic tremors that revealed the thickness of the lunar crust and a small, partially molten lunar core.'
        ]
      }
    ],
    keyDates: [
      { date: 'July 20, 1969', event: 'First Laser Ranging Retroreflector deployed at Tranquillity Base' },
      { date: 'Nov. 19, 1969', event: 'First SNAP-27 RTG-powered ALSEP deployed on Apollo 12' },
      { date: 'Sept. 30, 1977', event: 'ALSEP radio transmitters turned off; passive laser mirrors remain active today' }
    ],
    extraQuizQuestions: [
      {
        id: 'alsep-q3',
        question: 'What did scientists discover by bouncing laser beams off the Apollo Lunar Laser Retroreflectors over several decades?',
        options: [
          'That the Moon is slowly spiraling away from Earth by about 3.8 centimeters per year',
          'That the Moon is shrinking by 10 kilometers a day',
          'That laser light cannot travel through space',
          'That the Moon spins once every 10 minutes'
        ],
        correctIndex: 0,
        explanation:
          'Millimeter-accurate laser ranging proved that tidal interactions between Earth’s oceans and the Moon push the Moon outward by 3.8 cm every year.',
        technicalTerm: 'Lunar Laser Ranging (LLR)'
      },
      {
        id: 'alsep-q4',
        question: 'How did the ALSEP geophysical stations survive the freezing 354-hour (14-Earth-day) lunar nights without solar power?',
        options: [
          'Using SNAP-27 Radioisotope Thermoelectric Generators (RTGs) fueled by Plutonium-238',
          'By burning coal on the lunar surface',
          'Using wind turbines in lunar craters',
          'By plugging into the Lunar Rover’s headlights'
        ],
        correctIndex: 0,
        explanation:
          'Each ALSEP station on Apollo 12, 14, 15, 16, and 17 was powered by a SNAP-27 RTG that generated ~70 watts of continuous electricity day and night for up to 8 years.',
        technicalTerm: 'SNAP-27 Radioisotope Power System'
      }
    ]
  },

  'surveyor-landers': {
    missionId: 'surveyor-landers',
    officialHeader: 'NASA Official Briefing: Surveyor 1 (Surveyor-A) Lunar Soft-Lander',
    officialSubtitle:
      'NASA’s first true soft-landing on the Moon — achieved on the very first try on June 2, 1966, in the Ocean of Storms.',
    quickFacts: [
      { label: 'Spacecraft', value: 'Surveyor-A (Surveyor 1 · NSSDCA 1966-045A)' },
      { label: 'Mission Management', value: 'NASA / Jet Propulsion Laboratory (JPL) · Built by Hughes Aircraft Company' },
      { label: 'Launch Date & Time', value: 'May 30, 1966 / 14:41:01 UT' },
      { label: 'Launch Vehicle & Site', value: 'Atlas Centaur (AC-10 / Atlas D no. 290 / Centaur D) · Cape Canaveral LC-36A' },
      { label: 'Spacecraft Mass', value: '2,194 lbs (995.2 kg) at launch · 649 lbs (294.3 kg) landed on Moon' },
      { label: 'Structure', value: '10-ft (3-m) tall, 60-lb (27-kg) thin-walled aluminum triangular frame' },
      { label: 'Touchdown', value: 'June 2, 1966 at 06:17:36 UT (63.6 hours after launch) in Ocean of Storms' },
      { label: 'Coordinates', value: '2.46° S latitude, 43.32° W longitude (just 9 miles / 14 km from target)' },
      { label: 'Images Returned', value: '11,240 high-resolution TV images by July 6, 1966' },
      { label: 'Mission End', value: 'Primary mission completed July 14, 1966 · Final contact Jan. 7, 1967' }
    ],
    scientificInstruments: [
      'Scanning Periscope Television Camera (200- and 600-line resolution)',
      'Doppler Velocity-Sensing Radar & Closed-Loop Descent Computer',
      'Landing Pad Aircraft-Type Shock Absorbers & Strain Gauges (measuring lunar soil bearing strength)',
      'Solid-Propellant Central Retro-Rocket Engine (>60% of launch mass)'
    ],
    historicFirsts: [
      'First true U.S. soft-landing on the Moon — achieved on the very first attempt (June 2, 1966)',
      'Transmitted 11,240 high-resolution lunar surface photographs across two lunar days',
      'Proved the lunar surface inside a 62-mile (100-km) crater could safely support Apollo landers'
    ],
    inDepthSections: [
      {
        heading: 'Building America’s First True Lunar Soft-Lander',
        paragraphs: [
          'In January 1961, NASA selected Hughes Aircraft Company under the technical direction of NASA’s Jet Propulsion Laboratory (JPL) to build a series of seven soft-landing vehicles to land gently on the Moon, analyze the surface, and relay television pictures back to Earth.',
          'Unlike earlier impact probes, Surveyor 1 was a true soft-lander: a 10-foot (3-meter) tall spacecraft built around a 60-pound (27-kilogram) thin-walled aluminum triangular frame with three shock-absorbing legs and a central solid-propellant retro-rocket engine that made up over 60% of the spacecraft’s total launch mass. A Doppler velocity-sensing radar fed real-time speed data into the onboard computer to control the descent, while strain gauges on the three landing pads measured touchdown forces for future Apollo missions.'
        ]
      },
      {
        heading: '63.6 Hours to the Ocean of Storms & 11,240 Photos',
        paragraphs: [
          'Launched May 30, 1966, at 14:41:01 UT from Cape Canaveral Launch Complex 36A atop an Atlas Centaur (AC-10) rocket, Surveyor 1 achieved a soft landing on its very first try at 06:17:36 UT on June 2, 1966—just 63.6 hours after liftoff. It touched down at 2.46° S, 43.32° W in the southwestern Ocean of Storms, only 9 miles (14 kilometers) from its planned bullseye, weighing 649 pounds (294.3 kilograms) on landing.',
          'Panoramic views revealed Surveyor 1 resting inside a 62-mile (100-kilometer) diameter crater rimmed by low distant mountains and scattered with boulders over 3 feet (1 meter) wide. By July 6, 1966, the lander had transmitted 11,240 high-resolution images across two communication sessions. Its primary mission concluded July 14, 1966, and NASA maintained contact until Jan. 7, 1967.'
        ]
      }
    ],
    keyDates: [
      { date: 'May 30, 1966', event: 'Launched at 14:41:01 UT from Cape Canaveral LC-36A on Atlas Centaur AC-10' },
      { date: 'June 2, 1966', event: 'Soft-landing on the Moon at 06:17:36 UT in the Ocean of Storms (2.46° S, 43.32° W)' },
      { date: 'July 6, 1966', event: 'Completed transmission of 11,240 high-resolution lunar surface TV images' },
      { date: 'July 14, 1966', event: 'Primary mission officially completed' },
      { date: 'Jan. 7, 1967', event: 'Final contact with Surveyor 1 ended' }
    ],
    extraQuizQuestions: [
      {
        id: 'surv-q3',
        question: 'How was Surveyor 1’s 10-foot-tall frame built, and what single component made up more than 60% of its 2,194-pound (995.2 kg) launch mass?',
        options: [
          'A 60-pound thin-walled aluminum triangular frame carrying a large central solid-propellant retro-rocket engine (>60% of total mass)',
          'A solid cast-iron sphere filled with water',
          'An inflatable rubber balloon with no rocket engine',
          'A winged glider made of titanium'
        ],
        correctIndex: 0,
        explanation:
          'Surveyor 1 was built around a lightweight 60-pound (27 kg) thin-walled aluminum triangular frame, with its central solid-propellant retro-rocket engine accounting for over 60% of its launch mass.',
        technicalTerm: 'Retro-Rocket & Doppler Radar Descent'
      },
      {
        id: 'surv-q4',
        question: 'How many high-resolution television pictures did Surveyor 1 transmit from the Ocean of Storms after its June 2, 1966 touchdown?',
        options: [
          'Only 3 blurry photos',
          '11,240 high-resolution images across two lunar communication sessions',
          '500,000 color movies',
          'Zero—its camera broke on landing'
        ],
        correctIndex: 1,
        explanation:
          'Landing just 9 miles (14 km) from its target in the Ocean of Storms, Surveyor 1 transmitted 11,240 high-resolution images showing boulders and distant crater mountain crests.',
        technicalTerm: 'Lunar Surface Vidicon Telemetry'
      }
    ]
  },

  'sojourner-rover': {
    missionId: 'sojourner-rover',
    officialHeader: 'NASA Official Briefing: Mars Pathfinder & Sojourner Rover',
    officialSubtitle:
      'Demonstrated the giant bouncing airbag landing system and delivered the first-ever robotic rover, Sojourner, to the ancient flood plain of Ares Vallis.',
    quickFacts: [
      { label: 'Mission Type', value: 'Lander (Carl Sagan Memorial Station) & Free-Ranging Rover (Sojourner)' },
      { label: 'Launch Date', value: 'Dec. 4, 1996 UTC on a Delta II 7925 from Cape Canaveral Air Force Station' },
      { label: 'Mars Landing', value: 'July 4, 1997 in Ares Vallis (ancient catastrophic flood plain)' },
      { label: 'Rover Size & Mass', value: '23 pounds (10.6 kg) · 1 foot (30 cm) tall · Rolled down 20° ramp on Sol 2 (July 5)' },
      { label: 'Airbag Touchdown', value: '19-ft (5.8-m) airbags hit at 31 mph (14 m/s), bounced ~15 times up to 50 ft (15 m) high' },
      { label: 'Total Data Returned', value: '2.3 billion bits · >16,500 lander images · 550 rover images · >15 rock/soil chemical analyses' },
      { label: 'End of Mission', value: 'Sept. 27, 1997' }
    ],
    scientificInstruments: [
      'Alpha Proton X-ray Spectrometer (APXS — elemental composition of rocks and soils)',
      'Three Cameras (Imager for Mars Pathfinder [IMP] on lander + front stereo & rear cameras on Sojourner)',
      'Atmospheric Structure Instrument / Meteorology Package (ASI/MET — descent profile & surface weather)'
    ],
    historicFirsts: [
      'First robotic rover ever to operate on the surface of Mars (Sojourner)',
      'First planetary mission to use an inflatable giant airbag landing system',
      'Constrained the radius of Mars’s central metallic core to between 800 and 1,250 miles (1,300–2,000 km) via precision radio tracking'
    ],
    inDepthSections: [
      {
        heading: 'Bouncing Like a Giant Beach Ball into Ares Vallis',
        paragraphs: [
          'Launched Dec. 4, 1996, on a Delta II 7925 rocket, Mars Pathfinder directly entered the Martian atmosphere on July 4, 1997, slowed by a parachute and cushioned by a giant 19-foot (5.8-meter) diameter airbag system. Hitting the ground at 31 mph (14 meters per second), Pathfinder bounced like a beach ball about 15 times—soaring as high as 50 feet (15 meters)—before rolling to a stop 2.5 minutes later about six-tenths of a mile (1 kilometer) from initial impact.',
          'The lander, renamed the Carl Sagan Memorial Station to honor the famed astronomer, settled in Ares Vallis—an ancient northern flood plain carved early in Mars’s history by a catastrophic flood holding as much water as North America’s Great Lakes in just two weeks. Late on the second Martian day (Sol 2, night of July 5), the 23-pound (10.6-kg) Sojourner rover (named after civil-rights crusader Sojourner Truth) stood up to its full 1-foot (30-cm) height and rolled down the lander’s 20-degree rear ramp.'
        ]
      },
      {
        heading: '2.3 Billion Bits of Science: Conglomerates, Maghemite & Mars’s Core',
        paragraphs: [
          'Before final transmission on Sept. 27, 1997, Pathfinder and Sojourner returned 2.3 billion bits of data, including over 16,500 lander images, 550 rover images, and more than 15 chemical analyses of Martian rocks and soil. Rounded pebbles and cobbles at the site pointed to conglomerates formed in running liquid water during a warmer past.',
          'Precision radio tracking of Pathfinder measured Mars’s pole of rotation and showed that the planet’s central metallic core has a radius between 800 miles (1,300 km) and 1,250 miles (2,000 km). Magnetic targets also revealed that airborne Martian dust contains maghemite—a strongly magnetic iron oxide mineral likely freeze-dried onto dust grains by an ancient active water cycle—while sensors tracked frequent dust devils, early-morning water-ice clouds, and morning temperature eddies.'
        ]
      }
    ],
    keyDates: [
      { date: 'Dec. 4, 1996', event: 'Launched from Cape Canaveral Air Force Station on a Delta II 7925 rocket' },
      { date: 'July 4, 1997', event: 'Airbag-cushioned landing in Ares Vallis (bounced ~15 times up to 50 ft high)' },
      { date: 'July 5, 1997 (Sol 2)', event: 'Sojourner stands to 1 foot (30 cm) and rolls down the 20-degree lander ramp' },
      { date: 'Sept. 27, 1997', event: 'Final data transmission after returning 2.3 billion bits and 17,050+ total images' }
    ],
    extraQuizQuestions: [
      {
        id: 'soj-q3',
        question: 'How did Mars Pathfinder cushion its 31 mph (14 m/s) impact on July 4, 1997, and whom were the lander and rover named after?',
        options: [
          'It used 19-foot diameter airbags that bounced ~15 times (up to 50 ft high); the lander was named the Carl Sagan Memorial Station and the rover was named after Sojourner Truth',
          'It splashed down in a Martian lake; named after Galileo and Newton',
          'It used giant steel springs; named after Apollo and Artemis',
          'It was caught by a helicopter in mid-air'
        ],
        correctIndex: 0,
        explanation:
          'Pathfinder pioneered the 19-foot (5.8 m) airbag landing technique, bouncing ~15 times across Ares Vallis before unfolding the Carl Sagan Memorial Station and deploying the Sojourner rover.',
        technicalTerm: 'Airbag Entry, Descent & Landing (EDL)'
      },
      {
        id: 'soj-q4',
        question: 'What did Mars Pathfinder’s magnetic dust targets and precision radio tracking reveal about Mars’s dust and deep interior?',
        options: [
          'Airborne dust contains magnetic maghemite (freeze-dried iron oxide from an ancient water cycle), and Mars has a central metallic core 800 to 1,250 miles (1,300–2,000 km) in radius',
          'Mars is hollow on the inside and its dust is made of plastic',
          'Mars has no iron anywhere on the planet',
          'The dust is made of pure gold flakes'
        ],
        correctIndex: 0,
        explanation:
          'Radio tracking constrained Mars’s metallic core radius to 1,300–2,000 km, while magnetic targets identified airborne maghemite—an iron oxide mineral leached and freeze-dried by ancient water.',
        technicalTerm: 'Maghemite Dust & Core Moment of Inertia'
      }
    ]
  },

  'spirit-opportunity': {
    missionId: 'spirit-opportunity',
    officialHeader: 'NASA Official Briefing: Spirit (MER-A) & Opportunity (MER-B) Twin Rovers',
    officialSubtitle:
      'Spirit unearthed hydrothermal silica from ancient hot springs at Gusev Crater; Opportunity drove a record 28.06 miles (45.16 km) to Perseverance Valley.',
    quickFacts: [
      { label: 'Spacecraft Designations', value: 'Spirit: MER-A (MER 2 · 2003-027A) & Opportunity: MER-B (MER 1 · 2003-032A)' },
      { label: 'Launch Mass (Each)', value: '2,341 pounds (1,062 kilograms) total spacecraft launch mass' },
      { label: 'Spirit Launch', value: 'June 10, 2003 / 10:58:47 PDT on Delta 7925-9.5 (no. D298) from SLC-17A' },
      { label: 'Opportunity Launch', value: 'July 7, 2003 / 20:18:15 PDT on Delta 7925H (no. D299) from SLC-17B' },
      { label: 'Spirit Operations', value: '6 years, 2 months, 19 days (>25× intended lifetime) · Drove 4.8 miles (7.73 km)' },
      { label: 'Opportunity Operations', value: 'Nearly 15 years (>60× life expectancy) · Drove 28.06 miles (45.16 km)' },
      { label: 'Spirit End of Mission', value: 'Last heard March 22, 2010 · Recovery ended May 25, 2011 (>1,300 commands sent)' },
      { label: 'Opportunity End of Mission', value: 'Last heard June 10, 2018 (global dust storm) · End declared Feb. 13, 2019' }
    ],
    scientificInstruments: [
      '1. Panoramic Mast Assembly: (a) Panoramic Cameras (Pancam), (b) Navigation Cameras (Navcam), (c) Miniature Thermal Emission Spectrometer (Mini-TES)',
      '2. Mössbauer Spectrometer (MB)',
      '3. Alpha Particle X-ray Spectrometer (APXS)',
      '4. Magnets (to collect airborne magnetic dust particles)',
      '5. Microscopic Imager (MI)',
      '6. Rock Abrasion Tool (RAT)'
    ],
    historicFirsts: [
      'Opportunity: First human enterprise to exceed a full marathon distance (26.219 miles / 42.195 km) on another world',
      'Opportunity: Drove 28.06 miles (45.16 km) and conquered the steepest slope driven by any rover on Mars',
      'Spirit (2007): Unearthed nearly pure opaline silica ("Gertrude Weise") while dragging its right-front wheel—evidence of ancient hot springs or steam vents',
      'Spirit (2006): Discovered explosive volcanic/impact rocks at "Home Plate" and bright sulfur-rich soil at "Tyrone"'
    ],
    inDepthSections: [
      {
        heading: 'Opportunity (MER-B): The 28.06-Mile Interplanetary Marathoner',
        paragraphs: [
          'Launched July 7, 2003, from Cape Canaveral SLC-17B on a Delta 7925H rocket and landing on Jan. 24, 2004, NASA’s Opportunity rover operated for almost 15 years—exceeding its 90-day life expectancy by 60 times! Tasked with studying sites where ancient Mars may have supported microbial life, Opportunity broke off-world driving records set by Apollo 17’s lunar rover and the Soviet Lunokhod 2 rover.',
          'Opportunity became the first human enterprise to surpass a marathon distance (26.219 miles / 42.195 kilometers) on another world and logged 28.06 miles (45.16 kilometers) by the time it reached Perseverance Valley—a record that stood until NASA’s Perseverance rover surpassed it. Opportunity ceased communicating on June 10, 2018, when a severe Mars-wide dust storm blanketed its site, and NASA declared End of Mission on Feb. 13, 2019.'
        ]
      },
      {
        heading: 'Spirit (MER-A): Hot Springs Silica at "Gertrude Weise" & Home Plate',
        paragraphs: [
          'Launched June 10, 2003, from SLC-17A on a Delta 7925-9.5 rocket, Spirit operated for 6 years, 2 months, and 19 days (>25 times its original intended lifetime) and traveled 4.8 miles (7.73 kilometers). In 2004 it discovered water-altered bedrock in the Columbia Hills; in 2005 it captured movies of Martian dust devils in motion; and in 2006 it uncovered bright sulfur-rich soil at "Tyrone" and coarse bulbous rock layers at the "Home Plate" plateau caused by an ancient volcanic or impact explosion.',
          'Spirit’s greatest discovery happened by accident in 2007: while dragging its stuck right-front wheel like an anchor, it churned up a bright patch of nearly pure silica—the main ingredient of window glass—dubbed "Gertrude Weise." Because pure silica forms around hot springs or volcanic steam vents, Spirit proved ancient Mars had warm, wet environments friendly to microbial life! After March 22, 2010, extreme winter cold disabled its survival heaters, and NASA concluded recovery efforts on May 25, 2011, after sending more than 1,300 commands.'
        ]
      }
    ],
    keyDates: [
      { date: 'June 10 & July 7, 2003', event: 'Spirit (MER-A) and Opportunity (MER-B) launch from Cape Canaveral' },
      { date: 'Jan. 4 & Jan. 24, 2004', event: 'Spirit lands in Gusev Crater; Opportunity lands in Meridiani Planum' },
      { date: '2006–2007 (Spirit)', event: 'Spirit investigates Home Plate & unearths pure silica patch "Gertrude Weise"' },
      { date: 'March 22, 2010 / May 25, 2011', event: 'Spirit’s final communication and official end of recovery efforts' },
      { date: 'June 10, 2018 / Feb. 13, 2019', event: 'Opportunity’s final signal in Perseverance Valley (45.16 km) & End of Mission' }
    ],
    extraQuizQuestions: [
      {
        id: 'mer-q3',
        question: 'What remarkable discovery did the Spirit rover make in 2007 while dragging its stuck right-front wheel across Gusev Crater?',
        options: [
          'It unearthed a patch of nearly pure silica (dubbed "Gertrude Weise") formed in ancient hot springs or steam vents',
          'It found a buried titanium spacecraft',
          'It struck liquid crude oil',
          'It uncovered solid diamonds'
        ],
        correctIndex: 0,
        explanation:
          'Dragging its immobile right-front wheel scraped away topsoil to reveal "Gertrude Weise"—a patch of nearly pure opaline silica produced by ancient hot springs or steam vents!',
        technicalTerm: 'Hydrothermal Opaline Silica'
      },
      {
        id: 'mer-q4',
        question: 'How far did Opportunity drive across Mars before the June 2018 dust storm ended its mission in Perseverance Valley?',
        options: [
          'Only 500 meters',
          '28.06 miles (45.16 kilometers)—exceeding its life expectancy by 60 times and becoming the first craft to pass a marathon distance on another world',
          '1,000 kilometers around the equator',
          '4.8 miles (7.73 kilometers)'
        ],
        correctIndex: 1,
        explanation:
          'While Spirit drove 4.8 miles (7.73 km), Opportunity drove 28.06 miles (45.16 km), becoming the first human enterprise to exceed a marathon distance (26.219 miles) on another world.',
        technicalTerm: 'Extraterrestrial Odometry Record'
      }
    ]
  },

  'viking-landers': {
    missionId: 'viking-landers',
    officialHeader: 'NASA Official Briefing: Viking 1 & Viking 2 — 50 Years on Mars',
    officialSubtitle:
      'The two-part orbiter and lander missions that transmitted the first images from the Martian surface and searched the soil for signs of life.',
    quickFacts: [
      { label: 'Viking 1 Launch', value: 'Aug. 20, 1975 on Titan IIIE-Centaur from Cape Canaveral, Florida' },
      { label: 'Viking 1 Touchdown', value: 'July 20, 1976 at Chryse Planitia (22.27° N, 312.05° E, planetocentric)' },
      { label: 'Viking 2 Launch', value: 'Sept. 9, 1975 UTC on Titan IIIE-Centaur from Cape Canaveral, Florida' },
      { label: 'Viking 2 Touchdown', value: 'Sept. 3, 1976 at Utopia Planitia (47.64° N, 134.29° E, planetocentric)' },
      { label: 'Mass & Nominal Power', value: '883 kilograms · 620 Watts (Orbiter) / Plutonium RTGs (Landers)' },
      { label: 'Orbiter Lifetimes', value: 'Viking Orbiter 1: 1,488 orbits (ended Aug. 7, 1980) · Orbiter 2: ended July 25, 1978' },
      { label: 'Lander Final Signals', value: 'Viking Lander 1: Nov. 11, 1982 (>6 years) · Viking Lander 2: April 11, 1980' }
    ],
    scientificInstruments: [
      'Robotic Surface Sampler Arm & Special Automated Biological Laboratory',
      'Gas Chromatograph Mass Spectrometer (GCMS)',
      'X-Ray Fluorescence Spectrometer (inorganic chemical elements)',
      'Dual Facsimile Scanning Cameras',
      'Meteorology Boom (pressure, temperature, wind speed & direction)',
      'Radioisotope Thermoelectric Generators (RTGs — electricity from decaying plutonium heat)'
    ],
    historicFirsts: [
      'Viking 1: First successful lander on Mars and first images transmitted from the Martian surface (July 20, 1976)',
      'Performed the first Martian soil sample and biological life-detection experiments',
      'Detected all chemical elements essential to life on Earth: carbon, nitrogen, hydrogen, oxygen, and phosphorus',
      'Characterized Mars’s volcanic soil, thin dry CO₂ atmosphere, and ancient riverbeds and vast flooding'
    ],
    inDepthSections: [
      {
        heading: 'Viking 1 at Chryse Planitia: Six Years of Discovery',
        paragraphs: [
          'Throughout history, Mars had been in sight, but never within reach—until July 20, 1976, when NASA’s Viking 1 lander touched down safely at Chryse Planitia (22.27° N, 312.05° E, planetocentric) and transmitted the first images from the surface of the Red Planet. Consisting of both an orbiter and a lander launched Aug. 20, 1975, on a Titan IIIE-Centaur rocket, Viking 1 was planned for 90 days after landing yet operated for more than six years!',
          'Because sunlight varies on Mars, both Viking landers were powered by radioisotope thermoelectric generators (RTGs)—devices that generate electricity from the natural decay heat of plutonium. That reliable power allowed Viking 1 to scoop the first Martian soil samples for its biological laboratory and operate until its final transmission on Nov. 11, 1982, while Viking Orbiter 1 completed 1,488 orbits before concluding its mission on Aug. 7, 1980.'
        ]
      },
      {
        heading: 'Viking 2 at Utopia Planitia & The Essential Elements of Life',
        paragraphs: [
          'Launched Sept. 9, 1975 UTC, Viking 2 landed at Utopia Planitia (47.64° N, 134.29° E, planetocentric) on Sept. 3, 1976. While neither Viking 1 nor Viking 2 found traces of living microbes, they discovered all the chemical elements essential to life on Earth: carbon, nitrogen, hydrogen, oxygen, and phosphorus—and revealed striking orbital and surface evidence of ancient riverbeds and vast catastrophic flooding. Viking Orbiter 2 operated until July 25, 1978, and Viking Lander 2 sent its final data on April 11, 1980.'
        ]
      }
    ],
    keyDates: [
      { date: 'Aug. 20 & Sept. 9, 1975', event: 'Viking 1 and Viking 2 launch on Titan IIIE-Centaur rockets from Cape Canaveral' },
      { date: 'July 20, 1976', event: 'Viking 1 lands at Chryse Planitia (22.27° N, 312.05° E) and sends first surface images' },
      { date: 'Sept. 3, 1976', event: 'Viking 2 lands at Utopia Planitia (47.64° N, 134.29° E)' },
      { date: 'July 25, 1978 & Aug. 7, 1980', event: 'Viking Orbiter 2 and Viking Orbiter 1 (1,488 orbits) conclude operations' },
      { date: 'April 11, 1980 & Nov. 11, 1982', event: 'Final transmissions received from Viking Lander 2 and Viking Lander 1' }
    ],
    extraQuizQuestions: [
      {
        id: 'vik-q3',
        question: 'Where did Viking 1 and Viking 2 land in 1976, and which five elements essential to life on Earth did they find on Mars?',
        options: [
          'Chryse Planitia (22.27° N, 312.05° E) and Utopia Planitia (47.64° N, 134.29° E); they found carbon, nitrogen, hydrogen, oxygen, and phosphorus',
          'Olympus Mons and Valles Marineris; they found only helium and neon',
          'The Martian South Pole; they found liquid ocean water',
          'Phobos and Deimos; they found pure gold'
        ],
        correctIndex: 0,
        explanation:
          'Viking 1 landed at Chryse Planitia on July 20, 1976, and Viking 2 landed at Utopia Planitia on Sept. 3, 1976. Together they confirmed carbon, nitrogen, hydrogen, oxygen, and phosphorus on Mars.',
        technicalTerm: 'Biogenic Elements (CHONP)'
      },
      {
        id: 'vik-q4',
        question: 'How many orbits of Mars did Viking Orbiter 1 complete before ending its mission on Aug. 7, 1980, and how long did Viking Lander 1 operate compared to its 90-day plan?',
        options: [
          '10 orbits and 2 days on the surface',
          '1,488 orbits of Mars, while RTG-powered Viking Lander 1 operated for more than 6 years until Nov. 11, 1982',
          '100 orbits and 1 month on the surface',
          '50,000 orbits and 50 years on the surface'
        ],
        correctIndex: 1,
        explanation:
          'Planned for just 90 days after landing, Viking Orbiter 1 completed 1,488 orbits over 4 years, and Plutonium RTG-powered Viking Lander 1 operated for over 6 years until Nov. 11, 1982.',
        technicalTerm: 'Orbiter-Lander Mission Architecture'
      }
    ]
  },

  'phoenix-insight': {
    missionId: 'phoenix-insight',
    officialHeader: 'NASA Official Briefing: Mars Phoenix Arctic Lander & InSight',
    officialSubtitle:
      'Phoenix touched down in the Martian Arctic (Vastitas Borealis) on May 25, 2008, confirming subsurface water ice and discovering perchlorates.',
    quickFacts: [
      { label: 'Phoenix Launch', value: 'Aug. 4, 2007 UTC on a Delta II from Cape Canaveral Air Force Station' },
      { label: 'Atmospheric Entry Speed', value: 'Nearly 13,000 mph (21,000 km/h) on May 25, 2008' },
      { label: 'Phoenix Touchdown', value: 'May 25, 2008 at 23:38:38 UT in Green Valley, Vastitas Borealis (Arctic plains)' },
      { label: 'Robotic Arm & Mast', value: 'Nearly 8-ft (2.5-m) robotic arm · 6.6-ft (2-m) stereo camera mast' },
      { label: 'Atmospheric Lidar Scan', value: 'Scanned clouds, fog, and dust plumes up to 12.4 miles (20 km) altitude' },
      { label: 'Phoenix End of Mission', value: 'Nov. 2, 2008 (after completing its 90-day mission & Sept. 30 extension)' }
    ],
    scientificInstruments: [
      'Surface Stereo Imager (SSI — on 2-meter / 6.6-foot mast)',
      'Robotic Arm Camera (RAC — on nearly 8-foot / 2.5-meter digging arm)',
      'Microscopy, Electrochemistry, and Conductivity Analyzer (MECA — wet chemistry lab)',
      'Thermal and Evolved Gas Analyzer (TEGA — portable ovens led by William Boynton, Univ. of Arizona)',
      'Meteorological Station (MET — temperature, pressure, and 20-km LIDAR atmospheric scanner)'
    ],
    historicFirsts: [
      'First successful landing of a stationary soft-lander on Mars since Viking 2 (32 years earlier) and farthest north of any Mars mission',
      'First time one spacecraft photographed another during a planetary landing (imaged under its parachute by MRO’s HiRISE camera)',
      'Officially verified water ice on Mars (July 31, 2008) in the "Dodo-Goldilocks" trench and TEGA ovens',
      'Discovered perchlorate salts and alkaline soil nutrients (sodium, magnesium, chloride, potassium) on Aug. 5 & Sept. 12, 2008'
    ],
    inDepthSections: [
      {
        heading: 'Touchdown in Green Valley & The "Dodo-Goldilocks" Ice Trench',
        paragraphs: [
          'Entering the Martian atmosphere at nearly 13,000 mph (21,000 km/h) on May 25, 2008, Phoenix touched down safely at 23:38:38 UT in the Green Valley of Vastitas Borealis—at a northern Arctic latitude equivalent to northern Alaska. During descent, Mars Reconnaissance Orbiter’s HiRISE camera photographed Phoenix suspended from its parachute, the first time one spacecraft ever photographed another landing on a planet!',
          'Phoenix waited 15 minutes for the dust to settle before unfurling its solar panels, revealing a flat Arctic plain with polygonal ice troughs. On May 31, its nearly 8-foot (2.5-meter) robotic arm began scooping soil. By June 19, scientists saw bright dice-sized clumps in the "Dodo-Goldilocks" trench vaporize (sublimate) over four days—and on July 31, 2008, NASA officially announced the confirmation of water ice on Mars after heating a sample inside the Thermal and Evolved Gas Analyzer (TEGA).'
        ]
      },
      {
        heading: 'Perchlorates, Alkaline Soil & 20-Kilometer Weather Scans',
        paragraphs: [
          'On Aug. 5, 2008, the Phoenix team announced the discovery of perchlorates—a chemical salt that can serve as an energy source for microbes, lower the freezing point of water, and act as a future resource for human explorers. On Sept. 12, Phoenix’s wet chemistry laboratory (MECA) mixed Earth water with Martian dirt and revealed that the soil is alkaline, containing soluble nutrients including sodium, magnesium, chloride, and potassium.',
          'Meanwhile, Phoenix’s Meteorological Station scanned the Martian atmosphere up to 12.4 miles (20 kilometers) in altitude—tracking clouds, fog, dust plumes, and even snow falling from Martian clouds before polar darkness ended the mission on Nov. 2, 2008.'
        ]
      }
    ],
    keyDates: [
      { date: 'Aug. 4, 2007', event: 'Phoenix launches on a Delta II rocket from Cape Canaveral' },
      { date: 'May 25, 2008', event: 'Enters atmosphere at 13,000 mph and lands at 23:38:38 UT in Vastitas Borealis' },
      { date: 'June 19 & July 31, 2008', event: 'Ice vaporizes in "Dodo-Goldilocks" trench; TEGA officially confirms water on Mars' },
      { date: 'Aug. 5 & Sept. 12, 2008', event: 'Phoenix announces discovery of perchlorates and alkaline soil salts' },
      { date: 'Nov. 2, 2008', event: 'Phoenix mission concludes as Martian Arctic winter sets in' }
    ],
    extraQuizQuestions: [
      {
        id: 'phx-q3',
        question: 'How did Mars Phoenix prove that the bright material dug up in the "Dodo-Goldilocks" trench in June–July 2008 was real water ice?',
        options: [
          'Clumps of bright material vaporized (sublimated) over four days in the trench, and the Thermal and Evolved Gas Analyzer (TEGA) ovens confirmed water vapor on July 31, 2008',
          'Fish swam out of the trench',
          'It melted into a boiling geyser',
          'Astronauts tasted it in person'
        ],
        correctIndex: 0,
        explanation:
          'Bright crumbs in the Dodo-Goldilocks trench sublimated over four days, and heating a sample inside TEGA’s tiny ovens officially confirmed water ice on July 31, 2008.',
        technicalTerm: 'TEGA Mass Spectrometry & Sublimation'
      },
      {
        id: 'phx-q4',
        question: 'What important chemical did Phoenix discover on Mars on Aug. 5, 2008—and what historic photography milestone occurred during Phoenix’s parachute descent?',
        options: [
          'Phoenix discovered perchlorate salts in alkaline soil, and Mars Reconnaissance Orbiter’s HiRISE camera photographed Phoenix dangling under its parachute',
          'Phoenix discovered liquid gasoline, and Hubble photographed its wheels',
          'Phoenix found sulfuric acid lakes',
          'Phoenix found pure diamond dust'
        ],
        correctIndex: 0,
        explanation:
          'MRO’s HiRISE camera captured Phoenix suspended from its parachute during landing (a first in spaceflight), and Phoenix’s MECA/TEGA labs discovered perchlorates and alkaline nutrients.',
        technicalTerm: 'Martian Perchlorates & HiRISE Descent Imaging'
      }
    ]
  },

  'ingenuity-helicopter': {
    missionId: 'ingenuity-helicopter',
    officialHeader: 'NASA Official Briefing: Ingenuity Mars Helicopter',
    officialSubtitle:
      'Completed 72 historic flights in Jezero Crater from April 19, 2021, to Jan. 18, 2024 — demonstrating the first powered, controlled flight on another planet.',
    quickFacts: [
      { label: 'Launch Date', value: 'July 30, 2020 from Cape Canaveral Air Force Station, Florida' },
      { label: 'Mars Landing', value: 'Feb. 18, 2021 at Jezero Crater (attached to Perseverance rover)' },
      { label: 'First & Last Flight', value: 'First flight: April 19, 2021 · 72nd & final flight: Jan. 18, 2024' },
      { label: 'Mission Completion', value: 'Jan. 25, 2024 (transitioned from 5-flight tech demo to 72-flight aerial scout)' },
      { label: 'Mass & Weight', value: '3.97 lbs (1.8 kg) mass · Weighs ~4 lbs on Earth, but only 1.5 lbs (0.68 kg) on Mars!' },
      { label: 'Rotor Blade Span', value: 'Just under 4 feet (~1.2 meters) tip-to-tip coaxial carbon-fiber rotors' },
      { label: 'Power System', value: 'Solar panel charges Li-ion batteries for one 90-sec flight/sol (~350 Watts average flight power)' },
      { label: 'Flight Specs', value: 'Range up to 980 ft (300 m) · Altitude up to 15–79 ft · Atmosphere <1% as dense as Earth’s' }
    ],
    scientificInstruments: [
      'Coaxial Counter-Rotating Carbon-Fiber Rotors (~4 ft / 1.2 m span)',
      'Downward Black-and-White Navigation Camera & Laser Altimeter',
      'High-Resolution Color Aerial Return-to-Earth (RTE) Camera (scouting for Perseverance)',
      'Top-Mounted Solar Array & Lithium-Ion Flight Battery Pack (~350 W flight power)'
    ],
    historicFirsts: [
      'First powered, controlled aircraft flight on another planet (April 19, 2021)',
      'Completed 72 flights across nearly three years (originally designed for no more than 5 test flights in 30 days)',
      'Served as the first extraterrestrial aerial scout for a surface rover and inspected landing-gear debris from the air'
    ],
    inDepthSections: [
      {
        heading: 'From a 5-Flight Tech Demo to a 72-Flight Aerial Scout',
        paragraphs: [
          'Launched July 30, 2020, and landing in Jezero Crater on Feb. 18, 2021, NASA’s Ingenuity Mars Helicopter made history on April 19, 2021, with the first powered, controlled flight on the Red Planet. Weighing 3.97 pounds (1.8 kilograms) in mass—about 4 pounds on Earth, but only 1.5 pounds (0.68 kilograms) in Martian gravity—Ingenuity used twin 4-foot (1.2-meter) rotors and ~350 Watts of battery power to fly in an atmosphere less than 1% as dense as Earth’s.',
          'Originally designed for no more than five test flights in 30 days, Ingenuity completed 72 flights through Jan. 18, 2024 (with End of Mission declared Jan. 25, 2024), scouting rocky terrain for the Perseverance rover, inspecting landing-gear debris, and testing aerodynamic limits on another world.'
        ]
      },
      {
        heading: 'Autonomous Navigation at 500 Hz & Surviving 1,000+ Martian Nights',
        paragraphs: [
          'Because radio signals between Earth and Mars take anywhere from 5 to 20 minutes one way, no human pilot could steer Ingenuity with a joystick. Instead, Ingenuity’s onboard navigation computer analyzed downward-facing camera frames and laser altimeter readings 500 times per second to hover and fly autonomously.',
          'Over nearly three years, Ingenuity survived freezing -90°C Martian winter nights, seasonal dust storms, and treacherous sand ripples in the Neretva Vallis river channel before sustaining rotor-tip damage on its 72nd landing at "Valinor Hills."'
        ]
      }
    ],
    keyDates: [
      { date: 'July 30, 2020', event: 'Launched from Cape Canaveral attached to the belly of Perseverance' },
      { date: 'Feb. 18, 2021', event: 'Landed at Jezero Crater, Mars' },
      { date: 'April 19, 2021', event: 'Completed Flight 1 — first powered, controlled flight on another world' },
      { date: 'Jan. 18 & Jan. 25, 2024', event: 'Completed 72nd and final flight; mission officially concluded Jan. 25, 2024' }
    ],
    extraQuizQuestions: [
      {
        id: 'ing-q3',
        question: 'How much did Ingenuity weigh on Earth versus in Mars’s weaker gravity, and how much average electrical power did it use during a 90-second flight?',
        options: [
          'About 4 pounds (1.8 kg) on Earth and only 1.5 pounds (0.68 kg) on Mars, drawing ~350 Watts of power during flight',
          '500 pounds on Earth and 200 pounds on Mars, using 10,000 Watts',
          '50 pounds on Earth and 50 pounds on Mars',
          'It weighed 1 ton and burned jet fuel'
        ],
        correctIndex: 0,
        explanation:
          'With a mass of 3.97 lbs (1.8 kg), Ingenuity weighed only 1.5 pounds (0.68 kg) in Mars’s gravity, while its solar-charged lithium-ion batteries delivered ~350 Watts for up to 90 seconds of flight.',
        technicalTerm: 'Martian Weight & Specific Flight Power'
      },
      {
        id: 'ing-q4',
        question: 'How many flights was Ingenuity originally designed to perform in 30 days, and how many flights did it actually complete before its mission ended on Jan. 25, 2024?',
        options: [
          'Originally designed for no more than 5 test flights, it completed 72 flights across nearly three years',
          'Designed for 1 flight, completed 2 flights',
          'Designed for 500 flights, completed 5 flights',
          'It never flew on Mars'
        ],
        correctIndex: 0,
        explanation:
          'Built as a 30-day, 5-flight technology demonstration, Ingenuity exceeded every expectation by completing 72 flights and transitioning into an operational aerial scout for Perseverance.',
        technicalTerm: '72-Flight Operational Extension'
      }
    ]
  },

  'dawn-spacecraft': {
    missionId: 'dawn-spacecraft',
    officialHeader: 'NASA Official Briefing: Dawn — Vesta, Ceres & Chemical Energy for Life',
    officialSubtitle:
      'NASA’s first truly interplanetary spaceship — orbiting both giant asteroid Vesta and dwarf planet Ceres in the main asteroid belt.',
    quickFacts: [
      { label: 'Mission Type', value: 'Ion-Propelled Interplanetary Orbiter (NSSDCA 2007-043A)' },
      { label: 'Launch Date', value: 'Sept. 27, 2007' },
      { label: 'Science Targets', value: 'Giant Asteroid Vesta (2011–2012) & Dwarf Planet Ceres (2015–2018)' },
      { label: 'Mission Management', value: 'NASA JPL (Caltech) for NASA Discovery Program (Marshall Space Flight Center)' },
      { label: 'Spacecraft Builder', value: 'Northrop Grumman (Orbital Sciences) in Dulles, Virginia' },
      { label: 'International Partners', value: 'DLR & MPS (Germany), Italian Space Agency (ASI) & INAF (Italy)' },
      { label: '2025 Science Discovery', value: 'Aug. 20, 2025 Science Advances study: Ceres core heating supplied CO₂, methane & briny water' }
    ],
    scientificInstruments: [
      '3× Xenon Ion Propulsion Engines (NSTAR electrostatic thrusters)',
      'Dual Framing Cameras (provided by Max Planck Institute / DLR, Germany)',
      'Visible and Infrared Mapping Spectrometer (VIR — provided by ASI / INAF, Italy)',
      'Gamma Ray and Neutron Detector (GRaND)'
    ],
    historicFirsts: [
      'First spacecraft to orbit two extraterrestrial destinations (Vesta and Ceres)',
      'First spacecraft to orbit a dwarf planet (Ceres, March 2015)',
      'Revealed that internal heating inside Ceres transferred water, carbon dioxide, and methane from its rocky core to a subsurface salty water reservoir capable of fueling microbial metabolisms'
    ],
    inDepthSections: [
      {
        heading: 'Two Small Worlds in the Main Asteroid Belt',
        paragraphs: [
          'Launched Sept. 27, 2007, Dawn was NASA’s first truly interplanetary spaceship, featuring extended orbital stays at two very different worlds in the main asteroid belt between Mars and Jupiter: giant rocky asteroid Vesta and icy dwarf planet Ceres. Managed by NASA’s Jet Propulsion Laboratory (a division of Caltech) for NASA’s Discovery Program at Marshall Space Flight Center in Huntsville, Alabama, the spacecraft was designed and built in Dulles, Virginia, with key instrument partnerships from Germany (DLR and Max Planck Institute) and Italy (ASI and INAF).'
        ]
      },
      {
        heading: '2025 Breakthrough: Chemical Food for Microbes Inside Ceres',
        paragraphs: [
          'Research published in Science Advances on Aug. 20, 2025, using Dawn mission data revealed that internal heating inside dwarf planet Ceres drove the transfer of water and gases carrying chemical energy—specifically carbon dioxide and methane—from its rocky core into a subsurface reservoir of salty liquid water (brine).',
          'Although there is no direct evidence that microorganisms ever existed on Ceres, this discovery proves that the largest body in the main asteroid belt once had both liquid briny water and long-lasting chemical energy capable of fueling single-celled microbial metabolisms!'
        ]
      }
    ],
    keyDates: [
      { date: 'Sept. 27, 2007', event: 'Dawn launches from Cape Canaveral toward the Main Asteroid Belt' },
      { date: 'July 2011 – Sept. 2012', event: 'Orbits and maps giant asteroid Vesta' },
      { date: 'March 2015 – Oct. 2018', event: 'Orbits dwarf planet Ceres; enters perpetual quarantine orbit Oct. 31, 2018' },
      { date: 'Aug. 20, 2025', event: 'Science Advances study using Dawn data confirms long-lived chemical energy (CO₂ & methane) in Ceres’s subsurface brine' }
    ],
    extraQuizQuestions: [
      {
        id: 'dawn-q3',
        question: 'What did the Aug. 20, 2025 Science Advances study using NASA Dawn data discover about the interior of dwarf planet Ceres?',
        options: [
          'Internal heating transferred water and chemical-energy molecules (carbon dioxide and methane) from Ceres’s rocky core to a salty water reservoir—enough energy to potentially fuel microbial metabolisms',
          'Ceres is made of solid diamond with zero water',
          'Ceres has a surface covered in tropical forests',
          'Ceres is actually a hollow metal sphere'
        ],
        correctIndex: 0,
        explanation:
          'Dawn data showed that internal heating pushed water, carbon dioxide, and methane from Ceres’s rocky core into an underground salty water reservoir, providing chemical energy that could support single-celled life.',
        technicalTerm: 'Subsurface Brine & Astrobiological Chemical Energy'
      },
      {
        id: 'dawn-q4',
        question: 'Why did NASA permanently leave Dawn in a stable quarantine orbit around Ceres rather than crashing it into the surface when its hydrazine fuel ran out in October 2018?',
        options: [
          'Planetary protection rules prohibited crashing into Ceres’s organic-rich, briny ice crust for at least 20 years',
          'Dawn had a parachute to land on Earth instead',
          'Ceres’s gravity repelled the spacecraft',
          'Astronauts needed to refuel it the next week'
        ],
        correctIndex: 0,
        explanation:
          'Because Ceres contains subsurface water ice, salts, and organic compounds, NASA Planetary Protection protocols required placing Dawn in an orbit that will not impact Ceres for decades.',
        technicalTerm: 'Planetary Protection Quarantine Orbit'
      }
    ]
  },

  'near-shoemaker': {
    missionId: 'near-shoemaker',
    officialHeader: 'NASA Official Briefing: NEAR Shoemaker (Asteroid 433 Eros)',
    officialSubtitle:
      'Designed by Johns Hopkins Applied Physics Laboratory (APL) as an orbiter — and improvised the first soft landing on an asteroid in history.',
    quickFacts: [
      { label: 'Launch Date', value: 'Feb. 17, 1996 (First mission of NASA’s Discovery Program)' },
      { label: 'Target Asteroid', value: '433 Eros (34-km peanut-shaped S-type near-Earth asteroid)' },
      { label: 'Orbit & Touchdown', value: 'Entered orbit Feb. 14, 2000 · Soft-landed Feb. 12, 2001 at 1.5 m/s' },
      { label: 'Final Contact', value: 'Feb. 28, 2001 (after 16 days of surface gamma-ray spectroscopy)' }
    ],
    scientificInstruments: [
      'Multi-Spectral Imager (MSI)',
      'X-Ray / Gamma-Ray Spectrometer (XGRS)',
      'Near-Infrared Spectrograph (NIS)',
      'NEAR Laser Rangefinder (NLR) & Magnetometer'
    ],
    historicFirsts: [
      'First spacecraft to orbit an asteroid (Feb. 14, 2000)',
      'First spacecraft to land on an asteroid (Feb. 12, 2001)'
    ],
    inDepthSections: [
      {
        heading: 'Touching Down on Asteroid 433 Eros Without Landing Legs',
        paragraphs: [
          'After mapping 433 Eros from orbit for a year, JHU APL engineers executed five thruster braking burns on Feb. 12, 2001, slowing NEAR Shoemaker to 1.5 m/s (walking speed) so it could rest gently on its solar panel tips and collect 16 days of surface gamma-ray composition data.'
        ]
      },
      {
        heading: '160,000 Images & The Blueprint of a Primitive Chondrite Asteroid',
        paragraphs: [
          'During its year in orbit around Eros, NEAR Shoemaker captured 160,000 images, mapped millions of laser-altimeter points, and proved that 433 Eros is an undifferentiated primitive rock from the dawn of the Solar System covered in boulder-strewn craters and regolith ponds.'
        ]
      }
    ],
    keyDates: [
      { date: 'Feb. 17, 1996', event: 'Launched from Cape Canaveral' },
      { date: 'Feb. 14, 2000', event: 'Entered orbit around Asteroid 433 Eros' },
      { date: 'Feb. 12–28, 2001', event: 'Landed on Eros and transmitted surface gamma-ray data for 16 days' }
    ],
    extraQuizQuestions: [
      {
        id: 'near-q3',
        question: 'Why did NEAR Shoemaker’s X-Ray / Gamma-Ray Spectrometer collect 10 times sharper data after landing on Eros than it did from orbit?',
        options: [
          'Sitting directly on the asteroid surface placed the sensor just centimeters from the rocks instead of 35 km away',
          'Astronauts polished the lens on the asteroid',
          'The Sun grew 10 times brighter in 2001',
          'Eros moved closer to Jupiter'
        ],
        correctIndex: 0,
        explanation:
          'Resting right on the regolith of Himeros Saddle allowed the Gamma-Ray Spectrometer to measure iron, silicon, and potassium right in the soil for 16 bonus days.',
        technicalTerm: 'In-Situ Gamma-Ray Spectroscopy'
      },
      {
        id: 'near-q4',
        question: 'What did NEAR Shoemaker’s X-ray and gamma-ray measurements reveal about the internal structure of Asteroid 433 Eros?',
        options: [
          'Eros is a primitive, unmelted chondrite remnant from the early Solar System with uniform density',
          'Eros has a liquid iron core like Earth',
          'Eros is made entirely of frozen nitrogen',
          'Eros was once part of Saturn’s rings'
        ],
        correctIndex: 0,
        explanation:
          'NEAR Shoemaker proved that Eros never melted into separate core and mantle layers, preserving primitive building blocks from 4.5 billion years ago.',
        technicalTerm: 'Primitive Undifferentiated Chondrite'
      }
    ]
  },

  'kepler-telescope': {
    missionId: 'kepler-telescope',
    officialHeader: 'NASA Official Briefing: Kepler & K2 Space Telescope',
    officialSubtitle:
      'NASA’s first planet-hunting mission — surveying more than 500,000 stars across 9 years and proving that our night sky has more planets than stars.',
    quickFacts: [
      { label: 'Mission Type', value: 'Space Telescope Photometer (NSSDCA 2009-011A)' },
      { label: 'Launch Date', value: 'March 6, 2009 (UTC March 7) into an Earth-trailing heliocentric orbit' },
      { label: 'Telescope Optics', value: '3-ft (1-m) diameter aperture · 4-ft 7-in (1.4-m) primary mirror · 95-MP CCD array' },
      { label: 'Founding PI', value: 'William Borucki (NASA Ames Research Center, Silicon Valley, California)' },
      { label: 'Original Star Field', value: '150,000+ main-sequence stars in the constellation Cygnus' },
      { label: 'K2 Extended Mission', value: '19 observation campaigns along the ecliptic plane (>500,000 total stars surveyed)' },
      { label: 'Retirement Date', value: 'Oct. 30, 2018 (final commands Nov. 15, 2018) after Campaign 19' },
      { label: 'Habitable Zone Finding', value: '20% to 50% of visible stars likely host small, rocky planets in their habitable zones' }
    ],
    scientificInstruments: [
      '1-Meter Aperture Schmidt Photometer & 1.4-Meter Primary Mirror (one of the largest mirrors beyond Earth orbit)',
      '42-CCD Focal Plane Array (95 Megapixels — largest digital camera in outer space at launch)',
      'Four Gyroscope-Like Reaction Wheels (supplemented in K2 by Solar Photon Radiation Pressure)'
    ],
    historicFirsts: [
      'First NASA mission to detect Earth-size planets in the habitable zones of their stars',
      'Discovered the first confirmed planetary system with multiple planets transiting the same star (Kepler-9, April 2010)',
      'Discovered the compact 6-planet system Kepler-11 (Feb. 2011, 2,000 light-years away)',
      'Proved that worlds between the size of Earth and Neptune (super-Earths / sub-Neptunes) are the most common planets in our galaxy',
      'Concluded that 20% to 50% of visible stars likely host small rocky planets in their liquid-water habitable zones'
    ],
    inDepthSections: [
      {
        heading: 'Staring at 150,000 Stars in Cygnus: Kepler-4b through Kepler-11',
        paragraphs: [
          'Launched on March 6, 2009, the Kepler space telescope was basically a single ultra-precise instrument—a 3-foot (1-meter) aperture telescope with a 4-foot, 7-inch (1.4-meter) mirror and the largest digital camera then flown in space—with a spacecraft built around it. Staring continuously at 150,000 stars in the constellation Cygnus, Kepler hunted planets via transits: tiny dips in stellar brightness when a planet crosses in front of its star.',
          'In its first six weeks, Kepler discovered five exoplanets: Kepler-4b, 5b, 6b, 7b, and 8b (announced Jan. 2010). In April 2010, after surveying 156,000+ stars over seven months, scientists announced Kepler-9—the first confirmed system with more than one planet transiting the same star. In Feb. 2011, NASA announced Kepler-11, a yellow dwarf star 2,000 light-years away with six tightly packed planets! Surprisingly, the most common planet size Kepler found doesn’t even exist in our own solar system: worlds between the size of Earth and Neptune.'
        ]
      },
      {
        heading: 'The K2 Kayak Rescue & Legacy for TESS and James Webb',
        paragraphs: [
          'In May 2013, Kepler lost the second of its four gyroscope-like reaction wheels. Because a spacecraft needs three wheels to counteract the push of sunlight photons striking the craft, the original Cygnus survey ended. Engineers then devised a brilliant rescue dubbed "K2": they used the pressure of sunlight itself to stabilize the spacecraft’s pointing—like steering a kayak into a river current—shifting to a new patch of sky along the ecliptic plane every three months ("campaigns").',
          'Initially estimated for 10 campaigns, K2 completed 19 campaigns, bumping Kepler’s surveyed star count past 500,000 and studying supernovae and supermassive black holes before retiring on Oct. 30, 2018. As founding principal investigator William Borucki noted, before Kepler we didn’t know if planets were rare; now we know 20% to 50% of visible stars likely host small, possibly rocky planets in their habitable zones—laying the foundation for NASA’s TESS (launched April 2018) and the James Webb Space Telescope!'
        ]
      }
    ],
    keyDates: [
      { date: 'March 6, 2009', event: 'Kepler launches into an Earth-trailing heliocentric orbit' },
      { date: 'Jan. & April 2010', event: 'First 5 exoplanets (Kepler 4b–8b) and first multi-transiting system (Kepler-9) announced' },
      { date: 'Feb. 2011', event: '6-planet compact system Kepler-11 announced (2,000 light-years from Earth)' },
      { date: 'May 2013 – 2014', event: 'Second reaction wheel fails; engineers launch the solar-balanced K2 mission' },
      { date: 'Oct. 30, 2018', event: 'Kepler retires after 19 K2 campaigns and >500,000 stars surveyed' }
    ],
    extraQuizQuestions: [
      {
        id: 'kep-q3',
        question: 'What surprising type of planet did Kepler find to be the most common in our galaxy—even though our own Solar System doesn’t have one?',
        options: [
          'Worlds between the size of Earth and Neptune (super-Earths / sub-Neptunes), often in jam-packed systems like the 6-planet Kepler-11 system',
          'Cube-shaped planets made of solid gold',
          'Planets 100 times larger than the Sun',
          'Hollow planets orbiting black holes'
        ],
        correctIndex: 0,
        explanation:
          'Kepler revealed that planets between the size of Earth and Neptune are the galaxy’s most common worlds, and discovered tightly packed systems like Kepler-9 and the 6-planet Kepler-11 system.',
        technicalTerm: 'Sub-Neptune & Super-Earth Demographics'
      },
      {
        id: 'kep-q4',
        question: 'According to analysis of Kepler and K2’s 19 observation campaigns across >500,000 stars, what percentage of visible stars in the night sky likely host small, rocky planets in their habitable zone?',
        options: [
          '0.0001% of stars',
          '20% to 50% of the stars visible in the night sky',
          'Only our Sun has rocky planets',
          '100% of stars have 12 Earths'
        ],
        correctIndex: 1,
        explanation:
          'Kepler’s census concluded that 20 to 50 percent of visible stars likely host small, possibly rocky planets within the habitable zone where liquid water can pool on the surface.',
        technicalTerm: 'Habitable-Zone Eta-Earth Rate (20–50%)'
      }
    ]
  },

  'voyager-1': {
    missionId: 'voyager-1',
    officialHeader: 'NASA Official Briefing: Voyager 1 Interstellar Mission',
    officialSubtitle:
      'Overtook Pioneer 10 at 69.4 AU on Feb. 17, 1998, to become the farthest human-made object in existence — now over 166 AU away in interstellar space.',
    quickFacts: [
      { label: 'Spacecraft Designation', value: 'Voyager 1 (NSSDCA 1977-084A)' },
      { label: 'Launch Date', value: 'Sept. 5, 1977 on Titan IIIE-Centaur from Cape Canaveral LC-41' },
      { label: 'Overtook Pioneer 10', value: 'Feb. 17, 1998 at 69.4 AU to become the farthest human-made object' },
      { label: 'Interstellar Crossing', value: 'Aug. 25, 2012 at 121 AU (crossed the heliopause)' },
      { label: 'Time Capsule', value: '12-Inch Gold-Plated Copper Phonograph Record (The Golden Record)' }
    ],
    scientificInstruments: [
      'Imaging Science System (Wide & Narrow Angle Cameras — turned off after Feb. 14, 1990 Pale Blue Dot photo)',
      'Triaxial Fluxgate Magnetometer (MAG)',
      'Plasma Wave Subsystem (PWS)',
      'Low-Energy Charged Particle (LECP) & Cosmic Ray Subsystem (CRS)'
    ],
    historicFirsts: [
      'Farthest human-made object in history (passed Pioneer 10 at 69.4 AU on Feb. 17, 1998)',
      'First spacecraft to cross the heliopause into interstellar space (Aug. 25, 2012)',
      'Discovered active extraterrestrial volcanism on Jupiter’s moon Io (March 1979)'
    ],
    inDepthSections: [
      {
        heading: 'Passing Pioneer 10 & Entering the Interstellar Medium',
        paragraphs: [
          'Boosted by high-speed gravity assists at Jupiter (1979) and Saturn (1980), Voyager 1 overtook Pioneer 10 on Feb. 17, 1998, at a distance of 69.4 AU from the Sun. On Aug. 25, 2012, it crossed the heliopause into interstellar space.'
        ]
      },
      {
        heading: 'The Pale Blue Dot & The Golden Record Time Capsule',
        paragraphs: [
          'On Valentine’s Day 1990, from 6 billion kilometers away, Voyager 1 turned its cameras back one final time to capture the "Family Portrait" of our Solar System, showing Earth as a 0.12-pixel "Pale Blue Dot" suspended in a sunbeam.',
          'Bolted to Voyager 1’s aluminum bus is a 12-inch gold-plated copper phonograph record curated by Carl Sagan’s committee, carrying 115 images, greetings in 55 languages, and 90 minutes of music into the Milky Way.'
        ]
      }
    ],
    keyDates: [
      { date: 'Sept. 5, 1977', event: 'Launched from Cape Canaveral LC-41' },
      { date: 'Feb. 14, 1990', event: 'Captured the Pale Blue Dot portrait of Earth from 40.5 AU' },
      { date: 'Feb. 17, 1998', event: 'Passed Pioneer 10 at 69.4 AU as the farthest human-made object' },
      { date: 'Aug. 25, 2012', event: 'Entered interstellar space at 121 AU' }
    ],
    extraQuizQuestions: [
      {
        id: 'v1-q3',
        question: 'On what date and distance did Voyager 1 overtake Pioneer 10 to become the farthest human-made object in existence?',
        options: [
          'February 17, 1998, at a distance of 69.4 AU from the Sun',
          'July 20, 1969, at 1 AU',
          'January 1, 2020, at 5 AU',
          'It has never passed Pioneer 10'
        ],
        correctIndex: 0,
        explanation:
          'Thanks to its faster Jupiter and Saturn gravity assists, Voyager 1 passed Pioneer 10’s heliocentric distance of 69.4 AU on Feb. 17, 1998.',
        technicalTerm: 'Heliocentric Distance Record (69.4 AU)'
      },
      {
        id: 'v1-q4',
        question: 'Why did NASA engineers command Voyager 1 to permanently turn off its cameras after taking the "Pale Blue Dot" photo on February 14, 1990?',
        options: [
          'To save dwindling electrical power and onboard computer memory for the interstellar plasma and magnetic field instruments',
          'Because the cameras fell off near Saturn',
          'Because interstellar space is too bright for cameras',
          'Because astronauts retrieved the cameras'
        ],
        correctIndex: 0,
        explanation:
          'With no more planets left to fly past, shutting down the cameras and their heaters saved precious watts from the decaying Plutonium-238 RTGs for Voyager 1’s interstellar fields and particles instruments.',
        technicalTerm: 'Deep-Space Power Load Shedding'
      }
    ]
  }
};
