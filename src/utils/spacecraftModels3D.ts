import * as THREE from 'three';
import { SentinelMission } from '../data/sentinelsData';
import { getGoldKaptonBumpTexture, getSolarPanelTexture } from './spaceTextures3D';

export interface BuiltSpacecraftScene {
  craftGroup: THREE.Group;
  environmentGroup: THREE.Group;
  hotspotAnchors: Record<string, THREE.Vector3>;
}

/**
 * Shared PBR Material Library for realistic aerospace hardware
 */
function createSpacecraftMaterials(maxAnisotropy = 4) {
  const goldBump = getGoldKaptonBumpTexture();
  const solarTex = getSolarPanelTexture(maxAnisotropy);

  const goldKapton = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#EAB308'),
    metalness: 0.88,
    roughness: 0.26,
    bumpMap: goldBump,
    bumpScale: 0.035
  });

  const copperFoil = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D97706'),
    metalness: 0.85,
    roughness: 0.32,
    bumpMap: goldBump,
    bumpScale: 0.025
  });

  const aerospaceWhite = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F1F5F9'),
    metalness: 0.18,
    roughness: 0.38
  });

  const brushedTitanium = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#94A3B8'),
    metalness: 0.85,
    roughness: 0.25
  });

  const darkCarbon = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1E293B'),
    metalness: 0.45,
    roughness: 0.55
  });

  const blackAnodized = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0F172A'),
    metalness: 0.65,
    roughness: 0.3
  });

  const solarWing = new THREE.MeshStandardMaterial({
    map: solarTex,
    color: new THREE.Color('#FFFFFF'),
    metalness: 0.55,
    roughness: 0.2
  });

  const opticalLens = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#38BDF8'),
    emissive: new THREE.Color('#0284C7'),
    emissiveIntensity: 0.45,
    metalness: 0.9,
    roughness: 0.1
  });

  const rtgHotGlow = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#475569'),
    emissive: new THREE.Color('#EA580C'),
    emissiveIntensity: 0.25,
    metalness: 0.7,
    roughness: 0.4
  });

  return {
    goldKapton,
    copperFoil,
    aerospaceWhite,
    brushedTitanium,
    darkCarbon,
    blackAnodized,
    solarWing,
    opticalLens,
    rtgHotGlow
  };
}

/**
 * Helper to create a true parabolic High-Gain Dish Antenna using LatheGeometry
 */
function createParabolicDish(
  radius: number,
  depth: number,
  dishMat: THREE.Material,
  metalMat: THREE.Material
): THREE.Group {
  const dishGroup = new THREE.Group();
  const points: THREE.Vector2[] = [];
  const steps = 18;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = t * radius;
    const y = (t * t) * depth;
    points.push(new THREE.Vector2(r, y));
  }
  const dishGeo = new THREE.LatheGeometry(points, 36);
  const dishMesh = new THREE.Mesh(dishGeo, dishMat);
  dishMesh.castShadow = true;
  dishMesh.receiveShadow = true;
  dishGroup.add(dishMesh);

  // Feed horn & tripod struts
  const feedHorn = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.08, radius * 0.14, depth * 0.55, 16), metalMat);
  feedHorn.position.set(0, depth * 1.15, 0);
  dishGroup.add(feedHorn);

  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const strutGeo = new THREE.CylinderGeometry(0.025, 0.025, radius * 0.95, 8);
    const strut = new THREE.Mesh(strutGeo, metalMat);
    strut.position.set(
      Math.cos(angle) * radius * 0.38,
      depth * 0.68,
      Math.sin(angle) * radius * 0.38
    );
    strut.lookAt(0, depth * 1.2, 0);
    strut.rotateX(Math.PI / 2);
    dishGroup.add(strut);
  }

  return dishGroup;
}

/**
 * Helper to create a realistic planetary terrain pad below surface landers/rovers
 */
function createPlanetaryTerrainPad(type: 'lunar' | 'mars' | 'eros'): THREE.Group {
  const group = new THREE.Group();
  const isMars = type === 'mars';
  const isEros = type === 'eros';

  const groundColor = isMars ? '#8F3D23' : isEros ? '#57534E' : '#646B75';
  const rimColor = isMars ? '#B45332' : isEros ? '#78716C' : '#858D99';

  const padGeo = new THREE.CylinderGeometry(3.8, 4.1, 0.24, 48);
  const padMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(groundColor),
    roughness: 0.92,
    metalness: 0.05
  });
  const pad = new THREE.Mesh(padGeo, padMat);
  pad.position.y = -1.25;
  pad.receiveShadow = true;
  group.add(pad);

  // Subtle concentric terrain ring + scattered rocks/craters
  const ringGeo = new THREE.RingGeometry(3.75, 3.85, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#D2F366'),
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -1
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -1.12;
  group.add(ring);

  const rockMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(rimColor),
    roughness: 0.88,
    metalness: 0.08
  });

  const rockPositions = [
    [-2.1, -1.08, 1.4, 0.22],
    [2.3, -1.1, 1.1, 0.18],
    [-1.6, -1.11, -1.9, 0.26],
    [1.8, -1.09, -1.5, 0.19],
    [0.5, -1.12, 2.5, 0.15],
    [-2.7, -1.1, -0.4, 0.2]
  ];

  rockPositions.forEach(([x, y, z, s], idx) => {
    const rockGeo = new THREE.DodecahedronGeometry(s, 1);
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.set(x, y, z);
    rock.scale.set(1.2, 0.65, 1.0);
    rock.rotation.y = idx * 1.1;
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
  });

  return group;
}

/**
 * Helper to create a realistic rover wheel with cleats
 */
function createRoverWheel(
  radius: number,
  width: number,
  tireMat: THREE.Material,
  hubMat: THREE.Material
): THREE.Group {
  const wg = new THREE.Group();
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 24), tireMat);
  tire.rotation.z = Math.PI / 2;
  tire.castShadow = true;
  wg.add(tire);

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, width * 1.06, 16),
    hubMat
  );
  hub.rotation.z = Math.PI / 2;
  wg.add(hub);

  return wg;
}

/**
 * Assembles a realistic, multi-part 3D spacecraft model + hotspot 3D anchors for any of the 14 NSSDCA missions
 */
export function buildSpacecraft3DModel(
  mission: SentinelMission,
  maxAnisotropy = 4
): BuiltSpacecraftScene {
  const mats = createSpacecraftMaterials(maxAnisotropy);
  const craftGroup = new THREE.Group();
  const environmentGroup = new THREE.Group();
  const hotspotAnchors: Record<string, THREE.Vector3> = {};

  switch (mission.illustrationType) {
    case 'pioneer-10':
    case 'pioneer-11': {
      // Pioneer 10 / 11: 2.74m Parabolic Dish + Gold Hexagonal Equipment Bus + 2 RTG Booms + 6.5m Magnetometer Boom + Golden Plaque
      const dish = createParabolicDish(1.45, 0.42, mats.aerospaceWhite, mats.brushedTitanium);
      dish.rotation.x = Math.PI * 0.35;
      dish.position.set(0, 0.15, 0.25);
      craftGroup.add(dish);

      // Gold hexagonal equipment compartment behind dish
      const busGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.48, 6);
      const bus = new THREE.Mesh(busGeo, mats.goldKapton);
      bus.rotation.x = Math.PI * 0.35;
      bus.position.set(0, -0.12, -0.12);
      bus.castShadow = true;
      craftGroup.add(bus);

      // Louvered instrument compartment
      const instBox = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.32, 0.42), mats.copperFoil);
      instBox.position.set(0.45, -0.18, -0.15);
      craftGroup.add(instBox);

      // Golden Plaque mounted on antenna support strut!
      const plaque = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.16, 0.02),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color('#FACC15'),
          emissive: new THREE.Color('#CA8A04'),
          emissiveIntensity: 0.35,
          metalness: 0.95,
          roughness: 0.12
        })
      );
      plaque.position.set(0.28, 0.05, 0.12);
      craftGroup.add(plaque);

      // Two SNAP-19 RTG Booms with finned nuclear generators
      const createRtgBoom = (angleZ: number) => {
        const boomGroup = new THREE.Group();
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.85, 10), mats.brushedTitanium);
        rod.position.y = -0.92;
        boomGroup.add(rod);

        const rtgBody = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.45, 12), mats.rtgHotGlow);
        rtgBody.position.y = -1.85;
        boomGroup.add(rtgBody);

        for (let f = 0; f < 6; f++) {
          const fin = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.42, 0.02), mats.copperFoil);
          fin.position.y = -1.85;
          fin.rotation.y = (f / 6) * Math.PI;
          boomGroup.add(fin);
        }

        boomGroup.rotation.z = angleZ;
        return boomGroup;
      };

      const rtg1 = createRtgBoom(0.75);
      const rtg2 = createRtgBoom(-0.85);
      craftGroup.add(rtg1);
      craftGroup.add(rtg2);

      // Long Helium Vector Magnetometer Boom
      const magBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.9, 8), mats.brushedTitanium);
      magBoom.position.set(-1.35, 0.72, -0.2);
      magBoom.rotation.z = 1.12;
      craftGroup.add(magBoom);

      const magSensor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.16), mats.opticalLens);
      magSensor.position.set(-2.62, 1.32, -0.2);
      craftGroup.add(magSensor);

      // Distant gas giant backdrop ring
      const orbitRing = new THREE.Mesh(
        new THREE.RingGeometry(3.2, 3.26, 64),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color('#D2F366'),
          transparent: true,
          opacity: 0.25,
          side: THREE.DoubleSide
        })
      );
      orbitRing.rotation.x = Math.PI / 2;
      orbitRing.position.y = -1.2;
      environmentGroup.add(orbitRing);

      // Assign exact 3D hotspot anchors
      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0, 0.45, 0.65);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(1.25, -1.35, 0);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(-2.35, 1.18, -0.2);
      break;
    }

    case 'apollo-lm': {
      // Apollo Lunar Module Descent Stage: Gold Kapton Octagonal body + 4 A-frame landing legs + circular footpads + ladder + plaque + engine bell
      environmentGroup.add(createPlanetaryTerrainPad('lunar'));

      const octagon = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.92, 8), mats.goldKapton);
      octagon.position.y = -0.22;
      octagon.castShadow = true;
      octagon.receiveShadow = true;
      craftGroup.add(octagon);

      // Top dark metallic launch deck
      const topDeck = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 0.08, 8), mats.darkCarbon);
      topDeck.position.y = 0.26;
      craftGroup.add(topDeck);

      // DPS Engine Skirt underneath
      const engineBell = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.52, 0.58, 24, 1, true),
        mats.blackAnodized
      );
      engineBell.position.y = -0.82;
      craftGroup.add(engineBell);

      // 4 Outrigger Landing Legs + Gold Foil Struts + Circular Dish Footpads
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const legGroup = new THREE.Group();

        const primaryStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 1.45, 12), mats.goldKapton);
        primaryStrut.position.set(1.48, -0.48, 0);
        primaryStrut.rotation.z = 0.52;
        primaryStrut.castShadow = true;
        legGroup.add(primaryStrut);

        const crossStrutA = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.95, 8), mats.brushedTitanium);
        crossStrutA.position.set(1.22, -0.35, 0.22);
        crossStrutA.rotation.z = 1.05;
        legGroup.add(crossStrutA);

        const crossStrutB = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.95, 8), mats.brushedTitanium);
        crossStrutB.position.set(1.22, -0.35, -0.22);
        crossStrutB.rotation.z = 1.05;
        legGroup.add(crossStrutB);

        const footpad = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.07, 24), mats.goldKapton);
        footpad.position.set(1.86, -1.08, 0);
        footpad.castShadow = true;
        legGroup.add(footpad);

        // Ladder on the front leg (i === 0)
        if (i === 0) {
          for (let r = 0; r < 6; r++) {
            const rung = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 0.26), mats.aerospaceWhite);
            rung.position.set(1.26 + r * 0.09, -0.05 - r * 0.14, 0);
            legGroup.add(rung);
          }
        }

        legGroup.rotation.y = angle;
        craftGroup.add(legGroup);
      }

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0, -0.82, 0.3);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(-0.75, 0.05, 0.85);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(1.15, -0.55, 1.15);
      break;
    }

    case 'lunar-rover': {
      // Apollo Lunar Roving Vehicle (Moon Buggy): Aluminum tubular frame + 2 folding seats + T-controller + 4 wire-mesh wheels with orange fenders + high-gain umbrella antenna + color TV camera
      environmentGroup.add(createPlanetaryTerrainPad('lunar'));

      const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.1, 1.15), mats.aerospaceWhite);
      chassis.position.y = -0.62;
      chassis.castShadow = true;
      craftGroup.add(chassis);

      // 2 L-shaped Astronaut Lawn-Chair Seats
      [-0.28, 0.28].forEach((zPos) => {
        const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 0.42), mats.darkCarbon);
        seatBase.position.set(-0.15, -0.52, zPos);
        craftGroup.add(seatBase);

        const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.55, 0.42), mats.darkCarbon);
        seatBack.position.set(-0.38, -0.25, zPos);
        seatBack.rotation.z = 0.15;
        craftGroup.add(seatBack);
      });

      // T-Shaped Hand Controller between seats
      const tStick = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 8), mats.brushedTitanium);
      tStick.position.set(0.18, -0.35, 0);
      craftGroup.add(tStick);
      const tGrip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.24), mats.copperFoil);
      tGrip.position.set(0.18, -0.14, 0);
      craftGroup.add(tGrip);

      // 4 Wire-Mesh Piano-Wire Wheels with Copper/Orange Dust Fenders
      const wheelCoords: [number, number][] = [
        [0.95, 0.72],
        [0.95, -0.72],
        [-0.95, 0.72],
        [-0.95, -0.72]
      ];
      wheelCoords.forEach(([wx, wz]) => {
        const wg = new THREE.Group();
        const meshTire = new THREE.Mesh(
          new THREE.TorusGeometry(0.34, 0.11, 14, 28),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color('#CBD5E1'),
            metalness: 0.75,
            roughness: 0.35,
            wireframe: false
          })
        );
        wg.add(meshTire);

        const innerHub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.18, 16), mats.goldKapton);
        innerHub.rotation.x = Math.PI / 2;
        wg.add(innerHub);

        // Curved dust fender over top of wheel
        const fender = new THREE.Mesh(
          new THREE.CylinderGeometry(0.47, 0.47, 0.26, 16, 1, true, -0.9, 1.8),
          mats.copperFoil
        );
        fender.rotation.z = Math.PI / 2;
        fender.rotation.y = Math.PI / 2;
        wg.add(fender);

        wg.position.set(wx, -0.74, wz);
        craftGroup.add(wg);
      });

      // Front High-Gain Umbrella Mesh Antenna & Gold TV Camera
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.25, 10), mats.brushedTitanium);
      mast.position.set(0.75, 0.02, -0.25);
      craftGroup.add(mast);

      const umbrellaDish = createParabolicDish(0.58, 0.22, mats.goldKapton, mats.brushedTitanium);
      umbrellaDish.position.set(0.75, 0.65, -0.25);
      umbrellaDish.rotation.z = -0.45;
      craftGroup.add(umbrellaDish);

      const tvCam = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.18), mats.goldKapton);
      tvCam.position.set(0.92, -0.32, 0.28);
      craftGroup.add(tvCam);

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0.95, -0.74, 0.72);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(0.18, -0.14, 0);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(0.75, 0.68, -0.25);
      break;
    }

    case 'alsep': {
      // ALSEP Lunar Science Station: LRRR 100-Corner-Cube Laser Retroreflector + SNAP-27 Plutonium RTG + Gold Mylar Passive Seismometer
      environmentGroup.add(createPlanetaryTerrainPad('lunar'));

      // 1. Laser Ranging Retroreflector (LRRR) tilted toward Earth
      const lrrrGroup = new THREE.Group();
      const lrrrBase = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.14, 0.85), mats.aerospaceWhite);
      lrrrGroup.add(lrrrBase);

      const mirrorPanel = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.08, 0.78), mats.opticalLens);
      mirrorPanel.position.set(0, 0.34, 0);
      mirrorPanel.rotation.x = 0.55;
      lrrrGroup.add(mirrorPanel);

      lrrrGroup.position.set(-1.15, -0.95, 0.25);
      craftGroup.add(lrrrGroup);

      // 2. Central ALSEP Telemetry Station + Passive Seismometer under Gold Thermal Skirt
      const seisSkirt = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.68, 0.52, 24), mats.goldKapton);
      seisSkirt.position.set(0.1, -0.86, -0.15);
      seisSkirt.castShadow = true;
      craftGroup.add(seisSkirt);

      const alsepMast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.15, 10), mats.brushedTitanium);
      alsepMast.position.set(0.1, -0.22, -0.15);
      craftGroup.add(alsepMast);

      // 3. SNAP-27 Finned Plutonium-238 RTG
      const snapRtg = new THREE.Group();
      const core = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.78, 16), mats.rtgHotGlow);
      snapRtg.add(core);
      for (let f = 0; f < 8; f++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.72, 0.025), mats.darkCarbon);
        fin.rotation.y = (f / 8) * Math.PI;
        snapRtg.add(fin);
      }
      snapRtg.position.set(1.35, -0.72, 0.2);
      craftGroup.add(snapRtg);

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(-1.15, -0.58, 0.25);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(0.1, -0.68, -0.15);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(1.35, -0.55, 0.2);
      break;
    }

    case 'surveyor': {
      // Surveyor Lunar Lander: White tubular tripod spaceframe + top planar solar panel + high-gain dish + 3 shock-absorber crushable footpads + soil scoop arm + TV mirror turret
      environmentGroup.add(createPlanetaryTerrainPad('lunar'));

      // Central tripod mast
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.45, 1.55, 6), mats.aerospaceWhite);
      mast.position.y = -0.15;
      craftGroup.add(mast);

      // Thermal equipment compartments
      const boxA = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.45, 0.52), mats.goldKapton);
      boxA.position.set(-0.32, -0.45, 0.25);
      craftGroup.add(boxA);

      const boxB = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.42, 0.48), mats.aerospaceWhite);
      boxB.position.set(0.35, -0.45, 0.2);
      craftGroup.add(boxB);

      // Top Planar Solar Panel + Planar High-Gain Antenna
      const topSolar = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.05, 0.85), mats.solarWing);
      topSolar.position.set(-0.15, 0.82, 0);
      topSolar.rotation.z = 0.28;
      craftGroup.add(topSolar);

      const planarAntenna = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.06), mats.goldKapton);
      planarAntenna.position.set(0.32, 0.95, 0);
      planarAntenna.rotation.y = 0.4;
      craftGroup.add(planarAntenna);

      // 3 Tripod Landing Legs with Crushable Honeycomb Footpads
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const lg = new THREE.Group();
        const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 1.55, 10), mats.brushedTitanium);
        strut.position.set(1.05, -0.62, 0);
        strut.rotation.z = 0.92;
        lg.add(strut);

        const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.14, 20), mats.goldKapton);
        pad.position.set(1.68, -1.05, 0);
        lg.add(pad);

        lg.rotation.y = angle;
        craftGroup.add(lg);
      }

      // Pantograph robotic surface sampler scoop
      const scoopArm = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 0.08), mats.copperFoil);
      scoopArm.position.set(0.95, -0.72, 0.55);
      scoopArm.rotation.z = -0.35;
      craftGroup.add(scoopArm);

      // Rotating TV mirror camera housing
      const tvTurret = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.52, 16), mats.aerospaceWhite);
      tvTurret.position.set(-0.48, 0.05, 0.38);
      craftGroup.add(tvTurret);

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(1.68, -0.95, 0);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(1.35, -0.82, 0.55);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(-0.48, 0.25, 0.38);
      break;
    }

    case 'sojourner':
    case 'opportunity': {
      // Sojourner OR Spirit & Opportunity Rovers: Warm Electronics Box (Gold Kapton) + Solar Deck + 6-Wheel Rocker-Bogie Suspension + Pancam Mast + Robotic Arm (IDD/APXS)
      environmentGroup.add(createPlanetaryTerrainPad('mars'));

      const isMer = mission.illustrationType === 'opportunity';

      // Gold Warm Electronics Box (WEB)
      const webBody = new THREE.Mesh(
        new THREE.BoxGeometry(isMer ? 1.35 : 1.15, 0.46, isMer ? 1.05 : 0.85),
        mats.goldKapton
      );
      webBody.position.y = -0.38;
      webBody.castShadow = true;
      craftGroup.add(webBody);

      // Solar Panel Deck (Winged for Spirit/Opportunity, Flat rectangular for Sojourner)
      if (isMer) {
        const centerDeck = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.05, 1.15), mats.solarWing);
        centerDeck.position.y = -0.12;
        craftGroup.add(centerDeck);

        const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.04, 0.85), mats.solarWing);
        leftWing.position.set(0, -0.12, 0.92);
        craftGroup.add(leftWing);

        const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.04, 0.85), mats.solarWing);
        rightWing.position.set(0, -0.12, -0.92);
        craftGroup.add(rightWing);
      } else {
        const flatSolar = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.06, 0.98), mats.solarWing);
        flatSolar.position.y = -0.12;
        craftGroup.add(flatSolar);
      }

      // 6-Wheel Rocker-Bogie Suspension (3 wheels per side)
      [-0.74, 0.74].forEach((zSide) => {
        [-0.78, 0, 0.78].forEach((xPos) => {
          const wheel = createRoverWheel(0.24, 0.18, mats.darkCarbon, mats.brushedTitanium);
          wheel.rotation.y = Math.PI / 2;
          wheel.position.set(xPos, -0.88, zSide);
          craftGroup.add(wheel);

          const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.58, 8), mats.brushedTitanium);
          strut.position.set(xPos * 0.82, -0.62, zSide * 0.92);
          strut.rotation.z = xPos * 0.35;
          craftGroup.add(strut);
        });
      });

      // Pancam Mast & Stereo Camera Head (or front APXS sensor)
      if (isMer) {
        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 1.05, 12), mats.aerospaceWhite);
        mast.position.set(0.48, 0.42, 0);
        craftGroup.add(mast);

        const camBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.52), mats.aerospaceWhite);
        camBar.position.set(0.52, 0.95, 0);
        craftGroup.add(camBar);

        const lensL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 12), mats.opticalLens);
        lensL.rotation.z = Math.PI / 2;
        lensL.position.set(0.65, 0.95, 0.16);
        craftGroup.add(lensL);

        const lensR = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 12), mats.opticalLens);
        lensR.rotation.z = Math.PI / 2;
        lensR.position.set(0.65, 0.95, -0.16);
        craftGroup.add(lensR);
      }

      // Front Robotic Instrument Arm (APXS / RAT Rock Abrasion Tool)
      const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.06, 0.06), mats.copperFoil);
      arm1.position.set(0.88, -0.52, 0.15);
      arm1.rotation.z = -0.35;
      craftGroup.add(arm1);

      const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.18, 14), mats.brushedTitanium);
      turret.position.set(1.18, -0.68, 0.15);
      craftGroup.add(turret);

      if (isMer) {
        if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0.58, 0.95, 0);
        if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(1.18, -0.68, 0.15);
        if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(0, -0.1, 0.65);
      } else {
        if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0, -0.88, 0.74);
        if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(1.18, -0.68, 0.15);
        if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(0, -0.12, 0);
      }
      break;
    }

    case 'viking':
    case 'insight-phoenix': {
      // Viking 1 & 2 OR Phoenix & InSight Mars Landers
      environmentGroup.add(createPlanetaryTerrainPad('mars'));
      const isInSight = mission.illustrationType === 'insight-phoenix';

      const deck = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.05, 0.48, 6),
        isInSight ? mats.goldKapton : mats.aerospaceWhite
      );
      deck.position.y = -0.35;
      deck.castShadow = true;
      craftGroup.add(deck);

      // 3 Landing Legs
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 + 0.3;
        const lg = new THREE.Group();
        const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 1.15, 10), mats.brushedTitanium);
        strut.position.set(1.12, -0.7, 0);
        strut.rotation.z = 0.65;
        lg.add(strut);

        const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.32, 0.08, 18), mats.darkCarbon);
        pad.position.set(1.45, -1.08, 0);
        lg.add(pad);
        lg.rotation.y = angle;
        craftGroup.add(lg);
      }

      if (isInSight) {
        // Dual Decagonal Circular Solar Arrays on Phoenix/InSight
        [-1.85, 1.85].forEach((xSide) => {
          const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.04, 10), mats.solarWing);
          fan.position.set(xSide, -0.22, 0);
          craftGroup.add(fan);
        });

        // SEIS Copper-Gold Seismometer Dome placed on Martian soil in front
        const seisDome = new THREE.Mesh(
          new THREE.SphereGeometry(0.34, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
          mats.copperFoil
        );
        seisDome.position.set(0.65, -1.12, 1.25);
        craftGroup.add(seisDome);

        // Robotic Deployment Arm
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.95, 0.06), mats.brushedTitanium);
        arm.position.set(0.45, 0.15, 0.55);
        arm.rotation.x = 0.55;
        craftGroup.add(arm);

        if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0.65, -0.95, 1.25);
        if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(0.45, 0.25, 0.55);
        if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(-1.85, -0.2, 0);
      } else {
        // Viking High-Gain Parabolic Dish + Twin facsimile camera cylinders + RTG wind covers + Soil Scoop Arm
        const dish = createParabolicDish(0.62, 0.22, mats.aerospaceWhite, mats.brushedTitanium);
        dish.position.set(-0.35, 0.45, -0.2);
        dish.rotation.z = 0.35;
        craftGroup.add(dish);

        [-0.35, 0.35].forEach((zCam) => {
          const cam = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.52, 16), mats.aerospaceWhite);
          cam.position.set(0.55, 0.15, zCam);
          craftGroup.add(cam);
        });

        const scoopBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.55, 10), mats.copperFoil);
        scoopBoom.position.set(1.25, -0.58, 0.25);
        scoopBoom.rotation.z = 1.15;
        craftGroup.add(scoopBoom);

        if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(1.65, -0.78, 0.25);
        if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(0.2, -0.25, 0);
        if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(0.55, 0.25, 0.35);
      }
      break;
    }

    case 'ingenuity': {
      // Ingenuity Mars Helicopter: Tissue-box Kapton fuselage + Coaxial Carbon-Fiber Rotors + Top Solar Panel + 4 Ultra-Light Landing Legs
      environmentGroup.add(createPlanetaryTerrainPad('mars'));

      const fuselage = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.58, 0.65), mats.goldKapton);
      fuselage.position.y = -0.22;
      fuselage.castShadow = true;
      craftGroup.add(fuselage);

      // Mast & Counter-Rotating Carbon Fiber Blades
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.95, 12), mats.darkCarbon);
      mast.position.y = 0.52;
      craftGroup.add(mast);

      const blade1 = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.025, 0.24), mats.darkCarbon);
      blade1.position.y = 0.58;
      blade1.rotation.y = 0.25;
      craftGroup.add(blade1);

      const blade2 = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.025, 0.24), mats.blackAnodized);
      blade2.position.y = 0.82;
      blade2.rotation.y = -0.55;
      craftGroup.add(blade2);

      // Top Solar Array
      const topSolar = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 0.48), mats.solarWing);
      topSolar.position.y = 1.04;
      craftGroup.add(topSolar);

      // 4 Carbon-Fiber Landing Legs
      [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
      ].forEach(([sx, sz]) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.15, 8), mats.brushedTitanium);
        leg.position.set(sx * 0.58, -0.68, sz * 0.58);
        leg.rotation.z = sx * 0.52;
        leg.rotation.x = -sz * 0.52;
        craftGroup.add(leg);
      });

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0.85, 0.72, 0);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(0, 1.06, 0);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(0, -0.25, 0.35);
      break;
    }

    case 'dawn': {
      // Dawn Spacecraft: Cube bus + High-Gain Dish + Giant 19.7m Twin Solar Array Wings + Glowing Blue Xenon Ion Engine Plume
      const bus = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.92, 0.88), mats.goldKapton);
      craftGroup.add(bus);

      const dish = createParabolicDish(0.68, 0.24, mats.aerospaceWhite, mats.brushedTitanium);
      dish.position.set(0, 0.15, 0.55);
      dish.rotation.x = Math.PI / 2;
      craftGroup.add(dish);

      // Giant Twin Solar Wings
      const leftWing = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.68, 0.04), mats.solarWing);
      leftWing.position.set(-1.72, 0, 0);
      craftGroup.add(leftWing);

      const rightWing = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.68, 0.04), mats.solarWing);
      rightWing.position.set(1.72, 0, 0);
      craftGroup.add(rightWing);

      // NSTAR Xenon Ion Thruster Nozzle + Glowing Blue Ion Plume
      const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 0.24, 18), mats.brushedTitanium);
      nozzle.position.y = -0.58;
      craftGroup.add(nozzle);

      const xenonPlume = new THREE.Mesh(
        new THREE.ConeGeometry(0.32, 1.15, 24, 1, true),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color('#38BDF8'),
          transparent: true,
          opacity: 0.55,
          side: THREE.DoubleSide
        })
      );
      xenonPlume.position.y = -1.18;
      xenonPlume.rotation.x = Math.PI;
      craftGroup.add(xenonPlume);

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0, -0.88, 0);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(-1.85, 0, 0);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(0, 0.48, 0.35);
      break;
    }

    case 'near-shoemaker': {
      // NEAR Shoemaker on Asteroid 433 Eros: Octagonal Gold Bus + 4 Cruciform Windmill Solar Panels + Top High-Gain Dish
      environmentGroup.add(createPlanetaryTerrainPad('eros'));

      const bus = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.92, 8), mats.goldKapton);
      bus.position.y = -0.35;
      bus.rotation.z = 0.22;
      craftGroup.add(bus);

      const dish = createParabolicDish(0.64, 0.22, mats.aerospaceWhite, mats.brushedTitanium);
      dish.position.set(-0.12, 0.22, 0);
      dish.rotation.z = 0.22;
      craftGroup.add(dish);

      // 4 Windmill Solar Panels
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + 0.4;
        const wing = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.04, 0.65), mats.solarWing);
        wing.position.set(Math.cos(angle) * 1.28, -0.05, Math.sin(angle) * 1.28);
        wing.rotation.y = -angle;
        craftGroup.add(wing);
      }

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(1.25, -0.05, 0.45);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(0.15, -0.78, 0.42);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(-0.12, 0.45, 0);
      break;
    }

    case 'kepler': {
      // Kepler Space Telescope: Gold/Yellow Cylindrical Photometer Barrel + Slanted Sunshade Aperture + Hexagonal Spacecraft Bus + Solar Array
      const group = new THREE.Group();
      group.rotation.z = -0.35;

      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.76, 1.95, 24), mats.goldKapton);
      barrel.position.y = 0.25;
      barrel.castShadow = true;
      group.add(barrel);

      // Dark optical aperture interior
      const aperture = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.08, 24), mats.opticalLens);
      aperture.position.y = 1.23;
      group.add(aperture);

      // Hexagonal Spacecraft Bus at base
      const bus = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.55, 6), mats.brushedTitanium);
      bus.position.y = -0.92;
      group.add(bus);

      // Sunshield / Solar Array Panel along flank
      const solarShield = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.05, 1.35), mats.solarWing);
      solarShield.position.set(-0.82, 0.22, 0);
      group.add(solarShield);

      craftGroup.add(group);

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0.45, 1.05, 0);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(0, 0.15, 0.55);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(0.32, -0.82, 0.45);
      break;
    }

    case 'voyager-1': {
      // Voyager 1 Interstellar Probe: 3.7m White High-Gain Parabolic Dish + Decagonal 10-Sided Bus + Gold-Plated 12-Inch Voyager Golden Record + 3 MHW-RTG Nuclear Booms + 13m Magnetometer Boom + Science Scan Platform
      const vGroup = new THREE.Group();
      vGroup.rotation.y = -0.35;
      vGroup.rotation.x = 0.12;

      // 1. 3.7-meter White High-Gain Parabolic Dish Antenna
      const dish = createParabolicDish(1.42, 0.42, mats.aerospaceWhite, mats.brushedTitanium);
      dish.rotation.x = Math.PI / 2;
      dish.position.set(0, 0.18, 0.48);
      vGroup.add(dish);

      // 2. 10-Sided Decagonal Central Spacecraft Bus behind Dish
      const decagonalBus = new THREE.Mesh(
        new THREE.CylinderGeometry(0.68, 0.68, 0.46, 10),
        mats.darkCarbon
      );
      decagonalBus.rotation.x = Math.PI / 2;
      decagonalBus.position.set(0, 0.18, -0.05);
      decagonalBus.castShadow = true;
      vGroup.add(decagonalBus);

      // Gold Foil Thermal Blankets on Bus Bays
      const goldRim = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 0.18, 10),
        mats.goldKapton
      );
      goldRim.rotation.x = Math.PI / 2;
      goldRim.position.set(0, 0.18, -0.05);
      vGroup.add(goldRim);

      // 3. The 12-Inch Gold-Plated Voyager Golden Record Cover mounted on the Bus Flank
      const goldenRecordDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 0.04, 32),
        mats.goldKapton
      );
      goldenRecordDisc.rotation.z = Math.PI / 2;
      goldenRecordDisc.position.set(-0.71, 0.16, -0.05);
      vGroup.add(goldenRecordDisc);

      // 4. Lower Boom with Three Cylindrical MHW-RTG Plutonium-238 Generators in Tandem
      const rtgStrut = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 1.55, 10),
        mats.brushedTitanium
      );
      rtgStrut.position.set(-0.55, -0.45, -0.25);
      rtgStrut.rotation.z = -0.68;
      vGroup.add(rtgStrut);

      for (let rIdx = 0; rIdx < 3; rIdx++) {
        const rtgUnit = new THREE.Mesh(
          new THREE.CylinderGeometry(0.11, 0.11, 0.24, 14),
          mats.rtgHotGlow
        );
        rtgUnit.rotation.z = -0.68;
        rtgUnit.position.set(-0.85 - rIdx * 0.28, -0.72 - rIdx * 0.22, -0.25);
        vGroup.add(rtgUnit);
      }

      // 5. Right-Side Science Scan Platform Boom (Cameras, Spectrometers, Photopolarimeter)
      const scanBoom = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 1.65, 10),
        mats.brushedTitanium
      );
      scanBoom.position.set(0.95, 0.42, -0.15);
      scanBoom.rotation.z = -1.25;
      vGroup.add(scanBoom);

      const scanHead = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.28, 0.34),
        mats.blackAnodized
      );
      scanHead.position.set(1.72, 0.68, -0.15);
      vGroup.add(scanHead);

      const cameraLens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.09, 0.22, 16),
        mats.opticalLens
      );
      cameraLens.rotation.x = Math.PI / 2;
      cameraLens.position.set(1.78, 0.72, 0.04);
      vGroup.add(cameraLens);

      // 6. Long 13-Meter Astromast Magnetometer Boom extending upper-left
      const magBoom = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.028, 2.55, 8),
        mats.copperFoil
      );
      magBoom.position.set(-1.15, 0.95, -0.45);
      magBoom.rotation.z = 0.88;
      vGroup.add(magBoom);

      // 7. Twin 10-Meter Plasma Wave Whip Antennas V-shaped
      [-0.48, 0.48].forEach((whipAngle) => {
        const whip = new THREE.Mesh(
          new THREE.CylinderGeometry(0.01, 0.014, 2.2, 6),
          mats.brushedTitanium
        );
        whip.position.set(whipAngle * 1.1, -0.65, -0.75);
        whip.rotation.z = whipAngle;
        whip.rotation.x = 0.45;
        vGroup.add(whip);
      });

      craftGroup.add(vGroup);

      if (mission.hotspots[0]) hotspotAnchors[mission.hotspots[0].id] = new THREE.Vector3(0.15, 0.48, 0.95);
      if (mission.hotspots[1]) hotspotAnchors[mission.hotspots[1].id] = new THREE.Vector3(-0.68, 0.16, -0.05);
      if (mission.hotspots[2]) hotspotAnchors[mission.hotspots[2].id] = new THREE.Vector3(-1.05, -0.88, -0.25);
      break;
    }
  }

  return { craftGroup, environmentGroup, hotspotAnchors };
}
