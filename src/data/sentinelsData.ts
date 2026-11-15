import { NASA_OFFICIAL_DOSSIERS } from './nasaOfficialContent';

export type CelestialRegion = 'moon' | 'mars' | 'deep-space';

export interface HardwareHotspot {
  id: string;
  number: string; // "01", "02", "03"
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  kicker: string; // e.g., "01 / SPACECRAFT DISCOVERY"
  headline: string; // e.g., "A very long-distance call."
  technicalName: string; // e.g., "2.74-Meter High-Gain Parabolic Dish Antenna"
  explanation: string;
  scienceImpact: string;
  promptType: 'THINK ABOUT IT' | 'CONNECT THE CLUES' | 'YOUR TURN' | 'LOOK AGAIN';
  promptQuestion: string;
  promptInsight: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
}

export interface SignalMysteryOption {
  id: 'A' | 'B' | 'C';
  text: string;
  isCorrect: boolean;
  feedbackHeadline: string;
  feedbackSubhead: string;
  feedbackBody: string;
}

export interface SignalMystery {
  questionTitle: string;
  evidenceItems: {
    number: string;
    title: string;
    detail: string;
  }[];
  engineerHint: string;
  options: SignalMysteryOption[];
  sourceCitation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  technicalTerm: string;
}

export interface SentinelMission {
  id: string;
  indexNumber: string; // "01", "02", ...
  name: string;
  region: CelestialRegion;
  regionLabel: string;
  nssdcaId: string;
  statusBadge: string; // e.g. "CONTACT ENDED" | "PARKED ON MOON" | "SILENT ORBIT" | "PASSIVE OPTICS ACTIVE"
  missionKicker: string; // e.g., "MISSION 01 / THE FIRST TO JUPITER"
  tagline: string; // e.g., "It went first. So we could go further."
  cardSummary: string;
  routeTrail: string; // e.g., "EARTH → JUPITER → BEYOND"
  builtBy: string; // Laboratory & manufacturer
  builtLocation: string;
  launchDate: string;
  lastContactDate: string;
  restingPlace: string;
  coordinates: string;
  mapPosition: { x: number; y: number }; // For the interactive celestial map
  powerSource: string;
  massKg: string;
  storyKicker: string;
  storyHeadline: string;
  storyParagraphs: string[];
  storyFooterHighlight: [string, string];
  hotspots: HardwareHotspot[];
  timeline: TimelineMilestone[];
  nssdcaSourceLabel: string;
  nssdcaUrl: string;
  signalMystery: SignalMystery;
  quiz: QuizQuestion[];
  badge: {
    id: string;
    name: string;
    title: string;
    color: string;
    iconType: 'dish' | 'rover' | 'lander' | 'rotor' | 'plaque' | 'ion' | 'telescope' | 'laser' | 'asteroid';
    description: string;
  };
  illustrationType:
    | 'pioneer-10'
    | 'pioneer-11'
    | 'apollo-lm'
    | 'lunar-rover'
    | 'alsep'
    | 'surveyor'
    | 'sojourner'
    | 'opportunity'
    | 'viking'
    | 'insight-phoenix'
    | 'ingenuity'
    | 'dawn'
    | 'near-shoemaker'
    | 'kepler'
    | 'voyager-1';
}

export interface VehicleFunFactPack {
  missionId: string;
  hardwareSpeakerName: string;
  hardwarePartBadge: string;
  introCatchphrase: string;
  facts: {
    title: string;
    joke: string;
    scienceTruth: string;
  }[];
}

export interface PlaqueHotspot {
  id: string;
  number: string;
  x: number;
  y: number;
  kicker: string;
  title: string;
  headline: string;
  technicalFeature: string;
  explanation: string;
  promptType: 'THINK ABOUT IT' | 'CONNECT THE CLUES' | 'YOUR TURN' | 'LOOK AGAIN';
  promptQuestion: string;
  promptAnswerHint: string;
}

export const PIONEER_PLAQUE_HOTSPOTS: PlaqueHotspot[] = [
  {
    id: 'plaque-humans',
    number: '01',
    x: 73,
    y: 44,
    kicker: '01 / PLAQUE DISCOVERY',
    title: 'The human figures',
    headline: 'Hello. We’re human.',
    technicalFeature: 'Scale-Proportional Anthropomorphic Engraving (1.68 m reference)',
    explanation:
      'The figures show what humans look like. Behind them is the outline of the Pioneer spacecraft drawn to exact scale, giving a clue to our size. A raised right hand becomes a universal greeting without needing a shared spoken language.',
    promptType: 'YOUR TURN',
    promptQuestion: 'What picture would you add to explain life on Earth?',
    promptAnswerHint:
      'Carl Sagan and artist Linda Salzman Sagan also showed four fingers and an opposable thumb so finders would understand how human hands build tools!'
  },
  {
    id: 'plaque-pulsars',
    number: '02',
    x: 34,
    y: 52,
    kicker: '02 / PLAQUE DISCOVERY',
    title: 'The pulsar map',
    headline: 'Our cosmic address.',
    technicalFeature: '14-Pulsar Radial Map with Binary Pulse-Period Tick Marks',
    explanation:
      'The radiating lines describe the Sun’s position relative to 14 pulsars and the center of our Milky Way galaxy. Pulsars are rapidly spinning neutron stars whose regular radio pulses act like cosmic lighthouses and timestamps.',
    promptType: 'THINK ABOUT IT',
    promptQuestion: 'How do landmarks help someone find a place without a street address?',
    promptAnswerHint:
      'Because pulsars slow down at a predictable rate over millions of years, an advanced civilization can calculate both WHERE our Sun is and WHEN Pioneer launched (1972)!'
  },
  {
    id: 'plaque-planets',
    number: '03',
    x: 52,
    y: 83,
    kicker: '03 / PLAQUE DISCOVERY',
    title: 'The solar system row',
    headline: 'Third world from the Sun.',
    technicalFeature: 'Binary Relative Heliocentric Distance Diagram',
    explanation:
      'The bottom row shows the Sun and its planets. The little spacecraft’s curved path begins at Earth—the third planet—swings past Jupiter (the fifth planet with rings hinted), and heads out of the Solar System. Because it was etched in 1972, Pluto is included as the ninth planet.',
    promptType: 'LOOK AGAIN',
    promptQuestion: 'Can you trace the path back to the planet we call home?',
    promptAnswerHint:
      'The binary numbers next to each planet tell its relative distance from the Sun in units of 1/10th of Mercury’s orbit.'
  },
  {
    id: 'plaque-hydrogen',
    number: '04',
    x: 24,
    y: 18,
    kicker: '04 / PLAQUE DISCOVERY',
    title: 'Hydrogen spin-flip ruler',
    headline: 'A ruler made of atoms.',
    technicalFeature: 'Hyperfine Transition of Neutral Hydrogen (21 cm / 1420.4 MHz)',
    explanation:
      'Aliens wouldn’t know what a "centimeter" or a "second" is. So astronomers Frank Drake and Carl Sagan drew the most common atom in the cosmos—hydrogen—flipping its electron spin. That flip releases a radio wave exactly 21 centimeters long, creating a universal ruler and clock!',
    promptType: 'CONNECT THE CLUES',
    promptQuestion: 'Why use hydrogen instead of meters or feet on an interstellar plaque?',
    promptAnswerHint:
      'Hydrogen behaves the exact same way in every corner of the universe. Below the two circles is the binary symbol "1", defining 1 unit of length (21 cm) and 1 unit of time (0.7 nanoseconds).'
  },
  {
    id: 'plaque-silhouette',
    number: '05',
    x: 78,
    y: 23,
    kicker: '05 / PLAQUE DISCOVERY',
    title: 'Spacecraft silhouette',
    headline: 'The messenger is the yardstick.',
    technicalFeature: '1:1 Geometric Projection of the Parabolic High-Gain Dish',
    explanation:
      'Right behind the human figures is the outline of Pioneer’s 2.74-meter radio dish and equipment compartment. Even without decoding the hydrogen binary math, anyone who finds the probe can simply measure the spacecraft itself and compare it to the drawing.',
    promptType: 'THINK ABOUT IT',
    promptQuestion: 'Why is having two ways to measure something smart engineering?',
    promptAnswerHint:
      'In science and engineering, redundancy (having a backup method) ensures that if one clue is misunderstood, the second clue confirms the answer.'
  }
];

export const SENTINEL_MISSIONS: SentinelMission[] = [
  {
    id: 'pioneer-10',
    indexNumber: '01',
    name: 'Pioneer 10',
    region: 'deep-space',
    regionLabel: 'Deep Space · Taurus Trajectory',
    nssdcaId: '1972-012A',
    statusBadge: 'CONTACT ENDED',
    missionKicker: 'MISSION 01 / THE FIRST TO JUPITER',
    tagline: 'It went first. So we could go further.',
    cardSummary: 'The first close-up look at Jupiter. A journey that outlasted its 21-month plan by more than 30 years.',
    routeTrail: 'EARTH → ASTEROID BELT → JUPITER → TAURUS',
    builtBy: 'TRW Inc. & NASA Ames Research Center',
    builtLocation: 'Redondo Beach & Mountain View, California',
    launchDate: '02 Mar 1972',
    lastContactDate: '23 Jan 2003',
    restingPlace: 'Coasting toward star Aldebaran (Taurus constellation)',
    coordinates: '~136 AU from Earth (11.39 km/s heliocentric)',
    mapPosition: { x: 84, y: 26 },
    powerSource: '4× SNAP-19 Radioisotope Thermoelectric Generators (Plutonium-238)',
    massKg: '258 kg (at launch)',
    storyKicker: 'LAST HEARD / JANUARY 2003',
    storyHeadline: 'Quiet, not erased.',
    storyParagraphs: [
      'After more than 30 years in deep space, Pioneer 10’s nuclear heat source had weakened. On January 23, 2003, NASA’s Deep Space Network caught its final, whisper-faint signal from 12.2 billion kilometers away—too weak to carry new scientific measurements.',
      'But in the vacuum of space, losing radio power doesn’t stop a spacecraft. Pioneer 10 keeps coasting toward the red star Aldebaran, while its discoveries about the Asteroid Belt, Jupiter’s intense radiation belts, and the solar wind remain preserved in NASA’s NSSDCA archive.'
    ],
    storyFooterHighlight: ['THE RADIO STOPPED.', 'THE SCIENCE LIVED ON.'],
    hotspots: [
      {
        id: 'p10-antenna',
        number: '01',
        x: 52,
        y: 48,
        label: 'High-Gain Dish Antenna',
        kicker: '01 / SPACECRAFT DISCOVERY',
        headline: 'A very long-distance call.',
        technicalName: '2.74-Meter Aluminum Parabolic High-Gain Antenna (S-Band)',
        explanation:
          'The large dish antenna sent radio signals toward Earth and received instructions from the ground. Pointing mattered: a narrow radio beam had to aim directly toward Earth’s giant Deep Space Network dishes to be heard across billions of kilometers.',
        scienceImpact:
          'Even though its transmitter only used 8 watts of power—about as dim as a bedroom nightlight—this dish sent back the first close-up images of Jupiter’s Great Red Spot.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why might a bigger receiving antenna on Earth help us hear a very faint signal?',
        promptInsight:
          'Just like a wider bucket catches more raindrops in a drizzle, NASA’s 70-meter Deep Space Network antennas collect more of Pioneer’s spread-out radio waves!'
      },
      {
        id: 'p10-rtg',
        number: '02',
        x: 68,
        y: 67,
        label: 'SNAP-19 RTG Power Boom',
        kicker: '02 / SPACECRAFT DISCOVERY',
        headline: 'Heat into electricity.',
        technicalName: 'SNAP-19 Radioisotope Thermoelectric Generators (RTGs)',
        explanation:
          'Out near Jupiter, sunlight is 27 times weaker than at Earth—too dim for 1970s solar panels. Instead, Pioneer carried four RTGs on two long booms. They turned natural heat from decaying Plutonium-238 into 155 watts of electricity using thermocouples.',
        scienceImpact:
          'Mounting the RTGs on 3-meter booms kept their radioactive heat and radiation from interfering with the delicate scientific sensors in the central body.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'A spacecraft can keep coasting even when it no longer has enough power for its radio. Why?',
        promptInsight:
          'Newton’s First Law of Motion! Space has almost zero air resistance or friction, so once Pioneer 10 reached escape velocity, it needed zero power to keep moving forever.'
      },
      {
        id: 'p10-magnetometer',
        number: '03',
        x: 24,
        y: 28,
        label: 'Helium Vector Magnetometer',
        kicker: '03 / SPACECRAFT DISCOVERY',
        headline: 'Feeling an invisible shield.',
        technicalName: '6.5-Meter Extendable Boom Helium Vector Magnetometer',
        explanation:
          'Sticking far out in front of the dish is a slender fiberglass boom holding a magnetometer. It measured invisible magnetic fields surrounding Jupiter and carried by the solar wind.',
        scienceImpact:
          'Pioneer 10 discovered that Jupiter’s magnetosphere is monstrous—stretching millions of kilometers and trapping deadly radiation particles that nearly fried the spacecraft’s electronics!',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'How did Pioneer 10’s survival help engineers build later missions like Voyager and Galileo?',
        promptInsight:
          'By measuring the exact strength of Jupiter’s radiation belts, Pioneer 10 taught NASA engineers how to radiation-harden the computers on Voyager 1, Voyager 2, and Juno.'
      }
    ],
    timeline: [
      {
        date: '02 MAR 1972',
        title: 'Leaving home',
        description: 'Launched from Cape Canaveral atop an Atlas-Centaur rocket at a record 51,682 km/h.'
      },
      {
        date: '15 JUL 1972',
        title: 'Into the Asteroid Belt',
        description: 'Became the first spacecraft to enter and safely cross the main Asteroid Belt.'
      },
      {
        date: '03 DEC 1973',
        title: 'Hello, Jupiter',
        description: 'Flew within 132,252 km of Jupiter’s cloud tops, snapping over 500 close-up images.'
      },
      {
        date: '23 JAN 2003',
        title: 'A final whisper',
        description: 'The last faint radio carrier wave reached Earth from 80 AU away.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Pioneer 10 Mission Archive (1972-012A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A',
    signalMystery: {
      questionTitle: 'Why did Pioneer 10 stop calling home in January 2003?',
      evidenceItems: [
        {
          number: '01',
          title: 'It lasted more than 30 years.',
          detail: 'Its Plutonium-238 heat source naturally decayed and weakened over time.'
        },
        {
          number: '02',
          title: 'Its last signals were very faint.',
          detail: 'In January 2003, only a weak carrier tone came through—no science telemetry.'
        },
        {
          number: '03',
          title: 'It was still on its journey.',
          detail: 'Losing the radio link did not make the spacecraft slow down or stop.'
        }
      ],
      engineerHint: 'What does a radio transmitter need to send a signal—even when a spacecraft can coast for free?',
      options: [
        {
          id: 'A',
          text: 'It stopped moving when the radio stopped.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'A quiet radio doesn’t mean a stopped spacecraft.',
          feedbackBody:
            'In the vacuum of space, there is no air friction to slow Pioneer 10 down. It coasts at over 40,000 km/h without any engine pushing. Look back at Clue 01: what was getting weaker inside the spacecraft?'
        },
        {
          id: 'B',
          text: 'It no longer had enough electrical power to transmit.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Its power faded. Not its momentum.',
          feedbackBody:
            'Pioneer 10’s radioisotope thermoelectric generators (RTGs) lost heat as their radioactive fuel decayed and thermocouples wore down. By 2003, voltage dropped below what the 8-watt S-band transmitter needed to call Earth—even as Pioneer 10 kept coasting toward the stars.'
        },
        {
          id: 'C',
          text: 'It ran out of air for its radio waves to travel through.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Sound needs air—but radio waves are light!',
          feedbackBody:
            'Unlike sound waves, electromagnetic radio waves travel effortlessly through the vacuum of space at the speed of light. Check Clue 01 again: what onboard resource was running low after 30 years?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Pioneer 10 last-signal release, February 2003 (1972-012A).'
    },
    quiz: [
      {
        id: 'p10-q1',
        question: 'Which aerospace organization and NASA center built and managed Pioneer 10?',
        options: [
          'TRW Inc. & NASA Ames Research Center',
          'Boeing & Kennedy Space Center',
          'Grumman & Johnson Space Center',
          'SpaceX & Marshall Space Flight Center'
        ],
        correctIndex: 0,
        explanation:
          'Pioneer 10 was manufactured by TRW Inc. in Redondo Beach, California, and managed by NASA’s Ames Research Center in Mountain View.',
        technicalTerm: 'Spacecraft Heritage (NSSDCA 1972-012A)'
      },
      {
        id: 'p10-q2',
        question: 'Why did Pioneer 10 use SNAP-19 RTGs instead of solar panels?',
        options: [
          'Solar panels hadn’t been invented yet in 1972',
          'Sunlight at Jupiter is 27 times weaker than at Earth, too dim for 1970s solar arrays',
          'Solar panels only work inside Earth’s atmosphere',
          'Jupiter’s clouds blocked all light in the outer solar system'
        ],
        correctIndex: 1,
        explanation:
          'Because light spreads out by the inverse-square law, sunlight at Jupiter (5.2 AU) is only ~3.7% as intense as at Earth. SNAP-19 RTGs converted heat from Plutonium-238 into reliable electricity.',
        technicalTerm: 'Radioisotope Thermoelectric Generator (RTG)'
      },
      {
        id: 'p10-q3',
        question: 'What was Pioneer 10’s historic "first" before reaching Jupiter?',
        options: [
          'First spacecraft to land on Earth’s Moon',
          'First spacecraft to enter and safely cross the Asteroid Belt',
          'First spacecraft to orbit Mercury',
          'First helicopter on Mars'
        ],
        correctIndex: 1,
        explanation:
          'Before Pioneer 10 entered the Asteroid Belt in July 1972, scientists feared microscopic dust and pebbles might destroy any spacecraft trying to reach the outer planets.',
        technicalTerm: 'Main-Belt Asteroid Transit'
      }
    ],
    badge: {
      id: 'badge-pioneer-10',
      name: 'Jovian Trailblazer',
      title: 'Pioneer 10 Specialist',
      color: '#D2F366',
      iconType: 'dish',
      description: 'Mastered the NSSDCA history and RTG telemetry of humanity’s first emissary to Jupiter.'
    },
    illustrationType: 'pioneer-10'
  },
  {
    id: 'pioneer-11',
    indexNumber: '02',
    name: 'Pioneer 11',
    region: 'deep-space',
    regionLabel: 'Deep Space · Scutum Trajectory',
    nssdcaId: '1973-019A',
    statusBadge: 'CONTACT ENDED',
    missionKicker: 'MISSION 02 / THE FIRST TO SATURN',
    tagline: 'Jupiter was the slingshot. Saturn was the leap.',
    cardSummary: 'A daring gravity-assist path past Jupiter to become the first spacecraft to visit ringed Saturn.',
    routeTrail: 'EARTH → JUPITER → SATURN → SCUTUM',
    builtBy: 'TRW Inc. & NASA Ames Research Center',
    builtLocation: 'Redondo Beach & Mountain View, California',
    launchDate: '06 Apr 1973',
    lastContactDate: '24 Nov 1995',
    restingPlace: 'Coasting toward constellation Scutum (Interstellar trajectory)',
    coordinates: '~115 AU from Earth (10.37 km/s heliocentric)',
    mapPosition: { x: 78, y: 68 },
    powerSource: '4× SNAP-19 RTGs (Plutonium-238 thermoelectric)',
    massKg: '259 kg (at launch)',
    storyKicker: 'MISSION ENDED / NOVEMBER 1995',
    storyHeadline: 'A trail through the rings.',
    storyParagraphs: [
      'Pioneer 11 dove three times closer to Jupiter than its twin, using the giant planet’s immense gravity like a cosmic slingshot to hurl itself all the way across the solar system to Saturn.',
      'In September 1979, it became the very first spacecraft to visit Saturn—discovering the narrow F Ring and a newfound moon while testing a safe path through the ring plane for Voyager. Routine operations ended in September 1995 when its power dropped too low to run instruments, and a final brief engineering contact arrived that November.'
    ],
    storyFooterHighlight: ['A MISSION CAN END.', 'A LEGACY CAN KEEP GOING.'],
    hotspots: [
      {
        id: 'p11-antenna',
        number: '01',
        x: 47,
        y: 54,
        label: 'Spin-Stabilized Dish & Thrusters',
        kicker: '01 / SPACECRAFT DISCOVERY',
        headline: 'Spinning like a gyroscope.',
        technicalName: 'Spin-Stabilized Attitude Control (4.8 RPM) & Hydrazine Thrusters',
        explanation:
          'Pioneer 11 spun around its dish axisnearly five times every minute like a well-thrown football. That spin kept its dish pointed steadily at Earth while allowing its sensors to scan a full 360-degree circle of sky.',
        scienceImpact:
          'Because the spacecraft rotated, its Imaging Photopolarimeter didn’t need a moving camera platform—it built images of Jupiter’s poles and Saturn’s rings line-by-line as the craft spun!',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why does spinning a spacecraft help keep it pointed in one direction without firing thrusters constantly?',
        promptInsight:
          'Angular momentum! Just like a spinning bicycle wheel resists tipping over, a spin-stabilized spacecraft naturally holds its orientation in space.'
      },
      {
        id: 'p11-ipp',
        number: '02',
        x: 64,
        y: 59,
        label: 'Imaging Photopolarimeter (IPP)',
        kicker: '02 / SPACECRAFT DISCOVERY',
        headline: 'Discovering Saturn’s hidden ring.',
        technicalName: '2.54 cm Telescope Imaging Photopolarimeter (Red & Blue Channels)',
        explanation:
          'Tucked behind the dish was a small telescope that measured light intensity and polarization in red and blue light. As Pioneer 11 raced under Saturn’s rings at 114,000 km/h, it spotted a brand-new, narrow outer ring—named the F Ring.',
        scienceImpact:
          'By backlighting Saturn’s rings against the Sun, Pioneer 11 showed that gaps which look dark from Earth are actually filled with fine icy dust particles.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why did NASA send Pioneer 11 right through Saturn’s outer ring plane before Voyager 2 arrived?',
        promptInsight:
          'Pioneer 11 acted as a fearless scout: if ring particles were safe at that distance, Voyager 2 could follow the exact same path two years later!'
      }
    ],
    timeline: [
      {
        date: '06 APR 1973',
        title: 'Leaving home',
        description: 'Launched from Cape Canaveral to follow its twin into the outer solar system.'
      },
      {
        date: '03 DEC 1974',
        title: 'Gravity slingshot at Jupiter',
        description: 'Skimmed just 42,828 km above Jupiter’s clouds, photographing its polar regions for the first time.'
      },
      {
        date: '01 SEP 1979',
        title: 'Hello, Saturn',
        description: 'First close-up exploration of the ringed giant, discovering Saturn’s F Ring and moon Epimetheus.'
      },
      {
        date: '24 NOV 1995',
        title: 'The last data',
        description: 'Final few minutes of engineering telemetry received before Earth moved out of its antenna beam.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Pioneer 11 Mission Archive (1973-019A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1973-019A',
    signalMystery: {
      questionTitle: 'Why could NASA no longer command Pioneer 11 after late 1995?',
      evidenceItems: [
        {
          number: '01',
          title: 'Its power dropped below instrument needs.',
          detail: 'By September 1995, the RTGs could not run even a single detector at the same time as the radio.'
        },
        {
          number: '02',
          title: 'Earth was moving in its orbit.',
          detail: 'The spacecraft’s dish needed thruster commands to re-point toward Earth each year.'
        },
        {
          number: '03',
          title: 'Its sun sensor had gone dark.',
          detail: 'In the cold dark at 44 AU, the sensor used to time thruster pulses could no longer detect the dim Sun.'
        }
      ],
      engineerHint: 'What happens if a narrow spotlight beam stays pointed in one direction while the listener moves away?',
      options: [
        {
          id: 'A',
          text: 'Saturn’s gravity pulled the spacecraft backward into the rings.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Pioneer 11 passed Saturn in 1979 and never looked back.',
          feedbackBody:
            'By 1995, Pioneer 11 was more than 6.5 billion kilometers away—far beyond Saturn and Uranus. Check Clues 01 and 02: why did the radio link fade?'
        },
        {
          id: 'B',
          text: 'Dwindling RTG power and inability to re-point its dish toward Earth ended communication.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Low power + a fixed antenna beam = silence.',
          feedbackBody:
            'With power too low to operate science instruments and its sun sensor unable to guide orientation maneuvers, Pioneer 11’s dish could no longer track Earth’s orbital motion. Its radio fell silent while the probe continued toward the constellation Scutum.'
        },
        {
          id: 'C',
          text: 'Its golden plaque blocked the antenna dish.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'The Pioneer Plaque was bolted safely to the antenna support struts.',
          feedbackBody:
            'Engineers mounted the 120-gram gold-anodized aluminum plaque on the support struts beneath the dish where it shielded the craft from micrometeoroids without blocking the radio beam.'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Pioneer 11 Mission End Release, September–November 1995 (1973-019A).'
    },
    quiz: [
      {
        id: 'p11-q1',
        question: 'How did Pioneer 11 reach Saturn on the opposite side of the Solar System?',
        options: [
          'It carried a giant second rocket stage',
          'It used Jupiter’s gravity as a slingshot (gravity assist)',
          'It bounced off the Moon three times',
          'It used solar sails'
        ],
        correctIndex: 1,
        explanation:
          'Pioneer 11 flew within 42,828 km of Jupiter, using the giant planet’s gravity and orbital momentum to bend its path and accelerate to 173,000 km/h toward Saturn.',
        technicalTerm: 'Planetary Gravity Assist'
      },
      {
        id: 'p11-q2',
        question: 'Which feature of Saturn did Pioneer 11 discover during its 1979 flyby?',
        options: [
          'That Saturn is made of solid rock',
          'Saturn’s narrow outer F Ring and a magnetic field',
          'Liquid oceans on Saturn’s surface',
          'Volcanoes on Saturn’s rings'
        ],
        correctIndex: 1,
        explanation:
          'Pioneer 11 discovered Saturn’s narrow F Ring just outside the A Ring, detected Saturn’s planetary magnetic field, and found a small inner moon.',
        technicalTerm: 'Planetary Ring Photopolarimetry'
      }
    ],
    badge: {
      id: 'badge-pioneer-11',
      name: 'Ring Pathfinder',
      title: 'Pioneer 11 Specialist',
      color: '#D2F366',
      iconType: 'dish',
      description: 'Decoded the gravity-assist mechanics and ring plane discoveries of Saturn’s first visitor.'
    },
    illustrationType: 'pioneer-11'
  },
  {
    id: 'apollo-lm',
    indexNumber: '03',
    name: 'Apollo Lunar Modules',
    region: 'moon',
    regionLabel: 'The Moon · 6 Landing Sites',
    nssdcaId: '1969-059C',
    statusBadge: 'RESTING ON MOON',
    missionKicker: 'MISSION 03 / SIX MONUMENTS IN LUNAR DUST',
    tagline: 'Half landed. Half launched. The base stayed forever.',
    cardSummary: 'The golden octagonal descent stages of Apollo 11, 12, 14, 15, 16, and 17 still stand on the Moon as launch pads.',
    routeTrail: 'EARTH → LUNAR ORBIT → TRANQUILLITY BASE',
    builtBy: 'Grumman Aircraft Engineering Corp.',
    builtLocation: 'Bethpage, Long Island, New York',
    launchDate: '16 Jul 1969 (Apollo 11)',
    lastContactDate: '21 Jul 1969 (Ascent Liftoff)',
    restingPlace: 'Mare Tranquillitatis & 5 other lunar sites',
    coordinates: '0.6741° N, 23.4730° E (Eagle Descent Stage)',
    mapPosition: { x: 62, y: 48 },
    powerSource: '4× Silver-Zinc (Ag-Zn) Batteries (400 Ah each, 28V DC)',
    massKg: '2,134 kg (dry descent stage)',
    storyKicker: 'STILL STANDING / SINCE JULY 1969',
    storyHeadline: 'The spacecraft that became its own launch pad.',
    storyParagraphs: [
      'Designed by engineers at Grumman in Bethpage, New York, the Apollo Lunar Module was the first true spacecraft—built to fly only in the vacuum of space, with no aerodynamic wings or heat shield. It had two halves: the Descent Stage and the Ascent Stage.',
      'When astronauts finished their moonwalks, explosive bolts severed the cables between the two halves, and the upper cabin blasted off using the golden lower Descent Stage as a launch pad! Today, six Descent Stages sit silently in the airless lunar dust, photographed from orbit by NASA’s Lunar Reconnaissance Orbiter.'
    ],
    storyFooterHighlight: ['NO WIND TO ERODE THEM.', 'SIX TIME CAPSULES ON THE MOON.'],
    hotspots: [
      {
        id: 'lm-engine',
        number: '01',
        x: 50,
        y: 62,
        label: 'Throttleable Descent Engine',
        kicker: '01 / HARDWARE DISCOVERY',
        headline: 'Hovering on a pillar of flame.',
        technicalName: 'TRW Lunar Module Descent Engine (LMDE, 45 kN Throttleable)',
        explanation:
          'Earlier rocket engines were simple on/off switches. To land humans gently among craters and boulders, TRW built the first deep-throttling rocket engine in space history—allowing Neil Armstrong to hover and steer Eagle to a smooth spot.',
        scienceImpact:
          'Modern reusable rockets that land upright on pads and barges use direct descendants of this deep-throttling rocket technology.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why couldn’t the Apollo Lunar Module use parachutes to slow down at the Moon?',
        promptInsight:
          'Parachutes work by pushing against air molecules—and the Moon has virtually no atmosphere (an exosphere). Only rocket thrust pushing in the opposite direction can slow a lunar lander!'
      },
      {
        id: 'lm-kapton',
        number: '02',
        x: 38,
        y: 44,
        label: 'Gold Kapton Thermal Blankets',
        kicker: '02 / HARDWARE DISCOVERY',
        headline: 'Wrapped in gold foil for survival.',
        technicalName: 'Multi-Layer Insulation (Aluminized Kapton & Mylar Blankets)',
        explanation:
          'On the Moon, sunlit surfaces bake at +120°C (+250°F) while shadows plunge to -130°C (-200°F). The Descent Stage was wrapped in crinkly amber-gold Kapton blankets just fractions of a millimeter thick to reflect solar heat and keep propellant tanks at room temperature.',
        scienceImpact:
          'Multi-layer insulation (MLI) invented for Apollo now protects satellites, space telescopes like James Webb, and even emergency thermal blankets on Earth.',
        promptType: 'LOOK AGAIN',
        promptQuestion: 'Is the gold wrap on the Lunar Module real solid gold?',
        promptInsight:
          'It’s actually a lightweight plastic film called Kapton coated with a microscopic layer of aluminum! The amber-yellow plastic facing outward makes the silver aluminum shine like gold.'
      },
      {
        id: 'lm-plaque',
        number: '03',
        x: 65,
        y: 52,
        label: 'Landing Strut & Commemorative Plaque',
        kicker: '03 / HARDWARE DISCOVERY',
        headline: 'Shock absorbers made of aluminum honeycomb.',
        technicalName: 'Crushable Aluminum Honeycomb Struts & Stainless Steel Plaque',
        explanation:
          'Inside the four spider-like legs were cartridges of crushable aluminum honeycomb that absorbed the impact of touchdown like a bike helmet. Bolted to the front ladder strut of Apollo 11’s Eagle is the famous steel plaque: "We came in peace for all mankind."',
        scienceImpact:
          'Three of the legs also held wire "lunar surface sensing probes" that lit a blue CONTACT LIGHT inside the cabin the instant they brushed the lunar soil.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why will the footprints and Lunar Module around Tranquillity Base last for millions of years?',
        promptInsight:
          'Without wind, rain, or tectonic plates on the Moon, only tiny micrometeoroid impacts slowly disturb the surface over millions of years.'
      }
    ],
    timeline: [
      {
        date: '20 JUL 1969',
        title: 'The Eagle has landed',
        description: 'Apollo 11 LM-5 touches down at Mare Tranquillitatis with 25 seconds of hovering fuel remaining.'
      },
      {
        date: '21 JUL 1969',
        title: 'Liftoff from the Moon',
        description: 'Ascent stage fires its engine, leaving the golden octagonal descent stage behind as a launch pad.'
      },
      {
        date: '14 DEC 1972',
        title: 'Final Apollo departure',
        description: 'Apollo 17’s Challenger leaves the sixth and final lunar module descent stage at Taurus-Littrow.'
      },
      {
        date: '2009–PRESENT',
        title: 'Spotted from Lunar Orbit',
        description: 'NASA’s Lunar Reconnaissance Orbiter photographs all six descent stages and astronauts’ footpath trails.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Apollo 11 Lunar Module Archive (1969-059C)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
    signalMystery: {
      questionTitle: 'Why did NASA intentionally leave the bottom half of every Lunar Module on the Moon?',
      evidenceItems: [
        {
          number: '01',
          title: 'Every kilogram of mass requires fuel to lift.',
          detail: 'Lifting landing legs, empty descent tanks, and moonwalk gear back into orbit would require a giant rocket.'
        },
        {
          number: '02',
          title: 'The Moon had no concrete launch pad.',
          detail: 'The upper cabin needed a stable, level platform to blast off from uneven lunar soil.'
        },
        {
          number: '03',
          title: 'Six descent stages remain intact today.',
          detail: 'Orbital photos show the octagonal bases still resting right where astronauts parked them.'
        }
      ],
      engineerHint: 'Think about the rocket equation: why carry landing legs and empty tanks home once you have already landed?',
      options: [
        {
          id: 'A',
          text: 'The descent stage got stuck in deep lunar mud.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'The lunar dust was firm—footpads sank only a few centimeters.',
          feedbackBody:
            'Surveyor landers had already proved the Moon’s surface was firm enough to hold spacecraft. Look at Clues 01 and 02: how did two-stage engineering save weight?'
        },
        {
          id: 'B',
          text: 'Leaving the heavy landing stage behind let a lightweight upper cabin launch safely using the base as a launch pad.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Smart staging made the Moon landing possible.',
          feedbackBody:
            'By splitting the Lunar Module into two stages, Grumman engineers saved thousands of kilograms of return fuel. The heavy landing gear and empty descent tanks stayed on the Moon as an instant launch pad for the Ascent Stage!'
        },
        {
          id: 'C',
          text: 'Astronauts forgot to unhook the bottom half before launch.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Explosive guillotines cut the cables on purpose!',
          feedbackBody:
            'Milliseconds before the ascent engine fired, pyrotechnic bolts and a cable cutter cleanly separated the two halves exactly as designed.'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Apollo 11 Lunar Module Technical Archive (1969-059C).'
    },
    quiz: [
      {
        id: 'lm-q1',
        question: 'Where was the Apollo Lunar Module designed and built?',
        options: [
          'Grumman Aircraft Engineering Corp. in Bethpage, New York',
          'Jet Propulsion Laboratory in Pasadena, California',
          'Glenn Research Center in Cleveland, Ohio',
          'Goddard Space Flight Center in Maryland'
        ],
        correctIndex: 0,
        explanation:
          'Thousands of engineers and technicians at Grumman in Bethpage, Long Island, New York designed and built every Apollo Lunar Module.',
        technicalTerm: 'Grumman LM Manufacturing'
      },
      {
        id: 'lm-q2',
        question: 'Why did the Apollo Lunar Module look boxy and angular instead of sleek and streamlined?',
        options: [
          'It was cheaper to use square cardboard boxes',
          'It flew only in the airless vacuum of space, where aerodynamics and wind resistance do not exist',
          'To bounce radar waves back to Mars',
          'So it could float in the ocean after splashdown'
        ],
        correctIndex: 1,
        explanation:
          'Because the Lunar Module never flew through an atmosphere, it needed zero wings or streamlining—every gram was optimized for low mass and visibility in vacuum.',
        technicalTerm: 'Vacuum-Only Structural Design'
      }
    ],
    badge: {
      id: 'badge-apollo-lm',
      name: 'Tranquillity Architect',
      title: 'Lunar Module Specialist',
      color: '#F59E0B',
      iconType: 'lander',
      description: 'Explored the two-stage engineering and thermal physics of the six Apollo Descent Stages.'
    },
    illustrationType: 'apollo-lm'
  },
  {
    id: 'lunar-rovers',
    indexNumber: '04',
    name: 'Lunar Roving Vehicles (LRVs)',
    region: 'moon',
    regionLabel: 'The Moon · Hadley, Descartes & Taurus-Littrow',
    nssdcaId: '1971-063C',
    statusBadge: 'PARKED ON MOON',
    missionKicker: 'MISSION 04 / ELECTRIC MOON BUGGIES',
    tagline: 'Folded like origami. Driven across craters.',
    cardSummary: 'Three electric 4-wheel-drive "moon buggies" driven by Apollo 15, 16, and 17 astronauts—still parked where they left the keys.',
    routeTrail: 'EARTH → FOLDED IN LM BAY → LUNAR HIGHLANDS',
    builtBy: 'The Boeing Company & Delco Electronics (GM)',
    builtLocation: 'Huntsville, Alabama & Santa Barbara, California',
    launchDate: '26 Jul 1971 (Apollo 15 LRV-1)',
    lastContactDate: '14 Dec 1972 (Apollo 17 LRV-3 TV broadcast)',
    restingPlace: 'Hadley-Apennine, Descartes Highlands & Taurus-Littrow',
    coordinates: '26.1322° N, 3.6339° E (Apollo 15 LRV-1)',
    mapPosition: { x: 54, y: 28 },
    powerSource: '2× 36-Volt Silver-Zinc Non-Rechargeable Batteries',
    massKg: '210 kg (34.8 kg weight in 1/6th lunar gravity)',
    storyKicker: 'PARKED FOREVER / 1971–1972',
    storyHeadline: 'The ultimate off-road electric vehicles.',
    storyParagraphs: [
      'On early Apollo missions, astronauts could only explore as far as their boots could walk. So NASA challenged Boeing and General Motors’ Delco Electronics to build a lightweight electric car in just 17 months that could fold up like a lawn chair inside a wedgeshaped storage bay on the Lunar Module.',
      'Across Apollo 15, 16, and 17, three Lunar Roving Vehicles carried astronauts across 90.8 kilometers of mountains, rilles, and boulder fields. When each mission ended, astronauts parked the rover a short distance away so its remote-controlled TV camera could film their rocket blasting off back to Earth!'
    ],
    storyFooterHighlight: ['ZERO FLAT TIRES.', 'STILL PARKED IN THE HIGHLANDS.'],
    hotspots: [
      {
        id: 'lrv-wheels',
        number: '01',
        x: 34,
        y: 72,
        label: 'Zinc-Coated Piano Wire Mesh Wheels',
        kicker: '01 / HARDWARE DISCOVERY',
        headline: 'Tires woven from piano wire.',
        technicalName: '81-cm Woven Steel Wire Mesh Tires with Titanium Chevrons',
        explanation:
          'Rubber air-filled tires would explode or crack in the Moon’s vacuum and extreme temperatures. Instead, GM engineer Ferenc Pavlics invented hollow tires woven from 800 strands of zinc-coated steel piano wire, topped with titanium strips to grip soft lunar dust!',
        scienceImpact:
          'Each wheel had its own 0.25-horsepower electric motor inside the hub, giving the buggy true four-wheel drive and independent front-and-rear steering.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why couldn’t astronauts use a gasoline combustion engine on the Moon?',
        promptInsight:
          'Gasoline engines need oxygen from the air to burn fuel! In the airless vacuum of the Moon, battery-powered electric motors work cleanly without needing air.'
      },
      {
        id: 'lrv-controller',
        number: '02',
        x: 52,
        y: 46,
        label: 'T-Handle Joystick & Gyro Navigator',
        kicker: '02 / HARDWARE DISCOVERY',
        headline: 'No steering wheel. No GPS satellites.',
        technicalName: 'T-Shaped Hand Controller & Directional Gyroscope Odometry System',
        explanation:
          'Bulky pressurized spacesuit gloves couldn’t grip a regular steering wheel, so astronauts steered, accelerated, and braked with a single T-shaped joystick between the seats. And since the Moon has no magnetic north pole for a compass, an onboard gyroscope and wheel counter always pointed the way back to the lander!',
        scienceImpact:
          'Thanks to this dead-reckoning navigation computer, astronauts could drive up to 7.6 km away from their spacecraft without risking getting lost in the hills.',
        promptType: 'YOUR TURN',
        promptQuestion: 'What household tool did Apollo 17 astronauts use when a fender broke on the Moon?',
        promptInsight:
          'Gene Cernan and Harrison Schmitt used laminated lunar maps and silver duct tape to build a replacement fender and stop abrasive moon dust from showering them!'
      }
    ],
    timeline: [
      {
        date: '31 JUL 1971',
        title: 'First drive on another world',
        description: 'Dave Scott and Jim Irwin unfold LRV-1 and drive along the rim of Hadley Rille on Apollo 15.'
      },
      {
        date: '21 APR 1972',
        title: 'Lunar speed record (18 km/h)',
        description: 'John Young sets the official lunar land-speed record of 18 km/h (11.2 mph) downhill on Apollo 16.'
      },
      {
        date: '14 DEC 1972',
        title: 'Filming the final liftoff',
        description: 'Parked 145 meters east of Challenger, LRV-3’s camera pans upward from Earth control to broadcast Apollo 17’s launch.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Apollo 15 Lunar Roving Vehicle (1971-063C)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
    signalMystery: {
      questionTitle: 'Why did NASA park the Lunar Rovers ~150 meters away from the lander before liftoff?',
      evidenceItems: [
        {
          number: '01',
          title: 'The rovers carried a color TV camera and high-gain umbrella antenna.',
          detail: 'Mission Control in Houston could pan and tilt the camera remotely from 384,000 km away.'
        },
        {
          number: '02',
          title: 'Rocket exhaust sprays debris during liftoff.',
          detail: 'Parking too close would blast the camera lens with Kapton foil and lunar gravel.'
        },
        {
          number: '03',
          title: 'Apollo 17’s liftoff was seen live on television.',
          detail: 'Engineer Ed Fendell sent the tilt command 1.3 seconds early to account for speed-of-light delay!'
        }
      ],
      engineerHint: 'Why would engineers want a camera pointing at the Lunar Module from a safe distance when the astronauts left?',
      options: [
        {
          id: 'A',
          text: 'To let Mission Control watch the Ascent Stage blast off and continue transmitting until the batteries drained.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'The parked rover became a robotic cameraman.',
          feedbackBody:
            'By parking each Lunar Roving Vehicle about 145 meters away with its umbrella antenna aimed at Earth, NASA engineers used the rover’s batteries and TV camera to visually verify liftoff and record humanity’s departure from the Moon!'
        },
        {
          id: 'B',
          text: 'Because no parking was allowed near the flagpole.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Every meter on a moonwalk was carefully planned for science and engineering.',
          feedbackBody:
            'Look at Clue 01 and Clue 03: what instrument was mounted on the front of the rover?'
        },
        {
          id: 'C',
          text: 'The rover drove itself away after the astronauts left.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Only the camera could be controlled from Earth, not the wheels.',
          feedbackBody:
            'Astronauts drove the rover to its final VIP viewing spot, pointed its antenna at Earth, and walked back to the Lunar Module.'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Apollo 15–17 LRV Operations Archive (1971-063C).'
    },
    quiz: [
      {
        id: 'lrv-q1',
        question: 'What were the Lunar Roving Vehicle’s tires made of?',
        options: [
          'Solid vulcanized black rubber',
          'Woven zinc-coated steel piano wire mesh with titanium chevron treads',
          'Inflatable Kevlar tubes filled with helium',
          'Carved lunar basalt stone'
        ],
        correctIndex: 1,
        explanation:
          'Woven steel wire mesh tires floated on top of soft lunar regolith without sinking and could never get a puncture or crack in -130°C cold.',
        technicalTerm: 'Elastic Wire-Mesh Wheel'
      },
      {
        id: 'lrv-q2',
        question: 'Which companies built the Lunar Roving Vehicles with NASA’s Marshall Space Flight Center?',
        options: [
          'The Boeing Company & General Motors (Delco Electronics)',
          'Ford & Lockheed',
          'Chrysler & Grumman',
          'Ferrari & European Space Agency'
        ],
        correctIndex: 0,
        explanation:
          'Boeing served as prime contractor in Huntsville, Alabama, while GM’s Delco Electronics division developed the wheels, suspension, and drive motors.',
        technicalTerm: 'Boeing / GM Delco LRV Program'
      }
    ],
    badge: {
      id: 'badge-lunar-rovers',
      name: 'Highlands Driver',
      title: 'Lunar Rover Specialist',
      color: '#38BDF8',
      iconType: 'rover',
      description: 'Mastered the electric 4WD powertrain and wire-mesh wheel engineering of Apollo’s Moon Buggies.'
    },
    illustrationType: 'lunar-rover'
  },
  {
    id: 'alsep-packages',
    indexNumber: '05',
    name: 'ALSEP Scientific Packages',
    region: 'moon',
    regionLabel: 'The Moon · 6 Surface Science Stations',
    nssdcaId: '1969-099C',
    statusBadge: 'LASER MIRRORS ACTIVE',
    missionKicker: 'MISSION 05 / LISTENING TO THE MOON’S HEARTBEAT',
    tagline: 'Astronauts went home. The laboratory stayed.',
    cardSummary: 'Robot science stations left on the Moon to measure moonquakes for 8 years—plus laser mirrors we still bounce light off today!',
    routeTrail: 'EARTH → APOLLO DEPLOYMENT → LUNAR SURFACE',
    builtBy: 'Bendix Aerospace Systems Division',
    builtLocation: 'Ann Arbor, Michigan',
    launchDate: '14 Nov 1969 (Apollo 12 ALSEP)',
    lastContactDate: '30 Sep 1977 (Radio transmitters switched off; Retroreflectors still active!)',
    restingPlace: 'Oceanus Procellarum, Fra Mauro, Hadley, Descartes & Taurus-Littrow',
    coordinates: '3.0094° S, 23.4246° W (Apollo 12 ALSEP Station)',
    mapPosition: { x: 35, y: 52 },
    powerSource: 'SNAP-27 Radioisotope Thermoelectric Generator (70 Watts)',
    massKg: '150 kg (full station array)',
    storyKicker: 'RADIO OFF 1977 / MIRRORS STILL WORKING TODAY',
    storyHeadline: 'The experiment that hasn’t stopped for over 55 years.',
    storyParagraphs: [
      'At every Apollo landing site, astronauts unpacked a miniature robotic laboratory called ALSEP (Apollo Lunar Surface Experiments Package), built by Bendix Aerospace in Ann Arbor, Michigan. Powered by a nuclear SNAP-27 generator, these stations wired seismometers, magnetometers, and heat probes across the lunar soil.',
      'Even after the last astronaut left in 1972, five ALSEP stations radioed data back to Earth every day until September 30, 1977—recording over 12,000 moonquakes and meteorite impacts! Better yet, the Lunar Laser Retroreflector mirrors need zero electricity: observatories on Earth still shoot laser beams at them today to measure the Moon’s distance to the millimeter!'
    ],
    storyFooterHighlight: ['12,000+ MOONQUAKES RECORDED.', 'LASER MIRRORS STILL BOUNCING LIGHT TODAY.'],
    hotspots: [
      {
        id: 'alsep-retroreflector',
        number: '01',
        x: 34,
        y: 55,
        label: 'Laser Ranging Retroreflector (LRRR)',
        kicker: '01 / SCIENCE INSTRUMENT',
        headline: 'Bouncing lasers off the Moon.',
        technicalName: '100-Corner-Cube Fused Silica Prism Array (LRRR)',
        explanation:
          'This briefcase-sized panel holds 100 special "corner-cube" quartz prisms. Unlike a flat bathroom mirror, a corner-cube prism reflects any incoming laser beam straight back toward the exact direction it came from—requiring zero batteries or wires!',
        scienceImpact:
          'By timing how long a laser pulse takes to bounce back (~2.5 seconds), scientists discovered that the Moon is slowly spiralling away from Earth by 3.8 centimeters every year—about as fast as your fingernails grow!',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why is the Laser Retroreflector the only Apollo experiment still operating today?',
        promptInsight:
          'Because it is a passive optical instrument! All the electronics and power stays on Earth at the telescope observatory; the lunar mirror simply bounces the photons back.'
      },
      {
        id: 'alsep-seismometer',
        number: '02',
        x: 68,
        y: 62,
        label: 'Passive Seismic Experiment',
        kicker: '02 / SCIENCE INSTRUMENT',
        headline: 'The Moon rings like a bell.',
        technicalName: 'Tri-Axial Long-Period & Vertical Short-Period Seismometer',
        explanation:
          'Shielded under a shiny thermal skirt, this super-sensitive seismometer could detect ground vibrations smaller than the width of a single atom! When NASA intentionally crashed empty rocket stages into the Moon, the ground vibrated for over an hour.',
        scienceImpact:
          'Those seismic waves proved the Moon isn’t a cold, dead rock—it has a crust, mantle, and a small, partially molten iron core, plus shallow moonquakes up to magnitude 5.5.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why do future Artemis lunar bases need to know about Apollo’s moonquake data?',
        promptInsight:
          'Unlike earthquakes that last less than a minute, shallow moonquakes can shake the ground for 10 to 30 minutes because dry, fractured lunar rock doesn’t dampen vibrations quickly!'
      }
    ],
    timeline: [
      {
        date: '20 JUL 1969',
        title: 'First laser mirror & seismometer',
        description: 'Apollo 11 deploys EASEP (Early Apollo Scientific Experiments Package) at Tranquillity Base.'
      },
      {
        date: '19 NOV 1969',
        title: 'First nuclear-powered ALSEP',
        description: 'Apollo 12 deploys the full SNAP-27 RTG-powered ALSEP station on Oceanus Procellarum.'
      },
      {
        date: '30 SEP 1977',
        title: 'Central stations commanded off',
        description: 'After 8 years and 12,000+ recorded seismic events, NASA turns off the transmitters due to budget limits.'
      },
      {
        date: 'TODAY',
        title: 'Still reflecting Earth’s lasers',
        description: 'Astronomers still bounce laser pulses off Apollo 11, 14, and 15 retroreflectors to test Einstein’s gravity.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Apollo 12 ALSEP Archive (1969-099C)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
    signalMystery: {
      questionTitle: 'How can scientists still get measurements from Apollo hardware today if ALSEP’s radios were turned off in 1977?',
      evidenceItems: [
        {
          number: '01',
          title: 'Radio transmitters were switched off in September 1977.',
          detail: 'The SNAP-27 nuclear generators and central radio transmitters are no longer broadcasting.'
        },
        {
          number: '02',
          title: 'Astronauts left arrays of quartz corner-cube prisms.',
          detail: 'Apollo 11, 14, and 15 placed Laser Ranging Retroreflectors tilted toward Earth.'
        },
        {
          number: '03',
          title: 'Light travels at a constant 299,792 km per second.',
          detail: 'Telescopes on Earth fire short laser pulses and time the returning photons.'
        }
      ],
      engineerHint: 'Does a mirror need a battery to reflect a beam of light?',
      options: [
        {
          id: 'A',
          text: 'Passive corner-cube laser retroreflectors need no power to bounce Earth laser pulses back to telescopes.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Zero batteries required—just pure optics.',
          feedbackBody:
            'Because corner-cube prisms reflect light straight back toward its source through total internal reflection, observatories on Earth still use Apollo’s retroreflectors today—discovering that the Moon drifts 3.8 cm farther from Earth each year!'
        },
        {
          id: 'B',
          text: 'Solar winds recharged the SNAP-27 nuclear generators in 2010.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Radioisotope generators cannot be recharged by solar wind.',
          feedbackBody:
            'Look at Clue 02: which piece of Apollo hardware works using only quartz prisms and light from Earth?'
        },
        {
          id: 'C',
          text: 'Astronauts returned in 1995 to change the batteries.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'No humans have walked on the Moon since Apollo 17 in December 1972.',
          feedbackBody:
            'Check Clue 02 and Clue 03: how do astronomers measure the Moon’s distance from Earth using lasers?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Lunar Laser Ranging Retroreflector Experiment (1969-059E / 1969-099C).'
    },
    quiz: [
      {
        id: 'alsep-q1',
        question: 'What surprising fact about the Moon did the Apollo Laser Retroreflectors reveal?',
        options: [
          'The Moon is shrinking by 10 kilometers every year',
          'The Moon is slowly drifting away from Earth by 3.8 centimeters per year',
          'The Moon is made of solid diamond',
          'The Moon completes an orbit in 5 days'
        ],
        correctIndex: 1,
        explanation:
          'Millimeter-precise laser timing over 50+ years proved that tidal interactions between Earth’s oceans and the Moon push the Moon 3.8 cm farther away every year.',
        technicalTerm: 'Lunar Laser Ranging (LLR)'
      },
      {
        id: 'alsep-q2',
        question: 'What did the ALSEP Passive Seismic Experiments discover about the Moon’s interior?',
        options: [
          'The Moon is completely hollow inside',
          'The Moon experiences moonquakes and has a crust, mantle, and small iron-rich core',
          'The Moon has underground oceans of liquid lava',
          'There are zero vibrations on the Moon'
        ],
        correctIndex: 1,
        explanation:
          'Over 8 years, the ALSEP seismic network recorded more than 12,000 seismic events, mapping the Moon’s internal layers.',
        technicalTerm: 'Lunar Seismology'
      }
    ],
    badge: {
      id: 'badge-alsep',
      name: 'Lunar Seismologist',
      title: 'ALSEP Station Specialist',
      color: '#A855F7',
      iconType: 'laser',
      description: 'Unlocked the secrets of moonquakes and Apollo’s still-active laser retroreflector mirrors.'
    },
    illustrationType: 'alsep'
  },
  {
    id: 'surveyor-landers',
    indexNumber: '06',
    name: 'Surveyor Landers',
    region: 'moon',
    regionLabel: 'The Moon · 5 Soft-Landing Sites',
    nssdcaId: '1966-045A',
    statusBadge: 'SILENT SCOUT',
    missionKicker: 'MISSION 06 / THE ROBOTIC PATHFINDERS',
    tagline: 'Before boots touched the dust, robots tested the ground.',
    cardSummary: 'Five tripod robot landers from the 1960s that proved spacecraft wouldn’t sink into lunar quicksand—and one was even visited by astronauts!',
    routeTrail: 'EARTH → DIRECT LUNAR DESCENT → OCEANUS PROCELLARUM',
    builtBy: 'Hughes Aircraft Company & NASA Jet Propulsion Laboratory (JPL)',
    builtLocation: 'El Segundo & Pasadena, California',
    launchDate: '30 May 1966 (Surveyor 1)',
    lastContactDate: '07 Jan 1968 (Surveyor 1) / Visited Nov 1969 (Surveyor 3)',
    restingPlace: 'Oceanus Procellarum, Mare Cognitum, Mare Tranquillitatis, Sinus Medii & Tycho Crater',
    coordinates: '2.474° S, 43.332° W (Surveyor 1) / 3.016° S, 23.418° W (Surveyor 3)',
    mapPosition: { x: 26, y: 60 },
    powerSource: 'Solar Panel Array (85 Watts) & Silver-Zinc Battery',
    massKg: '292 kg (landed mass)',
    storyKicker: 'TOUCHDOWN / JUNE 1966 – JANUARY 1968',
    storyHeadline: 'The robot that got a visit from human astronauts.',
    storyParagraphs: [
      'In the early 1960s, some scientists worried that billions of years of micrometeorite impacts had covered the Moon in a deep sea of powdery dust that would swallow any heavy Apollo lander like quicksand. Managed by NASA’s Jet Propulsion Laboratory (JPL) and built by Hughes Aircraft, the Surveyor program sent seven robotic landers to find out.',
      'On June 2, 1966, Surveyor 1 became the first U.S. spacecraft to soft-land on another world, snapping over 11,000 photos of its own footpads sitting firmly on the soil! Even cooler: in November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean landed their Lunar Module *Intrepid* right next to Surveyor 3, walked into its crater, and brought its TV camera back to Earth to study how 31 months in space affected hardware!'
    ],
    storyFooterHighlight: ['PROVED THE GROUND WAS FIRM.', 'VISITED IN PERSON BY APOLLO 12.'],
    hotspots: [
      {
        id: 'surv-scoop',
        number: '01',
        x: 64,
        y: 66,
        label: 'Surface Sampler Pantograph Claw',
        kicker: '01 / ROBOTIC INSTRUMENT',
        headline: 'Digging the first trenches on another world.',
        technicalName: ' Accordion-Arm Soil Mechanics Surface Sampler',
        explanation:
          'Surveyor 3 and 7 carried an extendable scissor-arm with a miniature motorized scoop. Engineers in Pasadena commanded it to dig trenches, crush small pebbles, and test how much weight the lunar soil could support.',
        scienceImpact:
          'It revealed that lunar regolith behaves like damp beach sand—crumbly on top, but remarkably firm just a few centimeters down.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why does dry lunar dust clump together like damp beach sand even though there is zero water?',
        promptInsight:
          'Because there is no wind or water on the Moon to wear edges smooth! Under a microscope, lunar dust grains have jagged, sharp corners and static electricity that make them interlock tightly.'
      },
      {
        id: 'surv-camera',
        number: '02',
        x: 48,
        y: 36,
        label: 'Rotating Mirror Television Camera',
        kicker: '02 / ROBOTIC INSTRUMENT',
        headline: 'The camera that flew to the Moon and came back.',
        technicalName: 'Periscope Mirror Vidicon Television Camera (200 & 600 Scan Lines)',
        explanation:
          'Instead of turning the whole heavy camera, Surveyor pointed its lens straight up into a rotating tilted mirror hood that could scan a 360-degree panorama and spin colored filter wheels to build color photos.',
        scienceImpact:
          'Apollo 12 astronauts unbolted Surveyor 3’s camera and brought it home—today it is displayed in the Smithsonian National Air and Space Museum!',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why did NASA want Apollo 12 to land within walking distance (160 meters) of Surveyor 3?',
        promptInsight:
          'To prove precision pinpoint landing! Apollo 11 had landed several kilometers downrange, so NASA needed to prove astronauts could target a specific geological crater.'
      }
    ],
    timeline: [
      {
        date: '02 JUN 1966',
        title: 'First U.S. soft landing on the Moon',
        description: 'Surveyor 1 touches down gently at 10 km/h in Oceanus Procellarum and transmits 11,237 images.'
      },
      {
        date: '20 APR 1967',
        title: 'Surveyor 3 hops and lands in a crater',
        description: 'After bouncing twice on touchdown, Surveyor 3 digs the first robotic trenches in lunar soil.'
      },
      {
        date: '19 NOV 1969',
        title: 'Human visitors arrive!',
        description: 'Apollo 12 astronauts Pete Conrad and Alan Bean walk down to Surveyor 3 and photograph it.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Surveyor 1 & 3 Archive (1966-045A / 1967-035A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A',
    signalMystery: {
      questionTitle: 'How did Surveyor 1 survive the brutal two-week-long lunar night (-150°C) when it only had solar panels?',
      evidenceItems: [
        {
          number: '01',
          title: 'One lunar night lasts 14 Earth days.',
          detail: 'During the two-week night, solar panels produce zero watts of electricity and temperatures plunge.'
        },
        {
          number: '02',
          title: 'Sensitive batteries and radios sit in insulated white boxes.',
          detail: 'Thermally controlled compartments kept heat from escaping quickly into space.'
        },
        {
          number: '03',
          title: 'Sunlight returned on June 28, 1966.',
          detail: 'After warming up in the second lunar morning, Surveyor 1 answered Earth’s commands again!'
        }
      ],
      engineerHint: 'What happens to a rechargeable battery in deep freeze once the Sun finally rises and warms the solar panels?',
      options: [
        {
          id: 'A',
          text: 'Insulated thermal compartments protected the battery just enough so rising sunlight could warm and recharge the lander.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Hibernation through the two-week night.',
          feedbackBody:
            'By sealing Surveyor 1’s electronics inside super-insulated thermal compartments with heat switches, Hughes and JPL engineers prevented the components from cracking during the 14-day lunar night. When the Sun rose again, the solar panel recharged the battery until January 1967!'
        },
        {
          id: 'B',
          text: 'Earth shone giant searchlights onto the Moon at night.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'No searchlight on Earth could power a solar panel 384,000 km away.',
          feedbackBody:
            'Look at Clue 02 and Clue 03: how did the lander protect its inner electronics until morning?'
        },
        {
          id: 'C',
          text: 'Volcanic vents under the footpads kept it warm.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Oceanus Procellarum’s lava plains cooled billions of years ago.',
          feedbackBody:
            'Check Clue 02: what did engineers wrap around the sensitive battery and radio?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Surveyor 1 Mission Report, NASA JPL (1966-045A).'
    },
    quiz: [
      {
        id: 'surv-q1',
        question: 'What major worry about the Moon did Surveyor 1 put to rest before Apollo astronauts landed?',
        options: [
          'That the Moon was too hot to touch during the day',
          'That spacecraft would sink into deep, quicksand-like lunar dust',
          'That the Moon had giant windstorms',
          'That gravity didn’t work on the Moon'
        ],
        correctIndex: 1,
        explanation:
          'Photos of Surveyor 1’s crushable footpads showed they sank only a couple of centimeters into firm lunar soil, proving heavy Apollo landers would be safe.',
        technicalTerm: 'Lunar Regolith Bearing Strength'
      },
      {
        id: 'surv-q2',
        question: 'Which Surveyor lander was visited in person by the Apollo 12 astronauts in 1969?',
        options: ['Surveyor 1', 'Surveyor 3', 'Surveyor 7', 'Surveyor 99'],
        correctIndex: 1,
        explanation:
          'Apollo 12 landed just 163 meters from Surveyor 3 in Oceanus Procellarum, allowing Pete Conrad and Alan Bean to inspect it and return its TV camera to Earth.',
        technicalTerm: 'Pinpoint Lunar Landing'
      }
    ],
    badge: {
      id: 'badge-surveyor',
      name: 'Soft-Landing Pioneer',
      title: 'Surveyor Specialist',
      color: '#10B981',
      iconType: 'lander',
      description: 'Verified the lunar soil mechanics and radar-controlled touchdown of JPL’s Surveyor fleet.'
    },
    illustrationType: 'surveyor'
  },
  {
    id: 'sojourner-rover',
    indexNumber: '07',
    name: 'Sojourner Rover',
    region: 'mars',
    regionLabel: 'Mars · Ares Vallis Floodplain',
    nssdcaId: '1996-068A',
    statusBadge: 'PARKED ON MARS',
    missionKicker: 'MISSION 07 / THE FIRST WHEELS ON MARS',
    tagline: 'No bigger than a microwave oven. It changed Mars forever.',
    cardSummary: 'Delivered inside a giant pyramid of bouncing airbags in 1997, Sojourner proved six-wheeled rovers could explore the Red Planet.',
    routeTrail: 'EARTH → AIRBAG BOUNCE → ARES VALLIS, MARS',
    builtBy: 'NASA Jet Propulsion Laboratory (JPL)',
    builtLocation: 'Pasadena, California',
    launchDate: '04 Dec 1996',
    lastContactDate: '27 Sep 1997 (Sol 83)',
    restingPlace: 'Ares Vallis (near Barnacle Bill & Yogi Rock), Mars',
    coordinates: '19.13° N, 33.22° W (Carl Sagan Memorial Station)',
    mapPosition: { x: 38, y: 36 },
    powerSource: '0.22 m² Gallium Arsenide Solar Panel (16 Watts) & Li-SOCl2 Battery',
    massKg: '11.5 kg (on Earth; ~4.3 kg weight on Mars)',
    storyKicker: 'LAST CONTACT / SEPTEMBER 1997',
    storyHeadline: 'Waiting faithfully for a lander that went quiet.',
    storyParagraphs: [
      'On July 4, 1997, Mars Pathfinder hit the Martian atmosphere, popped a parachute, inflated 24 giant airbags, and bounced 15 times across an ancient flood valley called Ares Vallis! When the petal doors unfolded, down rolled Sojourner—the very first wheeled rover on Mars, named after civil rights hero Sojourner Truth.',
      'Only 65 centimeters long and built at NASA’s Jet Propulsion Laboratory (JPL), Sojourner was designed to last just 7 Martian days (sols). It lasted 83 sols! When the Pathfinder base station’s battery died in the Martian cold on September 27, 1997, Sojourner lost its radio link to Earth. Its onboard computer was programmed to drive in safe circles around the silent lander, waiting for a command that never came.'
    ],
    storyFooterHighlight: ['DESIGNED FOR 7 DAYS. LASTED 83.', 'EVERY MARS ROVER SINCE USES ITS 6-WHEEL DESIGN.'],
    hotspots: [
      {
        id: 'soj-rocker-bogie',
        number: '01',
        x: 38,
        y: 68,
        label: '6-Wheel Rocker-Bogie Suspension',
        kicker: '01 / ROVER ENGINEERING',
        headline: 'Climbing rocks taller than its wheels.',
        technicalName: 'Articulated 6-Wheel Rocker-Bogie Suspension (No Springs)',
        explanation:
          'JPL engineers invented a clever hinged linkage called the "Rocker-Bogie" suspension. When one wheel climbs over a sharp Martian rock, the other five wheels press down firmly on the ground so the rover never tips over!',
        scienceImpact:
          'Sojourner’s 6-wheel Rocker-Bogie design worked so well that Spirit, Opportunity, Curiosity, and Perseverance all use the exact same suspension family.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why couldn’t engineers in California steer Sojourner in real time with a joystick?',
        promptInsight:
          'Radio signals moving at the speed of light took ~10 minutes to reach Mars and 10 minutes to return! If a driver saw a cliff on their screen, the rover would have fallen off 10 minutes ago—so Sojourner used laser stripes to dodge rocks on its own.'
      },
      {
        id: 'soj-apxs',
        number: '02',
        x: 68,
        y: 54,
        label: 'Alpha Proton X-Ray Spectrometer (APXS)',
        kicker: '02 / SCIENCE INSTRUMENT',
        headline: 'Sniffing out what Martian rocks are made of.',
        technicalName: 'Curium-244 Alpha Proton X-Ray Spectrometer (APXS)',
        explanation:
          'Mounted on a deployable wrist at the front of the rover, this soup-can-sized sensor pressed gently against Martian rocks like "Barnacle Bill" and "Yogi" for 10 hours to read their exact chemical elements.',
        scienceImpact:
          'It discovered rocks rich in silica and rounded pebbles that could only have been shaped by ancient rushing liquid water!',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why did Sojourner need the Pathfinder lander to talk to Earth?',
        promptInsight:
          'Because Sojourner was tiny (only 11.5 kg), it carried a short-range walkie-talkie modem. The larger Pathfinder lander held the powerful high-gain dish antenna that relayed Sojourner’s photos across 190 million km to Earth.'
      }
    ],
    timeline: [
      {
        date: '04 JUL 1997',
        title: 'Airbag bounce in Ares Vallis',
        description: 'Mars Pathfinder bounces to a stop; petal ramps deploy on Sol 2 for Sojourner to roll onto red soil.'
      },
      {
        date: '06 JUL 1997',
        title: 'Examining "Barnacle Bill"',
        description: 'Sojourner presses its APXS sensor against its first Martian rock, transmitting full element data.'
      },
      {
        date: '27 SEP 1997',
        title: 'Base station falls silent (Sol 83)',
        description: 'Pathfinder’s rechargeable battery fails in the cold, leaving Sojourner operating autonomously without a relay.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Mars Pathfinder / Sojourner Archive (1996-068A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A',
    signalMystery: {
      questionTitle: 'Why did NASA lose contact with the Sojourner rover if the rover itself was still working?',
      evidenceItems: [
        {
          number: '01',
          title: 'Sojourner weighed only 11.5 kilograms.',
          detail: 'It was too small to carry a heavy deep-space dish antenna, so it used a short-range UHF radio.'
        },
        {
          number: '02',
          title: 'The Pathfinder lander acted as its relay tower.',
          detail: 'Sojourner sent its data a few meters to the lander, which beamed it to Earth.'
        },
        {
          number: '03',
          title: 'Pathfinder’s battery wore out after 83 sols.',
          detail: 'Without a working battery to warm the lander’s radio, the base station went silent.'
        }
      ],
      engineerHint: 'If your phone works fine, what happens when the local Wi-Fi router loses power?',
      options: [
        {
          id: 'A',
          text: 'The Pathfinder base station lost battery power, cutting off Sojourner’s radio relay link to Earth.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'The little rover outlived its relay station.',
          feedbackBody:
            'Because Sojourner relied on the Mars Pathfinder lander to relay its UHF radio signals back to Earth, losing Pathfinder’s battery on Sol 83 cut off communication. Programmed with a fault-protection rule, Sojourner likely drove back toward the lander to wait for a signal!'
        },
        {
          id: 'B',
          text: 'Sojourner drove into a deep Martian ocean.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Ares Vallis hasn’t had liquid water for billions of years.',
          feedbackBody:
            'Look at Clue 01 and Clue 02: how did Sojourner’s messages get all the way back to Earth?'
        },
        {
          id: 'C',
          text: 'Its airbags reinflated and rolled it away.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'The airbags were deflated and retracted under the lander petals on Sol 1.',
          feedbackBody:
            'Check Clue 02 and Clue 03: what happened to the Pathfinder base station?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Mars Pathfinder / Sojourner Final Report (1996-068A).'
    },
    quiz: [
      {
        id: 'soj-q1',
        question: 'How big was the Sojourner rover compared to everyday objects?',
        options: [
          'As big as a school bus',
          'About the size of a microwave oven (65 cm long, 11.5 kg)',
          'As tall as a two-story house',
          'Smaller than a wristwatch'
        ],
        correctIndex: 1,
        explanation:
          'Sojourner was just 65 cm long and 30 cm tall—about the size of a microwave oven—compared to modern rovers like Perseverance which are the size of an SUV!',
        technicalTerm: 'Micro-Rover Architecture'
      },
      {
        id: 'soj-q2',
        question: 'What is the name of the 6-wheel suspension system debuted on Sojourner and used on every Mars rover since?',
        options: [
          'Rocker-Bogie suspension',
          'Hover-Cushion suspension',
          'Pogo-Stick chassis',
          'Caterpillar tank treads'
        ],
        correctIndex: 0,
        explanation:
          'Invented at NASA JPL, the Rocker-Bogie suspension keeps all six wheels on uneven ground without springs and allows a rover to climb obstacles larger than a wheel’s diameter.',
        technicalTerm: 'Rocker-Bogie Mobility System'
      }
    ],
    badge: {
      id: 'badge-sojourner',
      name: 'Ares Vallis Scout',
      title: 'Sojourner Rover Specialist',
      color: '#FB923C',
      iconType: 'rover',
      description: 'Mastered the Rocker-Bogie mobility and relay telemetry of Mars’s very first rover.'
    },
    illustrationType: 'sojourner'
  },
  {
    id: 'spirit-opportunity',
    indexNumber: '08',
    name: 'Spirit & Opportunity Rovers',
    region: 'mars',
    regionLabel: 'Mars · Gusev Crater & Meridiani Planum',
    nssdcaId: '2003-032A',
    statusBadge: 'DUST STORM SILENCED',
    missionKicker: 'MISSION 08 / THE TWIN MARATHON ROVERS',
    tagline: 'Sent for 90 days. Explored for nearly 15 years.',
    cardSummary: 'Twin robotic geologists that proved Mars once had warm, liquid water—and set the off-world driving record of 45.16 kilometers.',
    routeTrail: 'EARTH → GUSEV CRATER & MERIDIANI PLANUM → PERSEVERANCE VALLEY',
    builtBy: 'NASA Jet Propulsion Laboratory (JPL) & Cornell University',
    builtLocation: 'Pasadena, California & Ithaca, New York',
    launchDate: '10 Jun & 07 Jul 2003',
    lastContactDate: '22 Mar 2010 (Spirit) / 10 Jun 2018 (Opportunity)',
    restingPlace: 'Troy Sand Trap (Spirit) & Perseverance Valley (Opportunity)',
    coordinates: '14.5684° S, 175.4726° E (Spirit) / 2.28° S, 354.53° E (Opportunity)',
    mapPosition: { x: 65, y: 58 },
    powerSource: 'Triple-Junction GaInP/GaAs/Ge Solar Wing Arrays (140 Watts)',
    massKg: '185 kg each',
    storyKicker: 'FINAL TRANSMISSION / JUNE 10, 2018',
    storyHeadline: '“My battery is low and it’s getting dark.”',
    storyParagraphs: [
      'In January 2004, twin golf-cart-sized rovers named Spirit (MER-A) and Opportunity (MER-B) bounced down onto opposite sides of Mars. Engineers at JPL expected red Martian dust to coat their wing-like solar panels within 90 Martian days (sols). Instead, passing Martian dust devils and gusts of wind repeatedly swept their solar panels clean!',
      'Spirit explored Gusev Crater for over 6 years before getting bogged down in soft sulfate sand ("Troy") ahead of the 2010 Martian winter. Opportunity drove an astonishing 45.16 kilometers—more than a marathon!—finding mineral "blueberries" (hematite spheres) and gypsum veins that proved ancient Mars had drinkable liquid water. In June 2018, the worst global dust storm in decades blotted out the Sun over Perseverance Valley, ending Opportunity’s 5,352-sol adventure.'
    ],
    storyFooterHighlight: ['90 DAYS PLANNED → 5,352 SOLS ACHIEVED.', 'PROVED MARS ONCE HAD LIQUID WATER.'],
    hotspots: [
      {
        id: 'mer-pancam',
        number: '01',
        x: 50,
        y: 24,
        label: 'Pancam Mast Assembly',
        kicker: '01 / ROBOTIC GEOLOGIST',
        headline: 'Human-height eyes on the Red Planet.',
        technicalName: 'Stereo Panoramic Camera (Pancam) & Mini-TES Mast at 1.5 Meters',
        explanation:
          'Standing 1.5 meters tall—about the height of a middle-school student—the Pancam mast held two high-resolution color cameras spaced 30 centimeters apart to see in 3D stereo, plus an infrared spectrometer that identified water-formed minerals from across a crater.',
        scienceImpact:
          'Opportunity’s Pancam captured the first image of a meteorite on another planet ("Heat Shield Rock") and sweeping panoramas of Victoria and Endeavour Craters.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why does having two camera lenses spaced apart help a rover drive safely?',
        promptInsight:
          'Stereoscopic vision! Just like your two eyes give you depth perception, comparing the left and right camera images lets the rover’s computer calculate the exact distance and height of every boulder.'
      },
      {
        id: 'mer-rat',
        number: '02',
        x: 26,
        y: 66,
        label: 'Rock Abrasion Tool (RAT)',
        kicker: '02 / ROBOTIC GEOLOGIST',
        headline: 'A diamond-tipped drill instead of a geologist’s hammer.',
        technicalName: 'Honeybee Robotics Rock Abrasion Tool (RAT) & Microscopic Imager',
        explanation:
          'Martian rocks are coated in weathered red dust on the outside. At the end of its 5-jointed robotic arm, each rover carried a spinning diamond-resin grinding wheel that brushed and ground a 45-millimeter circle into solid rock so its microscope could inspect the fresh interior!',
        scienceImpact:
          'Inside rocks at Eagle Crater, Opportunity found tiny spherical pebbles rich in hematite ("blueberries") and ripple marks that formed in shallow, salty liquid water.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why did Spirit and Opportunity last so much longer than their 90-sol warranty?',
        promptInsight:
          'Unexpected "cleaning events"! Martian whirlwinds and dust devils periodically swept across the rovers, blowing the red dust right off their solar panels and boosting power back up.'
      }
    ],
    timeline: [
      {
        date: '04 & 25 JAN 2004',
        title: 'Twin touchdowns on Mars',
        description: 'Spirit lands in Gusev Crater; 21 days later, Opportunity lands inside Eagle Crater—a "hole-in-one"!'
      },
      {
        date: 'MAR 2004',
        title: 'Discovery of Martian "Blueberries"',
        description: 'Opportunity finds hematite spherules and water-carved rock layers at Meridiani Planum.'
      },
      {
        date: '22 MAR 2010',
        title: 'Spirit’s final message from Troy',
        description: 'Trapped in soft sand at a tilt away from the winter Sun, Spirit sends its last transmission on Sol 2,210.'
      },
      {
        date: '10 JUN 2018',
        title: 'Opportunity silenced by global dust storm',
        description: 'After driving 45.16 km over 14.5 years, a planet-wide dust storm blocks 99.99% of sunlight in Perseverance Valley.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Spirit (2003-027A) & Opportunity (2003-032A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A',
    signalMystery: {
      questionTitle: 'Why did the June 2018 global dust storm end Opportunity’s mission after nearly 15 years?',
      evidenceItems: [
        {
          number: '01',
          title: 'Opportunity relied 100% on solar panels.',
          detail: 'It needed sunlight every day to charge its lithium-ion batteries and run survival heaters.'
        },
        {
          number: '02',
          title: 'Atmospheric opacity (tau) spiked to 10.8.',
          detail: 'The June 2018 storm turned daytime into pitch-black night, blocking 99.99% of sunlight.'
        },
        {
          number: '03',
          title: 'Martian nights plunge below -80°C.',
          detail: 'Without battery power to run internal heaters, the mission clock and electronics froze.'
        }
      ],
      engineerHint: 'What happens to a solar-powered robot when a dust cloud blocks the Sun for weeks during freezing nights?',
      options: [
        {
          id: 'A',
          text: 'The wind flipped the 185-kg rover upside down.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Mars’s atmosphere is 100 times thinner than Earth’s—even 100 km/h winds feel like a gentle breeze.',
          feedbackBody:
            'Martian wind cannot tip a heavy rover over. Look at Clues 01, 02, and 03: what did the dust storm block?'
        },
        {
          id: 'B',
          text: 'Thick airborne dust blocked sunlight for weeks, draining batteries so survival heaters could no longer prevent freezing damage.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Dark skies starved the solar panels.',
          feedbackBody:
            'Opportunity’s final telemetry showed its solar arrays generating almost zero power as the sky darkened. Without electricity to keep its batteries and computer warm through the freezing Martian nights, the rover slipped into low-power sleep and never woke up.'
        },
        {
          id: 'C',
          text: 'It ran out of gasoline after driving 45 kilometers.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Opportunity was 100% solar-electric!',
          feedbackBody:
            'Check Clue 01: how did Opportunity get its energy every Martian day?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Mars Exploration Rover Opportunity Archive (2003-032A).'
    },
    quiz: [
      {
        id: 'mer-q1',
        question: 'How long were Spirit and Opportunity originally designed to operate on Mars?',
        options: ['90 Martian days (sols)', '15 Earth years', '24 hours', '100 years'],
        correctIndex: 0,
        explanation:
          'Their primary mission was just 90 sols (~92 Earth days), yet Spirit lasted 2,210 sols and Opportunity operated for 5,352 sols (nearly 15 years)!',
        technicalTerm: 'Martian Sol Longevity'
      },
      {
        id: 'mer-q2',
        question: 'What were the "blueberries" that Opportunity discovered in Eagle Crater?',
        options: [
          'Frozen alien fruit',
          'Small iron-rich hematite spheres formed in ancient groundwater',
          'Blue glass marbles dropped by the lander',
          'Frozen droplets of liquid nitrogen'
        ],
        correctIndex: 1,
        explanation:
          'These millimeter-sized spheres of gray hematite (an iron oxide mineral) concreted inside sedimentary rock layers soaked in liquid water billions of years ago.',
        technicalTerm: 'Hematite Concretions'
      }
    ],
    badge: {
      id: 'badge-opportunity',
      name: 'Meridiani Marathoner',
      title: 'Spirit & Opportunity Specialist',
      color: '#F43F5E',
      iconType: 'rover',
      description: 'Traced the 45.16 km water-hunting odyssey of JPL’s twin Mars Exploration Rovers.'
    },
    illustrationType: 'opportunity'
  },
  {
    id: 'viking-landers',
    indexNumber: '09',
    name: 'Viking 1 & 2 Landers',
    region: 'mars',
    regionLabel: 'Mars · Chryse Planitia & Utopia Planitia',
    nssdcaId: '1975-075C',
    statusBadge: 'RESTING ON MARS',
    missionKicker: 'MISSION 09 / FIRST TOUCHDOWN ON THE RED PLANET',
    tagline: 'Our first eyes, weather station, and biology lab on Mars.',
    cardSummary: 'In 1976, Viking 1 and 2 became the first U.S. spacecraft to land safely on Mars and scoop soil to test for microbial life.',
    routeTrail: 'EARTH → MARS ORBIT → CHRYSE & UTOPIA PLANITIA',
    builtBy: 'Martin Marietta Aerospace & NASA Langley Research Center',
    builtLocation: 'Denver, Colorado & Hampton, Virginia',
    launchDate: '20 Aug & 09 Sep 1975',
    lastContactDate: '11 Nov 1982 (Viking 1) / 11 Apr 1980 (Viking 2)',
    restingPlace: 'Chryse Planitia (Thomas Mutch Station) & Utopia Planitia',
    coordinates: '22.48° N, 47.97° W (Viking 1) / 47.97° N, 225.74° W (Viking 2)',
    mapPosition: { x: 24, y: 26 },
    powerSource: '2× SNAP-19 RTGs (Plutonium-238, 70 Watts total) + NiCd Batteries',
    massKg: '572 kg (landed dry mass)',
    storyKicker: 'OPERATED / JULY 1976 – NOVEMBER 1982',
    storyHeadline: 'Before Viking, nobody knew what Mars looked like up close.',
    storyParagraphs: [
      'On July 20, 1976—seven years to the day after Apollo 11 landed on the Moon—Viking 1 touched down on the golden-red plains of Chryse Planitia, followed 45 days later by Viking 2 in Utopia Planitia. Built by Martin Marietta in Denver and managed by NASA’s Langley Research Center, they were the first spacecraft ever to operate successfully on the Martian surface.',
      'Within seconds of landing, Viking 1’s facsimile camera scanned downward to photograph its own footpad resting on rust-red soil and volcanic rocks. For over six years, Viking 1 served as a daily Martian weather station and robotic biology laboratory until an accidental battery-charging software command overwrite on November 11, 1982 caused its antenna to turn away from Earth.'
    ],
    storyFooterHighlight: ['6+ YEARS OF MARTIAN WEATHER DATA.', 'FIRST BIOLOGICAL SOIL LAB ON ANOTHER PLANET.'],
    hotspots: [
      {
        id: 'vik-biology',
        number: '01',
        x: 52,
        y: 44,
        label: 'Miniature Automated Biology Lab',
        kicker: '01 / SCIENCE PAYLOAD',
        headline: 'Three chemistry labs inside a one-cubic-foot box.',
        technicalName: 'Gas Chromatograph Mass Spectrometer (GCMS) & 3 Biology Chambers',
        explanation:
          'Engineers packed three complete biological experiments into a box the size of a microwave! The surface sampler arm scooped Martian soil into tiny ovens and nutrient chambers to see if microscopic organisms would breathe out gases.',
        scienceImpact:
          'While the soil fizzed with oxygen when wetted, the GCMS detected no organic carbon—revealing that Martian soil contains super-reactive chemicals (later identified by Phoenix as perchlorates) created by ultraviolet sunlight.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'How did engineers make sure Viking didn’t accidentally bring Earth bacteria to Mars and "discover" them?',
        promptInsight:
          'Planetary Protection! Before launch, each entire Viking lander was sealed in a protective bioshield and baked in a giant oven at 112°C (233°F) for 40 hours to sterilize every component.'
      },
      {
        id: 'vik-weather',
        number: '02',
        x: 28,
        y: 35,
        label: 'Meteorology Boom & Wind Sensors',
        kicker: '02 / SCIENCE PAYLOAD',
        headline: 'The first weather forecast from another planet.',
        technicalName: 'Hot-Film Anemometer, Wind Quadrant Sensor & Thermocouple Array',
        explanation:
          'Extending from the lander leg was a weather boom that measured temperature, wind speed, wind direction, and barometric air pressure every Martian day for years.',
        scienceImpact:
          'Viking discovered that almost a third of Mars’s carbon dioxide atmosphere freezes out onto the winter pole as dry ice each year, making global air pressure rise and fall with the seasons!',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why did Viking 1 and 2 use nuclear RTGs instead of solar panels?',
        promptInsight:
          'In 1976, nobody knew how dusty Mars’s sky was or how severe dust storms would be, so SNAP-19 nuclear generators guaranteed steady power day and night for over 6 years.'
      }
    ],
    timeline: [
      {
        date: '20 JUL 1976',
        title: 'Viking 1 lands in Chryse Planitia',
        description: 'Transmits the very first surface photograph ever taken successfully on Mars.'
      },
      {
        date: '03 SEP 1976',
        title: 'Viking 2 lands in Utopia Planitia',
        description: 'Photographs white water-ice frost coating northern Martian rocks during winter.'
      },
      {
        date: '11 NOV 1982',
        title: 'Final contact with Viking 1 (Sol 2,245)',
        description: 'A battery-maintenance software update inadvertently alters antenna pointing commands, ending a 6-year record.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Viking 1 Lander Archive (1975-075C)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C',
    signalMystery: {
      questionTitle: 'What ended Viking 1’s 6-year mission in November 1982?',
      evidenceItems: [
        {
          number: '01',
          title: 'Its rechargeable batteries were slowly losing capacity.',
          detail: 'After 2,245 Martian days, engineers uploaded new software to carefully trickle-charge the aging batteries.'
        },
        {
          number: '02',
          title: 'Computer memory in 1976 was tiny (18,000 words).',
          detail: 'The new battery code accidentally overwrote the memory address storing the high-gain antenna pointing table.'
        },
        {
          number: '03',
          title: 'The antenna turned away from Earth.',
          detail: 'Without its pointing table, Viking 1 could neither hear Earth’s commands nor aim its signal home.'
        }
      ],
      engineerHint: 'What happens if a software update accidentally overwrites the memory that tells your dish antenna where Earth is?',
      options: [
        {
          id: 'A',
          text: 'A battery-charging software update inadvertently overwrote the memory storing the antenna pointing coordinates.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'A memory address collision silenced Mars’s longest-lived early lander.',
          feedbackBody:
            'Trying to extend Viking 1’s aging batteries, engineers sent a patch that unintentionally overwrote the computer memory used to aim the S-band dish antenna. When the antenna swiveled away from Earth, Viking 1 became a silent sentinel on Chryse Planitia—later photographed from orbit by Mars Reconnaissance Orbiter!'
        },
        {
          id: 'B',
          text: 'A giant Martian volcano erupted underneath it.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Chryse Planitia is a quiet, ancient plain.',
          feedbackBody:
            'Look at Clue 01 and Clue 02: what were engineers updating on Sol 2,245?'
        },
        {
          id: 'C',
          text: 'Its parachute tangled around the antenna six years after landing.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'The parachute and aeroshell separated high in the sky during landing in 1976.',
          feedbackBody:
            'Check Clue 02: what happened inside Viking 1’s onboard computer memory?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Viking 1 Lander Operations Summary (1975-075C).'
    },
    quiz: [
      {
        id: 'vik-q1',
        question: 'What was the very first picture Viking 1 took right after touching down on Mars in July 1976?',
        options: [
          'A selfie of its solar wings',
          'Its own round footpad resting on rocks and fine-grained Martian soil',
          'An alien city canal',
          'Phobos crashing into the horizon'
        ],
        correctIndex: 1,
        explanation:
          'Engineers programmed Viking 1 to immediately scan its own footpad 25 seconds after touchdown so they could see how deeply it sank into the soil even if the lander failed minutes later!',
        technicalTerm: 'Scanning Facsimile Camera'
      },
      {
        id: 'vik-q2',
        question: 'How did NASA prevent the Viking landers from contaminating Mars with Earth microbes?',
        options: [
          'By spraying them with soap in space',
          'By sealing each lander in a bioshield and baking it in a dry-heat oven at 112°C for 40 hours before launch',
          'By washing them in ocean water',
          'Microbes cannot survive inside rockets'
        ],
        correctIndex: 1,
        explanation:
          'Viking set the gold standard for Planetary Protection by heat-sterilizing the entire assembled spacecraft inside a pressurized bioshield prior to launch.',
        technicalTerm: 'Planetary Protection Sterilization'
      }
    ],
    badge: {
      id: 'badge-viking',
      name: 'Chryse Biologist',
      title: 'Viking 1 & 2 Specialist',
      color: '#EAB308',
      iconType: 'lander',
      description: 'Investigated the first surface landing, weather telemetry, and biological soil tests on Mars.'
    },
    illustrationType: 'viking'
  },
  {
    id: 'phoenix-insight',
    indexNumber: '10',
    name: 'Phoenix & InSight Landers',
    region: 'mars',
    regionLabel: 'Mars · Vastitas Borealis & Elysium Planitia',
    nssdcaId: '2018-042A',
    statusBadge: 'SOLAR POWER DEPLETED',
    missionKicker: 'MISSION 10 / ICE DIGGER & MARSQUAKE LISTENER',
    tagline: 'One tasted Martian water ice. One felt the planet’s deep core.',
    cardSummary: 'Sister stationary landers built by Lockheed Martin & JPL: Phoenix dug up Arctic water ice in 2008; InSight recorded 1,319 marsquakes until 2022.',
    routeTrail: 'EARTH → MARTIAN ARCTIC & ELYSIUM PLANITIA',
    builtBy: 'Lockheed Martin Space Systems & NASA Jet Propulsion Laboratory (JPL)',
    builtLocation: 'Littleton, Colorado & Pasadena, California',
    launchDate: '04 Aug 2007 (Phoenix) / 05 May 2018 (InSight)',
    lastContactDate: '02 Nov 2008 (Phoenix) / 15 Dec 2022 (InSight)',
    restingPlace: 'Green Valley, Vastitas Borealis (Phoenix) & Elysium Planitia (InSight)',
    coordinates: '68.22° N, 234.25° E (Phoenix) / 4.5024° N, 135.6234° E (InSight)',
    mapPosition: { x: 48, y: 20 },
    powerSource: 'Dual Circular UltraFlex Solar Arrays (2.15 m diameter)',
    massKg: '350 kg (Phoenix) / 358 kg (InSight)',
    storyKicker: 'SILENCED BY POLAR WINTER & DUST / 2008 & 2022',
    storyHeadline: 'Looking beneath the Martian surface.',
    storyParagraphs: [
      'Rovers are great for driving across plains, but some science requires standing completely still! Built on the same Lockheed Martin spacecraft platform, Phoenix (2008) and InSight (2018) unlocked what lies underneath Mars’s red dirt. Landing in the far northern Arctic plains, Phoenix used its robotic scoop to scrape only a few centimeters down—uncovering bright white chunks of water ice that sublimated (turned to vapor) over four days!',
      'Ten years later, InSight landed near the equator at Elysium Planitia and used its robotic arm to place a ultra-sensitive French-built seismometer (SEIS) directly onto the ground. Before thick red dust coated its round fan-like solar panels in December 2022, InSight felt 1,319 marsquakes and meteor impacts—revealing the size of Mars’s liquid iron-alloy core!'
    ],
    storyFooterHighlight: ['CONFIRMED SHALLOW WATER ICE.', '1,319 MARSQUAKES MAPPED THE MARTIAN CORE.'],
    hotspots: [
      {
        id: 'ins-seis',
        number: '01',
        x: 34,
        y: 72,
        label: 'SEIS Dome Seismometer',
        kicker: '01 / GEOPHYSICS INSTRUMENT',
        headline: 'A stethoscope placed right on Martian soil.',
        technicalName: 'Seismic Experiment for Interior Structure (SEIS) with Wind & Thermal Shield',
        explanation:
          'InSight was the first mission in history to use a robotic arm to pick up a scientific instrument from its deck and set it directly onto another planet’s ground! A white dome-shaped Wind and Thermal Shield covered it so gusts of wind wouldn’t drown out faint marsquakes.',
        scienceImpact:
          'By measuring how seismic waves echoed through the planet, InSight discovered that Mars has a large liquid metal core (about 1,830 km radius) and a crust 24 to 72 km thick.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why couldn’t InSight leave its seismometer sitting on top of the lander deck?',
        promptInsight:
          'When Viking left its seismometer on the lander deck in 1976, the lander’s legs vibrated in the wind! Setting SEIS directly on the soil under a wind shield let it feel vibrations smaller than a hydrogen atom.'
      },
      {
        id: 'phx-scoop',
        number: '02',
        x: 66,
        y: 48,
        label: 'Phoenix Ice-Digging Arm & TEGA Ovens',
        kicker: '02 / ARCTIC INSTRUMENT',
        headline: 'Digging into buried Arctic ice.',
        technicalName: '2.35-Meter Titanium Robotic Arm & Thermal and Evolved Gas Analyzer (TEGA)',
        explanation:
          'Phoenix dug trenches nicknamed "Dodo-Goldilocks" and "Snow White," exposing hard white layers just 5 cm below the surface. When bright dice-sized crumbs in the trench vanished over four sols, scientists knew for sure: it was pure water ice, not salt!',
        scienceImpact:
          'Phoenix also discovered that Martian Arctic soil is mildly alkaline (like garden soil for asparagus) and detected snow falling from Martian clouds!',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why did InSight decide to keep running its seismometer in 2022 instead of shaking dust off its solar panels?',
        promptInsight:
          'Engineers even poured a trickle of Martian sand from the scoop near the solar panel so wind would bounce sand grains to knock off fine dust—gaining extra months of marsquake data until the very last watt!'
      }
    ],
    timeline: [
      {
        date: '25 MAY 2008',
        title: 'Phoenix lands in the Martian Arctic',
        description: 'Touches down at 68° North latitude and exposes buried water ice just days later.'
      },
      {
        date: '02 NOV 2008',
        title: 'Polar winter claims Phoenix',
        description: 'As the Sun drops below the Arctic horizon, freezing CO2 dry ice coats Phoenix.'
      },
      {
        date: '26 NOV 2018',
        title: 'InSight lands on Elysium Planitia',
        description: 'Unfolds its twin round solar fans and places the SEIS seismometer directly on the ground.'
      },
      {
        date: '15 DEC 2022',
        title: 'InSight’s final selfie & silence (Sol 1,440)',
        description: 'After detecting 1,319 marsquakes (including a magnitude 4.7 monster), dust-covered solar arrays lose power.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Phoenix (2007-034A) & InSight (2018-042A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A',
    signalMystery: {
      questionTitle: 'How did scientists prove the bright white material Phoenix dug up was water ice and not white salt?',
      evidenceItems: [
        {
          number: '01',
          title: 'The robotic arm dug a trench called "Dodo-Goldilocks" on Sol 20.',
          detail: 'Several dice-sized bright white chunks broke loose at the bottom of the trench.'
        },
        {
          number: '02',
          title: 'Four days later (Sol 24), the white chunks had completely vanished!',
          detail: 'In Mars’s thin, low-pressure air, exposed ice turns directly from solid into water vapor (sublimation).'
        },
        {
          number: '03',
          title: 'Salt does not evaporate in cold sunlight.',
          detail: 'Furthermore, the TEGA oven melted a sample at exactly 0°C (32°F)—the melting point of water.'
        }
      ],
      engineerHint: 'What happens to ice cubes left in dry freezer air versus rocks of salt?',
      options: [
        {
          id: 'A',
          text: 'The white chunks sublimated (turned to vapor and vanished) over four days and melted at 0°C in the TEGA oven.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Sublimation + 0°C melting point = unmistakable water ice!',
          feedbackBody:
            'Because Salt cannot vanish into thin air in cold sunlight, watching the dice-sized bright chunks sublimate between Sol 20 and Sol 24—combined with TEGA detecting water vapor at 0°C—proved beyond doubt that Phoenix had touched Martian water ice!'
        },
        {
          id: 'B',
          text: 'Martian birds ate the white crumbs overnight.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'There are no animals on Mars.',
          feedbackBody:
            'Look at Clue 02 and Clue 03: what physical process turns solid ice directly into gas in low pressure?'
        },
        {
          id: 'C',
          text: 'The camera lens went blurry after Sol 20.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'All the surrounding rocks and soil crumbs stayed sharp and clear in the Sol 24 photo.',
          feedbackBody:
            'Check Clue 02: why did only the bright white ice fragments disappear?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Phoenix Mars Lander Archive (2007-034A) & InSight (2018-042A).'
    },
    quiz: [
      {
        id: 'phx-q1',
        question: 'How many marsquakes did the InSight lander’s SEIS seismometer detect before its solar panels became too dusty in December 2022?',
        options: ['Zero', '1,319 marsquakes', 'Only 2 marsquakes', '10 million marsquakes'],
        correctIndex: 1,
        explanation:
          'InSight recorded 1,319 seismic events, including quakes caused by magma movement and meteorite impacts that exposed subterranean ice!',
        technicalTerm: 'Planetary Seismology (SEIS)'
      },
      {
        id: 'phx-q2',
        question: 'What clever trick didJPL engineers use to clean some dust off InSight’s solar panels?',
        options: [
          'They sent a windshield wiper drone',
          'They poured a scoop of larger sand grains into the wind so bouncing grains knocked fine dust off the panel',
          'They turned the lander upside down',
          'They sprayed water from a hose'
        ],
        correctIndex: 1,
        explanation:
          'Through a process called "saltation," pouring larger sand grains from the robotic scoop into a breeze caused the heavy grains to bounce across the panel and dislodge sticky microscopic dust!',
        technicalTerm: 'Aeolian Saltation Cleaning'
      }
    ],
    badge: {
      id: 'badge-insight',
      name: 'Subsurface Explorer',
      title: 'Phoenix & InSight Specialist',
      color: '#06B6D4',
      iconType: 'lander',
      description: 'Investigated Martian Arctic water ice sublimation and deep-interior marsquake waves.'
    },
    illustrationType: 'insight-phoenix'
  },
  {
    id: 'ingenuity-helicopter',
    indexNumber: '11',
    name: 'Ingenuity Mars Helicopter',
    region: 'mars',
    regionLabel: 'Mars · Jezero Crater (Valinor Hills)',
    nssdcaId: '2020-052B',
    statusBadge: 'GROUNDED SENTINEL',
    missionKicker: 'MISSION 11 / THE FIRST AIRCRAFT ON ANOTHER PLANET',
    tagline: '72 flights in air as thin as a whisper.',
    cardSummary: 'Planned for just 5 test hops, "Ginny" flew 72 times across Jezero Crater before a rotor tip broke on landing in January 2024.',
    routeTrail: 'EARTH → PERSEVERANCE BELLY → WRIGHT BROTHERS FIELD → VALINOR HILLS',
    builtBy: 'NASA JPL, AeroVironment, NASA Ames & Langley',
    builtLocation: 'Pasadena & Simi Valley, California',
    launchDate: '30 Jul 2020 (First Flight: 19 Apr 2021)',
    lastContactDate: '16 Apr 2024 (Final Flight 72: 18 Jan 2024)',
    restingPlace: 'Valinor Hills, Jezero Crater, Mars (Airfield Chi)',
    coordinates: '18.4988° N, 77.3195° E (Jezero River Delta)',
    mapPosition: { x: 76, y: 34 },
    powerSource: 'Top-Mounted Solar Array & 6× Sony Li-Ion Rechargeable Cells',
    massKg: '1.8 kg (0.68 kg weight in Martian gravity)',
    storyKicker: 'GROUNDED AFTER 72 FLIGHTS / JANUARY 2024',
    storyHeadline: 'The Wright Brothers moment on another world.',
    storyParagraphs: [
      'Flying a helicopter on Mars sounded almost impossible: the Martian atmosphere has only 1% the density of Earth’s air at sea level—equivalent to flying 30 kilometers (100,000 feet) above Earth, higher than Mount Everest and three times higher than a passenger jet! To generate lift, engineers at NASA JPL and AeroVironment gave Ingenuity two 1.2-meter carbon-fiber rotor blades that spun in opposite directions at 2,400 to 2,537 RPM—five times faster than an Earth helicopter!',
      'Tucked underneath a rotor was a postage-stamp-sized piece of muslin fabric from the Wright Brothers’ original 1903 Flyer. Designed to fly just 5 times in 30 days, Ingenuity flew 72 times over nearly 3 years, scouting boulders and ancient river channels ahead of the Perseverance rover! On January 18, 2024 (Flight 72), smooth sand ripples confused its optical navigation camera during descent, causing its rotor blade tips to strike a dune slope. Even grounded, Ingenuity continues to wake up daily to log Martian weather on its internal memory for future astronauts to retrieve!'
    ],
    storyFooterHighlight: ['5 FLIGHTS PLANNED → 72 FLIGHTS COMPLETED.', 'STILL LOGGING WEATHER IN VALINOR HILLS.'],
    hotspots: [
      {
        id: 'ing-rotors',
        number: '01',
        x: 50,
        y: 28,
        label: 'Coaxial Counter-Rotating Carbon-Fiber Blades',
        kicker: '01 / AERODYNAMICS DISCOVERY',
        headline: 'Spinning 2,500 times a minute in 1% air.',
        technicalName: '1.2-Meter Coaxial Carbon-Fiber Foam-Core Rotors (2,537 RPM)',
        explanation:
          'Because Mars’s carbon dioxide atmosphere is paper-thin, Ingenuity weighed only 1.8 kilograms (about as heavy as a half-gallon carton of milk) yet carried giant 1.2-meter blades spinning in opposite directions so the helicopter didn’t need a heavy tail rotor.',
        scienceImpact:
          'On Flight 72, the tips of these ultra-lightweight carbon-fiber blades struck a steep sand ripple during touchdown—turning Ingenuity into a stationary monument.',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why does a helicopter with two rotors spinning in opposite directions not need a tail rotor?',
        promptInsight:
          'Torque cancellation! A single rotor makes the helicopter body want to spin the opposite way. Two stacked rotors spinning in opposite directions cancel each other’s twist!'
      },
      {
        id: 'ing-navcam',
        number: '02',
        x: 50,
        y: 65,
        label: 'Downward Optical Navigation Camera & Laser Altimeter',
        kicker: '02 / AUTONOMOUS FLIGHT',
        headline: 'Flying by watching rocks pass underneath.',
        technicalName: 'Snapdragon 801 Flight Processor, Garmin LiDAR Altimeter & 30-fps Navcam',
        explanation:
          'With a 15-minute radio delay from Earth, Ingenuity had to take off, hover, fly, and land 100% autonomously! Its downward black-and-white camera tracked rocks and pebbles on the ground 30 times a second to tell which way it was moving.',
        scienceImpact:
          'In January 2024, Ingenuity flew over featureless, smooth sand dunes in Valinor Hills where there were almost no pebbles to track—leading to the hard landing on Flight 72.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'What piece of aviation history is still attached under Ingenuity’s solar panel on Mars?',
        promptInsight:
          'A tiny swatch of unbleached muslin fabric from the left wing of Orville and Wilbur Wright’s 1903 Flyer from Kitty Hawk, North Carolina!'
      }
    ],
    timeline: [
      {
        date: '19 APR 2021',
        title: 'First powered flight on another planet',
        description: 'Ingenuity hovers 3 meters above Wright Brothers Field in Jezero Crater for 39.1 seconds.'
      },
      {
        date: 'APR 2022 – 2023',
        title: 'Scouting the ancient river delta',
        description: 'Transitions from technology demo to aerial scout for Perseverance, setting speed (36 km/h) and altitude (24 m) records.'
      },
      {
        date: '18 JAN 2024',
        title: 'Flight 72 & rotor blade damage',
        description: 'Featureless sand dunes confuse optical navigation during landing, damaging the carbon-fiber rotor tips.'
      },
      {
        date: '16 APR 2024',
        title: 'Final farewell & autonomous weather station',
        description: 'Sends final message via Perseverance; programmed to wake daily for up to 20 years and store temperature data onboard.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Ingenuity Mars Helicopter Archive (2020-052B)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2020-052B',
    signalMystery: {
      questionTitle: 'Why did smooth, featureless sand ripples cause Ingenuity’s hard landing on Flight 72?',
      evidenceItems: [
        {
          number: '01',
          title: 'Ingenuity flew 100% autonomously without human joystick control.',
          detail: 'Radio signals take 5 to 20 minutes between Earth and Mars, so onboard software steered the craft.'
        },
        {
          number: '02',
          title: 'Its downward camera tracked rocks and shadows to measure horizontal speed.',
          detail: 'The visual navigation algorithm locked onto contrasting surface features 30 times per second.'
        },
        {
          number: '03',
          title: 'Flight 72 took place over smooth, uniform sand dunes in Valinor Hills.',
          detail: 'Without distinct rocks to track, the computer misjudged its sideways drift during touchdown.'
        }
      ],
      engineerHint: 'Imagine walking across a completely blank white floor while looking only through a narrow cardboard tube—how would you know if you were drifting sideways?',
      options: [
        {
          id: 'A',
          text: 'Without distinct rocks or texture on the smooth sand dunes, its downward optical camera couldn’t accurately measure sideways speed during landing, causing the rotors to strike a slope.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Optical navigation needs surface landmarks.',
          feedbackBody:
            'Ingenuity’s visual navigation system worked brilliantly over rocky terrain for 71 flights. Over the smooth, steep sand ripples of Valinor Hills on Flight 72, the camera lacked distinct visual landmarks to cancel horizontal velocity before touchdown, causing the spinning carbon-fiber blades to strike the dune.'
        },
        {
          id: 'B',
          text: 'A flock of Martian birds collided with the rotor.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Ingenuity was the only flyer in Martian skies!',
          feedbackBody:
            'Look at Clue 02 and Clue 03: how did Ingenuity know where the ground was?'
        },
        {
          id: 'C',
          text: 'Its solar panel fell off during takeoff.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Its solar panel is still intact and charging the battery today!',
          feedbackBody:
            'Even after Flight 72, Ingenuity’s solar array and computer still work. Check Clue 02 and Clue 03!'
        }
      ],
      sourceCitation: 'Source: NSSDCA & NASA JPL • Ingenuity Flight 72 Investigation (2020-052B).'
    },
    quiz: [
      {
        id: 'ing-q1',
        question: 'How thin is Mars’s atmosphere compared to Earth’s atmosphere at sea level?',
        options: [
          '10 times thicker than Earth’s air',
          'Only about 1% as dense as Earth’s atmosphere at sea level',
          'Exactly the same density',
          'Made of 100% pure oxygen'
        ],
        correctIndex: 1,
        explanation:
          'Mars’s atmospheric pressure is less than 1% of Earth’s, meaning Ingenuity’s rotors had to spin at ~2,500 RPM to generate enough lift.',
        technicalTerm: 'Martian Atmospheric Density (~0.020 kg/m³)'
      },
      {
        id: 'ing-q2',
        question: 'How many flights did Ingenuity complete compared to the 5 flights it was originally built for?',
        options: ['Only 1 flight', '5 flights', '72 flights', '500 flights'],
        correctIndex: 2,
        explanation:
          'Ingenuity completed 72 flights across nearly three years, flying more than 14 times farther than planned!',
        technicalTerm: 'Rotorcraft Flight Envelope'
      }
    ],
    badge: {
      id: 'badge-ingenuity',
      name: 'Jezero Aviator',
      title: 'Ingenuity Helicopter Specialist',
      color: '#D2F366',
      iconType: 'rotor',
      description: 'Mastered the 1%-atmosphere aerodynamics and optical navigation of Mars’s first aircraft.'
    },
    illustrationType: 'ingenuity'
  },
  {
    id: 'dawn-spacecraft',
    indexNumber: '12',
    name: 'Dawn Spacecraft',
    region: 'deep-space',
    regionLabel: 'Asteroid Belt · Perpetual Orbit Around Ceres',
    nssdcaId: '2007-043A',
    statusBadge: 'SILENT ORBIT',
    missionKicker: 'MISSION 12 / TWO WORLDS ON ONE TANK OF ION FUEL',
    tagline: 'Powered by blue xenon beams. Now a silent moon of Ceres.',
    cardSummary: 'The only spacecraft ever to orbit two deep-space destinations—protoplanet Vesta and dwarf planet Ceres—where it now orbits forever.',
    routeTrail: 'EARTH → MARS GRAVITY ASSIST → VESTA → DWARF PLANET CERES',
    builtBy: 'Orbital Sciences Corp. & NASA Jet Propulsion Laboratory (JPL)',
    builtLocation: 'Dulles, Virginia & Pasadena, California',
    launchDate: '27 Sep 2007',
    lastContactDate: '31 Oct 2018',
    restingPlace: 'Perpetual quarantine orbit around Dwarf Planet Ceres (Main Asteroid Belt)',
    coordinates: '2.77 AU from Sun (Elliptical Ceres orbit)',
    mapPosition: { x: 46, y: 42 },
    powerSource: '19.7-Meter Span Triple-Junction Solar Arrays (10,300 W at 1 AU; 1,300 W at Ceres)',
    massKg: '1,218 kg (wet) / 747 kg (dry)',
    storyKicker: 'HYDRAZINE DEPLETED / OCTOBER 31, 2018',
    storyHeadline: 'Why NASA left Dawn in orbit instead of crashing it.',
    storyParagraphs: [
      'Before Dawn, no spacecraft had ever orbited one distant world, fired up its engines to leave, and then entered orbit around a second world! Built by Orbital Sciences and managed by NASA JPL, Dawn pulled off this cosmic double-header using three revolutionary Xenon Ion Thrusters that glowed with a faint blue-violet sci-fi beam.',
      'After mapping giant asteroid Vesta in 2011–2012, Dawn spiraled out to dwarf planet Ceres—discovering mysterious bright salt deposits (sodium carbonate) inside Occator Crater left behind by an underground briny ocean! Because Ceres has water ice and organics, Planetary Protection rules forbade crashing Dawn onto its surface. When its hydrazine attitude fuel ran out on October 31, 2018, NASA placed Dawn in a stable "quarantine orbit" where it will silently circle Ceres for at least 50 years.'
    ],
    storyFooterHighlight: ['FIRST TO ORBIT TWO EXTRATERRESTRIAL TARGETS.', 'QUARANTINE ORBIT PROTECTS CERES’S BRINY SECRETS.'],
    hotspots: [
      {
        id: 'dawn-ion',
        number: '01',
        x: 50,
        y: 66,
        label: 'NSTAR Xenon Ion Propulsion Engines',
        kicker: '01 / PROPULSION DISCOVERY',
        headline: 'The gentle push of a sheet of paper.',
        technicalName: '3× 30-cm Xenon Electrostatic Ion Thrusters (90 mN thrust, 3,100 s Isp)',
        explanation:
          'Dawn’s ion engines didn’t burn chemical rocket fuel. Instead, solar electricity electrified xenon gas atoms and shot them out the back at 140,000 km/h! On Earth, the thrust felt as gentle as the weight of a single sheet of notebook paper in your hand.',
        scienceImpact:
          'Because an ion engine can push continuously for years in frictionless space without stopping, that tiny paper-weight push accelerated Dawn by nearly 40,000 km/h—ten times more fuel-efficient than chemical rockets!',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'How can a thrust as weak as a sheet of paper accelerate a 1,200-kg spacecraft to 40,000 km/h?',
        promptInsight:
          'Patience + zero friction! Pushing continuously 24 hours a day for 2,000 days in vacuum adds speed every single second without losing any momentum.'
      },
      {
        id: 'dawn-framing',
        number: '02',
        x: 54,
        y: 38,
        label: 'Framing Cameras & GRaND Spectrometer',
        kicker: '02 / SCIENCE DISCOVERY',
        headline: 'Solving the mystery of Ceres’s bright spots.',
        technicalName: 'Dual Framing Cameras (MPS Germany) & Gamma Ray / Neutron Detector',
        explanation:
          'As Dawn approached Ceres in 2015, scientists were stunned by dazzlingly bright white spots glowing inside dark Occator Crater. Dawn skimmed just 35 km above the crater floor to analyze their chemistry.',
        scienceImpact:
          'Those bright spots (Cerealia Facula) are domes of sodium carbonate salt—proof that salty liquid brine recently bubbled up from deep inside Ceres!',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why did NASA refuse to crash Dawn into Ceres at the end of its mission like Cassini at Saturn?',
        promptInsight:
          'Because Ceres has underground brine, water ice, and organic molecules! Leaving Dawn in a high quarantine orbit prevents Earth microbes from contaminating a potentially habitable world.'
      }
    ],
    timeline: [
      {
        date: '27 SEP 2007',
        title: 'Launch on ion-powered odyssey',
        description: 'Dawn lifts off from Cape Canaveral and fires its glowing blue xenon ion thruster.'
      },
      {
        date: '16 JUL 2011',
        title: 'Enters orbit around protoplanet Vesta',
        description: 'Spends 14 months mapping Vesta’s towering 22-km mountain Rheasilvia.'
      },
      {
        date: '06 MAR 2015',
        title: 'First spacecraft to orbit a dwarf planet (Ceres)',
        description: 'Captures close-ups of Occator Crater’s bright sodium carbonate salt domes.'
      },
      {
        date: '31 OCT 2018',
        title: 'Enters silent perpetual orbit around Ceres',
        description: 'Out of hydrazine attitude-control fuel, Dawn remains a permanent artificial satellite of Ceres.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Dawn Spacecraft Archive (2007-043A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A',
    signalMystery: {
      questionTitle: 'Why did Dawn stop communicating in October 2018 even though its giant solar panels still worked?',
      evidenceItems: [
        {
          number: '01',
          title: 'Dawn still had working solar panels and leftover xenon ion gas.',
          detail: 'Its giant 19.7-meter solar wings could still generate plenty of electricity at Ceres.'
        },
        {
          number: '02',
          title: 'To aim its solar panels at the Sun and its dish at Earth, it used small hydrazine thrusters.',
          detail: 'After two of its spinning reaction wheels wore out, hydrazine thrusters controlled every turn.'
        },
        {
          number: '03',
          title: 'On October 31, 2018, the hydrazine tank ran completely dry.',
          detail: 'Without hydrazine, Dawn could no longer turn its antenna toward Earth or keep its panels aimed at the Sun.'
        }
      ],
      engineerHint: 'Even if your car engine works, what happens if your steering system runs out of fluid?',
      options: [
        {
          id: 'A',
          text: 'It ran out of hydrazine propellant needed to orient its solar panels toward the Sun and point its radio antenna at Earth.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Attitude control is everything in deep space.',
          feedbackBody:
            'While Dawn’s xenon ion engines pushed it between worlds, small chemical hydrazine thrusters kept the spacecraft pointed in the right direction. When the last drop of hydrazine ran out on October 31, 2018, Dawn could no longer aim its antenna at Earth—and now orbits Ceres silently for decades to come.'
        },
        {
          id: 'B',
          text: 'It crashed into Vesta’s south pole mountain.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Dawn left Vesta in 2012 and traveled to Ceres!',
          feedbackBody:
            'Look at Clue 02 and Clue 03: what fuel did Dawn use to point its antenna?'
        },
        {
          id: 'C',
          text: 'Ceres’s bright spots blinded its radio dish.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Bright salt spots reflect visible light, which does not harm a radio antenna.',
          feedbackBody:
            'Check Clue 02 and Clue 03: why couldn’t Dawn turn toward Earth anymore?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Dawn Mission Conclusion Release, November 2018 (2007-043A).'
    },
    quiz: [
      {
        id: 'dawn-q1',
        question: 'Which two worlds in the Asteroid Belt did Dawn orbit—making it the only spacecraft to orbit two extraterrestrial bodies?',
        options: [
          'Phobos and Deimos',
          'Protoplanet Vesta and dwarf planet Ceres',
          'Europa and Titan',
          'Pluto and Charon'
        ],
        correctIndex: 1,
        explanation:
          'Dawn orbited the rocky protoplanet Vesta from 2011 to 2012, then used its xenon ion engines to travel to icy dwarf planet Ceres, orbiting it from 2015 to 2018.',
        technicalTerm: 'Dual-Target Ion Trajectory'
      },
      {
        id: 'dawn-q2',
        question: 'What were the mysterious bright white spots inside Ceres’s Occator Crater made of?',
        options: [
          'Alien city streetlights',
          'Sodium carbonate salt deposits left behind by subsurface liquid brine',
          'Polished solid silver mirrors',
          'Burning lakes of methane'
        ],
        correctIndex: 1,
        explanation:
          'Dawn’s spectrometers proved the bright faculae are sodium carbonate salts—similar to baking soda—left behind when salty underground water rose to the surface and sublimated.',
        technicalTerm: 'Cryovolcanic Brine Effusion'
      }
    ],
    badge: {
      id: 'badge-dawn',
      name: 'Ion Navigator',
      title: 'Dawn Spacecraft Specialist',
      color: '#38BDF8',
      iconType: 'ion',
      description: 'Mastered electrostatic xenon ion propulsion and the briny geology of dwarf planet Ceres.'
    },
    illustrationType: 'dawn'
  },
  {
    id: 'near-shoemaker',
    indexNumber: '13',
    name: 'NEAR Shoemaker',
    region: 'deep-space',
    regionLabel: 'Near-Earth Asteroid · Resting on 433 Eros',
    nssdcaId: '1996-008A',
    statusBadge: 'RESTING ON ASTEROID',
    missionKicker: 'MISSION 13 / TOUCHDOWN ON A TUMBLING POTATO ROCK',
    tagline: 'Built to orbit. Dared to land on an asteroid.',
    cardSummary: 'The first spacecraft ever to orbit and land on an asteroid—gently touching down on peanut-shaped 433 Eros in February 2001.',
    routeTrail: 'EARTH → MATHILDE FLYBY → ORBIT & LANDING ON ASTEROID 433 EROS',
    builtBy: 'Johns Hopkins University Applied Physics Laboratory (APL)',
    builtLocation: 'Laurel, Maryland',
    launchDate: '17 Feb 1996',
    lastContactDate: '28 Feb 2001',
    restingPlace: 'Edge of Himeros Saddle on Asteroid 433 Eros',
    coordinates: '35° S, 279° W on Asteroid 433 Eros (~1.46 AU)',
    mapPosition: { x: 22, y: 40 },
    powerSource: '4× Fixed Gallium Arsenide Solar Panels (1,800 Watts)',
    massKg: '487 kg (dry mass)',
    storyKicker: 'LANDED ON AN ASTEROID / FEBRUARY 12, 2001',
    storyHeadline: 'Landing a spacecraft that had no landing legs.',
    storyParagraphs: [
      'Designed and built by the Johns Hopkins University Applied Physics Laboratory (APL) in Laurel, Maryland, NEAR Shoemaker (Near Earth Asteroid Rendezvous, named after planetary geologist Eugene Shoemaker) was built strictly as an orbiter. For a full year, it circled the 34-kilometer-long, peanut-shaped asteroid 433 Eros, snapping 160,000 images.',
      'As its fuel ran low in February 2001, mission director Robert Farquhar and the APL team asked a bold question: could they land an orbiter on an asteroid with zero landing legs? Because Eros’s gravity is 1,000 times weaker than Earth’s, a sequence of five gentle thruster braking burns slowed NEAR Shoemaker to walking speed—1.5 meters per second (3.4 mph)! It touched down on the tips of its solar panels and bottom edge, surviving undamaged and even running its gamma-ray spectrometer in the dirt for 16 more days!'
    ],
    storyFooterHighlight: ['TOUCHDOWN AT WALKING SPEED (1.5 M/S).', 'FIRST SPACECRAFT TO LAND ON AN ASTEROID.'],
    hotspots: [
      {
        id: 'near-panels',
        number: '01',
        x: 34,
        y: 46,
        label: '4 Fixed Solar Wings (Improvised Landing Pads!)',
        kicker: '01 / ENGINEERING IMPROVISATION',
        headline: 'When solar panels become landing feet.',
        technicalName: '4× Rigid Gallium-Arsenide Solar Panels (1.5 × 1.8 Meters Each)',
        explanation:
          'Unlike spacecraft with flimsy, floppy solar wings, NEAR Shoemaker had four stiff, fixed solar panels Arranged like petals. When it touched down on Eros at 5.4 km/h, the bottom corners of two solar panels and the spacecraft body rested gently on the boulder-strewn soil!',
        scienceImpact:
          'Because the craft barely weighed half a kilogram in Eros’s microgravity, the solar panels didn’t even crack—and kept generating power on the asteroid’s surface!',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'How could a 487-kg metal spacecraft land on its solar panel corners without smashing them?',
        promptInsight:
          'Microgravity! Asteroid 433 Eros is only 34 km long, so its surface gravity is about 1/1,000th of Earth’s. On Eros, the 487-kg spacecraft weighed less than a paperback book!'
      },
      {
        id: 'near-xgrs',
        number: '02',
        x: 62,
        y: 58,
        label: 'X-Ray / Gamma-Ray Spectrometer (XGRS)',
        kicker: '02 / ASTEROID SCIENCE',
        headline: 'Bonus science right in the asteroid dirt.',
        technicalName: 'Sodium Iodide & BGO Gamma-Ray Spectrometer',
        explanation:
          'From orbit 35 km up, the Gamma-Ray Spectrometer could barely detect faint signals from the asteroid. Sitting right on the surface after landing, the sensor was just centimeters from the soil—10 times more sensitive than in orbit!',
        scienceImpact:
          'NASA extended the mission by two weeks so NEAR Shoemaker could measure the exact iron, silicon, and potassium recipe of a primitive solar system building block.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'What happens if you jump upward on Asteroid 433 Eros?',
        promptInsight:
          'Because escape velocity on Eros is only ~35 km/h (22 mph), a strong human jump wouldn’t launch you out of orbit, but you would float upward for several minutes before drifting slowly back down!'
      }
    ],
    timeline: [
      {
        date: '17 FEB 1996',
        title: 'Launch of NASA’s first Discovery mission',
        description: 'Built in 27 months under NASA’s "faster, better, cheaper" Discovery program by JHU APL.'
      },
      {
        date: '14 FEB 2000',
        title: 'Valentine’s Day orbit at 433 Eros',
        description: 'Becomes the very first spacecraft in history to enter orbit around an asteroid.'
      },
      {
        date: '12 FEB 2001',
        title: 'Historic touchdown on Himeros Saddle',
        description: 'Touches down softly at 1.5 m/s, snapping close-up photos from just 120 meters above the rocks.'
      },
      {
        date: '28 FEB 2001',
        title: 'Final surface telemetry & asteroid winter',
        description: 'After 16 bonus days of surface gamma-ray science, NEAR Shoemaker is shut down and remains on Eros.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • NEAR Shoemaker Archive (1996-008A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A',
    signalMystery: {
      questionTitle: 'How did NEAR Shoemaker survive landing on Asteroid 433 Eros without any landing legs or airbags?',
      evidenceItems: [
        {
          number: '01',
          title: 'Asteroid 433 Eros is only 34 kilometers long.',
          detail: 'Its tiny mass produces surface gravity roughly 1,000 times weaker than Earth’s.'
        },
        {
          number: '02',
          title: 'Five thruster burns slowed its descent to 1.5 meters per second.',
          detail: 'That is only 5.4 km/h (3.4 mph)—about as slow as a person strolling down a hallway.'
        },
        {
          number: '03',
          title: 'In Eros’s microgravity, the 487-kg spacecraft weighed less than 0.5 kg.',
          detail: 'Its rigid solar panel corners easily supported the feather-light touchdown.'
        }
      ],
      engineerHint: 'How hard does a feather-light object hit the ground when moving at walking speed?',
      options: [
        {
          id: 'A',
          text: 'Eros’s ultra-weak gravity (1/1,000th of Earth) plus thruster braking let the craft touch down at walking speed weighing less than half a kilogram.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Physics turned an orbiter into a lander!',
          feedbackBody:
            'Because gravity on a 34-km asteroid is minuscule, JHU APL engineers used five tiny thruster burns to slow NEAR Shoemaker to 1.5 m/s. Weighing only a few hundred grams in Eros’s gravity, it settled gently onto the tips of its solar panels and kept working for 16 more days!'
        },
        {
          id: 'B',
          text: 'The asteroid was made of soft marshmallow foam.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Eros is a solid stony S-type asteroid covered in silicate boulders.',
          feedbackBody:
            'Look at Clue 01 and Clue 03: why did the spacecraft weigh almost nothing when it touched the rock?'
        },
        {
          id: 'C',
          text: 'It deployed three giant parachutes in the asteroid’s air.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Asteroids have zero atmosphere for a parachute to catch!',
          feedbackBody:
            'Check Clue 02: what slowed the spacecraft down to 1.5 meters per second?'
        }
      ],
      sourceCitation: 'Source: NSSDCA & JHU APL • NEAR Shoemaker Asteroid Landing Report (1996-008A).'
    },
    quiz: [
      {
        id: 'near-q1',
        question: 'Which laboratory built and operated the NEAR Shoemaker spacecraft?',
        options: [
          'Johns Hopkins University Applied Physics Laboratory (APL) in Laurel, Maryland',
          'European CERN Laboratory',
          'Brookhaven National Lab',
          'Fermilab'
        ],
        correctIndex: 0,
        explanation:
          'NEAR Shoemaker was designed, built, and operated by Johns Hopkins University Applied Physics Laboratory (APL), the first mission in NASA’s Discovery Program.',
        technicalTerm: 'JHU APL Spacecraft Engineering'
      },
      {
        id: 'near-q2',
        question: 'How fast was NEAR Shoemaker moving when it touched down on Asteroid 433 Eros?',
        options: [
          '50,000 km/h',
          'About 1.5 to 1.8 meters per second (~3.5 mph, walking speed)',
          'Speed of sound',
          '100 meters per second'
        ],
        correctIndex: 1,
        explanation:
          'Touching down at just 1.5 to 1.8 m/s—slower than a brisk walk—remains one of the softest planetary landings ever achieved.',
        technicalTerm: 'Microgravity Soft Touchdown'
      }
    ],
    badge: {
      id: 'badge-near',
      name: 'Eros Touchdown',
      title: 'NEAR Shoemaker Specialist',
      color: '#EC4899',
      iconType: 'asteroid',
      description: 'Mastered microgravity orbital mechanics and the historic landing on Asteroid 433 Eros.'
    },
    illustrationType: 'near-shoemaker'
  },
  {
    id: 'kepler-telescope',
    indexNumber: '14',
    name: 'Kepler Space Telescope',
    region: 'deep-space',
    regionLabel: 'Deep Space · Earth-Trailing Heliocentric Orbit',
    nssdcaId: '2009-011A',
    statusBadge: 'SILENT SUN ORBIT',
    missionKicker: 'MISSION 14 / THE TELESCOPE THAT FOUND 2,600+ WORLDS',
    tagline: 'It watched stars blink. And revealed a galaxy full of planets.',
    cardSummary: 'Before Kepler, we knew of only a handful of exoplanets. Now drifting in an Earth-trailing orbit, it proved our galaxy has more planets than stars.',
    routeTrail: 'EARTH → EARTH-TRAILING HELIOCENTRIC ORBIT (1.01 AU)',
    builtBy: 'Ball Aerospace & Technologies Corp., NASA Ames & JPL',
    builtLocation: 'Boulder, Colorado & Mountain View, California',
    launchDate: '07 Mar 2009',
    lastContactDate: '15 Nov 2018',
    restingPlace: 'Safe Earth-trailing heliocentric orbit around the Sun',
    coordinates: '~151 million km from Earth (372.5-day solar orbit)',
    mapPosition: { x: 64, y: 18 },
    powerSource: '2.86 m² Non-Articulated Gallium Arsenide Solar Array (1,100 Watts)',
    massKg: '1,052 kg (at launch)',
    storyKicker: 'GOODNIGHT COMMAND SENT / NOVEMBER 15, 2018',
    storyHeadline: 'How a broken telescope used sunlight to keep balanced.',
    storyParagraphs: [
      'When you look up at the night sky, does almost every star have planets orbiting it like our Sun? Before 2009, nobody knew the answer. Built by Ball Aerospace in Boulder, Colorado and managed by NASA Ames and JPL, the Kepler Space Telescope stared unblinkingly at over 530,000 stars—waiting for tiny dips in starlight caused when an orbiting planet (an exoplanet) crossed in front of its star.',
      'In 2013, two of Kepler’s four spinning reaction wheels broke, making it impossible to hold the telescope steady on its original star field. Instead of giving up, engineers invented a brilliant rescue plan called "K2": they balanced the telescope against the gentle pressure of photons from our own Sun, like balancing a kayak in a river current! After discovering 2,662 confirmed exoplanets over 9.5 years, Kepler ran out of hydrazine fuel in October 2018. On November 15, 2018—the 388th anniversary of astronomer Johannes Kepler’s death—NASA sent a final "goodnight" command, leaving the telescope drifting peacefully in a safe orbit around the Sun.'
    ],
    storyFooterHighlight: ['2,662+ CONFIRMED EXOPLANETS.', 'PROVED THERE ARE MORE PLANETS THAN STARS IN OUR GALAXY.'],
    hotspots: [
      {
        id: 'kep-photometer',
        number: '01',
        x: 46,
        y: 42,
        label: '95-Megapixel CCD Photometer Array',
        kicker: '01 / OPTICS DISCOVERY',
        headline: 'Spotting a flea crawling across a car headlight.',
        technicalName: '1.4-Meter Schmidt Telescope & 42-CCD Focal Plane (95 Megapixels)',
        explanation:
          'Kepler didn’t take colorful nebula snapshots like Hubble. Its 95-megapixel sensor was an ultra-precise light meter (photometer) that could detect a star dimming by just 0.01% (100 parts per million) when an Earth-sized planet passed in front of it!',
        scienceImpact:
          'That precision is equivalent to standing 100 kilometers away and noticing the brightness drop when a single fruit fly walks across a car’s headlight!',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why did Kepler orbit the Sun behind Earth instead of orbiting low around Earth like Hubble?',
        promptInsight:
          'In low Earth orbit, the bulky Earth blocks half the sky and reflects blinding light every 90 minutes! Trailing Earth around the Sun let Kepler stare at the exact same stars continuously for years.'
      },
      {
        id: 'kep-wheels',
        number: '02',
        x: 56,
        y: 66,
        label: 'Reaction Wheels & Solar Pressure Balance',
        kicker: '02 / ENGINEERING RESCUE',
        headline: 'Balancing a telescope on sunbeams.',
        technicalName: 'Momentum Reaction Wheels & K2 Solar Radiation Pressure Stabilization',
        explanation:
          'Space telescopes don’t fire thrusters constantly to point because rocket exhaust vibrates the mirror. Instead, they spin heavy metal flywheels inside called Reaction Wheels. When two of Kepler’s four wheels failed, engineers angled its hexagonal body so sunlight pushed evenly on both sides!',
        scienceImpact:
          'That clever "K2" solar-pressure trick rescued the mission for 4 extra years and discovered hundreds of additional exoplanets.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Does sunlight actually push on physical objects in space?',
        promptInsight:
          'Yes! Even though photons of light have zero mass, they carry momentum (radiation pressure). On an asymmetrical spacecraft in space, sunlight gently pushes like a whisper of wind.'
      }
    ],
    timeline: [
      {
        date: '07 MAR 2009',
        title: 'Launch into Earth-trailing orbit',
        description: 'Lifts off from Cape Canaveral to stare at 150,000 stars in Cygnus and Lyra.'
      },
      {
        date: 'DEC 2011',
        title: 'First Earth-sized rocky & habitable-zone worlds',
        description: 'Confirms Kepler-22b in the habitable zone and Earth-sized planets Kepler-20e and 20f.'
      },
      {
        date: 'MAY 2014',
        title: 'Reborn as "K2" using sunlight balance',
        description: 'Engineers use solar radiation pressure as a virtual third reaction wheel to continue hunting planets.'
      },
      {
        date: '15 NOV 2018',
        title: 'Final "Goodnight" commands sent',
        description: 'With fuel exhausted after 9.5 years, NASA turns off Kepler’s transmitter in a safe solar orbit.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Kepler Space Telescope Archive (2009-011A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2009-011A',
    signalMystery: {
      questionTitle: 'How did engineers keep Kepler pointing steadily for 4 more years after two of its reaction wheels broke?',
      evidenceItems: [
        {
          number: '01',
          title: 'Normally, a spacecraft needs 3 working reaction wheels to control pitch, yaw, and roll.',
          detail: 'By May 2013, only 2 of Kepler’s 4 reaction wheels still spun.'
        },
        {
          number: '02',
          title: 'Sunlight exerts a tiny, steady push called radiation pressure.',
          detail: 'If sunlight hits one side of a spacecraft harder than the other, the spacecraft slowly twists.'
        },
        {
          number: '03',
          title: 'Kepler’s body was shaped like a symmetric hexagon.',
          detail: 'Pointing along its orbital path let sunlight push equally on both sides of the barrel!'
        }
      ],
      engineerHint: 'How can you use a steady natural push in space to hold the third axis steady while your 2 remaining wheels control the other two?',
      options: [
        {
          id: 'A',
          text: 'Engineers balanced the hexagonal telescope against the gentle pressure of sunlight so the 2 remaining reaction wheels could hold it steady.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Turned a problem (solar push) into the solution!',
          feedbackBody:
            'Ball Aerospace and NASA engineers realized that normally annoying solar photon pressure could act as a "virtual third reaction wheel" if Kepler was pointed parallel to its orbit so sunlight pressed symmetrically on its roof! That K2 rescue yielded over 500 more confirmed exoplanets.'
        },
        {
          id: 'B',
          text: 'Space Shuttle astronauts flew out 150 million km to oil the wheels.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Kepler was 400 times farther away than the Moon—unreachable by astronauts!',
          feedbackBody:
            'Look at Clue 02 and Clue 03: what natural force in space did engineers use to balance the telescope?'
        },
        {
          id: 'C',
          text: 'They tied Kepler to an asteroid with a steel cable.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Kepler floats freely in a solar orbit behind Earth.',
          feedbackBody:
            'Check Clue 02: what exerts a gentle, steady push on spacecraft surfaces?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Kepler / K2 Mission Archive (2009-011A).'
    },
    quiz: [
      {
        id: 'kep-q1',
        question: 'How did the Kepler Space Telescope detect planets around distant stars?',
        options: [
          'By listening for alien radio broadcasts',
          'By using the Transit Method—measuring tiny, regular dips in a star’s brightness when an orbiting planet passes in front of it',
          'By flying directly to other star systems',
          'By bouncing radar off other stars'
        ],
        correctIndex: 1,
        explanation:
          'When a planet crosses (transits) in front of its host star, it blocks a tiny fraction of starlight—allowing Kepler to measure the planet’s size and orbital period.',
        technicalTerm: 'Exoplanet Transit Photometry'
      },
      {
        id: 'kep-q2',
        question: 'What grand scientific discovery did Kepler’s 2,662+ exoplanets prove about our Milky Way galaxy?',
        options: [
          'Our Solar System is the only one with planets',
          'There are more planets than stars in our galaxy, and small rocky worlds are common',
          'Only giant gas planets exist outside our Solar System',
          'Stars disappear after 10 years'
        ],
        correctIndex: 1,
        explanation:
          'Statistical analysis of Kepler’s census revealed that on average every star in the Milky Way has at least one planet, meaning billions of Earth-sized worlds exist in our galaxy.',
        technicalTerm: 'Galactic Exoplanet Occurrence Rate'
      }
    ],
    badge: {
      id: 'badge-kepler',
      name: 'Exoplanet Hunter',
      title: 'Kepler Telescope Specialist',
      color: '#A855F7',
      iconType: 'telescope',
      description: 'Mastered transit photometry and K2 solar-pressure stabilization across 2,662+ alien worlds.'
    },
    illustrationType: 'kepler'
  },
  {
    id: 'voyager-1',
    indexNumber: '15',
    name: 'Voyager 1',
    region: 'deep-space',
    regionLabel: 'Deep Space • Interstellar Space (Ophiuchus)',
    nssdcaId: '1977-084A',
    statusBadge: 'INTERSTELLAR EXPLORER',
    missionKicker: 'MISSION 15 / THE FARTHEST HUMAN-MADE OBJECT IN THE UNIVERSE',
    tagline: 'Farthest from home. First between the stars.',
    cardSummary:
      'Launched in 1977, Voyager 1 discovered volcanoes on Jupiter’s moon Io, snapped the famous "Pale Blue Dot" photo of Earth, and crossed into interstellar space in 2012.',
    routeTrail: 'EARTH → JUPITER → SATURN → HELIOPAUSE → INTERSTELLAR SPACE',
    builtBy: 'NASA Jet Propulsion Laboratory (JPL)',
    builtLocation: 'Pasadena, California',
    launchDate: 'September 5, 1977 (Titan IIIE-Centaur, Cape Canaveral LC-41)',
    lastContactDate: 'Cameras Off Since Feb 1990 • Still Whispers Across 24.8+ Billion km',
    restingPlace: 'Coasting through Interstellar Space toward Constellation Ophiuchus',
    coordinates: '~166 AU (24.8 Billion km) from Earth • 17.0 km/s (38,026 mph)',
    mapPosition: { x: 84, y: 18 },
    powerSource: '3 × MHW-RTG Plutonium-238 Radioisotope Thermoelectric Generators (470W at launch)',
    massKg: '815 kg (at launch including hydrazine attitude propellant)',
    storyKicker: 'INTERSTELLAR CROSSING / AUGUST 25, 2012',
    storyHeadline: 'Cameras off. Still whispering from between the stars.',
    storyParagraphs: [
      'Built by engineers at NASA’s Jet Propulsion Laboratory (JPL) in Pasadena, Voyager 1 launched on September 5, 1977, taking advantage of a once-every-176-years geometric alignment of the outer giant planets. At Jupiter in March 1979, it discovered nine active volcanoes erupting on the moon Io—proving for the first time that Earth was not the only volcanically active world in the Solar System! At Saturn in November 1980, it flew within 6,490 km of giant moon Titan to measure its thick orange nitrogen-methane smog.',
      'On Valentine’s Day (February 14) 1990, from 6 billion kilometers (40.5 AU) away, NASA commanded Voyager 1 to turn its cameras backward one final time to photograph Earth as a tiny "Pale Blue Dot" suspended in a sunbeam. Right after that photo, engineers permanently turned off its cameras to save power and computer memory for the long road ahead. On August 25, 2012, at 121 AU, Voyager 1 crossed the heliopause—leaving the Sun’s magnetic bubble to become the first human-made spacecraft in interstellar space, carrying the 12-inch Golden Record.'
    ],
    storyFooterHighlight: [
      'THE CAMERAS WENT DARK IN 1990.',
      'ITS INTERSTELLAR JOURNEY NEVER STOPPED.'
    ],
    hotspots: [
      {
        id: 'v1-dish',
        number: '01',
        x: 48,
        y: 38,
        label: '3.7m High-Gain Parabolic Dish Antenna',
        kicker: '01 / SPACECRAFT DISCOVERY',
        headline: 'A 23-watt whisper across 24.8 billion km.',
        technicalName: '3.7-Meter (12-Foot) S-Band & X-Band High-Gain Parabolic Reflector',
        explanation:
          'Voyager 1’s giant white dish dominates the spacecraft. Its radio transmitter uses only about 23 watts of power—the same as a refrigerator lightbulb! By the time that signal travels over 22 hours and 45 minutes at the speed of light to reach Earth, the energy hitting NASA’s 70-meter Deep Space Network antennas is a billion-billionth of a watt.',
        scienceImpact:
          'Allowed JPL engineers to receive plasma wave and magnetic field data from outside the Sun’s heliosphere—and even upload a software patch across 24 billion km in 2024 when a 1970s memory chip failed!',
        promptType: 'THINK ABOUT IT',
        promptQuestion: 'Why does it take nearly 46 hours to send a command to Voyager 1 and hear its reply?',
        promptInsight:
          'Even radio waves traveling at the speed of light (~300,000 km/s) need ~22.8 hours to cross 24.8 billion kilometers one way, plus another ~22.8 hours for Voyager’s answer to travel back!'
      },
      {
        id: 'v1-golden-record',
        number: '02',
        x: 42,
        y: 55,
        label: 'The 12-Inch Voyager Golden Record',
        kicker: '02 / SPACECRAFT DISCOVERY',
        headline: 'Earth’s greatest hits on a gold phonograph.',
        technicalName: '12-Inch Gold-Plated Copper Phonograph Disc & Uranium-238 Cover',
        explanation:
          'Bolted to Voyager 1’s 10-sided aluminum bus is a 12-inch gold-plated copper record curated by Carl Sagan’s team. It holds 115 encoded photographs, greetings in 55 languages, humpback whale songs, a mother’s kiss, brainwaves, and 90 minutes of music—plus a needle and pictorial instructions etched on its protective aluminum cover.',
        scienceImpact:
          'Electroplated on the cover is a tiny spot of ultra-pure Uranium-238, whose radioactive half-life (4.468 billion years) lets any future spacefarer calculate the exact age of the ship!',
        promptType: 'YOUR TURN',
        promptQuestion: 'If you could add one sound or song from your life to the Golden Record, what would it be?',
        promptInsight:
          'Because there is no air or erosion in interstellar space, the Golden Record inside its aluminum jacket will remain playable for over 1 billion years—long after continents on Earth have shifted!'
      },
      {
        id: 'v1-rtg-scan',
        number: '03',
        x: 68,
        y: 66,
        label: 'Three MHW-RTG Nuclear Booms & Scan Platform',
        kicker: '03 / SPACECRAFT DISCOVERY',
        headline: 'Volcanoes on Io and the Pale Blue Dot.',
        technicalName: 'Three Plutonium-238 MHW-RTGs & Steerable Optical Science Scan Platform',
        explanation:
          'Three cylindrical Multi-Hundred Watt Radioisotope Thermoelectric Generators (MHW-RTGs) mounted on a carbon-truss boom convert heat from decaying Plutonium-238 into electricity. On the opposite boom sits the steerable Science Scan Platform holding the narrow-angle and wide-angle television cameras.',
        scienceImpact:
          'Captured the volcanic plumes of Jupiter’s moon Io in 1979, revealed Saturn’s braided F-ring in 1980, and snapped the iconic "Pale Blue Dot" portrait of Earth in 1990.',
        promptType: 'CONNECT THE CLUES',
        promptQuestion: 'Why did NASA turn off Voyager 1’s cameras and heaters one by one after 1990?',
        promptInsight:
          'As Plutonium-238 slowly decays and the thermocouples age, Voyager 1 loses about 4 watts of electrical power every year. Turning off cameras and heaters conserved enough electricity to keep the interstellar instruments alive into the 2020s!'
      }
    ],
    timeline: [
      {
        date: '05 SEP 1977',
        title: 'Launch from Cape Canaveral',
        description: 'Lifts off 16 days after twin Voyager 2 on a faster trajectory to Jupiter and Saturn.'
      },
      {
        date: '05 MAR 1979',
        title: 'Jupiter & active volcanoes on Io',
        description: 'Discovers 9 erupting volcanoes on moon Io—the first active volcanoes ever seen outside Earth.'
      },
      {
        date: '14 FEB 1990',
        title: 'The "Pale Blue Dot" farewell photo',
        description: 'Snaps a final family portrait of Earth from 6 billion km away before its cameras are switched off forever.'
      },
      {
        date: '25 AUG 2012',
        title: 'First spacecraft in Interstellar Space',
        description: 'Crosses the heliopause at 121 AU, stepping outside the Sun’s solar wind bubble into the Milky Way.'
      }
    ],
    nssdcaSourceLabel: 'NSSDCA • Voyager 1 Interstellar Mission Archive (1977-084A)',
    nssdcaUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-084A',
    signalMystery: {
      questionTitle: 'Why did NASA permanently turn off Voyager 1’s cameras right after it took the famous "Pale Blue Dot" photo of Earth in 1990?',
      evidenceItems: [
        {
          number: '01',
          title: 'By 1990, Voyager 1 was 6 billion km past the planets in pitch-black space.',
          detail: 'There were no more planets or moons along its northward path to photograph.'
        },
        {
          number: '02',
          title: 'Its Plutonium-238 RTG power source loses about 4 watts of electricity every year.',
          detail: 'Keeping the cameras and their warmers turned on used precious watts of power.'
        },
        {
          number: '03',
          title: 'Its 1970s computers had only 69.6 kilobytes of memory!',
          detail: 'The camera computer memory was needed to run interstellar particle and magnetic field software.'
        }
      ],
      engineerHint: 'If there are no more planets to photograph and you lose 4 watts of electrical power every year, what is the smartest way to survive until interstellar space?',
      options: [
        {
          id: 'A',
          text: 'To save electrical power and repurpose its 1970s computer memory so Voyager 1 could survive long enough to reach interstellar space.',
          isCorrect: true,
          feedbackHeadline: 'You followed the evidence.',
          feedbackSubhead: 'Trading cameras for a ticket to the stars!',
          feedbackBody:
            'JPL engineers turned off the cameras and their heaters in 1990 and erased the imaging software so those kilobytes of memory and watts of electricity could keep Voyager 1’s magnetic field and plasma detectors running when it reached interstellar space 22 years later in 2012!'
        },
        {
          id: 'B',
          text: 'The camera lens cap accidentally closed by itself.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'The cameras worked fine—engineers intentionally commanded them off.',
          feedbackBody:
            'Look at Clues 02 and 03: what was happening to Voyager 1’s electrical power every year, and how much computer memory did it have?'
        },
        {
          id: 'C',
          text: 'It ran out of 35mm film rolls.',
          isCorrect: false,
          feedbackHeadline: 'Keep investigating.',
          feedbackSubhead: 'Voyager 1 used electronic vidicon television tubes, not film rolls!',
          feedbackBody:
            'Check Clues 02 and 03: why did engineers need to save electricity and computer memory?'
        }
      ],
      sourceCitation: 'Source: NSSDCA • Voyager 1 Mission Archive (1977-084A).'
    },
    quiz: [
      {
        id: 'v1-q1',
        question: 'What historic milestone did Voyager 1 achieve on August 25, 2012, at a distance of 121 AU from the Sun?',
        options: [
          'It landed on Pluto',
          'It crossed the heliopause to become the first human-made object to enter interstellar space',
          'It returned to Earth orbit',
          'It plunged into the Sun'
        ],
        correctIndex: 1,
        explanation:
          'At 121 AU, Voyager 1’s Plasma Wave Science instrument detected dense interstellar plasma, confirming it had exited the Sun’s heliosphere into interstellar space.',
        technicalTerm: 'Heliopause & Interstellar Medium'
      },
      {
        id: 'v1-q2',
        question: 'How much total computer memory do Voyager 1’s three 1970s onboard computers have combined—and how strong is its radio transmitter?',
        options: [
          '16 Terabytes of RAM and a 1-megawatt laser',
          'About 69.6 kilobytes of memory (thousands of times less than a smartphone photo) and a 23-watt radio transmitter (like a fridge lightbulb)',
          '500 Gigabytes and a solar-powered cell tower',
          'It has no computers onboard'
        ],
        correctIndex: 1,
        explanation:
          'Voyager 1 runs on ~69.6 KB of 1970s memory and transmits across 24.8 billion km using just 23 watts of radio power!',
        technicalTerm: 'Flight Data System (FDS) & X-Band Telemetry'
      }
    ],
    badge: {
      id: 'badge-voyager-1',
      name: 'Interstellar Voyager',
      title: 'Heliopause & Pale Blue Dot Specialist',
      color: '#38BDF8',
      iconType: 'dish',
      description: 'Mastered Voyager 1’s Jupiter/Saturn discoveries, the Golden Record, and humanity’s crossing into interstellar space.'
    },
    illustrationType: 'voyager-1'
  }
];

/**
 * Unique, Funny, Middle-School-Friendly First-Person Fun Facts for all 15 Space Vehicles!
 * Spoken directly by a floating 3D-styled Space Hardware Buddy when the student clicks "Fun Facts".
 */
export const SENTINEL_FUN_FACTS: Record<string, VehicleFunFactPack> = {
  'pioneer-10': {
    missionId: 'pioneer-10',
    hardwareSpeakerName: 'PIONEER 10’S CHATTY DISH',
    hardwarePartBadge: '2.74m Aluminum Dish • Spinning at 4.8 RPM',
    introCatchphrase: 'Whoa, dizzy! I’ve been spinning like a cosmic frisbee since 1972!',
    facts: [
      {
        title: 'Less Brainpower Than a Musical Greeting Card!',
        joke: 'You know that smartphone in your pocket? It has millions of times more memory than me. I didn’t even have a computer hard drive—I just did whatever Mission Control yelled at me from Earth!',
        scienceTruth: 'Pioneer 10 had practically zero onboard data storage and relied on direct real-time radio commands from NASA’s Deep Space Network.'
      },
      {
        title: 'My Radio Was Weaker Than Your Nightlight!',
        joke: 'My main transmitter was only 8 watts! That’s dimmer than the tiny bulb inside your fridge, yet NASA still heard me from 12.2 BILLION kilometers away. Talk about an epic megaphone dish!',
        scienceTruth: 'NASA’s 70-meter dish antennas on Earth could detect Pioneer 10’s 8-watt signal even when it arrived at a billionth of a trillionth of a watt.'
      },
      {
        title: 'Jupiter Almost Fried My Eyeballs!',
        joke: 'When I zoomed past Jupiter in 1973, the radiation belts were 10,000 times stronger than Earth’s! My glass instruments literally turned brown and false commands started firing, but I survived with 1 frame to spare!',
        scienceTruth: 'Pioneer 10 survived radiation levels fatal to humans and warned NASA to heavily shield the later Voyager spacecraft.'
      },
      {
        title: 'See Ya In 2 Million Years, Aldebaran!',
        joke: 'NASA only gave me a 21-month warranty, and I worked for 30 YEARS! Now I’m coasting toward the red giant star Aldebaran. Don’t wait up—I’ll get there in about 2,000,000 AD!',
        scienceTruth: 'Because space is a vacuum with no friction, Pioneer 10 continues coasting at ~11.9 km/s forever.'
      }
    ]
  },
  'pioneer-11': {
    missionId: 'pioneer-11',
    hardwareSpeakerName: 'PIONEER 11’S STUNT THRUSTER',
    hardwarePartBadge: 'Gravity-Assist Daredevil • Ring Dodger',
    introCatchphrase: 'Hold my plutonium! Watch me use giant Jupiter as a cosmic slingshot!',
    facts: [
      {
        title: 'The Ultimate Cosmic Rollercoaster!',
        joke: 'To get all the way to Saturn on the opposite side of the Solar System, I dove right over Jupiter’s north pole at 173,000 km/h—the fastest human-made speed record of the 1970s!',
        scienceTruth: 'Pioneer 11 pioneered the polar gravity-assist trajectory that flung it 2.4 billion km across the Solar System to Saturn.'
      },
      {
        title: 'Guinea Pig Through Saturn’s Rings!',
        joke: 'NASA wanted to know if Voyager would get smashed by rocks at Saturn, so they sent ME through the ring plane first! Spoiler alert: I found a brand-new ring (the F-ring) and survived!',
        scienceTruth: 'Pioneer 11 passed within 21,000 km of Saturn’s cloud tops and discovered both the narrow F-ring and the moon Epimetheus.'
      },
      {
        title: 'I Almost Crashed Into a Mystery Moon!',
        joke: 'While skimming Saturn’s rings, I passed within 4,000 km of an icy moon nobody knew existed! If it had been 5 minutes earlier, I would have been a very expensive crater!',
        scienceTruth: 'Imaging and particle drops revealed the uncataloged moon Epimetheus sharing an orbit with Janus.'
      }
    ]
  },
  'apollo-lm': {
    missionId: 'apollo-lm',
    hardwareSpeakerName: 'EAGLE’S GOLDEN FOIL LEGS',
    hardwarePartBadge: 'Octagonal Launch Pad • Tranquillity Base',
    introCatchphrase: 'Hey! Why did Neil and Buzz take the top half of our ship and leave me on the Moon?!',
    facts: [
      {
        title: 'My Skin Was Thinner Than Kitchen Tin Foil!',
        joke: 'To save weight, Grumman engineers made my cabin walls out of aluminum as thin as three sheets of kitchen foil! If an astronaut had dropped a heavy screwdriver inside, it could have poked right through!',
        scienceTruth: 'Because the Lunar Module only ever flew in the vacuum of space, it didn’t need heavy aerodynamic armor—just pressurized aluminum and multi-layer Kapton foil.'
      },
      {
        title: 'No Seats Allowed—Stand Up and Drive!',
        joke: 'Neil Armstrong and Buzz Aldrin didn’t sit in chairs when they landed on the Moon! Chairs were too heavy, so they stood up held by bungee cables like cosmic snowboarders!',
        scienceTruth: 'Removing seats saved ~30 kg of mass and allowed astronauts to stand closer to the small triangular downward-looking windows.'
      },
      {
        title: 'Wrapped Like a Giant Golden Chocolate Coin!',
        joke: 'My shiny gold blankets aren’t for fashion—without air on the Moon, the sunny side hits +120°C (boiling!) while the shady side is -150°C! My Kapton foil is the ultimate space thermos!',
        scienceTruth: 'Multi-Layer Insulation (MLI) blankets made of aluminized Kapton and Mylar reflected solar heat and kept propellant tanks from boiling or freezing.'
      }
    ]
  },
  'lunar-rovers': {
    missionId: 'lunar-rovers',
    hardwareSpeakerName: 'MOON BUGGY’S FENDER TAPE',
    hardwarePartBadge: '4-Wheel-Drive Electric Hot Rod • 18 km/h Record',
    introCatchphrase: 'Beep beep! Need a ride across Hadley Rille? Watch out for the rooster tails of Moon dust!',
    facts: [
      {
        title: 'Tires Made of Piano Wire (Zero Flat Tires)!',
        joke: 'If you pump a rubber tire with air on the Moon, it’ll explode or freeze solid! So Boeing made my wheels out of woven zinc-coated piano wire with titanium bumpers. Bounce-tastic!',
        scienceTruth: 'Each wire-mesh wheel weighed only 5.4 kg on Earth (0.9 kg in lunar gravity) and floated over sharp volcanic regolith without ever puncturing.'
      },
      {
        title: 'Fixed on the Moon with Duct Tape and Maps!',
        joke: 'On Apollo 17, Commander Gene Cernan accidentally snagged my rear fender with a geology hammer in his pocket and ripped it off! They fixed me using spare lunar maps and gray duct tape!',
        scienceTruth: 'Without the fender, spinning mesh wheels threw blinding "rooster tails" of dark heat-absorbing lunar dust over the astronauts and battery radiators.'
      },
      {
        title: 'Folded Up Like a Giant Origami Suitcase!',
        joke: 'How do you fit a 3-meter car inside a tiny Lunar Module? You put hinges on the chassis and wheels, fold it up like a lawn chair, and pull two cables so it pops open on the Moon!',
        scienceTruth: 'The LRV folded into a 0.85 cubic-meter triangular bay inside Quadrant 1 of the Lunar Module descent stage.'
      }
    ]
  },
  'alsep-packages': {
    missionId: 'alsep-packages',
    hardwareSpeakerName: 'CHATTY LASER MIRROR (LRRR)',
    hardwarePartBadge: '100 Quartz Corner Cubes • Still Working Since 1969!',
    introCatchphrase: 'Zap me with a laser from Earth! I’ll bounce it right back to your telescope in 2.5 seconds!',
    facts: [
      {
        title: 'The Moon Rang Like a Giant Bell for an Hour!',
        joke: 'When Apollo astronauts intentionally crashed their empty rocket stages into the Moon, my seismometer heard the Moon vibrate like a giant church bell for over 60 minutes! Spooky, right?',
        scienceTruth: 'Because the Moon’s crust is bone-dry and fractured without water to dampen vibrations, seismic waves echo back and forth for up to an hour.'
      },
      {
        title: 'Zero Batteries, Zero Wires, Still Doing Science Today!',
        joke: 'All the other Apollo gadgets ran out of nuclear juice in 1977, but I’m a passive quartz mirror! Scientists in New Mexico still shoot green lasers at me every week!',
        scienceTruth: 'Corner-cube prisms reflect light straight back toward its source regardless of angle, letting scientists measure the Moon’s distance to within 1 millimeter.'
      },
      {
        title: 'The Moon Is Slowly Sneaking Away From You!',
        joke: 'Thanks to my laser measurements, we caught the Moon red-handed: it’s drifting away from Earth by 3.8 centimeters every single year—the exact same speed your fingernails grow!',
        scienceTruth: 'Tidal friction between Earth’s oceans and the Moon transfers rotational energy into the Moon’s orbit, expanding it by 3.8 cm/year.'
      }
    ]
  },
  'surveyor-landers': {
    missionId: 'surveyor-landers',
    hardwareSpeakerName: 'SURVEYOR 3’S SCOOP & CAMERA',
    hardwarePartBadge: 'Tripod Lunar Scout • Visited by Apollo 12!',
    introCatchphrase: 'Hey! First you leave me on the Moon in 1967, then astronauts show up 2 years later with bolt cutters!',
    facts: [
      {
        title: 'Scientists Feared the Moon Was Giant Quicksand!',
        joke: 'Before I landed in 1966, some scientists worried the Moon was covered in 50 feet of fluffy dust and spacecraft would sink glub-glub-glub out of sight! My footpads sank only half an inch—phew!',
        scienceTruth: 'Surveyor 1’s crushable honeycomb footpads proved lunar regolith was firm enough to support the 15-ton Apollo Lunar Module.'
      },
      {
        title: 'I Hopped Twice Because My Engine Wouldn’t Quit!',
        joke: 'When Surveyor 3 touched down in a crater in 1967, glare confused my radar and my rockets kept firing! I bounced 10 meters into the air, hopped a second time, and finally parked!',
        scienceTruth: 'Astronauts Pete Conrad and Alan Bean photographed Surveyor 3’s double footpad bounce marks in the lunar soil during Apollo 12.'
      },
      {
        title: 'The Only Robot Ever Souvenir-Shopped by Astronauts!',
        joke: 'In November 1969, Apollo 12 landed right behind me! Pete Conrad walked over, posed for photos with me, and snipped off my TV camera and soil scoop to bring back to Earth!',
        scienceTruth: 'Surveyor 3’s returned camera now sits on display at the Smithsonian National Air and Space Museum in Washington, D.C.'
      }
    ]
  },
  'sojourner-rover': {
    missionId: 'sojourner-rover',
    hardwareSpeakerName: 'SOJOURNER THE MICROWAVE ROVER',
    hardwarePartBadge: '10.6 kg Six-Wheeler • Ares Vallis, Mars',
    introCatchphrase: 'Who are you calling tiny?! I’m the size of a microwave oven and I conquered Mars!',
    facts: [
      {
        title: 'I Landed Inside a Giant Bouncing Beach Ball!',
        joke: 'Rockets are expensive, so JPL wrapped my lander in 24 giant airbags! We hit Mars at 50 km/h, bounced 15 meters high—five stories tall!—and rolled 15 times before stopping!',
        scienceTruth: 'Pathfinder’s multi-lobed Vectran airbags cushioned a 18-G impact across the rocky Ares Vallis floodplain on July 4, 1997.'
      },
      {
        title: 'Insulated With 99.8% Frozen Smoke (Aerogel)!',
        joke: 'Martian nights drop to -100°C! To keep my tiny 2-megahertz brain warm without heavy blankets, engineers lined my belly with Aerogel—a solid puff of silica that’s 99.8% empty air!',
        scienceTruth: 'Silica aerogel is the lightest solid insulator ever invented, allowing Sojourner’s electronics box to stay warm on minimal battery power.'
      },
      {
        title: 'Still Circling My Quiet Best Friend?',
        joke: 'My last command was: "If you don’t hear from the Pathfinder lander for 5 days, drive around it in circles calling for help!" When Pathfinder’s battery froze, I probably kept circling until winter!',
        scienceTruth: 'Sojourner’s contingency fault-protection program instructed it to drive toward the lander petals and circle the station while attempting UHF link recovery.'
      }
    ]
  },
  'spirit-opportunity': {
    missionId: 'spirit-opportunity',
    hardwareSpeakerName: 'OPPORTUNITY’S PANCAM MAST',
    hardwarePartBadge: 'Marathon Rover • 45.16 km Off-World Record',
    introCatchphrase: '90 days? Ha! Try 15 YEARS and a full 26.2-mile marathon across Mars!',
    facts: [
      {
        title: 'Saved By Lucky Martian "Dust Devils"!',
        joke: 'Engineers thought red Martian dust would cover our solar panels and kill us in 90 days. Instead, gusts of wind and mini tornadoes ("dust devils") kept sweeping our solar wings clean like a free car wash!',
        scienceTruth: 'Seasonal wind-cleaning events repeatedly restored Spirit and Opportunity’s solar array output from 30% back up to over 80%.'
      },
      {
        title: 'Spirit Discovered Water By Dragging a Broken Wheel Backward!',
        joke: 'When Spirit’s right-front wheel broke in 2006, JPL drove her backward for years! That dragging wheel scraped a trench in the dirt revealing 90% pure white silica—proof of ancient hot springs!',
        scienceTruth: 'Opals and amorphous silica only form in the presence of hot, steamy water—one of the strongest clues that Mars once hosted habitable geothermal vents.'
      },
      {
        title: 'Space "Blueberries" Made of Iron!',
        joke: 'At Eagle Crater, Opportunity found millions of tiny round gray pebbles scattered like blueberries in a muffin! Don’t bite one—they’re solid hematite iron formed in ancient Martian groundwater!',
        scienceTruth: 'Hematite spherules (concretions) precipitate inside water-soaked sedimentary rock layers over millions of years.'
      }
    ]
  },
  'viking-landers': {
    missionId: 'viking-landers',
    hardwareSpeakerName: 'VIKING’S ROBOTIC SOIL SCOOP',
    hardwarePartBadge: '3-Meter Extendable Arm • Chryse Planitia, 1976',
    introCatchphrase: 'Digging in the Martian dirt since 1976! Want a scoop of super-reactive red soil?',
    facts: [
      {
        title: 'We Baked Martian Dirt at 500°C Looking for Aliens!',
        joke: 'Inside my belly was a miniature biology lab the size of a toaster! When I poured warm "chicken soup" nutrients onto Martian dirt, it fizzed with gas like Pop Rocks candy—because the soil is super chemically reactive!',
        scienceTruth: 'Viking’s Labeled Release experiment detected oxygen and carbon dioxide release caused by reactive perchlorate salts and superoxides in Martian soil.'
      },
      {
        title: 'Why Did the First Color Photo of Mars Have a Blue Sky?!',
        joke: 'When my first color picture arrived on TV in 1976, technicians adjusted the colors until the Martian sky looked blue like Earth! The next day they calibrated it against my color chart and gasped: the sky is actually butterscotch pink!',
        scienceTruth: 'Fine iron-oxide dust suspended in Mars’s thin CO2 atmosphere scatters red/orange light, making daytime skies salmon-butterscotch and sunsets blue.'
      },
      {
        title: 'Unplugged by a Single Typo After 6 Years!',
        joke: 'Viking 1 had enough nuclear RTG power to last into the 1990s! Why did I go quiet in 1982? An update command meant to recharge my batteries accidentally overwrote my antenna-pointing software!',
        scienceTruth: 'On November 13, 1982, a battery maintenance command accidentally overwrote the high-gain antenna pointing table in Viking 1’s memory.'
      }
    ]
  },
  'phoenix-insight': {
    missionId: 'phoenix-insight',
    hardwareSpeakerName: 'INSIGHT’S COPPER MARSQUAKE DOME',
    hardwarePartBadge: 'SEIS Seismometer • Heard 1,319 Marsquakes!',
    introCatchphrase: 'Shhh! Keep your space boots quiet! I’m listening to the heartbeat of Mars!',
    facts: [
      {
        title: 'So Sensitive I Can Measure a Vibration Smaller Than an Atom!',
        joke: 'My SEIS seismometer inside this shiny copper dome is so sensitive that when a cloud floats overhead and cools the ground by a fraction of a degree, I can feel the ground tilt!',
        scienceTruth: 'SEIS measured ground displacements smaller than the diameter of a single hydrogen atom, detecting 1,319 marsquakes and meteoroid impacts.'
      },
      {
        title: 'Phoenix Dug a Trench and Watched White Ice Vanish!',
        joke: 'Up near the Martian North Pole, my sister lander Phoenix scraped away 5 centimeters of dirt and uncovered bright white chunks! Four days later, the chunks vanished into thin air—proving they were pure water ice!',
        scienceTruth: 'In Mars’s low-pressure atmosphere, exposed water ice sublimates (turns directly from solid ice to water vapor) when warmed by sunlight.'
      },
      {
        title: 'Why Did InSight Pour Martian Dirt on Its Own Head?!',
        joke: 'When dust covered InSight’s solar panels in 2021, JPL used its robotic scoop to dump a pile of coarse sand right onto the windy deck! The heavy sand grains bounced across the panels and knocked off the sticky dust!',
        scienceTruth: 'That clever "saltation" sand-cleaning trick gained ~30 watt-hours of energy per sol and extended InSight’s mission by over a year!'
      }
    ]
  },
  'ingenuity-helicopter': {
    missionId: 'ingenuity-helicopter',
    hardwareSpeakerName: 'GINNY THE MARS HELICOPTER',
    hardwarePartBadge: '1.8 kg Rotorcraft • 72 Flights in Jezero Crater!',
    introCatchphrase: 'Whirrrr! Not bad for a 4-pound tissue box running on a smartphone processor, right?!',
    facts: [
      {
        title: 'Flying on Mars Is Like Flying at 100,000 Feet on Earth!',
        joke: 'Mars’s air is 99% thinner than Earth’s! To lift my 1.8-kilogram body, my carbon-fiber blades had to spin at 2,537 RPM—five times faster than a giant helicopter on Earth!',
        scienceTruth: 'Surface atmospheric pressure on Mars is only ~6 millibars (less than 1% of Earth’s sea-level pressure), requiring ultra-light foam-filled carbon blades.'
      },
      {
        title: 'I Carry a Piece of the 1903 Wright Brothers Airplane!',
        joke: 'Taped to a cable right underneath my solar panel is a postage-stamp-sized swatch of unbleached muslin fabric from the original 1903 Wright Flyer that flew at Kitty Hawk!',
        scienceTruth: 'Carrying fabric from the first powered aircraft on Earth aboard the first powered aircraft on another planet connected 118 years of aviation history.'
      },
      {
        title: '5 Flights Planned... 72 Flights Flown!',
        joke: 'Engineers only expected me to survive 5 test hops in 30 days. Instead, I flew 72 times over nearly 3 YEARS, scouting ahead for my big buddy Perseverance until a sand ripple clipped my blade tip!',
        scienceTruth: 'Even with a broken rotor tip in January 2024, Ingenuity’s solar panel and computer stayed alive as a stationary weather and telemetry station in Valinor Hills.'
      }
    ]
  },
  'dawn-spacecraft': {
    missionId: 'dawn-spacecraft',
    hardwareSpeakerName: 'DAWN’S BLUE XENON ION THRUSTER',
    hardwarePartBadge: 'NSTAR Ion Engine • Orbiting Dwarf Planet Ceres',
    introCatchphrase: 'Fzzzzzt! Why burn exploding rocket fuel when you can shoot a sci-fi beam of glowing blue xenon atoms?!',
    facts: [
      {
        title: 'My Engine Pushes Fixes With the Force of One Sheet of Paper!',
        joke: 'If you held your hand in front of my ion thruster, it would push as gently as a single piece of notebook paper resting on your palm! Yet because I fired it non-stop for 5.9 years in space, I hit 40,000 km/h!',
        scienceTruth: 'Dawn’s three xenon ion thrusters accelerated ions to 140,000 km/h using solar electricity, achieving 10 times the fuel efficiency of chemical rockets.'
      },
      {
        title: 'The Only Spaceship to Orbit TWO Different Worlds!',
        joke: 'Every other probe in history only orbited one target beyond Earth. Thanks to my ion engines, I orbited giant asteroid Vesta for a year, packed my bags, and flew to dwarf planet Ceres!',
        scienceTruth: 'Dawn achieved a total post-launch velocity change (delta-v) of 11.5 km/s—more than any spacecraft in history using onboard propulsion.'
      },
      {
        title: 'The Mystery of Ceres’s Glowing Alien Salt Volcanoes!',
        joke: 'When I approached Ceres, we saw blindingly bright white spots inside Occator Crater! Turns out Ceres has a salty underground slush ocean that burped sodium carbonate (washing soda!) onto the surface!',
        scienceTruth: 'Cerealia Facula and Vinalia Faculae are bright salt deposits left behind by briny cryovolcanic water rising from deep inside Ceres.'
      }
    ]
  },
  'near-shoemaker': {
    missionId: 'near-shoemaker',
    hardwareSpeakerName: 'NEAR’S ASTEROID BELLY BUMPER',
    hardwarePartBadge: 'Asteroid 433 Eros • First Asteroid Touchdown!',
    introCatchphrase: 'Boing! I wasn’t even built with landing legs, and I STILL landed on a tumbling space potato!',
    facts: [
      {
        title: 'How Do You Land on a 34-Kilometer Space Potato With Zero Legs?!',
        joke: 'I was built by Johns Hopkins APL as an orbiter—no wheels, no legs, no airbags! On Valentine’s Day 2001, engineers fired my thrusters 5 times and set me down on the edge of my solar panels at walking speed!',
        scienceTruth: 'Because Asteroid 433 Eros has gravity 1,000 times weaker than Earth’s, NEAR Shoemaker touched down at just 1.5 to 1.8 m/s (4 mph) without breaking!'
      },
      {
        title: 'On Asteroid Eros, You Could Jump Over a 30-Story Building!',
        joke: 'Gravity on Eros is so tiny that a 100-pound middle schooler weighs less than a single AA battery! If you threw a baseball hard enough, it would literally fly into orbit and hit you in the back of the head!',
        scienceTruth: 'Escape velocity on Asteroid 433 Eros is only about 10 meters per second (22 mph).'
      },
      {
        title: 'Sniffing Asteroid Rocks for 2 Weeks From the Ground!',
        joke: 'After my surprise touchdown, my nose (the X-Ray/Gamma-Ray Spectrometer) was pressed just 4 inches from the asteroid dirt! I spent 14 bonus days analyzing primitive solar system rocks!',
        scienceTruth: 'Confirmed that Eros is an unmelted cosmic fragment from the dawn of the Solar System 4.5 billion years ago.'
      }
    ]
  },
  'kepler-telescope': {
    missionId: 'kepler-telescope',
    hardwareSpeakerName: 'KEPLER’S 95-MEGAPIXEL EYE',
    hardwarePartBadge: 'Photometer Barrel • Found 2,662+ Alien Worlds!',
    introCatchphrase: 'Don’t blink! I stared at 150,000 stars for four years straight without closing my eye once!',
    facts: [
      {
        title: 'Spotting a Flea Crawling Across a Car Headlight From 100 Miles Away!',
        joke: 'How do you find an Earth-sized planet around a distant star? You watch for a tiny dip in brightness—1 part in 10,000! That’s like noticing a single flea walk across a car headlight at night from another state!',
        scienceTruth: 'Kepler’s 42 CCD sensors measured stellar brightness changes down to 20 parts per million.'
      },
      {
        title: 'Fixed in Deep Space Using Sunlight as a Steering Wheel!',
        joke: 'When two of my four spinning reaction wheels broke in 2013, people thought I was toast! Then engineers realized they could balance my hexagonal body against the gentle push of SUNLIGHT like a sailboat!',
        scienceTruth: 'Solar photon radiation pressure balanced Kepler along its roll axis during the K2 mission, enabling 500+ more exoplanet discoveries.'
      },
      {
        title: 'Newsflash: Our Galaxy Has More Planets Than Stars!',
        joke: 'Before me, textbooks weren’t sure if rocky planets were rare flukes. After I found over 2,600 worlds, astronomers calculated there are BILLIONS of Earth-sized planets in the Milky Way alone!',
        scienceTruth: 'Kepler proved that on average every star in our galaxy hosts at least one planet, and ~20–50% of sunlike stars host rocky habitable-zone worlds.'
      }
    ]
  },
  'voyager-1': {
    missionId: 'voyager-1',
    hardwareSpeakerName: 'VOYAGER 1’S GOLDEN RECORD DJ',
    hardwarePartBadge: '166 AU from Earth • Interstellar Space (Ophiuchus)',
    introCatchphrase: 'Greetings from 24.8 BILLION kilometers away! Hope aliens like Chuck Berry and humpback whale songs!',
    facts: [
      {
        title: 'Your Phone Has 3,000,000 Times More Memory Than Me!',
        joke: 'I am the farthest human-made object in the universe, and my three 1970s computers have only 69.6 KILOBYTES of memory total! That’s smaller than a single emoji sticker pack on your phone!',
        scienceTruth: 'Voyager 1’s Flight Data System, Attitude Control, and Command computers use plated-wire memory designed in the early 1970s.'
      },
      {
        title: 'Fixed From 24 Billion Kilometers Away Without a Wrench!',
        joke: 'In late 2023, one of my 46-year-old memory chips broke and I started babbling gibberish! JPL engineers couldn’t fly out with a screwdriver, so they chopped my code into tiny puzzle pieces and hid it in other memory slots!',
        scienceTruth: 'Even with a 45-hour round-trip radio delay, JPL engineers successfully uploaded a memory-relocation patch in April 2024 that restored full interstellar science!'
      },
      {
        title: 'I Caught Jupiter’s Moon Io Burping 300-Kilometer Volcanoes!',
        joke: 'Before I flew past Jupiter in 1979, scientists thought all moons were dead, frozen ice balls like Earth’s Moon. Then navigator Linda Morabito spotted a giant umbrella plume erupting off Io’s edge—alien volcanoes!',
        scienceTruth: 'Jupiter’s immense tidal gravity squeezes Io like a rubber ball, melting its interior and making it the most volcanically active body in the Solar System.'
      },
      {
        title: 'A 1-Billion-Year Golden Mixtape With a Uranium Clock!',
        joke: 'My 12-inch gold record has greetings in 55 languages (including "Hello from the children of Planet Earth!"), plus a tiny dot of pure Uranium-238 on the cover so aliens can tell how many millions of years I’ve been flying!',
        scienceTruth: 'Because interstellar space is nearly empty, the Voyager Golden Record will remain intact and readable for over 1,000,000,000 years.'
      }
    ]
  }
};

// Enrich each mission's quiz with its cross-verified official NASA questions while keeping all existing questions intact
for (const mission of SENTINEL_MISSIONS) {
  const dossier = NASA_OFFICIAL_DOSSIERS[mission.id];
  if (dossier && dossier.extraQuizQuestions.length > 0) {
    const existingIds = new Set(mission.quiz.map((q) => q.id));
    for (const extraQ of dossier.extraQuizQuestions) {
      if (!existingIds.has(extraQ.id)) {
        mission.quiz.push(extraQ);
      }
    }
  }
}


