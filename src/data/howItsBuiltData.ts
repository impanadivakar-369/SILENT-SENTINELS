export type ComponentIconType =
  | 'antenna'
  | 'power'
  | 'camera'
  | 'propulsion'
  | 'chassis'
  | 'computer'
  | 'sensor'
  | 'shield'
  | 'wheels'
  | 'rotor'
  | 'code'
  | 'layout'
  | 'box3d'
  | 'database'
  | 'sparkles';

export interface BuiltComponentCard {
  id: string;
  name: string;
  partCategory: string;
  icon: ComponentIconType;
  oneLineExplanation: string;
}

export interface SpacecraftBuiltBlueprint {
  missionId: string;
  missionName: string;
  manufacturerSummary: string;
  referenceDiagramAsset?: string;
  components: BuiltComponentCard[];
}

export const SPACECRAFT_HARDWARE_COMPONENTS: Record<string, SpacecraftBuiltBlueprint> = {
  'pioneer-10': {
    missionId: 'pioneer-10',
    missionName: 'Pioneer 10',
    manufacturerSummary: 'Built by TRW Inc. in Redondo Beach, California for NASA Ames Research Center',
    components: [
      {
        id: 'p10-dish',
        name: 'High-Gain Dish Antenna',
        partCategory: '2.74m Aluminum Parabola',
        icon: 'antenna',
        oneLineExplanation: 'Beamed faint radio signals across billions of kilometers back to giant dishes on Earth.'
      },
      {
        id: 'p10-rtg',
        name: 'SNAP-19 Nuclear RTGs',
        partCategory: '4 Plutonium-238 Generators',
        icon: 'power',
        oneLineExplanation: 'Turned radioactive heat into electricity out where sunlight is too weak for solar panels.'
      },
      {
        id: 'p10-mag',
        name: 'Helium Vector Magnetometer',
        partCategory: '6.5m Folding Boom Sensor',
        icon: 'sensor',
        oneLineExplanation: 'Measured Jupiter’s giant magnetic bubble while held far away from the spacecraft’s own metal.'
      },
      {
        id: 'p10-bus',
        name: 'Hexagonal Avionics Bus',
        partCategory: 'Gold-Foil Thermal Compartment',
        icon: 'chassis',
        oneLineExplanation: 'Kept the electronics warm and protected inside a six-sided aluminum box wrapped in gold blankets.'
      },
      {
        id: 'p10-ipp',
        name: 'Imaging Photopolarimeter',
        partCategory: 'Spin-Scan Optical Telescope',
        icon: 'camera',
        oneLineExplanation: 'Used the spacecraft’s 4.8 RPM spin to scan strips of red and blue light into close-up photos of Jupiter.'
      },
      {
        id: 'p10-thrusters',
        name: 'Hydrazine Thruster Clusters',
        partCategory: '6姿态 Attitude Rocket Nozzles',
        icon: 'propulsion',
        oneLineExplanation: 'Fired tiny puffs of gas to keep the main dish pointed squarely at Earth.'
      }
    ]
  },

  'pioneer-11': {
    missionId: 'pioneer-11',
    missionName: 'Pioneer 11',
    manufacturerSummary: 'Built by TRW Inc. for NASA Ames Research Center',
    components: [
      {
        id: 'p11-dish',
        name: 'S/X-Band Dish Antenna',
        partCategory: '2.74m Parabolic Reflector',
        icon: 'antenna',
        oneLineExplanation: 'Relayed the first close-up data and photos ever transmitted from Saturn’s ring system.'
      },
      {
        id: 'p11-rtg',
        name: 'Twin-Boom RTG Power Pods',
        partCategory: 'Plutonium Thermal Generators',
        icon: 'power',
        oneLineExplanation: 'Generated 155 watts of steady nuclear power during the 6.5-year trek to Saturn.'
      },
      {
        id: 'p11-fluxgate',
        name: 'High-Field Fluxgate Magnetometer',
        partCategory: 'Intense Magnetic Sensor',
        icon: 'sensor',
        oneLineExplanation: 'Added specifically to Pioneer 11 to measure fierce magnetic fields right above Jupiter’s clouds.'
      },
      {
        id: 'p11-meteoroid',
        name: 'Meteoroid Detector Panels',
        partCategory: 'Pressurized Argon Cells',
        icon: 'shield',
        oneLineExplanation: 'Counted microscopic dust hits as the spacecraft dared to dive beneath Saturn’s outer rings.'
      },
      {
        id: 'p11-plaque',
        name: 'Gold-Anodized Cosmic Plaque',
        partCategory: '6061 Aluminum Pictogram',
        icon: 'chassis',
        oneLineExplanation: 'Carries an engraved map of Earth and human figures bolted to the antenna struts for eternity.'
      },
      {
        id: 'p11-star',
        name: 'Canopus Star Tracker',
        partCategory: 'Optical Navigation Eye',
        icon: 'camera',
        oneLineExplanation: 'Locked onto the bright star Canopus so the spinning spacecraft always knew which way was up.'
      }
    ]
  },

  'apollo-lm': {
    missionId: 'apollo-lm',
    missionName: 'Apollo Lunar Module Descent Stages',
    manufacturerSummary: 'Built by Grumman Aircraft Engineering Corp. in Bethpage, New York',
    components: [
      {
        id: 'lm-engine',
        name: 'Descent Propulsion Engine',
        partCategory: 'Throttleable Rocket Bell',
        icon: 'propulsion',
        oneLineExplanation: 'Allowed astronauts to throttle thrust up and down to hover and touch down gently on the Moon.'
      },
      {
        id: 'lm-legs',
        name: 'Honeycomb Landing Legs',
        partCategory: '4 Crushable Aluminum Struts',
        icon: 'wheels',
        oneLineExplanation: 'Absorbed the shock of lunar touchdown using crushable aluminum honeycomb cartridges inside each leg.'
      },
      {
        id: 'lm-kapton',
        name: 'Gold Kapton Thermal Blankets',
        partCategory: 'Multi-Layer Mylar & Foil',
        icon: 'shield',
        oneLineExplanation: 'Reflected blistering 120°C lunar daylight and trapped warmth during freezing -130°C lunar nights.'
      },
      {
        id: 'lm-mesa',
        name: 'MESA Equipment Bay & TV Camera',
        partCategory: 'Pull-Cord Fold-Out Drawer',
        icon: 'camera',
        oneLineExplanation: 'Swung open from Quad IV so a Westinghouse TV camera could broadcast humanity’s first steps live.'
      },
      {
        id: 'lm-chassis',
        name: 'Octagonal Aluminum Frame',
        partCategory: '4-Quadrant Structural Base',
        icon: 'chassis',
        oneLineExplanation: 'Served as both the landing gear and the launchpad when the upper cabin blasted back into orbit.'
      },
      {
        id: 'lm-batteries',
        name: 'Silver-Zinc Descent Batteries',
        partCategory: '4× 400-Amp-Hour Cells',
        icon: 'power',
        oneLineExplanation: 'Delivered reliable DC electricity without needing heavy fuel cells during the Moon landing.'
      }
    ]
  },

  'lunar-rovers': {
    missionId: 'lunar-rovers',
    missionName: 'Apollo Lunar Roving Vehicles (LRVs)',
    manufacturerSummary: 'Built by Boeing & General Motors Delco Electronics',
    components: [
      {
        id: 'lrv-wheels',
        name: 'Zinc-Coated Piano-Wire Wheels',
        partCategory: '4 Woven Mesh Tires + Chevrons',
        icon: 'wheels',
        oneLineExplanation: 'Used woven steel wire instead of air-filled rubber so tires could never pop or freeze in lunar vacuum.'
      },
      {
        id: 'lrv-motors',
        name: 'In-Hub Electric Drive Motors',
        partCategory: '4× 0.25 HP Harmonic Drives',
        icon: 'propulsion',
        oneLineExplanation: 'Gave each wheel its own independent electric motor and steering to climb 25-degree crater slopes.'
      },
      {
        id: 'lrv-hinge',
        name: 'Fold-Up Aluminum Chassis',
        partCategory: '3-Piece Hinged Frame',
        icon: 'chassis',
        oneLineExplanation: 'Folded up like a lawn chair inside the Lunar Module and sprung open on the Moon with pull-cables.'
      },
      {
        id: 'lrv-antenna',
        name: 'Umbrella High-Gain Antenna',
        partCategory: 'Collapsible Wire-Mesh Dish',
        icon: 'antenna',
        oneLineExplanation: 'Opened like a shiny metal umbrella to beam live color TV directly from the Moon to Earth.'
      },
      {
        id: 'lrv-nav',
        name: 'Directional Gyroscope & Odometer',
        partCategory: 'Dead-Reckoning Computer',
        icon: 'computer',
        oneLineExplanation: 'Tracked every turn and wheel rotation on a Moon with no magnetic north pole so astronauts never got lost.'
      },
      {
        id: 'lrv-batteries',
        name: 'Silver-Zinc 36V Batteries',
        partCategory: 'Twin Non-Rechargeable Packs',
        icon: 'power',
        oneLineExplanation: 'Powered up to 92 kilometers of lunar driving along with the TV camera and radio relay.'
      }
    ]
  },

  'alsep-packages': {
    missionId: 'alsep-packages',
    missionName: 'Apollo ALSEP & Laser Retroreflectors',
    manufacturerSummary: 'Built by Bendix Aerospace & Perkin-Elmer for NASA',
    components: [
      {
        id: 'alsep-rtg',
        name: 'SNAP-27 Nuclear Generator',
        partCategory: '70-Watt Plutonium RTG',
        icon: 'power',
        oneLineExplanation: 'Kept all the Moon science instruments running day and night for 8 straight years until 1977.'
      },
      {
        id: 'alsep-lrrr',
        name: 'Corner-Cube Silica Prisms',
        partCategory: '100–300 Fused Quartz Mirrors',
        icon: 'sensor',
        oneLineExplanation: 'Bounces Earth laser pulses straight back without needing a single battery—still working today!'
      },
      {
        id: 'alsep-seismo',
        name: 'Passive Seismic Experiment',
        partCategory: 'Gold-Shrouded Moonquake Sensor',
        icon: 'shield',
        oneLineExplanation: 'Detected over 12,000 moonquakes and meteorite impacts under a shiny thermal tent.'
      },
      {
        id: 'alsep-central',
        name: 'Central Telemetry Station',
        partCategory: 'Ribbon-Cable Hub & Transmitter',
        icon: 'antenna',
        oneLineExplanation: 'Collected data from every wired experiment on the lunar soil and radioed it back to Houston.'
      },
      {
        id: 'alsep-heat',
        name: 'Subsurface Heat-Flow Probes',
        partCategory: 'Deep Borehole Thermometers',
        icon: 'computer',
        oneLineExplanation: 'Measured how much internal warmth still escapes from deep inside the Moon’s core.'
      },
      {
        id: 'alsep-chassis',
        name: 'Sunshield Thermal Canopy',
        partCategory: 'Reflective Top Plate',
        icon: 'chassis',
        oneLineExplanation: 'Protected sensitive circuit boards from 270-degree temperature swings between lunar noon and midnight.'
      }
    ]
  },

  'surveyor-landers': {
    missionId: 'surveyor-landers',
    missionName: 'Surveyor 1–7 Lunar Landers',
    manufacturerSummary: 'Built by Hughes Aircraft Company in El Segundo, California for JPL',
    components: [
      {
        id: 'surv-cam',
        name: 'Rotating Mirror TV Camera',
        partCategory: '600-Line Vidicon Periscope',
        icon: 'camera',
        oneLineExplanation: 'Tilted a motorized mirror at the top of a tower to snap over 87,000 sharp panoramic Moon photos.'
      },
      {
        id: 'surv-scoop',
        name: 'Accordion Soil Mechanics Scoop',
        partCategory: 'Pantograph Digging Claw',
        icon: 'sensor',
        oneLineExplanation: 'Dug trenches in the lunar dirt to prove Apollo astronauts wouldn’t sink into quicksand.'
      },
      {
        id: 'surv-legs',
        name: 'Tripod Shock-Absorber Legs',
        partCategory: '3 Crushable Footpads',
        icon: 'wheels',
        oneLineExplanation: 'Cushioned the first soft landings on the Moon using aircraft-style hydraulic struts and honeycomb pads.'
      },
      {
        id: 'surv-radar',
        name: 'RADVS Doppler Landing Radar',
        partCategory: 'Autonomous Speed & Altitude Radar',
        icon: 'antenna',
        oneLineExplanation: 'Measured speed and distance to the ground automatically so thrusters could touch down at 3 mph.'
      },
      {
        id: 'surv-alpha',
        name: 'Alpha-Scattering Box',
        partCategory: 'Curium-242 Chemical Analyzer',
        icon: 'computer',
        oneLineExplanation: 'Lowered onto the lunar soil on a nylon string to identify volcanic basalt chemistry for the first time.'
      },
      {
        id: 'surv-solar',
        name: 'Mast-Mounted Solar Panel',
        partCategory: '85-Watt Silicon Cell Array',
        icon: 'power',
        oneLineExplanation: 'Tilted toward the Sun atop the central mast to recharge the lander’s silver-zinc battery.'
      }
    ]
  },

  'sojourner-rover': {
    missionId: 'sojourner-rover',
    missionName: 'Sojourner Rover & Mars Pathfinder',
    manufacturerSummary: 'Built by NASA Jet Propulsion Laboratory (JPL) in Pasadena, California',
    components: [
      {
        id: 'soj-bogie',
        name: 'Rocker-Bogie 6-Wheel Suspension',
        partCategory: 'Springless Pivoting Aluminum Frame',
        icon: 'wheels',
        oneLineExplanation: 'Allowed the microwave-sized rover to climb rocks twice as tall as its wheels without tipping over.'
      },
      {
        id: 'soj-solar',
        name: 'Gallium-Arsenide Solar Deck',
        partCategory: '0.22 m² Flat Top Panel',
        icon: 'power',
        oneLineExplanation: 'Generated 16 watts of sunlight power on clear Martian afternoons to run the motors and brain.'
      },
      {
        id: 'soj-apxs',
        name: 'APXS Rock Nose Sensor',
        partCategory: 'Alpha Proton X-Ray Spectrometer',
        icon: 'sensor',
        oneLineExplanation: 'Pressed right against Martian boulders like Barnacle Bill to read what elements they were made of.'
      },
      {
        id: 'soj-cpu',
        name: 'Intel 80C85 Radiation-Hard CPU',
        partCategory: '2 MHz Microprocessor + 512 KB RAM',
        icon: 'computer',
        oneLineExplanation: 'Ran all navigation and hazard avoidance using less memory than a single smartphone photo.'
      },
      {
        id: 'soj-aero',
        name: 'Silica Aerogel WEB Insulation',
        partCategory: '99.8% Air Ultralight Foam',
        icon: 'shield',
        oneLineExplanation: 'Trapped heat inside the Warm Electronics Box using the lightest solid insulation material on Earth.'
      },
      {
        id: 'soj-laser',
        name: '5-Stripe Laser & Stereo Cameras',
        partCategory: 'Front Hazard Detection Eyes',
        icon: 'camera',
        oneLineExplanation: 'Projected red laser lines onto the ground ahead to spot steep rocks and ditches automatically.'
      }
    ]
  },

  'spirit-opportunity': {
    missionId: 'spirit-opportunity',
    missionName: 'Spirit & Opportunity (MER Rovers)',
    manufacturerSummary: 'Built by NASA Jet Propulsion Laboratory (JPL)',
    components: [
      {
        id: 'mer-pancam',
        name: 'Pancam Sundial Mast',
        partCategory: '1.5m Stereo Color Camera Mast',
        icon: 'camera',
        oneLineExplanation: 'Stood at human eye level to take 360-degree true-color panoramas of Martian craters and hills.'
      },
      {
        id: 'mer-wings',
        name: 'Gull-Wing Solar Arrays',
        partCategory: 'Fold-Out Triple-Junction Panels',
        icon: 'power',
        oneLineExplanation: 'Spread out like bird wings to catch Martian sunlight—and got lucky dust-devil wind cleanings!'
      },
      {
        id: 'mer-rat',
        name: 'RAT Rock Abrasion Tool',
        partCategory: 'Diamond-Toothed Robotic Grinder',
        icon: 'sensor',
        oneLineExplanation: 'Ground away rusty outer rock rinds on a 5-jointed arm to reveal ancient water-soaked minerals.'
      },
      {
        id: 'mer-wheels',
        name: '6 Cleated Aluminum Wheels',
        partCategory: '25cm Spiral-Flex Aluminum Hubs',
        icon: 'wheels',
        oneLineExplanation: 'Carried Opportunity a record 45.16 kilometers—more than a full marathon on another planet!'
      },
      {
        id: 'mer-web',
        name: 'Warm Electronics Box & RHU Heaters',
        partCategory: 'Gold-Walled Insulated Core',
        icon: 'shield',
        oneLineExplanation: 'Used 8 pellet heaters and aerogel walls to protect batteries through -100°C Martian winters.'
      },
      {
        id: 'mer-uhf',
        name: 'UHF & High-Gain Dish Antennas',
        partCategory: 'Orbiter Relay + Direct-to-Earth',
        icon: 'antenna',
        oneLineExplanation: 'Beamed over 340,000 raw images up to Mars orbiters and directly back to NASA’s Deep Space Network.'
      }
    ]
  },

  'viking-landers': {
    missionId: 'viking-landers',
    missionName: 'Viking 1 & 2 Mars Landers',
    manufacturerSummary: 'Built by Martin Marietta Aerospace in Denver, Colorado for NASA Langley',
    components: [
      {
        id: 'vik-rtg',
        name: 'Twin SNAP-19 Nuclear RTGs',
        partCategory: 'Wind-Shielded Plutonium Generators',
        icon: 'power',
        oneLineExplanation: 'Delivered 70 watts of continuous electricity and waste heat for over 6 years on the Martian plains.'
      },
      {
        id: 'vik-arm',
        name: 'Roll-Out Steel Ribbon Collector Arm',
        partCategory: '3-Meter Extendable Soil Boom',
        icon: 'sensor',
        oneLineExplanation: 'Unrolled like a stiff steel tape measure to scoop Martian dirt and feed the onboard laboratories.'
      },
      {
        id: 'vik-bio',
        name: 'Miniature Biology Lab',
        partCategory: '3 Automated Life-Test Chambers',
        icon: 'computer',
        oneLineExplanation: 'Packed 40,000 tiny parts into a 1-cubic-foot box to test Martian soil for signs of alien microbes.'
      },
      {
        id: 'vik-cams',
        name: 'Twin Facsimile Nodding Cameras',
        partCategory: 'Cylindrical Scanning Turrets',
        icon: 'camera',
        oneLineExplanation: 'Scanned one vertical line at a time to capture humanity’s very first clear photos from the surface of Mars.'
      },
      {
        id: 'vik-engines',
        name: '18-Nozzle Showerhead Engines',
        partCategory: 'Hydrazine Terminal Thrusters',
        icon: 'propulsion',
        oneLineExplanation: 'Spread exhaust plumes across 18 tiny nozzles so the rocket blast wouldn’t scorch or dig up the landing site.'
      },
      {
        id: 'vik-dish',
        name: 'S-Band Steerable Dish Antenna',
        partCategory: '76cm Parabolic Transmitter',
        icon: 'antenna',
        oneLineExplanation: 'Sent daily Martian weather reports and panoramas directly to Earth for more than 2,200 sols.'
      }
    ]
  },

  'phoenix-insight': {
    missionId: 'phoenix-insight',
    missionName: 'Phoenix & InSight Mars Landers',
    manufacturerSummary: 'Built by Lockheed Martin Space in Littleton, Colorado for NASA JPL',
    components: [
      {
        id: 'pi-fans',
        name: 'Ultraflex Fan Solar Arrays',
        partCategory: 'Twin Circular Pleated Wings',
        icon: 'power',
        oneLineExplanation: 'Unfolded like round hand fans after touchdown to power arctic ice digging and deep-interior listening.'
      },
      {
        id: 'pi-seis',
        name: 'SEIS Dome Marsquake Seismometer',
        partCategory: 'Vacuum-Sealed Pendulum Sensor',
        icon: 'sensor',
        oneLineExplanation: 'Placed directly on the Martian ground by a robotic claw to detect 1,319 marsquakes and measure Mars’s liquid core.'
      },
      {
        id: 'pi-arm',
        name: 'Titanium Robotic Scoop & Grapple',
        partCategory: '2.35m Articulated Backhoe Arm',
        icon: 'chassis',
        oneLineExplanation: 'Scraped down to rock-hard water-ice just inches below the northern Martian soil.'
      },
      {
        id: 'pi-tega',
        name: 'TEGA Miniature Soil Ovens',
        partCategory: '8 Single-Use 1,000°C Furnaces',
        icon: 'computer',
        oneLineExplanation: 'Baked scooped Martian frost until it steamed, proving chemically that real water-ice exists on Mars.'
      },
      {
        id: 'pi-cam',
        name: 'Robotic Arm & Mast Cameras',
        partCategory: 'Surface Stereo & Scoop Imagers',
        icon: 'camera',
        oneLineExplanation: 'Watched white chunks of underground water-ice sublimate over four days in the Dodo-Goldilocks trench.'
      },
      {
        id: 'pi-thrusters',
        name: 'Pulsed Hydrazine Landing Engines',
        partCategory: '12 Descent Retro-Thrusters',
        icon: 'propulsion',
        oneLineExplanation: 'Fired rapid computer-controlled pulses to land gently on three legs without using airbags.'
      }
    ]
  },

  'ingenuity-helicopter': {
    missionId: 'ingenuity-helicopter',
    missionName: 'Ingenuity Mars Helicopter (Ginny)',
    manufacturerSummary: 'Built by NASA JPL & AeroVironment (1.8 kg Ultralight Rotorcraft)',
    referenceDiagramAsset: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.13_PM__1__55d2c4dc.jpeg',
    components: [
      {
        id: 'ing-blades',
        name: 'Blades',
        partCategory: '4 Carbon-Fiber Foam-Core Rotors',
        icon: 'rotor',
        oneLineExplanation: 'Two counter-rotating 1.2-meter blades spun at 2,537 RPM to generate lift in Mars’s 1%-thick atmosphere.'
      },
      {
        id: 'ing-antennas',
        name: 'Antennas',
        partCategory: '900 MHz ZigBee Radio Monopole',
        icon: 'antenna',
        oneLineExplanation: 'Communicated flight commands and photos up to a kilometer across Jezero Crater to the Perseverance rover.'
      },
      {
        id: 'ing-solar',
        name: 'Solar Panel',
        partCategory: 'Top-Mounted High-Efficiency Cells',
        icon: 'power',
        oneLineExplanation: 'Sat right above the rotor mast to recharge the batteries between flights—and keep the cabin warm at night.'
      },
      {
        id: 'ing-batteries',
        name: 'Batteries',
        partCategory: '6 Sony Lithium-Ion Cells (35–40 Wh)',
        icon: 'power',
        oneLineExplanation: 'Used two-thirds of their charge just running overnight heaters in -90°C cold and one-third for 90-second flights.'
      },
      {
        id: 'ing-avionics',
        name: 'Avionics & Body',
        partCategory: 'Tissue-Box Fuselage + Snapdragon 801',
        icon: 'computer',
        oneLineExplanation: 'Adjusted rotor pitch 500 times per second autonomously because Earth radio signals take up to 20 minutes to arrive.'
      },
      {
        id: 'ing-legs',
        name: 'Legs',
        partCategory: '4 Ultralight Carbon-Composite Tubes',
        icon: 'wheels',
        oneLineExplanation: 'Weighed only a few grams each while giving flexible shock absorption across 72 landings on rocky Martian sand.'
      },
      {
        id: 'ing-sensors',
        name: 'Sensors & Cameras',
        partCategory: 'Laser Altimeter + Navcam + 13 MP RTE',
        icon: 'camera',
        oneLineExplanation: 'Tracked rocks and sand ripples 30 times a second below the belly to fly without GPS or a compass.'
      }
    ]
  },

  'dawn-spacecraft': {
    missionId: 'dawn-spacecraft',
    missionName: 'Dawn Asteroid Belt Orbiter',
    manufacturerSummary: 'Built by Orbital Sciences Corporation in Dulles, Virginia for NASA JPL',
    components: [
      {
        id: 'dawn-ion',
        name: '3 Xenon Ion Thrusters (NSTAR)',
        partCategory: 'Electrostatic Blue-Glow Engines',
        icon: 'propulsion',
        oneLineExplanation: 'Accelerated xenon ions with electricity to 10× the efficiency of chemical rockets—letting Dawn orbit two worlds!'
      },
      {
        id: 'dawn-solar',
        name: '19.7-Meter Dutch-Built Solar Wings',
        partCategory: 'Twin Giant Triple-Junction Arrays',
        icon: 'power',
        oneLineExplanation: 'Generated 10,300 watts near Earth and 1,300 watts out in the cold Asteroid Belt to feed the ion engines.'
      },
      {
        id: 'dawn-cam',
        name: 'German Framing Cameras (FC1 & FC2)',
        partCategory: 'Dual Redundant Optical Imagers',
        icon: 'camera',
        oneLineExplanation: 'Mapped Vesta’s giant Rheasilvia mountain and Ceres’s bright salt-covered craters in sharp detail.'
      },
      {
        id: 'dawn-grand',
        name: 'GRaND Gamma-Ray & Neutron Detector',
        partCategory: 'Subsurface Element Analyzer',
        icon: 'sensor',
        oneLineExplanation: 'Measured cosmic-ray neutrons bouncing off Ceres to prove water-ice hides just beneath its dusty crust.'
      },
      {
        id: 'dawn-dish',
        name: '1.52m High-Gain Dish Antenna',
        partCategory: 'Deep-Space X-Band Transceiver',
        icon: 'antenna',
        oneLineExplanation: 'Transmitted over 100,000 asteroid belt photographs and spectrograms back to Earth.'
      },
      {
        id: 'dawn-tank',
        name: 'Composite Xenon Propellant Tank',
        partCategory: '425 kg Supercritical Xenon Vessel',
        icon: 'chassis',
        oneLineExplanation: 'Held enough xenon gas at launch to fire the ion thrusters for more than 50,000 cumulative hours.'
      }
    ]
  },

  'near-shoemaker': {
    missionId: 'near-shoemaker',
    missionName: 'NEAR Shoemaker Asteroid Lander',
    manufacturerSummary: 'Built by Johns Hopkins Applied Physics Laboratory (APL) in Laurel, Maryland',
    components: [
      {
        id: 'near-solar',
        name: '4 Fixed Gallium-Arsenide Solar Panels',
        partCategory: 'Cruciform Windmill Wings',
        icon: 'power',
        oneLineExplanation: 'Survived an unplanned soft touchdown on asteroid Eros in 2001 because they had no fragile moving hinges.'
      },
      {
        id: 'near-xgrs',
        name: 'X-Ray / Gamma-Ray Spectrometer',
        partCategory: 'Belly-Mounted Element Sensor',
        icon: 'sensor',
        oneLineExplanation: 'Ended up resting just inches from Eros’s dusty boulders, capturing ultra-precise asteroid chemistry for 16 days.'
      },
      {
        id: 'near-msi',
        name: 'Multi-Spectral Imager (MSI)',
        partCategory: '7-Filter CCD Asteroid Camera',
        icon: 'camera',
        oneLineExplanation: 'Snapped 160,000 photos of Eros, including the final image from just 120 meters above the surface.'
      },
      {
        id: 'near-nlr',
        name: 'Laser Rangefinder (NLR)',
        partCategory: 'Nd:YAG Laser Altimeter',
        icon: 'computer',
        oneLineExplanation: 'Fired 11 million laser pulses to build a 3D topographic shape model of the peanut-shaped asteroid.'
      },
      {
        id: 'near-dish',
        name: '1.5-Meter Fixed X-Band Dish',
        partCategory: 'Top-Deck Parabolic Antenna',
        icon: 'antenna',
        oneLineExplanation: 'Kept whispering telemetry from the surface of Eros even after the orbiter turned into a lander.'
      },
      {
        id: 'near-thrusters',
        name: 'Bipropellant & Hydrazine Thrusters',
        partCategory: '450 N Main + 11 Attitude Jets',
        icon: 'propulsion',
        oneLineExplanation: 'Executed five gentle braking burns to slow the spacecraft to walking speed (1.5 m/s) at touchdown.'
      }
    ]
  },

  'kepler-telescope': {
    missionId: 'kepler-telescope',
    missionName: 'Kepler Space Telescope',
    manufacturerSummary: 'Built by Ball Aerospace & Technologies Corp. in Boulder, Colorado',
    components: [
      {
        id: 'kep-ccd',
        name: '95-Megapixel Focal Plane Array',
        partCategory: '42 Curved Sapphire CCD Sensors',
        icon: 'camera',
        oneLineExplanation: 'Stared at 150,000 stars at once to spot tiny brightness dips when distant exoplanets crossed in front.'
      },
      {
        id: 'kep-mirror',
        name: '1.4-Meter Schmidt Primary Mirror',
        partCategory: 'Ultra-Low-Expansion Glass Honeycombs',
        icon: 'sensor',
        oneLineExplanation: 'Collected starlight with a hollowed-out glass mirror weighing just 14% of a solid glass disk.'
      },
      {
        id: 'kep-wheels',
        name: '4 Reaction Pointing Wheels',
        partCategory: 'High-Precision Gyroscopic Flywheels',
        icon: 'rotor',
        oneLineExplanation: 'Held the telescope’s aim steady to a millionth of a degree—and when two failed, sunlight pressure helped steer K2!'
      },
      {
        id: 'kep-solar',
        name: 'Sunshield & 2.8m Solar Array',
        partCategory: '1,100-Watt Thermal & Power Wall',
        icon: 'power',
        oneLineExplanation: 'Generated 1.1 kilowatts of electricity while shading the cold telescope barrel from direct sunlight.'
      },
      {
        id: 'kep-barrel',
        name: 'Graphite-Cyanate Photometer Barrel',
        partCategory: 'Cylindrical Light Baffle Tube',
        icon: 'chassis',
        oneLineExplanation: 'Blocked stray light from the Sun and Earth so the camera could detect a 0.01% planetary shadow.'
      },
      {
        id: 'kep-thrusters',
        name: '8 Hydrazine Momentum Thrusters',
        partCategory: '12 kg Fuel Tank Attitude Jets',
        icon: 'propulsion',
        oneLineExplanation: 'Desaturated the reaction wheels and kept Kepler working for 9.5 years until the very last drop of fuel ran dry.'
      }
    ]
  },

  'voyager-1': {
    missionId: 'voyager-1',
    missionName: 'Voyager 1 Interstellar Probe',
    manufacturerSummary: 'Built by NASA Jet Propulsion Laboratory (JPL) in Pasadena, California',
    components: [
      {
        id: 'v1-dish',
        name: '3.66-Meter High-Gain Dish Antenna',
        partCategory: 'White Honeycomb Parabolic Dish',
        icon: 'antenna',
        oneLineExplanation: 'Whispers a 22-watt radio signal across 24+ billion kilometers of interstellar space back to Earth.'
      },
      {
        id: 'v1-rtg',
        name: '3 MHW-RTG Nuclear Generators',
        partCategory: 'Plutonium-238 Boom Assembly',
        icon: 'power',
        oneLineExplanation: 'Mounted on a lower boom to power Humanity’s farthest ambassador for nearly half a century.'
      },
      {
        id: 'v1-record',
        name: 'The Voyager Golden Record',
        partCategory: '12-Inch Gold-Plated Copper LP',
        icon: 'chassis',
        oneLineExplanation: 'Carries 115 images, greetings in 55 languages, and music of Earth with a stylus and instructions for 1 billion years.'
      },
      {
        id: 'v1-iss',
        name: 'Scan Platform & ISS Cameras',
        partCategory: 'Narrow & Wide-Angle Vidicon Eyes',
        icon: 'camera',
        oneLineExplanation: 'Captured Io’s volcanoes, Titan’s orange haze, and the famous 1990 "Pale Blue Dot" portrait of Earth.'
      },
      {
        id: 'v1-mag',
        name: '13-Meter Astromast Magnetometer Boom',
        partCategory: 'Pop-Out Fiberglass Truss',
        icon: 'sensor',
        oneLineExplanation: 'Sprang out from a 0.7-meter canister after launch to measure magnetic fields in interstellar space.'
      },
      {
        id: 'v1-computers',
        name: '3 Redundant 1970s Flight Computers',
        partCategory: 'CCS, FDS & AACS (69.6 KB Total Memory)',
        icon: 'computer',
        oneLineExplanation: 'Still executes remote software patches uploaded from 22.5 light-hours away using 69 kilobytes of memory.'
      }
    ]
  }
};

export const WEBSITE_TECH_STACK_COMPONENTS: BuiltComponentCard[] = [
  {
    id: 'tech-react',
    name: 'React 19 & Component Architecture',
    partCategory: 'Interactive UI Engine',
    icon: 'code',
    oneLineExplanation: 'Powers instantaneous switching between 15 spacecraft dossiers, interactive quizzes, and live modals without reloading.'
  },
  {
    id: 'tech-ts',
    name: 'TypeScript 7 Strict Typing',
    partCategory: 'Verified Telemetry Data Layer',
    icon: 'computer',
    oneLineExplanation: 'Guarantees every spacecraft coordinate, NSSDCA catalog ID, quiz question, and badge record stays 100% accurate.'
  },
  {
    id: 'tech-tailwind',
    name: 'Tailwind CSS 4 Design System',
    partCategory: 'Responsive Glass-Morphism Styling',
    icon: 'layout',
    oneLineExplanation: 'Creates the deep-space dark theme, responsive cards, smooth hover animations, and high-contrast typography.'
  },
  {
    id: 'tech-3d',
    name: 'HTML5 Canvas 3D & Interactive SVG',
    partCategory: '360° Spacecraft & Celestial Globes',
    icon: 'box3d',
    oneLineExplanation: 'Renders the 360° rotatable spacecraft models, numbered hardware hotspots, 3D Moon/Mars globes, and moving galaxy.'
  },
  {
    id: 'tech-nasa',
    name: 'NASA NSSDCA & Image Archives',
    partCategory: 'Authentic Historical Photography',
    icon: 'camera',
    oneLineExplanation: 'Sources verified mission telemetry and authentic NASA/JPL spacecraft photographs with official archive citations.'
  },
  {
    id: 'tech-icons',
    name: 'Lucide Vector Iconography & Custom SVGs',
    partCategory: 'Bespoke Mission Patch Emblems',
    icon: 'sparkles',
    oneLineExplanation: 'Combines crisp scientific UI icons with 16 custom-crafted SVG space mission patches for the Explorer Badge Locker.'
  },
  {
    id: 'tech-vite',
    name: 'Vite 8 & Persistent Explorer Storage',
    partCategory: 'Fast Bundler & Cloud/Local Sync',
    icon: 'database',
    oneLineExplanation: 'Delivers sub-second asset loading while saving your unlocked badges, decoded clues, and explorer rank.'
  }
];
