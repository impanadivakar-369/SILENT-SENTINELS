export interface PhotoCropBounds {
  topPct: number;
  bottomPct: number;
  leftPct?: number;
  rightPct?: number;
}

export interface AuthenticSpacecraftPhoto {
  id: string;
  missionId: string;
  title: string;
  imageUrl: string;
  fallbackUrl?: string;
  cropBounds?: PhotoCropBounds;
  caption: string;
  captureType: 'Onboard Camera' | 'Astronaut EVA Photo' | 'Companion Spacecraft' | 'Pre-Launch / Cleanroom' | 'Launch & Mission Ops';
  dateTaken: string;
  credit: string;
  sourceArchiveUrl: string;
  nasaArchiveId: string;
}

export interface MissionPhotographyRecord {
  missionId: string;
  missionName: string;
  cardPhoto: AuthenticSpacecraftPhoto;
  galleryPhotos: AuthenticSpacecraftPhoto[];
}

export const MISSION_PHOTOGRAPHY_ARCHIVE: Record<string, MissionPhotographyRecord> = {
  'pioneer-10': {
    missionId: 'pioneer-10',
    missionName: 'Pioneer 10',
    cardPhoto: {
      id: 'p10-card',
      missionId: 'pioneer-10',
      title: 'Pioneer 10 Spacecraft Hardware & Gold Plaque at Cape Kennedy',
      imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.10_PM_54aeef5a.jpeg',
      fallbackUrl: 'https://images-assets.nasa.gov/image/ARC-1972-AC72-2135/ARC-1972-AC72-2135~medium.jpg',
      cropBounds: { topPct: 4.0, bottomPct: 62.5, leftPct: 1.5, rightPct: 98.5 },
      caption:
        'Authentic pre-launch photograph of the Pioneer 10 spacecraft at Cape Kennedy showing its gold-anodized aluminum plaque mounted to the antenna support struts.',
      captureType: 'Pre-Launch / Cleanroom',
      dateTaken: 'February 1972',
      credit: 'NASA Ames Research Center / TRW',
      sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1972-AC72-2135',
      nasaArchiveId: 'ARC-1972-AC72-2135'
    },
    galleryPhotos: [
      {
        id: 'p10-gal-1',
        missionId: 'pioneer-10',
        title: 'Jupiter’s Moon Ganymede Captured by Pioneer 10',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.10_PM__1__233efaa4.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/ARC-1973-AC73-9279/ARC-1973-AC73-9279~medium.jpg',
        cropBounds: { topPct: 2.5, bottomPct: 69.0, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'NASA’s Pioneer 10 snapped this close-up photograph of Jupiter’s largest moon, Ganymede, during its historic flyby in December 1973—the first spacecraft ever to obtain close-up images of Ganymede.',
        captureType: 'Onboard Camera',
        dateTaken: 'December 1973',
        credit: 'NASA Ames Research Center (Imaging Photopolarimeter)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1973-AC73-9279',
        nasaArchiveId: 'ARC-1973-AC73-9279'
      },
      {
        id: 'p10-gal-2',
        missionId: 'pioneer-10',
        title: 'Pioneer 10 Gold-Anodized Plaque Mounted on Antenna Struts',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.10_PM_54aeef5a.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/ARC-1972-AC72-1338/ARC-1972-AC72-1338~medium.jpg',
        cropBounds: { topPct: 2.8, bottomPct: 64.8, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Close-up photograph of the 6-by-9-inch gold-anodized aluminum plaque bolted to Pioneer 10’s antenna support struts, identifying its time and place of origin for any future spacefarers.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: 'February 1972',
        credit: 'NASA Ames Research Center',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1972-AC72-1338',
        nasaArchiveId: 'ARC-1972-AC72-1338'
      },
      {
        id: 'p10-gal-3',
        missionId: 'pioneer-10',
        title: 'Jupiter Cloud Bands & Crescent Photographed by Pioneer 10',
        imageUrl: 'https://images-assets.nasa.gov/image/ARC-1973-AC73-9253/ARC-1973-AC73-9253~medium.jpg',
        caption:
          'Direct onboard photograph of Jupiter taken by Pioneer 10’s Imaging Photopolarimeter (IPP) from a range of 2,584,000 kilometers during its approach to the giant planet.',
        captureType: 'Onboard Camera',
        dateTaken: 'December 1973',
        credit: 'NASA Ames / University of Arizona',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1973-AC73-9253',
        nasaArchiveId: 'ARC-1973-AC73-9253'
      },
      {
        id: 'p10-gal-4',
        missionId: 'pioneer-10',
        title: 'Pioneer 10 Final Assembly at TRW Systems Group',
        imageUrl: 'https://images-assets.nasa.gov/image/ARC-1973-AC73-9019/ARC-1973-AC73-9019~medium.jpg',
        caption:
          'Engineers at TRW Systems Group in Redondo Beach, California, inspect the actual Pioneer 10 flight spacecraft and its 2.74-meter parabolic dish antenna during final assembly.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '1971',
        credit: 'NASA Ames / TRW Systems Group',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1973-AC73-9019',
        nasaArchiveId: 'ARC-1973-AC73-9019'
      },
      {
        id: 'p10-gal-5',
        missionId: 'pioneer-10',
        title: 'Pioneer 10 Delivered to Cape Kennedy for Launch Processing',
        imageUrl: 'https://images-assets.nasa.gov/image/ARC-1972-AC72-2134/ARC-1972-AC72-2134~medium.jpg',
        caption:
          'Technicians prepare the Pioneer 10 (Pioneer-F) spacecraft in the Cape Kennedy cleanroom prior to encapsulation atop the three-stage Atlas-Centaur launch vehicle.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: 'February 1972',
        credit: 'NASA / Kennedy Space Center',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1972-AC72-2134',
        nasaArchiveId: 'ARC-1972-AC72-2134'
      }
    ]
  },

  'pioneer-11': {
    missionId: 'pioneer-11',
    missionName: 'Pioneer 11',
    cardPhoto: {
      id: 'p11-card',
      missionId: 'pioneer-11',
      title: 'Pioneer 11 (Pioneer-G) Atlas-Centaur Launch from Cape Canaveral',
      imageUrl: 'https://images-assets.nasa.gov/image/9139575/9139575~medium.jpg',
      caption:
        'Authentic NASA photograph of the Atlas-Centaur rocket lifting off from Cape Canaveral Launch Complex 36B carrying the Pioneer 11 (Pioneer-G) spacecraft toward Jupiter and Saturn.',
      captureType: 'Launch & Mission Ops',
      dateTaken: 'April 6, 1973',
      credit: 'NASA / Kennedy Space Center',
      sourceArchiveUrl: 'https://images.nasa.gov/details/9139575',
      nasaArchiveId: '9139575'
    },
    galleryPhotos: [
      {
        id: 'p11-gal-1',
        missionId: 'pioneer-11',
        title: 'Pioneer 11 (Pioneer-G) Atlas-Centaur Liftoff',
        imageUrl: 'https://images-assets.nasa.gov/image/9139575/9139575~medium.jpg',
        caption:
          'The Atlas-Centaur launch vehicle blasts off with Pioneer 11 on April 6, 1973, beginning its 6.5-year journey past Jupiter to execute humanity’s first flyby of ringed Saturn.',
        captureType: 'Launch & Mission Ops',
        dateTaken: 'April 6, 1973',
        credit: 'NASA / Kennedy Space Center',
        sourceArchiveUrl: 'https://images.nasa.gov/details/9139575',
        nasaArchiveId: '9139575'
      },
      {
        id: 'p11-gal-2',
        missionId: 'pioneer-11',
        title: 'Pioneer F/G Spacecraft Structural & Thermal Test Model',
        imageUrl: 'https://images-assets.nasa.gov/image/ARC-1971-AC71-2696/ARC-1971-AC71-2696~medium.jpg',
        caption:
          'Full-scale Pioneer F/G spacecraft undergoing pre-flight testing, showing the high-gain parabolic dish antenna and the deployed SNAP-19 Radioisotope Thermoelectric Generator (RTG) truss.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '1971',
        credit: 'NASA Ames Research Center',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1971-AC71-2696',
        nasaArchiveId: 'ARC-1971-AC71-2696'
      },
      {
        id: 'p11-gal-3',
        missionId: 'pioneer-11',
        title: 'Pioneer Saturn Mission Control Center (PMOC) at NASA Ames',
        imageUrl: 'https://images-assets.nasa.gov/image/ARC-1979-AC79-9114-57/ARC-1979-AC79-9114-57~medium.jpg',
        caption:
          'Flight controllers in the Pioneer Mission Operations Center (PMOC) at NASA Ames Research Center monitor real-time telemetry during Pioneer 11’s historic flyby of Saturn in September 1979.',
        captureType: 'Launch & Mission Ops',
        dateTaken: 'September 1, 1979',
        credit: 'NASA Ames Research Center',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1979-AC79-9114-57',
        nasaArchiveId: 'ARC-1979-AC79-9114-57'
      },
      {
        id: 'p11-gal-4',
        missionId: 'pioneer-11',
        title: 'Dr. James Van Allen & Dr. John Simpson at Pioneer 11 Briefing',
        imageUrl: 'https://images-assets.nasa.gov/image/ARC-1974-A74-9030-1/ARC-1974-A74-9030-1~medium.jpg',
        caption:
          'Principal Investigators Dr. John A. Simpson and Dr. James Van Allen examine radiation belt and magnetosphere data transmitted by Pioneer 11 during its close 42,828-km slingshot past Jupiter.',
        captureType: 'Launch & Mission Ops',
        dateTaken: 'December 1974',
        credit: 'NASA Ames Research Center',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1974-A74-9030-1',
        nasaArchiveId: 'ARC-1974-A74-9030-1'
      }
    ]
  },

  'apollo-lm': {
    missionId: 'apollo-lm',
    missionName: 'Apollo Lunar Modules',
    cardPhoto: {
      id: 'lm-card',
      missionId: 'apollo-lm',
      title: 'Apollo 11 Astronaut Buzz Aldrin & Eagle Lunar Module at Tranquillity Base',
      imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.26_PM__1__797f8f7a.jpeg',
      fallbackUrl: 'https://images-assets.nasa.gov/image/as11-40-5868/as11-40-5868~medium.jpg',
      cropBounds: { topPct: 5.5, bottomPct: 70.0, leftPct: 4.8, rightPct: 95.2 },
      caption:
        'Astronaut Buzz Aldrin stands on the Moon facing the deployed U.S. flag alongside the gold-foiled Eagle Lunar Module at Tranquillity Base during Apollo 11 in July 1969.',
      captureType: 'Astronaut EVA Photo',
      dateTaken: 'July 20, 1969',
      credit: 'NASA / Neil A. Armstrong (AS11-40-5874)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/as11-40-5868',
      nasaArchiveId: 'AS11-40-5874'
    },
    galleryPhotos: [
      {
        id: 'lm-gal-1',
        missionId: 'apollo-lm',
        title: 'Commander Neil Armstrong Working at the Eagle Lunar Module Equipment Bay',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.27_PM_4e24be1f.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/6900992/6900992~medium.jpg',
        cropBounds: { topPct: 6.6, bottomPct: 62.4, leftPct: 4.8, rightPct: 95.2 },
        caption:
          'Apollo 11 Commander Neil Armstrong works at the Modular Equipment Storage Assembly (MESA) on the Eagle Lunar Module Descent Stage—one of the few photographs showing Armstrong on the Moon.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'July 20, 1969',
        credit: 'NASA / Buzz Aldrin (AS11-40-5886)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/6900992',
        nasaArchiveId: 'AS11-40-5886'
      },
      {
        id: 'lm-gal-2',
        missionId: 'apollo-lm',
        title: 'Buzz Aldrin Climbs Down the Eagle Lunar Module Ladder',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.27_PM__1__418cf987.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/as11-40-5868/as11-40-5868~medium.jpg',
        cropBounds: { topPct: 6.8, bottomPct: 64.9, leftPct: 4.8, rightPct: 95.2 },
        caption:
          'Apollo 11 Lunar Module Pilot Buzz Aldrin descends the nine-rung ladder on the front landing gear strut of the Eagle Descent Stage to step onto the Sea of Tranquillity.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'July 20, 1969',
        credit: 'NASA / Neil A. Armstrong (AS11-40-5868)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as11-40-5868',
        nasaArchiveId: 'AS11-40-5868'
      },
      {
        id: 'lm-gal-3',
        missionId: 'apollo-lm',
        title: 'Buzz Aldrin Salutes the U.S. Flag Beside the Eagle Lunar Module',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.26_PM__1__797f8f7a.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/KSC-as11-40-5964/KSC-as11-40-5964~medium.jpg',
        cropBounds: { topPct: 5.5, bottomPct: 70.0, leftPct: 4.8, rightPct: 95.2 },
        caption:
          'Astronaut Buzz Aldrin stands on the lunar surface facing the U.S. flag with the Eagle Lunar Module on the left and bootprints preserved in the airless lunar regolith.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'July 20, 1969',
        credit: 'NASA (AS11-40-5874)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-as11-40-5964',
        nasaArchiveId: 'AS11-40-5874'
      },
      {
        id: 'lm-gal-4',
        missionId: 'apollo-lm',
        title: 'Apollo 11 Saturn V Liftoff from Kennedy Space Center',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.26_PM__2__bc910e44.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/6900972/6900972~medium.jpg',
        cropBounds: { topPct: 5.5, bottomPct: 72.0, leftPct: 4.8, rightPct: 96.5 },
        caption:
          'The Saturn V rocket carrying Apollo 11 and the Eagle Lunar Module lifts off from Launch Complex 39A at Kennedy Space Center, Florida, on July 16, 1969.',
        captureType: 'Launch & Mission Ops',
        dateTaken: 'July 16, 1969',
        credit: 'NASA / Kennedy Space Center',
        sourceArchiveUrl: 'https://images.nasa.gov/details/6900972',
        nasaArchiveId: '6900972'
      },
      {
        id: 'lm-gal-5',
        missionId: 'apollo-lm',
        title: 'Lunar Reconnaissance Orbiter (LRO) Oblique View of Tycho Crater Peak',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.25_PM__3__9a04986c.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001873/GSFC_20171208_Archive_e001873~small.jpg',
        cropBounds: { topPct: 5.8, bottomPct: 59.3, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Captured on June 10, 2011, by NASA’s Lunar Reconnaissance Orbiter (LRO)—the same orbiter that photographs all six Apollo descent stages on the Moon today—showing the steep central peak of Tycho Crater.',
        captureType: 'Companion Spacecraft',
        dateTaken: 'June 10, 2011',
        credit: 'NASA / GSFC / Arizona State University (LROC)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/GSFC_20171208_Archive_e001873',
        nasaArchiveId: 'GSFC_20171208_Archive_e001873'
      }
    ]
  },

  'lunar-rovers': {
    missionId: 'lunar-rovers',
    missionName: 'Lunar Roving Vehicles',
    cardPhoto: {
      id: 'lrv-card',
      missionId: 'lunar-rovers',
      title: 'Apollo 17 Lunar Roving Vehicle (LRV-3) at Taurus-Littrow Valley',
      imageUrl: 'https://images-assets.nasa.gov/image/as17-137-20979/as17-137-20979~medium.jpg',
      caption:
        'Authentic close-up photograph of the Apollo 17 Lunar Roving Vehicle (LRV-3) parked on the lunar surface at Taurus-Littrow, showing its high-gain umbrella antenna, RCA color TV camera, and wire-mesh wheels.',
      captureType: 'Astronaut EVA Photo',
      dateTaken: 'December 12, 1972',
      credit: 'NASA / Apollo 17 Crew (AS17-137-20979)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/as17-137-20979',
      nasaArchiveId: 'AS17-137-20979'
    },
    galleryPhotos: [
      {
        id: 'lrv-gal-1',
        missionId: 'lunar-rovers',
        title: 'Geologist-Astronaut Harrison Schmitt with Apollo 17 Lunar Rover & Challenger LM',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.29_PM__1__93c17b72.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/as17-137-20979/as17-137-20979~medium.jpg',
        cropBounds: { topPct: 2.5, bottomPct: 57.0, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Apollo 17 Lunar Module Pilot Harrison H. Schmitt stands beside the U.S. flag with the Lunar Roving Vehicle (LRV-3) and Lunar Module Challenger behind him—the first astronaut interviewed for the Apollo Lunar Surface Journal.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'December 1972',
        credit: 'NASA / Eugene Cernan (AS17-134-20384)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as17-137-20979',
        nasaArchiveId: 'AS17-134-20384'
      },
      {
        id: 'lrv-gal-2',
        missionId: 'lunar-rovers',
        title: 'Close-Up of Apollo 17 Lunar Roving Vehicle on the Moon',
        imageUrl: 'https://images-assets.nasa.gov/image/as17-137-20979/as17-137-20979~medium.jpg',
        caption:
          'Apollo 17’s LRV-3 resting on the dusty regolith of Taurus-Littrow Valley, where it drove a record 35.9 kilometers (22.3 miles) across three moonwalks.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'December 12, 1972',
        credit: 'NASA / Apollo 17 (AS17-137-20979)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as17-137-20979',
        nasaArchiveId: 'AS17-137-20979'
      },
      {
        id: 'lrv-gal-3',
        missionId: 'lunar-rovers',
        title: 'Astronaut James Irwin Working at Apollo 15’s LRV-1 near Hadley Rille',
        imageUrl: 'https://images-assets.nasa.gov/image/as15-86-11603/as15-86-11603~medium.jpg',
        caption:
          'Apollo 15 Lunar Module Pilot James B. Irwin works beside humanity’s first Moon car (LRV-1) with Mount Hadley rising in the background on July 31, 1971.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'July 31, 1971',
        credit: 'NASA / David R. Scott (AS15-86-11603)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as15-86-11603',
        nasaArchiveId: 'AS15-86-11603'
      },
      {
        id: 'lrv-gal-4',
        missionId: 'lunar-rovers',
        title: 'Apollo 16 Lunar Roving Vehicle (LRV-2) in the Descartes Highlands',
        imageUrl: 'https://images-assets.nasa.gov/image/as16-114-18433/as16-114-18433~medium.jpg',
        caption:
          'Apollo 16’s LRV-2 photographed on the rugged Descartes Highlands, where Commander John Young set the official lunar land-speed record of 18 km/h (11.2 mph).',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'April 1972',
        credit: 'NASA / Apollo 16 Crew (AS16-114-18433)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as16-114-18433',
        nasaArchiveId: 'AS16-114-18433'
      }
    ]
  },

  'alsep-packages': {
    missionId: 'alsep-packages',
    missionName: 'ALSEP Scientific Packages',
    cardPhoto: {
      id: 'alsep-card',
      missionId: 'alsep-packages',
      title: 'Deployed ALSEP Central Station on the Moon (Apollo 14)',
      imageUrl: 'https://images-assets.nasa.gov/image/as14-67-09379/as14-67-09379~medium.jpg',
      caption:
        'Close-up Hasselblad photograph of the Apollo Lunar Surface Experiments Package (ALSEP) Central Station deployed on the Moon at Fra Mauro during Apollo 14 on February 5, 1971.',
      captureType: 'Astronaut EVA Photo',
      dateTaken: 'February 5, 1971',
      credit: 'NASA / Apollo 14 Crew (AS14-67-09379)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/as14-67-09379',
      nasaArchiveId: 'AS14-67-09379'
    },
    galleryPhotos: [
      {
        id: 'alsep-gal-1',
        missionId: 'alsep-packages',
        title: 'Apollo 14 ALSEP Central Station & S-Band Telemetry Antenna',
        imageUrl: 'https://images-assets.nasa.gov/image/as14-67-09379/as14-67-09379~medium.jpg',
        caption:
          'The ALSEP Central Station on the lunar surface at Fra Mauro, showing its thermal control louvers and vertical S-band radio antenna that transmitted moonquake data to Earth until 1977.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'February 5, 1971',
        credit: 'NASA / Edgar D. Mitchell (AS14-67-09379)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as14-67-09379',
        nasaArchiveId: 'AS14-67-09379'
      },
      {
        id: 'alsep-gal-2',
        missionId: 'alsep-packages',
        title: 'Astronaut Alan Bean Deploying ALSEP on Apollo 12',
        imageUrl: 'https://images-assets.nasa.gov/image/as12-47-6919/as12-47-6919~medium.jpg',
        caption:
          'Apollo 12 Lunar Module Pilot Alan L. Bean deploys components of the first nuclear-powered ALSEP geophysical station on the Ocean of Storms on November 19, 1969.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'November 19, 1969',
        credit: 'NASA / Charles "Pete" Conrad (AS12-47-6919)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as12-47-6919',
        nasaArchiveId: 'AS12-47-6919'
      },
      {
        id: 'alsep-gal-3',
        missionId: 'alsep-packages',
        title: 'SNAP-27 Plutonium-238 RTG & ALSEP Instruments on Apollo 14',
        imageUrl: 'https://images-assets.nasa.gov/image/as14-67-09361/as14-67-09361~medium.jpg',
        caption:
          'View of the finned SNAP-27 Radioisotope Thermoelectric Generator (RTG) and ALSEP Central Station deployed on the Moon, providing ~70 watts of continuous power through 14-day lunar nights.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'February 5, 1971',
        credit: 'NASA / Apollo 14 Crew (AS14-67-09361)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as14-67-09361',
        nasaArchiveId: 'AS14-67-09361'
      },
      {
        id: 'alsep-gal-4',
        missionId: 'alsep-packages',
        title: 'Alan Bean Unloading the SNAP-27 RTG Fuel Element from Apollo 12 LM',
        imageUrl: 'https://images-assets.nasa.gov/image/as12-46-6790/as12-46-6790~medium.jpg',
        caption:
          'Astronaut Alan Bean uses a specialized handling tool at Quadrant II of the Apollo 12 Lunar Module Intrepid to remove the glowing-hot Plutonium-238 fuel capsule for the ALSEP generator.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'November 19, 1969',
        credit: 'NASA / Apollo 12 Crew (AS12-46-6790)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as12-46-6790',
        nasaArchiveId: 'AS12-46-6790'
      }
    ]
  },

  'surveyor-landers': {
    missionId: 'surveyor-landers',
    missionName: 'Surveyor Landers',
    cardPhoto: {
      id: 'surv-card',
      missionId: 'surveyor-landers',
      title: 'NASA Surveyor Lunar Lander Spacecraft',
      imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.25_PM_e0d31fb1.jpeg',
      fallbackUrl: 'https://images-assets.nasa.gov/image/as12-48-7121/as12-48-7121~medium.jpg',
      cropBounds: { topPct: 3.5, bottomPct: 78.0, leftPct: 0.5, rightPct: 99.5 },
      caption:
        'Authentic NASA photograph of the triangular aluminum-tube Surveyor lunar lander showing its three shock-absorbing crushable footpads, planar array antenna, solar panel mast, and survey television camera.',
      captureType: 'Pre-Launch / Cleanroom',
      dateTaken: '1966',
      credit: 'NASA / JPL / Hughes Aircraft Company',
      sourceArchiveUrl: 'https://images.nasa.gov/details/as12-48-7121',
      nasaArchiveId: 'SURVEYOR-1-HUGHES'
    },
    galleryPhotos: [
      {
        id: 'surv-gal-1',
        missionId: 'surveyor-landers',
        title: 'NASA’s Surveyor Lunar Lander in Pre-Flight Inspection',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.25_PM_e0d31fb1.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/as12-48-7121/as12-48-7121~medium.jpg',
        cropBounds: { topPct: 3.5, bottomPct: 78.0, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Full view of NASA’s Surveyor spacecraft built by Hughes Aircraft Company and managed by JPL—the spacecraft series that achieved America’s first true soft landing on the Moon on June 2, 1966.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '1966',
        credit: 'NASA / JPL',
        sourceArchiveUrl: 'https://science.nasa.gov/mission/surveyor-1/',
        nasaArchiveId: 'SURVEYOR-1'
      },
      {
        id: 'surv-gal-2',
        missionId: 'surveyor-landers',
        title: 'Surveyor 1’s Own Shadow on the Moon (Onboard TV Camera)',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA02976/PIA02976~medium.jpg',
        caption:
          'Captured directly by Surveyor 1’s onboard television camera in June 1966, showing the lander’s own shadow stretching across the lunar surface of Oceanus Procellarum toward the horizon.',
        captureType: 'Onboard Camera',
        dateTaken: 'June 1966',
        credit: 'NASA / JPL (Surveyor 1 Television Camera)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA02976',
        nasaArchiveId: 'PIA02976'
      },
      {
        id: 'surv-gal-3',
        missionId: 'surveyor-landers',
        title: 'Surveyor 3 Resting Inside Its Lunar Crater (Photographed by Apollo 12)',
        imageUrl: 'https://images-assets.nasa.gov/image/as12-48-7121/as12-48-7121~medium.jpg',
        caption:
          'Hasselblad photograph taken by the Apollo 12 crew on November 20, 1969, showing the unmanned Surveyor 3 spacecraft resting inside its crater on the Ocean of Storms 2.5 years after landing.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'November 20, 1969',
        credit: 'NASA / Apollo 12 Crew (AS12-48-7121)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as12-48-7121',
        nasaArchiveId: 'AS12-48-7121'
      },
      {
        id: 'surv-gal-4',
        missionId: 'surveyor-landers',
        title: 'Astronaut Alan Bean Inspects Surveyor 3 with Apollo 12 LM on the Horizon',
        imageUrl: 'https://images-assets.nasa.gov/image/AS12-48-7134/AS12-48-7134~medium.jpg',
        caption:
          'Astronaut Alan L. Bean examines Surveyor 3’s television camera and soil scoop while the Apollo 12 Lunar Module Intrepid sits just 163 meters away on the crater rim—the only human visit to a robotic probe on another world.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'November 20, 1969',
        credit: 'NASA / Charles "Pete" Conrad (AS12-48-7134)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/AS12-48-7134',
        nasaArchiveId: 'AS12-48-7134'
      },
      {
        id: 'surv-gal-5',
        missionId: 'surveyor-landers',
        title: 'Close-Up of Surveyor 3 Footpad & Soil Scoop Trench on the Moon',
        imageUrl: 'https://images-assets.nasa.gov/image/as12-48-7110/as12-48-7110~medium.jpg',
        caption:
          'Detailed close-up of Surveyor 3’s crushable landing footpad and surface sampler scoop resting in the lunar soil of Oceanus Procellarum.',
        captureType: 'Astronaut EVA Photo',
        dateTaken: 'November 20, 1969',
        credit: 'NASA / Apollo 12 Crew (AS12-48-7110)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/as12-48-7110',
        nasaArchiveId: 'AS12-48-7110'
      }
    ]
  },

  'sojourner-rover': {
    missionId: 'sojourner-rover',
    missionName: 'Sojourner Rover (Mars Pathfinder)',
    cardPhoto: {
      id: 'soj-card',
      missionId: 'sojourner-rover',
      title: 'Sojourner Rover Deployed on the Martian Surface (Sol 2)',
      imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.23_PM__2__25ef5c3f.jpeg',
      fallbackUrl: 'https://images-assets.nasa.gov/image/PIA00621/PIA00621~small.jpg',
      cropBounds: { topPct: 4.2, bottomPct: 49.8, leftPct: 0.5, rightPct: 99.5 },
      caption:
        'Eight-image mosaic acquired on Sol 2 (July 5, 1997) by the Imager for Mars Pathfinder (IMP), showing the newly deployed 6-wheeled Sojourner rover sitting on the Martian soil of Ares Valles.',
      captureType: 'Onboard Camera',
      dateTaken: 'July 5, 1997 (Sol 2)',
      credit: 'NASA / JPL-Caltech',
      sourceArchiveUrl: 'https://science.nasa.gov/mission/mars-pathfinder/',
      nasaArchiveId: 'MPF-SOL2-MOSAIC'
    },
    galleryPhotos: [
      {
        id: 'soj-gal-1',
        missionId: 'sojourner-rover',
        title: 'Sojourner Rover Perched on Mars Pathfinder Petal Before Rollout',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.23_PM__1__669d8fb3.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA00621/PIA00621~small.jpg',
        cropBounds: { topPct: 2.0, bottomPct: 67.4, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Sojourner sits atop the solar-panel petal of the Carl Sagan Memorial Station flanked by deflated landing airbags shortly after touching down in Ares Valles on July 4, 1997.',
        captureType: 'Onboard Camera',
        dateTaken: 'July 4, 1997 (Sol 1)',
        credit: 'NASA / JPL-Caltech (PIA00621)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA00621',
        nasaArchiveId: 'PIA00621'
      },
      {
        id: 'soj-gal-2',
        missionId: 'sojourner-rover',
        title: 'Sol 2 "Insurance Panorama" Showing Newly Deployed Sojourner on Mars',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.23_PM__2__25ef5c3f.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA00621/PIA00621~small.jpg',
        cropBounds: { topPct: 4.2, bottomPct: 49.8, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Acquired during the late afternoon on Sol 2, this eight-image mosaic shows the newly deployed Sojourner rover on the Martian surface right beside its rollout ramp and deflated airbags.',
        captureType: 'Onboard Camera',
        dateTaken: 'July 5, 1997 (Sol 2)',
        credit: 'NASA / JPL-Caltech',
        sourceArchiveUrl: 'https://science.nasa.gov/mission/mars-pathfinder/',
        nasaArchiveId: 'MPF-INSURANCE-PAN'
      },
      {
        id: 'soj-gal-3',
        missionId: 'sojourner-rover',
        title: 'Sojourner Rover Deploying Its Alpha Proton X-Ray Spectrometer (APXS)',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.24_PM__1__38a9555f.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA00621/PIA00621~small.jpg',
        cropBounds: { topPct: 2.2, bottomPct: 80.0, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Close-up frame of the Mars Pathfinder rover Sojourner lowering its rear-mounted Alpha Proton X-Ray Spectrometer (APXS) sensor head to measure the chemical composition of Martian soil and rocks.',
        captureType: 'Onboard Camera',
        dateTaken: 'July 1997',
        credit: 'NASA / JPL-Caltech',
        sourceArchiveUrl: 'https://science.nasa.gov/mission/mars-pathfinder/',
        nasaArchiveId: 'MPF-APXS-DEPLOY'
      },
      {
        id: 'soj-gal-4',
        missionId: 'sojourner-rover',
        title: 'Large Flood Boulders in Ares Valles Captured by Mars Pathfinder',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.24_PM_e5e16d80.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA00609/PIA00609~thumb.jpg',
        cropBounds: { topPct: 3.9, bottomPct: 60.0, leftPct: 1.5, rightPct: 99.5 },
        caption:
          'Large boulders deposited by catastrophic ancient floods in the Ares Valles outflow channel, photographed by the Imager for Mars Pathfinder (IMP) camera on July 4, 1997.',
        captureType: 'Onboard Camera',
        dateTaken: 'July 4, 1997',
        credit: 'NASA / JPL-Caltech (PIA00609)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA00609',
        nasaArchiveId: 'PIA00609'
      },
      {
        id: 'soj-gal-5',
        missionId: 'sojourner-rover',
        title: 'Engineers Testing Mars Pathfinder’s 17-Foot Multi-Lobed Airbags',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.23_PM_a4b40d7c.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA00691/PIA00691~small.jpg',
        cropBounds: { topPct: 3.2, bottomPct: 50.2, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Engineers test the 17-foot-tall (5-meter), four-bag, 24-sphere airbag cocoon that inflated 330 feet above Mars and cushioned Pathfinder and Sojourner through more than 15 bounces across the surface.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '1996',
        credit: 'NASA / JPL-Caltech',
        sourceArchiveUrl: 'https://science.nasa.gov/mission/mars-pathfinder/',
        nasaArchiveId: 'MPF-AIRBAGS-TEST'
      }
    ]
  },

  'spirit-opportunity': {
    missionId: 'spirit-opportunity',
    missionName: 'Spirit & Opportunity Rovers',
    cardPhoto: {
      id: 'mer-card',
      missionId: 'spirit-opportunity',
      title: 'Twin Mars Exploration Rovers (Spirit & Opportunity) in JPL Cleanroom',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA04422/PIA04422~medium.jpg',
      caption:
        'Authentic JPL spacecraft assembly photograph of the twin Mars Exploration Rovers (Spirit and Opportunity) with their deployed solar wings, Pancam masts, and 6-wheel rocker-bogie suspensions.',
      captureType: 'Pre-Launch / Cleanroom',
      dateTaken: '2003',
      credit: 'NASA / JPL-Caltech (PIA04422)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/PIA04422',
      nasaArchiveId: 'PIA04422'
    },
    galleryPhotos: [
      {
        id: 'mer-gal-1',
        missionId: 'spirit-opportunity',
        title: 'Twin Rovers Spirit & Opportunity Pose in JPL Spacecraft Assembly Facility',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA04422/PIA04422~medium.jpg',
        caption:
          'The twin Mars Exploration Rovers pose inside JPL’s cleanroom alongside a flight-spare model of their predecessor, Sojourner, prior to their June and July 2003 launches to Mars.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: 'March 2003',
        credit: 'NASA / JPL-Caltech (PIA04422)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA04422',
        nasaArchiveId: 'PIA04422'
      },
      {
        id: 'mer-gal-2',
        missionId: 'spirit-opportunity',
        title: 'Spirit Rover’s 360-Degree View & Solar Deck in Gusev Crater (Sol 409)',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA07410/PIA07410~medium.jpg',
        caption:
          'Captured by Spirit’s onboard Navigation Camera on Sol 409 after a Martian wind-cleaning event swept red dust off its solar panels during its climb up Husband Hill in Gusev Crater.',
        captureType: 'Onboard Camera',
        dateTaken: 'February 2005 (Sol 409)',
        credit: 'NASA / JPL-Caltech (PIA07410)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA07410',
        nasaArchiveId: 'PIA07410'
      },
      {
        id: 'mer-gal-3',
        missionId: 'spirit-opportunity',
        title: 'Opportunity Rover’s Pancam View of "Orion Crater" on Mars',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA21708/PIA21708~medium.jpg',
        caption:
          'Opportunity’s Panoramic Camera (Pancam) captured this boulder-rimmed view of Orion Crater en route to Perseverance Valley during its record-breaking 28.06-mile (45.16-km) Martian trek.',
        captureType: 'Onboard Camera',
        dateTaken: 'April 26, 2017 (Sol 4712)',
        credit: 'NASA / JPL-Caltech / Cornell / Arizona State Univ. (PIA21708)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA21708',
        nasaArchiveId: 'PIA21708'
      },
      {
        id: 'mer-gal-4',
        missionId: 'spirit-opportunity',
        title: 'Opportunity’s Robotic Arm Turret & Rock Abrasion Tool on Mars',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA20285/PIA20285~small.jpg',
        caption:
          'Opportunity’s instrument deployment arm positions its tool turret—housing the Rock Abrasion Tool (RAT), Microscopic Imager, and spectrometers—directly over a Martian rock target.',
        captureType: 'Onboard Camera',
        dateTaken: 'January 2016',
        credit: 'NASA / JPL-Caltech (PIA20285)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA20285',
        nasaArchiveId: 'PIA20285'
      },
      {
        id: 'mer-gal-5',
        missionId: 'spirit-opportunity',
        title: 'Spirit’s Wheels Embedded in the Soft Sulfate Sand of "Troy" (Sol 1899)',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA12007/PIA12007~small.jpg',
        caption:
          'Captured by Spirit’s Hazard Avoidance Camera on Sol 1899, showing its wheels embedded in loose sulfate-rich sand at "Troy," where Spirit became a stationary science platform before its final contact in March 2010.',
        captureType: 'Onboard Camera',
        dateTaken: 'May 2009 (Sol 1899)',
        credit: 'NASA / JPL-Caltech (PIA12007)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA12007',
        nasaArchiveId: 'PIA12007'
      }
    ]
  },

  'viking-landers': {
    missionId: 'viking-landers',
    missionName: 'Viking 1 & 2 Landers',
    cardPhoto: {
      id: 'vik-card',
      missionId: 'viking-landers',
      title: 'Viking Lander Flight Spacecraft Inspection at Kennedy Space Center',
      imageUrl: 'https://images-assets.nasa.gov/image/101-KSC-75P-110/101-KSC-75P-110~medium.jpg',
      caption:
        'Authentic NASA photograph of technicians at Kennedy Space Center inspecting the flight Viking Lander spacecraft, showing its high-gain S-band dish, twin facsimile camera turrets, and surface sampler boom.',
      captureType: 'Pre-Launch / Cleanroom',
      dateTaken: '1975',
      credit: 'NASA / Kennedy Space Center (101-KSC-75P-110)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/101-KSC-75P-110',
      nasaArchiveId: '101-KSC-75P-110'
    },
    galleryPhotos: [
      {
        id: 'vik-gal-1',
        missionId: 'viking-landers',
        title: 'Afternoon on Chryse Planitia Captured by Viking Lander 1 Camera 1',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA03165/PIA03165~medium.jpg',
        caption:
          'High-resolution mosaic taken by Viking Lander 1’s Camera 1 looking across the wind-drifted dunes and volcanic boulders of Chryse Planitia (the Thomas A. Mutch Memorial Station).',
        captureType: 'Onboard Camera',
        dateTaken: '1976',
        credit: 'NASA / JPL (PIA03165)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA03165',
        nasaArchiveId: 'PIA03165'
      },
      {
        id: 'vik-gal-2',
        missionId: 'viking-landers',
        title: 'Morning on Chryse Planitia & Viking 1 Deck Hardware (Camera 2 Mosaic)',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA03164/PIA03164~medium.jpg',
        caption:
          'Captured by Viking Lander 1’s Camera 2, showing the lander’s RTG wind cover, meteorology boom, calibration targets, and the rocky Martian plains stretching to the horizon.',
        captureType: 'Onboard Camera',
        dateTaken: '1976',
        credit: 'NASA / JPL (PIA03164)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA03164',
        nasaArchiveId: 'PIA03164'
      },
      {
        id: 'vik-gal-3',
        missionId: 'viking-landers',
        title: 'Viking Lander Flight Hardware Checkout at Kennedy Space Center',
        imageUrl: 'https://images-assets.nasa.gov/image/101-KSC-75P-110/101-KSC-75P-110~medium.jpg',
        caption:
          'Engineers in cleanroom attire at Kennedy Space Center inspect the three-legged Viking Lander and its onboard biological and chemical laboratory deck prior to encapsulation.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '1975',
        credit: 'NASA / Kennedy Space Center (101-KSC-75P-110)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/101-KSC-75P-110',
        nasaArchiveId: '101-KSC-75P-110'
      },
      {
        id: 'vik-gal-4',
        missionId: 'viking-landers',
        title: 'Viking Lander 1 Encapsulation Inside Bioshield & Aeroshell at KSC',
        imageUrl: 'https://images-assets.nasa.gov/image/101-KSC-75P-12/101-KSC-75P-12~medium.jpg',
        caption:
          'Technicians at Kennedy Space Center prepare Viking Lander 1’s protective heat-shield aeroshell cover before mating the lander with the Viking 1 Orbiter.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '1975',
        credit: 'NASA / Kennedy Space Center (101-KSC-75P-12)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/101-KSC-75P-12',
        nasaArchiveId: '101-KSC-75P-12'
      },
      {
        id: 'vik-gal-5',
        missionId: 'viking-landers',
        title: 'Titan IIIE-Centaur Launch of Viking 1 from Cape Canaveral',
        imageUrl: 'https://images-assets.nasa.gov/image/9141929/9141929~medium.jpg',
        caption:
          'The Titan IIIE-Centaur rocket carrying Viking 1 lifts off from Launch Complex 41 on August 20, 1975, beginning humanity’s first successful landing mission to the surface of Mars.',
        captureType: 'Launch & Mission Ops',
        dateTaken: 'August 20, 1975',
        credit: 'NASA / Kennedy Space Center (9141929)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/9141929',
        nasaArchiveId: '9141929'
      }
    ]
  },

  'phoenix-insight': {
    missionId: 'phoenix-insight',
    missionName: 'Phoenix & InSight Landers',
    cardPhoto: {
      id: 'phx-card',
      missionId: 'phoenix-insight',
      title: 'Phoenix Mars Lander with Both Octagonal Solar Arrays Open',
      imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.11_PM__1__bcc797ac.jpeg',
      fallbackUrl: 'https://images-assets.nasa.gov/image/PIA09701/PIA09701~medium.jpg',
      cropBounds: { topPct: 4.5, bottomPct: 77.0, leftPct: 0.5, rightPct: 99.5 },
      caption:
        'Authentic cleanroom test photograph of NASA’s Phoenix Mars Lander with both octagonal UltraFlex solar fan arrays fully deployed at Lockheed Martin Space Systems.',
      captureType: 'Pre-Launch / Cleanroom',
      dateTaken: '2007',
      credit: 'NASA / JPL-Caltech / UA / Lockheed Martin (PIA09701)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/PIA09701',
      nasaArchiveId: 'PIA09701'
    },
    galleryPhotos: [
      {
        id: 'phx-gal-1',
        missionId: 'phoenix-insight',
        title: 'Phoenix Hanging from Its Parachute Imaged by Mars Reconnaissance Orbiter',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.11_PM__2__edd94750.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA09701/PIA09701~medium.jpg',
        cropBounds: { topPct: 1.5, bottomPct: 62.2, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Mars Reconnaissance Orbiter’s HiRISE camera caught this historic photograph of Phoenix hanging from its parachute as it descended in front of 10-km Heimdall Crater on May 25, 2008—the first time one spacecraft ever photographed another landing on a planet.',
        captureType: 'Companion Spacecraft',
        dateTaken: 'May 25, 2008',
        credit: 'NASA / JPL-Caltech / University of Arizona (HiRISE)',
        sourceArchiveUrl: 'https://science.nasa.gov/mission/mars-phoenix/',
        nasaArchiveId: 'PIA10698'
      },
      {
        id: 'phx-gal-2',
        missionId: 'phoenix-insight',
        title: 'Phoenix Mars Lander Deck & Martian Arctic Plain at 68.22° N',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.11_PM__3__b1546862.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA11734/PIA11734~medium.jpg',
        cropBounds: { topPct: 5.4, bottomPct: 55.8, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Mosaic combining images taken by Phoenix’s Surface Stereo Imager after arriving on the polygonal patterned permafrost ground of Vastitas Borealis at 68.22° N, 234.25° E.',
        captureType: 'Onboard Camera',
        dateTaken: 'June 2008',
        credit: 'NASA / JPL-Caltech / University of Arizona / Texas A&M (PIA11734)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA11734',
        nasaArchiveId: 'PIA11734'
      },
      {
        id: 'phx-gal-3',
        missionId: 'phoenix-insight',
        title: 'Martian Arctic Ice Trenches Dug by Phoenix’s Robotic Arm',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.12_PM__1__13d7a6be.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA12107/PIA12107~medium.jpg',
        cropBounds: { topPct: 1.8, bottomPct: 65.6, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Approximately true-color mosaic from Phoenix’s Surface Stereo Imager displaying the trenches dug by the lander’s 2.35-meter robotic arm, exposing bright subsurface water ice just centimeters below the soil.',
        captureType: 'Onboard Camera',
        dateTaken: 'Summer 2008',
        credit: 'NASA / JPL-Caltech / University of Arizona / Texas A&M (PIA12107)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA12107',
        nasaArchiveId: 'PIA12107'
      },
      {
        id: 'phx-gal-4',
        missionId: 'phoenix-insight',
        title: 'Phoenix Science Deck with TEGA Ovens & MECA Wet Chemistry Lab',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.12_PM_84d4a341.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA12105/PIA12105~medium.jpg',
        cropBounds: { topPct: 1.9, bottomPct: 63.0, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Phoenix’s deck after several Martian soil deliveries, showing the Thermal and Evolved-Gas Analyzer (TEGA, center/right) that confirmed water ice and the MECA wet-chemistry lab (left) that detected perchlorates.',
        captureType: 'Onboard Camera',
        dateTaken: '2008',
        credit: 'NASA / JPL-Caltech / University of Arizona / Texas A&M (PIA12105)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA12105',
        nasaArchiveId: 'PIA12105'
      },
      {
        id: 'phx-gal-5',
        missionId: 'phoenix-insight',
        title: 'Both Solar Arrays Open During Cleanroom Testing on Phoenix',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.11_PM__1__bcc797ac.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA09701/PIA09701~medium.jpg',
        cropBounds: { topPct: 4.5, bottomPct: 77.0, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Spacecraft engineers inspect the Phoenix Mars Lander with both octagonal solar arrays unfolded during pre-launch verification testing.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '2007',
        credit: 'NASA / JPL-Caltech / UA / Lockheed Martin (PIA09701)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA09701',
        nasaArchiveId: 'PIA09701'
      }
    ]
  },

  'ingenuity-helicopter': {
    missionId: 'ingenuity-helicopter',
    missionName: 'Ingenuity Mars Helicopter',
    cardPhoto: {
      id: 'ing-card',
      missionId: 'ingenuity-helicopter',
      title: 'Mars Helicopter Ingenuity Standing on the Floor of Jezero Crater',
      imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.12_PM__2__122fdbd5.jpeg',
      fallbackUrl: 'https://images-assets.nasa.gov/image/PIA23882/PIA23882~medium.jpg',
      cropBounds: { topPct: 0.8, bottomPct: 80.0, leftPct: 0.5, rightPct: 99.5 },
      caption:
        'Authentic photograph of NASA’s 1.8-kilogram Ingenuity Mars Helicopter resting on the rocky surface of Jezero Crater surrounded by Perseverance’s wheel tracks.',
      captureType: 'Companion Spacecraft',
      dateTaken: 'April 2021',
      credit: 'NASA / JPL-Caltech / ASU (Mastcam-Z)',
      sourceArchiveUrl: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
      nasaArchiveId: 'INGENUITY-JEZERO'
    },
    galleryPhotos: [
      {
        id: 'ing-gal-1',
        missionId: 'ingenuity-helicopter',
        title: 'Ingenuity Mars Helicopter on the Martian Surface in Jezero Crater',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.12_PM__2__122fdbd5.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA23882/PIA23882~medium.jpg',
        cropBounds: { topPct: 0.8, bottomPct: 80.0, leftPct: 0.5, rightPct: 99.5 },
        caption:
          'Photographed on the floor of Jezero Crater after deploying from Perseverance, showing Ingenuity’s top solar panel, twin 1.2-meter carbon-fiber rotors, foil-insulated avionics box, and four carbon-fiber landing legs.',
        captureType: 'Companion Spacecraft',
        dateTaken: 'April 2021',
        credit: 'NASA / JPL-Caltech / ASU',
        sourceArchiveUrl: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
        nasaArchiveId: 'INGENUITY-SURFACE'
      },
      {
        id: 'ing-gal-2',
        missionId: 'ingenuity-helicopter',
        title: 'Ingenuity Extends Vertically Beneath the Belly of Perseverance',
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.47.13_PM_23f0f961.jpeg',
        fallbackUrl: 'https://images-assets.nasa.gov/image/PIA24443/PIA24443~medium.jpg',
        cropBounds: { topPct: 5.2, bottomPct: 41.8, leftPct: 9.0, rightPct: 91.0 },
        caption:
          'Captured on March 29, 2021, by the WATSON camera on Perseverance’s robotic arm, showing Ingenuity rotated vertically beneath the rover’s belly just days before dropping 4 inches onto the Martian surface.',
        captureType: 'Companion Spacecraft',
        dateTaken: 'March 29, 2021',
        credit: 'NASA / JPL-Caltech / MSSS (PIA24443)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA24443',
        nasaArchiveId: 'PIA24443'
      },
      {
        id: 'ing-gal-3',
        missionId: 'ingenuity-helicopter',
        title: 'Flight Model of NASA’s Ingenuity Mars Helicopter at JPL',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA23882/PIA23882~medium.jpg',
        caption:
          'Close-up studio photograph of the actual Ingenuity flight model at NASA’s Jet Propulsion Laboratory before integration onto the Mars 2020 Perseverance spacecraft.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '2020',
        credit: 'NASA / JPL-Caltech (PIA23882)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA23882',
        nasaArchiveId: 'PIA23882'
      },
      {
        id: 'ing-gal-4',
        missionId: 'ingenuity-helicopter',
        title: 'Inspecting Ingenuity in JPL’s Space Simulation Vacuum Chamber',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA23969/PIA23969~medium.jpg',
        caption:
          'An Ingenuity team engineer inspects the bottom of the flight helicopter—showing its downward navigation camera and laser altimeter window—inside JPL’s 25-Foot Space Simulator.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '2019',
        credit: 'NASA / JPL-Caltech (PIA23969)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA23969',
        nasaArchiveId: 'PIA23969'
      }
    ]
  },

  'dawn-spacecraft': {
    missionId: 'dawn-spacecraft',
    missionName: 'Dawn Spacecraft',
    cardPhoto: {
      id: 'dawn-card',
      missionId: 'dawn-spacecraft',
      title: 'NASA Dawn Spacecraft in Pre-Launch Processing at Kennedy Space Center',
      imageUrl: 'https://images-assets.nasa.gov/image/KSC-07pd1385/KSC-07pd1385~medium.jpg',
      caption:
        'Authentic NASA photograph of engineers inspecting the Dawn spacecraft inside Astrotech’s Hazardous Processing Facility at Kennedy Space Center prior to its September 2007 launch to Vesta and Ceres.',
      captureType: 'Pre-Launch / Cleanroom',
      dateTaken: 'June 2007',
      credit: 'NASA / Kennedy Space Center (KSC-07pd1385)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-07pd1385',
      nasaArchiveId: 'KSC-07pd1385'
    },
    galleryPhotos: [
      {
        id: 'dawn-gal-1',
        missionId: 'dawn-spacecraft',
        title: 'Full-Frame Portrait of Giant Asteroid Vesta Captured by Dawn',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA14778/PIA14778~small.jpg',
        caption:
          'Obtained by Dawn’s onboard Framing Camera on July 24, 2011, from a distance of 5,200 kilometers (3,200 miles), revealing the heavily cratered surface and equatorial troughs of giant protoplanet Vesta.',
        captureType: 'Onboard Camera',
        dateTaken: 'July 24, 2011',
        credit: 'NASA / JPL-Caltech / UCLA / MPS / DLR / IDA (PIA14778)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA14778',
        nasaArchiveId: 'PIA14778'
      },
      {
        id: 'dawn-gal-2',
        missionId: 'dawn-spacecraft',
        title: 'Bright Sodium-Carbonate Salt Deposits in Occator Crater on Ceres',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA21227/PIA21227~small.jpg',
        caption:
          'Captured by Dawn in orbit around dwarf planet Ceres, showing the bright carbonate salt domes (Cerealia Facula) inside 92-km Occator Crater formed by subsurface briny liquid water.',
        captureType: 'Onboard Camera',
        dateTaken: 'October 2016',
        credit: 'NASA / JPL-Caltech / UCLA / MPS / DLR / IDA (PIA21227)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA21227',
        nasaArchiveId: 'PIA21227'
      },
      {
        id: 'dawn-gal-3',
        missionId: 'dawn-spacecraft',
        title: 'Dawn Spacecraft Checkout in Astrotech Cleanroom at KSC',
        imageUrl: 'https://images-assets.nasa.gov/image/KSC-07pd1385/KSC-07pd1385~medium.jpg',
        caption:
          'Technicians check telemetry and xenon ion propulsion systems on the Dawn spacecraft at Kennedy Space Center before launch.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: 'June 2007',
        credit: 'NASA / Kennedy Space Center (KSC-07pd1385)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-07pd1385',
        nasaArchiveId: 'KSC-07pd1385'
      },
      {
        id: 'dawn-gal-4',
        missionId: 'dawn-spacecraft',
        title: 'Loading Propellant onto the Dawn Spacecraft Before Launch',
        imageUrl: 'https://images-assets.nasa.gov/image/KSC-07pd1388/KSC-07pd1388~medium.jpg',
        caption:
          'Technicians in protective suits load propellant into the Dawn spacecraft—which carried 425 kg of xenon gas for its three NSTAR ion thrusters to orbit both Vesta and Ceres.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: 'June 2007',
        credit: 'NASA / Kennedy Space Center (KSC-07pd1388)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-07pd1388',
        nasaArchiveId: 'KSC-07pd1388'
      }
    ]
  },

  'near-shoemaker': {
    missionId: 'near-shoemaker',
    missionName: 'NEAR Shoemaker',
    cardPhoto: {
      id: 'near-card',
      missionId: 'near-shoemaker',
      title: 'NEAR Shoemaker rotation sequence of Asteroid 433 Eros',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA02463/PIA02463~small.jpg',
      caption:
        'Authentic onboard Multi-Spectral Imager sequence captured by NASA’s NEAR Shoemaker spacecraft showing the 34-kilometer peanut-shaped near-Earth asteroid 433 Eros during orbital approach.',
      captureType: 'Onboard Camera',
      dateTaken: 'February 2000',
      credit: 'NASA / JHU Applied Physics Laboratory (PIA02463)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/PIA02463',
      nasaArchiveId: 'PIA02463'
    },
    galleryPhotos: [
      {
        id: 'near-gal-1',
        missionId: 'near-shoemaker',
        title: '12-Panel Rotation Sequence of Asteroid 433 Eros by NEAR Shoemaker',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA02463/PIA02463~small.jpg',
        caption:
          'Twelve-frame rotation sequence captured by NEAR Shoemaker’s Multi-Spectral Imager as it closed in on Asteroid 433 Eros prior to entering orbit on Valentine’s Day, February 14, 2000.',
        captureType: 'Onboard Camera',
        dateTaken: 'February 2000',
        credit: 'NASA / JHU Applied Physics Laboratory (PIA02463)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA02463',
        nasaArchiveId: 'PIA02463'
      },
      {
        id: 'near-gal-2',
        missionId: 'near-shoemaker',
        title: 'Shadows & Regolith Boulders on Asteroid 433 Eros',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA02487/PIA02487~small.jpg',
        caption:
          'High-resolution orbital view taken by NEAR Shoemaker revealing ancient impact craters, ridges, and pulverized regolith blanketing Asteroid 433 Eros.',
        captureType: 'Onboard Camera',
        dateTaken: '2000',
        credit: 'NASA / JHU Applied Physics Laboratory (PIA02487)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA02487',
        nasaArchiveId: 'PIA02487'
      },
      {
        id: 'near-gal-3',
        missionId: 'near-shoemaker',
        title: 'Himeros Saddle Region on Asteroid 433 Eros',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA03127/PIA03127~small.jpg',
        caption:
          'Captured from 62 miles (100 km) above Eros, showing the 10-km Himeros Saddle depression on whose edge NEAR Shoemaker executed humanity’s first soft asteroid landing on February 12, 2001.',
        captureType: 'Onboard Camera',
        dateTaken: '2000',
        credit: 'NASA / JHU Applied Physics Laboratory (PIA03127)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA03127',
        nasaArchiveId: 'PIA03127'
      },
      {
        id: 'near-gal-4',
        missionId: 'near-shoemaker',
        title: 'NEAR Shoemaker Delta II Launch from Cape Canaveral',
        imageUrl: 'https://images-assets.nasa.gov/image/9701595/9701595~small.jpg',
        caption:
          'The Delta II 7925-8 rocket launches the NEAR Shoemaker spacecraft from Cape Canaveral on February 17, 1996, inaugurating NASA’s Discovery Program.',
        captureType: 'Launch & Mission Ops',
        dateTaken: 'February 17, 1996',
        credit: 'NASA / Kennedy Space Center (9701595)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/9701595',
        nasaArchiveId: '9701595'
      }
    ]
  },

  'kepler-telescope': {
    missionId: 'kepler-telescope',
    missionName: 'Kepler Space Telescope',
    cardPhoto: {
      id: 'kep-card',
      missionId: 'kepler-telescope',
      title: 'NASA’s Kepler Space Telescope in Cleanroom at Cape Canaveral',
      imageUrl: 'https://images-assets.nasa.gov/image/KSC-2009-1431/KSC-2009-1431~medium.jpg',
      caption:
        'Authentic NASA pre-launch photograph of the flight Kepler space telescope in the Astrotech cleanroom facility at Titusville, Florida, showing its 1-meter aperture Schmidt photometer barrel and solar array.',
      captureType: 'Pre-Launch / Cleanroom',
      dateTaken: 'February 2009',
      credit: 'NASA / Kennedy Space Center (KSC-2009-1431)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-2009-1431',
      nasaArchiveId: 'KSC-2009-1431'
    },
    galleryPhotos: [
      {
        id: 'kep-gal-1',
        missionId: 'kepler-telescope',
        title: 'Kepler Space Telescope Flight Hardware Revealed in Astrotech Cleanroom',
        imageUrl: 'https://images-assets.nasa.gov/image/KSC-2009-1431/KSC-2009-1431~medium.jpg',
        caption:
          'Standing inside the Astrotech Space Operations cleanroom near Kennedy Space Center, the completed Kepler spacecraft awaits encapsulation prior to its March 6, 2009 launch.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: 'February 2009',
        credit: 'NASA / Kim Shiflett (KSC-2009-1431)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-2009-1431',
        nasaArchiveId: 'KSC-2009-1431'
      },
      {
        id: 'kep-gal-2',
        missionId: 'kepler-telescope',
        title: 'Full-Length View of Kepler’s Photometer Barrel & Spacecraft Bus',
        imageUrl: 'https://images-assets.nasa.gov/image/KSC-2009-1432/KSC-2009-1432~medium.jpg',
        caption:
          'Vertical view of the Kepler spacecraft showing its hexagonal avionics bus at the base, thermal blanket shielding, and 1.4-meter primary mirror housing that surveyed more than 500,000 stars.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: 'February 2009',
        credit: 'NASA / Kennedy Space Center (KSC-2009-1432)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-2009-1432',
        nasaArchiveId: 'KSC-2009-1432'
      },
      {
        id: 'kep-gal-3',
        missionId: 'kepler-telescope',
        title: 'Engineers Inspecting Kepler’s Solar Array & Sunshade Assembly',
        imageUrl: 'https://images-assets.nasa.gov/image/KSC-2009-1434/KSC-2009-1434~medium.jpg',
        caption:
          'Cleanroom inspection of Kepler’s body-mounted solar panels—the very surfaces that engineers later used like a kayak rudder against sunlight photon pressure during the K2 extended mission.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: 'February 2009',
        credit: 'NASA / Kennedy Space Center (KSC-2009-1434)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-2009-1434',
        nasaArchiveId: 'KSC-2009-1434'
      },
      {
        id: 'kep-gal-4',
        missionId: 'kepler-telescope',
        title: 'Delta II Rocket Carrying Kepler on Launch Pad 17-B at Cape Canaveral',
        imageUrl: 'https://images-assets.nasa.gov/image/KSC-08pd3475/KSC-08pd3475~medium.jpg',
        caption:
          'Dawn breaks over Launch Pad 17-B at Cape Canaveral Air Force Station as the United Launch Alliance Delta II rocket prepares to send NASA’s first planet-hunting mission into heliocentric orbit.',
        captureType: 'Launch & Mission Ops',
        dateTaken: '2009',
        credit: 'NASA / Kennedy Space Center (KSC-08pd3475)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/KSC-08pd3475',
        nasaArchiveId: 'KSC-08pd3475'
      }
    ]
  },

  'voyager-1': {
    missionId: 'voyager-1',
    missionName: 'Voyager 1',
    cardPhoto: {
      id: 'v1-card',
      missionId: 'voyager-1',
      title: 'Installing the Golden Record onto the Voyager 1 Spacecraft (1977)',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA21740/PIA21740~medium.jpg',
      caption:
        'Authentic archival photograph from 1977 showing engineers in cleanroom attire securing the gold-plated aluminum cover over the Golden Record on the decagonal bus of the Voyager 1 spacecraft.',
      captureType: 'Pre-Launch / Cleanroom',
      dateTaken: 'August 1977',
      credit: 'NASA / JPL-Caltech (PIA21740)',
      sourceArchiveUrl: 'https://images.nasa.gov/details/PIA21740',
      nasaArchiveId: 'PIA21740'
    },
    galleryPhotos: [
      {
        id: 'v1-gal-1',
        missionId: 'voyager-1',
        title: 'The "Pale Blue Dot" — Earth Photographed by Voyager 1 from 40.5 AU',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA23645/PIA23645~medium.jpg',
        caption:
          'Taken by Voyager 1’s narrow-angle camera on February 14, 1990, from 6 billion kilometers (3.7 billion miles) away, showing planet Earth as a tiny point of light ("a mote of dust suspended in a sunbeam") before its cameras were permanently turned off.',
        captureType: 'Onboard Camera',
        dateTaken: 'February 14, 1990',
        credit: 'NASA / JPL-Caltech (PIA00452 / PIA23645)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA23645',
        nasaArchiveId: 'PIA23645'
      },
      {
        id: 'v1-gal-2',
        missionId: 'voyager-1',
        title: 'Jupiter’s Great Red Spot Mosaic Captured by Voyager 1',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA00022/PIA00022~medium.jpg',
        caption:
          'Dramatic close-up mosaic of Jupiter’s turbulent Great Red Spot anticyclone and surrounding cloud eddies captured by Voyager 1 during its closest approach in early March 1979.',
        captureType: 'Onboard Camera',
        dateTaken: 'March 1979',
        credit: 'NASA / JPL (PIA00022)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA00022',
        nasaArchiveId: 'PIA00022'
      },
      {
        id: 'v1-gal-3',
        missionId: 'voyager-1',
        title: 'Active Volcanic Eruption Plume on Jupiter’s Moon Io (Voyager 1 Discovery)',
        imageUrl: 'https://images-assets.nasa.gov/image/ARC-1979-A79-7116/ARC-1979-A79-7116~medium.jpg',
        caption:
          'Historic Voyager 1 photograph capturing an active volcanic plume rising above the limb of Jupiter’s moon Io—the first active volcano ever discovered on another body in the Solar System.',
        captureType: 'Onboard Camera',
        dateTaken: 'March 1979',
        credit: 'NASA / JPL (ARC-1979-A79-7116)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/ARC-1979-A79-7116',
        nasaArchiveId: 'ARC-1979-A79-7116'
      },
      {
        id: 'v1-gal-4',
        missionId: 'voyager-1',
        title: 'Preparing & Mounting the Voyager 1 Golden Record Time Capsule',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA21741/PIA21741~medium.jpg',
        caption:
          'Technicians inspect the 12-inch gold-plated copper phonograph record—containing 115 images, greetings in 55 languages, and 90 minutes of music—before bolting it onto Voyager 1.',
        captureType: 'Pre-Launch / Cleanroom',
        dateTaken: '1977',
        credit: 'NASA / JPL-Caltech (PIA21741)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA21741',
        nasaArchiveId: 'PIA21741'
      },
      {
        id: 'v1-gal-5',
        missionId: 'voyager-1',
        title: 'Voyager 1 Launches Atop Titan IIIE-Centaur from Cape Canaveral',
        imageUrl: 'https://images-assets.nasa.gov/image/PIA21747/PIA21747~medium.jpg',
        caption:
          'Voyager 1 blasts off from Launch Complex 41 at Cape Canaveral on September 5, 1977, beginning a journey that carried it past Jupiter and Saturn and across the heliopause into interstellar space.',
        captureType: 'Launch & Mission Ops',
        dateTaken: 'September 5, 1977',
        credit: 'NASA / Kennedy Space Center (PIA21747)',
        sourceArchiveUrl: 'https://images.nasa.gov/details/PIA21747',
        nasaArchiveId: 'PIA21747'
      }
    ]
  }
};
